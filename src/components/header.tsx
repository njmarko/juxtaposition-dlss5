import { Button } from "@/components/ui/button";
import { Segmented } from "@/components/ui/segmented";
import { FlagEN, FlagRS } from "@/components/flags";
import { useI18n } from "@/i18n/context";
import type { LocaleId } from "@/i18n";

function XLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const FLAGS: Record<LocaleId, typeof FlagEN> = {
  en: FlagEN,
  sr: FlagRS,
};

export function Header() {
  const { t, locale, setLocale, localeIds, locales } = useI18n();

  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <a href="/" className="group flex items-center gap-3">
            <span
              aria-hidden="true"
              className="relative flex size-9 overflow-hidden rounded-md"
            >
              <span className="absolute inset-y-0 left-0 w-1/2 bg-wave" />
              <span className="absolute inset-y-0 right-0 w-1/2 bg-surface-2" />
              <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-paper" />
              <span className="absolute left-1/2 top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-badge-on" />
            </span>
            <span className="flex flex-col">
              <span
                data-testid="app-title"
                className="font-display text-xl font-medium leading-tight tracking-tight text-fg sm:text-2xl"
              >
                {t("app.name")}
              </span>
              <span className="text-xs tracking-wide text-muted">
                {t("app.tagline")}
              </span>
            </span>
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <div className="min-w-56">
            <Segmented<LocaleId>
              size="sm"
              ariaLabel={t("lang.switch")}
              value={locale}
              onChange={setLocale}
              options={localeIds.map((id) => {
                const Flag = FLAGS[id];
                return {
                  id,
                  label: locales[id].native,
                  hint: t("hint.lang"),
                  testId: `locale-${id}`,
                  icon: <Flag />,
                };
              })}
            />
          </div>
          <p className="text-sm text-muted">
            {t("header.madeBy")}{" "}
            <a
              href="https://x.com/njmarko"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-fg underline decoration-line-strong underline-offset-4 transition-[color,text-decoration-color] duration-150 hover:text-paper hover:decoration-paper"
            >
              Marko Njegomir
            </a>{" "}
            {t("header.withGrok")}
          </p>
          <Button variant="outline" size="sm" asChild>
            <a
              href="https://x.com/njmarko"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("header.xAria")}
            >
              <XLogo className="size-3.5" />
              <span>@njmarko</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
