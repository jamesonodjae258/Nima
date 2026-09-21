'use client';

import React from 'react';
import { AlertTriangle, PauseCircle, CheckCircle2, XCircle, RefreshCw, Link as LinkIcon, ExternalLink, Play } from 'lucide-react';

interface ErrorStateBannerProps {
  agentName?: string;
  failedStep?: string;
  errorMessage?: string;
  completedSteps?: string[];
  onRetry?: () => void;
  onReconnect?: () => void;
  onViewDetails?: () => void;
}

export function AgentErrorStateBanner({
  agentName = 'Lead Researcher',
  failedStep = 'HubSpot update',
  errorMessage = 'Unable to connect to HubSpot. Nima could not complete the final action.',
  completedSteps = ['Research', 'Analysis', 'Qualification', 'Enrichment'],
  onRetry,
  onReconnect,
  onViewDetails,
}: ErrorStateBannerProps) {
  return (
    <div className="bg-[#111318] border border-[#F04438]/40 rounded-xl p-5 md:p-6 shadow-2xl relative overflow-hidden">
      {/* Red ambient warning corner glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#F04438]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-[#F04438]/15 border border-[#F04438]/30 text-[#F04438] shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono uppercase tracking-wider text-[#F04438] font-semibold">
                AGENT PAUSED • ACTION REQUIRED
              </span>
            </div>
            <h3 className="text-lg font-semibold text-[#F5F5F7] tracking-tight">
              {errorMessage}
            </h3>
            <p className="text-xs text-[#8B93A1] mt-1 max-w-xl">
              Execution safely suspended at final write step. All previous research and enrichment data has been preserved in local state.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onRetry}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#F04438] hover:bg-[#D9382E] text-white text-xs font-medium transition-colors shadow-lg shadow-[#F04438]/20 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry</span>
          </button>
          <button
            type="button"
            onClick={onReconnect}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#171A21] hover:bg-[#242832] text-[#F5F5F7] border border-[#242832] text-xs font-medium transition-colors cursor-pointer"
          >
            <LinkIcon className="w-3.5 h-3.5 text-[#FF6B35]" />
            <span>Reconnect HubSpot</span>
          </button>
          <button
            type="button"
            onClick={onViewDetails}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[#8B93A1] hover:text-[#F5F5F7] text-xs font-medium transition-colors cursor-pointer"
          >
            <span>View details</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Step Breakdown Statuses */}
      <div className="pt-4 border-t border-[#242832]/60 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <div className="text-[11px] font-mono uppercase text-[#8B93A1] tracking-wider mb-2">
            Previous steps completed:
          </div>
          <div className="flex flex-wrap gap-2">
            {completedSteps.map((step, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#08090C] border border-[#32D583]/20 text-[#32D583] text-xs font-mono"
              >
                <CheckCircle2 className="w-3 h-3 text-[#32D583]" />
                {step}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[11px] font-mono uppercase text-[#8B93A1] tracking-wider mb-2">
            Failed action:
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#F04438]/10 border border-[#F04438]/30 text-[#F04438] text-xs font-mono">
            <XCircle className="w-3 h-3 text-[#F04438]" />
            {failedStep}
          </span>
        </div>
      </div>
    </div>
  );
}

interface PausedStateBannerProps {
  agentName?: string;
  pausedBy?: string;
  reason?: string;
  onResume?: () => void;
  onEditAgent?: () => void;
}

export function AgentPausedStateBanner({
  agentName = 'Lead Researcher',
  pausedBy = 'James',
  reason = 'Waiting for updated qualification criteria.',
  onResume,
  onEditAgent,
}: PausedStateBannerProps) {
  return (
    <div className="bg-[#111318] border border-[#F5B544]/40 rounded-xl p-5 md:p-6 shadow-xl relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-[#F5B544]/15 border border-[#F5B544]/30 text-[#F5B544] shrink-0 mt-0.5">
            <PauseCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono uppercase tracking-wider text-[#F5B544] font-semibold">
                AGENT PAUSED
              </span>
              <span className="text-[#242832]">|</span>
              <span className="text-xs text-[#8B93A1]">
                Paused by <strong className="text-[#F5F5F7]">{pausedBy}</strong>
              </span>
            </div>
            <h3 className="text-base font-semibold text-[#F5F5F7] tracking-tight">
              {reason}
            </h3>
            <p className="text-xs text-[#8B93A1] mt-0.5">
              Task execution and scheduled triggers are temporarily held. Resuming will continue from the current checkpoint.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onResume}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#32D583] hover:bg-[#28B870] text-[#08090C] font-semibold text-xs transition-colors shadow-lg shadow-[#32D583]/20 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-[#08090C]" />
            <span>Resume</span>
          </button>
          <button
            type="button"
            onClick={onEditAgent}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#171A21] hover:bg-[#242832] text-[#F5F5F7] border border-[#242832] text-xs font-medium transition-colors cursor-pointer"
          >
            <span>Edit agent</span>
          </button>
        </div>
      </div>
    </div>
  );
}
