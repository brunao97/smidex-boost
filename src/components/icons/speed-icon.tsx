interface SpeedIconProps {
  className?: string;
  strokeWidth?: number;
}

export function SpeedIcon({ className = "h-12 w-12", strokeWidth = 2.2 }: SpeedIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <style>
        {`
          @keyframes needleSweep {
            0%, 100% { transform: rotate(-45deg); }
            50% { transform: rotate(45deg); }
          }
          .speedometer-needle {
            animation: needleSweep 2s ease-in-out infinite;
            transform-origin: 12px 15px;
          }
        `}
      </style>
      
      <path
        d="M5 15.5A8.5 8.5 0 0 1 12 7a8.5 8.5 0 0 1 7 8.5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      
      <path
        d="M7 13L8.5 14"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M9 10.5L10 11.5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M12 9V10"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M15 10.5L14 11.5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M17 13L15.5 14"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      
      <line
        x1="12"
        y1="15"
        x2="12"
        y2="9"
        stroke="currentColor"
        strokeWidth={strokeWidth * 1.2}
        strokeLinecap="round"
        className="speedometer-needle"
      />
      
      <circle
        cx="12"
        cy="15"
        r="2"
        fill="currentColor"
      />
    </svg>
  );
}