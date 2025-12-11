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
        'inline-block bg-clip-text',
        !disabled && 'animate-shine bg-[length:250%_100%] bg-[linear-gradient(120deg,transparent_40%,rgba(255,255,255,0.8)_50%,transparent_60%)]',
        className
      )}
      style={{
        animationDuration: `${speed}s`,
      }}
    >
      {text}
    </span>
  );
}
