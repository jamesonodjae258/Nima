'use client';

import React from 'react';
import Link from 'next/link';
import { ActivityItem } from '@/types';
import {
  X,
  Cpu,
  Clock,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  PlayCircle,
  Database,
  Calendar,
} from 'lucide-react';

interface ActivityEventDrawerProps {
  activity: ActivityItem | null;
  onClose: () => void;
}

export function ActivityEventDrawer({
  activity,
  onClose,
}: ActivityEventDrawerProps) {
  if (!activity) return null;

  const isCompleted = activity.status === 'completed';
  const isWarning = activity.status === 'warning';
  const isRunning = activity.status === 'running';

  // Associate to task-1 for realistic navigation
  const associatedTaskId = 'task-1';

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#111318] border-l border-[#242832] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
      {/* Drawer Header */}
      <div className="p-5 border-b border-[#242832] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[#FF6B35] uppercase tracking-wider font-semibold">
            Activity Event
          </span>
          <span className="text-[#242832]">/</span>
          <span className="text-xs text-[#8B93A1]">ID: {activity.id}</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg text-[#8B93A1] hover:text-[#F5F5F7] hover:bg-[#171A21] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Drawer Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Agent Badge & Status */}
        <div>
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#FF6B35]/15 text-[#FFB49B] border border-[#FF6B35]/30">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#F5F5F7]">
                  {activity.agentName}
                </h3>
                <span className="text-[11px] text-[#8B93A1]">
                  {activity.agentCategory}
                </span>
              </div>
            </div>

            <span
              className={`px-2.5 py-1 rounded text-xs font-mono font-medium border ${
                isCompleted
                  ? 'bg-[#32D583]/10 text-[#32D583] border-[#32D583]/20'
                  : isWarning
                  ? 'bg-[#F5B544]/10 text-[#F5B544] border-[#F5B544]/20'
                  : 'bg-[#FF6B35]/10 text-[#FFB49B] border-[#FF6B35]/20'
              }`}
            >
              {activity.action}
            </span>
          </div>
        </div>

        {/* Task Title & Details */}
        <div className="p-4 rounded-xl bg-[#171A21] border border-[#242832] space-y-3">
          <div>
            <div className="text-[10px] font-mono uppercase text-[#8B93A1] tracking-wider mb-1">
              Event Description
            </div>
            <p className="text-sm font-medium text-[#F5F5F7] leading-relaxed">
              {activity.details || `${activity.agentName} ${activity.action}`}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#242832]/60 text-xs">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#8B93A1] block mb-0.5">
                Timestamp
              </span>
              <span className="font-mono text-[#F5F5F7] flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#8B93A1]" />
                {activity.time}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-[#8B93A1] block mb-0.5">
                Timeline Group
              </span>
              <span className="font-mono text-[#F5F5F7] flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#8B93A1]" />
                {activity.dateGroup}
              </span>
            </div>
          </div>
        </div>

        {/* Execution Summary Spec */}
        <div className="space-y-2.5 text-xs">
          <div className="text-[11px] font-mono uppercase text-[#8B93A1] tracking-wider">
            Execution Details
          </div>

          <div className="p-3.5 rounded-lg bg-[#08090C] border border-[#242832] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[#8B93A1]">Task ID:</span>
              <span className="font-mono text-[#F5F5F7]">{associatedTaskId}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8B93A1]">Result:</span>
              <span className="font-mono font-medium text-[#32D583]">18 qualified prospects</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8B93A1]">Duration:</span>
              <span className="font-mono text-[#F5F5F7]">7m 12s</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8B93A1]">Integrations involved:</span>
              <span className="font-mono text-[#FF6B35]">HubSpot, LinkedIn Data</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-5 border-t border-[#242832] bg-[#08090C]/80 grid grid-cols-2 gap-2.5">
        <Link
          href={`/dashboard/tasks/${associatedTaskId}`}
          className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-[#FF6B35] hover:bg-[#E95724] text-[#08090C] text-xs font-semibold transition-colors shadow-lg shadow-[#FF6B35]/20 cursor-pointer"
        >
          <span>View task</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <Link
          href={`/dashboard/tasks/${associatedTaskId}#results`}
          className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-[#171A21] hover:bg-[#242832] text-[#F5F5F7] border border-[#242832] text-xs font-medium transition-colors cursor-pointer"
        >
          <span>View results</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#8B93A1]" />
        </Link>
      </div>
    </div>
  );
}
