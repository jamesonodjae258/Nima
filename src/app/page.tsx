'use client';

import React from 'react';
import Link from 'next/link';
import { MarketingNav } from '@/components/marketing/MarketingNav';
import { MarketingFooter } from '@/components/marketing/MarketingFooter';
import { HeroWorkflowAnimation } from '@/components/marketing/HeroWorkflowAnimation';
import { ComparisonSection } from '@/components/marketing/ComparisonSection';
import { InteractiveBuilderDemo } from '@/components/marketing/InteractiveBuilderDemo';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { QuantumBackground } from '@/components/ui/QuantumBackground';
import { GlowCard } from '@/components/ui/GlowCard';
import { IslandButton } from '@/components/ui/IslandButton';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ScrollScrubText } from '@/components/ui/ScrollScrubText';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
  Database,
  Lock,
  TrendingUp,
  FileText,
  Search,
  Check,
  Play,
  Share2,
  Users,
  LifeBuoy,
  BarChart3,
  MessageSquare,
  Cpu,
} from 'lucide-react';

export default function HomePage() {
  const tools = [
    { name: 'HubSpot', type: 'CRM Integration', desc: 'Sync qualified leads and log sales activity' },
    { name: 'Salesforce', type: 'Enterprise CRM', desc: 'Manage pipeline opportunities and contacts' },
    { name: 'Slack', type: 'Team Messaging', desc: 'Dispatch alerts and review approval requests' },
    { name: 'Gmail', type: 'Communications', desc: 'Analyze inbound customer inquiries' },
    { name: 'Google Sheets', type: 'Productivity', desc: 'Append research rows and financial models' },
    { name: 'Notion', type: 'Knowledge Base', desc: 'Publish executive dossiers and briefs' },
    { name: 'Zapier', type: 'Automation', desc: 'Trigger agent actions via 5,000+ app webhooks' },
    { name: 'Stripe', type: 'Payments', desc: 'Synthesize subscription metrics and expansion MRR' },
  ];

  const useCases = [
    {
      title: 'Research qualified prospects',
      desc: 'Identify emerging accounts matching headcount and funding criteria, extracting verified executive emails.',
    },
    {
      title: 'Analyze customer feedback',
      desc: 'Cluster recurring complaints across Zendesk, Discord, and reviews to isolate product churn vectors.',
    },
    {
      title: 'Monitor competitors',
      desc: 'Detect subtle packaging adjustments, pricing tier shifts, and feature rollouts weekly.',
    },
    {
      title: 'Prepare weekly reports',
      desc: 'Aggregate analytics from Stripe, Google Analytics, and Sheets into formatted Notion executive briefings.',
    },
    {
      title: 'Process support tickets',
      desc: 'Triage incoming queues, flag urgent billing queries, and prepare grounded draft responses.',
    },
    {
      title: 'Update CRM records',
      desc: 'Enrich stale contact records, verify domain MX records, and eliminate duplicate sales leads.',
    },
    {
      title: 'Research new markets',
      desc: 'Conduct deep landscape scans of competitor positioning and regional regulatory requirements.',
    },
    {
      title: 'Organize business data',
      desc: 'Structure unstructured customer email transcripts into standardized CRM custom objects.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#08090C] text-[#F5F5F7] flex flex-col selection:bg-[#FF6B35]/30 selection:text-white relative overflow-hidden">
      {/* Floating Scroll Progress Bar */}
      <ScrollProgress />

      {/* Cinematic Cosmic Arc Hero Background */}
      <div className="absolute top-0 left-0 right-0 h-[800px] sm:h-[960px] pointer-events-none select-none overflow-hidden z-0">
        <img
          src="/images/hero/cinematic-cosmic-arc.jpg"
          alt=""
          className="w-full h-full object-cover object-center opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090C]/30 via-transparent to-[#08090C]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_30%,#08090C_95%)]" />
      </div>

      {/* GPU Atmospheric Background */}
      <QuantumBackground />

      <MarketingNav />

      <main className="flex-1 relative z-10">
        {/* ================= HERO SECTION ================= */}
        <section className="pt-20 pb-16 md:pt-28 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-8">
          <div className="space-y-4 max-w-4xl mx-auto">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-[#8B93A1]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#32D583]" />
              <span className="text-[#F5F5F7]">Nima 2.4</span>
              <span className="text-[#5C6370]">/</span>
              <span>Enterprise Execution Engine</span>
            </div>

            {/* Headline with kinetic gradient shimmer */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F5F5F7] leading-[1.08]">
              Give AI a{' '}
              <span className="animate-shimmer bg-clip-text text-transparent bg-gradient-to-r from-white via-[#FF8C61] via-white to-[#FF6B35]">
                real job.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg lg:text-xl text-[#8B93A1] max-w-2xl mx-auto leading-relaxed">
              Nima transforms complex business goals into autonomous agent workflows that research, reason, and execute operations across your enterprise stack.
            </p>
          </div>

          {/* CTAs with IslandButton */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/signup">
              <IslandButton size="lg" variant="primary">
                Deploy your first agent
              </IslandButton>
            </Link>

            <Link href="/demo">
              <IslandButton size="lg" variant="secondary" showArrow={false}>
                Explore live demo
              </IslandButton>
            </Link>
          </div>

          {/* Product Visualization: Actual Workflow Simulation */}
          <div className="pt-8">
            <HeroWorkflowAnimation />
          </div>
        </section>

        {/* ================= SOCIAL PROOF / TOOL STRIP ================= */}
        <ScrollReveal animation="fade-up">
          <section className="py-12 border-y border-white/[0.06] bg-[#0A0C10]/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
              <p className="text-xs font-mono uppercase text-[#5C6370] tracking-wider">
                Integrated across modern enterprise infrastructure
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-80">
                {['HubSpot', 'Salesforce', 'Slack', 'Gmail', 'Notion', 'Google Sheets', 'Stripe', 'Zapier'].map(
                  (tool) => (
                    <span
                      key={tool}
                      className="text-sm sm:text-base font-medium text-[#8B93A1] tracking-tight hover:text-[#F5F5F7] hover:scale-105 transition-all duration-200"
                    >
                      {tool}
                    </span>
                  )
                )}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ================= SCROLL-SCRUBBED MANIFESTO ================= */}
        <section className="py-28 md:py-36 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
          <ScrollReveal animation="fade-up">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#5C6370]">
                <span>Architecture</span>
                <span>•</span>
                <span className="text-[#FF6B35]">Deterministic Execution</span>
              </div>

              <ScrollScrubText
                text="Traditional enterprise automation is fragile rules and broken webhooks. Nima introduces an autonomous intelligence layer where specialized agents reason through ambiguous objectives, orchestrate multi-tool workflows, and deliver grounded, verified outcomes."
                highlightWords={['fragile', 'Nima', 'autonomous', 'intelligence', 'reason', 'verified', 'outcomes']}
              />
            </div>
          </ScrollReveal>
        </section>

        {/* ================= CORE PROBLEM / COMPARISON SECTION ================= */}
        <ScrollReveal animation="fade-up">
          <ComparisonSection />
        </ScrollReveal>

        {/* ================= HOW NIMA WORKS (5 STEPS) ================= */}
        <section className="py-24 bg-[#08090C]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <ScrollReveal animation="fade-up">
              <div className="max-w-3xl space-y-3">
                <div className="text-xs font-mono uppercase tracking-widest text-[#5C6370]">
                  01 <span className="text-[#FF6B35]">/</span> Execution Lifecycle
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F5F5F7] tracking-tight">
                  From goal to work, automatically.
                </h2>
                <p className="text-sm sm:text-base text-[#8B93A1]">
                  Nima structures autonomous execution into five transparent, reliable stages.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                {
                  step: '01',
                  name: 'Create',
                  desc: 'Tell Nima what you want accomplished in plain natural language.',
                  tag: 'Goal Prompt',
                },
                {
                  step: '02',
                  name: 'Configure',
                  desc: 'Set the rules, tools, and domain knowledge your agent needs.',
                  tag: 'Parameters & Rules',
                },
                {
                  step: '03',
                  name: 'Run',
                  desc: 'Let your agent autonomously execute the multi-step workflow.',
                  tag: 'Execution Engine',
                },
                {
                  step: '04',
                  name: 'Review',
                  desc: 'Stay in complete control of important decisions and CRM writes.',
                  tag: 'Approval Gate',
                },
                {
                  step: '05',
                  name: 'Improve',
                  desc: 'Use verified results and empirical telemetry to optimize the agent.',
                  tag: 'Learning Loop',
                },
              ].map((item, idx) => (
                <ScrollReveal key={item.step} animation="fade-up" delay={idx * 90}>
                  <GlowCard className="h-full" innerClassName="p-5 space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm text-[#FF6B35] font-semibold">
                          {item.step}
                        </span>
                        <span className="text-[10px] font-mono text-[#5C6370] px-1.5 py-0.5 rounded bg-[#0E1015]">
                          {item.tag}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-[#F5F5F7]">{item.name}</h3>
                      <p className="text-xs text-[#8B93A1] leading-relaxed">{item.desc}</p>
                    </div>
                  </GlowCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>


        {/* ================= AGENT SECTION (3 MAJOR CARDS) ================= */}
        <section className="py-20 border-t border-[#242832]/60 bg-[#0A0C10]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <ScrollReveal animation="fade-up">
              <div className="max-w-3xl space-y-3">
                <div className="text-xs font-mono uppercase tracking-widest text-[#5C6370]">
                  02 <span className="text-[#FF6B35]">/</span> Specialized Workforces
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F5F5F7] tracking-tight">
                  One platform. A team of agents.
                </h2>
                <p className="text-sm sm:text-base text-[#8B93A1]">
                  Give repetitive business work to specialized AI agents engineered for your specific workflows.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Sales Agent */}
              <ScrollReveal animation="fade-up" delay={0}>
                <GlowCard className="group h-full" innerClassName="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[#171A21] border border-white/[0.08] flex items-center justify-center text-[#FF6B35] shadow-[0_0_15px_rgba(255,107,53,0.2)]">
                        <Users className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#171A21] text-[#FF6B35] border border-white/[0.06]">
                        Sales Pipeline
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-[#F5F5F7] group-hover:text-[#FFB49B] transition-colors">
                        Lead Researcher
                      </h3>
                      <p className="text-xs text-[#8B93A1] mt-1.5 leading-relaxed">
                        Find prospects, research accounts against enterprise ICP, qualify leads, and prepare CRM records.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#0A0C0F] border border-white/[0.05] space-y-1.5 font-mono text-[11px] text-[#8B93A1]">
                      <div className="text-[#32D583]">✓ 38 companies researched</div>
                      <div className="text-[#32D583]">✓ 18 prospects qualified</div>
                      <div className="text-[#F5B544]">● 18 contacts pending review</div>
                    </div>
                  </div>

                  <Link
                    href="/solutions#sales"
                    className="text-xs font-semibold text-[#FF6B35] hover:text-[#FFB49B] flex items-center gap-1 transition-colors pt-2 border-t border-white/[0.06]"
                  >
                    <span>Explore Sales Agent</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </GlowCard>
              </ScrollReveal>

              {/* Support Agent */}
              <ScrollReveal animation="fade-up" delay={120}>
                <GlowCard className="group h-full" innerClassName="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[#171A21] border border-white/[0.08] flex items-center justify-center text-[#FF6B35] shadow-[0_0_15px_rgba(255,107,53,0.2)]">
                        <LifeBuoy className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#171A21] text-[#FF6B35] border border-white/[0.06]">
                        Customer Operations
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-[#F5F5F7] group-hover:text-[#FFB49B] transition-colors">
                        Support Assistant
                      </h3>
                      <p className="text-xs text-[#8B93A1] mt-1.5 leading-relaxed">
                        Analyze incoming tickets, identify urgent issues, prepare context-aware responses, and escalate when necessary.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#0A0C0F] border border-white/[0.05] space-y-1.5 font-mono text-[11px] text-[#8B93A1]">
                      <div className="text-[#32D583]">✓ 47 tickets classified</div>
                      <div className="text-[#32D583]">✓ 34 draft replies generated</div>
                      <div className="text-[#F04438]">! 3 billing escalations routed</div>
                    </div>
                  </div>

                  <Link
                    href="/solutions#support"
                    className="text-xs font-semibold text-[#FF6B35] hover:text-[#FFB49B] flex items-center gap-1 transition-colors pt-2 border-t border-white/[0.06]"
                  >
                    <span>Explore Support Agent</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </GlowCard>
              </ScrollReveal>

              {/* Operations Agent */}
              <ScrollReveal animation="fade-up" delay={240}>
                <GlowCard className="group h-full" innerClassName="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[#171A21] border border-white/[0.08] flex items-center justify-center text-[#FF6B35] shadow-[0_0_15px_rgba(255,107,53,0.2)]">
                        <BarChart3 className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#171A21] text-[#FF6B35] border border-white/[0.06]">
                        Market Intelligence
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-[#F5F5F7] group-hover:text-[#FFB49B] transition-colors">
                        Market Researcher
                      </h3>
                      <p className="text-xs text-[#8B93A1] mt-1.5 leading-relaxed">
                        Research markets, monitor competitor pricing shifts, detect product updates, and compile executive Notion reports.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#0A0C0F] border border-white/[0.05] space-y-1.5 font-mono text-[11px] text-[#8B93A1]">
                      <div className="text-[#32D583]">✓ 12 competitors tracked</div>
                      <div className="text-[#32D583]">✓ Weekly shift report generated</div>
                      <div className="text-[#FF6B35]">● 1 pricing update detected</div>
                    </div>
                  </div>

                  <Link
                    href="/solutions#operations"
                    className="text-xs font-semibold text-[#FF6B35] hover:text-[#FFB49B] flex items-center gap-1 transition-colors pt-2 border-t border-white/[0.06]"
                  >
                    <span>Explore Operations Agent</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </GlowCard>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ================= PRODUCT DEMONSTRATION (INTERACTIVE BUILDER) ================= */}
        <ScrollReveal animation="scale-up">
          <InteractiveBuilderDemo />
        </ScrollReveal>

        {/* ================= AUTONOMY + CONTROL SECTION ================= */}
        <ScrollReveal animation="fade-up">
          <section className="py-20 border-t border-[#242832]/60 bg-[#0A0C10]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="max-w-3xl space-y-3">
                <div className="text-xs font-mono uppercase tracking-widest text-[#5C6370]">
                  03 <span className="text-[#FF6B35]">/</span> Governance & Control
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F5F5F7] tracking-tight">
                  Autonomous when it can be.
                  <br />
                  <span className="text-[#8B93A1]">Controlled when it matters.</span>
                </h2>
                <p className="text-sm sm:text-base text-[#8B93A1] leading-relaxed">
                  Nima can handle repetitive research and analysis independently while giving your team explicit approval control over actions that affect customers or update production records.
                </p>
              </div>

              {/* Approval Sequence UI Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Stepper description */}
                <div className="lg:col-span-5 space-y-3">
                  {[
                    { step: '01', title: 'Agent working', desc: 'Queries funding datasets and resolves executive identities' },
                    { step: '02', title: 'Approval required', desc: 'Halts before sending messages or modifying CRM tables' },
                    { step: '03', title: 'Human review', desc: 'Inspect candidate records, data provenance, and score details' },
                    { step: '04', title: 'Approved & synced', desc: 'Dispatches authenticated API writes with complete audit trace' },
                  ].map((s) => (
                    <div key={s.step} className="p-3 rounded-xl bg-[#111318] border border-[#242832] flex items-start gap-3">
                      <span className="font-mono text-xs text-[#FF6B35] font-semibold mt-0.5">{s.step}</span>
                      <div>
                        <h4 className="text-xs font-semibold text-[#F5F5F7]">{s.title}</h4>
                        <p className="text-[11px] text-[#8B93A1] mt-0.5">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Real Approval Card Preview */}
                <div className="lg:col-span-7">
                  <Card className="p-6 bg-[#111318] border-[#FF6B35]/40 shadow-2xl space-y-4 relative">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#F5B544] animate-pulse" />
                          <span className="text-[10px] font-mono uppercase text-[#F5B544] font-semibold">
                            Action Approval Required
                          </span>
                        </div>
                        <h3 className="text-base font-semibold text-[#F5F5F7] mt-1">
                          Push 18 qualified prospects to HubSpot CRM
                        </h3>
                        <p className="text-xs text-[#8B93A1] mt-0.5">
                          Requested by <span className="text-[#F5F5F7] font-medium">Lead Researcher</span>
                        </p>
                      </div>

                      <Badge variant="warning" size="sm">
                        Pending Review
                      </Badge>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#0E1015] border border-[#242832] space-y-2 text-xs">
                      <div className="text-[#8B93A1]">
                        Target Table: <span className="font-mono text-[#F5F5F7]">HubSpot Contacts & Companies</span>
                      </div>
                      <div className="text-[#8B93A1]">
                        Payload: <span className="font-mono text-[#32D583]">18 verified records (Score ≥ 80)</span>
                      </div>
                      <div className="text-[11px] text-[#5C6370] font-mono">
                        Safe Sandbox Mode • Reversible batch ID #batch-8492
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#242832]/60">
                      <Button variant="ghost" size="sm" className="text-xs text-[#8B93A1]">
                        Reject
                      </Button>
                      <Button size="sm" className="text-xs font-medium shadow-[0_0_12px_rgba(255,107,53,0.3)]">
                        <Check className="w-3.5 h-3.5 mr-1 text-[#32D583]" />
                        <span>Approve & Write to HubSpot</span>
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>


        {/* ================= KNOWLEDGE SECTION ================= */}
        <ScrollReveal animation="fade-up">
          <section className="py-20 bg-[#08090C]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="max-w-3xl space-y-3">
                <div className="text-xs font-mono uppercase tracking-widest text-[#5C6370]">
                  04 <span className="text-[#FF6B35]">/</span> Knowledge Grounding
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F5F5F7] tracking-tight">
                  Give your agents context.
                </h2>
                <p className="text-sm sm:text-base text-[#8B93A1] leading-relaxed">
                  Connect the knowledge your business already relies on so agents work with the right context, tone, and rules.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    name: 'ICP Definition',
                    type: 'Guideline',
                    desc: 'B2B SaaS, 50-500 employees, Series A/B funding within 12 months, EMEA & North America.',
                    usedBy: ['Lead Researcher', 'Market Researcher'],
                  },
                  {
                    name: 'Sales Playbook',
                    type: 'Document',
                    desc: 'Objection handling, 15% standard discounting authority, champion persona discovery gates.',
                    usedBy: ['Lead Researcher', 'Inbound Qualifier'],
                  },
                  {
                    name: 'Support Guidelines',
                    type: 'Guideline',
                    desc: 'Tone of voice rules, tier-1 SLA guarantees, refund policy limits, and security escalation trees.',
                    usedBy: ['Support Assistant'],
                  },
                ].map((doc, idx) => (
                  <ScrollReveal key={doc.name} animation="fade-up" delay={idx * 100}>
                    <GlowCard className="h-full" innerClassName="p-5 flex flex-col justify-between space-y-4">
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-[#F5F5F7]">{doc.name}</span>
                          <span className="text-[10px] font-mono text-[#FF6B35] px-1.5 py-0.2 rounded bg-[#FF6B35]/10">
                            {doc.type}
                          </span>
                        </div>
                        <p className="text-xs text-[#8B93A1] leading-relaxed">{doc.desc}</p>
                      </div>

                      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-[#5C6370]">
                        <span>Used by:</span>
                        <span className="text-[#8B93A1] font-mono">{doc.usedBy.join(', ')}</span>
                      </div>
                    </GlowCard>
                  </ScrollReveal>
                ))}
              </div>

              <div className="text-left">
                <Link
                  href="/product#knowledge"
                  className="text-xs font-semibold text-[#FF6B35] hover:text-[#FFB49B] inline-flex items-center gap-1.5"
                >
                  <span>Explore knowledge center</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ================= INTEGRATIONS SECTION ================= */}
        <ScrollReveal animation="fade-up">
          <section className="py-20 border-t border-[#242832]/60 bg-[#0A0C10]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="max-w-3xl space-y-3">
                <div className="text-xs font-mono uppercase tracking-widest text-[#5C6370]">
                  05 <span className="text-[#FF6B35]">/</span> Enterprise Connectors
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F5F5F7] tracking-tight">
                  Works where your business already works.
                </h2>
                <p className="text-sm sm:text-base text-[#8B93A1]">
                  Connect Nima to the tools your team uses every day with secure OAuth and event webhooks.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {tools.map((t, idx) => (
                  <ScrollReveal key={t.name} animation="fade-up" delay={(idx % 4) * 70}>
                    <GlowCard className="h-full" innerClassName="p-4 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-[#5C6370] uppercase block">
                          {t.type}
                        </span>
                        <h4 className="text-sm font-semibold text-[#F5F5F7] mt-1 group-hover:text-white transition-colors">
                          {t.name}
                        </h4>
                        <p className="text-[11px] text-[#8B93A1] mt-2 leading-relaxed">
                          {t.desc}
                        </p>
                      </div>
                      <div className="mt-4 pt-2 border-t border-white/[0.06] text-[10px] font-mono text-[#32D583] flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" /> Two-way sync
                      </div>
                    </GlowCard>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ================= INTELLIGENCE SECTION ================= */}
        <ScrollReveal animation="fade-up">
          <section className="py-20 bg-[#08090C]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="max-w-3xl space-y-3">
                <div className="text-xs font-mono uppercase tracking-widest text-[#5C6370]">
                  06 <span className="text-[#FF6B35]">/</span> Telemetry & Feedback
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F5F5F7] tracking-tight">
                  The work creates intelligence.
                </h2>
                <p className="text-sm sm:text-base text-[#8B93A1] leading-relaxed">
                  Nima doesn&apos;t stop when a task is complete. It analyzes the work, identifies patterns, and surfaces opportunities.
                </p>
              </div>

              {/* Real Insight Card Preview */}
              <div className="max-w-3xl">
                <GlowCard className="group" innerClassName="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#FF6B35] tracking-wider font-semibold">
                        Business Intelligence • 94% confidence
                      </span>
                      <h3 className="text-lg font-semibold text-[#F5F5F7] mt-1">
                        Your highest-converting prospects are coming from companies with 100–250 employees.
                      </h3>
                    </div>
                    <Badge variant="success" size="sm">
                      High Opportunity
                    </Badge>
                  </div>

                  <p className="text-xs text-[#8B93A1] leading-relaxed">
                    Mid-market companies with 100–250 employees convert at more than double the rate of large enterprise accounts (14.8% vs 4.8%), with sales cycles averaging 18 days vs 44 days.
                  </p>

                  <div className="p-3.5 rounded-xl bg-[#0A0C0F] border border-white/[0.05] text-xs font-mono text-[#8B93A1] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#32D583]" />
                      <span>Based on 284 completed tasks, 1,482 prospect records, last 30 days</span>
                    </div>
                    <span className="text-[#FF6B35] font-semibold">+5.5% trend</span>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs">
                    <span className="text-[#8B93A1]">
                      Recommendation: Shift qualification gate to prioritize 100–250 employees
                    </span>
                    <Link
                      href="/dashboard/insights/insight-1"
                      className="text-[#FF6B35] hover:underline font-medium flex items-center gap-1 shrink-0"
                    >
                      <span>Inspect evidence</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </GlowCard>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ================= RESULTS TIMELINE SECTION ================= */}
        <ScrollReveal animation="fade-up">
          <section className="py-20 border-t border-[#242832]/60 bg-[#0A0C10]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="max-w-3xl space-y-3">
                <div className="text-xs font-mono uppercase tracking-widest text-[#5C6370]">
                  07 <span className="text-[#FF6B35]">/</span> Audit Observability
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F5F5F7] tracking-tight">
                  See the work, not just the answer.
                </h2>
                <p className="text-sm sm:text-base text-[#8B93A1]">
                  Every action an agent takes is recorded with real-time logs, timestamps, and verifiable outcomes.
                </p>
              </div>

              <div className="max-w-2xl p-6 rounded-2xl bg-[#111318] border border-white/[0.06] shadow-xl space-y-4">
                <div className="text-xs font-mono uppercase text-[#5C6370]">Execution Timeline</div>

                <div className="space-y-3">
                  {[
                    { title: 'Research completed', sub: '38 companies found matching Series A filter', time: '10:42 AM', done: true },
                    { title: '18 prospects qualified', sub: 'Evaluated against headcount & ARR rules', time: '10:45 AM', done: true },
                    { title: '27 contacts identified', sub: 'Verified MX records & direct emails', time: '10:47 AM', done: true },
                    { title: 'Waiting for approval', sub: 'Human authorization required before CRM update', time: '10:48 AM', pending: true },
                    { title: '18 contacts added to HubSpot', sub: 'Pushed to production CRM with "Nima" tag', time: '10:49 AM', done: true },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3 text-xs">
                      <div className="mt-0.5 shrink-0">
                        {item.done ? (
                          <CheckCircle2 className="w-4 h-4 text-[#32D583]" />
                        ) : (
                          <span className="w-3.5 h-3.5 rounded-full border-2 border-[#F5B544] flex items-center justify-center inline-block">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F5B544] animate-ping" />
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-[#F5F5F7]">{item.title}</span>
                          <span className="font-mono text-[10px] text-[#5C6370]">{item.time}</span>
                        </div>
                        <p className="text-[11px] text-[#8B93A1] mt-0.5">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ================= USE CASES SECTION ================= */}
        <section className="py-20 bg-[#08090C]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <ScrollReveal animation="fade-up">
              <div className="max-w-3xl space-y-3">
                <div className="text-xs font-mono uppercase tracking-widest text-[#5C6370]">
                  08 <span className="text-[#FF6B35]">/</span> Production Workloads
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F5F5F7] tracking-tight">
                  What would you give Nima?
                </h2>
                <p className="text-sm sm:text-base text-[#8B93A1]">
                  Teams hand off high-frequency operational burdens so humans can focus on closing deals and solving complex issues.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {useCases.map((uc, idx) => (
                <ScrollReveal key={uc.title} animation="fade-up" delay={(idx % 4) * 80}>
                  <GlowCard className="h-full" innerClassName="p-5 flex flex-col justify-between space-y-3">
                    <h4 className="text-sm font-semibold text-[#F5F5F7]">{uc.title}</h4>
                    <p className="text-xs text-[#8B93A1] leading-relaxed">{uc.desc}</p>
                  </GlowCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FINAL CALL TO ACTION BANNER ================= */}
        <ScrollReveal animation="scale-up">
          <section className="py-24 border-t border-white/[0.08] bg-gradient-to-b from-[#0A0C10] to-[#08090C] text-center">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#F5F5F7] tracking-tight">
                Give AI a{' '}
                <span className="animate-shimmer bg-clip-text text-transparent bg-gradient-to-r from-white via-[#FF8C61] via-white to-[#FF6B35]">
                  real job.
                </span>
              </h2>
              <p className="text-base sm:text-lg text-[#8B93A1] max-w-xl mx-auto leading-relaxed">
                Start building autonomous workflows that research, analyze, and take action across your enterprise stack.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link href="/signup">
                  <IslandButton size="lg" variant="primary">
                    Build your first agent
                  </IslandButton>
                </Link>
                <Link href="/demo">
                  <IslandButton size="lg" variant="secondary" showArrow={false}>
                    See live demo
                  </IslandButton>
                </Link>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </main>

      <MarketingFooter />
    </div>
  );
}

