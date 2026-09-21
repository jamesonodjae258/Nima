'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { initialAgents, mockAgentRuns } from '@/data/mockData';
import { CurrentTaskCard } from '@/components/observability/CurrentTaskCard';
import { AgentWorkflowPreview } from '@/components/observability/AgentWorkflowPreview';
import { AgentPerformanceChart } from '@/components/observability/AgentPerformanceChart';
import { AgentRunHistoryTable } from '@/components/observability/AgentRunHistoryTable';
import { AgentErrorStateBanner, AgentPausedStateBanner } from '@/components/observability/AgentStateModals';
import { AgentIntelligenceSection } from '@/components/intelligence/AgentIntelligenceSection';
import { AgentMemorySection } from '@/components/intelligence/AgentMemorySection';
import { AgentKnowledgeSection } from '@/components/intelligence/AgentKnowledgeSection';
import {
  Pause,
  Play,
  MoreVertical,
  ArrowLeft,
  Settings,
  CheckCircle2,
  Clock,
  Zap,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';

interface AgentDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function AgentDetailPage({ params }: AgentDetailPageProps) {
  const resolvedParams = use(params);
  const agentId = resolvedParams.id;

  // Find agent or default to Lead Researcher (agent-1)
  const agent = initialAgents.find((a) => a.id === agentId) || initialAgents[0];
  const runs = mockAgentRuns[agent.id] || mockAgentRuns['agent-1'];

  // State controls for testing Running, Paused, and Simulated Error states
  const [currentStatus, setCurrentStatus] = useState<'running' | 'paused' | 'failed'>(
    agent.status === 'paused' ? 'paused' : 'running'
  );
  const [showErrorBanner, setShowErrorBanner] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [taskRunToast, setTaskRunToast] = useState<string | null>(null);

  const toggleStatus = () => {
    if (currentStatus === 'running') {
      setCurrentStatus('paused');
    } else {
      setCurrentStatus('running');
      setShowErrorBanner(false);
    }
  };

  const handleRunTask = () => {
    setTaskRunToast('Autonomous task dispatched: "Find qualified SaaS prospects"');
    setTimeout(() => setTaskRunToast(null), 4000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notification */}
      {taskRunToast && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-xl bg-[#171A21] border border-[#FF6B35]/60 shadow-2xl text-xs text-[#F5F5F7] flex items-center gap-3 animate-in fade-in slide-in-from-top-3 duration-200 font-mono">
          <Play className="w-4 h-4 text-[#FF6B35]" />
          <span>{taskRunToast}</span>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs text-[#8B93A1] hover:text-[#F5F5F7] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Agents</span>
        </Link>

        {/* State simulation test triggers */}
        <div className="flex items-center gap-1.5 bg-[#111318] p-1 rounded-lg border border-[#242832] text-xs">
          <span className="text-[10px] font-mono text-[#8B93A1] px-2 uppercase">
            State preview:
          </span>
          <button
            type="button"
            onClick={() => {
              setCurrentStatus('running');
              setShowErrorBanner(false);
            }}
            className={`px-2 py-0.5 rounded text-[11px] font-mono cursor-pointer transition-colors ${
              currentStatus === 'running' && !showErrorBanner
                ? 'bg-[#32D583]/15 text-[#32D583] border border-[#32D583]/30'
                : 'text-[#8B93A1] hover:text-white'
            }`}
          >
            Running
          </button>
          <button
            type="button"
            onClick={() => {
              setCurrentStatus('paused');
              setShowErrorBanner(false);
            }}
            className={`px-2 py-0.5 rounded text-[11px] font-mono cursor-pointer transition-colors ${
              currentStatus === 'paused'
                ? 'bg-[#F5B544]/15 text-[#F5B544] border border-[#F5B544]/30'
                : 'text-[#8B93A1] hover:text-white'
            }`}
          >
            Paused
          </button>
          <button
            type="button"
            onClick={() => {
              setShowErrorBanner(true);
              setCurrentStatus('failed');
            }}
            className={`px-2 py-0.5 rounded text-[11px] font-mono cursor-pointer transition-colors ${
              showErrorBanner
                ? 'bg-[#F04438]/15 text-[#F04438] border border-[#F04438]/30'
                : 'text-[#8B93A1] hover:text-white'
            }`}
          >
            Simulate Error
          </button>
        </div>
      </div>

      {/* Top Header Card */}
      <div className="bg-[#111318] border border-[#242832] rounded-xl p-5 md:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="text-xs font-mono uppercase tracking-wider text-[#8B93A1]">
                {agent.category}
              </span>
              <span className="text-[#242832]">/</span>
              {/* Dynamic Status Pill */}
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border ${
                  currentStatus === 'running'
                    ? 'bg-[#32D583]/10 text-[#32D583] border-[#32D583]/30'
                    : currentStatus === 'paused'
                    ? 'bg-[#F5B544]/10 text-[#F5B544] border-[#F5B544]/30'
                    : 'bg-[#F04438]/10 text-[#F04438] border-[#F04438]/30'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    currentStatus === 'running'
                      ? 'bg-[#32D583] animate-pulse'
                      : currentStatus === 'paused'
                      ? 'bg-[#F5B544]'
                      : 'bg-[#F04438]'
                  }`}
                />
                <span>
                  {currentStatus === 'running'
                    ? '● Running'
                    : currentStatus === 'paused'
                    ? '❚❚ Paused'
                    : '× Failed'}
                </span>
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-[#F5F5F7] tracking-tight">
              {agent.name}
            </h1>

            <p className="text-sm text-[#8B93A1] mt-1.5 max-w-2xl leading-relaxed">
              Finds and qualifies high-potential SaaS prospects and prepares them for CRM review.
            </p>
          </div>

          {/* Top-Right Actions: Pause, Run task, ••• */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={toggleStatus}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                currentStatus === 'running'
                  ? 'bg-[#171A21] hover:bg-[#242832] text-[#F5F5F7] border-[#242832]'
                  : 'bg-[#32D583] hover:bg-[#28B870] text-[#08090C] font-semibold border-transparent'
              }`}
            >
              {currentStatus === 'running' ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#F5B544]" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Resume</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleRunTask}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FF6B35] hover:bg-[#E95724] text-[#08090C] text-xs font-semibold transition-colors shadow-lg shadow-[#FF6B35]/25 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run task</span>
            </button>

            {/* Overflow menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 rounded-lg bg-[#171A21] hover:bg-[#242832] border border-[#242832] text-[#8B93A1] hover:text-[#F5F5F7] transition-colors cursor-pointer"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {showMenu && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setShowMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 rounded-lg bg-[#171A21] border border-[#242832] shadow-2xl py-1 z-40 text-xs text-[#F5F5F7] animate-in fade-in zoom-in-95 duration-100 font-sans">
                    <Link
                      href={`/dashboard/agents/${agent.id}/activity`}
                      onClick={() => setShowMenu(false)}
                      className="w-full px-3.5 py-2 text-left hover:bg-[#242832] flex items-center gap-2 block"
                    >
                      <Clock className="w-3.5 h-3.5 text-[#FF6B35]" />
                      <span>Live execution view</span>
                    </Link>
                    <Link
                      href="/dashboard/agents/new"
                      onClick={() => setShowMenu(false)}
                      className="w-full px-3.5 py-2 text-left hover:bg-[#242832] flex items-center gap-2 block"
                    >
                      <Settings className="w-3.5 h-3.5 text-[#8B93A1]" />
                      <span>Edit in Agent Builder</span>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Error State Banner if simulated error active */}
      {showErrorBanner && (
        <AgentErrorStateBanner
          agentName={agent.name}
          onRetry={() => {
            setShowErrorBanner(false);
            setCurrentStatus('running');
          }}
          onReconnect={() => {
            setShowErrorBanner(false);
            setCurrentStatus('running');
          }}
          onViewDetails={() => alert('Diagnostic details: Connection timed out on HubSpot REST API v3 endpoint: /crm/v3/objects/contacts.')}
        />
      )}

      {/* Paused State Banner if agent paused */}
      {currentStatus === 'paused' && !showErrorBanner && (
        <AgentPausedStateBanner
          agentName={agent.name}
          pausedBy="James"
          reason="Waiting for updated qualification criteria."
          onResume={() => setCurrentStatus('running')}
          onEditAgent={() => alert('Navigating to agent configuration...')}
        />
      )}

      {/* Agent Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl bg-[#111318] border border-[#242832] shadow-md">
          <div className="text-[11px] font-mono uppercase text-[#8B93A1] tracking-wider mb-1">
            Tasks completed
          </div>
          <div className="text-2xl font-bold font-mono text-[#F5F5F7]">
            284
          </div>
          <div className="text-[10px] text-[#32D583] mt-1 font-mono flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+18.4% vs last month</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#111318] border border-[#242832] shadow-md">
          <div className="text-[11px] font-mono uppercase text-[#8B93A1] tracking-wider mb-1">
            Success rate
          </div>
          <div className="text-2xl font-bold font-mono text-[#32D583]">
            97.2%
          </div>
          <div className="text-[10px] text-[#8B93A1] mt-1 font-mono">
            Autonomous execution
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#111318] border border-[#242832] shadow-md">
          <div className="text-[11px] font-mono uppercase text-[#8B93A1] tracking-wider mb-1">
            Time saved
          </div>
          <div className="text-2xl font-bold font-mono text-[#FF6B35]">
            46h
          </div>
          <div className="text-[10px] text-[#8B93A1] mt-1 font-mono">
            ~11.5h / week saved
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#111318] border border-[#242832] shadow-md">
          <div className="text-[11px] font-mono uppercase text-[#8B93A1] tracking-wider mb-1">
            Last active
          </div>
          <div className="text-2xl font-bold font-mono text-[#F5F5F7]">
            2 min ago
          </div>
          <div className="text-[10px] text-[#32D583] mt-1 font-mono flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Active sync verified</span>
          </div>
        </div>
      </div>

      {/* Prominent Current Running Task Card */}
      <CurrentTaskCard
        agentId={agent.id}
        agentName={agent.name}
        title="Find qualified SaaS prospects"
        startedAt="10:42 AM"
        runningFor="4m 21s"
        processedCount={18}
        totalCount={38}
        unitLabel="companies analyzed"
        currentAction="Analyzing company websites"
        nextAction="Identifying decision makers"
      />

      {/* Agent Workflow Display (Phase 2 preview) */}
      <AgentWorkflowPreview />

      {/* Run History Table */}
      <AgentRunHistoryTable runs={runs} agentName={agent.name} />

      {/* Phase 4: Agent Intelligence Section (Metrics, 7d/30d/90d Performance, Execution Quality, What Nima Learned) */}
      <AgentIntelligenceSection agentId={agent.id} agentName={agent.name} />

      {/* Phase 4: Agent Memory Section (Persistent context: ICP, Qualification, Preferred markets, Sales terminology) */}
      <AgentMemorySection agentId={agent.id} />

      {/* Phase 4: Connected Agent Knowledge */}
      <AgentKnowledgeSection agentName={agent.name} />
    </div>
  );
}
