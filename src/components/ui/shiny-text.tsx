'use client';

import { cn } from '@/lib/utils';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export function ShinyText({ text, disabled = false, speed = 5, className }: ShinyTextProps) {
  return (
    <span
      className={cn(
        'inline-block relative bg-transparent',
        className
      )}
      style={{
        color: '#FF3333',
        backgroundColor: 'transparent',
      }}
    >
      {text}
      {!disabled && (
        <span
          className="absolute inset-0 bg-clip-text text-transparent animate-shine bg-[length:250%_100%]"
          style={{
            backgroundImage: 'linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.6) 50%, transparent 60%)',
            animationDuration: `${speed}s`,
            WebkitBackgroundClip: 'text',
            backgroundColor: 'transparent',
          }}
          aria-hidden="true"
        >
          {text}
        </span>
      )}
    </span>
  );
}