import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { ActivityItem } from '@/types';
import { CheckCircle2, AlertTriangle, Play, BarChart3, ArrowRight, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

export const RecentActivityFeed: React.FC<{ activities: ActivityItem[] }> = ({ activities }) => {
  const getIcon = (type: ActivityItem['type'], status: ActivityItem['status']) => {
    if (status === 'warning') return <AlertTriangle className="w-3.5 h-3.5 text-[#F5B544]" />;
    if (type === 'task_completed') return <CheckCircle2 className="w-3.5 h-3.5 text-[#32D583]" />;
    if (type === 'task_started') return <Play className="w-3.5 h-3.5 text-[#FF6B35]" />;
    if (type === 'analysis') return <BarChart3 className="w-3.5 h-3.5 text-[#FFB49B]" />;
    if (type === 'sync') return <RefreshCw className="w-3.5 h-3.5 text-[#32D583]" />;
    return <CheckCircle2 className="w-3.5 h-3.5 text-[#8B93A1]" />;
  };

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-[#242832]">
        <div>
          <h4 className="text-sm font-semibold text-[#F5F5F7] tracking-tight">Recent Activity</h4>
          <p className="text-xs text-[#8B93A1]">Real-time stream across autonomous agent executions</p>
        </div>
        <Link
          href="/dashboard/activity"
          className="text-xs text-[#FF6B35] hover:text-[#FFB49B] font-medium flex items-center gap-1 transition-colors"
        >
          <span>View all</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-[#242832]">
        {activities.slice(0, 5).map((item) => (
          <div key={item.id} className="relative group">
            {/* Timeline node */}
            <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-[#111318] border border-[#242832] flex items-center justify-center">
              {getIcon(item.type, item.status)}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div className="text-xs">
                <span className="font-semibold text-[#F5F5F7] mr-1.5">{item.agentName}</span>
                <span className="text-[#8B93A1]">{item.action}</span>
              </div>
              <span className="text-[10px] font-mono text-[#5C6370] shrink-0">{item.time}</span>
            </div>

            {item.details && (
              <p className="text-[11px] text-[#8B93A1] mt-0.5 leading-relaxed">
                {item.details}
              </p>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};
