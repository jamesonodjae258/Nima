import React from 'react';
import { cn } from '@/lib/utils';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
  size?: 'sm' | 'md';
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  activeId,
  onChange,
  className,
  size = 'md',
}) => {
  return (
    <div
      className={cn(
        'inline-flex items-center p-1 bg-[#111318] border border-[#242832] rounded-lg select-none',
        className
      )}
    >
      {items.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              'flex items-center gap-2 rounded-md font-medium transition-all duration-150',
              size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-sm',
              isActive
                ? 'bg-[#171A21] text-[#F5F5F7] border border-[#242832] shadow-sm'
                : 'text-[#8B93A1] hover:text-[#F5F5F7] hover:bg-[#171A21]/40 border border-transparent'
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {typeof tab.count === 'number' && (
              <span
                className={cn(
                  'text-[11px] px-1.5 py-0.2 rounded-full font-mono',
                  isActive
                    ? 'bg-[#FF6B35]/15 text-[#FFB49B]'
                    : 'bg-[#242832] text-[#8B93A1]'
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
