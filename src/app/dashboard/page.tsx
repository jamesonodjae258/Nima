'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { WorkflowPipeline } from '@/components/dashboard/WorkflowPipeline';
import { AgentCard } from '@/components/dashboard/AgentCard';
import { RecentActivityFeed } from '@/components/dashboard/RecentActivityFeed';
import { QuickActionCard } from '@/components/dashboard/QuickActionCard';
import { metricCardsData, initialAgents, initialActivities } from '@/data/mockData';
import { Plus, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  const [agents, setAgents] = useState(initialAgents);

  const handleToggleAgent = (agentId: string) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === agentId
          ? { ...agent, status: agent.status === 'running' ? 'paused' : 'running' }
          : agent
      )
    );
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F5F7]">
            Good morning, James.
          </h1>
          <p className="text-sm text-[#8B93A1] mt-1">
            Here&apos;s what your agents have been working on.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/dashboard/agents/new">
            <Button className="font-medium shadow-[0_0_15px_rgba(255,107,53,0.3)]">
              <Plus className="w-4 h-4 mr-1.5" />
              <span>Create agent</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Reusable Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCardsData.map((metric) => (
          <MetricCard key={metric.id} data={metric} />
        ))}
      </div>

      {/* Live Autonomous Workflow Pipeline (GOAL -> AGENT -> WORKFLOW -> ACTION -> RESULT) */}
      <WorkflowPipeline />

      {/* Active Agents Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#F5F5F7] tracking-tight">Active agents</h2>
            <p className="text-xs text-[#8B93A1]">Autonomous workers monitoring queues and executing actions</p>
          </div>
          <Link
            href="/dashboard/agents"
            className="text-xs text-[#FF6B35] hover:text-[#FFB49B] font-medium flex items-center gap-1 transition-colors"
          >
            <span>View all 12 agents</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.slice(0, 3).map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onToggleStatus={handleToggleAgent}
            />
          ))}
        </div>
      </div>

      {/* Two Column Layout: Recent Activity & Quick Action */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivityFeed activities={initialActivities} />
        </div>
        <div className="lg:col-span-1 flex flex-col justify-start">
          <QuickActionCard />
        </div>
      </div>
    </div>
  );
}
