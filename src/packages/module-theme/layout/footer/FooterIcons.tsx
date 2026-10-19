import type { FooterData } from "@/types/storefront";

type IconProps = { className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function PinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

export function MailSolidIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M4 4h16a2 2 0 0 1 2 2v.4l-10 6.3L2 6.4V6a2 2 0 0 1 2-2zm-2 4.8 9.5 6a1 1 0 0 0 1 0l9.5-6V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z" />
    </svg>
  );
}

export function ChevronRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke} strokeWidth={2.2}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke} strokeWidth={2.2}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUpIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke} strokeWidth={2.2}>
      <path d="m6 15 6-6 6 6" />
    </svg>
  );
}

const HIGHLIGHT_PATHS: Record<FooterData["highlights"][number]["icon"], React.ReactNode> = {
  authentic: (
    <>
      <circle cx="12" cy="8" r="6" />
      <path d="m9 8 2 2 4-4" />
      <path d="M15.5 12.9 17 22l-5-3-5 3 1.5-9.1" />
    </>
  ),
  secure: (
    <g transform="translate(-1.5 0)">
      <path d="M12 22.5s9.5-4 9.5-10.5V5L12 1.5 2.5 5v7c0 6.5 9.5 10.5 9.5 10.5z" />
      <path d="m7.5 12 3 3 6-6" />
    </g>
  ),
  delivery: (
    <>
      <path d="M1 4h13v12H1zM14 8h4.5l3.5 4v4h-8z" />
      <circle cx="5.5" cy="18.5" r="2" />
      <circle cx="17.5" cy="18.5" r="2" />
    </>
  ),
  support: (
    <>
      <path d="M3 14v-2a9 9 0 0 1 18 0v2" />
      <path d="M21 15a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2zM3 15a2 2 0 0 0 2 2h1v-6H5a2 2 0 0 0-2 2z" />
      <path d="M18 17v1a3 3 0 0 1-3 3h-3" />
    </>
  ),
};

export function HighlightIcon({ icon, className }: IconProps & { icon: keyof typeof HIGHLIGHT_PATHS }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke} strokeWidth={1.6}>
      {HIGHLIGHT_PATHS[icon]}
    </svg>
  );
}

const SOCIAL_ICONS: Record<
  FooterData["social"][number]["network"],
  { viewBox: string; node: React.ReactNode }
> = {
  facebook: {
    viewBox: "171 64 18 18",
    node: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M189 64.99V80.94C189 81.487 188.555 81.93 188.007 81.93H183.42V74.987H185.759L186.11 72.281H183.42V70.553C183.42 69.769 183.638 69.236 184.766 69.236L186.205 69.235V66.815C185.508 66.7413 184.808 66.7056 184.108 66.708C182.034 66.708 180.614 67.969 180.614 70.285V72.281H178.269V74.987H180.614V81.93H171.993C171.73 81.9303 171.478 81.8261 171.292 81.6405C171.105 81.4549 171.001 81.2029 171 80.94V64.99C171 64.443 171.445 64 171.993 64H188.007C188.555 64 189 64.443 189 64.99Z"
      />
    ),
  },
  twitter: {
    viewBox: "147 64 18 18",
    node: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M153.769 74.2263L147.391 81H149.739L154.798 75.6277L158.739 81H165L158.316 71.8905L164.804 65H162.457L157.288 70.4891L153.261 65H147L153.769 74.2263ZM150.422 66.7143H152.355L161.578 79.2857H159.645L150.422 66.7143Z"
      />
    ),
  },
  linkedin: {
    viewBox: "60 328 18 18",
    node: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M78 344C78 345.105 77.1046 346 76 346H62C60.8954 346 60 345.105 60 344V330C60 328.895 60.8954 328 62 328H76C77.1046 328 78 328.895 78 330V344ZM64.5004 330C65.3279 330 66 330.672 66 331.5C66 332.328 65.3279 333 64.5004 333C63.6713 333 63 332.328 63 331.5C63 330.672 63.6713 330 64.5004 330ZM63 334H66V344H63V334ZM69.7687 335.576V334.243H67V344H69.8841V339.173C69.8841 337.9 70.1141 336.668 71.6161 336.668C73.096 336.668 73.1159 338.123 73.1159 339.255V344H76V338.648C76 336.021 75.4604 334 72.5378 334C71.1338 334 70.1922 334.809 69.8071 335.576H69.7687Z"
      />
    ),
  },
  instagram: {
    viewBox: "102 328 18 18",
    node: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M107.289 328.054C108.249 328.01 108.556 328 111 328C113.444 328 113.751 328.01 114.711 328.054C115.669 328.098 116.323 328.25 116.895 328.473C117.487 328.703 117.989 329.01 118.489 329.511C118.99 330.011 119.297 330.513 119.527 331.105C119.75 331.677 119.902 332.331 119.946 333.289C119.99 334.249 120 334.556 120 337C120 339.444 119.99 339.751 119.946 340.711C119.902 341.669 119.75 342.323 119.527 342.895C119.297 343.487 118.99 343.989 118.489 344.489C117.989 344.99 117.487 345.298 116.895 345.528C116.323 345.75 115.669 345.902 114.711 345.946C113.751 345.99 113.444 346 111 346C108.556 346 108.249 345.99 107.289 345.946C106.331 345.902 105.677 345.75 105.105 345.528C104.513 345.298 104.011 344.99 103.511 344.489C103.01 343.989 102.702 343.487 102.472 342.895C102.25 342.323 102.098 341.669 102.054 340.711C102.01 339.751 102 339.444 102 337C102 334.556 102.01 334.249 102.054 333.289C102.098 332.331 102.25 331.677 102.472 331.105C102.702 330.513 103.01 330.011 103.511 329.511C104.011 329.01 104.513 328.703 105.105 328.473C105.677 328.25 106.331 328.098 107.289 328.054ZM115.804 333.276C116.401 333.276 116.884 332.792 116.884 332.196C116.884 331.599 116.401 331.116 115.804 331.116C115.208 331.116 114.724 331.599 114.724 332.196C114.724 332.792 115.208 333.276 115.804 333.276ZM111 332.378C108.448 332.378 106.378 334.448 106.378 337C106.378 339.552 108.448 341.622 111 341.622C113.552 341.622 115.622 339.552 115.622 337C115.622 334.448 113.552 332.378 111 332.378ZM108 337C108 338.657 109.343 340 111 340C112.657 340 114 338.657 114 337C114 335.343 112.657 334 111 334C109.343 334 108 335.343 108 337Z"
      />
    ),
  },
  youtube: {
    viewBox: "80 327.5 20 18",
    node: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M97.8253 330.428C98.682 330.659 99.3574 331.334 99.5881 332.191C100.016 333.756 99.9999 337.018 99.9999 337.018C99.9999 337.018 99.9999 340.264 99.5881 341.829C99.3574 342.685 98.682 343.361 97.8253 343.591C96.2602 344.003 93.9122 344.325 90 344.321C86.0878 344.316 83.7562 344.003 82.1746 343.575C81.318 343.344 80.6425 342.669 80.4119 341.812C80 340.264 80 337.002 80 337.002C80 337.002 80 333.756 80.4119 332.191C80.6425 331.334 81.3344 330.643 82.1746 330.412C83.7397 330 86.3735 329.763 90 329.763C93.6265 329.763 96.2602 330 97.8253 330.428ZM93.2124 337.002L88.0065 340V334.003L93.2124 337.002Z"
      />
    ),
  },
  tiktok: {
    viewBox: "0 0 24 24",
    node: (
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.34 6.34 0 0 0 1.86-4.47V8.65a8.28 8.28 0 0 0 4.91 1.6V6.8a4.83 4.83 0 0 1-1-.11z" />
    ),
  },
  pinterest: {
    viewBox: "0 0 24 24",
    node: (
      <path d="M12 0a12 12 0 0 0-4.37 23.18c-.06-.99-.11-2.52.02-3.6.13-1.07 1.8-7.64 1.8-7.64s-.46-.92-.46-2.28c0-2.14 1.24-3.74 2.78-3.74 1.31 0 1.94.99 1.94 2.17 0 1.32-.84 3.3-1.28 5.13-.36 1.54.77 2.79 2.29 2.79 2.74 0 4.86-2.89 4.86-7.07 0-3.7-2.66-6.28-6.45-6.28-4.4 0-6.98 3.3-6.98 6.71 0 1.33.51 2.75 1.15 3.53a.46.46 0 0 1 .11.45c-.12.5-.38 1.55-.43 1.76-.07.28-.23.34-.52.2-1.93-.9-3.13-3.72-3.13-5.99 0-4.87 3.54-9.35 10.22-9.35 5.37 0 9.53 3.82 9.53 8.93 0 5.33-3.36 9.63-8.03 9.63-1.57 0-3.04-.82-3.55-1.78l-.96 3.69c-.35 1.35-1.29 3.04-1.92 4.07A11.99 11.99 0 0 0 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z" />
    ),
  },
};

export function SocialIcon({ network, className }: IconProps & { network: keyof typeof SOCIAL_ICONS }) {
  const icon = SOCIAL_ICONS[network];
  return (
    <svg viewBox={icon.viewBox} className={className} aria-hidden="true" fill="currentColor">
      {icon.node}
    </svg>
  );
}
