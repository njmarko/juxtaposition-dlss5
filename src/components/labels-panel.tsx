import { Field } from "@/components/ui/label";
import { Segmented } from "@/components/ui/segmented";
import { Switch } from "@/components/ui/switch";
import { Tooltip } from "@/components/ui/tooltip";
import { useI18n } from "@/i18n/context";
import {
  clampLabel,
  type LabelKind,
  type OverlayLabel,
} from "@/lib/labels";

function LabelEditor({
  title,
  label,
  onChange,
}: {
  title: string;
  label: OverlayLabel;
  onChange: (next: OverlayLabel) => void;
}) {
  const { t } = useI18n();

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-3">
      <p className="text-sm font-medium text-fg">{title}</p>
      <Tooltip content={t("hint.labelEnable")}>
        <label className="flex items-center justify-between gap-3 text-sm text-fg">
          <span className="cursor-help decoration-faint underline decoration-dotted underline-offset-4">
            {t("labels.enable")}
          </span>
          <Switch
            checked={label.enabled}
            onCheckedChange={(v) => onChange({ ...label, enabled: v })}
          />
        </label>
      </Tooltip>
      <Field label={t("labels.kind")} hint={t("hint.labelKind")}>
        <Segmented<LabelKind>
          value={label.kind}
          onChange={(kind) => onChange({ ...label, kind })}
          options={[
            { id: "on", label: t("labels.on"), hint: t("hint.labelKind"), testId: "label-kind-on" },
            { id: "off", label: t("labels.off"), hint: t("hint.labelKind"), testId: "label-kind-off" },
          ]}
        />
      </Field>
      <Field label={t("labels.size")} hint={t("hint.labelSize")}>
        <input
          type="range"
          min={0.016}
          max={0.12}
          step={0.001}
          aria-label={t("labels.size")}
          disabled={!label.enabled}
          value={label.size}
          onChange={(e) =>
            onChange(clampLabel({ ...label, size: Number(e.target.value) }))
          }
          className="h-8 w-full cursor-pointer accent-paper disabled:opacity-40"
        />
      </Field>
    </div>
  );
}

export function LabelsPanel({
  beforeLabel,
  afterLabel,
  onBefore,
  onAfter,
}: {
  beforeLabel: OverlayLabel;
  afterLabel: OverlayLabel;
  onBefore: (l: OverlayLabel) => void;
  onAfter: (l: OverlayLabel) => void;
}) {
  const { t } = useI18n();

  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="font-display text-lg font-medium text-fg">{t("labels.title")}</h2>
        <p className="text-xs text-muted">{t("labels.blurb")}</p>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <LabelEditor
          title={t("labels.before")}
          label={beforeLabel}
          onChange={onBefore}
        />
        <LabelEditor
          title={t("labels.after")}
          label={afterLabel}
          onChange={onAfter}
        />
      </div>
      <p className="text-xs text-faint">{t("labels.drag")}</p>
    </section>
  );
}
