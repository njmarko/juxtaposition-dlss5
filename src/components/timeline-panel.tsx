import { Field } from "@/components/ui/label";
import { Input, NativeSelect } from "@/components/ui/input";
import { Segmented } from "@/components/ui/segmented";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { useI18n } from "@/i18n/context";
import { formatNum, roundTo } from "@/lib/utils";
import type { SliderAxis } from "@/lib/draw";
import type { MotionMode } from "@/lib/record";
import {
  DEFAULT_SECONDS,
  PHASE_META,
  PHASE_ORDER,
  scalePhases,
  sumPhases,
  type EasingId,
  type PhaseId,
  type Phases,
  type TimingMode,
} from "@/lib/timeline";

const TIMING_PRESETS: { id: "short" | "default" | "cinematic" | "slow"; seconds: Phases }[] = [
  {
    id: "short",
    seconds: { waitStart: 0.4, moveRight: 1.2, waitRight: 0.8, moveLeft: 1.2, waitEnd: 0.4 },
  },
  { id: "default", seconds: DEFAULT_SECONDS },
  {
    id: "cinematic",
    seconds: { waitStart: 1.5, moveRight: 4, waitRight: 2, moveLeft: 3.5, waitEnd: 1 },
  },
  {
    id: "slow",
    seconds: { waitStart: 2, moveRight: 5, waitRight: 2.5, moveLeft: 5, waitEnd: 1.5 },
  },
];

const PRESET_HINT: Record<(typeof TIMING_PRESETS)[number]["id"], string> = {
  short: "hint.presetShort",
  default: "hint.presetDefault",
  cinematic: "hint.presetCinematic",
  slow: "hint.presetSlow",
};

const PRESET_LABEL: Record<(typeof TIMING_PRESETS)[number]["id"], string> = {
  short: "motion.presetShort",
  default: "motion.presetDefault",
  cinematic: "motion.presetCinematic",
  slow: "motion.presetSlow",
};

const PHASE_HINT: Record<PhaseId, string> = {
  waitStart: "hint.waitStart",
  moveRight: "hint.moveOut",
  waitRight: "hint.waitFar",
  moveLeft: "hint.moveBack",
  waitEnd: "hint.waitHome",
};

function phaseLabelKey(id: PhaseId, axis: SliderAxis): string {
  const v = axis === "vertical";
  switch (id) {
    case "waitStart":
      return v ? "phase.waitStartV" : "phase.waitStartH";
    case "moveRight":
      return v ? "phase.moveOutV" : "phase.moveOutH";
    case "waitRight":
      return v ? "phase.waitFarV" : "phase.waitFarH";
    case "moveLeft":
      return v ? "phase.moveBackV" : "phase.moveBackH";
    case "waitEnd":
      return v ? "phase.waitHomeV" : "phase.waitHomeH";
  }
}

export function TimelinePanel({
  motionMode,
  axis,
  mode,
  phases,
  totalDuration,
  easing,
  duration,
  onMotionMode,
  onAxis,
  onMode,
  onPhases,
  onTotal,
  onEasing,
}: {
  motionMode: MotionMode;
  axis: SliderAxis;
  mode: TimingMode;
  phases: Phases;
  totalDuration: number;
  easing: EasingId;
  duration: number;
  onMotionMode: (m: MotionMode) => void;
  onAxis: (a: SliderAxis) => void;
  onMode: (m: TimingMode) => void;
  onPhases: (p: Phases) => void;
  onTotal: (n: number) => void;
  onEasing: (e: EasingId) => void;
}) {
  const { t } = useI18n();
  const sum = sumPhases(phases);
  const unit = mode === "seconds" ? "s" : "%";
  const auto = motionMode === "auto";

  const setPhase = (id: PhaseId, raw: string) => {
    const n = Math.max(0, Number.parseFloat(raw) || 0);
    onPhases({ ...phases, [id]: n });
  };

  const setLength = (raw: string) => {
    const n = Math.max(0.1, Number.parseFloat(raw) || 0.1);
    if (auto && mode === "seconds") {
      onPhases(scalePhases(phases, sum || 1, n));
      onTotal(roundTo(n, 3));
    } else {
      onTotal(roundTo(n, 3));
    }
  };

  const lengthHint = !auto
    ? t("hint.lengthManual")
    : mode === "seconds"
      ? t("hint.lengthAuto")
      : t("hint.lengthPercent");

  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="font-display text-lg font-medium text-fg">{t("motion.title")}</h2>
        <p className="text-xs text-muted">
          {auto ? t("motion.blurbAuto") : t("motion.blurbManual")}
        </p>
      </div>

      <Field label={t("motion.mode")} hint={t("hint.motionMode")}>
        <Segmented<MotionMode>
          value={motionMode}
          onChange={onMotionMode}
          ariaLabel={t("motion.mode")}
          options={[
            { id: "auto", label: t("motion.auto"), hint: t("hint.motionMode"), testId: "motion-auto" },
            { id: "manual", label: t("motion.manual"), hint: t("hint.motionMode"), testId: "motion-manual" },
          ]}
        />
      </Field>

      <Field label={t("motion.axis")} hint={t("hint.axis")}>
        <Segmented<SliderAxis>
          value={axis}
          onChange={onAxis}
          ariaLabel={t("motion.axis")}
          options={[
            { id: "vertical", label: t("motion.vertical"), hint: t("hint.axis"), testId: "axis-vertical" },
            { id: "horizontal", label: t("motion.horizontal"), hint: t("hint.axis"), testId: "axis-horizontal" },
          ]}
        />
      </Field>

      {auto ? (
        <Field label={t("motion.units")} hint={t("hint.units")}>
          <Segmented<TimingMode>
            value={mode}
            onChange={onMode}
            ariaLabel={t("motion.units")}
            options={[
              { id: "seconds", label: t("motion.seconds"), hint: t("hint.units") },
              { id: "percent", label: t("motion.percent"), hint: t("hint.units") },
            ]}
          />
        </Field>
      ) : null}

      <Field label={t("motion.length")} hint={lengthHint}>
        <div className="relative">
          <Input
            type="number"
            min={0.1}
            step={0.1}
            inputMode="decimal"
            aria-label={t("motion.length")}
            value={Number.isFinite(duration) ? roundTo(duration, 3) : 0}
            onChange={(e) => setLength(e.target.value)}
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-faint">
            s
          </span>
        </div>
      </Field>

      <div className="flex flex-wrap gap-2">
        {TIMING_PRESETS.map((p) => (
          <Tooltip key={p.id} content={t(PRESET_HINT[p.id])}>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const total = sumPhases(p.seconds);
                onTotal(total);
                if (auto) {
                  onMode("seconds");
                  onPhases(p.seconds);
                }
              }}
            >
              {t(PRESET_LABEL[p.id])}
            </Button>
          </Tooltip>
        ))}
      </div>

      {auto ? (
        <>
          <Separator />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {PHASE_ORDER.map((id) => (
              <Field
                key={id}
                label={`${t(phaseLabelKey(id, axis))}${PHASE_META[id].kind === "move" ? ` · ${t("motion.eased")}` : ""}`}
                hint={t(PHASE_HINT[id])}
              >
                <div className="relative">
                  <Input
                    type="number"
                    min={0}
                    step={mode === "percent" ? 1 : 0.1}
                    inputMode="decimal"
                    aria-label={t(phaseLabelKey(id, axis))}
                    value={formatNum(phases[id])}
                    onChange={(e) => setPhase(id, e.target.value)}
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-faint">
                    {unit}
                  </span>
                </div>
              </Field>
            ))}
          </div>

          {mode === "percent" ? (
            <p className={sum === 100 ? "text-xs text-ok" : "text-xs text-muted"}>
              {t("motion.percentSum", { n: roundTo(sum, 2) })}{" "}
              {sum === 100 ? t("motion.percentOk") : t("motion.percentWeights")}
            </p>
          ) : null}

          <Field label={t("motion.easing")} hint={t("hint.easing")}>
            <NativeSelect
              value={easing}
              aria-label={t("motion.easing")}
              onChange={(e) => onEasing(e.target.value as EasingId)}
            >
              {(["cinematic", "smooth", "gentle", "linear"] as EasingId[]).map((id) => (
                <option key={id} value={id} title={t(`hint.${id}`)}>
                  {t(`easing.${id}`)}
                </option>
              ))}
            </NativeSelect>
          </Field>
        </>
      ) : null}
    </section>
  );
}
