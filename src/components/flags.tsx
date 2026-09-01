import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

function FlagShell({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 60 30"
      aria-hidden="true"
      className={cn(
        "h-3.5 w-5 shrink-0 overflow-hidden rounded-[2px] outline outline-1 outline-fg/25",
        className,
      )}
    >
      {children}
    </svg>
  );
}

/** Union Jack, simplified so it reads at 20×12. */
export function FlagEN({ className }: { className?: string }) {
  return (
    <FlagShell className={className}>
      <defs>
        <clipPath id="flag-en-clip">
          <rect width="60" height="30" />
        </clipPath>
      </defs>
      <g clipPath="url(#flag-en-clip)">
        <rect width="60" height="30" fill="#012169" />
        <path d="M0 0l60 30M60 0L0 30" stroke="#fff" strokeWidth="6" />
        <path d="M0 0l60 30M60 0L0 30" stroke="#C8102E" strokeWidth="2.2" />
        <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
        <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </FlagShell>
  );
}

/** Serbian tricolor, no coat of arms at this size. */
export function FlagRS({ className }: { className?: string }) {
  return (
    <FlagShell className={className}>
      <rect width="60" height="10" fill="#C6363C" />
      <rect y="10" width="60" height="10" fill="#0C4076" />
      <rect y="20" width="60" height="10" fill="#fff" />
    </FlagShell>
  );
}
