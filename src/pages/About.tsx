import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage, L } from '@/lib/i18n';
import { PageHeading } from '@/components/Primitives';
import { profile, experience, humanExperience, approach } from '@/data/profile';

export default function About() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeading
        title={t(L('Обо мне.', 'About me.'))}
        desc={t(
          L(
            'Я R1SK. Развиваю собственные программные проекты, делаю интерфейсы и монтирую игровые видео. Здесь подробнее о том, чем занимаюсь и как подхожу к работе.',
            'I’m R1SK. I develop my own software projects, work on interfaces and edit gaming videos. Here is a closer look at what I do and how I approach it.',
          ),
        )}
      />
      <section className="shell v6-about-intro v9-profile-intro" aria-labelledby="profile-start">
        <div>
          <h2 id="profile-start">
            {t(L('От своей задачи к своему инструменту.', 'From a problem to a tool.'))}
          </h2>
          {profile.intro.map((p, i) => (
            <p key={i}>{t(p)}</p>
          ))}
        </div>
        <aside className="v9-origin">
          <h3>{t(L('Как всё началось', 'Where it started'))}</h3>
          <p>{t(profile.origin)}</p>
          <p>{t(profile.motivation)}</p>
        </aside>
      </section>
      <section className="shell v9-experience v9-section" aria-labelledby="experience-title">
        <header className="v9-section-head">
          <h2 id="experience-title">{t(L('Чем занимаюсь на практике', 'What I work on'))}</h2>
        </header>
        <div className="v9-experience-list">
          {experience.map((item, i) => (
            <article key={i} data-reveal>
              <div className="v9-experience-label">
                <h3>{t(item.title)}</h3>
                <Link to={item.href}>
                  {typeof item.link === 'string' ? item.link : t(item.link)}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
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
      <section className="shell v9-human v9-section" aria-labelledby="people-title">
        <header className="v9-section-head">
          <h2 id="people-title">{t(L('Не только код и монтаж', 'Beyond code and editing'))}</h2>
        </header>
        <div className="v9-human-columns">
          {humanExperience.map((item, i) => (
            <article key={i} data-reveal>
              <h3>{t(item.title)}</h3>
              {item.paragraphs.map((p, j) => (
                <p key={j}>{t(p)}</p>
              ))}
            </article>
          ))}
        </div>
      </section>
      <section className="shell v9-process v9-section" aria-labelledby="process-title">
        <header className="v9-section-head">
          <h2 id="process-title">{t(L('Как работаю над задачей', 'How I approach a task'))}</h2>
        </header>
        <div className="v9-process-list">
          {approach.map((item, i) => (
            <article key={i} data-reveal>
              <h3>{t(item.title)}</h3>
              <p>{t(item.text)}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="shell v9-about-end">
        <div>
          <h2>{t(L('Что развиваю дальше', 'What I’m learning next'))}</h2>
          <p>
            {t(
              L(
                'Углубляюсь в программирование и устройство своих инструментов, развиваю моушн-дизайн, 3D и работу со звуком. Мне интересны задачи, где нужно и разобраться в технической части, и продумать, как человек будет пользоваться результатом.',
                'I continue learning programming and how my tools work, alongside motion design, 3D and sound. I enjoy tasks that require understanding both the technical details and how someone will use the result.',
              ),
            )}
          </p>
        </div>
        <Link to="/roadmap/">
          {t(L('Путь и планы', 'Experience & direction'))}
          <ArrowUpRight size={20} aria-hidden="true" />
        </Link>
      </section>
    </>
  );
}
