import { Link } from 'react-router-dom';
import { ArrowRight, Github } from 'lucide-react';
import { projects } from '@/data/projects';
import { useLanguage, L } from '@/lib/i18n';
import { PageHeading, SpotlightCard, StackList } from '@/components/Primitives';
import { ProjectIdentity } from '@/components/ProjectIdentity';

export default function Projects() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeading
        title={t(L('Проекты.', 'Projects.'))}
        desc={t(
          L(
            'Поиск по коду, автоматизация, кроссплатформенные сборки, игровые инструменты и собственный сервер. У каждого — задача и полный стек.',
            'Code search, automation, cross-platform builds, gaming tools and my own server. Each with its purpose and full stack.',
          ),
        )}
      />
      <section className="shell catalog" aria-label={t(L('Каталог проектов', 'Project directory'))}>
        {projects.map((p, i) => (
          <SpotlightCard key={p.slug} as="article" className="catalog-item">
            <Link to={`/projects/${p.slug}/`} className="catalog-link">
              <span className="catalog-index" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="catalog-main">
                <h2>
                  <ProjectIdentity name={p.name} slug={p.slug} arrow />
                  {p.links?.repo && (
                    <Github
                      className="catalog-gh"
                      size={18}
                      aria-label={t(L('Есть код на GitHub', 'Source on GitHub'))}
                    />
                  )}
                </h2>
                <p>{t(p.tagline)}</p>
                <StackList items={p.stack} />
              </div>
            </Link>
          </SpotlightCard>
        ))}
      </section>
      <section className="shell section-tight">
        <Link to="/roadmap/" className="roadmap-line" data-reveal>
          <span>{t(L('Планы', 'Plans'))}</span>
          <span className="roadmap-line-text">
            {t(
              L(
                'Что дальше по проектам и новые идеи — в дорожной карте',
                'What is next for each project and new ideas — on the roadmap',
              ),
            )}
          </span>
          <ArrowRight size={20} aria-hidden="true" />
        </Link>
      </section>
    </>
  );
}
