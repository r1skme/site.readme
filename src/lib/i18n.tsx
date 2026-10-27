import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
export type Lang = 'ru' | 'en';
export type Localized = { ru: string; en: string };
const Ctx = createContext<{ lang: Lang; setLang: (v: Lang) => void; t: (s: Localized) => string }>({
  lang: 'ru',
  setLang: () => {},
  t: (s) => s.ru,
});
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const query = new URLSearchParams(window.location.search).get('lang');
    if (query === 'en' || query === 'ru') return query;
    try {
      return localStorage.getItem('r1sk-lang') === 'en' ? 'en' : 'ru';
    } catch {
      return 'ru';
    }
  });
  const setLang = useCallback((value: Lang) => {
    setLangState(value);
    try {
      localStorage.setItem('r1sk-lang', value);
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
export const L = (ru: string, en: string): Localized => ({ ru, en });
