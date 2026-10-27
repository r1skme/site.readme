import { ArrowUpRight } from 'lucide-react';

type Props = { name: string; slug: string; arrow?: boolean; className?: string };

/** A project's name with its mark where one exists. Prime Market's wordmark keeps a hidden text name. */
export function ProjectIdentity({ name, slug, arrow = false, className = '' }: Props) {
  return (
    <span className={`identity ${className}`}>
      {slug === 'researchify' && (
        <img
          className="identity-mark"
          src="/assets/researchify-mark.svg"
          width="68"
          height="42"
          alt=""
          aria-hidden="true"
        />
      )}
      {slug === 'prime-market' ? (
        <>
          <img
            className="identity-wordmark"
            src="/assets/prime-wordmark.svg"
            width="300"
            height="84"
            alt=""
            aria-hidden="true"
          />
          <span className="sr-only">{name}</span>
        </>
      ) : (
        <span className="identity-name">{name}</span>
      )}
      {arrow && (
        <ArrowUpRight className="identity-arrow" size={22} strokeWidth={1.5} aria-hidden="true" />
      )}
    </span>
  );
}
