'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Cpu,
  CheckSquare,
  Activity,
  TrendingUp,
  BookOpen,
  Layers,
  Settings,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  onCloseMobile?: () => void;
  className?: string;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  exact?: boolean;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile, className }) => {
  const pathname = usePathname();

  const navigationSections: NavSection[] = [
    {
      title: 'COMMAND CENTER',
      items: [
        {
          label: 'Command Center',
          href: '/dashboard',
          icon: <LayoutDashboard className="w-4 h-4" />,
          exact: true,
        },
      ],
    },
    {
      title: 'WORK',
      items: [
        {
          label: 'Agents',
          href: '/dashboard/agents',
          icon: <Cpu className="w-4 h-4" />,
          badge: '12',
        },
        {
          label: 'Tasks',
          href: '/dashboard/tasks',
          icon: <CheckSquare className="w-4 h-4" />,
          badge: '1.2k',
        },
        {
          label: 'Activity',
          href: '/dashboard/activity',
          icon: <Activity className="w-4 h-4" />,
        },
      ],
    },
    {
      title: 'INTELLIGENCE',
      items: [
        {
          label: 'Insights',
          href: '/dashboard/insights',
          icon: <TrendingUp className="w-4 h-4" />,
          badge: 'New',
        },
        {
          label: 'Knowledge',
          href: '/dashboard/knowledge',
          icon: <BookOpen className="w-4 h-4" />,
        },
      ],
    },
    {
      title: 'CONNECT',
      items: [
        {
          label: 'Integrations',
          href: '/dashboard/integrations',
          icon: <Layers className="w-4 h-4" />,
        },
      ],
    },
    {
      title: 'SETTINGS',
      items: [
        {
          label: 'Settings',
          href: '/dashboard/settings',
          icon: <Settings className="w-4 h-4" />,
        },
      ],
    },
  ];

  return (
    <aside
      className={cn(
        'w-[240px] h-screen bg-[#0B0D12] border-r border-[#242832] flex flex-col justify-between select-none shrink-0',
        className
      )}
    >
      {/* Brand Header */}
      <div>
        <div className="h-14 px-5 flex items-center justify-between border-b border-[#242832]/80">
          <Link
            href="/dashboard"
            onClick={onCloseMobile}
            className="flex items-center gap-2.5 group"
          >
            <img
              src="/logo/symbol.png"
              alt="Nima"
              className="w-6 h-6 object-contain transition-transform group-hover:scale-105 drop-shadow-[0_0_8px_rgba(255,107,53,0.3)]"
            />
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm tracking-widest text-[#F5F5F7]">NIMA</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-[#171A21] text-[#8B93A1] border border-[#242832]">
                OS
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Sections */}
        <div className="py-4 px-3 space-y-6 overflow-y-auto max-h-[calc(100vh-130px)]">
          {navigationSections.map((section) => (
            <div key={section.title} className="space-y-1">
              <div className="text-[10px] font-semibold text-[#5C6370] tracking-wider px-2.5 mb-1.5 uppercase font-mono">
                {section.title}
              </div>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = item.exact
                    ? pathname === item.href
                    : pathname === item.href || pathname.startsWith(item.href + '/');

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onCloseMobile}
                      className={cn(
                        'flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 group',
                        isActive
                          ? 'bg-[#171A21] text-[#F5F5F7] border border-[#242832] shadow-sm'
                          : 'text-[#8B93A1] hover:text-[#F5F5F7] hover:bg-[#111318] border border-transparent'
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={cn(
                            'transition-colors',
                            isActive ? 'text-[#FF6B35]' : 'text-[#8B93A1] group-hover:text-[#F5F5F7]'
                          )}
                        >
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </div>

                      {item.badge && (
                        <span
                          className={cn(
                            'text-[10px] px-1.5 py-0.2 rounded font-mono',
                            item.badge === 'New'
                              ? 'bg-[#FF6B35]/20 text-[#FFB49B] font-semibold'
                              : 'bg-[#242832] text-[#8B93A1]'
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Footer */}
      <div className="p-3 border-t border-[#242832]/80 bg-[#0E1016]">
        <Link
          href="/dashboard/settings"
          onClick={onCloseMobile}
          className="flex items-center justify-between p-2 rounded-lg hover:bg-[#171A21] transition-colors group"
        >
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#FF6B35] to-[#FFB49B] flex items-center justify-center text-white font-semibold text-xs shadow-sm">
                J
              </div>
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#32D583] ring-2 ring-[#08090C]" />
            </div>
            <div className="text-left">
              <div className="text-xs font-medium text-[#F5F5F7] group-hover:text-white transition-colors">
                James
              </div>
              <div className="text-[10px] text-[#5C6370]">Personal workspace</div>
            </div>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-[#5C6370] group-hover:text-[#8B93A1] transition-colors" />
        </Link>
      </div>
    </aside>
  );
};
