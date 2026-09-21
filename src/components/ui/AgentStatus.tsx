import React from 'react';
import { cn } from '@/lib/utils';
import { AgentStatusType } from '@/types';

export interface AgentStatusProps {
  status: AgentStatusType | 'completed' | 'queued';
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const AgentStatus: React.FC<AgentStatusProps> = ({
  status,
  showLabel = true,
  size = 'md',
  className,
}) => {
  const configs: Record<
    string,
    { symbol: string; label: string; color: string; badgeBg: string; border: string; animateClass?: string }
  > = {
    running: {
      symbol: '●',
      label: 'Running',
      color: 'text-[#FF6B35]',
      badgeBg: 'bg-[#FF6B35]/10',
      border: 'border-[#FF6B35]/30',
      animateClass: 'animate-pulse',
    },
    thinking: {
      symbol: '◌',
      label: 'Evaluating',
      color: 'text-[#FFB49B]',
      badgeBg: 'bg-[#FF6B35]/5',
      border: 'border-[#FF6B35]/20',
      animateClass: 'animate-spin',
    },
    idle: {
      symbol: '○',
      label: 'Idle',
      color: 'text-[#8B93A1]',
      badgeBg: 'bg-[#171A21]',
      border: 'border-[#242832]',
    },
    paused: {
      symbol: '○',
      label: 'Paused',
      color: 'text-[#8B93A1]',
      badgeBg: 'bg-[#171A21]',
      border: 'border-[#242832]',
    },
    completed: {
      symbol: '✓',
      label: 'Completed',
      color: 'text-[#32D583]',
      badgeBg: 'bg-[#32D583]/10',
      border: 'border-[#32D583]/30',
    },
    failed: {
      symbol: '×',
      label: 'Failed',
      color: 'text-[#F04438]',
      badgeBg: 'bg-[#F04438]/10',
      border: 'border-[#F04438]/30',
    },
    queued: {
      symbol: '○',
      label: 'Queued',
      color: 'text-[#8B93A1]',
      badgeBg: 'bg-[#171A21]',
      border: 'border-[#242832]',
    },
  };

  const current = configs[status] || configs.idle;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2',
  };

  const symbolSizes = {
    sm: 'text-[11px]',
    md: 'text-xs',
    lg: 'text-sm',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full border select-none transition-colors',
        current.badgeBg,
        current.border,
        sizeClasses[size],
        className
      )}
    >
      <span
        className={cn(
          'font-semibold inline-block transition-transform',
          current.color,
          symbolSizes[size],
          current.animateClass
        )}
        aria-hidden="true"
      >
        {current.symbol}
      </span>
      {showLabel && (
        <span className={cn('capitalize tracking-tight font-medium', current.color)}>
          {current.label}
        </span>
      )}
    </span>
  );
};
