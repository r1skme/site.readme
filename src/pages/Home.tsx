import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { m } from 'motion/react';
import { useLanguage, L } from '@/lib/i18n';
import { useMotionPreference } from '@/lib/motion';
import { AnimatedLink } from '@/components/Primitives';
import TextLoop from '@/components/ui/text-loop';
import { ProjectIdentity } from '@/components/ProjectIdentity';
const subjects = { ru: ['инструменты', 'проекты', 'видео'], en: ['tools', 'projects', 'videos'] };
const focus = [
  {
    name: L('Программирование', 'Software & automation'),
    description: L(
      'Python, Telegram-боты, API и автоматизация. Работаю над логикой, проверкой функций и поиском причин ошибок.',
      'Python, Telegram bots, APIs and automation. I work on workflows, feature testing and understanding what breaks.',
    ),
    url: '/skills/',
  },
  {
    name: L('Продукты', 'Products & interfaces'),
    description: L(
      'Собственные инструменты: от задачи и сценариев использования до интерфейса и следующих версий.',
      'My own tools, from a problem and user flows to the interface and the next iteration.',
    ),
    url: '/projects/',
  },
  {
    name: L('Видеомонтаж', 'Video editing'),
    description: L(
      'Около трёх лет в DaVinci Resolve. Игровые эдиты, ритм, анимация, цвет и работа со звуком.',
      'About three years in DaVinci Resolve. Gaming edits, rhythm, animation, colour and sound.',
    ),
    url: '/media/',
  },
];
const selection = [
  {
    slug: 'prime-market',
    name: 'Prime Market',
    desc: L(
      'Автоматизация задач на рынке игровых предметов.',
      'Automation for game-item market workflows.',
    ),
  },
  {
    slug: 'predict',
    name: 'Predict',
    desc: L(
      'Программный продукт с собственной логикой и интерфейсом.',
      'A software product with its own logic and interface.',
    ),
  },
  {
    slug: 'researchify',
    name: 'ReSearchify',
    desc: L(
      'Локальный поиск по исходному коду на C++20.',
      'Local source-code search built with C++20.',
    ),
  },
];
export default function Home() {
  const { lang, t } = useLanguage(),
    { paused } = useMotionPreference();
  return (
    <>
      <section className="home-hero shell v6-hero v8-hero">
        <div className="home-hero-content">
          <div className="home-hero-main">
            <div className="v6-hero-identity">
              <m.h1
                initial={paused ? false : { opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: paused ? 0 : 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                R1SK<span className="hero-point">.</span>
              </m.h1>
              <div className="hero-rotator">
                <TextLoop
                  staticText={t(L('Создаю', 'I build'))}
                  rotatingTexts={subjects[lang]}
                  interval={3400}
                />
              </div>
            </div>
            <div className="hero-right">
              <p className="hero-thought">
                {t(
                  L(
                    'Занимаюсь программированием, автоматизацией и игровым видеоконтентом. Развиваю свои инструменты — от задачи и интерфейса до проверки результата.',
                    'I work on programming, automation and gaming video content. I develop my own tools, from the problem and interface to testing the result.',
                  ),
                )}
              </p>
              <div className="home-actions">
                <AnimatedLink to="/projects/">{t(L('Мои проекты', 'My projects'))}</AnimatedLink>
                <Link className="link-subtle" to="/about/">
                  {t(L('Обо мне', 'About me'))}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="shell v9-home-about v9-section" aria-labelledby="home-about-title">
        <div>
          <h2 id="home-about-title">
            {t(L('Создаю то, чем хочу пользоваться сам.', 'Building tools I want to use.'))}
          </h2>
          <Link to="/about/">
            {t(L('Подробнее обо мне', 'More about me'))}
            <ArrowUpRight size={19} aria-hidden="true" />
          </Link>
        </div>
        <div className="v9-reading-copy">
          <p>
            {t(
              L(
                'Prime Market появился из желания автоматизировать повторяющиеся действия, а ReSearchify — сделать поиск по коду удобнее и быстрее. Мне интересно разбираться в устройстве продукта: как связаны данные, настройки, интерфейс и поведение программы.',
                'Prime Market started with repetitive tasks I wanted to automate; ReSearchify with a need for better source-code search. I like understanding how a product works: how data, settings, the interface and program behaviour connect.',
              ),
            )}
          </p>
          <p>
            {t(
              L(
                'Работаю с требованиями, проверкой функций и баг-репортами, развиваю навыки Python и C++20. Параллельно около трёх лет монтирую в DaVinci Resolve. Опыт игровых проектов и поддержки покупателей помогает смотреть на результат не только со стороны автора.',
                'I work with requirements, feature testing and bug reports while developing my Python and C++20 skills. In parallel, I have edited in DaVinci Resolve for around three years. Game projects and buyer support help me see the result from more than its creator’s perspective.',
              ),
            )}
          </p>
        </div>
      </section>
      <section className="shell v6-focus-section">
        <header className="v6-section-intro">
          <h2>{t(L('Чем занимаюсь', 'What I do'))}</h2>
        </header>
        <div className="v6-focus-list">
          {focus.map((v, i) => (
            <Link key={i} to={v.url} className="v6-focus-row">
              <h3>{t(v.name)}</h3>
              <p>{t(v.description)}</p>
              <ArrowUpRight size={22} strokeWidth={1.4} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>
      <section className="shell v6-selection-section">
        <header className="v6-section-intro">
          <h2>{t(L('Мои проекты', 'Selected projects'))}</h2>
          <Link to="/projects/" className="v6-inline-link">
            {t(L('Все проекты', 'All projects'))}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </header>
        <div className="v6-feature-list">
          {selection.map((v) => (
            <Link className="v6-feature-row" to={'/projects/' + v.slug + '/'} key={v.slug}>
              <div>
                <h3>
                  <ProjectIdentity name={v.name} slug={v.slug} arrow />
                </h3>
                <p>{t(v.desc)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="shell v7-roadmap-callout v8-roadmap-callout">
        <div>
          <h2>{t(L('Путь и планы', 'How I got here'))}</h2>
          <p>
            {t(
              L(
                'Что дали первые запуски и куда развиваются мои проекты.',
                'What the early launches taught me and where my projects go next.',
              ),
            )}
          </p>
        </div>
        <Link to="/roadmap/">
          {t(L('Roadmap', 'Explore roadmap'))}
          <ArrowUpRight size={22} aria-hidden="true" />
        </Link>
      </section>
      <section className="shell v6-proof">
        <div className="v6-proof-primary">
          <strong>150K+</strong>
          <p>
            {t(
              L(
                'просмотров четырёх TikTok-роликов на двух аккаунтах',
                'views across four TikTok posts from two accounts',
              ),
            )}
          </p>
        </div>
        <div className="v6-proof-secondary">
          <strong>3 {t(L('года', 'years'))}</strong>
          <p>DaVinci Resolve</p>
          <Link to="/media/">
            {t(L('Посмотреть работы', 'Watch my work'))}
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section className="shell v6-home-cta">
        <div>
          <h2>{t(L('Есть задача или идея?', 'Have a project in mind?'))}</h2>
          <p>{t(L('Напиши — обсудим.', 'Get in touch.'))}</p>
        </div>
        <AnimatedLink to="/contact/">{t(L('Связаться', 'Get in touch'))}</AnimatedLink>
      </section>
    </>
  );
}
