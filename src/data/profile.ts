import { L, type Localized } from '../lib/l10n';

export const role = L(
  'Python / C++ разработчик · автоматизация, инструменты для разработчиков, монтаж',
  'Python / C++ developer · automation, developer tools, video editing',
);

export const profile = {
  short: [
    L(
      'Я R1SK — **разработчик на Python и C++**. Сейчас развиваю **ReSearchify** (локальный поиск по коду на C++20) и **Prime Market** (Telegram-бот для рынка CS2-скинов).',
      'I’m R1SK, a **Python and C++ developer**. Right now I’m building **ReSearchify** (local C++20 code search) and **Prime Market** (a Telegram bot for the CS2 skin market).',
    ),
    L(
      '**Могу взять задачу целиком**: разобраться в сценарии, написать инструмент, собрать релизы под разные системы и проверить результат. Плюс около трёх лет игрового монтажа в DaVinci Resolve.',
      '**I can take a task end to end**: understand the workflow, write the tool, ship builds for different systems and test the result. Plus about three years of gaming video editing in DaVinci Resolve.',
    ),
  ],
  origin: L(
    'Компьютерами увлёкся ещё в детстве, а одной из любимых игр стал Counter-Strike. Постепенно захотелось не только играть, но и настраивать, автоматизировать и создавать своё. Первым серьёзным программным проектом стал Prime Market.',
    'My interest in computers started in childhood, with Counter-Strike among my favourite games. Over time playing turned into configuring, automating and building things of my own. Prime Market became my first serious software project.',
  ),
  motivation: L(
    'Большинство моих проектов начинаются с собственной задачи — поэтому я сам их первый пользователь и вижу, где инструмент неудобен.',
    'Most of my projects start with a problem of my own, so I am their first user and see where a tool gets in the way.',
  ),
};

export type Capability = {
  title: Localized;
  text: Localized;
  tools: string[];
  proof: { label: string | Localized; href: string };
};

// "What I can do for you": every claim links to the project that backs it.
export const capabilities: Capability[] = [
  {
    title: L('Автоматизация и боты', 'Automation & bots'),
    text: L(
      '**Telegram-боты**, работа с API, фильтры, уведомления и хранение настроек. **Убираю ручную рутину** из рабочих процессов.',
      '**Telegram bots**, API integrations, filters, notifications and stored settings. **I remove manual routine** from workflows.',
    ),
    tools: ['Python', 'asyncio', 'aiohttp', 'SQLite', 'Telegram Bot API'],
    proof: { label: 'Prime Market', href: '/projects/prime-market/' },
  },
  {
    title: L('Быстрые инструменты на C++', 'Fast tools in C++'),
    text: L(
      'Индексы, поиск, CLI и **замеры производительности**. Слежу, чтобы ускорение **не меняло смысл запроса** и не теряло результаты.',
      'Indexes, search, CLIs and **performance measurement** — making things faster **without changing query meaning** or losing results.',
    ),
    tools: ['C++20', 'CMake', 'Multithreading', 'Regex', 'MCP'],
    proof: { label: 'ReSearchify', href: '/projects/researchify/' },
  },
  {
    title: L('Сборки и релизы', 'Builds & releases'),
    text: L(
      '**Кроссплатформенные сборки**, установщики и CI: **Windows, macOS и Linux** на x64 и arm64.',
      '**Cross-platform builds**, installers and CI: **Windows, macOS and Linux** on x64 and arm64.',
    ),
    tools: ['GitHub Actions', 'C# / .NET 10', 'Avalonia UI', 'Git'],
    proof: { label: 'ShareX for macOS & Linux', href: '/projects/sharex-macos-linux/' },
  },
  {
    title: L('Интерфейсы и тестирование', 'Interfaces & QA'),
    text: L(
      'Продумываю **экраны, состояния и обратную связь**. Пишу **баг-репорты, которые можно воспроизвести**: действие, условия, ожидание и факт.',
      'I design **screens, states and feedback**, and write **reproducible bug reports**: action, conditions, expected and actual result.',
    ),
    tools: ['Dear ImGui', 'DirectX 11', 'Win32 API', 'React', 'QA'],
    proof: { label: 'Predict', href: '/projects/predict/' },
  },
  {
    title: L('Игровой видеомонтаж', 'Gaming video editing'),
    text: L(
      'Короткие ролики, которые **цепляют с первых секунд**: ритм, музыка, speed ramp, цвет и VFX. **150K+ просмотров** на четырёх роликах.',
      'Short videos that **hook from the first seconds**: rhythm, music, speed ramps, colour and VFX. **150K+ views** on four posts.',
    ),
    tools: ['DaVinci Resolve', 'Fusion', 'Fairlight', 'HLAE'],
    proof: { label: L('Медиа', 'Media'), href: '/media/' },
  },
];

export const experience = [
  {
    title: L('Автоматизация и Telegram', 'Automation & Telegram'),
    href: '/projects/prime-market/',
    link: 'Prime Market',
    text: L(
      'В Prime Market работаю с Market.CSGO API, Telegram-командами, фильтрами и уведомлениями на python-telegram-bot и SQLite. Мне важно не просто получить данные из API, а сделать из них понятный сценарий: задал условия — получил нужное уведомление.',
      'In Prime Market I work with the Market.CSGO API, Telegram commands, filters and notifications on python-telegram-bot and SQLite. Getting data out of an API is only part of it — the goal is a clear flow: set criteria, get the right notification.',
    ),
  },
  {
    title: L('Поиск и производительность', 'Search & performance'),
    href: '/projects/researchify/',
    link: 'ReSearchify',
    text: L(
      'В ReSearchify — постоянный индекс, запросы AND / OR / NOT, фразы, буквальные строки, regex и фильтры по путям. Сравниваю редкие и частые совпадения, пустые запросы, первый и повторный запуск; смотрю на корректность, размер индекса и время.',
      'In ReSearchify: a persistent index, AND / OR / NOT queries, phrases, literal strings, regex and path filters. I compare rare and frequent matches, empty queries, cold and warm runs, and track correctness, index size and timing.',
    ),
  },
  {
    title: L('Интерфейсы и проверка', 'Interfaces & testing'),
    href: '/projects/',
    link: L('Проекты', 'Projects'),
    text: L(
      'Продумываю продукт целиком: структуру, настройки, переходы и реакцию на действия. Когда что-то ведёт себя не так, описываю условия и шаги, чтобы ошибку можно было повторить, а после исправления возвращаюсь к тому же сценарию.',
      'I think through the whole product: structure, settings, transitions and responses. When something misbehaves I write down the conditions and steps so it can be reproduced, and re-check the same scenario after the fix.',
    ),
  },
  {
    title: L('Игровой контент', 'Gaming content'),
    href: '/media/',
    link: L('Смотреть работы', 'Watch my work'),
    text: L(
      'Хорошо знаю Counter-Strike и HvH-сообщество — терминологию, юмор и интересы, поэтому понимаю, что зайдёт зрителю. Придумывал, снимал и монтировал ролики для GLOW RUST, личные видео публикую на YouTube и TikTok.',
      'I know Counter-Strike and the HvH community — its terminology, humour and interests — so I know what lands with viewers. I came up with, recorded and edited GLOW RUST videos and publish personal work on YouTube and TikTok.',
    ),
  },
];

export const beyond = [
  {
    title: L('Работа с пользователями', 'Working with users'),
    text: L(
      'Делаю и продаю конфигурации для игровых HvH-клиентов и сопровождаю покупателей: если настройка или поведение непонятны — помогаю разобраться. Участвую в закрытом бета-тестировании игрового ПО. Это научило видеть разницу между тем, что понятно автору, и тем, что понятно человеку, который открыл инструмент впервые.',
      'I make and sell configurations for HvH gaming clients and support buyers: when a setting or behaviour is unclear, I help them through it. I also take part in closed beta testing of gaming software. It taught me the gap between what is obvious to the author and what a first-time user sees.',
    ),
  },
  {
    title: L('Собственный запуск', 'Running my own project'),
    text: L(
      'В GLOW RUST отвечал за всё: сервер, хостинг, плагины, поддержку, модерацию, события и TikTok от идеи до публикации. Сложнее всего оказалось привлечь игроков — теперь заранее учитываю нагрузку на поддержку, контент и продвижение.',
      'With GLOW RUST I handled everything: server, hosting, plugins, support, moderation, events and TikTok from idea to post. Attracting players was the hardest part — now I plan for support, content and promotion up front.',
    ),
  },
];

export const approach = [
  {
    title: L('Разбираю задачу', 'Understand the task'),
    text: L(
      'Начинаю со сценария: что человек хочет получить, какие действия повторяет и где теряет время. Так понятно, что действительно нужно в первой версии.',
      'I start from the workflow: what the person needs, what they repeat and where time is lost. That shows what really belongs in the first version.',
    ),
  },
  {
    title: L('Проверяю на примерах', 'Test concrete cases'),
    text: L(
      'Сравниваю ожидаемый и фактический результат: разные запросы для поиска, настройки и уведомления для бота, действия и переходы для интерфейса.',
      'I compare expected and actual results: different queries for search, settings and notifications for a bot, actions and transitions for an interface.',
    ),
  },
  {
    title: L('Довожу детали', 'Polish the details'),
    text: L(
      'После проверки убираю лишние шаги, уточняю формулировки и исправляю неудобства. В монтаже так же пересматриваю темп, переходы и звук.',
      'After testing I remove extra steps, sharpen wording and fix friction. In editing I revisit pacing, transitions and sound the same way.',
    ),
  },
];

export const learning = L(
  'Углубляюсь в C++ и устройство своих инструментов, развиваю моушн-дизайн, 3D и саунд-дизайн.',
  'Going deeper into C++ and how my tools work, and developing motion design, 3D and sound design.',
);
