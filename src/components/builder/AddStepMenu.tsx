'use client';

import React, { useState } from 'react';
import { Plus, Search, BarChart3, Target, Users, FileText, Send, RefreshCw, Clock, ShieldAlert } from 'lucide-react';
import { WorkflowStepType } from '@/types';
import { cn } from '@/lib/utils';

interface AddStepMenuProps {
  onAddStep: (type: WorkflowStepType) => void;
  index: number;
}

export const AddStepMenu: React.FC<AddStepMenuProps> = ({ onAddStep, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  const stepOptions: { type: WorkflowStepType; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      type: 'research',
      label: 'Research',
      desc: 'Query search feeds, databases, and company domains',
      icon: <Search className="w-3.5 h-3.5 text-[#FF6B35]" />,
    },
    {
      type: 'analyze',
      label: 'Analyze',
      desc: 'Synthesize unstructured content and identify patterns',
      icon: <BarChart3 className="w-3.5 h-3.5 text-[#FFB49B]" />,
    },
    {
      type: 'qualify',
      label: 'Qualify',
      desc: 'Filter entities against target rules and ICP thresholds',
      icon: <Target className="w-3.5 h-3.5 text-[#32D583]" />,
    },
    {
      type: 'enrich',
      label: 'Enrich',
      desc: 'Append decision makers, emails, and firmographics',
      icon: <Users className="w-3.5 h-3.5 text-[#FF6B35]" />,
    },
    {
      type: 'generate',
      label: 'Generate',
      desc: 'Draft personalized outreach copy or custom briefs',
      icon: <FileText className="w-3.5 h-3.5 text-[#FFB49B]" />,
    },
    {
      type: 'send',
      label: 'Send',
      desc: 'Dispatch emails, Slack notifications, or webhooks',
      icon: <Send className="w-3.5 h-3.5 text-[#32D583]" />,
    },
    {
      type: 'update',
      label: 'Update',
      desc: 'Write records into CRM, databases, or sheets',
      icon: <RefreshCw className="w-3.5 h-3.5 text-[#32D583]" />,
    },
    {
      type: 'wait',
      label: 'Wait',
      desc: 'Delay workflow until scheduled time or trigger event',
      icon: <Clock className="w-3.5 h-3.5 text-[#8B93A1]" />,
    },
    {
      type: 'approval',
      label: 'Approval',
      desc: 'Pause execution and require manual human confirmation',
      icon: <ShieldAlert className="w-3.5 h-3.5 text-[#F5B544]" />,
    },
  ];

  return (
    <div className="relative flex flex-col items-center my-2 group z-10">
      {/* Vertical connector line */}
      <div className="w-[1px] h-4 bg-[#242832] group-hover:bg-[#FF6B35]/60 transition-colors" />

      {/* Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono border transition-all select-none',
          isOpen
            ? 'bg-[#FF6B35] text-[#08090C] font-semibold border-[#FF6B35] shadow-[0_0_12px_rgba(255,107,53,0.4)]'
            : 'bg-[#111318] text-[#8B93A1] border-[#242832] hover:border-[#FF6B35] hover:text-[#F5F5F7] hover:bg-[#171A21]'
        )}
      >
        <Plus className="w-3 h-3" />
        <span>Add step</span>
      </button>

      {/* Vertical connector line */}
      <div className="w-[1px] h-4 bg-[#242832] group-hover:bg-[#FF6B35]/60 transition-colors" />

      {/* Step Selection Popover */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-10 w-72 rounded-xl bg-[#111318] border border-[#242832] shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#5C6370] px-2.5 py-1 mb-1">
              Insert Workflow Step
            </div>
            <div className="space-y-0.5 max-h-64 overflow-y-auto">
              {stepOptions.map((opt) => (
                <button
                  key={opt.type}
                  type="button"
                  onClick={() => {
                    onAddStep(opt.type);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-start gap-2.5 p-2 rounded-lg hover:bg-[#171A21] text-left transition-colors group/item"
                >
                  <div className="w-6 h-6 rounded-md bg-[#0E1015] border border-[#242832] flex items-center justify-center shrink-0 mt-0.5 group-hover/item:border-[#FF6B35]/50">
                    {opt.icon}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#F5F5F7] group-hover/item:text-[#FFB49B] transition-colors">
                      {opt.label}
                    </div>
                    <div className="text-[10px] text-[#8B93A1] leading-tight mt-0.5">
                      {opt.desc}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
