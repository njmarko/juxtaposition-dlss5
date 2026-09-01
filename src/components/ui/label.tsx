import * as React from "react";
import { cn } from "@/lib/utils";
import { Tooltip } from "@/components/ui/tooltip";

export function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      className={cn(
        "text-xs font-medium tracking-wide text-muted",
        className,
      )}
      {...props}
    />
  );
}

export function Field({
  label,
  hint,
  className,
  children,
}: {
  label: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {hint ? (
        <Tooltip content={hint}>
          <span className="w-fit cursor-help text-xs font-medium tracking-wide text-muted underline decoration-dotted decoration-faint underline-offset-4">
            {label}
          </span>
        </Tooltip>
      ) : (
        <span className="w-fit text-xs font-medium tracking-wide text-muted">
          {label}
        </span>
      )}
      {children}
    </div>
  );
}
