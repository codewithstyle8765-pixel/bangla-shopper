import { useId, type SVGProps } from "react";

/**
 * Interface icons redrawn from the PSD artwork. Each viewBox is the original icon's pixel box,
 * so at the PSD size 1 unit = 1px. Colour comes from `currentColor` unless the icon has its own.
 */
type IconProps = SVGProps<SVGSVGElement>;

const outline = (width: number) =>
  ({ fill: "none", stroke: "currentColor", strokeWidth: width, strokeLinecap: "round", strokeLinejoin: "round" }) as const;

export function SearchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 22 23" aria-hidden="true" {...outline(1.9)} {...props}>
      <circle cx="9" cy="9.2" r="7.7" />
      <path d="m14.7 15 6.3 6.8" />
    </svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 26 24" aria-hidden="true" {...outline(1.7)} strokeLinejoin="miter" {...props}>
      <path d="M13 4.6C11.6 2.4 9.5 1.1 6.9 1.1 3.4 1.1.7 3.9.7 7.6c0 1.6.3 3 .9 4.2C3 14.6 7.6 19 13 22.8c5.4-3.8 10-8.2 11.4-11 .6-1.2.9-2.6.9-4.2 0-3.7-2.7-6.5-6.2-6.5-2.6 0-4.7 1.3-6.1 3.5Z" />
    </svg>
  );
}

export function CartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...outline(1.6)} strokeLinecap="butt" {...props}>
      <path d="M.2 1h2.6c.6 0 1 .4 1.1 1l3 15.6c.1.4.4.6.8.6H24" />
      <path d="M4.5 5.6h18.9l-2.3 9.4H6.3" />
      <circle cx="10" cy="21.5" r="1.8" strokeWidth="1.4" />
      <circle cx="20.4" cy="21.4" r="1.8" strokeWidth="1.4" />
    </svg>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 24" aria-hidden="true" {...outline(1.6)} {...props}>
      <ellipse cx="9.9" cy="5.8" rx="5.1" ry="5" />
      <path d="M4.4 12.4C2.6 12.4 1.2 13.8.9 16.2c-.1.3-.1.7-.1 1v3.4c0 1.3 1.1 2.4 2.4 2.4h13.6c1.3 0 2.4-1.1 2.4-2.4v-3.4c0-.3 0-.7-.1-1-.3-2.4-1.7-3.8-3.5-3.8-2.4 0-3.2 1.6-5.6 1.6s-3.2-1.6-5.6-1.6Z" />
    </svg>
  );
}

/** Filled envelope with the flap lines cut out (announcement bar). */
export function MailIcon(props: IconProps) {
  const mask = `mail-${useId().replace(/[^\w-]/g, "")}`;
  return (
    <svg viewBox="0 0 18 13" aria-hidden="true" {...props}>
      <mask id={mask}>
        <rect width="18" height="13" fill="#fff" />
        <path d="M.2.4 9 8.2 17.8.4M.2 12.8 6.6 7m11.2 5.8L11.4 7" fill="none" stroke="#000" />
      </mask>
      <rect width="18" height="13" fill="currentColor" mask={`url(#${mask})`} />
    </svg>
  );
}

export function ShareIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M6.5 5H2.5A1.5 1.5 0 0 0 1 6.5v15.3a1.5 1.5 0 0 0 1.5 1.5h19.4a1.5 1.5 0 0 0 1.5-1.5V12.3" fill="none" stroke="currentColor" strokeWidth="1.9" />
      <path d="M16.4-.6 24.4 7.4l-8 8.2v-4.4c-4.4-.2-7.6 1.4-9.1 4.9H5.1c.4-6.6 4.8-11.6 11.3-12.1Z" fill="currentColor" />
    </svg>
  );
}

/** Note with pencil ("Write a review"). */
export function EditNoteIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 23 22" aria-hidden="true" {...outline(1.8)} {...props}>
      <path d="M17.5 7.5v-4A2.5 2.5 0 0 0 15 1H3.5A2.5 2.5 0 0 0 1 3.5v15A2.5 2.5 0 0 0 3.5 21H15a2.5 2.5 0 0 0 2.5-2.5v-1" />
      <path d="M5 5h9M5 8.5h9M5 12h5" />
      <path d="m20.2 8.2 2.4 2.4-8 8-3.3.9.9-3.3Z" strokeWidth="1.6" />
    </svg>
  );
}

/** Green verified badge (intrinsic colour). */
export function VerifiedIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 17 17" aria-hidden="true" {...props}>
      <circle cx="8.5" cy="8.5" r="8" fill="#177428" />
      <path d="m4.6 8.9 2.7 2.6 5.3-5.5" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Camera icon for photo uploads. */
export function CameraIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...outline(1.8)} {...props}>
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3.2" />
    </svg>
  );
}

