export type LabelKind = "on" | "off";

export type OverlayLabel = {
  enabled: boolean;
  kind: LabelKind;
  /** Top-left of the badge, 0–1 of the frame. */
  x: number;
  y: number;
  /** Font size as a fraction of frame height. */
  size: number;
};

export const LABEL_ON: OverlayLabel = {
  enabled: true,
  kind: "on",
  x: 0.018,
  y: 0.018,
  size: 0.036,
};

export const LABEL_OFF: OverlayLabel = {
  enabled: true,
  kind: "off",
  x: 0.018,
  y: 0.018,
  size: 0.036,
};

export const LABEL_TEXT: Record<LabelKind, string> = {
  on: "DLSS 5 ON",
  off: "DLSS 5 OFF",
};

export const LABEL_BG: Record<LabelKind, string> = {
  on: "#4caf26",
  off: "#8a8a8a",
};

export const LABEL_FG = "#ffffff";

export function clampLabel(label: OverlayLabel): OverlayLabel {
  return {
    ...label,
    x: Math.min(0.92, Math.max(0, label.x)),
    y: Math.min(0.92, Math.max(0, label.y)),
    size: Math.min(0.12, Math.max(0.016, label.size)),
  };
}

export function badgeMetrics(canvasH: number, size: number) {
  const fontSize = Math.max(10, size * canvasH);
  return {
    fontSize,
    padX: fontSize * 0.52,
    padY: fontSize * 0.34,
    tracking: fontSize * 0.04,
  };
}

export function measureBadge(
  ctx: CanvasRenderingContext2D,
  kind: LabelKind,
  canvasH: number,
  size: number,
) {
  const { fontSize, padX, padY, tracking } = badgeMetrics(canvasH, size);
  const text = LABEL_TEXT[kind];
  ctx.font = `700 ${fontSize}px "Figtree", "Noto Sans", sans-serif`;
  const tw = ctx.measureText(text).width + tracking * Math.max(0, text.length - 1);
  return {
    width: tw + padX * 2,
    height: fontSize + padY * 2,
    fontSize,
    padX,
    padY,
    tracking,
    text,
  };
}

export function drawBadge(
  ctx: CanvasRenderingContext2D,
  label: OverlayLabel,
  canvasW: number,
  canvasH: number,
) {
  if (!label.enabled) return;
  const m = measureBadge(ctx, label.kind, canvasH, label.size);
  const x = label.x * canvasW;
  const y = label.y * canvasH;
  ctx.save();
  ctx.fillStyle = LABEL_BG[label.kind];
  ctx.fillRect(x, y, m.width, m.height);
  ctx.fillStyle = LABEL_FG;
  ctx.font = `700 ${m.fontSize}px "Figtree", "Noto Sans", sans-serif`;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  const cy = y + m.height / 2;
  let cx = x + m.padX;
  for (const ch of m.text) {
    ctx.fillText(ch, cx, cy);
    cx += ctx.measureText(ch).width + m.tracking;
  }
  ctx.restore();
}
