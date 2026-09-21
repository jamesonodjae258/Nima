'use client';

import React from 'react';
import Link from 'next/link';
import { MarketingNav } from '@/components/marketing/MarketingNav';
import { MarketingFooter } from '@/components/marketing/MarketingFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Check, ArrowRight, HelpCircle } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      name: 'STARTER',
      tagline: 'For individuals and small teams exploring autonomous agent workflows.',
      price: '$29',
      period: '/ month',
      featured: false,
      ctaText: 'Start building',
      ctaHref: '/signup',
      features: [
        '3 active agents',
        '500 tasks / month',
        'Basic integrations (Sheets, Notion, Slack)',
        'Pre-configured agent templates',
        '30-day execution history & logs',
        'Standard LLM reasoning engine',
      ],
    },
    {
      name: 'GROWTH',
      tagline: 'For growing teams scaling multi-step research and CRM execution.',
      price: '$99',
      period: '/ month',
      featured: true,
      badge: 'Most Popular',
      ctaText: 'Start building',
      ctaHref: '/signup',
      features: [
        '15 active agents',
        '5,000 tasks / month',
        'Advanced integrations (HubSpot, Salesforce, Stripe)',
        'Knowledge Center (Vector semantic embedding)',
        'Continuous Intelligence & Insights synthesis',
        'Human approval governance gates',
        'Persistent agent memory & custom guidelines',
        'Priority execution queues',
      ],
    },
    {
      name: 'SCALE',
      tagline: 'For larger organizations requiring custom infrastructure and security.',
      price: 'Custom',
      period: '',
      featured: false,
      ctaText: 'Talk to sales',
      ctaHref: '/signup',
      features: [
        'Unlimited active agents',
        'Custom task & token volume limits',
        'Granular IAM permission boundaries',
        'Custom private model endpoints & VPC peering',
        'Dedicated customer success architect',
        'Enterprise SLA & 99.9% uptime guarantee',
        'SOC2 Type II compliance controls & audit export',
      ],
    },
  ];

  const comparison = [
    { feature: 'Active Autonomous Agents', starter: '3', growth: '15', scale: 'Unlimited' },
    { feature: 'Monthly Task Executions', starter: '500', growth: '5,000', scale: 'Custom' },
    { feature: 'Execution Observability & Logs', starter: '30 days', growth: '90 days', scale: 'Unlimited' },
    { feature: 'Human Approval Checkpoints', starter: 'Basic', growth: 'Full Support', scale: 'Custom Multi-Reviewer' },
    { feature: 'Knowledge Center Vector Indexing', starter: '—', growth: 'Included (1,536d)', scale: 'Private Embeddings' },
    { feature: 'Automated Business Insights', starter: '—', growth: 'Included', scale: 'Real-Time Streaming' },
    { feature: 'Enterprise Integrations (HubSpot/Salesforce)', starter: '—', growth: 'Included', scale: 'Custom API Scopes' },
    { feature: 'Dedicated Support & SLA', starter: 'Community', growth: 'Priority Email', scale: '15m Dedicated Slack' },
  ];

  return (
    <div className="min-h-screen bg-[#08090C] text-[#F5F5F7] flex flex-col selection:bg-[#FF6B35]/30 selection:text-white">
      <MarketingNav />

      <main className="flex-1">
        {/* Header */}
        <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-[#5C6370]">
            Commercial <span className="text-[#FF6B35]">/</span> Transparent Tiers
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#F5F5F7] tracking-tight">
            AI agents for every stage of your business.
          </h1>
          <p className="text-base sm:text-lg text-[#8B93A1] max-w-2xl mx-auto leading-relaxed">
            Transparent plans designed for teams automating repetitive research, support triage, and operational workflows.
          </p>

          <div className="pt-2">
            <span className="text-[11px] font-mono text-[#5C6370] px-3 py-1 rounded-full bg-[#111318] border border-[#242832]">
              Prototype Portfolio Specification • 14-day full feature trial included
            </span>
          </div>
        </section>

        {/* 3 Pricing Cards */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`p-7 rounded-2xl flex flex-col justify-between transition-all relative ${
                  plan.featured
                    ? 'bg-[#111318] border-2 border-[#FF6B35] shadow-[0_0_50px_rgba(255,107,53,0.15)] lg:-translate-y-2'
                    : 'bg-[#111318] border border-[#242832] hover:border-[#3D4454]'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full bg-[#FF6B35] text-[#08090C] font-mono text-[10px] font-semibold tracking-wider uppercase shadow-md">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="text-xs font-mono uppercase tracking-wider text-[#FF6B35] font-semibold">
                      {plan.name}
                    </div>
                    <p className="text-xs text-[#8B93A1] leading-relaxed min-h-[36px]">
                      {plan.tagline}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1 pt-2 border-t border-[#242832]/60">
                    <span className="text-4xl font-semibold text-[#F5F5F7] tracking-tight">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-xs font-mono text-[#8B93A1]">{plan.period}</span>
                    )}
                  </div>

                  <div className="space-y-3 pt-4 border-t border-[#242832]/60">
                    <div className="text-[10px] font-mono uppercase text-[#5C6370]">
                      What&apos;s included:
                    </div>
                    <ul className="space-y-2.5 text-xs text-[#8B93A1]">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#32D583] shrink-0 mt-0.5" />
                          <span className="text-[#F5F5F7]">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8">
                  <Link href={plan.ctaHref}>
                    <Button
                      variant={plan.featured ? 'primary' : 'secondary'}
                      className="w-full text-xs font-medium justify-center"
                    >
                      <span>{plan.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="py-20 border-t border-[#242832]/60 bg-[#0A0C10]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#F5F5F7] tracking-tight">
                Plan Comparison
              </h2>
              <p className="text-xs text-[#8B93A1]">
                Detailed architectural capabilities broken down across subscription tiers.
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[#242832] bg-[#111318]">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#242832] bg-[#0E1015] text-[#5C6370] font-mono text-[11px]">
                    <th className="p-4">Capability</th>
                    <th className="p-4 text-center">Starter</th>
                    <th className="p-4 text-center text-[#FF6B35]">Growth</th>
                    <th className="p-4 text-center">Scale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#242832]/60">
                  {comparison.map((row) => (
                    <tr key={row.feature} className="hover:bg-[#171A21]/50 transition-colors">
                      <td className="p-4 font-medium text-[#F5F5F7]">{row.feature}</td>
                      <td className="p-4 text-center font-mono text-[#8B93A1]">{row.starter}</td>
                      <td className="p-4 text-center font-mono text-[#F5F5F7] bg-[#FF6B35]/5 font-semibold">
                        {row.growth}
                      </td>
                      <td className="p-4 text-center font-mono text-[#8B93A1]">{row.scale}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
