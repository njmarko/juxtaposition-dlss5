import { even } from "./utils";

export type AspectId =
  | "source"
  | "16:9"
  | "9:16"
  | "1:1"
  | "4:3"
  | "3:2"
  | "2:3"
  | "21:9"
  | "4:5"
  | "5:4";

export type ResId = "1080p" | "2k" | "4k" | "source" | "custom";

export type FormatId = "mp4" | "webm";

export type QualityId = "medium" | "high" | "very-high";

export const ASPECTS: { id: AspectId; label: string; ratio: number | null }[] = [
  { id: "source", label: "Match source", ratio: null },
  { id: "16:9", label: "16:9 Widescreen", ratio: 16 / 9 },
  { id: "9:16", label: "9:16 Vertical", ratio: 9 / 16 },
  { id: "1:1", label: "1:1 Square", ratio: 1 },
  { id: "4:3", label: "4:3 Classic", ratio: 4 / 3 },
  { id: "3:2", label: "3:2 Photo", ratio: 3 / 2 },
  { id: "2:3", label: "2:3 Portrait", ratio: 2 / 3 },
  { id: "21:9", label: "21:9 Ultrawide", ratio: 21 / 9 },
  { id: "4:5", label: "4:5 Social", ratio: 4 / 5 },
  { id: "5:4", label: "5:4", ratio: 5 / 4 },
];

export const RESOLUTIONS: { id: ResId; label: string; hint: string; shortEdge: number }[] =
  [
    { id: "1080p", label: "1080p", hint: "FHD", shortEdge: 1080 },
    { id: "2k", label: "2K", hint: "QHD", shortEdge: 1440 },
    { id: "4k", label: "4K", hint: "UHD", shortEdge: 2160 },
    { id: "source", label: "Source", hint: "Native pixels", shortEdge: 0 },
    { id: "custom", label: "Custom", hint: "Any size", shortEdge: 0 },
  ];

export const QUALITY_META: Record<QualityId, { label: string; hint: string }> = {
  medium: { label: "Draft", hint: "Smaller file, faster encode" },
  high: { label: "High", hint: "Balanced — default" },
  "very-high": { label: "Maximum", hint: "Largest file, best detail" },
};

export function aspectRatio(
  id: AspectId,
  sourceW: number,
  sourceH: number,
): number {
  const found = ASPECTS.find((a) => a.id === id);
  if (found?.ratio) return found.ratio;
  if (sourceW > 0 && sourceH > 0) return sourceW / sourceH;
  return 1;
}

export function computeOutputSize(opts: {
  aspect: AspectId;
  res: ResId;
  customW: number;
  customH: number;
  sourceW: number;
  sourceH: number;
}): { width: number; height: number } {
  const { aspect, res, customW, customH, sourceW, sourceH } = opts;

  if (res === "custom") {
    return { width: even(customW || 1920), height: even(customH || 1080) };
  }

  if (res === "source") {
    const w = sourceW || 1920;
    const h = sourceH || 1080;
    if (aspect === "source") return { width: even(w), height: even(h) };
    const ratio = aspectRatio(aspect, w, h);
    // Fit source long-edge into the chosen aspect
    const srcLong = Math.max(w, h);
    if (ratio >= 1) {
      return { width: even(srcLong), height: even(srcLong / ratio) };
    }
    return { width: even(srcLong * ratio), height: even(srcLong) };
  }

  const short =
    RESOLUTIONS.find((r) => r.id === res)?.shortEdge ?? 1080;
  const ratio = aspectRatio(aspect, sourceW, sourceH);

  if (ratio >= 1) {
    const height = short;
    const width = even(height * ratio);
    return { width, height: even(height) };
  }
  const width = short;
  const height = even(width / ratio);
  return { width: even(width), height };
}

export function targetBitrate(
  width: number,
  height: number,
  fps: number,
  quality: QualityId,
) {
  const pixels = width * height;
  const p1080 = 1920 * 1080;
  const base = (pixels / p1080) * (fps / 30) * 8_000_000;
  const factor =
    quality === "very-high" ? 1.55 : quality === "high" ? 1 : 0.48;
  return Math.round(Math.min(64_000_000, Math.max(1_200_000, base * factor)));
}

export function estimateFileBytes(
  width: number,
  height: number,
  fps: number,
  quality: QualityId,
  duration: number,
) {
  const br = targetBitrate(width, height, fps, quality);
  // container overhead ~3%
  return (br * duration * 1.03) / 8;
}
