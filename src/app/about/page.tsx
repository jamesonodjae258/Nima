'use client';

import React from 'react';
import Link from 'next/link';
import { MarketingNav } from '@/components/marketing/MarketingNav';
import { MarketingFooter } from '@/components/marketing/MarketingFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ArrowRight, Target, BookOpen, Zap, Shield, Check } from 'lucide-react';

export default function AboutPage() {
  const pillars = [
    {
      icon: Target,
      name: 'Goal',
      headline: 'Autonomous Objective Definition',
      desc: 'Instead of micro-managing prompts in a single-turn chat box, you define the business outcome you want achieved. Nima decomposes high-level goals into deterministic subtasks.',
    },
    {
      icon: BookOpen,
      name: 'Context',
      headline: 'Ground-Truth Domain Knowledge',
      desc: 'Agents cannot succeed on generic pre-training alone. Nima connects the ICP playbooks, support rules, and company directives your team already trusts.',
    },
    {
      icon: Zap,
      name: 'Action',
      headline: 'Real Work Across Enterprise Tools',
      desc: 'True utility requires operating where your business works. Nima agents query web feeds, filter records, and directly write approved updates into HubSpot, Slack, and Sheets.',
    },
    {
      icon: Shield,
      name: 'Control',
      headline: 'Human-in-the-Loop Governance',
      desc: 'Autonomy without control is reckless. Nima introduces strict checkpoint gates before high-impact operations—ensuring humans always maintain final authority.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#08090C] text-[#F5F5F7] flex flex-col selection:bg-[#FF6B35]/30 selection:text-white">
      <MarketingNav />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs font-mono uppercase text-[#FF6B35] tracking-wider bg-[#FF6B35]/10 px-2.5 py-1 rounded border border-[#FF6B35]/20">
            Our Philosophy
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#F5F5F7] tracking-tight leading-tight">
            AI should do more than answer questions.
          </h1>

          <p className="text-base sm:text-lg text-[#8B93A1] leading-relaxed">
            Nima is built around a simple idea: AI becomes significantly more useful when you give it a goal, the context it needs, and the ability to act.
          </p>
        </section>

        {/* The 4 Pillars */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#F5F5F7] tracking-tight">
              The Four Pillars of Autonomous Work
            </h2>
            <p className="text-xs sm:text-sm text-[#8B93A1] mt-1">
              How Nima structures reliable agent execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.name}
                  className="p-7 rounded-2xl bg-[#111318] border border-[#242832] space-y-4 hover:border-[#FF6B35]/40 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#171A21] border border-[#242832] flex items-center justify-center text-[#FF6B35]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#FF6B35] font-semibold">
                      Pillar • {p.name}
                    </span>
                    <h3 className="text-lg font-semibold text-[#F5F5F7] mt-0.5">{p.headline}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#8B93A1] leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Engineering Philosophy */}
        <section className="py-20 border-t border-[#242832]/60 bg-[#0A0C10]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase text-[#5C6370]">Core Principles</span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#F5F5F7] tracking-tight">
                Designed for restraint, transparency, and trust.
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#8B93A1] leading-relaxed">
              <p>
                We do not believe in opaque AI magic or unattended black-box automation. Enterprise software requires deterministic boundaries, predictable error handling, and auditable trails.
              </p>
              <p>
                When an agent runs on Nima, every query it executes, every row it qualifies, and every recommendation it surfaces is grounded in verifiable evidence. If an agent is uncertain, it halts and asks. If a task requires writing to customer records, it requests approval.
              </p>
            </div>

            <div className="pt-4 flex items-center gap-3">
              <Link href="/signup">
                <Button className="text-xs font-medium shadow-[0_0_15px_rgba(255,107,53,0.3)]">
                  <span>Start building on Nima</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
              <Link href="/product">
                <Button variant="secondary" className="text-xs border-[#242832]">
                  <span>Explore architecture</span>
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
