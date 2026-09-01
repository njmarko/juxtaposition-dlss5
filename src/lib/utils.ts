import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function roundTo(n: number, places: number) {
  const p = 10 ** places;
  return Math.round(n * p) / p;
}

export function formatNum(n: number, places = 3) {
  const r = roundTo(n, places);
  if (Number.isInteger(r)) return String(r);
  return r.toFixed(places).replace(/0+$/, "").replace(/\.$/, "");
}

export function even(n: number) {
  const r = Math.max(2, Math.round(n));
  return r % 2 === 0 ? r : r + 1;
}

export function formatTime(seconds: number) {
  const s = Math.max(0, seconds);
  const m = Math.floor(s / 60);
  const rem = s - m * 60;
  const whole = Math.floor(rem);
  const frac = Math.floor((rem - whole) * 10);
  if (m > 0) {
    return `${m}:${whole.toString().padStart(2, "0")}.${frac}`;
  }
  return `${whole}.${frac}s`;
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${Math.round(bytes)} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
