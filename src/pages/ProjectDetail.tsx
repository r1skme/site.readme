import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { m } from 'motion/react';
import { useLanguage, L } from '@/lib/i18n';
import { useMotionPreference } from '@/lib/motion';
import { projects, findProject } from '@/data/projects';
import { ProjectIdentity } from '@/components/ProjectIdentity';
import { ProjectLinks, RichText, StackList, StatusBadge } from '@/components/Primitives';
import { Terminal } from '@/components/Terminal';
import { Benchmarks } from '@/components/Benchmarks';
import NotFound from '@/components/NotFound';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { t } = useLanguage();
  const { paused } = useMotionPreference();
  const project = findProject(slug);
  if (!project) return <NotFound backTo="/projects/" />;
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const story = [
    { title: L('Зачем', 'Why'), text: project.challenge },
    { title: L('Как устроено', 'How it works'), text: project.approach },
    { title: L('Где сейчас', 'Where it is now'), text: project.outcome },
  ];
  return (
    <>
      <section className="shell case-head">
        <Link className="back-link" to="/projects/">
          <ArrowLeft size={17} aria-hidden="true" />
          {t(L('Все проекты', 'All projects'))}
        </Link>
        <m.h1
          className={'case-title case-' + project.slug}
          initial={paused ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: paused ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <ProjectIdentity name={project.name} slug={project.slug} />
        </m.h1>
        <p className="case-tagline">{t(project.tagline)}</p>
        <div className="case-intro">
          <p className="lead">
            <RichText text={t(project.summary)} />
          </p>
          <div className="case-side">
            <dl className="case-meta">
              <div>
                <dt>{t(L('Период', 'Period'))}</dt>
                <dd>{t(project.period)}</dd>
              </div>
              <div>
                <dt>{t(L('Статус', 'Status'))}</dt>
                <dd>
                  <StatusBadge status={project.status} />
                </dd>
              </div>
            </dl>
            <ProjectLinks project={project} />
          </div>
        </div>
      </section>

      {project.why && (
        <section className="shell section why" aria-labelledby="why-title">
          <h2 id="why-title">{t(L('Зачем это нужно', 'Why it matters'))}</h2>
          <p>{t(project.why)}</p>
        </section>
      )}

      {project.benchmarks && (
        <section className="shell section-tight" aria-labelledby="bench-title">
          <h2 id="bench-title" className="bench-title">
            {t(L('Скорость в цифрах', 'Speed in numbers'))}
          </h2>
          <Benchmarks groups={project.benchmarks} />
        </section>
      )}

      {project.commands && (
        <section className="shell section-tight try" aria-labelledby="try-title">
          <div>
            <h2 id="try-title">{t(L('Как попробовать', 'Try it'))}</h2>
            <p className="lead">
              {t(
                L(
                  'Скачай архив под свою систему со страницы релизов, распакуй и запусти из корня проекта:',
                  'Download the archive for your system from the releases page, unpack it and run from your project root:',
                ),
              )}
            </p>
          </div>
          <Terminal lines={project.commands} typing={false} />
        </section>
      )}

      <section className="shell section-tight" aria-labelledby="stack-title">
        <h2 id="stack-title" className="eyebrow">
          {t(L('Технологии', 'Stack'))}
        </h2>
        <StackList items={project.stack} />
        {project.footnote && <p className="footnote">{t(project.footnote)}</p>}
      </section>

      <section className="shell case-story">
        {story.map((s, i) => (
          <article key={i} data-reveal>
            <h2>
              <span aria-hidden="true">0{i + 1}</span>
              {t(s.title)}
            </h2>
            <p>
              <RichText text={t(s.text)} />
            </p>
          </article>
        ))}
      </section>

      <section className="shell section-tight">
        <Link to={`/projects/${next.slug}/`} className="next-project" data-reveal>
          <span>{t(L('Следующий проект', 'Next project'))}</span>
          <strong>{next.name}</strong>
          <ArrowUpRight size={28} aria-hidden="true" />
        </Link>
      </section>
    </>
  );
}
