'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { initialTasks, mockProspects, mockApprovalHistory } from '@/data/mockData';
import { ResultsTable } from '@/components/observability/ResultsTable';
import { HumanApprovalHistoryCard } from '@/components/observability/HumanApprovalHistoryCard';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Cpu,
  Building2,
  Users,
  Target,
  Database,
  ExternalLink,
  ShieldCheck,
  Check,
} from 'lucide-react';

interface TaskDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function TaskDetailPage({ params }: TaskDetailPageProps) {
  const resolvedParams = use(params);
  const taskId = resolvedParams.id;

  const task = initialTasks.find((t) => t.id === taskId) || initialTasks[0];

  const executionSteps = [
    { title: 'Task started', timestamp: '10:42:03', status: 'completed', desc: 'Loaded task instructions and connected HubSpot OAuth token.' },
    { title: 'Research', timestamp: '10:42:18', status: 'completed', desc: 'Queried 3 venture databases for recently funded B2B SaaS companies.' },
    { title: 'Analysis', timestamp: '10:44:32', status: 'completed', desc: 'Analyzed 38 corporate websites to verify software business model and team scale.' },
    { title: 'Qualification', timestamp: '10:45:50', status: 'completed', desc: 'Matched companies against ICP filters. 18 qualified, 2 in review, 18 disqualified.' },
    { title: 'Enrichment', timestamp: '10:46:40', status: 'completed', desc: 'Discovered and validated 27 executive contacts across qualified accounts.' },
    { title: 'Approval', timestamp: '10:48:00', status: 'completed', desc: 'Paused before external write. Approved by James at 10:48 AM.' },
    { title: 'CRM update', timestamp: '10:48:30', status: 'completed', desc: 'Synced 18 verified decision makers and companies into HubSpot CRM.' },
    { title: 'Completion', timestamp: '10:49:12', status: 'completed', desc: 'Execution closed with 100% data fidelity and zero failed records.' },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/tasks"
          className="inline-flex items-center gap-1.5 text-xs text-[#8B93A1] hover:text-[#F5F5F7] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Tasks</span>
        </Link>

        <Link
          href={`/dashboard/agents/${task.agentId}/activity`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#171A21] hover:bg-[#242832] border border-[#242832] text-xs text-[#F5F5F7] transition-colors cursor-pointer"
        >
          <span>Live Execution Trace</span>
          <ExternalLink className="w-3 h-3 text-[#FF6B35]" />
        </Link>
      </div>

      {/* Task Header */}
      <div className="bg-[#111318] border border-[#242832] rounded-xl p-5 md:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#8B93A1]">
                Task ID: {task.id}
              </span>
              <span className="text-[#242832]">/</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-[#32D583]/10 text-[#32D583] border border-[#32D583]/30">
                <CheckCircle2 className="w-3 h-3" />
                <span>Status: Completed ✓</span>
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-[#F5F5F7] tracking-tight">
              {task.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#8B93A1] mt-3">
              <div className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#FF6B35]" />
                <span>Agent:</span>
                <Link
                  href={`/dashboard/agents/${task.agentId}`}
                  className="font-medium text-[#F5F5F7] hover:text-[#FF6B35] underline underline-offset-2 transition-colors"
                >
                  {task.agentName}
                </Link>
              </div>

              <span className="text-[#242832]">|</span>

              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#8B93A1]/70" />
                <span>Started:</span>
                <span className="font-mono text-[#F5F5F7]">10:42 AM</span>
              </div>

              <span className="text-[#242832]">|</span>

              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#32D583]" />
                <span>Completed:</span>
                <span className="font-mono text-[#F5F5F7]">10:49 AM</span>
              </div>

              <span className="text-[#242832]">|</span>

              <div className="flex items-center gap-1.5">
                <span>Duration:</span>
                <span className="font-mono font-semibold text-[#FF6B35]">7m 12s</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl bg-[#111318] border border-[#242832] shadow-md">
          <div className="text-[11px] font-mono uppercase text-[#8B93A1] tracking-wider mb-1 flex items-center justify-between">
            <span>Companies researched</span>
            <Building2 className="w-3.5 h-3.5 text-[#FF6B35]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#F5F5F7]">
            38
          </div>
          <div className="text-[10px] text-[#8B93A1] mt-1 font-mono">
            Across 3 public & venture sources
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#111318] border border-[#242832] shadow-md">
          <div className="text-[11px] font-mono uppercase text-[#8B93A1] tracking-wider mb-1 flex items-center justify-between">
            <span>Qualified</span>
            <Target className="w-3.5 h-3.5 text-[#32D583]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#32D583]">
            18
          </div>
          <div className="text-[10px] text-[#32D583] mt-1 font-mono">
            Met 100% ICP criteria
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#111318] border border-[#242832] shadow-md">
          <div className="text-[11px] font-mono uppercase text-[#8B93A1] tracking-wider mb-1 flex items-center justify-between">
            <span>Contacts found</span>
            <Users className="w-3.5 h-3.5 text-[#FF6B35]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#F5F5F7]">
            27
          </div>
          <div className="text-[10px] text-[#8B93A1] mt-1 font-mono">
            VP Sales, CRO & Growth leaders
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#111318] border border-[#242832] shadow-md">
          <div className="text-[11px] font-mono uppercase text-[#8B93A1] tracking-wider mb-1 flex items-center justify-between">
            <span>Added to CRM</span>
            <Database className="w-3.5 h-3.5 text-[#32D583]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#32D583]">
            18
          </div>
          <div className="text-[10px] text-[#32D583] mt-1 font-mono">
            Approved & synced to HubSpot
          </div>
        </div>
      </div>

      {/* Human Approval History Card */}
      <HumanApprovalHistoryCard
        item={mockApprovalHistory}
        destinationCrm="HubSpot"
        contactsCount={18}
      />

      {/* Execution Timeline */}
      <div className="bg-[#111318] border border-[#242832] rounded-xl p-5 md:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-[#F5F5F7] tracking-tight">
              Execution Timeline
            </h3>
            <p className="text-xs text-[#8B93A1]">
              Full verified step trace for this task execution
            </p>
          </div>
          <span className="text-[11px] font-mono text-[#32D583] bg-[#32D583]/10 px-2.5 py-1 rounded border border-[#32D583]/20">
            8/8 Steps Completed
          </span>
        </div>

        <div className="divide-y divide-[#242832]/60 pt-2">
          {executionSteps.map((step, idx) => (
            <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#32D583]/15 text-[#32D583] border border-[#32D583]/30 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 font-mono text-[10px]">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#F5F5F7]">
                      {step.title}
                    </span>
                    <span className="text-[10px] font-mono text-[#32D583]">
                      ✓ Completed
                    </span>
                  </div>
                  <p className="text-[#8B93A1] text-xs mt-0.5">
                    {step.desc}
                  </p>
                </div>
              </div>

              <div className="font-mono text-[#8B93A1] text-[11px] pl-8 sm:pl-0 shrink-0">
                {step.timestamp}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Results Section */}
      <div id="results">
        <ResultsTable
          prospects={mockProspects}
          agentName={task.agentName}
        />
      </div>
    </div>
  );
}
