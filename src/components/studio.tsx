import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast, Toaster } from "sonner";
import { Header } from "@/components/header";
import { ImageSlots } from "@/components/image-slots";
import { PreviewStage } from "@/components/preview-stage";
import { TimelinePanel } from "@/components/timeline-panel";
import { ExportPanel } from "@/components/export-panel";
import { LabelsPanel } from "@/components/labels-panel";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useI18n } from "@/i18n/context";
import { drawFrame, type FitMode, type SliderAxis } from "@/lib/draw";
import { downloadBlob, exportRevealVideo } from "@/lib/export-video";
import { LABEL_OFF, LABEL_ON, type OverlayLabel } from "@/lib/labels";
import { DEFAULT_PLACEMENT, isDefaultPlacement, type ImagePlacement } from "@/lib/placement";
import {
  imagesFromClipboard,
  imagesFromDataTransfer,
  loadDefaultSlot,
  revokeSlot,
  slotFromFile,
  type SlotImage,
} from "@/lib/load-image";
import {
  computeOutputSize,
  type AspectId,
  type FormatId,
  type QualityId,
  type ResId,
} from "@/lib/presets";
import { sampleRecorded, type MotionMode } from "@/lib/record";
import {
  DEFAULT_SECONDS,
  EASINGS,
  resolvedDuration,
  resolveSeconds,
  sliderAtTime,
  sumPhases,
  toPercents,
  toSeconds,
  type EasingId,
  type Phases,
  type TimingMode,
} from "@/lib/timeline";

type SlotKey = "before" | "after";

export function Studio() {
  const { t } = useI18n();
  const [before, setBefore] = useState<SlotImage | null>(null);
  const [after, setAfter] = useState<SlotImage | null>(null);
  const [active, setActive] = useState<SlotKey>("before");
  const [mode, setMode] = useState<TimingMode>("seconds");
  const [phases, setPhases] = useState<Phases>(DEFAULT_SECONDS);
  const [totalDuration, setTotalDuration] = useState(sumPhases(DEFAULT_SECONDS));
  const [easing, setEasing] = useState<EasingId>("cinematic");
  const [motionMode, setMotionMode] = useState<MotionMode>("auto");
  const [axis, setAxis] = useState<SliderAxis>("vertical");
  const [aspect, setAspect] = useState<AspectId>("source");
  const [res, setRes] = useState<ResId>("4k");
  const [customW, setCustomW] = useState(1920);
  const [customH, setCustomH] = useState(1080);
  const [fps, setFps] = useState<30 | 60>(60);
  const [format, setFormat] = useState<FormatId>("mp4");
  const [quality, setQuality] = useState<QualityId>("very-high");
  const [fit, setFit] = useState<FitMode>("cover");
  const [showLine, setShowLine] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [loop, setLoop] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [exporting, setExporting] = useState(false);
  const [exportRatio, setExportRatio] = useState(0);
  const [exportFrame, setExportFrame] = useState(0);
  const [exportTotal, setExportTotal] = useState(0);
  const [exportStage, setExportStage] = useState<"encoding" | "finalizing">("encoding");
  const [dragOver, setDragOver] = useState(false);
  const [recording, setRecording] = useState(false);
  const [take, setTake] = useState<Float32Array | null>(null);
  const [beforeLabel, setBeforeLabel] = useState<OverlayLabel>(LABEL_OFF);
  const [afterLabel, setAfterLabel] = useState<OverlayLabel>(LABEL_ON);
  const [beforePlacement, setBeforePlacement] = useState<ImagePlacement>(DEFAULT_PLACEMENT);
  const [afterPlacement, setAfterPlacement] = useState<ImagePlacement>(DEFAULT_PLACEMENT);
  const abortRef = useRef<AbortController | null>(null);
  const dragDepth = useRef(0);

  const seconds = useMemo(
    () => resolveSeconds(phases, mode, totalDuration),
    [phases, mode, totalDuration],
  );
  const autoDuration = useMemo(
    () => resolvedDuration(phases, mode, totalDuration),
    [phases, mode, totalDuration],
  );
  const duration =
    motionMode === "manual" ? Math.max(0.1, totalDuration) : autoDuration;

  const out = useMemo(
    () =>
      computeOutputSize({
        aspect,
        res,
        customW,
        customH,
        sourceW: before?.element.naturalWidth ?? 1440,
        sourceH: before?.element.naturalHeight ?? 1376,
      }),
    [aspect, res, customW, customH, before],
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [b, a] = await Promise.all([
          loadDefaultSlot("/images/before.jpg", "ukiyo-e woodblock"),
          loadDefaultSlot("/images/after.jpg", "photorealistic"),
        ]);
        if (cancelled) return;
        setBefore(b);
        setAfter(a);
      } catch {
        toast.error(t("toast.loadFail"));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!take) return;
    const expected = Math.max(1, Math.round(duration * fps));
    if (take.length !== expected) setTake(null);
  }, [duration, fps, take]);

  const assignFile = useCallback(async (slot: SlotKey, file: File) => {
    try {
      const next = await slotFromFile(file);
      if (slot === "before") {
        setBefore((prev) => {
          revokeSlot(prev);
          return next;
        });
        setBeforePlacement(DEFAULT_PLACEMENT);
      } else {
        setAfter((prev) => {
          revokeSlot(prev);
          return next;
        });
        setAfterPlacement(DEFAULT_PLACEMENT);
      }
      setActive(slot);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t("toast.readFail"));
    }
  }, [t]);

  const assignFiles = useCallback(
    async (files: File[], preferred?: SlotKey) => {
      if (files.length >= 2) {
        await assignFile("before", files[0]!);
        await assignFile("after", files[1]!);
        return;
      }
      if (files[0]) await assignFile(preferred ?? active, files[0]);
    },
    [active, assignFile],
  );

  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const files = imagesFromClipboard(e);
      if (!files.length) return;
      e.preventDefault();
      void assignFiles(files);
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [assignFiles]);

  useEffect(() => {
    const hasFiles = (e: DragEvent) =>
      e.dataTransfer ? [...e.dataTransfer.types].includes("Files") : false;

    const onEnter = (e: DragEvent) => {
      if (!hasFiles(e)) return;
      e.preventDefault();
      dragDepth.current += 1;
      setDragOver(true);
    };
    const onOver = (e: DragEvent) => {
      if (!hasFiles(e)) return;
      e.preventDefault();
      if (e.dataTransfer) e.dataTransfer.dropEffect = "copy";
    };
    const onLeave = (e: DragEvent) => {
      if (!hasFiles(e)) return;
      e.preventDefault();
      dragDepth.current = Math.max(0, dragDepth.current - 1);
      if (dragDepth.current === 0) setDragOver(false);
    };
    const onDrop = (e: DragEvent) => {
      e.preventDefault();
      dragDepth.current = 0;
      setDragOver(false);
      const files = imagesFromDataTransfer(e.dataTransfer);
      if (!files.length) return;
      const w = window.innerWidth;
      const preferred: SlotKey = e.clientX < w / 2 ? "before" : "after";
      void assignFiles(files, preferred);
    };
    window.addEventListener("dragenter", onEnter);
    window.addEventListener("dragover", onOver);
    window.addEventListener("dragleave", onLeave);
    window.addEventListener("drop", onDrop);
    return () => {
      window.removeEventListener("dragenter", onEnter);
      window.removeEventListener("dragover", onOver);
      window.removeEventListener("dragleave", onLeave);
      window.removeEventListener("drop", onDrop);
    };
  }, [assignFiles]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") return;
      if (e.code === "Escape" && recording) {
        e.preventDefault();
        setRecording(false);
        return;
      }
      if (e.code === "Space") {
        e.preventDefault();
        if (exporting || recording) return;
        if (motionMode === "manual" && !take) return;
        setPlaying((p) => !p);
      } else if (e.code === "Home") {
        e.preventDefault();
        setCurrentTime(0);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [exporting, recording, motionMode, take]);

  const onTimingMode = (next: TimingMode) => {
    if (next === mode) return;
    if (next === "percent") {
      setPhases(toPercents(seconds));
      setTotalDuration(duration);
    } else {
      setPhases(toSeconds(phases, totalDuration));
    }
    setMode(next);
  };

  const onMotionModeChange = (next: MotionMode) => {
    if (next === motionMode) return;
    setPlaying(next === "auto");
    setRecording(false);
    setCurrentTime(0);
    if (next === "manual") {
      setTotalDuration(autoDuration);
      setTake(null);
    }
    setMotionMode(next);
  };

  const onPasteClick = async () => {
    try {
      if (navigator.clipboard && "read" in navigator.clipboard) {
        const items = await navigator.clipboard.read();
        const files: File[] = [];
        for (const item of items) {
          const type = item.types.find((t) => t.startsWith("image/"));
          if (!type) continue;
          const blob = await item.getType(type);
          files.push(new File([blob], "pasted-image", { type: blob.type }));
        }
        if (files.length) {
          await assignFiles(files);
          return;
        }
      }
      toast.message(t("toast.pasteHint"));
    } catch {
      toast.message(t("toast.pasteHint"));
    }
  };

  const onSwap = () => {
    setBefore(after);
    setAfter(before);
    setBeforeLabel(afterLabel);
    setAfterLabel(beforeLabel);
    setBeforePlacement(afterPlacement);
    setAfterPlacement(beforePlacement);
  };

  const onTimeTick = useCallback((t: number) => {
    setCurrentTime(t);
    if (t >= duration && !loop) setPlaying(false);
  }, [duration, loop]);

  const runExport = async () => {
    if (!before?.element) {
      toast.error(t("export.needBefore"));
      return;
    }
    if (!after?.element) {
      toast.error(t("export.needAfter"));
      return;
    }
    if (motionMode === "manual" && !take) {
      toast.error(t("export.needTake"));
      return;
    }
    const controller = new AbortController();
    abortRef.current = controller;
    setExporting(true);
    setPlaying(false);
    setExportRatio(0);
    setExportStage("encoding");

    const easeFn = EASINGS[easing];
    const phaseSeconds = seconds;
    const dur = duration;
    const takeSnap = take;
    const fpsSnap = fps;
    const modeSnap = motionMode;
    const axisSnap = axis;
    const beforeLabelSnap = beforeLabel;
    const afterLabelSnap = afterLabel;
    const beforePlaceSnap = beforePlacement;
    const afterPlaceSnap = afterPlacement;

    try {
      const result = await exportRevealVideo({
        width: out.width,
        height: out.height,
        fps,
        duration: dur,
        format,
        quality,
        signal: controller.signal,
        renderFrame: (ctx, time) => {
          const progress =
            modeSnap === "manual" && takeSnap
              ? sampleRecorded(takeSnap, time, fpsSnap)
              : sliderAtTime(time, phaseSeconds, easeFn);
          drawFrame(ctx, {
            before: before.element,
            after: after.element,
            progress,
            fit,
            showLine,
            axis: axisSnap,
            beforeLabel: beforeLabelSnap,
            afterLabel: afterLabelSnap,
            beforePlacement: beforePlaceSnap,
            afterPlacement: afterPlaceSnap,
          });
        },
        onProgress: (p) => {
          setExportRatio(p.ratio);
          setExportFrame(p.frame);
          setExportTotal(p.totalFrames);
          setExportStage(p.stage);
        },
      });
      downloadBlob(result.blob, result.filename);
      if (result.usedFormat !== format) {
        toast.success(
          `${t("export.saved", { name: result.filename })} ${t("export.fallback", {
            ext: result.usedFormat.toUpperCase(),
            wanted: format.toUpperCase(),
          })}`,
        );
      } else {
        toast.success(t("export.saved", { name: result.filename }));
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        toast.message(t("export.cancelled"));
      } else {
        toast.error(err instanceof Error ? err.message : t("export.failed"));
      }
    } finally {
      setExporting(false);
      abortRef.current = null;
    }
  };

  return (
    <TooltipProvider>
      <div className="flex min-h-dvh flex-col bg-bg text-fg">
        <Header />
        <main className="mx-auto flex w-full max-w-screen-2xl flex-1 flex-col gap-8 px-4 py-6 sm:px-6 lg:flex-row lg:items-start">
          <PreviewStage
            before={before}
            after={after}
            seconds={seconds}
            duration={duration}
            easing={easing}
            fit={fit}
            showLine={showLine}
            playing={playing}
            loop={loop}
            currentTime={currentTime}
            outW={out.width}
            outH={out.height}
            exporting={exporting}
            exportRatio={exportRatio}
            motionMode={motionMode}
            axis={axis}
            fps={fps}
            recording={recording}
            take={take}
            beforeLabel={beforeLabel}
            afterLabel={afterLabel}
            onTogglePlay={() => setPlaying((p) => !p)}
            onPause={() => setPlaying(false)}
            onSeek={(tm) => {
              setCurrentTime(tm);
              setPlaying(false);
            }}
            onRestart={() => {
              setCurrentTime(0);
              setPlaying(true);
            }}
            onLoopChange={setLoop}
            onTimeTick={onTimeTick}
            onRecordStart={() => {
              setTake(null);
              setPlaying(false);
              setCurrentTime(0);
              setRecording(true);
            }}
            onRecordComplete={(samples) => {
              setTake(samples);
              setRecording(false);
              setCurrentTime(0);
              setPlaying(true);
            }}
            onBeforeLabel={setBeforeLabel}
            onAfterLabel={setAfterLabel}
            beforePlacement={beforePlacement}
            afterPlacement={afterPlacement}
            active={active}
            onBeforePlacement={setBeforePlacement}
            onAfterPlacement={setAfterPlacement}
            onActive={setActive}
          />

          <aside className="flex w-full shrink-0 flex-col gap-8 lg:w-96 lg:max-h-[calc(100dvh-5.5rem)] lg:overflow-y-auto lg:pr-1">
            <ImageSlots
              before={before}
              after={after}
              active={active}
              beforeCanReset={!isDefaultPlacement(beforePlacement)}
              afterCanReset={!isDefaultPlacement(afterPlacement)}
              onActive={setActive}
              onFile={(slot, file) => void assignFile(slot, file)}
              onPasteClick={() => void onPasteClick()}
              onSwap={onSwap}
              onReset={(slot) => {
                if (slot === "before") setBeforePlacement(DEFAULT_PLACEMENT);
                else setAfterPlacement(DEFAULT_PLACEMENT);
              }}
            />
            <TimelinePanel
              motionMode={motionMode}
              axis={axis}
              mode={mode}
              phases={phases}
              totalDuration={totalDuration}
              easing={easing}
              duration={duration}
              onMotionMode={onMotionModeChange}
              onAxis={setAxis}
              onMode={onTimingMode}
              onPhases={setPhases}
              onTotal={setTotalDuration}
              onEasing={setEasing}
            />
            <LabelsPanel
              beforeLabel={beforeLabel}
              afterLabel={afterLabel}
              onBefore={setBeforeLabel}
              onAfter={setAfterLabel}
            />
            <ExportPanel
              aspect={aspect}
              res={res}
              customW={customW}
              customH={customH}
              fps={fps}
              format={format}
              quality={quality}
              fit={fit}
              showLine={showLine}
              outW={out.width}
              outH={out.height}
              duration={duration}
              exporting={exporting}
              exportRatio={exportRatio}
              exportFrame={exportFrame}
              exportTotal={exportTotal}
              exportStage={exportStage}
              onAspect={setAspect}
              onRes={setRes}
              onCustomW={setCustomW}
              onCustomH={setCustomH}
              onFps={setFps}
              onFormat={setFormat}
              onQuality={setQuality}
              onFit={setFit}
              onShowLine={setShowLine}
              onExport={() => void runExport()}
              onCancel={() => abortRef.current?.abort()}
            />
          </aside>
        </main>
      </div>

      {dragOver ? (
        <div className="fixed inset-0 z-50 flex bg-bg/80">
          <div className="flex flex-1 items-center justify-center border-r border-dashed border-paper/40">
            <p className="font-display text-2xl text-fg">{t("drop.before")}</p>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <p className="font-display text-2xl text-fg">{t("drop.after")}</p>
          </div>
        </div>
      ) : null}

      <Toaster
        theme="dark"
        position="bottom-center"
        toastOptions={{
          classNames: {
            toast: "bg-surface text-fg border border-line",
          },
        }}
      />
    </TooltipProvider>
  );
}
