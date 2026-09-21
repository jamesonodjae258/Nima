'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { initialActivities } from '@/data/mockData';
import {
  ArrowLeft,
  Cpu,
  Clock,
  Calendar,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Terminal,
} from 'lucide-react';

interface ActivityDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ActivityDetailPage({ params }: ActivityDetailPageProps) {
  const resolvedParams = use(params);
  const activityId = resolvedParams.id;

  const activity =
    initialActivities.find((a) => a.id === activityId) || initialActivities[0];

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/activity"
          className="inline-flex items-center gap-1.5 text-xs text-[#8B93A1] hover:text-[#F5F5F7] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Activity Stream</span>
        </Link>

        <span className="text-[11px] font-mono text-[#8B93A1]">
          Event ID: {activity.id}
        </span>
      </div>

      {/* Main Event Card */}
      <div className="bg-[#111318] border border-[#242832] rounded-xl p-6 md:p-8 shadow-xl space-y-6">
        {/* Agent Info & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#242832]/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#FF6B35]/15 text-[#FF6B35] border border-[#FF6B35]/30">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-mono uppercase text-[#8B93A1]">
                  {activity.agentCategory}
                </span>
                <span className="text-[#242832]">/</span>
                <span className="text-xs font-mono text-[#32D583]">
                  ✓ Verified Event
                </span>
              </div>
              <h1 className="text-2xl font-bold text-[#F5F5F7] tracking-tight">
                {activity.agentName}
              </h1>
            </div>
          </div>

          <span className="px-3 py-1 rounded-lg bg-[#08090C] border border-[#242832] text-xs font-mono text-[#8B93A1] flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#FF6B35]" />
            <span>{activity.dateGroup}, {activity.time}</span>
          </span>
        </div>

        {/* Action Details */}
        <div className="space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-[#8B93A1]">
            Action Performed
          </div>
          <h2 className="text-xl font-semibold text-[#F5F5F7]">
            {activity.agentName} {activity.action}
          </h2>
          <p className="text-sm text-[#8B93A1] leading-relaxed bg-[#171A21] p-4 rounded-xl border border-[#242832]">
            {activity.details || 'Autonomous task execution step completed successfully without anomalies.'}
          </p>
        </div>

        {/* Execution Specifications */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
          <div className="p-3.5 rounded-lg bg-[#08090C] border border-[#242832]">
            <div className="text-[10px] font-mono uppercase text-[#8B93A1] mb-1">
              Result Summary
            </div>
            <div className="text-sm font-semibold text-[#32D583] font-mono">
              18 qualified prospects
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-[#08090C] border border-[#242832]">
            <div className="text-[10px] font-mono uppercase text-[#8B93A1] mb-1">
              Duration
            </div>
            <div className="text-sm font-semibold text-[#F5F5F7] font-mono">
              7m 12s
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-[#08090C] border border-[#242832]">
            <div className="text-[10px] font-mono uppercase text-[#8B93A1] mb-1">
              Integration Scope
            </div>
            <div className="text-sm font-semibold text-[#FF6B35] font-mono">
              HubSpot REST API v3
            </div>
          </div>
        </div>

        {/* Audit telemetry snippet */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#8B93A1]">
            <Terminal className="w-3.5 h-3.5" />
            <span>Audit Trail Event Log</span>
          </div>
          <div className="p-3 rounded-lg bg-[#08090C] border border-[#242832] font-mono text-xs text-[#8B93A1] space-y-1">
            <div className="text-[#32D583]">[200 OK] Webhook dispatched from Lead Researcher</div>
            <div>[VERIFIED] Contact emails validated via MX lookup</div>
            <div className="text-[#FF6B35]">[CRM] Sync batch complete: 18 records appended</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-[#242832]/60 flex flex-wrap items-center gap-3">
          <Link
            href="/dashboard/tasks/task-1"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#FF6B35] hover:bg-[#E95724] text-[#08090C] text-xs font-semibold transition-colors shadow-lg shadow-[#FF6B35]/20 cursor-pointer"
          >
            <span>View task</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/dashboard/tasks/task-1#results"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#171A21] hover:bg-[#242832] text-[#F5F5F7] border border-[#242832] text-xs font-medium transition-colors cursor-pointer"
          >
            <span>View results</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#8B93A1]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
