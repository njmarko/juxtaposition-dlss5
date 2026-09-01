import { clamp, roundTo } from "./utils";

export type PhaseId =
  | "waitStart"
  | "moveRight"
  | "waitRight"
  | "moveLeft"
  | "waitEnd";

export type TimingMode = "seconds" | "percent";

export type EasingId = "cinematic" | "smooth" | "gentle" | "linear";

export type Phases = Record<PhaseId, number>;

export const PHASE_ORDER: PhaseId[] = [
  "waitStart",
  "moveRight",
  "waitRight",
  "moveLeft",
  "waitEnd",
];

export const PHASE_META: Record<
  PhaseId,
  { label: string; short: string; kind: "hold" | "move" }
> = {
  waitStart: { label: "Hold left", short: "Hold L", kind: "hold" },
  moveRight: { label: "Sweep right", short: "→ Right", kind: "move" },
  waitRight: { label: "Hold right", short: "Hold R", kind: "hold" },
  moveLeft: { label: "Sweep left", short: "← Left", kind: "move" },
  waitEnd: { label: "Hold left", short: "Hold L", kind: "hold" },
};

export const DEFAULT_SECONDS: Phases = {
  waitStart: 1,
  moveRight: 2.5,
  waitRight: 1,
  moveLeft: 2.5,
  waitEnd: 1,
};

export function sumPhases(phases: Phases) {
  return PHASE_ORDER.reduce((acc, id) => acc + Math.max(0, phases[id]), 0);
}

export function scalePhases(phases: Phases, fromTotal: number, toTotal: number): Phases {
  const f = toTotal / (fromTotal || 1);
  const next: Phases = { ...phases };
  for (const id of PHASE_ORDER) {
    next[id] = roundTo(Math.max(0, phases[id] * f), 3);
  }
  return next;
}

export function toPercents(seconds: Phases): Phases {
  const total = sumPhases(seconds) || 1;
  const next: Phases = { ...seconds };
  for (const id of PHASE_ORDER) {
    next[id] = roundTo((seconds[id] / total) * 100, 2);
  }
  return next;
}

export function toSeconds(percents: Phases, totalDuration: number): Phases {
  const weight = sumPhases(percents) || 1;
  const next: Phases = { ...percents };
  for (const id of PHASE_ORDER) {
    next[id] = roundTo((percents[id] / weight) * totalDuration, 3);
  }
  return next;
}

export function resolveSeconds(
  phases: Phases,
  mode: TimingMode,
  totalDuration: number,
): Phases {
  if (mode === "seconds") return phases;
  return toSeconds(phases, totalDuration);
}

export function resolvedDuration(
  phases: Phases,
  mode: TimingMode,
  totalDuration: number,
) {
  if (mode === "seconds") return Math.max(0.1, sumPhases(phases));
  return Math.max(0.1, totalDuration);
}

/**
 * smootherstep — first and second derivatives are 0 at the ends,
 * so the slider eases in and out without a visible jerk.
 */
export function easeCinematic(t: number) {
  const x = clamp(t, 0, 1);
  return x * x * x * (x * (x * 6 - 15) + 10);
}

export function easeSmooth(t: number) {
  const x = clamp(t, 0, 1);
  return x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2;
}

export function easeGentle(t: number) {
  return -(Math.cos(Math.PI * clamp(t, 0, 1)) - 1) / 2;
}

export const EASINGS: Record<EasingId, (t: number) => number> = {
  cinematic: easeCinematic,
  smooth: easeSmooth,
  gentle: easeGentle,
  linear: (t) => clamp(t, 0, 1),
};

export const EASING_META: Record<EasingId, { label: string; hint: string }> = {
  cinematic: {
    label: "Cinematic",
    hint: "Smootherstep — acceleration and deceleration with no end jerk",
  },
  smooth: {
    label: "Smooth",
    hint: "Cubic ease-in-out",
  },
  gentle: {
    label: "Gentle",
    hint: "Sine ease-in-out",
  },
  linear: {
    label: "Linear",
    hint: "Constant speed — no easing",
  },
};

/** Slider position 0 = fully image A (left), 1 = fully image B (right). */
export function sliderAtTime(
  time: number,
  seconds: Phases,
  ease: (t: number) => number,
) {
  const t = Math.max(0, time);
  const a = Math.max(0, seconds.waitStart);
  const b = Math.max(0, seconds.moveRight);
  const c = Math.max(0, seconds.waitRight);
  const d = Math.max(0, seconds.moveLeft);

  const t1 = a;
  const t2 = t1 + b;
  const t3 = t2 + c;
  const t4 = t3 + d;

  if (t <= t1) return 0;
  if (t < t2) {
    if (b <= 1e-6) return 1;
    return ease((t - t1) / b);
  }
  if (t < t3) return 1;
  if (t < t4) {
    if (d <= 1e-6) return 0;
    return 1 - ease((t - t3) / d);
  }
  return 0;
}

export function phaseAtTime(time: number, seconds: Phases): PhaseId {
  const t = Math.max(0, time);
  const t1 = seconds.waitStart;
  const t2 = t1 + seconds.moveRight;
  const t3 = t2 + seconds.waitRight;
  const t4 = t3 + seconds.moveLeft;
  if (t < t1) return "waitStart";
  if (t < t2) return "moveRight";
  if (t < t3) return "waitRight";
  if (t < t4) return "moveLeft";
  return "waitEnd";
}
