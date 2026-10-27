import type { CSSProperties } from 'react';
import { siApple, siLinux, siTelegram } from 'simple-icons';
import { useLanguage, L } from '@/lib/i18n';
import { Figure } from '@/components/CountUp';
import { findProject } from '@/data/projects';
import { works } from '@/data/media';

// Small live illustrations for the "How I can help" bento. The chat and the settings window
// show what the tools do; they are drawings of an interface, not screenshots.

const Brand = ({ path }: { path: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d={path} fill="currentColor" />
  </svg>
);

/** A Telegram-style exchange with the bot: set a filter, an interval, get a notification. */
export function ChatVisual() {
  const { t } = useLanguage();
  const messages = [
    { me: true, text: '/filter add' },
    { me: true, text: '/interval 5m' },
    {
      me: false,
      text: t(L('Проверяю рынок каждые 5 минут', 'Checking the market every 5 minutes')),
    },
    {
      me: false,
      text: t(L('🔔 Найден предмет по фильтру', '🔔 An item matches your filter')),
      alert: true,
    },
  ];
  return (
    <div className="bv-chat" aria-hidden="true">
      <div className="bv-chat-head">
        <span className="bv-chat-avatar">
          <Brand path={siTelegram.path} />
        </span>
        Prime Market
        <small>{t(L('бот', 'bot'))}</small>
      </div>
      {messages.map((m, i) => (
        <p
          key={i}
          className={'bv-msg' + (m.me ? ' is-me' : '') + (m.alert ? ' is-alert' : '')}
          style={{ '--i': i } as CSSProperties}
        >
          {m.text}
        </p>
      ))}
    </div>
  );
}

/** The top of the real ripgrep comparison, as bars. */
export function BenchVisual() {
  const { t } = useLanguage();
  const rows = findProject('researchify')!.benchmarks![0].rows.slice(0, 3);
  const max = rows[0].value;
  return (
    <div className="bv-bench" aria-hidden="true">
      <span className="bv-caption">
        {t(L('быстрее ripgrep · Windows', 'faster than ripgrep · Windows'))}
      </span>
      {rows.map((r, i) => (
        <div
          key={r.display}
          className="bv-bar"
          style={{ '--w': r.value / max, '--i': i } as CSSProperties}
        >
          <span>{t(r.label)}</span>
          <i />
          <strong>
            <Figure value={r.display} />
          </strong>
        </div>
      ))}
    </div>
  );
}

/** The three systems the releases ship for. */
export function OsVisual() {
  const { t } = useLanguage();
  return (
    <div className="bv-os" aria-hidden="true">
      <div className="bv-os-tiles">
        <span>
          {/* Windows: a plain four-pane mark (no official logo in Simple Icons). */}
          <svg viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M2 4.5 10.5 3.3v8.2H2V4.5Zm9.5-1.3L22 1.8v9.7H11.5V3.2ZM2 12.5h8.5v8.2L2 19.5v-7Zm9.5 0H22v9.7l-10.5-1.4v-8.3Z"
            />
          </svg>
          Windows
        </span>
        <span>
          <Brand path={siApple.path} />
          macOS
        </span>
        <span>
          <Brand path={siLinux.path} />
          Linux
        </span>
      </div>
      <span className="bv-caption">
        {t(L('x64 и arm64 · установщики · CI', 'x64 and arm64 · installers · CI'))}
      </span>
    </div>
  );
}

/** A Dear ImGui-style settings window; hovering the tile moves the slider. */
export function ImGuiVisual() {
  const { t } = useLanguage();
  return (
    <div className="bv-imgui" aria-hidden="true">
      <div className="bv-imgui-title">Predict</div>
      <div className="bv-imgui-tabs">
        <span className="is-on">{t(L('Главное', 'Main'))}</span>
        <span>{t(L('Вид', 'View'))}</span>
        <span>{t(L('Конфиг', 'Config'))}</span>
      </div>
      <label>
        <i className="is-on" /> {t(L('Включить', 'Enable'))}
      </label>
      <label>
        <i /> {t(L('Сглаживание', 'Smoothing'))}
      </label>
      <div className="bv-imgui-slider">
        <span />
      </div>
    </div>
  );
}

/** A strip of real thumbnails drifting by. */
export function ReelVisual() {
  const strip = [...works, ...works];
  return (
    <div className="bv-reel" aria-hidden="true">
      <div className="bv-reel-track">
        {strip.map((w, i) => (
          <span key={i} className={'bv-thumb' + (w.platform === 'TikTok' ? ' is-tall' : '')}>
            <img
              src={w.img.startsWith('http') ? w.img : `/${w.img}`}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </span>
        ))}
      </div>
      <strong className="bv-reel-badge">
        <Figure value="150K+" />
      </strong>
    </div>
  );
}
