'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MarketingNav } from '@/components/marketing/MarketingNav';
import { MarketingFooter } from '@/components/marketing/MarketingFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Cpu,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Clock,
  Layers,
  Search,
  MessageSquare,
  BarChart3,
  FileSearch,
} from 'lucide-react';

export default function SolutionsPage() {
  const [activeTab, setActiveTab] = useState<'sales' | 'support' | 'operations' | 'research'>('sales');

  const solutions = {
    sales: {
      id: 'sales',
      agent: 'Lead Researcher',
      tag: 'Sales & Revenue Operations',
      headline: 'Autonomous Outbound Prospecting & Enrichment',
      problem: 'Sales teams and SDRs spend up to 15 hours every week manually browsing LinkedIn, funding trackers, and company homepages just to build prospect lists.',
      workflow: [
        { name: 'Research', desc: 'Queries funding feeds and registries for companies matching Series A/B funding' },
        { name: 'Analyze', desc: 'Validates modern cloud architecture and commercial hiring momentum' },
        { name: 'Qualify', desc: 'Scores headcount (100–250 employees) and geography against enterprise ICP' },
        { name: 'Enrich', desc: 'Resolves verified VP Sales and CRO email addresses with 100% MX deliverability' },
        { name: 'Approval', desc: 'Pauses for SDR lead list approval before any external database modification' },
        { name: 'HubSpot', desc: 'Pushes verified records and creates pipeline deals automatically' },
      ],
      result: 'A verified, ready-to-review pipeline of decision makers delivered directly to HubSpot every morning.',
      stats: '18 qualified prospects identified per batch • ~6 hours saved per sales rep',
    },
    support: {
      id: 'support',
      agent: 'Support Assistant',
      tag: 'Customer Success & Support',
      headline: 'Intelligent Ticket Triage & Draft Automation',
      problem: 'Support engineers face overwhelming queue backlogs. Repetitive tier-1 questions (billing, invoice tax IDs) crowd out urgent enterprise outage tickets.',
      workflow: [
        { name: 'Ingest', desc: 'Parses incoming Zendesk and email support ticket stream in real time' },
        { name: 'Sentiment', desc: 'Performs NLP sentiment classification and churn urgency scoring' },
        { name: 'Ground', desc: 'Queries Product Documentation and Support Guidelines vector chunks' },
        { name: 'Draft', desc: 'Generates calm, authoritative, context-aware responses without hallucination' },
        { name: 'Escalate', desc: 'Dispatches instant Slack alerts for high-value enterprise accounts at risk' },
      ],
      result: '82% of repetitive tier-1 tickets drafted with grounded documentation context; zero unapproved customer replies.',
      stats: 'Sub-15m first response SLA • 3 urgent enterprise escalations routed today',
    },
    operations: {
      id: 'operations',
      agent: 'Market Researcher',
      tag: 'Product Strategy & Operations',
      headline: 'Continuous Competitive Intelligence & Tracking',
      problem: 'Product and executive leadership lack real-time visibility into competitor pricing modifications, feature releases, and positioning shifts.',
      workflow: [
        { name: 'Crawl', desc: 'Scrapes competitor changelogs, pricing tables, and public press releases' },
        { name: 'Diff', desc: 'Detects structural changes in packaging, user seats, and add-on pricing' },
        { name: 'Analyze', desc: 'Identifies strategic threats, defensive positioning, and expansion opportunities' },
        { name: 'Publish', desc: 'Generates clean, formatted executive briefings directly in Notion' },
      ],
      result: 'A weekly executive competitive briefing in Notion synthesizing changes with direct source citations.',
      stats: '4 competitors monitored • 2 pricing shifts isolated this week',
    },
    research: {
      id: 'research',
      agent: 'Financial Forecaster',
      tag: 'Finance & Corporate Research',
      headline: 'Cohort Retention & Expansion Modeling',
      problem: 'Finance teams must manually extract subscription logs, seat changes, and contraction patterns into spreadsheets every month.',
      workflow: [
        { name: 'Aggregate', desc: 'Reads Stripe subscription webhooks and customer tier records' },
        { name: 'Model', desc: 'Calculates expansion velocity, contraction churn, and cohort longevity' },
        { name: 'Simulate', desc: 'Runs Monte Carlo scenarios across base, optimistic, and conservative growth' },
        { name: 'Sync', desc: 'Updates master Google Sheets financial model with latest projections' },
      ],
      result: 'Automated cohort scenario models updated weekly with zero manual data copy-pasting.',
      stats: '+4.2% expansion MRR model updated • 1,000 Monte Carlo runs executed',
    },
  };

  const active = solutions[activeTab];

  return (
    <div className="min-h-screen bg-[#08090C] text-[#F5F5F7] flex flex-col selection:bg-[#FF6B35]/30 selection:text-white">
      <MarketingNav />

      <main className="flex-1">
        {/* Header */}
        <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-[#5C6370]">
            Architecture <span className="text-[#FF6B35]">/</span> Enterprise Workforces
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#F5F5F7] tracking-tight">
            Give every team a little more leverage.
          </h1>
          <p className="text-base sm:text-lg text-[#8B93A1] max-w-2xl mx-auto leading-relaxed">
            See how specialized Nima agents transform time-consuming workflows across sales, support, operations, and research.
          </p>
        </section>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 border-b border-[#242832]/80 pb-3 overflow-x-auto">
            {[
              { id: 'sales', label: 'Sales & Outreach' },
              { id: 'support', label: 'Customer Support' },
              { id: 'operations', label: 'Market Intelligence' },
              { id: 'research', label: 'Finance & Research' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#171A21] text-[#F5F5F7] border border-[#FF6B35] shadow-[0_0_12px_rgba(255,107,53,0.25)]'
                    : 'text-[#8B93A1] hover:text-[#F5F5F7] hover:bg-[#111318]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active Solution Deep Dive */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Problem & Result */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-[#FF6B35] font-semibold">
                  {active.tag}
                </span>
                <h2 className="text-2xl sm:text-3xl font-semibold text-[#F5F5F7] tracking-tight">
                  {active.headline}
                </h2>
                <div className="flex items-center gap-2 text-xs text-[#8B93A1] pt-1">
                  <Cpu className="w-4 h-4 text-[#FF6B35]" />
                  <span>Powered by {active.agent}</span>
                </div>
              </div>

              {/* Problem Card */}
              <div className="p-5 rounded-xl bg-[#111318] border border-[#242832] space-y-2">
                <div className="text-[10px] font-mono uppercase text-[#F04438] font-semibold">
                  The Problem
                </div>
                <p className="text-xs text-[#8B93A1] leading-relaxed">{active.problem}</p>
              </div>

              {/* Result Card */}
              <div className="p-5 rounded-xl bg-[#111318] border border-[#32D583]/40 space-y-2 shadow-lg">
                <div className="text-[10px] font-mono uppercase text-[#32D583] font-semibold">
                  The Result
                </div>
                <p className="text-xs text-[#F5F5F7] font-medium leading-relaxed">{active.result}</p>
                <div className="pt-2 text-[11px] font-mono text-[#5C6370]">
                  {active.stats}
                </div>
              </div>

              <Link href="/signup" className="block pt-2">
                <Button className="w-full text-xs font-medium shadow-[0_0_15px_rgba(255,107,53,0.3)]">
                  <span>Deploy {active.agent}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </Link>
            </div>

            {/* Right: Agent Workflow Visualization */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-[#111318] border border-[#242832] space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-[#242832]">
                <span className="text-xs font-mono uppercase text-[#5C6370]">
                  Automated Workflow Graph
                </span>
                <Badge variant="success" size="sm">
                  Active Blueprint
                </Badge>
              </div>

              <div className="space-y-3">
                {active.workflow.map((node, idx) => (
                  <div
                    key={node.name}
                    className="p-3.5 rounded-xl bg-[#171A21] border border-[#242832] flex items-start gap-3 text-xs"
                  >
                    <span className="text-[10px] font-mono text-[#FF6B35] bg-[#FF6B35]/10 px-2 py-0.5 rounded font-semibold mt-0.5">
                      0{idx + 1}
                    </span>
                    <div className="flex-1">
                      <div className="font-semibold text-[#F5F5F7] flex items-center justify-between">
                        <span>{node.name}</span>
                        {node.name === 'Approval' && (
                          <span className="text-[10px] font-mono text-[#F5B544] px-1.5 py-0.2 rounded bg-[#F5B544]/15">
                            Human Checkpoint
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#8B93A1] mt-1 leading-relaxed">{node.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
