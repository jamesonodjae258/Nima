'use client';

import React from 'react';
import { ArrowRight, Check, X, Shield, Terminal, RefreshCw, Layers, Database } from 'lucide-react';
import { GlowCard } from '@/components/ui/GlowCard';

export function ComparisonSection() {
  const manualFrictions = [
    {
      title: 'Prompt-by-prompt babysitting',
      desc: 'You manually compose queries, wait for responses, and re-prompt when the model drifts off-course.',
    },
    {
      title: 'Manual copy, paste, and tab switching',
      desc: 'Information sits isolated in browser text boxes, requiring you to copy rows into sheets and CRMs.',
    },
    {
      title: 'Zero persistent context',
      desc: 'Every session restarts from scratch with no shared understanding of your ICP, brand voice, or rules.',
    },
    {
      title: 'Unverified outputs',
      desc: 'Hallucinations go undetected until an email bounces or incorrect data corrupts your CRM.',
    },
  ];

  const nimaCapabilities = [
    {
      title: 'Goal-driven autonomous execution',
      desc: 'Specify an objective once. Nima breaks it down into a multi-step plan and runs until it is done.',
    },
    {
      title: 'Direct reads and writes across tools',
      desc: 'Agents query APIs, enrich datasets, and write production records to HubSpot, Slack, and Notion.',
    },
    {
      title: 'Grounded in your business context',
      desc: 'Agents share memory, adhere to your ICP guidelines, and maintain consistent operational standards.',
    },
    {
      title: 'Deterministic verification & human approval',
      desc: 'Critical database writes and customer-facing emails pause for explicit human authorization.',
    },
  ];

  return (
    <section className="py-24 border-t border-white/[0.06] bg-[#0A0C10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-mono uppercase tracking-widest text-[#FF6B35]">
            Architectural Contrast
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F5F5F7] tracking-tight leading-tight">
            Chatbots answer questions.
            <br />
            <span className="text-[#8B93A1]">Nima handles operational work.</span>
          </h2>
          <p className="text-base text-[#8B93A1] leading-relaxed">
            Most teams use AI as a fast search engine or text rewriter. Nima gives AI access to your actual tool stack so work moves forward without manual copy-pasting.
          </p>
        </div>

        {/* Side by side comparison cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Traditional Chatbot AI */}
          <div className="p-7 sm:p-8 rounded-2xl bg-[#0D0F14] border border-white/[0.06] space-y-6">
            <div className="flex items-center justify-between pb-5 border-b border-white/[0.06]">
              <div>
                <span className="text-xs font-mono uppercase text-[#8B93A1]">Standard Chat Interface</span>
                <h3 className="text-lg font-semibold text-[#F5F5F7] mt-1">Manual Prompting</h3>
              </div>
              <span className="px-2.5 py-1 rounded bg-red-500/10 text-red-400 font-mono text-xs border border-red-500/20">
                High Human Friction
              </span>
            </div>

            <div className="space-y-4">
              {manualFrictions.map((item) => (
                <div key={item.title} className="flex items-start gap-3 text-xs">
                  <div className="w-5 h-5 rounded bg-white/[0.04] text-red-400/80 flex items-center justify-center shrink-0 mt-0.5 border border-white/[0.06]">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-semibold text-[#F5F5F7]">{item.title}</h4>
                    <p className="text-[11px] text-[#8B93A1] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/[0.06] text-xs text-[#5C6370]">
              Bottleneck: A human must remain in the middle of every single step.
            </div>
          </div>

          {/* Right: Nima Autonomous Workflows */}
          <GlowCard className="group h-full" innerClassName="p-7 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-5 border-b border-white/[0.06]">
              <div>
                <span className="text-xs font-mono uppercase text-[#FF6B35]">Nima Platform</span>
                <h3 className="text-lg font-semibold text-[#F5F5F7] mt-1">Autonomous Workflows</h3>
              </div>
              <span className="px-2.5 py-1 rounded bg-[#32D583]/10 text-[#32D583] font-mono text-xs border border-[#32D583]/20">
                Direct Execution
              </span>
            </div>

            <div className="space-y-4">
              {nimaCapabilities.map((item) => (
                <div key={item.title} className="flex items-start gap-3 text-xs">
                  <div className="w-5 h-5 rounded bg-[#32D583]/15 text-[#32D583] flex items-center justify-center shrink-0 mt-0.5 border border-[#32D583]/30">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-semibold text-[#F5F5F7] group-hover:text-white transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-[#8B93A1] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/[0.06] text-xs text-[#32D583] flex items-center gap-1.5 font-mono">
              <Check className="w-3.5 h-3.5" />
              <span>Result: Work completes in the background with full audit trails.</span>
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}
