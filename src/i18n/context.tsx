import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_IDS,
  translate,
  type LocaleId,
} from "./index";

const STORAGE_KEY = "juxtaposition-dlss5.locale";

type I18nValue = {
  locale: LocaleId;
  setLocale: (id: LocaleId) => void;
  t: (path: string, vars?: Record<string, string | number>) => string;
  locales: typeof LOCALES;
  localeIds: LocaleId[];
};

const I18nContext = createContext<I18nValue | null>(null);

function readStoredLocale(): LocaleId {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw && raw in LOCALES) return raw as LocaleId;
  return DEFAULT_LOCALE;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleId>(DEFAULT_LOCALE);

  useEffect(() => {
    setLocaleState(readStoredLocale());
  }, []);

  useEffect(() => {
    document.documentElement.lang = LOCALES[locale].htmlLang;
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* ignore */
    }
  }, [locale]);

  const setLocale = useCallback((id: LocaleId) => {
    if (id in LOCALES) setLocaleState(id);
  }, []);

  const t = useCallback(
    (path: string, vars?: Record<string, string | number>) =>
      translate(locale, path, vars),
    [locale],
  );

  const value = useMemo(
    () => ({ locale, setLocale, t, locales: LOCALES, localeIds: LOCALE_IDS }),
    [locale, setLocale, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
