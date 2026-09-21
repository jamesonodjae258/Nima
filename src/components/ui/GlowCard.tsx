'use client';

import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
  className?: string;
  innerClassName?: string;
}

export function GlowCard({
  children,
  spotlightColor = 'rgba(255, 107, 53, 0.14)',
  className,
  innerClassName,
  ...props
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'group relative p-1 rounded-2xl transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.99] overflow-hidden',
        'bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/[0.07] shadow-[0_8px_30px_rgba(0,0,0,0.6)]',
        className
      )}
      {...props}
    >
      {/* Interactive Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-0 group-hover:opacity-100 rounded-2xl"
        style={{
          background: isHovered
            ? `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 70%)`
            : undefined,
        }}
        aria-hidden="true"
      />

      {/* Inner Core Surface */}
      <div
        className={cn(
          'relative rounded-[calc(1rem-2px)] bg-[#111318]/90 backdrop-blur-xl border border-white/[0.04] p-5 h-full flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] group-hover:border-white/[0.1] transition-colors duration-300',
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
