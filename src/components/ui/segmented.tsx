import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Tooltip } from "@/components/ui/tooltip";

export function Segmented<T extends string>({
  value,
  onChange,
  options,
  className,
  size = "md",
  ariaLabel,
}: {
  value: T;
  onChange: (v: T) => void;
  options: {
    id: T;
    label: string;
    hint?: string;
    testId?: string;
    icon?: ReactNode;
  }[];
  className?: string;
  size?: "sm" | "md";
  ariaLabel?: string;
}) {
  return (
    <div
      className={cn("flex rounded-md bg-surface-2 p-1", className)}
      role="radiogroup"
      aria-label={ariaLabel ?? options.map((o) => o.label).join(" or ")}
    >
      {options.map((o) => {
        const on = value === o.id;
        const btn = (
          <button
            type="button"
            role="radio"
            aria-checked={on}
            aria-label={o.label}
            data-testid={o.testId}
            onClick={() => onChange(o.id)}
            className={cn(
              "inline-flex w-full items-center justify-center gap-1.5 rounded-sm font-medium transition-[background-color,color,transform] duration-150 ease-out",
              size === "sm" ? "h-8 px-2 text-xs" : "h-9 px-2.5 text-sm",
              on ? "bg-paper text-paper-fg" : "text-muted hover:text-fg",
            )}
          >
            {o.icon}
            <span className="truncate">{o.label}</span>
          </button>
        );
        return (
          <div key={o.id} className="min-w-0 flex-1">
            {o.hint ? <Tooltip content={o.hint}>{btn}</Tooltip> : btn}
          </div>
        );
      })}
    </div>
  );
}
