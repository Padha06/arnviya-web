import * as React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export function Plus(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function Minus(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12.5 9 17.5 20 6.5" />
    </svg>
  );
}

export function Printer(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17V4h10v13M7 14H4v6h16v-6h-3M9 21h6" />
    </svg>
  );
}

export function WhatsApp(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.16c-.25.7-1.44 1.33-1.98 1.38-.54.05-1.05.24-3.55-.74-3.02-1.19-4.9-4.32-5.05-4.52-.15-.2-1.2-1.6-1.2-3.05s.76-2.16 1.03-2.46c.27-.3.59-.37.79-.37h.57c.18 0 .43-.07.67.51.25.6.84 2.06.91 2.21.07.15.12.32.02.52-.1.2-.15.32-.3.5l-.45.52c-.15.15-.3.31-.13.61.17.3.77 1.27 1.65 2.06 1.14 1.01 2.09 1.33 2.39 1.48.3.15.47.12.65-.07.17-.2.74-.86.94-1.16.2-.3.4-.25.67-.15.27.1 1.72.81 2.01.96.3.15.5.22.57.35.07.12.07.72-.18 1.42Z" />
    </svg>
  );
}

export function Building(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 21h18M5 21V6l7-3 7 3v15M9 10h.01M15 10h.01M9 14h.01M15 14h.01M10 21v-3h4v3" />
    </svg>
  );
}

export function Flask(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M10.5 3h3M12 3v4M8 7h8a2 2 0 0 1 2 2v9a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V9a2 2 0 0 1 2-2zM6 12h12" />
    </svg>
  );
}

export function Home(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 21V9l8-6 8 6v12M4 21h16M9 21v-6h6v6M9 12h.01M15 12h.01" />
    </svg>
  );
}

export function Cap(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 2 8.5 12 14l10-5.5L12 3ZM6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
    </svg>
  );
}

export function Spark(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4L12 3Z" />
    </svg>
  );
}

export function Leaf(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21V11M12 11c0-3.5 2.3-6 6-7-.8 3.8-2.4 6-6 7ZM12 11c0-3.5-2.3-6-6-7 .8 3.8 2.4 6 6 7ZM12 17c0-2.8 2-4.5 4.8-5.2-1 2.8-2.3 4.3-4.8 5.2ZM12 17c0-2.8-2-4.5-4.8-5.2 1 2.8 2.3 4.3 4.8 5.2Z" />
    </svg>
  );
}

export function Clock(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function Shield(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 5 6v6c0 4.2 3 7.6 7 9 4-1.4 7-4.8 7-9V6l-7-3Z" />
      <path d="M9 12.5l2 2 4-4.5" />
    </svg>
  );
}
