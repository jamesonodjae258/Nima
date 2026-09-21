import React from 'react';
import { Card } from '@/components/ui/Card';
import { MetricCardData } from '@/types';
import { Cpu, CheckCircle2, Activity, Clock, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const MetricCard: React.FC<{ data: MetricCardData }> = ({ data }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Cpu':
        return <Cpu className="w-4 h-4 text-[#FF6B35]" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-4 h-4 text-[#32D583]" />;
      case 'Activity':
        return <Activity className="w-4 h-4 text-[#FF6B35]" />;
      case 'Clock':
        return <Clock className="w-4 h-4 text-[#F5B544]" />;
      default:
        return <Activity className="w-4 h-4 text-[#FF6B35]" />;
    }
  };

  return (
    <Card className="p-5 hover:border-[#3D4454] transition-colors relative overflow-hidden group">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-[#8B93A1] tracking-tight uppercase font-mono">
            {data.title}
          </p>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F5F7]">
              {data.value}
            </span>
          </div>
        </div>

        <div className="w-8 h-8 rounded-lg bg-[#171A21] border border-[#242832] flex items-center justify-center">
          {getIcon(data.iconName)}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#242832]/60 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1">
          <span
            className={cn(
              'font-medium inline-flex items-center',
              data.changeType === 'positive'
                ? 'text-[#32D583]'
                : data.changeType === 'negative'
                ? 'text-[#F04438]'
                : 'text-[#8B93A1]'
            )}
          >
            {data.changeType === 'positive' && <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />}
            {data.change}
          </span>
        </div>
        <span className="text-[#5C6370]">{data.period}</span>
      </div>
    </Card>
  );
};
