type BrandLogoProps = {
  className?: string;
};

export function BrandLogo({ className = "h-11 w-11" }: BrandLogoProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={className} fill="none">
      <defs>
        <linearGradient id="brand-neon-green" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00FF41" />
          <stop offset="100%" stopColor="#008F11" />
        </linearGradient>
        <filter id="brand-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <pattern id="brand-matrix-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
          <path
            d="M 20 0 L 0 0 0 20"
            fill="none"
            stroke="#00FF41"
            strokeWidth="0.5"
            opacity="0.2"
          />
        </pattern>
      </defs>

      <rect width="100" height="100" rx="22" fill="#050505" />
      <rect width="100" height="100" rx="22" fill="url(#brand-matrix-pattern)" />
      <rect x="2" y="2" width="96" height="96" rx="20" fill="none" stroke="#00FF41" strokeWidth="1" opacity="0.3" />

      <g filter="url(#brand-glow)">
        <path
          d="M 28 72 L 28 28 L 72 72 L 72 28"
          stroke="url(#brand-neon-green)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="28" cy="28" r="6" fill="#FFFFFF" />
        <circle cx="72" cy="72" r="6" fill="#FFFFFF" />
        <circle cx="28" cy="72" r="6" fill="#00FF41" />
        <circle cx="72" cy="28" r="6" fill="#00FF41" />
        <path
          d="M 28 72 L 28 85 L 15 85"
          stroke="#00FF41"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="15" cy="85" r="2" fill="#00FF41" />
        <path
          d="M 72 28 L 72 15 L 85 15"
          stroke="#00FF41"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="85" cy="15" r="2" fill="#00FF41" />
      </g>

      <text x="8" y="40" fill="#00FF41" fontSize="8" fontFamily="monospace" opacity="0.4">
        10
      </text>
      <text x="8" y="55" fill="#00FF41" fontSize="8" fontFamily="monospace" opacity="0.6">
        01
      </text>
      <text x="82" y="45" fill="#00FF41" fontSize="8" fontFamily="monospace" opacity="0.5">
        00
      </text>
      <text x="82" y="60" fill="#00FF41" fontSize="8" fontFamily="monospace" opacity="0.7">
        11
      </text>
    </svg>
  );
}
