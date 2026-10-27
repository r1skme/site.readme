import { L, type Localized } from '../lib/l10n';

export type ProjectStatus = 'active' | 'paused' | 'frozen' | 'prototype';

export type Project = {
  slug: string;
  name: string;
  status: ProjectStatus;
  period: Localized;
  stack: string[];
  tagline: Localized;
  summary: Localized;
  challenge: Localized;
  approach: Localized;
  outcome: Localized;
  links?: { repo?: string; releases?: string; site?: string };
  facts?: { value: string; label: Localized }[];
  benchmarks?: {
    title: Localized;
    note?: Localized;
    unit: 'x' | 'abs';
    rows: { label: Localized; value: number; display: string }[];
  }[];
  commands?: { cmd: string; note: Localized }[];
  footnote?: Localized;
  why?: Localized;
};

export const statusLabel: Record<ProjectStatus, Localized> = {
  active: L('В разработке', 'Active'),
  paused: L('На паузе', 'Paused'),
  frozen: L('Заморожен', 'Frozen'),
  prototype: L('Прототип', 'Prototype'),
};

// Catalogue order. The "next project" chain on detail pages follows it too.
export const projects: Project[] = [
  {
    slug: 'researchify',
    name: 'ReSearchify',
    status: 'active',
    period: L('окт. 2026 — сейчас', 'Oct 2026 — present'),
    stack: [
      'C++20',
      'CMake',
      'MSVC / Clang / GCC',
      'CLI',
      'JSON / JSONL',
      'stdio MCP',
      'Multithreading',
      'Regex',
      'CTest',
      'GitHub Actions',
    ],
    tagline: L(
      'Открытый поиск по коду, который находит нужное за миллисекунды.',
      'Open-source code search that finds what you need in milliseconds.',
    ),
    summary: L(
      'Поисковый движок на C++20 с постоянным индексом и CLI `rs`. Находит идентификаторы, точный текст, регулярные выражения и комбинации условий без повторного чтения всех файлов. Готовые сборки под Windows, macOS и Linux, JSON-вывод и MCP для ИИ-агентов. Открытый код под GPL-3.0.',
      'A C++20 search engine with a persistent index and the `rs` CLI. It finds identifiers, exact text, regular expressions and combined conditions without rescanning every file. Prebuilt for Windows, macOS and Linux, with JSON output and MCP for AI agents. Open source under GPL-3.0.',
    ),
    challenge: L(
      'Идея появилась из недовольства скоростью привычного поиска в Windows. В большом проекте нужно быстро найти не только редкое слово, но и точную строку с пунктуацией, сочетание условий или совпадение по шаблону — и не пересканировать всё дерево на каждый запрос.',
      'The idea came from frustration with everyday Windows search. On a large project you need more than a rare word: exact strings with punctuation, combined conditions and patterns — without rescanning the whole tree for every query.',
    ),
    approach: L(
      'Постоянный индекс в `.researchify/`, язык запросов с AND / OR / NOT и скобками, буквальный поиск (`-l`), regex (`-rs`), фильтры по путям и инкрементальное обновление (`-u`). Ядро без сторонних библиотек. CI собирает и тестирует пять платформ, плюс отдельные тесты с санитайзерами на Linux. Для агентов — JSON, JSONL-сессии и stdio MCP.',
      'A persistent index in `.researchify/`, a query language with AND / OR / NOT and parentheses, literal search (`-l`), regex (`-rs`), path filters and incremental updates (`-u`). The core has no third-party dependencies. CI builds and tests five platforms, plus Linux sanitizer runs. Agents get JSON, JSONL sessions and stdio MCP.',
    ),
    outcome: L(
      'Опубликованы preview-релизы под Windows x64, macOS arm64/x64 и Linux x64/arm64 с контрольными суммами. Ближайшие задачи — быстрее широкие regex и буквальный поиск, меньше индекс.',
      'Preview releases are published for Windows x64, macOS arm64/x64 and Linux x64/arm64 with checksums. Next up: faster broad regex and literal search, and a smaller index.',
    ),
    links: {
      repo: 'https://github.com/r1skme/ReSearchify',
      releases: 'https://github.com/r1skme/ReSearchify/releases',
    },
    why: L(
      'Когда проект большой, обычный поиск на каждый запрос заново читает все файлы — и ждёшь. ripgrep — один из самых быстрых таких поисков, именно он работает внутри поиска VS Code. ReSearchify один раз строит индекс и дальше отвечает почти сразу: редкое слово в 350 МБ кода он находит в 94 раза быстрее ripgrep. Это экономит время разработчику и особенно ИИ-агентам, которые делают сотни запросов подряд.',
      'On a large project, ordinary search re-reads every file for every query — and you wait. ripgrep is one of the fastest such tools; it is what powers search in VS Code. ReSearchify builds an index once and then answers almost instantly: it finds a rare word in 350 MB of code 94 times faster than ripgrep. That saves time for developers and especially for AI agents that run hundreds of queries in a row.',
    ),
    facts: [
      {
        value: '94,6×',
        label: L(
          'быстрее ripgrep (движка поиска VS Code) на редком слове',
          'faster than ripgrep (VS Code’s search engine) on a rare word',
        ),
      },
      {
        value: '34×',
        label: L('быстрее на несуществующем термине', 'faster on a term with no matches'),
      },
      {
        value: '37,7×',
        label: L('быстрее на 1000 запросах подряд', 'faster over 1000 queries in a row'),
      },
      { value: '10×', label: L('ускорение на 16 потоках', 'speed-up on 16 threads') },
    ],
    benchmarks: [
      {
        title: L('ReSearchify против ripgrep · Windows', 'ReSearchify vs ripgrep · Windows'),
        unit: 'x',
        rows: [
          {
            label: L('Редкий термин, 349,7 MiB', 'Rare term, 349.7 MiB'),
            value: 94.6,
            display: '94,6×',
          },
          {
            label: L('1000 запросов подряд', '1000 queries in a row'),
            value: 37.7,
            display: '37,7×',
          },
          { label: L('Несуществующий термин', 'Term with no matches'), value: 34, display: '34×' },
          { label: L('Редкий термин', 'Rare term'), value: 25.6, display: '25,6×' },
          { label: L('Частые термины', 'Frequent terms'), value: 2.2, display: '1,6–2,2×' },
        ],
      },
      {
        title: L('Параллельный поиск', 'Parallel search'),
        note: L('ускорение относительно одного потока', 'speed-up over a single thread'),
        unit: 'x',
        rows: [
          { label: L('2 потока', '2 threads'), value: 2.5, display: '2,5×' },
          { label: L('4 потока', '4 threads'), value: 4.7, display: '4,7×' },
          { label: L('8 потоков', '8 threads'), value: 7.2, display: '7,2×' },
          { label: L('16 потоков', '16 threads'), value: 10, display: '10×' },
        ],
      },
      {
        title: L('macOS · время ReSearchify', 'macOS · ReSearchify timings'),
        note: L('точного сравнения с ripgrep пока нет', 'no exact ripgrep comparison yet'),
        unit: 'abs',
        rows: [
          {
            label: L('Несуществующий термин', 'Term with no matches'),
            value: 2.1,
            display: '2,1 мс',
          },
          {
            label: L('Обновление одного файла', 'Updating one file'),
            value: 3.7,
            display: '3,7 мс',
          },
          { label: L('Редкий термин', 'Rare term'), value: 14.7, display: '14,7 мс' },
          { label: L('Частый термин', 'Frequent term'), value: 211, display: '211 мс' },
          {
            label: L('1000 запросов подряд', '1000 queries in a row'),
            value: 6630,
            display: '6,63 с',
          },
        ],
      },
    ],
    commands: [
      { cmd: 'rs -i .', note: L('проиндексировать текущий проект', 'index the current project') },
      { cmd: 'rs -s RenderFrame', note: L('найти идентификатор', 'find an identifier') },
      {
        cmd: 'rs -s "RenderFrame AND NOT deprecated"',
        note: L('файлы с одним словом и без другого', 'files with one term but not another'),
      },
      {
        cmd: 'rs -l "std::vector<int>"',
        note: L('точный текст с пунктуацией', 'exact text with punctuation'),
      },
      {
        cmd: 'rs -rs "worker_[0-9]+" --json',
        note: L('regex, вывод для скриптов', 'regex, output for scripts'),
      },
      { cmd: 'rs -u', note: L('обновить индекс после правок', 'update the index after edits') },
    ],
  },
  {
    slug: 'prime-market',
    name: 'Prime Market',
    status: 'active',
    period: L('2026 — сейчас', '2026 — present'),
    stack: [
      'Python',
      'asyncio',
      'aiohttp',
      'SQLite (aiosqlite)',
      'python-telegram-bot',
      'Market.CSGO API v2',
      'HTML / CSS / JS',
    ],
    tagline: L(
      'Автоматизация работы с рынком CS2-скинов.',
      'Automating CS2 skin-market workflows.',
    ),
    summary: L(
      'Telegram-бот для рынка CS2-скинов: мониторинг цен, пользовательские фильтры, уведомления и автоматизация торговли в фоновых задачах. Асинхронный Python (asyncio, aiohttp), SQLite и Market.CSGO API v2. Параллельно — сайт проекта.',
      'A Telegram bot for the CS2 skin market: price monitoring, user filters, notifications and trade automation in background tasks. Async Python (asyncio, aiohttp), SQLite and the Market.CSGO API v2. Alongside it: the project website.',
    ),
    challenge: L(
      'Prime Market вырос из повторяющихся действий, которые приходилось делать вручную. Хотелось один раз задать условия, отслеживать нужные изменения и получать результат в Telegram, а не возвращаться к одним и тем же проверкам.',
      'Prime Market grew out of repetitive work I was doing by hand. I wanted to set criteria once, track the changes that matter and get the result in Telegram instead of repeating the same checks.',
    ),
    approach: L(
      'Telegram-команды, пользовательские фильтры, интервалы проверки и хранение настроек в SQLite. Проверяю работу с API, результат фильтрации и поведение уведомлений. На сайте продумываю, как показать данные и перенести рабочие сценарии в браузер.',
      'Telegram commands, user filters, check intervals and settings stored in SQLite. I verify API interactions, filtering results and notification behaviour. On the website I work out how to present data and move the workflows into the browser.',
    ),
    outcome: L(
      'Ботом пока пользуюсь сам. Следующий этап — завершить браузерную версию, проверить основные сценарии и открыть инструмент для других пользователей.',
      'For now I am the bot’s main user. Next: finish the browser version, validate the core workflows and open the tool to other users.',
    ),
    // TODO(owner): link https://github.com/r1skme/Prime-Bot-Site here if it is the Prime Market site.
    links: { site: 'https://www.primemarket.skin/' },
  },
  {
    slug: 'predict',
    name: 'Predict',
    status: 'active',
    period: L('2026 — сейчас', '2026 — present'),
    stack: [
      'C++20',
      'Dear ImGui',
      'DirectX 11 / DXGI',
      'Win32 API',
      'LLVM / Clang-cl',
      'MSVC',
      'MSBuild',
      'FreeType',
      'MinHook',
      'Kiero',
    ],
    tagline: L(
      'Игровой инструмент с собственной логикой и интерфейсом.',
      'A gaming tool with its own logic and interface.',
    ),
    summary: L(
      'Логика, интерфейс и функциональность игрового инструмента на C++20: интерфейс на Dear ImGui поверх DirectX 11, Win32 API, сборка через Clang-cl и MSBuild. Части проекта связаны между собой, поэтому важно не только как он выглядит, но и как настройки и действия работают вместе.',
      'Logic, interface and functionality of a gaming tool in C++20: a Dear ImGui interface on DirectX 11, Win32 API, built with Clang-cl and MSBuild. Its parts are interconnected, so the focus is on how settings and actions work together, not only on looks.',
    ),
    challenge: L(
      'Связать функциональность и интерфейс так, чтобы сложные настройки оставались понятными: где найти нужную возможность и как сразу увидеть, что изменение применилось.',
      'Connect functionality and interface so complex settings stay understandable: where to find a feature and how to see right away that a change took effect.',
    ),
    approach: L(
      'Работаю над требованиями и поведением интерфейса, проверяю реализации и описываю найденные ошибки с шагами воспроизведения. Отдельно слежу за переходами, состояниями элементов и удобством настройки.',
      'I work on requirements and interface behaviour, verify implementations and file bugs with reproduction steps. I pay close attention to transitions, element states and how comfortable configuration feels.',
    ),
    outcome: L(
      'Проект в разработке: довожу взаимосвязанные сценарии и интерфейс. Публичная демонстрация — после релиза.',
      'In development: refining the connected workflows and the interface. Public demo after release.',
    ),
  },
  {
    slug: 'sharex-macos-linux',
    name: 'ShareX for macOS & Linux',
    status: 'active',
    period: L('окт. 2026', 'Oct 2026'),
    stack: [
      'C#',
      '.NET 10',
      'Avalonia UI',
      'SkiaSharp',
      'GitHub Actions',
      '.deb / .rpm / .pkg / .dmg',
    ],
    tagline: L(
      'Кроссплатформенные сборки ShareX с нативными установщиками.',
      'Cross-platform ShareX builds with native installers.',
    ),
    summary: L(
      'Сборки ShareX — популярного инструмента для скриншотов и записи экрана — под Linux и macOS. Нативные установщики и хоткеи платформы.',
      'Builds of ShareX — the popular screenshot and screen-recording tool — for Linux and macOS, with native installers and platform hotkeys.',
    ),
    challenge: L(
      'ShareX — приложение для Windows. На Linux и macOS хотелось тот же рабочий процесс: снял область, отметил важное, скопировал или загрузил — без поиска замены.',
      'ShareX is a Windows app. On Linux and macOS I wanted the same workflow — capture a region, mark it up, copy or upload — without hunting for a replacement.',
    ),
    approach: L(
      'Для Linux — пакеты .deb, .rpm, .tar.gz и .tgz, захват области по Ctrl+PrintScreen. Для macOS — .pkg, .dmg и .zip под Apple silicon и Intel; установщик .pkg назначает ShareX на Command+Shift+4.',
      'Linux gets .deb, .rpm, .tar.gz and .tgz packages with region capture on Ctrl+PrintScreen. macOS gets .pkg, .dmg and .zip for Apple silicon and Intel; the .pkg installer maps ShareX to Command+Shift+4.',
    ),
    outcome: L(
      'Репозиторий опубликован. Стандартный шорткат macOS можно вернуть в системных настройках клавиатуры.',
      'The repository is public. The default macOS shortcut can be restored in the keyboard settings.',
    ),
    links: { repo: 'https://github.com/r1skme/sharex-macos-linux' },
  },
  {
    slug: 'glow-rust',
    name: 'GLOW RUST',
    status: 'paused',
    period: L('2025', '2025'),
    stack: ['Rust Game Server', 'RCON', 'Server Plugins', 'Hosting'],
    tagline: L(
      'Свой игровой сервер: от настройки до контента.',
      'My own game server: from setup to content.',
    ),
    summary: L(
      'Сервер в игре Rust с улучшенной ванилой и модовым режимом. Сам отвечал за всё: хостинг, плагины, поддержку, события и продвижение через TikTok.',
      'A server for the game Rust with enhanced vanilla and modded modes. I ran everything: hosting, plugins, support, events and TikTok promotion.',
    ),
    challenge: L(
      'Помимо технической настройки, сервер постоянно требует поддержки, игровых событий и притока игроков. Развитие аудитории оказалось самой сложной частью.',
      'Beyond the technical setup, a server constantly needs support, in-game events and new players. Growing the audience proved to be the hardest part.',
    ),
    approach: L(
      'Хостинг, конфигурация, подбор и настройка плагинов, RCON, магазин и автоматизация, поддержка и модерация. Для продвижения сам придумывал, снимал и монтировал короткие ролики для TikTok проекта — лучший набрал 95,1K просмотров.',
      'Hosting, configuration, plugin selection and setup, RCON, the shop and automation, support and moderation. For promotion I came up with, recorded and edited short videos for the project’s TikTok — the best one reached 95.1K views.',
    ),
    outcome: L(
      'Проект на паузе из-за нехватки времени. Дал опыт полного цикла запуска и понимание, что поддержка, контент и продвижение требуют не меньше сил, чем техническая часть.',
      'Paused for lack of time. It gave me end-to-end launch experience and showed that support, content and promotion take as much effort as the technical side.',
    ),
  },
  {
    slug: 'exchange',
    name: 'EXchange',
    status: 'frozen',
    period: L('2026', '2026'),
    stack: ['Python', 'SQLite', 'Telegram', 'Market Filters'],
    tagline: L('Подбор и фильтрация игровых предметов.', 'Finding and filtering game items.'),
    summary: L(
      'Экспериментальный инструмент для подбора и фильтрации предложений среди CS2-скинов.',
      'An experimental tool for finding and filtering CS2 skin offers.',
    ),
    challenge: L(
      'Сделать поиск подходящих предложений удобнее: настраиваемые условия, которые отделяют нужные предметы от остального рынка.',
      'Make finding the right offers easier: configurable criteria that separate useful items from the rest of the market.',
    ),
    approach: L(
      'Экспериментировал со сканированием предметов, фильтрами и ролями доступа. В отличие от Prime Market, фокус — на подборе предложений, а не на рабочем процессе целиком.',
      'I explored item scanning, filters and access roles. Unlike Prime Market, the focus is on selecting offers rather than the whole workflow.',
    ),
    outcome: L(
      'Заморожен, публичного релиза нет. Основное внимание перенесено на Prime Market.',
      'Frozen, no public release. My focus has moved to Prime Market.',
    ),
  },
];

export const findProject = (slug?: string) => projects.find((p) => p.slug === slug);
