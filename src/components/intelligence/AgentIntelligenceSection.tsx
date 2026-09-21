'use client';

import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import {
  mockExecutionQuality,
  mockAgentLearnings,
  mockPerformanceRangeData,
} from '@/data/mockData';
import {
  CheckCircle2,
  AlertTriangle,
  Clock,
  TrendingUp,
  Zap,
  ArrowRight,
  X,
  AlertCircle,
  HelpCircle,
  FileCheck,
} from 'lucide-react';

interface AgentIntelligenceSectionProps {
  agentId?: string;
  agentName?: string;
}

export function AgentIntelligenceSection({
  agentId = 'agent-1',
  agentName = 'Lead Researcher',
}: AgentIntelligenceSectionProps) {
  const [range, setRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [isMounted, setIsMounted] = useState(false);
  const [learningModalOpen, setLearningModalOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const quality = mockExecutionQuality[agentId] || mockExecutionQuality['agent-1'];
  const learning = mockAgentLearnings[agentId] || mockAgentLearnings['agent-1'];
  const chartData = mockPerformanceRangeData[range];

  const totalRuns = quality.successful + quality.needsReview + quality.failed;
  const successPct = ((quality.successful / totalRuns) * 100).toFixed(1);
  const reviewPct = ((quality.needsReview / totalRuns) * 100).toFixed(1);
  const failedPct = ((quality.failed / totalRuns) * 100).toFixed(1);

  return (
    <div className="bg-[#111318] border border-[#242832] rounded-xl p-5 md:p-6 shadow-xl relative space-y-6">
      {/* Section Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF6B35] font-semibold">
            Autonomous Observability
          </span>
          <span className="text-[#242832]">/</span>
          <span className="text-xs text-[#8B93A1]">Phase 4 Engine</span>
        </div>
        <h2 className="text-xl font-bold text-[#F5F5F7] tracking-tight">
          Agent intelligence
        </h2>
        <p className="text-xs text-[#8B93A1] mt-1">
          Understand how this agent is performing and what it has learned.
        </p>
      </div>

      {/* 4 Core Intelligence Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-[#171A21]/60 border border-[#242832]">
          <div className="flex items-center justify-between text-[#8B93A1] mb-1">
            <span className="text-[11px] font-mono uppercase tracking-wider">Success rate</span>
            <TrendingUp className="w-3.5 h-3.5 text-[#32D583]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#32D583]">
            97.2%
          </div>
          <div className="text-[10px] text-[#8B93A1] mt-0.5 font-mono">
            Autonomous execution
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#171A21]/60 border border-[#242832]">
          <div className="flex items-center justify-between text-[#8B93A1] mb-1">
            <span className="text-[11px] font-mono uppercase tracking-wider">Tasks completed</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B35]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#F5F5F7]">
            284
          </div>
          <div className="text-[10px] text-[#32D583] mt-0.5 font-mono">
            +18% velocity gain
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#171A21]/60 border border-[#242832]">
          <div className="flex items-center justify-between text-[#8B93A1] mb-1">
            <span className="text-[11px] font-mono uppercase tracking-wider">Average duration</span>
            <Clock className="w-3.5 h-3.5 text-[#F5B544]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#F5F5F7]">
            7m 12s
          </div>
          <div className="text-[10px] text-[#8B93A1] mt-0.5 font-mono">
            per qualified batch
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#171A21]/60 border border-[#242832]">
          <div className="flex items-center justify-between text-[#8B93A1] mb-1">
            <span className="text-[11px] font-mono uppercase tracking-wider">Time saved</span>
            <Zap className="w-3.5 h-3.5 text-[#FF6B35]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#FF6B35]">
            46h
          </div>
          <div className="text-[10px] text-[#32D583] mt-0.5 font-mono">
            vs manual SDR research
          </div>
        </div>
      </div>

      {/* Performance Visualization Section with 7d / 30d / 90d Range */}
      <div className="p-5 rounded-xl bg-[#08090C]/60 border border-[#242832]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-semibold text-[#F5F5F7] tracking-tight">
              Performance
            </h3>
            <p className="text-xs text-[#8B93A1] mt-0.5">
              Tasks completed, success rate, and average execution time over time.
            </p>
          </div>

          {/* Time range selector */}
          <div className="flex items-center bg-[#171A21] p-1 rounded-lg border border-[#242832] self-start sm:self-auto">
            {(['7d', '30d', '90d'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRange(r)}
                className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors cursor-pointer ${
                  range === r
                    ? 'bg-[#FF6B35] text-[#08090C] font-semibold shadow-sm'
                    : 'text-[#8B93A1] hover:text-[#F5F5F7]'
                }`}
              >
                {r === '7d' ? '7 days' : r === '30d' ? '30 days' : '90 days'}
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="h-56 w-full">
          {isMounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="intelThroughput" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#FF6B35" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#242832" vertical={false} />
                <XAxis dataKey="date" stroke="#8B93A1" fontSize={11} tickLine={false} axisLine={{ stroke: '#242832' }} />
                <YAxis stroke="#8B93A1" fontSize={11} tickLine={false} axisLine={{ stroke: '#242832' }} allowDecimals={false} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#171A21] border border-[#242832] p-2.5 rounded-lg shadow-xl text-xs font-mono">
                          <div className="text-[#8B93A1] mb-1">{label}</div>
                          <div className="text-[#F5F5F7] font-semibold flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#FF6B35]" />
                            <span>{payload[0].value} tasks completed</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="tasksCompleted"
                  stroke="#FF6B35"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#intelThroughput)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-xs font-mono text-[#8B93A1]">
              Loading performance trends...
            </div>
          )}
        </div>
      </div>

      {/* Execution Quality & Common Issues */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Execution Quality */}
        <div className="p-4 rounded-xl bg-[#171A21]/50 border border-[#242832] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-[#8B93A1] tracking-wider">
              Execution Quality
            </span>
            <span className="text-[11px] font-mono text-[#32D583]">
              {quality.successful} / {totalRuns} optimal
            </span>
          </div>

          {/* Tri-color proportional progress bar */}
          <div className="w-full bg-[#08090C] h-3 rounded-full overflow-hidden flex border border-[#242832]">
            <div
              style={{ width: `${successPct}%` }}
              className="bg-[#32D583] h-full"
              title={`Successful: ${quality.successful} (${successPct}%)`}
            />
            <div
              style={{ width: `${reviewPct}%` }}
              className="bg-[#F5B544] h-full"
              title={`Needs review: ${quality.needsReview} (${reviewPct}%)`}
            />
            <div
              style={{ width: `${failedPct}%` }}
              className="bg-[#F04438] h-full"
              title={`Failed: ${quality.failed} (${failedPct}%)`}
            />
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs pt-1">
            <div className="p-2 rounded bg-[#08090C] border border-[#242832]">
              <div className="text-[10px] text-[#8B93A1] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#32D583]" />
                <span>Successful</span>
              </div>
              <div className="text-base font-semibold font-mono text-[#32D583] mt-0.5">
                {quality.successful}
              </div>
            </div>

            <div className="p-2 rounded bg-[#08090C] border border-[#242832]">
              <div className="text-[10px] text-[#8B93A1] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5B544]" />
                <span>Needs review</span>
              </div>
              <div className="text-base font-semibold font-mono text-[#F5B544] mt-0.5">
                {quality.needsReview}
              </div>
            </div>

            <div className="p-2 rounded bg-[#08090C] border border-[#242832]">
              <div className="text-[10px] text-[#8B93A1] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F04438]" />
                <span>Failed</span>
              </div>
              <div className="text-base font-semibold font-mono text-[#F04438] mt-0.5">
                {quality.failed}
              </div>
            </div>
          </div>
        </div>

        {/* Common Issues */}
        <div className="p-4 rounded-xl bg-[#171A21]/50 border border-[#242832] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-[#8B93A1] tracking-wider">
              Common Issues
            </span>
            <span className="text-[11px] font-mono text-[#8B93A1]">
              Past 30 days
            </span>
          </div>

          <div className="space-y-2">
            {quality.commonIssues.map((issue) => (
              <div
                key={issue.id}
                className="flex items-center justify-between p-2.5 rounded-lg bg-[#08090C] border border-[#242832] text-xs"
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className={`w-3.5 h-3.5 ${
                    issue.severity === 'high' ? 'text-[#F04438]' : issue.severity === 'medium' ? 'text-[#F5B544]' : 'text-[#8B93A1]'
                  }`} />
                  <span className="text-[#F5F5F7] font-medium">{issue.label}</span>
                </div>
                <span className="font-mono text-xs text-[#8B93A1] bg-[#171A21] px-2 py-0.5 rounded border border-[#242832]">
                  {issue.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What Nima Learned Section */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-[#FF6B35]/10 via-[#171A21] to-[#111318] border border-[#FF6B35]/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#FF6B35]/20 text-[#FF6B35]">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#F5F5F7] tracking-tight">
                Empirical System Learnings
              </h3>
              <p className="text-[11px] text-[#8B93A1]">
                Synthesized patterns observed across recent task executions
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setLearningModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#FF6B35] hover:bg-[#E95724] text-[#08090C] text-xs font-semibold transition-colors shadow-lg shadow-[#FF6B35]/20 cursor-pointer self-start sm:self-auto"
          >
            <span>Review learning</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-xs text-[#F5F5F7] leading-relaxed">
          {learning.observation}
        </p>

        {/* Criteria Tags */}
        <div className="flex flex-wrap gap-2 pt-1">
          {learning.criteria.map((crit, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#08090C]/80 border border-[#FF6B35]/30 text-xs text-[#F5F5F7] font-medium"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#32D583]" />
              <span>{crit}</span>
            </span>
          ))}
        </div>

        {/* Source & Confidence Meta */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#8B93A1] pt-2 border-t border-[#242832]/60">
          <div className="flex items-center gap-1.5">
            <span className="text-[#8B93A1]/70 uppercase text-[10px]">Source:</span>
            <span className="text-[#F5F5F7]">{learning.source}</span>
          </div>
          <span className="text-[#242832]">|</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[#8B93A1]/70 uppercase text-[10px]">Confidence:</span>
            <span className="text-[#32D583] font-semibold">{learning.confidence} ({learning.confidencePercentage}%)</span>
          </div>
          <span className="text-[#242832]">|</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[#8B93A1]/70 uppercase text-[10px]">Sample:</span>
            <span className="text-[#F5F5F7]">{learning.sampleCount} tasks analyzed</span>
          </div>
        </div>
      </div>

      {/* Review Learning Modal */}
      {learningModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-[#111318] border border-[#242832] rounded-xl shadow-2xl p-6 relative space-y-4">
            <button
              type="button"
              onClick={() => setLearningModalOpen(false)}
              className="absolute top-4 right-4 text-[#8B93A1] hover:text-[#F5F5F7] p-1.5 rounded-lg hover:bg-[#171A21] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono text-[#FF6B35] uppercase tracking-wider font-semibold">
                Intelligence Review
              </span>
              <span className="text-[#242832]">/</span>
              <span className="text-xs text-[#8B93A1]">{agentName}</span>
            </div>

            <h3 className="text-lg font-bold text-[#F5F5F7]">
              Empirical Prospect Pattern
            </h3>

            <p className="text-xs text-[#8B93A1] leading-relaxed">
              Nima synthesized this pattern by correlating 284 completed outbound research tasks with verified CRM opportunities. Mid-market software companies in North America consistently yielded 2.4x higher pipeline acceptance.
            </p>

            <div className="p-3.5 rounded-lg bg-[#08090C] border border-[#242832] space-y-2 text-xs">
              <div className="font-semibold text-[#F5F5F7] font-mono text-[11px] uppercase text-[#8B93A1]">
                Ground Truth Evidence
              </div>
              <div className="flex justify-between text-[#8B93A1]">
                <span>Sample Size:</span>
                <span className="font-mono text-[#F5F5F7]">284 Tasks</span>
              </div>
              <div className="flex justify-between text-[#8B93A1]">
                <span>Verified Leads:</span>
                <span className="font-mono text-[#32D583]">1,482 Records</span>
              </div>
              <div className="flex justify-between text-[#8B93A1]">
                <span>Statistical Confidence:</span>
                <span className="font-mono text-[#FF6B35]">96.4%</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#242832] flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setLearningModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-[#171A21] hover:bg-[#242832] text-[#F5F5F7] text-xs font-medium transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setLearningModalOpen(false);
                  alert('Qualification criteria updated with learned parameters.');
                }}
                className="px-4 py-2 rounded-lg bg-[#FF6B35] hover:bg-[#E95724] text-[#08090C] text-xs font-semibold transition-colors cursor-pointer"
              >
                Apply to Agent Rules
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
