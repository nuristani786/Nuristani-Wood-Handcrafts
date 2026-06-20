export function NuristaniDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full flex items-center justify-center py-6 ${className}`} aria-hidden="true">
      <svg
        width="100%"
        height="24"
        viewBox="0 0 400 24"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left line */}
        <line x1="0" y1="12" x2="100" y2="12" stroke="rgba(201,154,75,0.3)" strokeWidth="1" />
        {/* Zigzag triangular pattern — Nuristani geometric motif */}
        <polyline
          points="105,2 115,22 125,2 135,22 145,2 155,22 165,2 175,22 185,2 195,22 200,12 205,2 215,22 225,2 235,22 245,2 255,22 265,2 275,22 285,2 295,22"
          fill="none"
          stroke="rgba(201,154,75,0.5)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Center diamond */}
        <polygon
          points="200,5 207,12 200,19 193,12"
          fill="rgba(201,154,75,0.2)"
          stroke="rgba(201,154,75,0.6)"
          strokeWidth="1"
        />
        {/* Right line */}
        <line x1="300" y1="12" x2="400" y2="12" stroke="rgba(201,154,75,0.3)" strokeWidth="1" />
      </svg>
    </div>
  )
}
