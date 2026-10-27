import type { CSSProperties, JSX } from 'react';

export interface ElectricLogoProps {
  /** Any image URL; SVGs and transparent PNGs are traced by their alpha. */
  src?: string;
  /** Colour of the hot core of every strand. */
  color?: string;
  /** Colour of the glow, the bloom and the interior fill. */
  glowColor?: string;
  scale?: number;
  intensity?: number;
  glow?: number;
  thickness?: number;
  strands?: number;
  bend?: number;
  crackle?: number;
  arcs?: number;
  flicker?: number;
  fill?: number;
  speed?: number;
  interactive?: boolean;
  cursorIntensity?: number;
  cursorRadius?: number;
  theme?: 'dark' | 'light';
  onRender?: (canvas: HTMLCanvasElement) => void;
  className?: string;
  style?: CSSProperties;
}

/** React Bits ElectricLogo (WebGL2 via ogl). Renders nothing visible without WebGL2. */
declare const ElectricLogo: (props: ElectricLogoProps) => JSX.Element;
export default ElectricLogo;
