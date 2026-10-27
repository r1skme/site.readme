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
    date: L('2025 · проект на паузе', '2025 · project paused'),
    title: L('GLOW RUST', 'GLOW RUST'),
    description: L(
      'Сам запустил Rust-сервер, настроил хостинг и плагины, занимался поддержкой и контентом. Привлечь игроков оказалось сложнее, чем собрать сервер. Проект поставлен на паузу; главный вывод — не пытаться делать всё одному.',
      'I launched a Rust server, configured hosting and plugins, handled support and made content. Attracting players was harder than getting the server running. The project is paused; the main lesson was not to do everything alone.',
    ),
    stack: ['Rust', 'RCON'],
    href: '/projects/glow-rust/',
  },
  {
    id: 'prime',
    date: L('Первый серьёзный проект · развивается', 'First serious project · ongoing'),
    title: L('Prime Market', 'Prime Market'),
    description: L(
      'Начал с автоматизации собственных задач на рынке игровых предметов. Работаю над Telegram-ботом, фильтрами и уведомлениями, развиваю сайт проекта. Следующий шаг — браузерная версия и проверка сценариев перед запуском.',
      'I started by automating my own game-item market workflows. I work on a Telegram bot, filters and notifications, and the project website. Next comes the browser version and testing before launch.',
    ),
    stack: ['Python', 'SQLite', 'Telegram API'],
    href: '/projects/prime-market/',
  },
  {
    id: 'search',
    date: L('Октябрь 2026', 'October 2026'),
    title: L('ReSearchify', 'ReSearchify'),
    description: L(
      'Не устроила скорость привычного поиска — начал собственный движок по исходному коду. Сейчас занимаюсь индексом, поиском по словам и фразам, проверкой корректности и скорости на больших проектах.',
      'Everyday search felt too slow, so I started a source-code search engine. The current work focuses on indexing, word and phrase search, correctness and performance on large projects.',
    ),
    stack: ['C++20', 'CLI', 'Regex'],
    href: '/projects/researchify/',
  },
  {
    id: 'now',
    date: L('Сейчас', 'Now'),
    title: L('Новые инструменты', 'New tools'),
    description: L(
      'Продолжаю Predict и отдельный Researchify Web для интернет-поиска локальными моделями. Параллельно работаю над интерфейсами, тестирую изменения и возвращаюсь к деталям, которые мешают пользоваться продуктом.',
      'I am continuing Predict and the separate Researchify Web tool for local-model web research. Alongside them I work on interfaces, test changes and refine the details that make products harder to use.',
    ),
    stack: ['Predict', 'Researchify Web'],
    href: '/projects/',
    linkLabel: L('Все проекты', 'All projects'),
  },
];
const next = [
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
      'Быстрее буквальный поиск, меньше индекс и проверяемые сравнения на больших проектах.',
      'Faster literal search, a smaller index and reproducible comparisons on large codebases.',
    ),
  },
  {
    title: 'Researchify Web',
    href: '/projects/researchify-web/',
    copy: L(
      'Доработка поиска и чтения источников для локальных моделей перед релизом.',
      'Refining source discovery and reading for local models before release.',
    ),
  },
  {
    title: 'Predict',
    href: '/projects/predict/',
    copy: L(
      'Разработка функциональности и интерфейса. Публичный показ — по мере готовности.',
      'Continuing features and interface work, with a public presentation when ready.',
    ),
  },
];
export default function Roadmap() {
  const { t } = useLanguage();
  return (
    <div className="v8-roadmap-page">
      <PageHeading
        title={t(L('Путь и планы.', 'Work in progress.'))}
        desc={t(
          L(
            'Монтаж, первые запуски и собственные инструменты. Что получилось, чему научился и над чем работаю дальше.',
            'Editing, early launches and my own tools. What worked, what I learned and what I am building next.',
          ),
        )}
        side={
          <div className="v8-roadmap-jumps">
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
      <section className="shell v8-next-section" id="next">
        <header>
          <h2>{t(L('Дальше — больше практики.', 'Next: keep building.'))}</h2>
        </header>
        <div className="v8-next-list">
          {next.map((item) => (
            <Link to={item.href} key={item.title}>
              <div>
                <h3>{item.title}</h3>
                <p>{t(item.copy)}</p>
              </div>
              <ArrowUpRight size={21} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
