import { useRef, type ReactNode, type PointerEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Github, Download, ExternalLink } from 'lucide-react';
import { m } from 'motion/react';
import { prefetchPage } from '@/lib/routes';
import { useMotionPreference } from '@/lib/motion';
import { useLanguage, L } from '@/lib/i18n';
import { statusLabel, type Project, type ProjectStatus } from '@/data/projects';

export function PageHeading({
  title,
  desc,
  side,
}: {
  title: ReactNode;
  desc?: ReactNode;
  side?: ReactNode;
}) {
  const { paused } = useMotionPreference();
  return (
    <section className="page-heading shell">
      <m.h1
        initial={paused ? false : { y: 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: paused ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {title}
      </m.h1>
      {(desc || side) && (
        <div className="page-heading-side">
          {desc && <p className="lead">{desc}</p>}
          {side}
        </div>
      )}
    </section>
  );
}

type ButtonVariant = 'primary' | 'secondary' | 'text';

export function ActionLink({
  to,
  children,
  variant = 'primary',
  icon,
  className = '',
}: {
  to: string;
  children: ReactNode;
  variant?: ButtonVariant;
  icon?: ReactNode;
  className?: string;
}) {
  const external = /^https?:/.test(to);
  const content = (
    <>
      <span>{children}</span>
      <span className="btn-icon" aria-hidden="true">
        {icon ?? (external ? <ArrowUpRight size={18} /> : <ArrowRight size={18} />)}
      </span>
    </>
  );
  const cls = `btn btn-${variant} ${className}`;
  return external ? (
    <a className={cls} href={to} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    <Link
      className={cls}
      to={to}
      onPointerEnter={() => prefetchPage(to)}
      onFocus={() => prefetchPage(to)}
    >
      {content}
    </Link>
  );
}

/** A card whose border and surface light up under the pointer. */
export function SpotlightCard({
  children,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'li';
}) {
  const ref = useRef<HTMLElement>(null);
  const { paused } = useMotionPreference();
  const move = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'touch' || paused || !ref.current) return;
    const b = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mx', `${(e.clientX - b.left).toFixed(0)}px`);
    ref.current.style.setProperty('--my', `${(e.clientY - b.top).toFixed(0)}px`);
  };
  return (
    <Tag ref={ref as never} onPointerMove={move} className={`spotlight ${className}`} data-reveal>
      {children}
    </Tag>
  );
}

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const { t } = useLanguage();
  return (
    <span className={`status status-${status}`}>
      <i aria-hidden="true" />
      {t(statusLabel[status])}
    </span>
  );
}

export function StackList({ items, label }: { items: string[]; label?: string }) {
  return (
    <ul className="chips" aria-label={label}>
      {items.map((v) => (
        <li key={v}>{v}</li>
      ))}
    </ul>
  );
}

export function ProjectLinks({ project }: { project: Project }) {
  const { t } = useLanguage();
  const { repo, releases, site } = project.links ?? {};
  if (!repo && !releases && !site) return null;
  return (
    <div className="project-links">
      {repo && (
        <ActionLink to={repo} variant="primary" icon={<Github size={18} />}>
          {t(L('Код на GitHub', 'Code on GitHub'))}
        </ActionLink>
      )}
      {releases && (
        <ActionLink to={releases} variant="secondary" icon={<Download size={18} />}>
          {t(L('Релизы', 'Releases'))}
        </ActionLink>
      )}
      {site && (
        <ActionLink
          to={site}
          variant={repo ? 'secondary' : 'primary'}
          icon={<ExternalLink size={18} />}
        >
          {t(L('Сайт проекта', 'Project website'))}
        </ActionLink>
      )}
    </div>
  );
}

/** Renders `code` spans inside otherwise plain localized copy. */
export function RichText({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/(`[^`]+`)/)
        .map((part, i) => (part.startsWith('`') ? <code key={i}>{part.slice(1, -1)}</code> : part))}
    </>
  );
}
