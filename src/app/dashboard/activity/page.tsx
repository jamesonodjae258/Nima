'use client';

import React, { useState } from 'react';
import { initialActivities } from '@/data/mockData';
import { ActivityItem } from '@/types';
import { ActivityEventDrawer } from '@/components/observability/ActivityEventDrawer';
import {
  CheckCircle2,
  AlertTriangle,
  Play,
  RefreshCw,
  Filter,
  Calendar,
  ShieldCheck,
  Layers,
  ChevronRight,
  Clock,
  ExternalLink,
} from 'lucide-react';

export default function ActivityPage() {
  // Enhanced activity stream matching prompt specification
  const [activities] = useState<ActivityItem[]>([
    {
      id: 'act-top-1',
      time: '10:49 AM',
      dateGroup: 'Today',
      agentName: 'Lead Researcher',
      agentCategory: 'Sales Agent',
      action: 'completed task',
      type: 'task_completed',
      status: 'completed',
      details: '18 prospects added to HubSpot.',
    },
    {
      id: 'act-top-2',
      time: '10:48 AM',
      dateGroup: 'Today',
      agentName: 'Lead Researcher',
      agentCategory: 'Sales Agent',
      action: 'approval approved',
      type: 'sync',
      status: 'completed',
      details: 'James approved CRM update.',
    },
    {
      id: 'act-top-3',
      time: '10:46 AM',
      dateGroup: 'Today',
      agentName: 'Lead Researcher',
      agentCategory: 'Sales Agent',
      action: 'found 18 qualified prospects',
      type: 'analysis',
      status: 'completed',
      details: 'Matched enterprise SaaS criteria and verified contact hierarchy.',
    },
    {
      id: 'act-top-4',
      time: '10:31 AM',
      dateGroup: 'Today',
      agentName: 'Support Agent',
      agentCategory: 'Support Agent',
      action: 'escalated 3 tickets',
      type: 'escalation',
      status: 'warning',
      details: 'Identified 3 high-churn-risk accounts in Zendesk queue and alerted Slack #support-ops.',
    },
    ...initialActivities.slice(2),
  ]);

  const [activeCategory, setActiveCategory] = useState<'All' | 'Agents' | 'Tasks' | 'Approvals' | 'Integrations' | 'Errors'>('All');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'yesterday' | 'week'>('all');
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);

  const categories = ['All', 'Agents', 'Tasks', 'Approvals', 'Integrations', 'Errors'] as const;

  const filteredActivities = activities.filter((act) => {
    // Category filter
    if (activeCategory === 'Agents' && !act.agentName) return false;
    if (activeCategory === 'Tasks' && !act.action.includes('task')) return false;
    if (activeCategory === 'Approvals' && !act.action.includes('approval') && !act.details?.includes('approved')) return false;
    if (activeCategory === 'Integrations' && !act.details?.includes('HubSpot') && !act.details?.includes('Slack') && !act.details?.includes('Zendesk')) return false;
    if (activeCategory === 'Errors' && act.status !== 'warning' && act.status !== 'failed') return false;

    // Date filter
    if (dateFilter === 'today' && act.dateGroup !== 'Today') return false;
    if (dateFilter === 'yesterday' && act.dateGroup !== 'Yesterday') return false;
    if (dateFilter === 'week' && act.dateGroup === 'Earlier') return false;

    return true;
  });

  const grouped = {
    TODAY: filteredActivities.filter((a) => a.dateGroup === 'Today'),
    YESTERDAY: filteredActivities.filter((a) => a.dateGroup === 'Yesterday'),
    EARLIER: filteredActivities.filter((a) => a.dateGroup === 'Earlier'),
  };

  const getStatusIcon = (act: ActivityItem) => {
    if (act.action.includes('approval') || act.details?.includes('approved')) {
      return <ShieldCheck className="w-3.5 h-3.5 text-[#FF6B35]" />;
    }
    if (act.status === 'warning' || act.status === 'failed') {
      return <AlertTriangle className="w-3.5 h-3.5 text-[#F5B544]" />;
    }
    if (act.type === 'task_completed') {
      return <CheckCircle2 className="w-3.5 h-3.5 text-[#32D583]" />;
    }
    if (act.type === 'task_started') {
      return <Play className="w-3.5 h-3.5 text-[#FF6B35]" />;
    }
    return <CheckCircle2 className="w-3.5 h-3.5 text-[#32D583]" />;
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F5F5F7]">
            Activity
          </h1>
          <p className="text-sm text-[#8B93A1] mt-1">
            Everything happening across your agents.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#8B93A1] bg-[#111318] border border-[#242832] px-3 py-1.5 rounded-lg">
          <Calendar className="w-3.5 h-3.5 text-[#FF6B35]" />
          <span>Continuous Real-Time Feed</span>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-1">
        {/* Category Tabs */}
        <div className="flex items-center bg-[#111318] p-1 rounded-lg border border-[#242832] overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#171A21] text-white shadow-sm border border-[#242832]'
                  : 'text-[#8B93A1] hover:text-[#F5F5F7]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Date Filter Dropdown */}
        <div className="flex items-center gap-2 bg-[#111318] px-3 py-1.5 rounded-lg border border-[#242832] text-xs text-[#8B93A1] w-fit">
          <Filter className="w-3.5 h-3.5 text-[#FF6B35]" />
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value as any)}
            className="bg-transparent text-[#F5F5F7] text-xs focus:outline-none cursor-pointer"
          >
            <option value="all" className="bg-[#111318]">All dates</option>
            <option value="today" className="bg-[#111318]">Today only</option>
            <option value="yesterday" className="bg-[#111318]">Yesterday</option>
            <option value="week" className="bg-[#111318]">Last 7 days</option>
          </select>
        </div>
      </div>

      {/* Activity Timeline Groups */}
      <div className="space-y-8">
        {(['TODAY', 'YESTERDAY', 'EARLIER'] as const).map((groupKey) => {
          const items = grouped[groupKey];
          if (items.length === 0) return null;

          return (
            <div key={groupKey} className="space-y-3">
              {/* Group Header */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-semibold uppercase text-[#8B93A1] tracking-wider">
                  {groupKey}
                </span>
                <div className="h-[1px] flex-1 bg-[#242832]" />
              </div>

              {/* Feed Card */}
              <div className="bg-[#111318] border border-[#242832] rounded-xl p-5 shadow-xl divide-y divide-[#242832]/60">
                {items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedActivity(item)}
                    className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-start justify-between gap-3 cursor-pointer group hover:bg-[#171A21]/40 -mx-3 px-3 rounded-lg transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className="p-1.5 rounded-md bg-[#08090C] border border-[#242832] shrink-0 mt-0.5 group-hover:border-[#FF6B35]/40 transition-colors">
                        {getStatusIcon(item)}
                      </div>

                      {/* Text */}
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-semibold text-sm text-[#F5F5F7] group-hover:text-white transition-colors">
                            {item.agentName}
                          </span>
                          <span className="text-xs text-[#8B93A1]">
                            {item.action}
                          </span>
                        </div>

                        {item.details && (
                          <p className="text-xs text-[#8B93A1] mt-1 leading-relaxed">
                            {item.details}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Timestamp & Inspect trigger */}
                    <div className="flex items-center gap-3 pl-8 sm:pl-0 shrink-0 text-xs font-mono text-[#8B93A1]">
                      <span>{item.time}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#8B93A1] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {filteredActivities.length === 0 && (
          <div className="py-16 text-center bg-[#111318] border border-[#242832] rounded-xl p-8">
            <Clock className="w-8 h-8 text-[#8B93A1]/50 mx-auto mb-2" />
            <h4 className="text-sm font-medium text-[#F5F5F7]">No activity matches filter</h4>
            <p className="text-xs text-[#8B93A1] mt-1">Try switching to &quot;All&quot; category or reset date range.</p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('All');
                setDateFilter('all');
              }}
              className="mt-3 text-xs text-[#FF6B35] hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Slide-out Activity Event Drawer */}
      <ActivityEventDrawer
        activity={selectedActivity}
        onClose={() => setSelectedActivity(null)}
      />
    </div>
  );
}
