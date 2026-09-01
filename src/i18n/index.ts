import { en, type Messages } from "./en";
import { sr } from "./sr";

export type LocaleId = "en" | "sr";

export type LocaleDef = {
  id: LocaleId;
  native: string;
  htmlLang: string;
  messages: Messages;
};

/**
 * Register a language here (and add a messages file that satisfies `Messages`).
 * English is the source of truth for keys — TypeScript will fail the build
 * if a locale is missing a string.
 */
export const LOCALES: Record<LocaleId, LocaleDef> = {
  en: { id: "en", native: "English", htmlLang: "en", messages: en },
  sr: { id: "sr", native: "Српски", htmlLang: "sr-Cyrl", messages: sr },
};

export const DEFAULT_LOCALE: LocaleId = "en";

export const LOCALE_IDS = Object.keys(LOCALES) as LocaleId[];

export type { Messages };

type Vars = Record<string, string | number>;

function lookup(messages: Messages, path: string): string | undefined {
  const parts = path.split(".");
  let cur: unknown = messages;
  for (const p of parts) {
    if (cur == null || typeof cur !== "object") return undefined;
    cur = (cur as Record<string, unknown>)[p];
  }
  return typeof cur === "string" ? cur : undefined;
}

export function translate(locale: LocaleId, path: string, vars?: Vars): string {
  const pack = LOCALES[locale]?.messages ?? en;
  let text = lookup(pack, path) ?? lookup(en, path) ?? path;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      text = text.replaceAll(`{${k}}`, String(v));
    }
  }
  return text;
}
