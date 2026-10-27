import { useMemo, useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Play, X, ExternalLink } from 'lucide-react';
import { useLanguage, L } from '@/lib/i18n';
import { PageHeading } from '@/components/Primitives';
import { TiltedGridHero } from '@/components/ui/tilted-grid-hero';
import { publishedWorks } from '@/data/content';
export default function Media() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<string | null>(null);
  const heroImages = useMemo(
    () =>
      publishedWorks.map((v) => ({
        src: v.img.startsWith('http') ? v.img : `${import.meta.env.BASE_URL}${v.img}`,
        alt: '',
      })),
    [],
  );
  const work = publishedWorks.find((w) => w.id === selected),
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
      <section className="media-hero">
        <div className="shell media-heading">
          <PageHeading
            title={
              <>
                {t(L('Монтаж', 'Editing'))}
                <br />
                <span className="muted-headline">
                  {t(L('в ритме игры.', 'in the rhythm of play.'))}
                </span>
              </>
            }
            desc={t(
              L(
                'Люблю игровые эдиты. Мне интересен весь путь от идеи до финального кадра и его звучания.',
                'Gaming edits are my favourite. I enjoy the entire process from the idea to the final image and sound.',
              ),
            )}
          />
        </div>
        <div className="curved-reel">
          <TiltedGridHero
            images={heroImages}
            speed={5.4}
            className="media-tilted-grid"
            tileHeight={37}
            curve={65}
            axis={48}
            fade={8}
            gap={4}
            aspectRatio={16 / 10}
          />
        </div>
      </section>
      <section className="media-metrics shell">
        <div className="media-metric-large">
          <span>{t(L('Суммарные просмотры четырёх роликов', 'Total views on four posts'))}</span>
          <strong>
            150K<span>+</span>
          </strong>
          <p>
            {t(
              L(
                '158,8 тыс. суммарных просмотров четырёх публикаций в личном TikTok и GLOW RUST. Показатели зафиксированы на скриншотах; это просмотры роликов, а не уникальные зрители.',
                '158.8K total views across four posts on my personal TikTok and GLOW RUST. The counts were recorded in screenshots; these are post views rather than unique viewers.',
              ),
            )}
          </p>
        </div>
        <div className="media-metric-small">
          <strong>3</strong>
          <span>{t(L('года в DaVinci Resolve', 'years in DaVinci Resolve'))}</span>
        </div>
      </section>
      <section className="media-gallery shell">
        <div className="section-head-inline">
          <h2>{t(L('Избранные работы', 'Selected work'))}</h2>
          <p>
            {t(
              L(
                'Игровые эдиты, моменты и короткие ролики для личных каналов и GLOW RUST.',
                'Gaming edits, moments and short videos for my personal channels and GLOW RUST.',
              ),
            )}
          </p>
        </div>
        <div className="media-cards">
          {publishedWorks.map((v) => (
            <button
              key={v.id}
              type="button"
              className="media-work"
              onClick={() => setSelected(v.id)}
              aria-label={`${t(L('Открыть', 'Open'))} ${t(v.title)}`}
            >
              <div className="work-image">
                <img
                  src={v.img.startsWith('http') ? v.img : `${import.meta.env.BASE_URL}${v.img}`}
                  alt={t(v.title)}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.opacity = '0';
                  }}
                />
                <div className="work-play">
                  <Play size={20} fill="currentColor" aria-hidden="true" />
                </div>
              </div>
              <div className="work-info">
                <div>
                  <span className="work-platform">{v.category}</span>
                  <h3>{t(v.title)}</h3>
                </div>
                <div className="work-views">{v.views || <ArrowUpRight size={21} />}</div>
              </div>
            </button>
          ))}
        </div>
      </section>
      <section className="media-method shell">
        <div className="media-method-grid">
          <h2>{t(L('Как собираю ролик', 'How I build an edit'))}</h2>
          <div className="v9-reading-copy">
            <p>
              {t(
                L(
                  'Самый сложный этап для меня — найти идею и нужный материал. Использую собственные записи, демки и готовые материалы в зависимости от задачи. Затем собираю основу, работаю с темпом, музыкой и акцентами.',
                  'For me, the hardest stage is finding the idea and the right material. Depending on the task I use my own recordings, demos and existing material. Then I assemble the edit and work on pacing, music and emphasis.',
                ),
              )}
            </p>
            <p>
              {t(
                L(
                  'В коротком ролике стараюсь сразу заинтересовать зрителя, не затягивать монтаж и не перегружать его эффектами. Для хорошего результата готов возвращаться к работе несколько дней.',
                  'In short videos I try to engage the viewer early, avoid dragging out the edit and keep effects purposeful. I am willing to revisit a piece over several days for a better result.',
                ),
              )}
            </p>
          </div>
        </div>
        <div className="channel-links">
          <a href="https://youtube.com/@r1sk-gg" target="_blank" rel="noopener noreferrer">
            YouTube
            <ArrowUpRight size={17} />
          </a>
          <a href="https://www.tiktok.com/@r1skme.hvh" target="_blank" rel="noopener noreferrer">
            TikTok
            <ArrowUpRight size={17} />
          </a>
          <a href="https://www.tiktok.com/@glow_rust" target="_blank" rel="noopener noreferrer">
            GLOW RUST
            <ArrowUpRight size={17} />
          </a>
          <a href="https://vm.tiktok.com/ZN8AC4mbQ/" target="_blank" rel="noopener noreferrer">
            {t(L('Работа в TikTok 01', 'TikTok edit 01'))}
            <ArrowUpRight size={17} />
          </a>
          <a href="https://vm.tiktok.com/ZN8ACCbM2/" target="_blank" rel="noopener noreferrer">
            {t(L('Работа в TikTok 02', 'TikTok edit 02'))}
            <ArrowUpRight size={17} />
          </a>
        </div>
      </section>
      {work && (
        <dialog
          ref={modal}
          className="media-native-dialog"
          aria-label={t(work.title)}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              const r = e.currentTarget.getBoundingClientRect();
              if (
                e.clientX < r.left ||
                e.clientX > r.right ||
                e.clientY < r.top ||
                e.clientY > r.bottom
              )
                setSelected(null);
            }
          }}
        >
          <div className="video-modal">
            <div className="modal-title">
              <span>{t(work.title)}</span>
              <button onClick={() => setSelected(null)} aria-label={t(L('Закрыть', 'Close'))}>
                <X size={20} />
              </button>
            </div>
            {'video' in work && work.video ? (
              <div className="modal-player">
                <iframe
                  title={t(work.title)}
                  src={`https://www.youtube-nocookie.com/embed/${work.video}?rel=0`}
                  allow="accelerometer;encrypted-media;gyroscope;picture-in-picture;fullscreen"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            ) : (
              <div className="modal-poster">
                <img src={`${import.meta.env.BASE_URL}${work.img}`} alt="" />
                <p>
                  {t(
                    L(
                      'Другие публикации этого аккаунта можно посмотреть в TikTok.',
                      'Explore more posts from this account on TikTok.',
                    ),
                  )}
                </p>
              </div>
            )}
            <a href={work.url} target="_blank" rel="noopener noreferrer" className="modal-external">
              {work.video
                ? t(L('Открыть оригинал', 'Open original'))
                : t(L('Открыть профиль TikTok', 'Open TikTok profile'))}
              <ExternalLink size={16} />
            </a>
          </div>
        </dialog>
      )}
    </>
  );
}
