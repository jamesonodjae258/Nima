'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-in' | 'scale-up' | 'slide-right' | 'slide-left';
  delay?: number; // delay in ms
  duration?: number; // duration in ms
  className?: string;
  threshold?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 800,
  className,
  threshold = 0.15,
  once = true,
  ...props
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [threshold, once]);

  // Initial and active styles based on animation type
  const getTransformStyles = () => {
    switch (animation) {
      case 'fade-up':
        return isVisible
          ? 'opacity-100 translate-y-0 blur-0 scale-100'
          : 'opacity-0 translate-y-12 blur-[8px] scale-[0.97]';
      case 'fade-in':
        return isVisible ? 'opacity-100 blur-0' : 'opacity-0 blur-[6px]';
      case 'scale-up':
        return isVisible
          ? 'opacity-100 scale-100 blur-0'
          : 'opacity-0 scale-[0.92] blur-[8px]';
      case 'slide-right':
        return isVisible
          ? 'opacity-100 translate-x-0 blur-0'
          : 'opacity-0 -translate-x-12 blur-[6px]';
      case 'slide-left':
        return isVisible
          ? 'opacity-100 translate-x-0 blur-0'
          : 'opacity-0 translate-x-12 blur-[6px]';
      default:
        return isVisible ? 'opacity-100' : 'opacity-0';
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all will-change-[transform,opacity,filter]',
        getTransformStyles(),
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
      }}
      {...props}
    >
      {children}
    </div>
  );
}
