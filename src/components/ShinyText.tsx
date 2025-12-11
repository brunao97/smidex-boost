import React from 'react';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({ text, disabled = false, speed = 5, className = '' }) => {
  const animationDuration = `${speed}s`;

  return (
    <>
      <style jsx global>{`
        @keyframes shineTextEffect {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }
      `}</style>
      <span
        className={`relative inline-block ${className}`}
        style={{
          WebkitBackgroundClip: 'text',
        }}
      >
        {text}
        {!disabled && (
          <span
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(120deg, transparent 0%, transparent 40%, rgba(255, 255, 255, 0.9) 50%, transparent 60%, transparent 100%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              animation: `shineTextEffect ${animationDuration} linear infinite`,
            }}
          >
            {text}
          </span>
        )}
      </span>
    </>
  );
};

export default ShinyText;