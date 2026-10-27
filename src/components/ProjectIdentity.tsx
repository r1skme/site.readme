import { ArrowUpRight } from 'lucide-react';

type Props = { name: string; slug: string; arrow?: boolean; className?: string };
/** A project identity, not a synthetic cover. Its mark and name share one baseline. */
export function ProjectIdentity({ name, slug, arrow = false, className = '' }: Props) {
  return (
    <span className={`project-identity ${className}`}>
      {slug === 'researchify' && (
        <img
          className="project-identity-mark"
          src={`${import.meta.env.BASE_URL}assets/researchify-mark.svg`}
          width="68"
          height="42"
          alt=""
          aria-hidden="true"
        />
      )}
      {slug === 'prime-market' ? (
        <img
          className="project-identity-wordmark"
          src={`${import.meta.env.BASE_URL}assets/prime-wordmark.svg`}
          width="300"
          height="84"
          alt={name}
        />
      ) : (
        <span className="project-identity-name">{name}</span>
      )}
      {arrow && (
        <ArrowUpRight
          className="project-identity-arrow v7-inline-arrow"
          size={23}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      )}
    </span>
  );
}
