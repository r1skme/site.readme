// Page titles and descriptions. Used by the client (tab title on navigation and
// language change) and by the build, which writes them into each route's HTML.
import { L, type Lang, type Localized } from './l10n';
import { projects, findProject } from '../data/projects';

export const SITE_URL = 'https://predict.rip';

const pages: Record<string, { title: Localized; description: Localized }> = {
  '/': {
    title: L('R1SK — проекты, разработка и монтаж', 'R1SK — projects, development and video'),
    description: L(
      'R1SK — Python / C++ разработчик. Локальный поиск по коду ReSearchify, автоматизация Prime Market, кроссплатформенные сборки и игровой видеомонтаж.',
      'R1SK — Python / C++ developer. ReSearchify local code search, Prime Market automation, cross-platform builds and gaming video editing.',
    ),
  },
  '/projects/': {
    title: L('Проекты — R1SK', 'Projects — R1SK'),
    description: L(
      'ReSearchify, Prime Market, Predict, ShareX для macOS и Linux, GLOW RUST и EXchange: задачи, стек и статус.',
      'ReSearchify, Prime Market, Predict, ShareX for macOS & Linux, GLOW RUST and EXchange: purpose, stack and status.',
    ),
  },
  '/media/': {
    title: L('Медиа — R1SK', 'Media — R1SK'),
    description: L(
      'Игровой видеомонтаж в DaVinci Resolve: 150K+ просмотров на четырёх TikTok-роликах, видео на YouTube.',
      'Gaming video editing in DaVinci Resolve: 150K+ views on four TikTok posts, videos on YouTube.',
    ),
  },
  '/skills/': {
    title: L('Навыки — R1SK', 'Skills — R1SK'),
    description: L(
      'Python, C++20, Telegram-боты, CI и релизы, интерфейсы и тестирование, DaVinci Resolve — на примерах проектов.',
      'Python, C++20, Telegram bots, CI and releases, interfaces and testing, DaVinci Resolve — backed by projects.',
    ),
  },
  '/about/': {
    title: L('Обо мне — R1SK', 'About — R1SK'),
    description: L(
      'Кто я, чем занимаюсь и как работаю над задачами: от сценария до проверки результата.',
      'Who I am, what I work on and how I approach tasks: from the workflow to testing the result.',
    ),
  },
  '/roadmap/': {
    title: L('Путь и планы — R1SK', 'Roadmap — R1SK'),
    description: L(
      'Монтаж, первые запуски и собственные инструменты: что получилось и что дальше.',
      'Editing, early launches and my own tools: what worked and what comes next.',
    ),
  },
  '/contact/': {
    title: L('Контакты — R1SK', 'Contact — R1SK'),
    description: L(
      'Telegram @R1SKME, Discord r1sk.gg, GitHub r1skme.',
      'Telegram @R1SKME, Discord r1sk.gg, GitHub r1skme.',
    ),
  },
};

const notFound = {
  title: L('Страница не найдена — R1SK', 'Page not found — R1SK'),
  description: pages['/'].description,
};

/** Every prerendered route, without leading or trailing slashes ('' is home). */
export const routes = [
  '',
  'projects',
  'media',
  'skills',
  'about',
  'roadmap',
  'contact',
  ...projects.map((p) => `projects/${p.slug}`),
];

export const isKnownPath = (pathname: string) =>
  routes.some((r) => (r ? `/${r}/` : '/') === pathname);

export function getPageMeta(pathname: string, lang: Lang) {
  const page = pages[pathname];
  if (page) return { title: page.title[lang], description: page.description[lang] };
  const match = /^\/projects\/([^/]+)\/$/.exec(pathname);
  const project = match ? findProject(match[1]) : undefined;
  if (project)
    return {
      title: `${project.name} — R1SK`,
      description: `${project.tagline[lang]} ${project.summary[lang]}`.replace(/`/g, ''),
    };
  return { title: notFound.title[lang], description: notFound.description[lang] };
}
