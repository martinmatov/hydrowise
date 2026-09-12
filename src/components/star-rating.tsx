function Star({ fill }: { fill: number }) {
  const id = `star-clip-${Math.round(fill * 100)}`;
  return (
    <svg width="16" height="16" viewBox="0 0 20 20">
      <defs>
        <clipPath id={id}>
          <rect x="0" y="0" width={20 * fill} height="20" />
        </clipPath>
      </defs>
      <path
        d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z"
        fill="var(--brand-star)"
        opacity={0.25}
      />
      <path
        d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z"
        fill="var(--brand-star)"
        clipPath={`url(#${id})`}
      />
    </svg>
  );
}

export function StarRating({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} fill={Math.max(0, Math.min(1, value - i))} />
      ))}
    </span>
  );
}
