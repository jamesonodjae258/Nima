'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Cpu, ArrowRight, Compass, CheckCircle2, GitMerge } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GoalInputSectionProps {
  goal: string;
  setGoal: (g: string) => void;
  onBuild: () => void;
  isGenerating: boolean;
  generatingStep: number; // 0: idle, 1: Understanding, 2: Designing, 3: Ready
}

export const GoalInputSection: React.FC<GoalInputSectionProps> = ({
  goal,
  setGoal,
  onBuild,
  isGenerating,
  generatingStep,
}) => {
  const examples = [
    {
      title: 'Research recently funded companies',
      prompt:
        'Find recently funded SaaS companies, identify the right decision makers, qualify them against our ICP, and add qualified prospects to HubSpot.',
    },
    {
      title: "Analyze this week's support tickets",
      prompt:
        'Analyze incoming customer support tickets, classify churn risks, detect billing keywords, and draft resolution pathways.',
    },
    {
      title: 'Find qualified leads for our sales team',
      prompt:
        'Identify B2B tech companies with 100-250 employees in North America, extract VP Sales contact info, and score against qualification criteria.',
    },
    {
      title: 'Prepare a weekly market report',
      prompt:
        'Monitor competitor pricing changes, scan industry changelogs, synthesize threats, and compile a weekly executive dossier in Notion.',
    },
  ];

  const generatingMessages = [
    '',
    'Understanding your goal...',
    'Designing the workflow...',
    'Your agent is ready.',
  ];

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6">
      {/* Header */}
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#8B93A1]">
          <Cpu className="w-3.5 h-3.5 text-[#FF6B35]" />
          <span>Agent Provisioning Pipeline</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#F5F5F7]">
          Create an agent
        </h1>
        <p className="text-sm text-[#8B93A1] max-w-md mx-auto">
          Tell Nima what you want accomplished.
        </p>
      </div>

      {/* Main Command Input Box or Generating State */}
      {isGenerating ? (
        <Card className="p-8 border-[#FF6B35]/40 bg-[#111318] shadow-[0_0_30px_rgba(255,107,53,0.15)] text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-[#FF6B35]/10 border border-[#FF6B35]/30 flex items-center justify-center mx-auto text-[#FF6B35]">
            {generatingStep === 1 && <Compass className="w-7 h-7 animate-spin text-[#FF6B35]" />}
            {generatingStep === 2 && <GitMerge className="w-7 h-7 animate-pulse text-[#FFB49B]" />}
            {generatingStep === 3 && <CheckCircle2 className="w-7 h-7 text-[#32D583]" />}
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-[#F5F5F7] tracking-tight transition-all">
              {generatingMessages[generatingStep] || 'Compiling agent...'}
            </h3>
            <p className="text-xs text-[#8B93A1] font-mono">
              Translating natural language intent into deterministic node pipeline
            </p>
          </div>

          {/* Stepper indicator dots */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <span
              className={cn(
                'w-2 h-2 rounded-full transition-colors',
                generatingStep >= 1 ? 'bg-[#FF6B35]' : 'bg-[#242832]'
              )}
            />
            <span
              className={cn(
                'w-2 h-2 rounded-full transition-colors',
                generatingStep >= 2 ? 'bg-[#FF6B35]' : 'bg-[#242832]'
              )}
            />
            <span
              className={cn(
                'w-2 h-2 rounded-full transition-colors',
                generatingStep >= 3 ? 'bg-[#32D583]' : 'bg-[#242832]'
              )}
            />
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card className="p-6 border-[#242832] bg-[#111318] focus-within:border-[#FF6B35]/60 focus-within:shadow-[0_0_20px_rgba(255,107,53,0.12)] transition-all">
            <label className="text-xs font-mono uppercase tracking-wider text-[#8B93A1] block mb-2 font-medium">
              What do you want Nima to accomplish?
            </label>
            <textarea
              rows={4}
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Find recently funded SaaS companies, identify the right decision makers, qualify them against our ICP, and add qualified prospects to HubSpot."
              className="w-full bg-transparent text-[#F5F5F7] placeholder-[#5C6370] text-sm sm:text-base outline-none resize-none leading-relaxed"
            />

            <div className="pt-4 border-t border-[#242832]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-[11px] text-[#5C6370] font-mono">
                Press Build agent to synthesize executable workflow
              </div>
              <Button
                size="md"
                onClick={onBuild}
                disabled={!goal.trim()}
                className="font-medium shadow-[0_0_15px_rgba(255,107,53,0.3)] shrink-0 self-end sm:self-auto"
              >
                <span>Build agent</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </Card>

          {/* Clickable Examples */}
          <div className="space-y-2.5">
            <div className="text-xs font-mono uppercase tracking-wider text-[#5C6370]">
              Examples
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {examples.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setGoal(item.prompt)}
                  className="p-3 rounded-xl bg-[#0E1015] border border-[#242832] hover:border-[#3D4454] hover:bg-[#141720] text-left transition-all duration-150 group"
                >
                  <div className="text-xs font-medium text-[#F5F5F7] group-hover:text-[#FFB49B] transition-colors flex items-center justify-between">
                    <span>{item.title}</span>
                    <ArrowRight className="w-3 h-3 text-[#5C6370] group-hover:text-[#FF6B35] opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                  <div className="text-[11px] text-[#8B93A1] mt-1 line-clamp-1">
                    {item.prompt}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
