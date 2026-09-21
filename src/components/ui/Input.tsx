import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {icon && (
          <div className="absolute left-3 text-[#5C6370] pointer-events-none flex items-center justify-center">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-lg border border-[#242832] bg-[#111318] px-3 py-1 text-sm text-[#F5F5F7] placeholder-[#5C6370] transition-colors',
            'focus-visible:outline-none focus-visible:border-[#FF6B35] focus-visible:ring-1 focus-visible:ring-[#FF6B35]',
            'disabled:cursor-not-allowed disabled:opacity-50',
            icon ? 'pl-9' : 'pl-3',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-lg border border-[#242832] bg-[#111318] px-3 py-2 text-sm text-[#F5F5F7] placeholder-[#5C6370] transition-colors',
          'focus-visible:outline-none focus-visible:border-[#FF6B35] focus-visible:ring-1 focus-visible:ring-[#FF6B35]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';
