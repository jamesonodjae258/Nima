import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090C] disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none';

    const variants = {
      primary: 'bg-[#FF6B35] text-[#08090C] font-semibold hover:bg-[#E95724] shadow-[0_1px_2px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,107,53,0.4)]',
      secondary: 'bg-[#171A21] text-[#F5F5F7] border border-[#242832] hover:bg-[#1C2028] hover:border-[#323846]',
      ghost: 'bg-transparent text-[#8B93A1] hover:text-[#F5F5F7] hover:bg-[#171A21]',
      outline: 'bg-transparent text-[#F5F5F7] border border-[#242832] hover:bg-[#111318] hover:border-[#3D4454]',
      danger: 'bg-[#F04438]/10 text-[#F04438] border border-[#F04438]/20 hover:bg-[#F04438]/20',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs gap-1.5',
      md: 'h-9 px-4 text-sm gap-2',
      lg: 'h-11 px-5 text-base gap-2.5',
      icon: 'h-9 w-9 p-0',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1.5" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
