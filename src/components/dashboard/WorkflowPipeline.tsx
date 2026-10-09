'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Target, Cpu, GitMerge, Zap, CheckCircle2, ArrowRight, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

export const WorkflowPipeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(4); // currently on Action stage

  const stages = [
    {
      step: 1,
      name: 'GOAL',
      label: 'Objective Defined',
      desc: 'Find qualified SaaS prospects with >$10M ARR',
      icon: <Target className="w-4 h-4" />,
      tag: 'Input',
    },
    {
      step: 2,
      name: 'AGENT',
      label: 'Agent Assigned',
      desc: 'Lead Researcher (Core v2.4)',
      icon: <Cpu className="w-4 h-4" />,
      tag: 'Autonomous',
    },
    {
      step: 3,
      name: 'WORKFLOW',
      label: 'Multi-Step Execution',
      desc: 'Enrichment, MX verification & CRM schema match',
      icon: <GitMerge className="w-4 h-4" />,
      tag: '4 Steps',
    },
    {
      step: 4,
      name: 'ACTION',
      label: 'Tool Operations',
      desc: 'Syncing verified records to HubSpot CRM',
      icon: <Zap className="w-4 h-4" />,
      tag: 'Active',
      isLive: true,
    },
    {
      step: 5,
      name: 'RESULT',
      label: 'Verified Outcome',
      desc: '38 enterprise leads ready for SDR outreach',
      icon: <CheckCircle2 className="w-4 h-4" />,
      tag: 'Output',
    },
  ];

  return (
    <Card className="p-5 overflow-hidden border-white/[0.08] bg-gradient-to-b from-[#111318] to-[#0D0F14] shadow-[0_15px_40px_rgba(0,0,0,0.6)] relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF6B35] animate-pulse" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8B93A1] font-mono">
              Live Core Architecture
            </h4>
          </div>
          <p className="text-sm font-medium text-[#F5F5F7] mt-0.5">
            Autonomous Execution: <span className="text-[#FFB49B]">GOAL → AGENT → WORKFLOW → ACTION → RESULT</span>
          </p>
        </div>

        {/* Real-Time Waveform Equalizer Telemetry */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#08090C] border border-white/[0.06] font-mono text-[11px] text-[#32D583]">
            <div className="flex items-end gap-0.5 h-3.5 mr-1.5" aria-hidden="true">
              <span className="w-0.5 bg-[#32D583] animate-[waveform-bounce_1.2s_ease-in-out_infinite_0.1s] rounded-full" />
              <span className="w-0.5 bg-[#32D583] animate-[waveform-bounce_1.2s_ease-in-out_infinite_0.4s] rounded-full" />
              <span className="w-0.5 bg-[#32D583] animate-[waveform-bounce_1.2s_ease-in-out_infinite_0.2s] rounded-full" />
              <span className="w-0.5 bg-[#32D583] animate-[waveform-bounce_1.2s_ease-in-out_infinite_0.5s] rounded-full" />
            </div>
            <span>Kernel 42 t/s</span>
          </div>

          <div className="text-[11px] text-[#5C6370] bg-[#171A21] px-2.5 py-1.5 rounded-lg border border-white/[0.06] font-mono">
            Pipeline #NIMA-8492
          </div>
        </div>
      </div>

      {/* Pipeline Stages Strip with Traveling Laser Beam */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
        {/* State-Aware Connector Line for Desktop */}
        <div className="hidden md:block absolute top-[28px] left-10 right-10 h-[2px] z-0 pointer-events-none">
          <div className="w-full h-full bg-[#1C2028] rounded-full" />
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#32D583] via-[#32D583] to-[#FF6B35] rounded-full shadow-[0_0_8px_rgba(255,107,53,0.35)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              width: `${((activeStep - 1) / (stages.length - 1)) * 100}%`,
            }}
          />
          {activeStep > 1 && (
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#FFA07A] shadow-[0_0_10px_2px_rgba(255,107,53,0.7)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                left: `${((activeStep - 1) / (stages.length - 1)) * 100}%`,
              }}
            />
          )}
        </div>

        {stages.map((stage, idx) => {
          const isSelected = activeStep === stage.step;
          return (
            <div
              key={stage.step}
              onClick={() => setActiveStep(stage.step)}
              className={cn(
                'relative z-10 p-4 rounded-xl border transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer text-left group select-none',
                isSelected
                  ? 'bg-[#171A21] border-[#FF6B35] shadow-[0_0_25px_rgba(255,107,53,0.2)] scale-[1.02]'
                  : 'bg-[#0E1015]/90 border-white/[0.06] hover:border-white/[0.15] hover:bg-[#111318]'
              )}
            >
              {/* Concentric Ping on Selected Stage */}
              {isSelected && (
                <div className="absolute -inset-1 rounded-xl border border-[#FF6B35]/30 animate-concentric-ping pointer-events-none" />
              )}

              {/* Step indicator header */}
              <div className="flex items-center justify-between mb-2.5">
                <div
                  className={cn(
                    'w-7 h-7 rounded-lg flex items-center justify-center text-xs transition-colors duration-300',
                    isSelected
                      ? 'bg-[#FF6B35] text-[#08090C] font-bold shadow-[0_0_12px_rgba(255,107,53,0.5)]'
                      : 'bg-[#171A21] text-[#8B93A1] border border-white/[0.06]'
                  )}
                >
                  {stage.icon}
                </div>
                <span
                  className={cn(
                    'text-[10px] uppercase font-mono font-semibold px-2 py-0.5 rounded transition-colors',
                    stage.isLive
                      ? 'bg-[#FF6B35]/20 text-[#FFB49B] border border-[#FF6B35]/40 shadow-[0_0_8px_rgba(255,107,53,0.2)]'
                      : 'bg-[#171A21] text-[#5C6370] border border-white/[0.04]'
                  )}
                >
                  {stage.tag}
                </span>
              </div>

              {/* Title & Stage Name */}
              <div className="text-[10px] font-mono tracking-widest text-[#5C6370] uppercase">
                {stage.name}
              </div>
              <div className="text-xs font-semibold text-[#F5F5F7] mt-0.5 group-hover:text-white transition-colors">
                {stage.label}
              </div>
              <div className="text-[11px] text-[#8B93A1] mt-1 line-clamp-2 leading-relaxed">
                {stage.desc}
              </div>

              {/* Connector indicator on desktop */}
              {idx < stages.length - 1 && (
                <div className="hidden md:block absolute -right-2 top-7 -translate-y-1/2 z-20 text-[#242832] group-hover:text-[#FF6B35] transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

