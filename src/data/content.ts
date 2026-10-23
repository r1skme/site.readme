import type {Localized} from '@/lib/i18n';
import {L} from '@/lib/i18n';
export type Project={slug:string;number:string;name:string;kind:'product'|'development'|'game'|'archive';status:'building'|'paused';year:string;since:Localized;stack:string[];accent:string;tagline:Localized;summary:Localized;challenge:Localized;approach:Localized;outcome:Localized;featureTitle:Localized;features:Localized[];nextSteps:Localized[];link?:string;linkText?:Localized};
export const mediaImages=['media/tiktok-26k.webp','media/tiktok-20k.webp','media/glow-95k.webp','media/glow-16k.webp','https://i.ytimg.com/vi/iZ-JT6mzTAA/hqdefault.jpg','https://i.ytimg.com/vi/NmGArDw-Hc4/hqdefault.jpg'];
export const mediaWorks=[
{id:'yt-one',title:L('Игровой монтаж · 01','Gaming edit · 01'),platform:'YouTube',img:'https://i.ytimg.com/vi/iZ-JT6mzTAA/hqdefault.jpg',url:'https://youtu.be/iZ-JT6mzTAA'},
{id:'yt-two',title:L('Игровой монтаж · 02','Gaming edit · 02'),platform:'YouTube',img:'https://i.ytimg.com/vi/NmGArDw-Hc4/hqdefault.jpg',url:'https://youtu.be/NmGArDw-Hc4'},
{id:'tt-one',title:L('Игровой монтаж · TikTok 01','Gaming edit · TikTok 01'),platform:'TikTok',url:'https://vm.tiktok.com/ZN8AC4mbQ/'},
{id:'tt-two',title:L('Игровой монтаж · TikTok 02','Gaming edit · TikTok 02'),platform:'TikTok',url:'https://vm.tiktok.com/ZN8ACCbM2/'}
];
export const skills={confident:[L('Нарезка, сборка, таймлайн','Editing, sequencing, timeline'),L('Keyframes и анимация','Keyframes and animation'),L('Speed ramp','Speed ramps'),L('Цветокоррекция','Colour correction'),L('Переходы и VFX','Transitions and VFX')],basic:[L('Fusion, композиция','Fusion and compositing'),L('Маскирование и трекинг','Masking and tracking'),L('Fairlight, сведение звука','Fairlight audio mixing'),L('Субтитры','Subtitles'),L('HLAE, запись пролётов','HLAE camera fly-throughs')]};
