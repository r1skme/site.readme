import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage, L } from '@/lib/i18n';
import { PageHeading } from '@/components/Primitives';
import { skills } from '@/data/content';

const capabilities = [
  {
    name: 'Python / Telegram',
    tools: ['python-telegram-bot', 'SQLite', 'API'],
    paragraphs: [
      L(
        'Работаю над ботами и автоматизацией на примере Prime Market и EXchange. Задачи включают Telegram-команды, хранение настроек, фильтрацию предложений и уведомления. В Prime Market есть интеграция с Market.CSGO API.',
        'I work on bots and automation through Prime Market and EXchange. The tasks include Telegram commands, stored settings, offer filters and notifications. Prime Market integrates with the Market.CSGO API.',
      ),
      L(
        'Разбираю сценарий целиком: какие данные приходят, какие условия выбрал пользователь и какой результат он должен получить. Проверяю настройки, обновления и поведение функций, чтобы автоматизация действительно заменяла ручные действия.',
        'I work through the whole flow: which data arrives, what criteria the user chose and which result they should receive. I test settings, updates and feature behaviour so automation can replace manual work.',
      ),
    ],
  },
  {
    name: 'C++20 / ReSearchify',
    tools: ['CLI', 'Regex', 'UTF-8'],
    paragraphs: [
      L(
        'Развиваю знания C++20 через поисковый движок по исходному коду. Разбираюсь в постоянном индексе, логических запросах AND / OR / NOT, поиске фраз и буквальных строк, regex и фильтрации по путям.',
        'I am developing my C++20 knowledge through a source-code search engine. I work through persistent indexing, AND / OR / NOT queries, phrases, literal strings, regex and path filtering.',
      ),
      L(
        'В проверках сравниваю редкие и частые совпадения, отсутствие результатов, первый и повторный запрос. Учитываю время индексации, размер индекса и память. Ускорение не должно менять смысл запроса или приводить к потере совпадений.',
        'My tests compare rare and frequent matches, no results, and initial versus repeated queries. I consider indexing time, index size and memory use. Improving speed must not change the query semantics or lose matches.',
      ),
    ],
  },
  {
    name: L('Интерфейсы и тестирование', 'Interfaces & testing'),
    tools: ['UX/UI', 'QA', 'GitHub'],
    paragraphs: [
      L(
        'Продумываю экраны, состояния, настройки и обратную связь на действия. В своих сайтах работаю с адаптивной композицией, типографикой и анимацией. Этот сайт собран на React, TypeScript и Tailwind; для движения используется Motion.',
        'I think through screens, states, settings and feedback after actions. On my own sites I work with responsive layouts, typography and animation. This website uses React, TypeScript and Tailwind, with Motion for animation.',
      ),
      L(
        'Проверяю новые версии и описываю ошибки так, чтобы их можно было повторить: действие, условия, ожидаемое поведение и фактический результат. Есть опыт бета-тестирования Spurdo и помощи пользователям с настройками игровых продуктов.',
        'I test new versions and describe issues so they can be reproduced: the action, conditions, expected behaviour and actual result. I also have experience beta testing Spurdo and helping users configure gaming products.',
      ),
    ],
  },
];
const editing = [
  L(
    'Около трёх лет работаю в DaVinci Resolve. Уверенно собираю таймлайн, анимирую параметры через keyframes, использую speed ramp, цветокоррекцию, переходы и VFX. В коротких роликах стараюсь сразу заинтересовать зрителя и не затягивать монтаж.',
    'I have worked in DaVinci Resolve for around three years. I am comfortable assembling timelines, animating parameters with keyframes and using speed ramps, colour correction, transitions and VFX. In short videos I try to engage the viewer early and keep the edit moving.',
  ),
  L(
    'Fusion, маски, трекинг, Fairlight и субтитры использую на базовом уровне. HLAE изучаю для записи игровых материалов и работы с камерами. Моушн-дизайн, 3D и более сложный саунд-дизайн сейчас находятся в развитии.',
    'I use Fusion, masks, tracking, Fairlight and subtitles at a basic level. I am learning HLAE for game capture and camera work. Motion design, 3D and more advanced sound design are skills I am still developing.',
  ),
];
export default function Skills() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeading
        title={t(L('Навыки и практика.', 'Skills in practice.'))}
        desc={t(
          L(
            'Технологии, с которыми связаны мои проекты, и задачи, на которых учусь и набираюсь опыта. Отдельно — уверенные и базовые навыки монтажа.',
            'The technologies behind my projects and the tasks through which I learn and gain experience. Editing skills are separated into confident and basic levels.',
          ),
        )}
      />
      <section className="shell v6-skills-core v9-technical v9-section">
        <div className="v9-experience-list">
          {capabilities.map((item, i) => (
            <article key={i} data-reveal>
              <div className="v9-experience-label">
                <h2>{typeof item.name === 'string' ? item.name : t(item.name)}</h2>
                <ul className="v9-stack">
                  {item.tools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </div>
              <div className="v9-reading-copy">
                {item.paragraphs.map((p, j) => (
                  <p key={j}>{t(p)}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="shell v6-editing-section v9-section">
        <div className="v6-editing-lead">
          <div>
            <span className="v6-small-label">DaVinci Resolve</span>
            <strong>
              3<span>{t(L('года', 'years'))}</span>
            </strong>
          </div>
          <div className="v9-reading-copy">
            {editing.map((p, i) => (
              <p key={i}>{t(p)}</p>
            ))}
          </div>
        </div>
        <div className="v6-skills-pairs">
          <div>
            <h3>{t(L('Уверенно', 'Confident with'))}</h3>
            {skills.confident.map((item, i) => (
              <p key={i}>{t(item)}</p>
            ))}
          </div>
          <div>
            <h3>{t(L('Базовый уровень', 'Basic level'))}</h3>
            {skills.basic.map((item, i) => (
              <p key={i}>{t(item)}</p>
            ))}
          </div>
        </div>
      </section>
      <section className="shell v6-tools-section v9-section">
        <header className="v9-section-head">
          <h2>{t(L('Инструменты монтажа', 'Editing tools'))}</h2>
        </header>
        <div className="v6-tool-list">
          {[
            {
              icon: 'resolve.svg',
              name: 'DaVinci Resolve',
              detail: L(
                'Основной редактор: сборка, анимация, скорость, цвет и VFX.',
                'My main editor for sequencing, animation, retiming, colour and VFX.',
              ),
            },
            {
              icon: 'capcut.svg',
              name: 'CapCut',
              detail: L(
                'Вспомогательный инструмент для отдельных этапов монтажа.',
                'A supporting tool for individual editing tasks.',
              ),
            },
            {
              icon: 'hlae.svg',
              name: 'HLAE',
              detail: L(
                'Базовое знакомство. Изучаю камеры и игровые пролёты.',
                'Basic familiarity. Learning camera work and in-game fly-throughs.',
              ),
            },
          ].map((item) => (
            <div
              className={'v6-tool-line v6-tool-' + item.name.toLowerCase().replaceAll(' ', '-')}
              key={item.name}
            >
              <div className="v6-tool-logo">
                <img
                  src={import.meta.env.BASE_URL + 'assets/' + item.icon}
                  width="48"
                  height="48"
                  alt=""
                />
              </div>
              <h3>{item.name}</h3>
              <p>{t(item.detail)}</p>
            </div>
          ))}
        </div>
        <Link className="v6-inline-link v9-tool-link" to="/media/">
          {t(L('Смотреть видео', 'Watch my work'))}
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </section>
    </>
  );
}
