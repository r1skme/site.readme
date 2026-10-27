// Filled 24×24 icons for the dock, drawn for this site (a solid style in the spirit of
// neverlosesoftware.com's navigation). They inherit the text colour.
type IconProps = { size?: number };

const Svg = ({ size = 18, d }: IconProps & { d: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d={d} />
  </svg>
);

export const HomeIcon = (p: IconProps) => (
  <Svg
    {...p}
    d="M11.3 2.6a1 1 0 0 1 1.4 0l8.5 8a1 1 0 0 1 .3.7V20a1.5 1.5 0 0 1-1.5 1.5H15v-6a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v6H4.5A1.5 1.5 0 0 1 3 20v-8.7a1 1 0 0 1 .3-.7l8-8Z"
  />
);

export const ProjectsIcon = (p: IconProps) => (
  <Svg
    {...p}
    d="M4 3h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm10 0h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM4 13h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1Zm10 0h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1Z"
  />
);

export const MediaIcon = (p: IconProps) => (
  <Svg
    {...p}
    d="M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm5 4.6v6.8a.6.6 0 0 0 .9.5l5.4-3.4a.6.6 0 0 0 0-1l-5.4-3.4a.6.6 0 0 0-.9.5Z"
  />
);

export const SkillsIcon = (p: IconProps) => (
  <Svg
    {...p}
    d="M12.4 2.2a1 1 0 0 0-.8 0l-9 4.2a.7.7 0 0 0 0 1.2l9 4.3a1 1 0 0 0 .8 0l9-4.3a.7.7 0 0 0 0-1.2l-9-4.2ZM3.9 11l-1.3.6a.7.7 0 0 0 0 1.2l9 4.3a1 1 0 0 0 .8 0l9-4.3a.7.7 0 0 0 0-1.2l-1.3-.6-7.3 3.5a2.3 2.3 0 0 1-2 0L3.9 11Zm0 5.2-1.3.6a.7.7 0 0 0 0 1.2l9 4.3a1 1 0 0 0 .8 0l9-4.3a.7.7 0 0 0 0-1.2l-1.3-.6-7.3 3.5a2.3 2.3 0 0 1-2 0l-7.9-3.5Z"
  />
);

export const AboutIcon = (p: IconProps) => (
  <Svg
    {...p}
    d="M12 12.5a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm-8.5 8.6C4.4 17 7.8 14.5 12 14.5s7.6 2.5 8.5 6.6a.8.8 0 0 1-.8.9H4.3a.8.8 0 0 1-.8-.9Z"
  />
);

export const ContactIcon = (p: IconProps) => (
  <Svg
    {...p}
    d="M4 4h16a2 2 0 0 1 2 2v.4l-10 6.1L2 6.4V6a2 2 0 0 1 2-2Zm-2 4.7 9.5 5.8a1 1 0 0 0 1 0L22 8.7V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.7Z"
  />
);
