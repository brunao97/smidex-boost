'use client';

import { cn } from '@/lib/utils';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export function ShinyText({ text, disabled = false, speed = 3, className }: ShinyTextProps) {
  const animationStyle = `
    @keyframes shineMove {
      from {
        transform: translateX(-100%);
      }
      to {
        transform: translateX(200%);
      }
    }
  `;

  return (
    <>
      <style>{animationStyle}</style>
      <span
        className={cn(
          'inline-block relative overflow-hidden',
          className
        )}
        style={{
          color: '#FF3333',
        }}
      >
        {text}
        {!disabled && (
          <span
            className="absolute inset-0 overflow-hidden pointer-events-none"
            aria-hidden="true"
          >
            <span
              className="absolute inset-0 w-[50%]"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
                animation: `shineMove ${speed}s ease-in-out infinite`,
              }}
            />
          </span>
        )}
      </span>
    </>
  );
}