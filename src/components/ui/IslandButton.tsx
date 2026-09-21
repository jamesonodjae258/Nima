'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface IslandButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'md' | 'lg';
  icon?: React.ReactNode;
  showArrow?: boolean;
}

export const IslandButton = React.forwardRef<HTMLButtonElement, IslandButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      icon,
      showArrow = true,
      className,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      md: 'pl-5 pr-2 py-2 text-xs font-semibold',
      lg: 'pl-7 pr-2.5 py-2.5 text-sm font-semibold',
    };

    const variantClasses = {
      primary:
        'bg-[#FF6B35] text-[#08090C] hover:bg-[#FF7D4D] shadow-[0_0_24px_rgba(255,107,53,0.35)] border border-[#FF8C61]',
      secondary:
        'bg-[#171A21] text-[#F5F5F7] hover:bg-[#1F232D] hover:text-white border border-[#2E3442] shadow-[0_4px_16px_rgba(0,0,0,0.4)]',
      ghost:
        'bg-transparent text-[#8B93A1] hover:text-[#F5F5F7] hover:bg-white/[0.04] border border-transparent',
    };

    const iconCircleVariant = {
      primary: 'bg-[#08090C]/15 text-[#08090C]',
      secondary: 'bg-white/10 text-[#F5F5F7]',
      ghost: 'bg-white/10 text-[#8B93A1]',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'group relative inline-flex items-center gap-3 rounded-full cursor-pointer select-none',
          'transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98]',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        <span>{children}</span>

        {/* Nested Button-in-Button Trailing Icon with Kinetic Spring */}
        {(showArrow || icon) && (
          <span
            className={cn(
              'w-7 h-7 rounded-full flex items-center justify-center shrink-0',
              'transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
              'group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:scale-105',
              iconCircleVariant[variant]
            )}
          >
            {icon || <ArrowRight className="w-3.5 h-3.5" />}
          </span>
        )}
      </button>
    );
  }
);

IslandButton.displayName = 'IslandButton';
