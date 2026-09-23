type BrandMarkProps = {
  className?: string;
  title?: string;
};

export function BrandMark({ className, title }: BrandMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <path className="brand-mark-ink" d="M3 5h13v4H8v3h7v4H8v3h8v4H3V5Z" />
      <path
        className="brand-mark-accent"
        d="M24 5c-6 0-10 4-10 9s4 9 10 9h5v-4h-5c-3 0-5-2-5-5s2-5 5-5h5V5h-5Z"
      />
    </svg>
  );
}

export function BrandWordmark({ className, title = "EdisonChai" }: BrandMarkProps) {
  return (
    <svg className={className} viewBox="0 0 178 34" role="img" aria-label={title} focusable="false">
      <text className="brand-wordmark-ink" x="0" y="25">
        Edison
      </text>
      <text className="brand-wordmark-accent" x="85" y="25">
        Chai
      </text>
    </svg>
  );
}
