import { drawBadge, type OverlayLabel } from "./labels";
import {
  DEFAULT_PLACEMENT,
  imageRect,
  sourceSize,
  type ImagePlacement,
} from "./placement";

export type FitMode = "cover" | "contain" | "stretch";
export type SliderAxis = "vertical" | "horizontal";

export type DrawFrameOptions = {
  before: CanvasImageSource | null;
  after: CanvasImageSource | null;
  progress: number;
  fit: FitMode;
  showLine: boolean;
  axis?: SliderAxis;
  beforeLabel?: OverlayLabel;
  afterLabel?: OverlayLabel;
  beforePlacement?: ImagePlacement;
  afterPlacement?: ImagePlacement;
  letterbox?: string;
};

export function drawFitted(
  ctx: CanvasRenderingContext2D,
  img: CanvasImageSource,
  dx: number,
  dy: number,
  dw: number,
  dh: number,
  fit: FitMode,
  placement: ImagePlacement = DEFAULT_PLACEMENT,
) {
  const { w: iw, h: ih } = sourceSize(img);
  if (iw <= 0 || ih <= 0 || dw <= 0 || dh <= 0) return;
  const r = imageRect(iw, ih, dw, dh, fit, placement);
  ctx.drawImage(img, dx + r.x, dy + r.y, r.w, r.h);
}

function lineWidthForHeight(h: number) {
  return Math.max(2, Math.round(h / 400));
}

function drawChevron(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  dir: 1 | -1,
  size: number,
  axis: SliderAxis,
) {
  const s = size;
  ctx.beginPath();
  if (axis === "vertical") {
    ctx.moveTo(x + dir * s * 0.15, y - s * 0.55);
    ctx.lineTo(x + dir * s * 0.7, y);
    ctx.lineTo(x + dir * s * 0.15, y + s * 0.55);
  } else {
    ctx.moveTo(x - s * 0.55, y + dir * s * 0.15);
    ctx.lineTo(x, y + dir * s * 0.7);
    ctx.lineTo(x + s * 0.55, y + dir * s * 0.15);
  }
  ctx.lineWidth = Math.max(1.5, s * 0.28);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();
}

function drawSlider(
  ctx: CanvasRenderingContext2D,
  pos: number,
  w: number,
  h: number,
  axis: SliderAxis,
) {
  const lw = lineWidthForHeight(h);
  const r = Math.max(13, lw * 4.6);

  ctx.save();

  if (axis === "vertical") {
    const x = Math.min(w, Math.max(0, pos));
    const cy = h / 2;
    const glow = ctx.createLinearGradient(x - 28, 0, x + 28, 0);
    glow.addColorStop(0, "rgba(241, 236, 227, 0)");
    glow.addColorStop(0.5, "rgba(241, 236, 227, 0.1)");
    glow.addColorStop(1, "rgba(241, 236, 227, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(x - 28, 0, 56, h);
    ctx.fillStyle = "rgba(12, 11, 10, 0.55)";
    ctx.fillRect(x - lw / 2 + 1, 0, lw + 1.5, h);
    ctx.fillStyle = "#f7f3ec";
    ctx.fillRect(x - lw / 2, 0, lw, h);
    for (const ky of [lw * 2.2, h - lw * 2.2]) {
      ctx.beginPath();
      ctx.arc(x, ky, Math.max(4, lw * 1.6), 0, Math.PI * 2);
      ctx.fillStyle = "#f7f3ec";
      ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(x, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = "#f7f3ec";
    ctx.fill();
    ctx.lineWidth = Math.max(1, lw * 0.55);
    ctx.strokeStyle = "rgba(12, 11, 10, 0.35)";
    ctx.stroke();
    ctx.strokeStyle = "#1a1814";
    drawChevron(ctx, x - r * 0.08, cy, -1, r * 0.42, "vertical");
    drawChevron(ctx, x + r * 0.08, cy, 1, r * 0.42, "vertical");
  } else {
    const y = Math.min(h, Math.max(0, pos));
    const cx = w / 2;
    const glow = ctx.createLinearGradient(0, y - 28, 0, y + 28);
    glow.addColorStop(0, "rgba(241, 236, 227, 0)");
    glow.addColorStop(0.5, "rgba(241, 236, 227, 0.1)");
    glow.addColorStop(1, "rgba(241, 236, 227, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, y - 28, w, 56);
    ctx.fillStyle = "rgba(12, 11, 10, 0.55)";
    ctx.fillRect(0, y - lw / 2 + 1, w, lw + 1.5);
    ctx.fillStyle = "#f7f3ec";
    ctx.fillRect(0, y - lw / 2, w, lw);
    for (const kx of [lw * 2.2, w - lw * 2.2]) {
      ctx.beginPath();
      ctx.arc(kx, y, Math.max(4, lw * 1.6), 0, Math.PI * 2);
      ctx.fillStyle = "#f7f3ec";
      ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(cx, y, r, 0, Math.PI * 2);
    ctx.fillStyle = "#f7f3ec";
    ctx.fill();
    ctx.lineWidth = Math.max(1, lw * 0.55);
    ctx.strokeStyle = "rgba(12, 11, 10, 0.35)";
    ctx.stroke();
    ctx.strokeStyle = "#1a1814";
    drawChevron(ctx, cx, y - r * 0.08, -1, r * 0.42, "horizontal");
    drawChevron(ctx, cx, y + r * 0.08, 1, r * 0.42, "horizontal");
  }

  ctx.restore();
}

export function drawFrame(
  ctx: CanvasRenderingContext2D,
  opts: DrawFrameOptions,
) {
  const {
    before,
    after,
    progress,
    fit,
    showLine,
    axis = "vertical",
    beforeLabel,
    afterLabel,
    beforePlacement = DEFAULT_PLACEMENT,
    afterPlacement = DEFAULT_PLACEMENT,
    letterbox = "#0c0b0a",
  } = opts;
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  ctx.fillStyle = letterbox;
  ctx.fillRect(0, 0, w, h);

  if (before) {
    drawFitted(ctx, before, 0, 0, w, h, fit, beforePlacement);
  }
  if (beforeLabel) drawBadge(ctx, beforeLabel, w, h);

  const split = axis === "vertical" ? progress * w : progress * h;

  if (after && split > 0.5) {
    ctx.save();
    ctx.beginPath();
    if (axis === "vertical") ctx.rect(0, 0, split, h);
    else ctx.rect(0, 0, w, split);
    ctx.clip();
    ctx.fillStyle = letterbox;
    ctx.fillRect(0, 0, w, h);
    drawFitted(ctx, after, 0, 0, w, h, fit, afterPlacement);
    if (afterLabel) drawBadge(ctx, afterLabel, w, h);
    ctx.restore();
  }

  if (showLine) {
    drawSlider(ctx, split, w, h, axis);
  }
}

export function drawPlaceholder(
  ctx: CanvasRenderingContext2D,
  label: string,
) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  ctx.fillStyle = "#161412";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#9a9488";
  ctx.font = `${Math.max(14, Math.round(h * 0.035))}px Figtree, "Noto Sans", sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, w / 2, h / 2);
}
