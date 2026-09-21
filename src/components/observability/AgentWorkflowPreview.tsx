'use client';

import React, { useState } from 'react';
import { Check, Circle, ArrowRight, X, Sliders, ShieldCheck, Database, Search, Target } from 'lucide-react';

export interface WorkflowStepSummary {
  id: string;
  name: string;
  status: 'completed' | 'current' | 'pending';
  iconGlyph: '✓' | '●' | '○';
  type: string;
  description: string;
  configSummary: {
    label: string;
    value: string;
  }[];
}

const defaultWorkflowSteps: WorkflowStepSummary[] = [
  {
    id: 'step-research',
    name: 'Research',
    status: 'completed',
    iconGlyph: '✓',
    type: 'Source Discovery',
    description: 'Finds recently funded SaaS companies with >$5M in Series A or B funding.',
    configSummary: [
      { label: 'Sources', value: 'Company websites, Venture databases, Public filings' },
      { label: 'Target Headcount', value: '50 – 500 employees' },
      { label: 'Frequency', value: 'Continuous background crawl' },
    ],
  },
  {
    id: 'step-analyze',
    name: 'Analyze',
    status: 'completed',
    iconGlyph: '✓',
    type: 'Website & Model Verification',
    description: 'Inspects corporate websites, pricing schemes, and customer segments to verify B2B business models.',
    configSummary: [
      { label: 'Depth', value: 'Standard deep-link crawl' },
      { label: 'Threshold', value: '85% confidence score' },
      { label: 'Filters', value: 'Excludes B2C & Agencies' },
    ],
  },
  {
    id: 'step-qualify',
    name: 'Qualify',
    status: 'current',
    iconGlyph: '●',
    type: 'ICP Scoring Engine',
    description: 'Scores target accounts against enterprise Ideal Customer Profile parameters and growth velocity.',
    configSummary: [
      { label: 'Target Geography', value: 'North America, Europe' },
      { label: 'Min Score', value: '80 / 100 threshold' },
      { label: 'Revenue Indicator', value: 'Series A / B within last 12 mo' },
    ],
  },
  {
    id: 'step-enrich',
    name: 'Enrich',
    status: 'pending',
    iconGlyph: '○',
    type: 'Executive Contact Discovery',
    description: 'Resolves key decision maker contacts: VP Sales, CRO, Head of Growth, with deliverable work emails.',
    configSummary: [
      { label: 'Roles', value: 'VP Sales, CRO, Head of Growth' },
      { label: 'Verification', value: 'MX lookup + 100% email validation' },
      { label: 'Max per Account', value: '2 primary decision makers' },
    ],
  },
  {
    id: 'step-approval',
    name: 'Approval',
    status: 'pending',
    iconGlyph: '○',
    type: 'Human-in-the-Loop Gate',
    description: 'Halts autonomous execution before modifying external CRM records and requests manual review.',
    configSummary: [
      { label: 'Condition', value: 'Requires admin approval before CRM write' },
      { label: 'Approver', value: 'James (Workspace Admin)' },
      { label: 'Timeout', value: '24 hours before escalating' },
    ],
  },
  {
    id: 'step-hubspot',
    name: 'HubSpot',
    status: 'pending',
    iconGlyph: '○',
    type: 'CRM Record Sync',
    description: 'Pushes enriched company dossiers and verified decision makers directly into HubSpot pipelines.',
    configSummary: [
      { label: 'Destination', value: 'HubSpot Contacts & Companies' },
      { label: 'Tag', value: 'Nima Prospect - Q3 SaaS' },
      { label: 'Fields Mapped', value: '6 properties synchronized' },
    ],
  },
];

export function AgentWorkflowPreview({
  steps = defaultWorkflowSteps,
}: {
  steps?: WorkflowStepSummary[];
}) {
  const [selectedStep, setSelectedStep] = useState<WorkflowStepSummary | null>(null);

  return (
    <div className="bg-[#111318] border border-[#242832] rounded-xl p-5 md:p-6 shadow-xl relative">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-[#F5F5F7] tracking-tight">
            Agent Workflow
          </h3>
          <p className="text-xs text-[#8B93A1]">
            Visual sequence configured in Agent Builder. Click any step to inspect rules.
          </p>
        </div>
        <div className="text-[11px] font-mono text-[#8B93A1] bg-[#171A21] px-2.5 py-1 rounded border border-[#242832]">
          Step 3 of 6 active
        </div>
      </div>

      {/* Horizontal Steps Pipeline */}
      <div className="overflow-x-auto pb-2 scrollbar-thin">
        <div className="flex items-center gap-2 min-w-max py-2">
          {steps.map((step, idx) => {
            const isCompleted = step.status === 'completed';
            const isCurrent = step.status === 'current';
            const isPending = step.status === 'pending';
            const isSelected = selectedStep?.id === step.id;

            return (
              <React.Fragment key={step.id}>
                {/* Node Box */}
                <button
                  type="button"
                  onClick={() => setSelectedStep(step)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg border text-left transition-all cursor-pointer relative ${
                    isCurrent
                      ? 'bg-[#FF6B35]/15 border-[#FF6B35] shadow-lg shadow-[#FF6B35]/20 ring-1 ring-[#FF6B35]/50'
                      : isCompleted
                      ? 'bg-[#171A21] border-[#242832] hover:border-[#8B93A1]/40'
                      : 'bg-[#171A21]/40 border-[#242832]/60 hover:border-[#242832] opacity-70 hover:opacity-100'
                  } ${isSelected ? 'ring-2 ring-white/40' : ''}`}
                >
                  {/* Status Glyph Icon */}
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center font-mono text-xs font-semibold shrink-0 ${
                      isCompleted
                        ? 'bg-[#32D583]/15 text-[#32D583] border border-[#32D583]/30'
                        : isCurrent
                        ? 'bg-[#FF6B35] text-[#08090C] font-bold animate-pulse'
                        : 'bg-[#242832] text-[#8B93A1]'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    ) : isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-[#08090C] animate-ping" />
                    ) : (
                      <Circle className="w-2.5 h-2.5" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-xs font-medium tracking-tight ${
                          isCurrent
                            ? 'text-white font-semibold'
                            : isCompleted
                            ? 'text-[#F5F5F7]'
                            : 'text-[#8B93A1]'
                        }`}
                      >
                        {step.name}
                      </span>
                      <span className="font-mono text-[11px] text-[#8B93A1]">
                        {step.iconGlyph}
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-[#8B93A1]/70">
                      {isCompleted ? 'Finished' : isCurrent ? 'Active now' : 'Queued'}
                    </div>
                  </div>
                </button>

                {/* Arrow separator */}
                {idx < steps.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-[#242832] shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Step Detail Drawer / Modal on Step Click */}
      {selectedStep && (
        <div className="mt-4 p-4 rounded-lg bg-[#08090C] border border-[#242832] relative animate-in fade-in slide-in-from-top-2 duration-200">
          <button
            type="button"
            onClick={() => setSelectedStep(null)}
            className="absolute top-3 right-3 p-1 rounded-md text-[#8B93A1] hover:text-white hover:bg-[#171A21] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-xs text-[#FF6B35] font-semibold uppercase">
              Configuration Details
            </span>
            <span className="text-[#242832]">/</span>
            <span className="text-xs font-semibold text-[#F5F5F7]">
              {selectedStep.name} Step
            </span>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded border ml-2 ${
                selectedStep.status === 'completed'
                  ? 'bg-[#32D583]/10 text-[#32D583] border-[#32D583]/20'
                  : selectedStep.status === 'current'
                  ? 'bg-[#FF6B35]/10 text-[#FF6B35] border-[#FF6B35]/20'
                  : 'bg-[#242832] text-[#8B93A1] border-[#242832]'
              }`}
            >
              {selectedStep.status.toUpperCase()}
            </span>
          </div>

          <p className="text-xs text-[#8B93A1] mb-3 max-w-2xl">
            {selectedStep.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-[#242832]/60">
            {selectedStep.configSummary.map((item, i) => (
              <div key={i} className="p-2.5 rounded bg-[#111318] border border-[#242832]">
                <div className="text-[10px] font-mono uppercase text-[#8B93A1] tracking-wider mb-1">
                  {item.label}
                </div>
                <div className="text-xs text-[#F5F5F7] font-medium truncate" title={item.value}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
