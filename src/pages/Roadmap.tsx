import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import Timeline, { type JourneyStep } from '@/components/ui/timeline';
import { useLanguage, L } from '@/lib/i18n';
import { PageHeading } from '@/components/Primitives';
const steps: JourneyStep[] = [
  {
    id: 'editing',
    date: L('Около трёх лет практики', 'About three years of practice'),
    title: L('Видеомонтаж', 'Video editing'),
    description: L(
      'В DaVinci Resolve собираю игровые эдиты: работаю с ритмом, анимацией, цветом и эффектами. Постепенно усложняю работу со звуком, изучаю моушн-дизайн и 3D.',
      'In DaVinci Resolve I make gaming edits, working with rhythm, animation, colour and effects. I continue improving sound design and learning motion design and 3D.',
    ),
    stack: ['DaVinci Resolve', 'Fusion', 'Fairlight'],
    href: '/media/',
    linkLabel: L('Смотреть работы', 'Watch my work'),
  },
  {
    id: 'glow',
    date: L('2025', '2025'),
    title: L('GLOW RUST', 'GLOW RUST'),
    description: L(
      'Запустил сервер в игре Rust: хостинг, плагины, поддержка и контент. Привлечь игроков оказалось сложнее, чем собрать сервер. Проект на паузе; главный вывод — не пытаться делать всё одному.',
      'I launched a server for the game Rust: hosting, plugins, support and content. Attracting players was harder than getting the server running. Paused; the main lesson was not to do everything alone.',
    ),
    stack: ['Rust', 'RCON'],
    href: '/projects/glow-rust/',
  },
  {
    id: 'prime',
    date: L('2026 — сейчас', '2026 — present'),
    title: L('Prime Market', 'Prime Market'),
    description: L(
      'Первый серьёзный программный проект: Telegram-бот с фильтрами и уведомлениями для рынка CS2-скинов и сайт проекта.',
      'My first serious software project: a Telegram bot with filters and notifications for the CS2 skin market, plus the project website.',
    ),
    stack: ['Python', 'SQLite', 'Telegram API'],
    href: '/projects/prime-market/',
  },
  {
    id: 'search',
    date: L('окт. 2026', 'Oct 2026'),
    title: L('ReSearchify', 'ReSearchify'),
    description: L(
      'Движок поиска по исходному коду на C++20 с CLI `rs`. Опубликованы preview-релизы под пять платформ, есть JSON и MCP для ИИ-агентов. Параллельно выпустил сборки ShareX для macOS и Linux.',
      'A C++20 source-code search engine with the `rs` CLI. Preview releases for five platforms, JSON and MCP for AI agents. In parallel I shipped ShareX builds for macOS and Linux.',
    ),
    stack: ['C++20', 'CMake', 'MCP', 'C#'],
    href: '/projects/researchify/',
  },
  {
    id: 'now',
    date: L('Сейчас', 'Now'),
    title: L('Новые инструменты', 'New tools'),
    description: L(
      'Развиваю Predict — игровой инструмент на C++ и Dear ImGui — и прототипирую ReSearchify Web: интернет-поиск и чтение источников для локальных LLM.',
      'Building Predict — a gaming tool in C++ and Dear ImGui — and prototyping ReSearchify Web: web search and source reading for local LLMs.',
    ),
    stack: ['Predict', 'ReSearchify Web'],
    href: '/projects/',
    linkLabel: L('Все проекты', 'All projects'),
  },
];
const next: { title: string; href?: string; copy: ReturnType<typeof L> }[] = [
  {
    title: 'Prime Market',
    href: '/projects/prime-market/',
    copy: L(
      'Браузерная версия, проверка основных сценариев и подготовка к публичному запуску.',
      'The browser version, core workflow testing and preparation for a public launch.',
    ),
  },
  {
    title: 'ReSearchify',
    href: '/projects/researchify/',
    copy: L(
      'Быстрее широкие regex и буквальный поиск, меньше индекс.',
      'Faster broad regex and literal search, a smaller index.',
    ),
  },
  {
    title: 'ReSearchify Web',
    copy: L(
      'Отдельный от ReSearchify проект: поиск в интернете, получение страниц и передача текста локальной модели. Стек ещё выбираю.',
      'Separate from ReSearchify: web search, page retrieval and handing clean text to a local model. Stack still being chosen.',
    ),
  },
  {
    title: 'Predict',
    href: '/projects/predict/',
    copy: L(
      'Функциональность и интерфейс. Публичная демонстрация — после релиза.',
      'Features and interface. Public demo after release.',
    ),
  },
];
export default function Roadmap() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeading
        title={t(L('Путь и планы.', 'Work in progress.'))}
        desc={t(
          L(
            'Монтаж, первые запуски и собственные инструменты. Что получилось, чему научился и над чем работаю дальше.',
            'Editing, early launches and my own tools. What worked, what I learned and what I am building next.',
          ),
        )}
        side={
          <div className="pill-links">
            <a href="#journey">
              {t(L('Мой опыт', 'The journey'))}
              <ArrowDown size={16} aria-hidden="true" />
            </a>
            <a href="#next">
              {t(L('Дальше', 'Next steps'))}
              <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
        }
      />
      <Timeline items={steps} />
      <section className="shell section" id="next">
        <header className="section-head">
          <h2>{t(L('Дальше — больше практики.', 'Next: keep building.'))}</h2>
        </header>
        <div className="next-list">
          {next.map((item) => {
            const body = (
              <>
                <div>
                  <h3>{item.title}</h3>
                  <p>{t(item.copy)}</p>
                </div>
                {item.href && <ArrowUpRight size={21} strokeWidth={1.5} aria-hidden="true" />}
              </>
            );
            return item.href ? (
              <Link to={item.href} key={item.title} data-reveal>
                {body}
              </Link>
            ) : (
              <div key={item.title} data-reveal>
                {body}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
