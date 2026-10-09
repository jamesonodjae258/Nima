'use client';

import React from 'react';
import Link from 'next/link';
import { MarketingNav } from '@/components/marketing/MarketingNav';
import { MarketingFooter } from '@/components/marketing/MarketingFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  ArrowRight,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Database,
  Cpu,
  Zap,
  Lock,
  TrendingUp,
  FileText,
  Search,
  Check,
} from 'lucide-react';

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-[#08090C] text-[#F5F5F7] flex flex-col selection:bg-[#FF6B35]/30 selection:text-white">
      <MarketingNav />

      <main className="flex-1">
        {/* Header */}
        <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6">
          <div className="space-y-3 max-w-3xl mx-auto">
            <div className="text-xs font-mono uppercase tracking-widest text-[#5C6370]">
              Architecture <span className="text-[#FF6B35]">/</span> Platform Core
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#F5F5F7] tracking-tight">
              AI agents built for real business work.
            </h1>
            <p className="text-base sm:text-lg text-[#8B93A1] max-w-2xl mx-auto leading-relaxed">
              Nima is an end-to-end platform for creating, running, observing, and governing autonomous AI agents across your business stack.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link href="/signup" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-[200px] text-xs font-medium shadow-[0_0_20px_rgba(255,107,53,0.35)] justify-center">
                <span>Start building</span>
              </Button>
            </Link>
            <Link href="/demo" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-[200px] text-xs border-[#242832] justify-center">
                <span>Launch interactive demo</span>
              </Button>
            </Link>
          </div>
        </section>

        {/* 6 Product Deep Dives */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 pb-24">
          {/* 1. Agent Builder */}
          <section id="builder" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 border-t border-[#242832]/60">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono uppercase text-[#FF6B35] font-semibold">
                01 • Core Creation Engine
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#F5F5F7]">
                The Agent Builder
              </h2>
              <p className="text-xs sm:text-sm text-[#8B93A1] leading-relaxed">
                Describe any operational objective. Nima understands your business goal, breaks it down into deterministic subtasks, configures required parameters, and builds an execution graph.
              </p>
              <ul className="space-y-2 text-xs text-[#8B93A1]">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#32D583]" />
                  <span>Natural language goal synthesis</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#32D583]" />
                  <span>Configurable research, filter, and action parameters</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#32D583]" />
                  <span>Pre-built enterprise agent templates</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7 p-6 rounded-2xl bg-[#111318] border border-[#242832] space-y-3 shadow-xl">
              <div className="text-[10px] font-mono uppercase text-[#5C6370]">Agent Builder Preview</div>
              <div className="p-3.5 rounded-xl bg-[#0E1015] border border-[#242832] text-xs font-mono text-[#F5F5F7]">
                &ldquo;Find European SaaS companies with 100-250 employees that raised Series A in 2026.&rdquo;
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs font-mono pt-2">
                <div className="p-2.5 rounded-lg bg-[#171A21] border border-[#242832]">
                  <span className="text-[#5C6370] block text-[10px]">Step 01</span>
                  <span className="text-[#F5F5F7]">Crunchbase Scan</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#171A21] border border-[#242832]">
                  <span className="text-[#5C6370] block text-[10px]">Step 02</span>
                  <span className="text-[#F5F5F7]">ICP Scoring</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#171A21] border border-[#242832]">
                  <span className="text-[#5C6370] block text-[10px]">Step 03</span>
                  <span className="text-[#F5F5F7]">HubSpot Sync</span>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Agent Execution */}
          <section id="execution" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 border-t border-[#242832]/60">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono uppercase text-[#FF6B35] font-semibold">
                02 • Observability & Runtime
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#F5F5F7]">
                Agent Execution
              </h2>
              <p className="text-xs sm:text-sm text-[#8B93A1] leading-relaxed">
                Watch agents run in real time. Inspect live step transitions, duration telemetry, tool calls, and output summaries without guessing what happened.
              </p>
              <ul className="space-y-2 text-xs text-[#8B93A1]">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#32D583]" />
                  <span>Live streaming task logs and duration counters</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#32D583]" />
                  <span>Success rate analytics and execution quality breakdowns</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7 p-6 rounded-2xl bg-[#111318] border border-[#242832] space-y-3 shadow-xl">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[#5C6370]">
                <span>Telemetry Console</span>
                <span className="text-[#32D583]">Runtime Healthy</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0E1015] border border-[#242832] space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between text-[#8B93A1]">
                  <span>[10:42:01] Ingested 1,420 prospective domains</span>
                  <span className="text-[#32D583]">100% OK</span>
                </div>
                <div className="flex items-center justify-between text-[#8B93A1]">
                  <span>[10:45:14] Filtered 38 accounts matching ICP headcount</span>
                  <span className="text-[#32D583]">Resolved</span>
                </div>
                <div className="flex items-center justify-between text-[#8B93A1]">
                  <span>[10:48:22] Verified 27 executive email MX records</span>
                  <span className="text-[#32D583]">Deliverable</span>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Human Approval */}
          <section id="approval" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 border-t border-[#242832]/60">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono uppercase text-[#FF6B35] font-semibold">
                03 • Enterprise Safety
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#F5F5F7]">
                Human Approval
              </h2>
              <p className="text-xs sm:text-sm text-[#8B93A1] leading-relaxed">
                Nima prevents unreviewed writes or external customer messages. Agents pause automatically at critical junctions, presenting human operators with clear data previews.
              </p>
              <ul className="space-y-2 text-xs text-[#8B93A1]">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#32D583]" />
                  <span>Granular approval policies for CRM writes & outreach</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#32D583]" />
                  <span>Audit log of decider identity, timestamps, and outcomes</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7 p-6 rounded-2xl bg-[#111318] border border-[#242832] space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <Badge variant="warning" size="sm">
                  Approval Required
                </Badge>
                <span className="text-[10px] font-mono text-[#5C6370]">Gate: CRM Write</span>
              </div>
              <p className="text-xs text-[#F5F5F7] font-medium">
                Lead Researcher requested sign-off to push 18 verified prospect contacts to HubSpot CRM.
              </p>
              <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#242832]/60">
                <Button variant="ghost" size="sm" className="text-xs text-[#8B93A1]">
                  Reject
                </Button>
                <Button size="sm" className="text-xs font-medium">
                  Approve Batch
                </Button>
              </div>
            </div>
          </section>

          {/* 4. Knowledge */}
          <section id="knowledge" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 border-t border-[#242832]/60">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono uppercase text-[#FF6B35] font-semibold">
                04 • Contextual Grounding
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#F5F5F7]">
                Knowledge Center
              </h2>
              <p className="text-xs sm:text-sm text-[#8B93A1] leading-relaxed">
                Connect company guidelines, playbooks, product docs, and tone-of-voice instructions. Nima chunks, vectorizes, and retrieves domain context to eliminate hallucinations.
              </p>
              <ul className="space-y-2 text-xs text-[#8B93A1]">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#32D583]" />
                  <span>Support for documents, websites, guidelines, and SQL streams</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#32D583]" />
                  <span>1,536-dimension semantic embeddings for rapid context injection</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-3">
              <Card className="p-4 bg-[#111318] border-[#242832] space-y-2">
                <div className="text-xs font-semibold text-[#F5F5F7]">ICP Definition</div>
                <div className="text-[10px] text-[#8B93A1]">Headcount, industry, funding, and personas</div>
                <span className="text-[10px] font-mono text-[#32D583] block mt-2">● Active (18 chunks)</span>
              </Card>
              <Card className="p-4 bg-[#111318] border-[#242832] space-y-2">
                <div className="text-xs font-semibold text-[#F5F5F7]">Sales Playbook</div>
                <div className="text-[10px] text-[#8B93A1]">Objection handling and discounting criteria</div>
                <span className="text-[10px] font-mono text-[#32D583] block mt-2">● Active (42 chunks)</span>
              </Card>
            </div>
          </section>

          {/* 5. Insights */}
          <section id="insights" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 border-t border-[#242832]/60">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono uppercase text-[#FF6B35] font-semibold">
                05 • Intelligence Layer
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#F5F5F7]">
                Insights & Recommendations
              </h2>
              <p className="text-xs sm:text-sm text-[#8B93A1] leading-relaxed">
                Nima doesn&apos;t just complete tasks—it surfaces strategic business findings. Analyze conversion sweet spots, operational anomalies, and execution velocity.
              </p>
              <ul className="space-y-2 text-xs text-[#8B93A1]">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#32D583]" />
                  <span>Ground-truth telemetry citations on every insight</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#32D583]" />
                  <span>One-click recommendations to optimize agent runtime parameters</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7 p-5 rounded-2xl bg-[#111318] border border-[#242832] space-y-3">
              <div className="text-xs font-semibold text-[#F5F5F7]">
                Empirical Pattern: Highest-Converting Prospects
              </div>
              <p className="text-xs text-[#8B93A1]">
                100–250 employee bracket converts at 14.8% vs 4.8% for enterprise 500+ headcount.
              </p>
              <div className="p-2.5 rounded-lg bg-[#0E1015] border border-[#242832] text-[11px] font-mono text-[#5C6370]">
                Citation: Based on 284 tasks, 1,482 prospect records, last 30 days
              </div>
            </div>
          </section>

          {/* 6. Integrations */}
          <section id="integrations" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 border-t border-[#242832]/60">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono uppercase text-[#FF6B35] font-semibold">
                06 • Tool Ecosystem
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#F5F5F7]">
                Enterprise Integrations
              </h2>
              <p className="text-xs sm:text-sm text-[#8B93A1] leading-relaxed">
                Connect Nima with HubSpot, Salesforce, Slack, Gmail, Google Sheets, Notion, Stripe, and Zapier. Two-way synchronization with granular role scopes.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-3 gap-3 text-xs font-medium text-center">
              {['HubSpot', 'Salesforce', 'Slack', 'Gmail', 'Notion', 'Google Sheets'].map((t) => (
                <div key={t} className="p-3.5 rounded-xl bg-[#111318] border border-[#242832] text-[#F5F5F7]">
                  {t}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
