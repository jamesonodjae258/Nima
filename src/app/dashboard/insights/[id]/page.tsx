'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { initialInsights, initialTasks, initialAgents } from '@/data/mockData';
import { InsightItem } from '@/types';
import {
  ArrowLeft,
  ShieldCheck,
  TrendingUp,
  Clock,
  Cpu,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Zap,
  Check,
  FileSearch,
} from 'lucide-react';

export default function InsightDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || 'insight-1';

  const defaultInsight =
    initialInsights.find((i) => i.id === id) || initialInsights[0];

  const [insight, setInsight] = useState<InsightItem>(defaultInsight);
  const [isApplying, setIsApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleApplyRecommendation = () => {
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      setApplied(true);
      setModalOpen(false);
    }, 700);
  };

  // Find related task objects
  const relatedTasksList = (insight.relatedTaskIds || ['task-1']).map((taskId) => {
    const found = initialTasks.find((t) => t.id === taskId);
    return (
      found || {
        id: taskId,
        title: 'Prospect Research Run',
        status: 'completed' as const,
        agentName: 'Lead Researcher',
        duration: '7m 12s',
        result: '38 companies',
      }
    );
  });

  // Find related agent objects
  const relatedAgentsList = (insight.relatedAgentNames || ['Lead Researcher']).map(
    (agentName) => {
      const found = initialAgents.find((a) => a.name === agentName);
      return (
        found || {
          id: 'agent-1',
          name: agentName,
          category: 'Sales Agent',
          successRate: 97.2,
          taskCount: 284,
        }
      );
    }
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/insights"
          className="inline-flex items-center text-xs font-medium text-[#8B93A1] hover:text-[#F5F5F7] transition-colors gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Insights</span>
        </Link>

        {applied ? (
          <span className="text-xs text-[#32D583] flex items-center gap-1 font-mono">
            <Check className="w-3.5 h-3.5" /> Recommendation active in runtime
          </span>
        ) : (
          <Button
            size="sm"
            onClick={() => setModalOpen(true)}
            className="text-xs font-medium shadow-[0_0_12px_rgba(255,107,53,0.25)]"
          >
            <Zap className="w-3.5 h-3.5 mr-1.5" />
            <span>Apply recommendation</span>
          </Button>
        )}
      </div>

      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-[#111318] border border-[#242832]">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-[#171A21] text-[#FF6B35] border border-[#242832]">
                {insight.category} Intelligence
              </span>
              <Badge
                variant={
                  insight.impactBadge.includes('High') || insight.impactBadge.includes('+')
                    ? 'success'
                    : 'warning'
                }
              >
                {insight.impactBadge}
              </Badge>
              {insight.confidenceScore && (
                <span className="text-xs font-mono text-[#32D583] bg-[#32D583]/10 px-2 py-0.5 rounded border border-[#32D583]/20 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  {insight.confidenceScore}% confidence score
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl font-semibold text-[#F5F5F7] tracking-tight">
              {insight.headline}
            </h1>
            <p className="text-xs sm:text-sm text-[#8B93A1] leading-relaxed">
              {insight.description}
            </p>
          </div>

          <div className="text-right shrink-0">
            <div className="text-[10px] font-mono text-[#5C6370] uppercase">Timeframe</div>
            <div className="text-xs font-mono text-[#F5F5F7] mt-0.5">{insight.timeframe || 'Last 30 days'}</div>
            {insight.trend && (
              <div className="text-xs text-[#32D583] font-medium mt-1.5 flex items-center justify-end gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>{insight.trend}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Grounded Analysis Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: What Nima Observed */}
          <Card className="p-5 bg-[#111318] border-[#242832] space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#FF6B35]" />
              <h2 className="text-sm font-semibold text-[#F5F5F7] tracking-tight">
                Empirical Telemetry Observed
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#8B93A1] leading-relaxed">
              {insight.whatObserved ||
                'Outbound campaigns targeting 100-250 employee SaaS companies closed 14.8% demo-to-opportunity conversion, compared to 4.8% for large enterprise (500+).'}
            </p>
          </Card>

          {/* Section 2: Data Analyzed */}
          <Card className="p-5 bg-[#111318] border-[#242832] space-y-3">
            <div className="flex items-center gap-2">
              <FileSearch className="w-4 h-4 text-[#FF6B35]" />
              <h2 className="text-sm font-semibold text-[#F5F5F7] tracking-tight">
                What Data Was Analyzed
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#8B93A1] leading-relaxed">
              {insight.dataAnalyzed ||
                'Analyzed 1,482 prospect records synced across HubSpot CRM and SDR calendar booking webhooks over the preceding 30 days.'}
            </p>

            <div className="p-3.5 rounded-xl bg-[#0E1015] border border-[#242832] space-y-2">
              <div className="text-[11px] font-mono text-[#5C6370] uppercase">
                Ground-Truth Evidence Sources
              </div>
              <div className="text-xs font-mono text-[#8B93A1] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#32D583]" />
                <span>{insight.sources || 'Based on 284 completed tasks, 1,482 prospect records, last 30 days'}</span>
              </div>
            </div>
          </Card>

          {/* Section 3: Why the Pattern Matters */}
          <Card className="p-5 bg-[#111318] border-[#242832] space-y-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#FF6B35]" />
              <h2 className="text-sm font-semibold text-[#F5F5F7] tracking-tight">
                Why It Matters
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#8B93A1] leading-relaxed">
              {insight.whyItMatters ||
                'Prioritizing this cohort doubles pipeline velocity while cutting customer acquisition time in half (18 days vs 44 days). SDRs achieve higher commission yields and sales cycles close with significantly fewer legal redlines.'}
            </p>
          </Card>

          {/* Section 4: Cohort Breakdown Visualization */}
          {insight.stats && insight.stats.length > 0 && (
            <Card className="p-5 bg-[#111318] border-[#242832] space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-[#F5F5F7] tracking-tight">
                  Empirical Cohort Performance
                </h2>
                <span className="text-[11px] font-mono text-[#5C6370]">Demo-to-Opportunity %</span>
              </div>

              <div className="space-y-3">
                {insight.stats.map((stat) => (
                  <div key={stat.label} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#F5F5F7] font-medium">{stat.label}</span>
                      <div className="flex items-center gap-2">
                        {stat.note && (
                          <span className="text-[10px] text-[#5C6370] font-mono">{stat.note}</span>
                        )}
                        <span className="font-mono text-[#32D583] font-semibold">
                          {stat.value}%
                        </span>
                      </div>
                    </div>
                    <div className="h-2 w-full bg-[#171A21] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#FF6B35] to-[#32D583] rounded-full"
                        style={{ width: `${(stat.value / 16) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Right Sidebar: Recommendation & Related Context */}
        <div className="space-y-6">
          {/* Recommendation Card */}
          <Card className="p-5 bg-[#111318] border-[#242832] space-y-3.5">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-[#FF6B35]/15 border border-[#FF6B35]/30 flex items-center justify-center text-[#FF6B35]">
                <Zap className="w-3 h-3" />
              </div>
              <h3 className="text-xs font-mono uppercase text-[#FF6B35] font-medium">
                Actionable Recommendation
              </h3>
            </div>

            <p className="text-xs text-[#F5F5F7] font-medium leading-relaxed">
              {insight.recommendation ||
                'Update Lead Researcher qualification criteria to prioritize companies with 100–250 employees.'}
            </p>

            <div className="p-3 rounded-lg bg-[#0E1015] border border-[#242832] text-[11px] text-[#8B93A1] space-y-1 font-mono">
              <div className="text-[#5C6370]">Suggested Action:</div>
              <div className="text-[#32D583]">✓ Shift ICP filter: 100–250 employees</div>
            </div>

            {applied ? (
              <div className="p-2.5 rounded-lg bg-[#32D583]/10 border border-[#32D583]/20 text-center text-xs text-[#32D583] font-mono flex items-center justify-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> Recommendation applied
              </div>
            ) : (
              <Button
                onClick={() => setModalOpen(true)}
                className="w-full text-xs font-medium shadow-[0_0_12px_rgba(255,107,53,0.25)]"
              >
                Apply Recommendation
              </Button>
            )}
          </Card>

          {/* Contributing Tasks */}
          <Card className="p-4 bg-[#111318] border-[#242832] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase text-[#5C6370] tracking-wider">
                Contributing Tasks ({relatedTasksList.length})
              </h3>
              <Link
                href="/dashboard/tasks"
                className="text-[10px] text-[#FF6B35] hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="space-y-2">
              {relatedTasksList.map((task) => (
                <div
                  key={task.id}
                  className="p-2.5 rounded-lg bg-[#171A21] border border-[#242832] flex items-center justify-between text-xs"
                >
                  <div className="min-w-0 pr-2">
                    <Link
                      href={`/dashboard/tasks/${task.id}`}
                      className="text-[#F5F5F7] font-medium hover:text-[#FF6B35] transition-colors truncate block flex items-center gap-1"
                    >
                      <span className="truncate">{task.title}</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-60 shrink-0" />
                    </Link>
                    <div className="text-[10px] font-mono text-[#5C6370] mt-0.5">
                      {task.agentName} • {task.duration}
                    </div>
                  </div>
                  <Badge variant="success" size="sm">
                    {task.result}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Related Agents */}
          <Card className="p-4 bg-[#111318] border-[#242832] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase text-[#5C6370] tracking-wider">
                Target Agents ({relatedAgentsList.length})
              </h3>
            </div>

            <div className="space-y-2">
              {relatedAgentsList.map((agent) => (
                <div
                  key={agent.id}
                  className="p-2.5 rounded-lg bg-[#171A21] border border-[#242832] flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-md bg-[#111318] border border-[#242832] flex items-center justify-center text-[#FF6B35] shrink-0">
                      <Cpu className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <Link
                        href={`/dashboard/agents/${agent.id}`}
                        className="text-[#F5F5F7] font-medium hover:text-[#FF6B35] transition-colors truncate block flex items-center gap-1"
                      >
                        <span className="truncate">{agent.name}</span>
                        <ExternalLink className="w-2.5 h-2.5 opacity-60 shrink-0" />
                      </Link>
                      <div className="text-[10px] font-mono text-[#5C6370]">
                        {agent.category}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-[#32D583]">
                    {agent.successRate}%
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Apply Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          if (!isApplying) setModalOpen(false);
        }}
        title="Apply Recommendation"
        description="Nima will update Lead Researcher Qualification criteria based on this insight."
      >
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#0E1015] border border-[#242832] space-y-2 text-xs">
            <div className="text-[#8B93A1]">
              Target: <span className="text-[#F5F5F7] font-medium">Lead Researcher</span>
            </div>
            <div className="text-[#8B93A1]">
              Parameter: <span className="font-mono text-[#F5F5F7]">Qualification Criteria &rarr; Company Size</span>
            </div>
            <div className="pt-2 border-t border-[#242832]/60 flex items-center justify-between font-mono">
              <span className="line-through text-[#8B93A1]">50–500 employees</span>
              <span className="text-[#32D583] font-semibold flex items-center gap-1">
                <ArrowRight className="w-3 h-3 text-[#FF6B35]" />
                100–250 employees
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#242832]">
            <Button
              variant="ghost"
              onClick={() => setModalOpen(false)}
              disabled={isApplying}
            >
              Cancel
            </Button>
            <Button
              onClick={handleApplyRecommendation}
              disabled={isApplying}
              className="font-medium shadow-[0_0_12px_rgba(255,107,53,0.25)]"
            >
              {isApplying ? 'Updating agent...' : 'Confirm & Apply'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
