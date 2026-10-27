import { projects as original, type Project } from '@/data/content';
import { L } from '@/lib/i18n';
const copy: Record<string, Partial<Project>> = {
  'prime-market': {
    tagline: L(
      'Автоматизация работы с игровыми предметами.',
      'Automating game-item market workflows.',
    ),
    since: L('Развиваю в 2026 году', 'Ongoing work in 2026'),
    summary: L(
      'Личный инструмент для работы с рынком CS2-скинов: Telegram-бот, фильтры, цены и уведомления. Проект объединяет Python, python-telegram-bot, SQLite и Market.CSGO API. Отдельно развивается сайт и браузерная версия.',
      'A personal tool for CS2 skin-market workflows: a Telegram bot, filters, prices and notifications. It brings together Python, python-telegram-bot, SQLite and the Market.CSGO API, alongside work on a website and browser version.',
    ),
    challenge: L(
      'Prime Market появился из повторяющихся действий, которые приходилось выполнять вручную. Хотелось задавать условия один раз, отслеживать нужные изменения и получать информацию в Telegram, а не постоянно возвращаться к одним и тем же проверкам. Главная задача — связать рыночные данные, настройки и уведомления в понятный сценарий.',
      'Prime Market started with repetitive work I had been doing manually. I wanted to set criteria, track relevant changes and receive updates in Telegram instead of repeating the same checks. The main task is connecting market data, settings and notifications into a clear workflow.',
    ),
    approach: L(
      'Основа проекта — Telegram-команды, пользовательские фильтры, интервалы проверки и хранение настроек в SQLite. Проверяю взаимодействие с API, результат фильтрации и поведение уведомлений. Параллельно занимаюсь интерфейсом сайта: как представить данные, дать доступ к настройкам и перенести рабочие сценарии в браузер.',
      'The project is built around Telegram commands, user filters, check intervals and settings stored in SQLite. I verify API interactions, filtering results and notification behaviour. Alongside that, I work on the website interface: presenting data, exposing settings and bringing the workflows to a browser.',
    ),
    outcome: L(
      'Ботом пока пользуюсь сам. Проект стал для меня практикой в автоматизации, работе с API, настройками и обратной связью от программы. Следующий этап — завершить браузерную версию, проверить основные сценарии и подготовить инструмент к использованию другими людьми.',
      'I currently use the bot myself. The project gives me practical experience with automation, APIs, settings and application feedback. The next step is to complete the browser version, validate the core workflows and prepare the tool for other users.',
    ),
  },
  researchify: {
    tagline: L('Поиск по коду, который можно проверить.', 'Source-code search you can test.'),
    summary: L(
      'Локальный поисковый движок на C++20 с CLI и постоянным индексом. Создаётся для поиска по большому количеству исходных файлов: от отдельных идентификаторов до фраз, буквальных строк и регулярных выражений.',
      'A local C++20 search engine with a CLI and persistent index. It is being built for large source-code collections, from individual identifiers to phrases, literal strings and regular expressions.',
    ),
    challenge: L(
      'Идея появилась из недовольства скоростью привычного поиска в Windows. В большом проекте важно быстро найти не только редкое слово, но и точную строку, сочетание условий или совпадение по шаблону. При этом ускорение не должно менять смысл запроса, пропускать результаты или требовать заново индексировать всё после небольшого изменения.',
      'The idea came from frustration with the speed of everyday Windows search. On a large project, finding a rare word is only one task: exact strings, combined conditions and patterns matter too. Faster search must not change query meaning, miss results or require a full rebuild after every small change.',
    ),
    approach: L(
      'Работа включает постоянный индекс, логические условия AND / OR / NOT, поиск фраз и regex, фильтры по путям и расширениям. В тестах сравниваю редкие и частые совпадения, запросы без результатов, первый и повторный запуск. Отдельно рассматриваю время индексации, размер индекса, использование памяти и обновление изменённых файлов.',
      'The work covers persistent indexing, AND / OR / NOT conditions, phrases, regex and path or extension filters. Tests compare rare and frequent matches, no-result queries, and first versus repeated runs. I also consider indexing time, index size, memory use and updates to changed files.',
    ),
    outcome: L(
      'Есть рабочая CLI-программа и тесты на корпусе из 100 000 файлов и 5 миллионов строк. На разных запросах поведение различается, поэтому следующий приоритет — буквальный поиск и широкие regex, затем размер индекса и масштабирование. Проект продолжает развиваться; отдельный удачный тест не заменяет проверку остальных сценариев.',
      'There is a working CLI and tests on a corpus of 100,000 files and five million lines. Behaviour varies across query types, so the next priorities are literal search and broad regex queries, followed by index size and scaling. The project is still developing; one successful test does not replace the others.',
    ),
  },
  predict: {
    tagline: L('Программный проект в разработке.', 'A software project in development.'),
    summary: L(
      'Работа над логикой, интерфейсом и функциональностью игрового инструмента. У проекта несколько взаимосвязанных частей, поэтому внимание уделяется не только внешнему виду, но и тому, как настройки и действия работают вместе.',
      'Work on the logic, interface and functionality of a gaming tool. The project has interconnected parts, so the focus goes beyond appearance to how settings and actions work together.',
    ),
    challenge: L(
      'Нужно связать функциональность и интерфейс так, чтобы сложные настройки оставались понятными. Важно продумать структуру, состояние элементов и последовательность действий: где искать нужную возможность и как понять, что изменение применилось.',
      'The challenge is connecting functionality and interface so that complex settings remain understandable. That involves structure, element states and action sequences: where to find a feature and how to know a change has taken effect.',
    ),
    approach: L(
      'Работаю над требованиями и поведением интерфейса, проверяю реализации и описываю найденные ошибки. Внимательно смотрю на переходы, взаимодействия элементов и удобство настройки. Публично показываю только то, что не раскрывает внутренние материалы разработки.',
      'I work on requirements and interface behaviour, verify implementations and report issues. I pay attention to transitions, how elements interact and the configuration process. Public material does not expose internal development details.',
    ),
    outcome: L(
      'Predict ещё не выпущен. Сейчас задача — продолжить разработку, проверить взаимосвязанные сценарии и довести интерфейс. Публичную демонстрацию функциональности планирую по мере готовности, без заранее обещанных сроков.',
      'Predict has not been released. The current task is to continue development, test interconnected workflows and refine the interface. A public demonstration will follow readiness rather than a promised date.',
    ),
  },
  'researchify-web': {
    name: 'Researchify Web',
    tagline: L('Интернет-источники для локальных моделей.', 'Web sources for local models.'),
    challenge: L(
      'Локальной модели нужен способ получать информацию за пределами её обучающих данных. Задача не заканчивается списком ссылок: источник нужно открыть, прочитать и передать модели содержимое, пригодное для дальнейшей работы.',
      'A local model needs a way to access information beyond its training data. A list of links is only a start: the source needs to be opened, read and passed to the model in a useful form.',
    ),
    approach: L(
      'Продумываю поиск, получение страниц и работу с документацией, а также понятный интерфейс для агента. Важны качество извлечённого текста, доступность источников и различие между найденной ссылкой и прочитанным материалом. Работа с ресурсами предполагается там, где доступ разрешён.',
      'I am designing search, page retrieval, documentation access and an agent-friendly interface. The quality of extracted text, source availability and the distinction between a found link and a read source all matter. Retrieval is intended for resources where access is permitted.',
    ),
    outcome: L(
      'Это отдельный проект, не часть движка ReSearchify для исходного кода. Он находится на стадии разработки; окончательный технический стек и публичный релиз ещё впереди. Следующий этап — довести поиск и чтение источников до рабочего инструмента.',
      'This is a separate project, not part of the ReSearchify source-code engine. It is in development, with the final technical stack and a public release still ahead. The next step is to turn source discovery and reading into a usable tool.',
    ),
  },
  'glow-rust': {
    tagline: L(
      'Собственный сервер: от настройки до контента.',
      'My own server: from setup to content.',
    ),
    challenge: L(
      'GLOW RUST запускался как личный игровой сервер с улучшенной ванилой и модовым режимом. Помимо технической настройки, постоянно требовались поддержка, работа с игровыми событиями и привлечение игроков. Именно развитие аудитории оказалось самой сложной частью.',
      'GLOW RUST was launched as my own game server with enhanced vanilla and modded modes. Beyond the technical setup, it required ongoing support, in-game events and attracting players. Growing an audience proved to be the hardest part.',
    ),
    approach: L(
      'Занимался хостингом, конфигурацией, подбором и настройкой плагинов, RCON, магазином и автоматизацией. Отвечал за поддержку и модерацию. Для продвижения сам придумывал идеи, записывал и монтировал короткие ролики, публиковал их в TikTok проекта.',
      'I handled hosting, configuration, plugin selection and setup, RCON, the shop and automation, as well as support and moderation. For promotion, I came up with ideas, recorded and edited short videos and published them to the project’s TikTok.',
    ),
    outcome: L(
      'Проект приостановлен из-за нехватки времени. Он дал опыт полного цикла запуска и показал, что технически готовый сервер ещё не означает устойчивый проект. В дальнейшей работе учитываю нагрузку на поддержку, контент и продвижение, а не только на разработку.',
      'The project is paused because of limited time. It gave me end-to-end launch experience and showed that a technically ready server is not yet a sustainable project. In later work I consider support, content and promotion as well as development.',
    ),
  },
  exchange: {
    tagline: L('Подбор и фильтрация игровых предметов.', 'Finding and filtering game items.'),
    challenge: L(
      'EXchange задумывался как более удобный способ подбирать подходящие предложения среди CS2-скинов. Интерес представляли настраиваемые условия поиска и отделение нужных предметов от остального рынка.',
      'EXchange was conceived as a more convenient way to find relevant CS2 skin offers, with configurable criteria for separating useful items from the wider market.',
    ),
    approach: L(
      'Экспериментировал со сканированием предметов, фильтрами и ролями доступа. Этот проект связан с направлением автоматизации, но отличается от Prime Market акцентом на подборе предложений, а не на общем рабочем процессе.',
      'I explored item scanning, filters and access roles. It shares the automation focus of Prime Market but concentrates on selecting offers rather than the overall workflow.',
    ),
    outcome: L(
      'Проект заморожен, публичного релиза нет. Основное внимание перенесено на Prime Market и другие активные инструменты. EXchange оставлен в портфолио как отдельный эксперимент с поиском и фильтрацией.',
      'Development is paused and there is no public release. My focus has moved to Prime Market and other active tools. EXchange remains a separate experiment in search and filtering.',
    ),
  },
};
export const projects: Project[] = original.map((project) => ({
  ...project,
  ...copy[project.slug],
}));
