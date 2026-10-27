import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Lang, Localized } from '@/lib/l10n';

export { L } from '@/lib/l10n';
export type { Lang, Localized } from '@/lib/l10n';

const STORAGE_KEY = 'r1sk-lang';

function remember(value: Lang) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Private mode: the language simply is not remembered between pages.
  }
}

function initialLang(): Lang {
  const query = new URLSearchParams(window.location.search).get('lang');
  if (query === 'en' || query === 'ru') {
    remember(query);
    return query;
  }
  try {
    return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'ru';
  } catch {
    return 'ru';
  }
}

const Ctx = createContext<{ lang: Lang; setLang: (v: Lang) => void; t: (s: Localized) => string }>({
  lang: 'ru',
  setLang: () => {},
  t: (s) => s.ru,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const setLang = useCallback((value: Lang) => {
    setLangState(value);
    remember(value);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', value);
      history.replaceState(history.state, '', url);
    } catch {}
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const t = useCallback((s: Localized) => s[lang], [lang]);
  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useLanguage = () => useContext(Ctx);
