// React-free localisation primitives, shared by the app and the build (vite.config.ts).
export type Lang = 'ru' | 'en';
export type Localized = { ru: string; en: string };
export const L = (ru: string, en: string): Localized => ({ ru, en });
