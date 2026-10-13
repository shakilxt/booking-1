// Brand marks were removed from lucide 1.x, so these are simple inline glyphs.
type IconProps = { className?: string };

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4a21 21 0 0 0-2.4-.1c-2.4 0-4 1.4-4 4.1v2.1H7.7v3h2.6V21h3.2Z" />
    </svg>
  );
}

export function PinterestIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2.5a9.5 9.5 0 0 0-3.46 18.35c-.08-.75-.16-1.9.03-2.72l1.13-4.8s-.29-.58-.29-1.43c0-1.34.78-2.34 1.75-2.34.82 0 1.22.62 1.22 1.36 0 .83-.53 2.07-.8 3.22-.23.96.48 1.75 1.43 1.75 1.72 0 3.04-1.81 3.04-4.43 0-2.32-1.66-3.94-4.04-3.94-2.75 0-4.37 2.06-4.37 4.2 0 .83.32 1.72.72 2.2.08.1.09.18.07.28l-.27 1.1c-.04.18-.14.22-.33.13-1.2-.56-1.96-2.32-1.96-3.74 0-3.04 2.21-5.84 6.38-5.84 3.35 0 5.95 2.39 5.95 5.58 0 3.33-2.1 6.01-5.01 6.01-.98 0-1.9-.5-2.22-1.1l-.6 2.29c-.22.84-.81 1.9-1.2 2.54A9.5 9.5 0 1 0 12 2.5Z" />
    </svg>
  );
}
