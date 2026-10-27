import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage, L } from '@/lib/i18n';
import { ActionLink, PageHeading } from '@/components/Primitives';
import { profile, experience, beyond, approach, learning, role } from '@/data/profile';

export default function About() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeading title={t(L('Обо мне.', 'About me.'))} desc={t(role)} />
      <section className="shell about-short" aria-label={t(L('Коротко', 'In short'))}>
        <div className="about-short-copy">
          {profile.short.map((p, i) => (
            <p key={i}>{t(p)}</p>
          ))}
          <div className="hero-actions">
            <ActionLink to="/projects/">{t(L('Проекты', 'Projects'))}</ActionLink>
            <ActionLink to="/contact/" variant="secondary">
              {t(L('Связаться', 'Contact'))}
            </ActionLink>
          </div>
        </div>
        <aside className="about-origin" data-reveal>
          <h2>{t(L('Как всё началось', 'Where it started'))}</h2>
          <p>{t(profile.origin)}</p>
          <p>{t(profile.motivation)}</p>
        </aside>
      </section>

      <section className="shell section" aria-labelledby="practice-title">
        <header className="section-head" data-reveal>
          <h2 id="practice-title">{t(L('Чем занимаюсь на практике', 'What I work on'))}</h2>
        </header>
        <div className="rows">
          {experience.map((item, i) => (
            <article key={i} className="row" data-reveal>
              <div>
                <h3>{t(item.title)}</h3>
                <Link to={item.href} className="text-link">
                  {typeof item.link === 'string' ? item.link : t(item.link)}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
              <p>{t(item.text)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="shell section" aria-labelledby="beyond-title">
        <header className="section-head" data-reveal>
          <h2 id="beyond-title">{t(L('Не только код', 'Beyond code'))}</h2>
        </header>
        <div className="two-col">
          {beyond.map((item, i) => (
            <article key={i} data-reveal>
              <h3>{t(item.title)}</h3>
              <p>{t(item.text)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="shell section" aria-labelledby="process-title">
        <header className="section-head" data-reveal>
          <h2 id="process-title">{t(L('Как работаю над задачей', 'How I approach a task'))}</h2>
        </header>
        <ol className="steps">
          {approach.map((a, i) => (
            <li key={i} data-reveal>
              <span className="step-index" aria-hidden="true">
                0{i + 1}
              </span>
              <h3>{t(a.title)}</h3>
              <p>{t(a.text)}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="shell section-tight">
        <Link to="/roadmap/" className="roadmap-line" data-reveal>
          <span>{t(L('Дальше', 'Next'))}</span>
          <span className="roadmap-line-text">{t(learning)}</span>
          <ArrowUpRight size={20} aria-hidden="true" />
        </Link>
      </section>
    </>
  );
}
