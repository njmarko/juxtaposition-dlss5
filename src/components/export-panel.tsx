import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/label";
import { Input, NativeSelect } from "@/components/ui/input";
import { Segmented } from "@/components/ui/segmented";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tooltip } from "@/components/ui/tooltip";
import { useI18n } from "@/i18n/context";
import { formatBytes } from "@/lib/utils";
import {
  ASPECTS,
  estimateFileBytes,
  type AspectId,
  type FormatId,
  type QualityId,
  type ResId,
} from "@/lib/presets";
import type { FitMode } from "@/lib/draw";

export function ExportPanel({
  aspect,
  res,
  customW,
  customH,
  fps,
  format,
  quality,
  fit,
  showLine,
  outW,
  outH,
  duration,
  exporting,
  exportRatio,
  exportFrame,
  exportTotal,
  exportStage,
  onAspect,
  onRes,
  onCustomW,
  onCustomH,
  onFps,
  onFormat,
  onQuality,
  onFit,
  onShowLine,
  onExport,
  onCancel,
}: {
  aspect: AspectId;
  res: ResId;
  customW: number;
  customH: number;
  fps: 30 | 60;
  format: FormatId;
  quality: QualityId;
  fit: FitMode;
  showLine: boolean;
  outW: number;
  outH: number;
  duration: number;
  exporting: boolean;
  exportRatio: number;
  exportFrame: number;
  exportTotal: number;
  exportStage: "encoding" | "finalizing";
  onAspect: (v: AspectId) => void;
  onRes: (v: ResId) => void;
  onCustomW: (n: number) => void;
  onCustomH: (n: number) => void;
  onFps: (n: 30 | 60) => void;
  onFormat: (v: FormatId) => void;
  onQuality: (v: QualityId) => void;
  onFit: (v: FitMode) => void;
  onShowLine: (v: boolean) => void;
  onExport: () => void;
  onCancel: () => void;
}) {
  const { t } = useI18n();
  const estimate = estimateFileBytes(outW, outH, fps, quality, duration);
  const frames = Math.round(duration * fps);

  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="font-display text-lg font-medium text-fg">{t("export.title")}</h2>
        <p className="text-xs text-muted">{t("export.blurb")}</p>
      </div>

      <Field label={t("export.aspect")} hint={t("hint.aspect")}>
        <NativeSelect
          value={aspect}
          aria-label={t("export.aspect")}
          data-testid="aspect-select"
          onChange={(e) => onAspect(e.target.value as AspectId)}
        >
          {ASPECTS.map((a) => (
            <option key={a.id} value={a.id}>
              {t(`aspect.${a.id}`)}
            </option>
          ))}
        </NativeSelect>
      </Field>

      <Field label={t("export.res")} hint={t("hint.res")}>
        <NativeSelect
          value={res}
          aria-label={t("export.res")}
          data-testid="res-select"
          onChange={(e) => onRes(e.target.value as ResId)}
        >
          {(["1080p", "2k", "4k", "source", "custom"] as ResId[]).map((id) => (
            <option key={id} value={id}>
              {t(`res.${id}`)}
            </option>
          ))}
        </NativeSelect>
      </Field>

      {res === "custom" ? (
        <div className="grid grid-cols-2 gap-3">
          <Field label={t("export.width")} hint={t("hint.width")}>
            <Input
              type="number"
              min={64}
              max={7680}
              step={2}
              aria-label={t("export.width")}
              value={customW}
              onChange={(e) => onCustomW(Number(e.target.value) || 0)}
            />
          </Field>
          <Field label={t("export.height")} hint={t("hint.height")}>
            <Input
              type="number"
              min={64}
              max={7680}
              step={2}
              aria-label={t("export.height")}
              value={customH}
              onChange={(e) => onCustomH(Number(e.target.value) || 0)}
            />
          </Field>
        </div>
      ) : null}

      <p className="font-mono text-sm tabular-nums text-muted">
        {outW} × {outH}
        <span className="text-faint">
          {" "}
          · {frames} frames · ~{formatBytes(estimate)}
        </span>
      </p>

      <Field label={t("export.fps")} hint={t("hint.fps")}>
        <Segmented
          value={String(fps)}
          onChange={(v) => onFps(Number(v) as 30 | 60)}
          ariaLabel={t("export.fps")}
          options={[
            { id: "30", label: t("export.fps30"), hint: t("hint.fps"), testId: "fps-30" },
            { id: "60", label: t("export.fps60"), hint: t("hint.fps"), testId: "fps-60" },
          ]}
        />
      </Field>

      <Field label={t("export.format")} hint={t("hint.format")}>
        <Segmented
          value={format}
          onChange={onFormat}
          ariaLabel={t("export.format")}
          options={[
            { id: "mp4", label: "MP4", hint: t("hint.format") },
            { id: "webm", label: "WebM", hint: t("hint.format") },
          ]}
        />
      </Field>

      <Field label={t("export.quality")} hint={t("hint.quality")}>
        <Segmented
          value={quality}
          onChange={onQuality}
          ariaLabel={t("export.quality")}
          options={[
            { id: "medium", label: t("quality.medium"), hint: t("hint.qMedium"), testId: "quality-medium" },
            { id: "high", label: t("quality.high"), hint: t("hint.qHigh"), testId: "quality-high" },
            { id: "very-high", label: t("quality.very-high"), hint: t("hint.qVeryHigh"), testId: "quality-max" },
          ]}
        />
      </Field>

      <Separator />

      <Field label={t("export.fit")} hint={t("hint.fit")}>
        <NativeSelect
          value={fit}
          aria-label={t("export.fit")}
          onChange={(e) => onFit(e.target.value as FitMode)}
        >
          <option value="cover">{t("fit.cover")}</option>
          <option value="contain">{t("fit.contain")}</option>
          <option value="stretch">{t("fit.stretch")}</option>
        </NativeSelect>
      </Field>

      <Tooltip content={t("hint.showLine")}>
        <label className="flex items-center justify-between gap-3 text-sm text-fg">
          <span className="cursor-help decoration-faint underline decoration-dotted underline-offset-4">
            {t("export.showLine")}
          </span>
          <Switch checked={showLine} onCheckedChange={onShowLine} />
        </label>
      </Tooltip>

      {exporting ? (
        <div className="flex flex-col gap-2">
          <Progress value={exportRatio * 100} />
          <p className="text-xs tabular-nums text-muted">
            {exportStage === "finalizing"
              ? t("export.finalizing")
              : t("export.frame", { n: exportFrame, total: exportTotal })}
          </p>
          <Tooltip content={t("hint.cancel")}>
            <Button type="button" variant="outline" onClick={onCancel}>
              {t("export.cancel")}
            </Button>
          </Tooltip>
        </div>
      ) : (
        <Tooltip content={t("hint.export")}>
          <Button type="button" size="lg" onClick={onExport} data-testid="export-button">
            <Download className="size-4" />
            {t("export.button")}
          </Button>
        </Tooltip>
      )}
    </section>
  );
}
