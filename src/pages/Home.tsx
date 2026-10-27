import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Github, Send } from 'lucide-react';
import { m } from 'motion/react';
import { useLanguage, L } from '@/lib/i18n';
import { useMotionPreference } from '@/lib/motion';
import { ActionLink, SpotlightCard, StackList } from '@/components/Primitives';
import { ProjectIdentity } from '@/components/ProjectIdentity';
import { Terminal } from '@/components/Terminal';
import { CountUp } from '@/components/CountUp';
import { projects, findProject } from '@/data/projects';
import { role, capabilities } from '@/data/profile';

const researchify = findProject('researchify')!;
const featured = ['researchify', 'prime-market', 'predict', 'sharex-macos-linux'].map(
  (slug) => findProject(slug)!,
);
const stack = [
  'Python',
  'C++20',
  'SQLite',
  'Telegram Bot API',
  'CMake',
  'GitHub Actions',
  'Regex',
  'MCP',
  'Dear ImGui',
  'React',
  'DaVinci Resolve',
  'Fusion',
];

function HeroTitle() {
  const { paused } = useMotionPreference();
  return (
    <h1 className="hero-title" aria-label="R1SK">
      {'R1SK'.split('').map((ch, i) => (
        <m.span
          key={i}
          aria-hidden="true"
          initial={paused ? false : { y: '0.6em', opacity: 0, filter: 'blur(10px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          transition={{
            duration: paused ? 0 : 0.8,
            delay: paused ? 0 : 0.08 * i,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {ch}
        </m.span>
      ))}
      <m.span
        aria-hidden="true"
        className="hero-dot"
        initial={paused ? false : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          duration: paused ? 0 : 0.5,
          delay: paused ? 0 : 0.45,
          type: 'spring',
          stiffness: 260,
        }}
      >
        .
      </m.span>
    </h1>
  );
}

export default function Home() {
  const { t } = useLanguage();
  const { paused } = useMotionPreference();
  const fade = (delay: number) =>
    paused
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        };
  return (
    <>
      <section className="hero shell">
        <div className="hero-copy">
          <m.p className="hero-now" {...fade(0.05)}>
            {t(L('Сейчас делаю', 'Now building'))}{' '}
            <Link to="/projects/researchify/">ReSearchify</Link> {t(L('и', 'and'))}{' '}
            <Link to="/projects/prime-market/">Prime Market</Link>
          </m.p>
          <HeroTitle />
          <m.p className="hero-role" {...fade(0.35)}>
            {(() => {
              const [head, ...tail] = t(role).split(' · ');
              return (
                <>
                  <strong>{head}</strong>
                  <span>{tail.join(' · ')}</span>
                </>
              );
            })()}
          </m.p>
          <m.p className="hero-pitch" {...fade(0.45)}>
            {t(
              L(
                'Делаю инструменты, которые убирают рутину и ускоряют работу, — и довожу их до релиза: от сценария и интерфейса до сборок под Windows, macOS и Linux.',
                'I build tools that remove routine and speed up work — and ship them: from the workflow and interface to builds for Windows, macOS and Linux.',
              ),
            )}
          </m.p>
          <m.div className="hero-actions" {...fade(0.55)}>
            <ActionLink to="/projects/">{t(L('Проекты', 'Projects'))}</ActionLink>
            <ActionLink
              to="https://github.com/r1skme"
              variant="secondary"
              icon={<Github size={18} />}
            >
              GitHub
            </ActionLink>
            <ActionLink to="/about/" variant="text">
              {t(L('Обо мне', 'About me'))}
            </ActionLink>
          </m.div>
        </div>
        <m.div
          className="hero-visual"
          initial={paused ? false : { opacity: 0, y: 30, rotateX: 12 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: paused ? 0 : 1,
            delay: paused ? 0 : 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Terminal lines={researchify.commands!.slice(0, 5)} />
          <Link to="/projects/researchify/" className="hero-chip hero-chip-a">
            <strong>94,6×</strong>
            <span>{t(L('быстрее поиска, как в VS Code', 'faster than VS Code-style search'))}</span>
          </Link>
          <Link to="/projects/researchify/" className="hero-chip hero-chip-b">
            <strong>5</strong>
            <span>{t(L('систем: Windows, macOS, Linux', 'systems: Windows, macOS, Linux'))}</span>
          </Link>
        </m.div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...stack, ...stack].map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>

      <section className="shell section" aria-labelledby="can-title">
        <header className="section-head" data-reveal>
          <h2 id="can-title">{t(L('Чем могу быть полезен', 'How I can help'))}</h2>
          <p className="lead">
            {t(
              L(
                'Каждый пункт подтверждён проектом, который можно открыть и проверить.',
                'Every item is backed by a project you can open and check.',
              ),
            )}
          </p>
        </header>
        <div className="capabilities">
          {capabilities.map((c, i) => (
            <SpotlightCard key={i} as="article" className="capability">
              <span className="capability-index">0{i + 1}</span>
              <h3>{t(c.title)}</h3>
              <p>{t(c.text)}</p>
              <StackList items={c.tools} />
              <Link to={c.proof.href} className="capability-proof">
                {typeof c.proof.label === 'string' ? c.proof.label : t(c.proof.label)}
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </SpotlightCard>
          ))}
        </div>
      </section>

      <section className="shell section" aria-labelledby="work-title">
        <header className="section-head section-head-row" data-reveal>
          <h2 id="work-title">{t(L('Проекты', 'Projects'))}</h2>
          <Link to="/projects/" className="text-link">
            {t(L('Все проекты', 'All projects'))} ({projects.length})
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </header>
        <div className="featured">
          {featured.map((p, i) => (
            <SpotlightCard
              key={p.slug}
              as="article"
              className={'feature' + (i === 0 ? ' feature-main' : '')}
            >
              <Link to={`/projects/${p.slug}/`} className="feature-link">
                {p.links?.repo && (
                  <div className="feature-top">
                    <Github size={17} aria-label="GitHub" />
                  </div>
                )}
                <h3>
                  <ProjectIdentity name={p.name} slug={p.slug} arrow />
                </h3>
                <p>{t(p.tagline)}</p>
                {i === 0 && p.facts && (
                  <dl className="feature-facts">
                    {p.facts.map((f) => (
                      <div key={f.value}>
                        <dt>{f.value}</dt>
                        <dd>{t(f.label)}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                <StackList items={p.stack.slice(0, i === 0 ? 6 : 3)} />
              </Link>
            </SpotlightCard>
          ))}
        </div>
      </section>

      <section className="shell proof" aria-labelledby="proof-title">
        <Link to="/media/" className="proof-main" data-reveal>
          <h2 id="proof-title" className="sr-only">
            {t(L('Результаты', 'Results'))}
          </h2>
          <strong className="proof-number">
            <CountUp value="150K+" duration={2200} />
          </strong>
          <span className="proof-caption">
            {t(
              L(
                'просмотров у четырёх моих TikTok-роликов — монтаж, идея и подача мои.',
                'views on four of my TikTok edits — the idea, edit and delivery are mine.',
              ),
            )}
            <span className="proof-more">
              {t(L('Смотреть работы', 'Watch the work'))}
              <ArrowUpRight size={18} aria-hidden="true" />
            </span>
          </span>
        </Link>
        <div className="proof-side">
          <Link to="/projects/researchify/" data-reveal>
            <strong>
              <CountUp value="94,6×" />
            </strong>
            <span>
              {t(
                L(
                  'во столько раз ReSearchify быстрее поиска в VS Code (ripgrep)',
                  'times faster: ReSearchify vs VS Code’s search engine (ripgrep)',
                ),
              )}
            </span>
          </Link>
          <Link to="/skills/" data-reveal>
            <strong>
              <CountUp value="3" />
            </strong>
            <span>
              {t(L('года монтажа в DaVinci Resolve', 'years editing in DaVinci Resolve'))}
            </span>
          </Link>
        </div>
      </section>

      <section className="shell section-tight">
        <Link to="/roadmap/" className="roadmap-line" data-reveal>
          <span>{t(L('Путь и планы', 'Roadmap'))}</span>
          <span className="roadmap-line-text">
            {t(
              L(
                'Что дали первые запуски и что дальше',
                'What early launches taught me and what is next',
              ),
            )}
          </span>
          <ArrowUpRight size={20} aria-hidden="true" />
        </Link>
      </section>

      <section className="shell cta" data-reveal>
        <h2>{t(L('Есть задача? Давай обсудим.', 'Have a task? Let’s talk.'))}</h2>
        <p className="lead">
          {t(
            L(
              'Пиши в Telegram — отвечу и скажу, чем могу помочь.',
              'Message me on Telegram — I’ll reply and tell you how I can help.',
            ),
          )}
        </p>
        <div className="hero-actions">
          <ActionLink to="https://t.me/R1SKME" icon={<Send size={18} />}>
            Telegram @R1SKME
          </ActionLink>
          <ActionLink to="/contact/" variant="secondary">
            {t(L('Все контакты', 'All contacts'))}
          </ActionLink>
        </div>
      </section>
    </>
  );
}
