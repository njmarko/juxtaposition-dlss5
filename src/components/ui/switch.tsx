import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

export function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        "peer inline-flex h-6 w-10 shrink-0 items-center rounded-full border border-line",
        "bg-surface-2 transition-[background-color] duration-150 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper/40",
        "data-[state=checked]:border-paper data-[state=checked]:bg-paper",
        "disabled:cursor-not-allowed disabled:opacity-40",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block size-4 rounded-full bg-muted",
          "translate-x-1 transition-transform duration-150 ease-out",
          "data-[state=checked]:translate-x-5 data-[state=checked]:bg-paper-fg",
        )}
      />
    </SwitchPrimitive.Root>
  );
}
