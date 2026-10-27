import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage, L } from '@/lib/i18n';
import { PageHeading, StackList } from '@/components/Primitives';
import { CountUp } from '@/components/CountUp';
import { capabilities } from '@/data/profile';
import { editingSkills } from '@/data/media';

const tools = [
  {
    icon: 'resolve.svg',
    name: 'DaVinci Resolve',
    detail: L(
      'Основной редактор: сборка, анимация, скорость, цвет и VFX.',
      'My main editor for sequencing, animation, retiming, colour and VFX.',
    ),
  },
  {
    icon: 'capcut.svg',
    name: 'CapCut',
    detail: L('Для отдельных этапов монтажа.', 'For individual editing steps.'),
  },
  {
    icon: 'hlae.svg',
    name: 'HLAE',
    detail: L('Изучаю камеры и игровые пролёты.', 'Learning camera work and in-game fly-throughs.'),
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
              <p>{t(c.text)}</p>
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
        <div className="tools">
          {tools.map((tool) => (
            <div className="tool" key={tool.name} data-reveal>
              <img src={'/assets/' + tool.icon} width="44" height="44" alt="" />
              <div>
                <h3>{tool.name}</h3>
                <p>{t(tool.detail)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
