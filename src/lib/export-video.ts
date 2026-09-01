import {
  BufferTarget,
  CanvasSource,
  Mp4OutputFormat,
  Output,
  Quality,
  WebMOutputFormat,
} from "mediabunny";
import { targetBitrate, type FormatId, type QualityId } from "./presets";

export type ExportProgress = {
  ratio: number;
  frame: number;
  totalFrames: number;
  stage: "encoding" | "finalizing";
};

export type ExportResult = {
  blob: Blob;
  filename: string;
  mime: string;
  usedFormat: FormatId;
  fallbackNote?: string;
};

export type ExportVideoOptions = {
  width: number;
  height: number;
  fps: number;
  duration: number;
  format: FormatId;
  quality: QualityId;
  renderFrame: (ctx: CanvasRenderingContext2D, time: number) => void;
  onProgress?: (p: ExportProgress) => void;
  signal?: AbortSignal;
};

function evenSize(n: number) {
  const r = Math.max(2, Math.round(n));
  return r % 2 === 0 ? r : r + 1;
}

function throwIfAborted(signal?: AbortSignal) {
  if (signal?.aborted) {
    throw new DOMException("Export cancelled", "AbortError");
  }
}

function fileName(width: number, height: number, fps: number, ext: string) {
  return `juxtaposition-dlss5-${width}x${height}-${fps}fps.${ext}`;
}

async function encodeWithMediabunny(
  opts: ExportVideoOptions,
  format: FormatId,
  codec: "avc" | "vp9" | "av1" | "vp8",
): Promise<Blob> {
  const width = evenSize(opts.width);
  const height = evenSize(opts.height);
  const fps = opts.fps;
  const duration = opts.duration;
  const totalFrames = Math.max(1, Math.round(duration * fps));
  const bitrate = targetBitrate(width, height, fps, opts.quality);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
  if (!ctx) throw new Error("Could not create a drawing surface.");

  const target = new BufferTarget();
  const output = new Output({
    format:
      format === "mp4"
        ? new Mp4OutputFormat({ fastStart: "in-memory" })
        : new WebMOutputFormat(),
    target,
  });

  const source = new CanvasSource(canvas, {
    codec,
    quality: new Quality({ bitrate, bitrateMode: "variable" }),
    keyFrameInterval: 2,
  });

  output.addVideoTrack(source, { frameRate: fps });
  output.setMetadataTags({
    title: "Juxtaposition DLSS5",
    artist: "Marko Njegomir",
    comment: "Made with Grok",
  });

  const cancelOnAbort = () => {
    void output.cancel();
  };
  opts.signal?.addEventListener("abort", cancelOnAbort, { once: true });

  try {
    await output.start();

    const frameDur = 1 / fps;
    for (let i = 0; i < totalFrames; i++) {
      throwIfAborted(opts.signal);
      const t = Math.min(duration, i / fps);
      opts.renderFrame(ctx, t);
      await source.add(t, frameDur, { keyFrame: i % Math.round(fps * 2) === 0 });
      if (i % 2 === 0 || i === totalFrames - 1) {
        opts.onProgress?.({
          ratio: ((i + 1) / totalFrames) * 0.92,
          frame: i + 1,
          totalFrames,
          stage: "encoding",
        });
      }
    }

    opts.onProgress?.({
      ratio: 0.94,
      frame: totalFrames,
      totalFrames,
      stage: "finalizing",
    });
    await output.finalize();
  } catch (err) {
    if (output.state === "started" || output.state === "finalizing") {
      try {
        await output.cancel();
      } catch {
        /* ignore */
      }
    }
    throw err;
  } finally {
    opts.signal?.removeEventListener("abort", cancelOnAbort);
  }

  const buffer = target.buffer;
  if (!buffer) throw new Error("The encoder finished without producing a file.");

  const mime = format === "mp4" ? "video/mp4" : "video/webm";
  opts.onProgress?.({
    ratio: 1,
    frame: totalFrames,
    totalFrames,
    stage: "finalizing",
  });
  return new Blob([buffer], { type: mime });
}

function pickRecorderMime(format: FormatId): string | null {
  if (typeof MediaRecorder === "undefined") return null;
  const lists =
    format === "mp4"
      ? [
          "video/mp4;codecs=avc1.640028",
          "video/mp4;codecs=avc1.42E01E",
          "video/mp4",
          "video/webm;codecs=vp9",
          "video/webm",
        ]
      : [
          "video/webm;codecs=vp9",
          "video/webm;codecs=vp8",
          "video/webm",
          "video/mp4",
        ];
  return lists.find((t) => MediaRecorder.isTypeSupported(t)) ?? null;
}

async function encodeWithMediaRecorder(opts: ExportVideoOptions): Promise<{
  blob: Blob;
  mime: string;
}> {
  const width = evenSize(opts.width);
  const height = evenSize(opts.height);
  const fps = opts.fps;
  const duration = opts.duration;
  const totalFrames = Math.max(1, Math.round(duration * fps));
  const bitrate = targetBitrate(width, height, fps, opts.quality);
  const mime = pickRecorderMime(opts.format);
  if (!mime) {
    throw new Error("This browser cannot record video. Try Chrome, Edge, or Safari.");
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) throw new Error("Could not create a drawing surface.");

  opts.renderFrame(ctx, 0);

  const stream = canvas.captureStream(fps);
  const recorder = new MediaRecorder(stream, {
    mimeType: mime,
    videoBitsPerSecond: bitrate,
  });
  const chunks: BlobPart[] = [];
  recorder.ondataavailable = (e) => {
    if (e.data.size) chunks.push(e.data);
  };

  const stopped = new Promise<void>((resolve, reject) => {
    recorder.onstop = () => resolve();
    recorder.onerror = () => reject(new Error("Recording failed."));
  });

  recorder.start(200);

  const frameDurMs = 1000 / fps;
  const t0 = performance.now();
  for (let i = 0; i < totalFrames; i++) {
    throwIfAborted(opts.signal);
    const t = Math.min(duration, i / fps);
    opts.renderFrame(ctx, t);
    const track = stream.getVideoTracks()[0] as CanvasCaptureMediaStreamTrack | undefined;
    track?.requestFrame?.();
    opts.onProgress?.({
      ratio: (i + 1) / totalFrames,
      frame: i + 1,
      totalFrames,
      stage: "encoding",
    });
    const target = t0 + (i + 1) * frameDurMs;
    const wait = target - performance.now();
    if (wait > 0) {
      await new Promise((r) => setTimeout(r, wait));
    } else {
      await new Promise((r) => requestAnimationFrame(() => r(null)));
    }
  }

  recorder.stop();
  stream.getTracks().forEach((tr) => tr.stop());
  await stopped;
  return { blob: new Blob(chunks, { type: mime }), mime };
}

type CanvasCaptureMediaStreamTrack = MediaStreamTrack & {
  requestFrame?: () => void;
};

export async function exportRevealVideo(
  opts: ExportVideoOptions,
): Promise<ExportResult> {
  throwIfAborted(opts.signal);

  const attempts: { format: FormatId; codec: "avc" | "vp9" | "av1" | "vp8" }[] =
    opts.format === "mp4"
      ? [
          { format: "mp4", codec: "avc" },
          { format: "mp4", codec: "av1" },
          { format: "webm", codec: "vp9" },
        ]
      : [
          { format: "webm", codec: "vp9" },
          { format: "webm", codec: "vp8" },
          { format: "mp4", codec: "avc" },
        ];

  let lastError: unknown;
  const hasWebCodecs = typeof VideoEncoder !== "undefined";

  if (hasWebCodecs) {
    for (const attempt of attempts) {
      throwIfAborted(opts.signal);
      try {
        const blob = await encodeWithMediabunny(opts, attempt.format, attempt.codec);
        const ext = attempt.format === "mp4" ? "mp4" : "webm";
        const fallbackNote =
          attempt.format !== opts.format
            ? `Saved as ${ext.toUpperCase()} because ${opts.format.toUpperCase()} is not available in this browser.`
            : undefined;
        return {
          blob,
          filename: fileName(opts.width, opts.height, opts.fps, ext),
          mime: blob.type,
          usedFormat: attempt.format,
          fallbackNote,
        };
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") throw err;
        lastError = err;
      }
    }
  }

  try {
    const rec = await encodeWithMediaRecorder(opts);
    const ext = rec.mime.includes("mp4") ? "mp4" : "webm";
    const usedFormat: FormatId = ext === "mp4" ? "mp4" : "webm";
    return {
      blob: rec.blob,
      filename: fileName(opts.width, opts.height, opts.fps, ext),
      mime: rec.mime,
      usedFormat,
      fallbackNote:
        usedFormat !== opts.format
          ? `Saved as ${ext.toUpperCase()} using this browser's recorder.`
          : undefined,
    };
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") throw err;
    const detail =
      lastError instanceof Error
        ? lastError.message
        : err instanceof Error
          ? err.message
          : "Unknown encoder error";
    throw new Error(
      `Could not encode video. ${detail} Try 1080p or another browser (Chrome / Edge).`,
    );
  }
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
}
