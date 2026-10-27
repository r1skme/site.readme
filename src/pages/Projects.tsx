import { Link } from 'react-router-dom';
import type { CSSProperties } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { projects } from '@/data/projects';
import { useLanguage, L } from '@/lib/i18n';
import { PageHeading } from '@/components/Primitives';
import { ProjectIdentity } from '@/components/ProjectIdentity';

export default function Projects() {
  const { t } = useLanguage();
  const primary = projects.filter((p) => p.slug !== 'researchify-web');
  const web = projects.find((p) => p.slug === 'researchify-web');
  return (
    <>
      <PageHeading
        label={t(L('Проекты', 'Projects'))}
        title={t(L('Мои проекты', 'My projects'))}
        desc={t(
          L(
            'Автоматизация, поиск по исходному коду, игровые инструменты и опыт собственного сервера. Для каждого проекта — задача, технологии и текущий этап работы.',
            'Automation, source-code search, gaming tools and the experience of running my own server. Each project includes its purpose, technology and current stage.',
          ),
        )}
      />
      <section
        className="shell v6-projects-editorial v7-project-catalog"
        aria-label={t(L('Каталог проектов', 'Project directory'))}
      >
        <div className="v6-project-list">
          {primary.map((project) => (
            <Link
              key={project.slug}
              className={'v6-project-row v7-project-row v6-project-' + project.slug}
              to={'/projects/' + project.slug + '/'}
              style={{ '--project-color': project.accent } as CSSProperties}
            >
              <div className="v6-project-titles">
                <h2>
                  <ProjectIdentity name={project.name} slug={project.slug} arrow />
                </h2>
                <p>{t(project.summary)}</p>
                <div className="v7-row-facts">
                  <span>{t(project.since)}</span>
                  <span aria-hidden="true" className="v7-fact-sep">
                    ·
                  </span>
                  <span>{project.stack.slice(0, 3).join(' · ')}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      {web && (
        <section className="shell v7-experiment">
          <div className="v7-experiment-heading">
            <h2>{t(L('Отдельный эксперимент', 'Separate experiment'))}</h2>
            <p>
              {t(L('Интернет-источники для локальных моделей.', 'Web sources for local models.'))}
            </p>
          </div>
          <Link to="/projects/researchify-web/" className="v7-experiment-link">
            <div>
              <strong>Researchify Web</strong>
              <p>
                {t(
                  L(
                    'Интернет-поиск и чтение источников для локальных LLM.',
                    'Internet search and source retrieval for local LLMs.',
                  ),
                )}
              </p>
            </div>
            <ArrowUpRight aria-hidden="true" size={24} />
          </Link>
        </section>
      )}
      <section className="shell v6-projects-note">
        <h2>{t(L('Как развиваются проекты', 'Where the projects go next'))}</h2>
        <div>
          <p>
            {t(
              L(
                'Основное внимание сейчас уделяю Prime Market, ReSearchify и новым программным инструментам. В дорожной карте собрал опыт запусков и ближайшие задачи.',
                'My current focus is Prime Market, ReSearchify and new software tools. The roadmap brings together lessons from earlier launches and the next tasks.',
              ),
            )}
          </p>
          <Link className="v7-secondary-link" to="/roadmap/">
            {t(L('Открыть дорожную карту', 'Explore my roadmap'))}
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
