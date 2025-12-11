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
    <>
      <style jsx>{`
        @keyframes shineEffect {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }
        .shine-overlay {
          animation: shineEffect ${speed}s linear infinite;
        }
      `}</style>
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
            className="shine-overlay absolute inset-0 bg-clip-text text-transparent bg-[length:200%_100%]"
            style={{
              backgroundImage: 'linear-gradient(90deg, transparent 0%, transparent 40%, rgba(255,255,255,0.8) 50%, transparent 60%, transparent 100%)',
              WebkitBackgroundClip: 'text',
              backgroundColor: 'transparent',
            }}
            aria-hidden="true"
          >
            {text}
          </span>
        )}
      </span>
    </>
  );
}