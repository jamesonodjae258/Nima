'use client';

import React from 'react';
import Link from 'next/link';
import { AgentRunRecord } from '@/types';
import { CheckCircle2, ArrowRight, Clock, AlertCircle } from 'lucide-react';

interface AgentRunHistoryTableProps {
  runs: AgentRunRecord[];
  agentName?: string;
}

export function AgentRunHistoryTable({
  runs,
  agentName = 'Lead Researcher',
}: AgentRunHistoryTableProps) {
  if (!runs || runs.length === 0) {
    return (
      <div className="bg-[#111318] border border-[#242832] rounded-xl p-8 text-center">
        <Clock className="w-8 h-8 text-[#8B93A1]/50 mx-auto mb-2" />
        <h4 className="text-sm font-medium text-[#F5F5F7]">No run history</h4>
        <p className="text-xs text-[#8B93A1] mt-1">This agent has not executed any tasks yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#111318] border border-[#242832] rounded-xl p-5 md:p-6 shadow-xl relative">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-[#F5F5F7] tracking-tight">
            Run History
          </h3>
          <p className="text-xs text-[#8B93A1]">
            Recent automated executions by {agentName}. Click any run to inspect execution details.
          </p>
        </div>
        <span className="text-[11px] font-mono text-[#8B93A1]">
          {runs.length} runs recorded
        </span>
      </div>

      <div className="divide-y divide-[#242832]/60">
        {runs.map((run) => {
          const isCompleted = run.status === 'completed';
          const isFailed = run.status === 'failed';

          return (
            <Link
              key={run.id}
              href={`/dashboard/tasks/${run.taskId}`}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3.5 px-3 -mx-3 rounded-lg hover:bg-[#171A21]/70 transition-colors group cursor-pointer"
            >
              <div className="flex items-start sm:items-center gap-3">
                <div
                  className={`mt-0.5 sm:mt-0 w-6 h-6 rounded-md flex items-center justify-center font-mono text-xs shrink-0 ${
                    isCompleted
                      ? 'bg-[#32D583]/15 text-[#32D583] border border-[#32D583]/30'
                      : isFailed
                      ? 'bg-[#F04438]/15 text-[#F04438] border border-[#F04438]/30'
                      : 'bg-[#FF6B35]/15 text-[#FF6B35] border border-[#FF6B35]/30'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[#F5F5F7] group-hover:text-white transition-colors">
                      {run.taskTitle}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#08090C] text-[#32D583] border border-[#32D583]/20">
                      Completed ✓
                    </span>
                  </div>
                  <div className="text-xs text-[#8B93A1] mt-0.5">
                    {run.resultSummary}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 text-xs font-mono text-[#8B93A1] pl-9 sm:pl-0">
                <span className="text-[11px] text-[#8B93A1]">
                  {run.date}
                </span>
                <span className="text-[#242832] hidden sm:inline">|</span>
                <span className="text-[#F5F5F7]">
                  {run.duration}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#8B93A1] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
