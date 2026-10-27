import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage, L } from '@/lib/i18n';
import { PageHeading, RichText, StackList } from '@/components/Primitives';
import { CountUp } from '@/components/CountUp';
import { capabilities } from '@/data/profile';
import { editingSkills } from '@/data/media';
import { IconFolder, type FolderIcon } from '@/components/ui/icon-folder';
import {
  siAvaloniaui,
  siCmake,
  siCplusplus,
  siDotnet,
  siGit,
  siGithubactions,
  siLlvm,
  siPython,
  siSqlite,
  siTelegram,
} from 'simple-icons';

type BrandIcon = { title: string; hex: string; path: string };

/** A brand mark from Simple Icons (CC0), drawn white on its brand colour. */
const brand = (icon: BrandIcon, label = icon.title): FolderIcon => ({
  label,
  background: `linear-gradient(135deg, #${icon.hex}, color-mix(in srgb, #${icon.hex} 60%, #000))`,
  node: (
    <svg viewBox="0 0 24 24" width="46%" height="46%" fill="#fff" aria-hidden="true">
      <path d={icon.path} />
    </svg>
  ),
});

/** One of the site's own editing-tool logos on a dark tile. */
const asset = (file: string, label: string): FolderIcon => ({
  label,
  background: 'linear-gradient(135deg, #1d2638, #0b111d)',
  node: <img src={`/assets/${file}`} alt="" width="56" height="56" draggable={false} />,
});

const folders: { title: ReturnType<typeof L>; icons: FolderIcon[] }[] = [
  {
    title: L('Языки', 'Languages'),
    icons: [brand(siPython), brand(siCplusplus, 'C++20'), brand(siDotnet, 'C# / .NET')],
  },
  {
    title: L('Сборка и CI', 'Build & CI'),
    icons: [brand(siCmake), brand(siLlvm, 'LLVM / Clang'), brand(siGithubactions), brand(siGit)],
  },
  {
    title: L('Данные и API', 'Data & APIs'),
    icons: [
      brand(siSqlite),
      brand(siTelegram, 'Telegram Bot API'),
      brand(siAvaloniaui, 'Avalonia UI'),
    ],
  },
  {
    title: L('Монтаж', 'Editing'),
    icons: [
      asset('resolve.svg', 'DaVinci Resolve'),
      asset('capcut.svg', 'CapCut'),
      asset('hlae.svg', 'HLAE'),
    ],
  },
];

export default function Skills() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeading
        title={t(L('Навыки и практика.', 'Skills in practice.'))}
        desc={t(
          L(
            'Что умею и где это видно: у каждого навыка — проект, в котором он применён.',
            'What I can do and where it shows: every skill links to the project that uses it.',
          ),
        )}
      />
      <section className="shell skill-rows">
        {capabilities.map((c, i) => (
          <article key={i} className="skill-row" data-reveal>
            <div className="skill-row-head">
              <span className="capability-index">0{i + 1}</span>
              <h2>{t(c.title)}</h2>
            </div>
            <div>
              <p>
                <RichText text={t(c.text)} />
              </p>
              <StackList items={c.tools} />
              <Link to={c.proof.href} className="text-link">
                {t(L('Пример:', 'Example:'))}{' '}
                {typeof c.proof.label === 'string' ? c.proof.label : t(c.proof.label)}
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </section>
      <section className="shell section editing" aria-labelledby="editing-title">
        <div className="editing-lead" data-reveal>
          <strong>
            <CountUp value="3" />
          </strong>
          <div>
            <h2 id="editing-title">{t(L('года в DaVinci Resolve', 'years in DaVinci Resolve'))}</h2>
            <p>
              {t(
                L(
                  'Моушн-дизайн, 3D и более сложный саунд-дизайн сейчас в развитии.',
                  'Motion design, 3D and advanced sound design are in progress.',
                ),
              )}
            </p>
          </div>
        </div>
        <div className="skill-levels" data-reveal>
          <div>
            <h3>{t(L('Уверенно', 'Confident'))}</h3>
            <ul>
              {editingSkills.confident.map((s, i) => (
                <li key={i}>{t(s)}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{t(L('Базовый уровень', 'Basic'))}</h3>
            <ul>
              {editingSkills.basic.map((s, i) => (
                <li key={i}>{t(s)}</li>
              ))}
            </ul>
          </div>
        </div>
        <h2 className="folders-title" data-reveal>
          {t(L('Инструменты', 'Tools'))}
        </h2>
        <div className="folders">
          {folders.map((f) => (
            <IconFolder
              key={f.title.en}
              title={t(f.title)}
              tags={f.icons.map((i) => i.label ?? '')}
              icons={f.icons}
            />
          ))}
        </div>
      </section>
    </>
  );
}
