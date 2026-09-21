import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'error' | 'violet' | 'orange' | 'brand' | 'outline';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  size = 'md',
  children,
  ...props
}) => {
  const base = 'inline-flex items-center font-medium rounded-md tracking-tight select-none';

  const variants = {
    default: 'bg-[#171A21] text-[#8B93A1] border border-[#242832]',
    secondary: 'bg-[#242832]/60 text-[#D1D5DB] border border-[#242832]',
    success: 'bg-[#32D583]/10 text-[#32D583] border border-[#32D583]/20',
    warning: 'bg-[#F5B544]/10 text-[#F5B544] border border-[#F5B544]/20',
    error: 'bg-[#F04438]/10 text-[#F04438] border border-[#F04438]/20',
    violet: 'bg-[#FF6B35]/15 text-[#FFB49B] border border-[#FF6B35]/30',
    orange: 'bg-[#FF6B35]/15 text-[#FFB49B] border border-[#FF6B35]/30',
    brand: 'bg-[#FF6B35]/15 text-[#FFB49B] border border-[#FF6B35]/30',
    outline: 'bg-transparent text-[#8B93A1] border border-[#242832]',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 leading-4 gap-1',
    md: 'text-xs px-2.5 py-1 leading-4 gap-1.5',
  };

  return (
    <span className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
};
