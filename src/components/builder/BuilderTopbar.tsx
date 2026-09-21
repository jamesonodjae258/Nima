'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Settings, Play, Check, AlertCircle, Clock, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { BuilderPhase } from '@/types';
import { cn } from '@/lib/utils';

interface BuilderTopbarProps {
  agentName: string;
  agentType: string;
  phase: BuilderPhase;
  onOpenSettings: () => void;
  onRunAgent: () => void;
  onSaveDraft: () => void;
  isDraftSaved: boolean;
  validationError?: string | null;
}

export const BuilderTopbar: React.FC<BuilderTopbarProps> = ({
  agentName,
  agentType,
  phase,
  onOpenSettings,
  onRunAgent,
  onSaveDraft,
  isDraftSaved,
  validationError,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const isRunning = phase === 'running' || phase === 'waiting_approval';
  const isCompleted = phase === 'completed';

  return (
    <div className="h-16 border-b border-[#242832] bg-[#08090C]/90 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Back + Agent Title + Badges */}
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/agents"
          className="p-1.5 rounded-lg text-[#8B93A1] hover:text-[#F5F5F7] hover:bg-[#171A21] transition-colors"
          title="Back to Agents"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>

        <div className="h-4 w-[1px] bg-[#242832] hidden sm:block" />

        <div className="flex items-center gap-2.5">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-semibold text-[#F5F5F7] tracking-tight">
                {agentName}
              </h1>
              <button
                type="button"
                onClick={onOpenSettings}
                className="p-1 rounded text-[#5C6370] hover:text-[#8B93A1] hover:bg-[#171A21] transition-colors"
                title="Agent Settings"
              >
                <Settings className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#8B93A1]">
              <span className="font-mono">{agentType}</span>
              <span>•</span>
              <span>Autonomous Workflow</span>
            </div>
          </div>

          {/* Status Badge */}
          {isRunning ? (
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FF6B35]/15 border border-[#FF6B35]/30 text-[11px] font-medium text-[#FFB49B]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-ping" />
              <span>{phase === 'waiting_approval' ? 'Waiting Approval' : 'Running'}</span>
            </span>
          ) : isCompleted ? (
            <Badge variant="success" size="sm" className="hidden sm:inline-flex">
              <Check className="w-3 h-3 mr-1" />
              Completed
            </Badge>
          ) : (
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#171A21] text-[#8B93A1] border border-[#242832] text-[10px] font-mono">
              Draft
            </span>
          )}
        </div>
      </div>

      {/* Right: Save draft + Run Agent CTA */}
      <div className="flex items-center gap-2 sm:gap-3">
        <Button
          variant="secondary"
          size="sm"
          onClick={onSaveDraft}
          disabled={isRunning}
          className="text-xs"
        >
          {isDraftSaved ? (
            <>
              <Check className="w-3 h-3 mr-1 text-[#32D583]" />
              <span>Saved</span>
            </>
          ) : (
            <span>Save draft</span>
          )}
        </Button>

        {/* Primary Run Agent CTA with validation checking */}
        <div
          className="relative"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <Button
            size="sm"
            onClick={onRunAgent}
            disabled={isRunning || !!validationError}
            className={cn(
              'font-medium shadow-[0_0_15px_rgba(255,107,53,0.3)] text-xs',
              validationError && 'opacity-60 cursor-not-allowed'
            )}
          >
            {isRunning ? (
              <>
                <Clock className="w-3.5 h-3.5 mr-1 animate-spin text-[#08090C]" />
                <span>Executing...</span>
              </>
            ) : isCompleted ? (
              <>
                <Play className="w-3.5 h-3.5 mr-1" />
                <span>Run again</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 mr-1 fill-current" />
                <span>Run agent</span>
              </>
            )}
          </Button>

          {/* Validation Warning Tooltip */}
          {validationError && showTooltip && !isRunning && (
            <div className="absolute right-0 mt-2 w-72 p-2.5 rounded-lg bg-[#171A21] border border-[#F5B544]/40 shadow-xl z-50 text-[11px] text-[#F5B544] flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{validationError}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
