'use client';

import { cn } from '@/lib/utils';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export function ShinyText({ text, disabled = false, speed = 3, className }: ShinyTextProps) {
  return (
    <span
      className={cn(
        'inline-block relative',
        className
      )}
      style={{
        color: '#FF3333',
      }}
    >
      {text}
      {!disabled && (
        <span
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
          style={{
            WebkitMaskImage: 'linear-gradient(90deg, transparent, white, transparent)',
            maskImage: 'linear-gradient(90deg, transparent, white, transparent)',
            WebkitMaskSize: '50% 100%',
            maskSize: '50% 100%',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            animation: `shimmer ${speed}s linear infinite`,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
          }}
        />
      )}
      <style>{`
        @keyframes shimmer {
          0% { -webkit-mask-position: -100% 0; mask-position: -100% 0; }
          100% { -webkit-mask-position: 200% 0; mask-position: 200% 0; }
        }
      `}</style>
    </span>
  );
}