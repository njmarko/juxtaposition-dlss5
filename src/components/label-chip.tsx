import { useRef } from "react";
import { cn } from "@/lib/utils";
import {
  LABEL_TEXT,
  clampLabel,
  type OverlayLabel,
} from "@/lib/labels";

export function LabelChip({
  label,
  frameW,
  frameH,
  onChange,
  disabled,
}: {
  label: OverlayLabel;
  frameW: number;
  frameH: number;
  onChange: (next: OverlayLabel) => void;
  disabled?: boolean;
}) {
  const modeRef = useRef<"move" | "resize" | null>(null);
  const grabRef = useRef({ x: 0, y: 0, size: 0, pointerY: 0 });

  if (!label.enabled || frameW <= 0 || frameH <= 0) return null;

  const fontSize = Math.max(10, label.size * frameH);
  const padX = fontSize * 0.52;
  const padY = fontSize * 0.34;
  const tracking = fontSize * 0.04;
  const text = LABEL_TEXT[label.kind];

  const onPointerDown = (
    e: React.PointerEvent<HTMLElement>,
    mode: "move" | "resize",
  ) => {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    modeRef.current = mode;
    grabRef.current = {
      x: e.clientX - e.currentTarget.getBoundingClientRect().left,
      y: e.clientY - e.currentTarget.getBoundingClientRect().top,
      size: label.size,
      pointerY: e.clientY,
    };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!modeRef.current) return;
    if (!e.currentTarget.hasPointerCapture(e.pointerId) && modeRef.current === "move") {
      /* resize handle holds capture */
    }
    const parent = e.currentTarget.offsetParent as HTMLElement | null;
    const origin = parent?.getBoundingClientRect();
    if (modeRef.current === "resize") {
      const dy = e.clientY - grabRef.current.pointerY;
      onChange(clampLabel({ ...label, size: grabRef.current.size + dy / frameH }));
      return;
    }
    if (!origin) return;
    const x = (e.clientX - origin.left - grabRef.current.x) / frameW;
    const y = (e.clientY - origin.top - grabRef.current.y) / frameH;
    onChange(clampLabel({ ...label, x, y }));
  };

  const onPointerUp = (e: React.PointerEvent<HTMLElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    modeRef.current = null;
  };

  return (
    <div
      role="group"
      aria-label={text}
      onPointerDown={(e) => onPointerDown(e, "move")}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className={cn(
        "absolute select-none touch-none font-sans font-bold leading-none",
        disabled ? "cursor-default" : "cursor-grab active:cursor-grabbing",
        label.kind === "on" ? "bg-badge-on text-badge-fg" : "bg-badge-off text-badge-fg",
      )}
      style={{
        left: `${label.x * 100}%`,
        top: `${label.y * 100}%`,
        fontSize,
        padding: `${padY}px ${padX}px`,
        letterSpacing: `${tracking}px`,
        pointerEvents: disabled ? "none" : "auto",
      }}
    >
      {text}
      {disabled ? null : (
        <span
          aria-hidden="true"
          onPointerDown={(e) => onPointerDown(e, "resize")}
          onPointerMove={(e) => {
            if (modeRef.current !== "resize") return;
            const dy = e.clientY - grabRef.current.pointerY;
            onChange(clampLabel({ ...label, size: grabRef.current.size + dy / frameH }));
          }}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="absolute -bottom-0.5 -right-0.5 size-3 cursor-nwse-resize rounded-xs bg-badge-fg/90"
        />
      )}
    </div>
  );
}
