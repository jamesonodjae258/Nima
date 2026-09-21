'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, PlayCircle, Loader2 } from 'lucide-react';

interface CurrentTaskCardProps {
  agentId: string;
  agentName?: string;
  title?: string;
  startedAt?: string;
  runningFor?: string;
  processedCount?: number;
  totalCount?: number;
  unitLabel?: string;
  currentAction?: string;
  nextAction?: string;
}

export function CurrentTaskCard({
  agentId,
  agentName = 'Lead Researcher',
  title = 'Find qualified SaaS prospects',
  startedAt = '10:42 AM',
  runningFor = '4m 21s',
  processedCount = 18,
  totalCount = 38,
  unitLabel = 'companies analyzed',
  currentAction = 'Analyzing company websites',
  nextAction = 'Identifying decision makers',
}: CurrentTaskCardProps) {
  const percentage = Math.round((processedCount / totalCount) * 100);

  return (
    <div className="bg-[#111318] border border-[#242832] rounded-xl p-5 md:p-6 shadow-xl relative overflow-hidden group">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF6B35]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-[#242832]/60">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#32D583] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#32D583]"></span>
          </span>
          <span className="text-[11px] font-mono tracking-wider uppercase text-[#8B93A1] font-medium">
            CURRENT TASK
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-[#8B93A1]">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#8B93A1]/70" />
            Started {startedAt}
          </span>
          <span className="text-[#242832]">|</span>
          <span className="text-[#F5F5F7]">
            Running for <span className="font-semibold text-[#FF6B35]">{runningFor}</span>
          </span>
        </div>
      </div>

      {/* Task Title & Primary Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-[#F5F5F7] tracking-tight mb-1">
            {title}
          </h2>
          <p className="text-sm text-[#8B93A1]">
            Active workflow running autonomously under {agentName}
          </p>
        </div>

        <Link
          href={`/dashboard/agents/${agentId}/activity`}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#FF6B35] hover:bg-[#E95724] text-[#08090C] text-xs font-semibold transition-all shadow-lg shadow-[#FF6B35]/20 group-hover:shadow-[#FF6B35]/30 shrink-0 cursor-pointer"
        >
          <span>View activity</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Progress Metric & Visual Bar */}
      <div className="mb-6 bg-[#08090C]/60 border border-[#242832]/60 rounded-lg p-4">
        <div className="flex items-center justify-between text-xs mb-2.5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-semibold text-[#F5F5F7]">
              {processedCount} / {totalCount}
            </span>
            <span className="text-[#8B93A1]">{unitLabel}</span>
          </div>
          <span className="font-mono text-xs font-medium text-[#FF6B35] bg-[#FF6B35]/10 px-2 py-0.5 rounded border border-[#FF6B35]/20">
            {percentage}% complete
          </span>
        </div>

        {/* Custom Progress Bar */}
        <div className="w-full bg-[#171A21] h-2 rounded-full overflow-hidden border border-[#242832]/50">
          <div
            className="h-full bg-gradient-to-r from-[#FF6B35] to-[#FFB49B] rounded-full transition-all duration-700 relative"
            style={{ width: `${percentage}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse opacity-50" />
          </div>
        </div>
      </div>

      {/* Action Pipeline States */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
        <div className="flex items-start gap-3 p-3 rounded-lg bg-[#171A21]/60 border border-[#242832]/80">
          <div className="mt-0.5 p-1 rounded-md bg-[#FF6B35]/10 text-[#FF6B35]">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase text-[#8B93A1] tracking-wider mb-0.5">
              Current action
            </div>
            <div className="text-sm font-medium text-[#F5F5F7]">
              {currentAction}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-lg bg-[#171A21]/30 border border-[#242832]/40">
          <div className="mt-0.5 p-1 rounded-md bg-[#242832] text-[#8B93A1]">
            <PlayCircle className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase text-[#8B93A1] tracking-wider mb-0.5">
              Next up
            </div>
            <div className="text-sm font-medium text-[#8B93A1]">
              {nextAction}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
