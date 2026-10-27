import { useState, useRef, useEffect } from 'react';
import {
  ArrowUpRight,
  Copy,
  Check,
  Send,
  MessageCircle,
  Github,
  Youtube,
  Music2,
} from 'lucide-react';
import { useLanguage, L } from '@/lib/i18n';
import { PageHeading, SpotlightCard } from '@/components/Primitives';

const DISCORD = 'r1sk.gg';

export default function Contact() {
  const { t } = useLanguage();
  const [state, setState] = useState<'idle' | 'copied' | 'error'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const copy = async () => {
    clearTimeout(timer.current);
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(DISCORD);
      setState('copied');
    } catch {
      setState('error');
    }
    timer.current = setTimeout(() => setState('idle'), 3000);
  };
  return (
    <>
      <PageHeading
        title={
          <>
            {t(L('Есть задача?', 'Got a task?'))}
            <br />
            <span className="muted">{t(L('Давай обсудим.', 'Let’s talk.'))}</span>
          </>
        }
        desc={t(
          L(
            'Расскажи, что нужно сделать, — отвечу и скажу, чем могу помочь. Быстрее всего в Telegram.',
            'Tell me what needs to be done — I’ll reply and say how I can help. Telegram is the fastest.',
          ),
        )}
      />
      <section className="shell contacts">
        <SpotlightCard className="contact contact-main">
          <a
            href="https://t.me/R1SKME"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <span className="contact-label">
              <Send size={18} aria-hidden="true" /> Telegram
            </span>
            <strong>@R1SKME</strong>
            <span className="contact-action">
              {t(L('Основной способ связи', 'Preferred way to reach me'))}
              <ArrowUpRight size={18} aria-hidden="true" />
            </span>
          </a>
        </SpotlightCard>
        <SpotlightCard className="contact">
          <button type="button" onClick={copy} className="contact-link">
            <span className="contact-label">
              <MessageCircle size={18} aria-hidden="true" /> Discord
            </span>
            <strong>{DISCORD}</strong>
            <span className="contact-action" role="status" aria-live="polite">
              {state === 'copied' ? (
                <>
                  <Check size={16} aria-hidden="true" />
                  {t(L('Скопировано', 'Copied'))}
                </>
              ) : (
                <>
                  <Copy size={16} aria-hidden="true" />
                  {state === 'error'
                    ? t(L('Не удалось скопировать', 'Could not copy'))
                    : t(L('Скопировать ник', 'Copy username'))}
                </>
              )}
            </span>
          </button>
        </SpotlightCard>
        <SpotlightCard className="contact">
          <a
            href="https://github.com/r1skme"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <span className="contact-label">
              <Github size={18} aria-hidden="true" /> GitHub
            </span>
            <strong>r1skme</strong>
            <span className="contact-action">
              {t(L('Код проектов', 'Project source'))}
              <ArrowUpRight size={16} aria-hidden="true" />
            </span>
          </a>
        </SpotlightCard>
      </section>
      <section className="shell section-tight">
        <h2 className="eyebrow">{t(L('Также в сети', 'Also online'))}</h2>
        <div className="pill-links">
          <a href="https://youtube.com/@r1sk-gg" target="_blank" rel="noopener noreferrer">
            <Youtube size={18} aria-hidden="true" />
            YouTube · @r1sk-gg
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <a href="https://www.tiktok.com/@r1skme.hvh" target="_blank" rel="noopener noreferrer">
            <Music2 size={18} aria-hidden="true" />
            TikTok · @r1skme.hvh
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>
    </>
  );
}
