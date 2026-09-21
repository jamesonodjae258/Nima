'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { initialAgents, mockLiveTimelineEvents } from '@/data/mockData';
import { LiveExecutionTimeline } from '@/components/observability/LiveExecutionTimeline';
import {
  ArrowLeft,
  Clock,
  ExternalLink,
  ShieldCheck,
  Building2,
  Users,
  Database,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

interface LiveExecutionPageProps {
  params: Promise<{ id: string }>;
}

export default function LiveExecutionPage({ params }: LiveExecutionPageProps) {
  const resolvedParams = use(params);
  const agentId = resolvedParams.id;

  const agent = initialAgents.find((a) => a.id === agentId) || initialAgents[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href={`/dashboard/agents/${agent.id}`}
          className="inline-flex items-center gap-1.5 text-xs text-[#8B93A1] hover:text-[#F5F5F7] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to {agent.name}</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/tasks/task-1"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#171A21] hover:bg-[#242832] border border-[#242832] text-xs text-[#F5F5F7] transition-colors cursor-pointer"
          >
            <span>Task Detail</span>
            <ExternalLink className="w-3 h-3 text-[#8B93A1]" />
          </Link>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-[#111318] border border-[#242832] rounded-xl p-5 md:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF6B35]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="text-xs font-mono uppercase tracking-wider text-[#8B93A1]">
                {agent.name}
              </span>
              <span className="text-[#242832]">/</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-[#32D583]/10 text-[#32D583] border border-[#32D583]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#32D583] animate-pulse" />
                <span>Running</span>
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-[#F5F5F7] tracking-tight">
              Find qualified SaaS prospects
            </h1>

            <p className="text-xs text-[#8B93A1] mt-1">
              Live sequential trace of autonomous reasoning steps, source queries, and verification gates.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-[#8B93A1] bg-[#08090C] px-4 py-2.5 rounded-lg border border-[#242832]">
            <span className="flex items-center gap-1.5 text-[#F5F5F7]">
              <Clock className="w-3.5 h-3.5 text-[#FF6B35]" />
              Started 10:42 AM
            </span>
            <span className="text-[#242832]">|</span>
            <span className="text-[#32D583]">
              Running 4m 21s
            </span>
          </div>
        </div>
      </div>

      {/* Main Split Layout: LEFT/CENTER = Execution Timeline, RIGHT = Task Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Center: Execution Timeline (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#F5F5F7] tracking-tight">
              Execution Timeline
            </h2>
            <span className="text-[11px] font-mono text-[#8B93A1]">
              7 chronological events
            </span>
          </div>

          <LiveExecutionTimeline
            initialEvents={mockLiveTimelineEvents}
            agentId={agent.id}
          />
        </div>

        {/* Right: Task Summary Panel (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#F5F5F7] tracking-tight">
              Task Summary
            </h2>
            <span className="text-[11px] font-mono text-[#FF6B35]">
              Task ID: task-1
            </span>
          </div>

          <div className="bg-[#111318] border border-[#242832] rounded-xl p-5 shadow-xl space-y-5">
            {/* Progress metric */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[#8B93A1]">Progress:</span>
                <span className="font-mono text-[#F5F5F7] font-semibold">
                  18 / 38 analyzed
                </span>
              </div>
              <div className="w-full bg-[#08090C] h-2 rounded-full overflow-hidden border border-[#242832]">
                <div
                  className="h-full bg-gradient-to-r from-[#FF6B35] to-[#FFB49B] rounded-full relative"
                  style={{ width: '47%' }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-[#8B93A1] mt-1.5">
                <span>Phase: Contact Discovery</span>
                <span className="text-[#FF6B35]">47%</span>
              </div>
            </div>

            {/* Target ICP Criteria */}
            <div className="pt-4 border-t border-[#242832]/60 space-y-3">
              <div className="text-[11px] font-mono uppercase text-[#8B93A1] tracking-wider">
                Active ICP Criteria
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-start justify-between">
                  <span className="text-[#8B93A1] flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#FF6B35]" />
                    <span>Industry</span>
                  </span>
                  <span className="font-medium text-[#F5F5F7]">B2B SaaS</span>
                </div>

                <div className="flex items-start justify-between">
                  <span className="text-[#8B93A1] flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#FF6B35]" />
                    <span>Company size</span>
                  </span>
                  <span className="font-medium text-[#F5F5F7]">50–500 headcount</span>
                </div>

                <div className="flex items-start justify-between">
                  <span className="text-[#8B93A1] flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-[#FF6B35]" />
                    <span>Funding round</span>
                  </span>
                  <span className="font-medium text-[#F5F5F7]">Series A or B</span>
                </div>

                <div className="flex items-start justify-between">
                  <span className="text-[#8B93A1] flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-[#FF6B35]" />
                    <span>Destination CRM</span>
                  </span>
                  <span className="font-medium text-[#32D583]">HubSpot</span>
                </div>
              </div>
            </div>

            {/* Human Gate Alert */}
            <div className="p-3 rounded-lg bg-[#171A21] border border-[#242832] text-xs">
              <div className="flex items-center gap-2 text-[#F5B544] font-mono text-[11px] font-medium mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Approval Rule Enforced</span>
              </div>
              <p className="text-[11px] text-[#8B93A1] leading-relaxed">
                Nima will halt before updating HubSpot to await verification from James.
              </p>
            </div>

            {/* Action Links */}
            <div className="pt-2 border-t border-[#242832]/60 space-y-2">
              <Link
                href="/dashboard/tasks/task-1"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#FF6B35] hover:bg-[#E95724] text-[#08090C] text-xs font-semibold transition-colors shadow-lg shadow-[#FF6B35]/20 cursor-pointer"
              >
                <span>View Full Task Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/dashboard/tasks/task-1#results"
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#171A21] hover:bg-[#242832] text-[#F5F5F7] border border-[#242832] text-xs font-medium transition-colors cursor-pointer"
              >
                <span>View Qualified Results Table</span>
                <ExternalLink className="w-3 h-3 text-[#8B93A1]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
