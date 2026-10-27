import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
type Stat = { value: string; label: string; note?: string };
export function BoldStats({
  stats,
  illustration,
  className,
}: {
  stats: Stat[];
  illustration?: ReactNode;
  className?: string;
}) {
  const [main, ...rest] = stats;
  if (!main) return null;
  return (
    <section className={cn('stat-editorial w-full', className)}>
      <div className="border-b border-white/15 pb-7 grid grid-cols-1 md:grid-cols-[1.15fr_1fr] gap-8 md:gap-10">
        <div className="flex items-start gap-5 md:gap-7">
          <div className="stat-xl tracking-[-.085em] leading-[.95] shrink-0">{main.value}</div>
          <div className="pt-1">
            <h3 className="stat-caption">{main.label}</h3>
            {main.note && (
              <p className="text-xs leading-6 text-[#97a8c2] max-w-52 mt-2">{main.note}</p>
            )}
          </div>
        </div>
        {illustration && (
          <div className="min-h-[126px] md:min-h-[148px] overflow-hidden rounded-2xl bg-[#111c31] border border-white/10 relative">
            {illustration}
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-6 py-6">
        {rest.map((stat, i) => (
          <div key={`${i}-${stat.label}`}>
            <p className="stat-small leading-none">{stat.value}</p>
            <p className="mt-3 text-xs text-[#95a5bc] uppercase tracking-[.11em]">{stat.label}</p>
            {stat.note && <p className="text-xs mt-1 text-[#667992]">{stat.note}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
export default BoldStats;
