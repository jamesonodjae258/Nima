'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { initialInsights } from '@/data/mockData';
import { InsightCategoryType } from '@/types';
import {
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  BarChart3,
  ShieldCheck,
  Search,
} from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { RecommendationsSection } from '@/components/insights/RecommendationsSection';

type CategoryFilter = 'All' | 'Performance' | 'Business' | 'Agents';

const TABS: CategoryFilter[] = ['All', 'Performance', 'Business', 'Agents'];

export default function InsightsPage() {
  const [activeTab, setActiveTab] = useState<CategoryFilter>('All');
  const [search, setSearch] = useState('');

  const filteredInsights = initialInsights.filter((insight) => {
    const matchesTab = activeTab === 'All' || insight.category === activeTab;
    const matchesSearch =
      insight.title.toLowerCase().includes(search.toLowerCase()) ||
      insight.headline.toLowerCase().includes(search.toLowerCase()) ||
      insight.description.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#5C6370] mb-1">
            Telemetry Engine <span className="text-[#FF6B35]">•</span> Continuous Synthesis
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F5F7]">
            Insights & Recommendations
          </h1>
          <p className="text-sm text-[#8B93A1] mt-1">
            Empirical patterns, performance acceleration, and high-leverage opportunities Nima found across your workflows.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#8B93A1] flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-[#FF6B35]" />
            <span>{initialInsights.length} Active Patterns</span>
          </div>
        </div>
      </div>

      {/* Interactive Recommendations Section */}
      <RecommendationsSection />

      {/* Category Tabs & Search */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#242832]/60 pb-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {TABS.map((tab) => {
              const isActive = activeTab === tab;
              const count =
                tab === 'All'
                  ? initialInsights.length
                  : initialInsights.filter((i) => i.category === tab).length;

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#171A21] text-[#F5F5F7] border border-[#3D4454] shadow-sm'
                      : 'text-[#8B93A1] hover:text-[#F5F5F7] hover:bg-[#111318]'
                  }`}
                >
                  <span>{tab}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-[#FF6B35]/20 text-[#FF6B35]' : 'bg-[#171A21] text-[#5C6370]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="w-full sm:w-64">
            <Input
              icon={<Search className="w-3.5 h-3.5" />}
              placeholder="Search insights..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Primary Insights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredInsights.map((insight) => (
            <Card
              key={insight.id}
              className="p-6 flex flex-col justify-between border-[#242832] hover:border-[#3D4454] transition-all group bg-[#111318] relative"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase text-[#FF6B35] tracking-wider font-medium">
                        {insight.category} Intelligence
                      </span>
                      {insight.confidenceScore && (
                        <span className="text-[10px] font-mono text-[#32D583] bg-[#32D583]/10 px-1.5 py-0.2 rounded border border-[#32D583]/20 flex items-center gap-1">
                          <ShieldCheck className="w-2.5 h-2.5" />
                          {insight.confidenceScore}% confidence
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/dashboard/insights/${insight.id}`}
                      className="text-base sm:text-lg font-semibold text-[#F5F5F7] tracking-tight mt-1 hover:text-[#FF6B35] transition-colors flex items-center gap-1.5"
                    >
                      <span>{insight.headline}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#FF6B35] shrink-0" />
                    </Link>
                  </div>

                  <Badge variant={insight.impactBadge.includes('High') || insight.impactBadge.includes('+') ? 'success' : 'warning'} size="sm">
                    {insight.impactBadge}
                  </Badge>
                </div>

                <p className="text-xs text-[#8B93A1] leading-relaxed">
                  {insight.description}
                </p>

                {/* Cohort Stats visual if available */}
                {insight.stats && insight.stats.length > 0 && (
                  <div className="p-4 rounded-xl bg-[#0E1015] border border-[#242832] space-y-2.5">
                    <div className="text-[11px] font-mono text-[#5C6370] uppercase flex justify-between">
                      <span>Analyzed Cohort</span>
                      <span>Relative Conversion</span>
                    </div>

                    {insight.stats.map((stat) => (
                      <div key={stat.label} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#F5F5F7] font-medium">{stat.label}</span>
                          <span className="font-mono text-[#32D583] font-semibold">{stat.value}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-[#171A21] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#FF6B35] to-[#32D583] rounded-full"
                            style={{ width: `${Math.min(100, (stat.value / 16) * 100)}%` }}
                          />
                        </div>
                        {stat.note && (
                          <div className="text-[10px] text-[#5C6370] font-mono">{stat.note}</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Grounding Source Citation */}
                {insight.sources && (
                  <div className="text-[11px] font-mono text-[#5C6370] flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-[#FF6B35]" />
                    <span>{insight.sources}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[#242832]/60 flex items-center justify-between">
                <div className="text-xs text-[#8B93A1] truncate max-w-[65%]">
                  <span className="text-[#5C6370] mr-1">Trend:</span>
                  <span className="text-[#F5F5F7] font-medium">{insight.trend || 'Stable'}</span>
                </div>
                <Link href={`/dashboard/insights/${insight.id}`}>
                  <Button size="sm" variant="secondary" className="text-xs">
                    <span>Inspect evidence →</span>
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
