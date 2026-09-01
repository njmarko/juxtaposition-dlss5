import { clamp } from "./utils";
import type { FitMode } from "./draw";

export type ImagePlacement = {
  /** Offset of image center from frame center, as a fraction of frame size. 0 = centered. */
  ox: number;
  oy: number;
  /** Multipliers on the fit-mode base size. 1 = that fit in the visible frame. */
  scaleX: number;
  scaleY: number;
};

export type ImageRect = { x: number; y: number; w: number; h: number };

export type ResizeHandle = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

export const DEFAULT_PLACEMENT: ImagePlacement = {
  ox: 0,
  oy: 0,
  scaleX: 1,
  scaleY: 1,
};

export const MIN_SCALE = 0.05;
export const MAX_SCALE = 12;
export const SNAP_THRESHOLD = 0.02;

export const HANDLES: ResizeHandle[] = ["nw", "n", "ne", "e", "se", "s", "sw", "w"];

export function isDefaultPlacement(p: ImagePlacement) {
  return (
    p.ox === 0 &&
    p.oy === 0 &&
    p.scaleX === 1 &&
    p.scaleY === 1
  );
}

export function sourceSize(img: CanvasImageSource | null): { w: number; h: number } {
  if (!img) return { w: 0, h: 0 };
  if (img instanceof HTMLImageElement) {
    return { w: img.naturalWidth, h: img.naturalHeight };
  }
  if (img instanceof HTMLCanvasElement) {
    return { w: img.width, h: img.height };
  }
  if (typeof ImageBitmap !== "undefined" && img instanceof ImageBitmap) {
    return { w: img.width, h: img.height };
  }
  if (img instanceof HTMLVideoElement) {
    return { w: img.videoWidth, h: img.videoHeight };
  }
  if (typeof OffscreenCanvas !== "undefined" && img instanceof OffscreenCanvas) {
    return { w: img.width, h: img.height };
  }
  return { w: 0, h: 0 };
}

export function baseSize(
  iw: number,
  ih: number,
  fw: number,
  fh: number,
  fit: FitMode,
): { w: number; h: number } {
  if (iw <= 0 || ih <= 0 || fw <= 0 || fh <= 0) return { w: fw, h: fh };
  if (fit === "stretch") return { w: fw, h: fh };
  const s = fit === "cover" ? Math.max(fw / iw, fh / ih) : Math.min(fw / iw, fh / ih);
  return { w: iw * s, h: ih * s };
}

export function imageRect(
  iw: number,
  ih: number,
  fw: number,
  fh: number,
  fit: FitMode,
  p: ImagePlacement,
): ImageRect {
  const base = baseSize(iw, ih, fw, fh, fit);
  const w = base.w * p.scaleX;
  const h = base.h * p.scaleY;
  return {
    x: (fw - w) / 2 + p.ox * fw,
    y: (fh - h) / 2 + p.oy * fh,
    w,
    h,
  };
}

export function placementFromRect(
  rect: ImageRect,
  fw: number,
  fh: number,
  baseW: number,
  baseH: number,
): ImagePlacement {
  const scaleX = clamp(rect.w / (baseW || 1), MIN_SCALE, MAX_SCALE);
  const scaleY = clamp(rect.h / (baseH || 1), MIN_SCALE, MAX_SCALE);
  const w = baseW * scaleX;
  const h = baseH * scaleY;
  return {
    ox: (rect.x - (fw - w) / 2) / (fw || 1),
    oy: (rect.y - (fh - h) / 2) / (fh || 1),
    scaleX,
    scaleY,
  };
}

export function clampPlacement(p: ImagePlacement): ImagePlacement {
  return {
    ox: p.ox,
    oy: p.oy,
    scaleX: clamp(p.scaleX, MIN_SCALE, MAX_SCALE),
    scaleY: clamp(p.scaleY, MIN_SCALE, MAX_SCALE),
  };
}

export function snapPlacement(p: ImagePlacement): {
  placement: ImagePlacement;
  snapX: boolean;
  snapY: boolean;
} {
  const snapX = Math.abs(p.ox) <= SNAP_THRESHOLD;
  const snapY = Math.abs(p.oy) <= SNAP_THRESHOLD;
  return {
    placement: clampPlacement({
      ...p,
      ox: snapX ? 0 : p.ox,
      oy: snapY ? 0 : p.oy,
    }),
    snapX,
    snapY,
  };
}

export function intersect(a: ImageRect, b: ImageRect): ImageRect | null {
  const x = Math.max(a.x, b.x);
  const y = Math.max(a.y, b.y);
  const r = Math.min(a.x + a.w, b.x + b.w);
  const btm = Math.min(a.y + a.h, b.y + b.h);
  const w = r - x;
  const h = btm - y;
  if (w <= 1 || h <= 1) return null;
  return { x, y, w, h };
}

export function visibleRegion(
  fw: number,
  fh: number,
  progress: number,
  axis: "vertical" | "horizontal",
  slot: "before" | "after",
): ImageRect {
  const splitV = progress * fw;
  const splitH = progress * fh;
  if (axis === "vertical") {
    if (slot === "after") return { x: 0, y: 0, w: splitV, h: fh };
    return { x: splitV, y: 0, w: fw - splitV, h: fh };
  }
  if (slot === "after") return { x: 0, y: 0, w: fw, h: splitH };
  return { x: 0, y: splitH, w: fw, h: fh - splitH };
}

export function panPlacement(
  start: ImagePlacement,
  dx: number,
  dy: number,
  fw: number,
  fh: number,
): { placement: ImagePlacement; snapX: boolean; snapY: boolean } {
  return snapPlacement({
    ...start,
    ox: start.ox + dx / (fw || 1),
    oy: start.oy + dy / (fh || 1),
  });
}

function minSize(base: number) {
  return Math.max(8, base * MIN_SCALE);
}

export function resizePlacement(
  startRect: ImageRect,
  displayed: ImageRect,
  handle: ResizeHandle,
  dx: number,
  dy: number,
  fw: number,
  fh: number,
  baseW: number,
  baseH: number,
): { placement: ImagePlacement; snapX: boolean; snapY: boolean } {
  const minW = minSize(baseW);
  const minH = minSize(baseH);
  const maxW = baseW * MAX_SCALE;
  const maxH = baseH * MAX_SCALE;
  const corner = handle.length === 2;
  const visW = Math.max(1, displayed.w);
  const visH = Math.max(1, displayed.h);

  let L = startRect.x;
  let T = startRect.y;
  let R = startRect.x + startRect.w;
  let B = startRect.y + startRect.h;

  if (corner) {
    const fx = handle.includes("e") ? (visW + dx) / visW : (visW - dx) / visW;
    const fy = handle.includes("s") ? (visH + dy) / visH : (visH - dy) / visH;
    const f = Math.abs(fx - 1) >= Math.abs(fy - 1) ? fx : fy;
    let newW = clamp(startRect.w * f, minW, maxW);
    let newH = clamp(startRect.h * f, minH, maxH);
    const aspect = startRect.w / (startRect.h || 1);
    if (Math.abs(fx - 1) >= Math.abs(fy - 1)) newH = newW / aspect;
    else newW = newH * aspect;
    newW = clamp(newW, minW, maxW);
    newH = newW / aspect;
    if (handle.includes("w")) L = R - newW;
    else R = L + newW;
    if (handle.includes("n")) T = B - newH;
    else B = T + newH;
  } else if (handle === "e" || handle === "w") {
    const fx = handle === "e" ? (visW + dx) / visW : (visW - dx) / visW;
    const newW = clamp(startRect.w * fx, minW, maxW);
    if (handle === "w") L = R - newW;
    else R = L + newW;
  } else {
    const fy = handle === "s" ? (visH + dy) / visH : (visH - dy) / visH;
    const newH = clamp(startRect.h * fy, minH, maxH);
    if (handle === "n") T = B - newH;
    else B = T + newH;
  }

  return snapPlacement(
    placementFromRect({ x: L, y: T, w: R - L, h: B - T }, fw, fh, baseW, baseH),
  );
}

export function handleCursor(handle: ResizeHandle): string {
  switch (handle) {
    case "n":
    case "s":
      return "ns-resize";
    case "e":
    case "w":
      return "ew-resize";
    case "ne":
    case "sw":
      return "nesw-resize";
    case "nw":
    case "se":
      return "nwse-resize";
  }
}

export function hitHandle(
  px: number,
  py: number,
  vis: ImageRect,
  slop = 12,
): ResizeHandle | null {
  const L = vis.x;
  const T = vis.y;
  const R = vis.x + vis.w;
  const B = vis.y + vis.h;
  const cx = L + vis.w / 2;
  const cy = T + vis.h / 2;
  const c = slop + 4;
  const near = (x: number, y: number) => Math.hypot(px - x, py - y) <= c;
  if (near(L, T)) return "nw";
  if (near(R, T)) return "ne";
  if (near(R, B)) return "se";
  if (near(L, B)) return "sw";
  const onV = py >= T - slop && py <= B + slop;
  const onH = px >= L - slop && px <= R + slop;
  if (onV && Math.abs(px - L) <= slop) return "w";
  if (onV && Math.abs(px - R) <= slop) return "e";
  if (onH && Math.abs(py - T) <= slop) return "n";
  if (onH && Math.abs(py - B) <= slop) return "s";
  if (near(cx, T)) return "n";
  if (near(cx, B)) return "s";
  if (near(R, cy)) return "e";
  if (near(L, cy)) return "w";
  return null;
}

export function pointInRect(px: number, py: number, r: ImageRect) {
  return px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h;
}

export function nearSlider(
  px: number,
  py: number,
  fw: number,
  fh: number,
  progress: number,
  axis: "vertical" | "horizontal",
  band = 16,
) {
  if (axis === "vertical") {
    const x = progress * fw;
    const cy = fh / 2;
    if (Math.hypot(px - x, py - cy) <= 22) return true;
    return Math.abs(px - x) <= band;
  }
  const y = progress * fh;
  const cx = fw / 2;
  if (Math.hypot(px - cx, py - y) <= 22) return true;
  return Math.abs(py - y) <= band;
}
