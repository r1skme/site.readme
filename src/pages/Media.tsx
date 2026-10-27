import { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Play, X, ExternalLink } from 'lucide-react';
import { useLanguage, L } from '@/lib/i18n';
import { PageHeading } from '@/components/Primitives';
import { CountUp } from '@/components/CountUp';
import { Reel } from '@/components/Reel';
import { works, channels, type Work } from '@/data/media';

const src = (img: string) => (img.startsWith('http') ? img : `/${img}`);

function WorkCard({ work, onPlay }: { work: Work; onPlay: (id: string) => void }) {
  const { t } = useLanguage();
  const body = (
    <>
      <div className="work-image">
        <img
          src={src(work.img)}
          alt=""
          loading="lazy"
          decoding="async"
          onError={(e) => {
            if (work.video && !e.currentTarget.src.includes('hqdefault'))
              e.currentTarget.src = `https://i.ytimg.com/vi/${work.video}/hqdefault.jpg`;
          }}
        />
        {work.video && (
          <span className="work-play" aria-hidden="true">
            <Play size={20} fill="currentColor" />
          </span>
        )}
      </div>
      <div className="work-info">
        <span className="work-platform">
          {work.platform} · {work.account}
        </span>
        <h3>{t(work.title)}</h3>
        <span className="work-foot">
          {work.views ? (
            <strong>
              {work.views} <small>{t(L('просмотров', 'views'))}</small>
            </strong>
          ) : (
            <span />
          )}
          <span className="work-action">
            {work.video ? t(L('Смотреть', 'Watch')) : t(L('Смотреть в TikTok', 'Watch on TikTok'))}
            {!work.video && <ArrowUpRight size={16} aria-hidden="true" />}
          </span>
        </span>
      </div>
    </>
  );
  return work.video ? (
    <button
      type="button"
      className={'work work-youtube'}
      onClick={() => onPlay(work.id)}
      data-reveal
    >
      {body}
    </button>
  ) : (
    <a
      className="work work-tiktok"
      href={work.url}
      target="_blank"
      rel="noopener noreferrer"
      data-reveal
    >
      {body}
    </a>
  );
}

export default function Media() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<string | null>(null);
  const work = works.find((w) => w.id === selected),
    modal = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!selected) return;
    const previous = document.activeElement as HTMLElement | null,
      el = modal.current;
    if (!el) return;
    const previousOverflow = document.body.style.overflow;
    el.showModal();
    document.body.style.overflow = 'hidden';
    const close = (e: Event) => {
      e.preventDefault();
      setSelected(null);
    };
    el.addEventListener('cancel', close);
    return () => {
      el.removeEventListener('cancel', close);
      el.close();
      document.body.style.overflow = previousOverflow;
      previous?.focus({ preventScroll: true });
    };
  }, [selected]);
  return (
    <>
      <PageHeading
        title={
          <>
            {t(L('Монтаж', 'Editing'))}
            <br />
            <span className="muted">{t(L('в ритме игры.', 'in the rhythm of play.'))}</span>
          </>
        }
        desc={t(
          L(
            'Игровые эдиты для личных каналов и GLOW RUST: идея, материал, ритм, музыка, цвет и звук.',
            'Gaming edits for my channels and GLOW RUST: idea, footage, rhythm, music, colour and sound.',
          ),
        )}
      />
      <Reel works={works} />
      <section className="shell numbers numbers-2" aria-label={t(L('В цифрах', 'In numbers'))}>
        <div className="number number-wide" data-reveal>
          <strong>
            <CountUp value="150K+" />
          </strong>
          <span>
            {t(
              L(
                'Сумма просмотров четырёх роликов на двух аккаунтах: 95,1K + 26,8K + 20,8K + 16,1K = 158,8K.',
                'Total views of four posts on two accounts: 95.1K + 26.8K + 20.8K + 16.1K = 158.8K.',
              ),
            )}
          </span>
        </div>
        <div className="number" data-reveal>
          <strong>
            <CountUp value="3" />
          </strong>
          <span>{t(L('года в DaVinci Resolve', 'years in DaVinci Resolve'))}</span>
        </div>
      </section>
      <section className="shell section" aria-labelledby="works-title">
        <header className="section-head" data-reveal>
          <h2 id="works-title">{t(L('Избранные работы', 'Selected work'))}</h2>
        </header>
        <div className="works">
          {works.map((w) => (
            <WorkCard key={w.id} work={w} onPlay={setSelected} />
          ))}
        </div>
      </section>
      <section className="shell section split" aria-labelledby="method-title">
        <h2 id="method-title" data-reveal>
          {t(L('Как собираю ролик', 'How I build an edit'))}
        </h2>
        <div className="prose" data-reveal>
          <p>
            {t(
              L(
                'Самое сложное — найти идею и нужный материал. Использую свои записи, демки и готовые материалы в зависимости от задачи. Затем собираю основу и работаю с темпом, музыкой и акцентами.',
                'The hardest part is finding the idea and the right footage. Depending on the task I use my own recordings, demos and existing material. Then I assemble the edit and work on pacing, music and emphasis.',
              ),
            )}
          </p>
          <p>
            {t(
              L(
                'В коротком ролике цепляю зрителя с первых секунд, не затягиваю и не перегружаю эффектами. Ради хорошего результата возвращаюсь к работе несколько дней.',
                'In short videos I hook the viewer from the first seconds, keep it tight and use effects with purpose. For a better result I come back to a piece over several days.',
              ),
            )}
          </p>
          <div className="pill-links">
            {channels.map((c) => (
              <a key={c.url} href={c.url} target="_blank" rel="noopener noreferrer">
                {c.label}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </section>
      {work?.video && (
        <dialog
          ref={modal}
          className="video-dialog"
          aria-label={t(work.title)}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelected(null);
          }}
        >
          <div className="video-modal">
            <div className="video-modal-head">
              <span>{t(work.title)}</span>
              <button onClick={() => setSelected(null)} aria-label={t(L('Закрыть', 'Close'))}>
                <X size={20} />
              </button>
            </div>
            <div className="video-player">
              <iframe
                title={t(work.title)}
                src={`https://www.youtube-nocookie.com/embed/${work.video}?rel=0&autoplay=1`}
                allow="accelerometer;autoplay;encrypted-media;gyroscope;picture-in-picture;fullscreen"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <a href={work.url} target="_blank" rel="noopener noreferrer" className="text-link">
              {t(L('Открыть на YouTube', 'Open on YouTube'))}
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          </div>
        </dialog>
      )}
    </>
  );
}
