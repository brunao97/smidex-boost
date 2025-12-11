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
    <span
      className={`relative inline-block ${className}`}
      style={{
        WebkitBackgroundClip: 'text',
      }}
    >
      {text}
      {!disabled && (
        <span
          className="absolute inset-0 bg-clip-text text-transparent pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(120deg, transparent 0%, transparent 40%, rgba(255, 255, 255, 0.8) 50%, transparent 60%, transparent 100%)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            animation: `shine-text ${animationDuration} linear infinite`,
          }}
        >
          {text}
        </span>
      )}
    </span>
  );
};

export default ShinyText;