import { useRef } from "react";
import { ClipboardPaste, ImageIcon, RotateCcw, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/utils";
import type { SlotImage } from "@/lib/load-image";

type SlotKey = "before" | "after";

function SlotCard({
  slot,
  image,
  active,
  canReset,
  onSelect,
  onFile,
  onReset,
}: {
  slot: SlotKey;
  image: SlotImage | null;
  active: boolean;
  canReset: boolean;
  onSelect: () => void;
  onFile: (file: File) => void;
  onReset: () => void;
}) {
  const { t } = useI18n();
  const inputRef = useRef<HTMLInputElement>(null);
  const title = slot === "before" ? t("images.beforeTitle") : t("images.afterTitle");
  const hint = slot === "before" ? t("images.beforeHint") : t("images.afterHint");
  const slotHint = slot === "before" ? t("hint.slotBefore") : t("hint.slotAfter");

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className={cn(
        "flex min-h-44 flex-col overflow-hidden rounded-lg border bg-surface transition-[border-color,box-shadow] duration-150",
        active ? "border-paper/70 ring-2 ring-paper/25" : "border-line hover:border-line-strong",
      )}
    >
      <div className="relative aspect-photo bg-surface-2">
        {image ? (
          <img
            src={image.url}
            alt={title}
            draggable={false}
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted">
            <ImageIcon className="size-6" strokeWidth={1.5} />
            <span className="text-xs">{t("images.empty")}</span>
          </div>
        )}
        <span className="absolute left-2 top-2 rounded-sm bg-bg/80 px-2 py-0.5 text-xs font-medium text-fg">
          {slot === "before" ? t("images.before") : t("images.after")}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <Tooltip content={slotHint}>
          <div>
            <p className="cursor-help text-sm font-medium text-fg underline decoration-dotted decoration-faint underline-offset-4">
              {title}
            </p>
            <p className="text-xs text-muted">{hint}</p>
          </div>
        </Tooltip>
        <p className="truncate text-xs text-faint">
          {image ? image.name : t("images.none")}
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFile(f);
            e.currentTarget.value = "";
          }}
        />
        <div className="flex gap-2">
          <Tooltip content={t("hint.upload")}>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
                inputRef.current?.click();
              }}
            >
              <Upload className="size-3.5" />
              {t("images.upload")}
            </Button>
          </Tooltip>
          <Tooltip content={t("hint.resetFrame")}>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!canReset}
              aria-label={t("images.reset")}
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
                onReset();
              }}
            >
              <RotateCcw className="size-3.5" />
              {t("images.reset")}
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export function ImageSlots({
  before,
  after,
  active,
  beforeCanReset,
  afterCanReset,
  onActive,
  onFile,
  onPasteClick,
  onSwap,
  onReset,
}: {
  before: SlotImage | null;
  after: SlotImage | null;
  active: SlotKey;
  beforeCanReset: boolean;
  afterCanReset: boolean;
  onActive: (s: SlotKey) => void;
  onFile: (slot: SlotKey, file: File) => void;
  onPasteClick: () => void;
  onSwap: () => void;
  onReset: (slot: SlotKey) => void;
}) {
  const { t } = useI18n();

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-medium text-fg">{t("images.title")}</h2>
          <p className="text-xs text-muted">{t("images.blurb")}</p>
        </div>
        <div className="flex gap-2">
          <Tooltip content={t("hint.swap")}>
            <Button type="button" variant="ghost" size="sm" onClick={onSwap}>
              {t("images.swap")}
            </Button>
          </Tooltip>
          <Tooltip content={t("hint.paste")}>
            <Button type="button" variant="outline" size="sm" onClick={onPasteClick}>
              <ClipboardPaste className="size-3.5" />
              {t("images.paste")}
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <SlotCard
          slot="before"
          image={before}
          active={active === "before"}
          canReset={beforeCanReset}
          onSelect={() => onActive("before")}
          onFile={(f) => onFile("before", f)}
          onReset={() => onReset("before")}
        />
        <SlotCard
          slot="after"
          image={after}
          active={active === "after"}
          canReset={afterCanReset}
          onSelect={() => onActive("after")}
          onFile={(f) => onFile("after", f)}
          onReset={() => onReset("after")}
        />
      </div>
      <p className="text-xs text-faint">{t("images.pasteHint")}</p>
    </section>
  );
}