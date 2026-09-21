'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import {
  ArrowRight,
  Search,
  CheckCircle2,
  Layers,
  Database,
  ShieldCheck,
  Zap,
  Globe,
  Filter,
  Users,
  Check,
  Terminal,
} from 'lucide-react';
import { IslandButton } from '@/components/ui/IslandButton';

const PRESET_GOALS = [
  {
    id: 'sales',
    label: 'Outbound Prospecting',
    goal: 'Find recently funded SaaS companies, identify decision makers, qualify them against our ICP, and add the best prospects to HubSpot.',
    agent: 'Lead Researcher',
    nodes: [
      { name: 'Research', desc: 'Query funding databases & business registries', tool: 'Web Sources', icon: <Globe className="w-3.5 h-3.5" /> },
      { name: 'Filter', desc: 'Filter for modern cloud software architectures', tool: 'ICP Rules', icon: <Filter className="w-3.5 h-3.5" /> },
      { name: 'Qualify', desc: 'Score headcount (50–250) and revenue scale', tool: 'Scoring Engine', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
      { name: 'Enrich', desc: 'Verify VP Sales direct contact details', tool: 'Directory API', icon: <Users className="w-3.5 h-3.5" /> },
      { name: 'Review', desc: 'Pause for human sign-off on contact list', tool: 'Approval Gate', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
      { name: 'HubSpot', desc: 'Push 18 qualified contacts & create deals', tool: 'HubSpot CRM', icon: <Database className="w-3.5 h-3.5" /> },
    ],
  },
  {
    id: 'support',
    label: 'Support Triage',
    goal: 'Triage incoming Zendesk tickets, detect customer churn risks, and draft context-aware answers using our product docs.',
    agent: 'Support Assistant',
    nodes: [
      { name: 'Ingest', desc: 'Listen to real-time Zendesk webhooks', tool: 'Zendesk API', icon: <Globe className="w-3.5 h-3.5" /> },
      { name: 'Classify', desc: 'Sentiment classification & urgency scoring', tool: 'Triage Rules', icon: <Filter className="w-3.5 h-3.5" /> },
      { name: 'Ground', desc: 'Retrieve matching solutions from Documentation', tool: 'Knowledge Store', icon: <Database className="w-3.5 h-3.5" /> },
      { name: 'Draft', desc: 'Synthesize calm, precise answer draft', tool: 'Brand Voice', icon: <Layers className="w-3.5 h-3.5" /> },
      { name: 'Escalate', desc: 'Notify Slack #customer-success on churn risks', tool: 'Slack Webhook', icon: <Zap className="w-3.5 h-3.5" /> },
      { name: 'Sync', desc: 'Attach internal draft note to Zendesk ticket', tool: 'Zendesk API', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
    ],
  },
  {
    id: 'ops',
    label: 'Market Monitoring',
    goal: 'Monitor competitor pricing modifications and feature releases, synthesizing an executive briefing in Notion.',
    agent: 'Market Researcher',
    nodes: [
      { name: 'Crawl', desc: 'Monitor competitor changelogs & pricing tables', tool: 'Web Monitor', icon: <Globe className="w-3.5 h-3.5" /> },
      { name: 'Diff', desc: 'Detect packaging, tier, and seat fee changes', tool: 'Diff Engine', icon: <Filter className="w-3.5 h-3.5" /> },
      { name: 'Synthesize', desc: 'Analyze strategic threats and opportunities', tool: 'Summary Engine', icon: <Layers className="w-3.5 h-3.5" /> },
      { name: 'Publish', desc: 'Generate weekly executive summary page', tool: 'Notion Sync', icon: <Database className="w-3.5 h-3.5" /> },
    ],
  },
];

export function InteractiveBuilderDemo() {
  const [activePreset, setActivePreset] = useState(PRESET_GOALS[0]);
  const [customGoal, setCustomGoal] = useState(PRESET_GOALS[0].goal);

  const handleSelectPreset = (preset: typeof PRESET_GOALS[0]) => {
    setActivePreset(preset);
    setCustomGoal(preset.goal);
  };

  return (
    <section className="py-24 bg-[#08090C] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <p className="text-xs font-mono uppercase tracking-widest text-[#FF6B35]">
            Workflow Orchestration
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F5F5F7] tracking-tight">
            From natural language prompt
            <br />
            <span className="text-[#8B93A1]">to deterministic execution.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#8B93A1] leading-relaxed">
            State your business goal in plain language. Nima compiles it into an executable, multi-step agent workflow with human approval checkpoints.
          </p>
        </div>

        {/* Interactive Workspace View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 rounded-2xl bg-[#0E1015] border border-white/[0.06] p-6 lg:p-8 shadow-2xl">
          {/* Left Column: Preset Goals & Input */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-5">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#8B93A1] tracking-wider block mb-2.5">
                  Workflow Templates
                </span>
                <div className="flex flex-wrap gap-2">
                  {PRESET_GOALS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        activePreset.id === preset.id
                          ? 'bg-[#171A21] text-[#F5F5F7] border border-[#FF6B35] shadow-[0_0_12px_rgba(255,107,53,0.2)]'
                          : 'bg-[#12141A] text-[#8B93A1] border border-white/[0.06] hover:border-white/[0.15]'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#F5F5F7] block mb-1.5 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#FF6B35]" />
                  <span>Objective Statement</span>
                </label>
                <div className="p-4 rounded-xl bg-[#08090C] border border-white/[0.06] text-xs text-[#F5F5F7] font-mono leading-relaxed min-h-[100px]">
                  &ldquo;{customGoal}&rdquo;
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#14171F] border border-white/[0.06] space-y-1 text-xs">
                <div className="text-[10px] font-mono uppercase text-[#5C6370]">Assigned Worker</div>
                <div className="font-semibold text-[#F5F5F7]">
                  {activePreset.agent}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06]">
              <Link href="/signup">
                <IslandButton size="md" variant="primary" className="w-full justify-between">
                  Deploy this workflow
                </IslandButton>
              </Link>
            </div>
          </div>

          {/* Right Column: Generated Workflow Nodes */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="text-xs font-mono uppercase text-[#8B93A1]">
                Compiled Execution Graph ({activePreset.nodes.length} stages)
              </div>
              <span className="text-[11px] font-mono text-[#32D583] flex items-center gap-1">
                <Check className="w-3 h-3" /> Validated
              </span>
            </div>

            <div className="space-y-2.5">
              {activePreset.nodes.map((node) => (
                <div
                  key={node.name}
                  className="p-3.5 rounded-xl bg-[#12141A] border border-white/[0.06] flex items-center justify-between gap-3 text-xs hover:border-white/[0.15] transition-all group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-[#171A21] border border-white/[0.06] flex items-center justify-center text-[#FF6B35] shrink-0">
                      {node.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-[#F5F5F7] flex items-center gap-2">
                        <span>{node.name}</span>
                        {node.name === 'Review' && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#F5B544]/15 text-[#F5B544] font-mono border border-[#F5B544]/30">
                            Human Review Gate
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#8B93A1] truncate mt-0.5">
                        {node.desc}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#08090C] text-[#8B93A1] border border-white/[0.06] shrink-0">
                    {node.tool}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
