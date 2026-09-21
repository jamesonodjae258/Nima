'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Bell,
  Plus,
  Menu,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ChevronDown,
  Check,
  Info,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { mockNotifications } from '@/data/mockData';
import { AppNotification } from '@/types';

interface TopbarProps {
  onOpenMobileMenu?: () => void;
  onOpenCommandPalette: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  onOpenMobileMenu,
  onOpenCommandPalette,
}) => {
  const router = useRouter();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationsList, setNotificationsList] =
    useState<AppNotification[]>(mockNotifications);

  const unreadCount = notificationsList.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    setNotificationsList((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleNotificationSelect = (item: AppNotification) => {
    // Mark as read
    setNotificationsList((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
    );
    setNotificationsOpen(false);
    if (item.link) {
      router.push(item.link);
    } else {
      router.push('/dashboard/activity');
    }
  };

  return (
    <header className="h-14 border-b border-[#242832] bg-[#08090C]/80 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between">
      {/* Left side: Mobile Menu + Search */}
      <div className="flex items-center gap-3 flex-1 max-w-lg">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="md:hidden p-1.5 text-[#8B93A1] hover:text-[#F5F5F7] hover:bg-[#111318] rounded-md transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Button */}
        <button
          type="button"
          onClick={onOpenCommandPalette}
          className="flex items-center justify-between w-full max-w-sm h-9 px-3 rounded-lg bg-[#111318] border border-[#242832] hover:border-[#3D4454] text-[#8B93A1] hover:text-[#F5F5F7] text-xs transition-colors group text-left"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-[#5C6370] group-hover:text-[#8B93A1] transition-colors" />
            <span className="hidden sm:inline">Search agents, tasks, insights, knowledge...</span>
            <span className="sm:hidden">Search...</span>
          </div>
          <div className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-[#171A21] border border-[#242832] rounded text-[#8B93A1]">
              ⌘K
            </kbd>
          </div>
        </button>
      </div>

      {/* Right side: System pulse, Notifications, Create Agent */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Real-time system pulse */}
        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#111318] border border-[#242832] text-[11px] text-[#8B93A1]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#32D583] animate-pulse" />
          <span>Core v2.4 Active</span>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-lg text-[#8B93A1] hover:text-[#F5F5F7] hover:bg-[#111318] border border-transparent hover:border-[#242832] transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-[#FF6B35] text-[10px] font-bold text-[#08090C] flex items-center justify-center ring-2 ring-[#08090C]">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Flyout */}
          {notificationsOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setNotificationsOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#111318] border border-[#242832] shadow-2xl z-50 p-3 animate-in fade-in zoom-in-95 duration-100">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#242832] px-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#F5F5F7]">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#FF6B35]/15 text-[#FF6B35] border border-[#FF6B35]/30">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllRead}
                      className="text-[11px] text-[#FF6B35] hover:underline flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" />
                      <span>Mark all as read</span>
                    </button>
                  )}
                </div>

                <div className="space-y-1.5 max-h-80 overflow-y-auto pr-0.5">
                  {notificationsList.map((item) => (
                    <div
                      key={item.id}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                        item.read
                          ? 'bg-[#111318] border-transparent hover:bg-[#171A21] opacity-75'
                          : 'bg-[#171A21]/70 border-[#242832] hover:border-[#FF6B35]/40'
                      }`}
                      onClick={() => handleNotificationSelect(item)}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="text-xs font-medium text-[#F5F5F7] flex items-center gap-1.5 min-w-0">
                          {item.type === 'success' && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#32D583] shrink-0" />
                          )}
                          {item.type === 'warning' && (
                            <AlertTriangle className="w-3.5 h-3.5 text-[#F5B544] shrink-0" />
                          )}
                          {item.type === 'error' && (
                            <AlertTriangle className="w-3.5 h-3.5 text-[#F04438] shrink-0" />
                          )}
                          {item.type === 'info' && (
                            <Info className="w-3.5 h-3.5 text-[#4DA3FF] shrink-0" />
                          )}
                          <span className="truncate">{item.title}</span>
                        </div>
                        <span className="text-[10px] font-mono text-[#5C6370] whitespace-nowrap">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#8B93A1] mt-1 pl-5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-2.5 mt-2 border-t border-[#242832] text-center flex items-center justify-between px-1">
                  <Link
                    href="/dashboard/activity"
                    onClick={() => setNotificationsOpen(false)}
                    className="text-[11px] text-[#FF6B35] hover:text-[#FFB49B] font-medium transition-colors"
                  >
                    View activity stream →
                  </Link>
                  <Link
                    href="/dashboard/tasks"
                    onClick={() => setNotificationsOpen(false)}
                    className="text-[11px] text-[#8B93A1] hover:text-[#F5F5F7] transition-colors"
                  >
                    Tasks log
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Primary Create Agent CTA */}
        <Link href="/dashboard/agents/new">
          <Button size="sm" className="font-medium shadow-[0_0_15px_rgba(255,107,53,0.25)] text-xs">
            <Plus className="w-3.5 h-3.5 mr-1" />
            <span>Create agent</span>
          </Button>
        </Link>
      </div>
    </header>
  );
};
