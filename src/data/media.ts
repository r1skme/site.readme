import { L, type Localized } from '../lib/l10n';

export type Work = {
  id: string;
  title: Localized;
  platform: 'TikTok' | 'YouTube';
  account: string;
  views?: string;
  img: string;
  url: string;
  video?: string;
};

const yt = (id: string) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

// The four TikTok numbers add up to 158.8K: the "150K+" figure on the site.
export const works: Work[] = [
  {
    id: 'glow-95k',
    title: L('GLOW RUST · юмор и тренд', 'GLOW RUST · humour and trends'),
    platform: 'TikTok',
    account: '@glow_rust',
    views: '95,1K',
    img: 'media/glow-95k.webp',
    url: 'https://www.tiktok.com/@glow_rust',
  },
  {
    id: 'tiktok-26k',
    title: L('CS2 / HvH · короткий монтаж', 'CS2 / HvH · short edit'),
    platform: 'TikTok',
    account: '@r1skme.hvh',
    views: '26,8K',
    img: 'media/tiktok-26k.webp',
    url: 'https://www.tiktok.com/@r1skme.hvh',
  },
  {
    id: 'tiktok-20k',
    title: L('HvH · игровая нарезка', 'HvH · gameplay montage'),
    platform: 'TikTok',
    account: '@r1skme.hvh',
    views: '20,8K',
    img: 'media/tiktok-20k.webp',
    url: 'https://www.tiktok.com/@r1skme.hvh',
  },
  {
    id: 'glow-16k',
    title: L('GLOW RUST · игровой момент', 'GLOW RUST · game moment'),
    platform: 'TikTok',
    account: '@glow_rust',
    views: '16,1K',
    img: 'media/glow-16k.webp',
    url: 'https://www.tiktok.com/@glow_rust',
  },
  {
    id: 'youtube-pitch',
    title: L('This 120° pitch is illegal', 'This 120° pitch is illegal'),
    platform: 'YouTube',
    account: '@r1sk-gg',
    img: yt('iZ-JT6mzTAA'),
    url: 'https://youtu.be/iZ-JT6mzTAA',
    video: 'iZ-JT6mzTAA',
  },
  {
    id: 'youtube-cfg',
    title: L(
      'Легко выиграл противников с самым лучшим CFG?',
      'Easily beat opponents with the best CFG?',
    ),
    platform: 'YouTube',
    account: '@r1sk-gg',
    img: yt('NmGArDw-Hc4'),
    url: 'https://youtu.be/NmGArDw-Hc4',
    video: 'NmGArDw-Hc4',
  },
];

export const editingSkills = {
  confident: [
    L('Нарезка, сборка, таймлайн', 'Cutting, sequencing, timeline'),
    L('Keyframes и анимация', 'Keyframes and animation'),
    L('Speed ramp', 'Speed ramps'),
    L('Цветокоррекция', 'Colour correction'),
    L('Переходы и VFX', 'Transitions and VFX'),
  ],
  basic: [
    L('Fusion, композитинг', 'Fusion and compositing'),
    L('Маски и трекинг', 'Masking and tracking'),
    L('Fairlight, сведение звука', 'Fairlight audio mixing'),
    L('Субтитры', 'Subtitles'),
    L('HLAE, игровые пролёты', 'HLAE camera fly-throughs'),
  ],
};

export const channels = [
  { label: 'YouTube · @r1sk-gg', url: 'https://youtube.com/@r1sk-gg' },
  { label: 'TikTok · @r1skme.hvh', url: 'https://www.tiktok.com/@r1skme.hvh' },
  { label: 'TikTok · @glow_rust', url: 'https://www.tiktok.com/@glow_rust' },
];
