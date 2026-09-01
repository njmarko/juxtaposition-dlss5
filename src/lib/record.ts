export function sampleRecorded(
  samples: Float32Array,
  time: number,
  fps: number,
): number {
  if (samples.length === 0) return 0;
  const idx = Math.max(0, time * fps);
  const i0 = Math.min(samples.length - 1, Math.floor(idx));
  const i1 = Math.min(samples.length - 1, i0 + 1);
  const f = Math.min(1, Math.max(0, idx - i0));
  return samples[i0]! * (1 - f) + samples[i1]! * f;
}

export function allocTake(duration: number, fps: number, fill = 0) {
  const n = Math.max(1, Math.round(duration * fps));
  const a = new Float32Array(n);
  a.fill(fill);
  return a;
}

export type MotionMode = "auto" | "manual";
