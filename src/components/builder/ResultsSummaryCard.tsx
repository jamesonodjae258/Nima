'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2, ArrowRight, RotateCcw, Database, Clock } from 'lucide-react';

interface ResultsSummaryCardProps {
  agentName: string;
  destination: string;
  onReset: () => void;
}

export const ResultsSummaryCard: React.FC<ResultsSummaryCardProps> = ({
  agentName,
  destination,
  onReset,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto my-6 animate-in fade-in zoom-in-95 duration-200">
      <Card className="border-[#32D583]/40 bg-gradient-to-b from-[#111815] via-[#111318] to-[#0E1015] shadow-[0_0_35px_rgba(50,213,131,0.12)] p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#32D583]/15 border border-[#32D583]/40 flex items-center justify-center text-[#32D583] shadow-md">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#32D583] font-semibold">
                  Autonomous Run Finished
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#32D583]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-[#F5F5F7] tracking-tight mt-0.5">
                Task completed
              </h2>
            </div>
          </div>

          <Badge variant="success" size="md">
            18 prospects added
          </Badge>
        </div>

        {/* Description Banner */}
        <div className="p-4 rounded-xl bg-[#08090C] border border-[#242832] flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-[#5C6370] uppercase">Agent Operator</div>
            <div className="text-sm font-semibold text-[#F5F5F7] mt-0.5">{agentName}</div>
          </div>
          <div className="text-right">
            <div className="text-xs font-mono text-[#5C6370] uppercase">Destination Sync</div>
            <div className="text-sm font-semibold text-[#32D583] mt-0.5">
              18 records → {destination}
            </div>
          </div>
        </div>

        {/* 5 Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-left">
          <div className="p-3 rounded-lg bg-[#171A21] border border-[#242832]">
            <div className="text-[10px] font-mono uppercase text-[#5C6370]">Researched</div>
            <div className="text-lg font-semibold text-[#F5F5F7] mt-1">38</div>
            <div className="text-[10px] text-[#8B93A1]">companies</div>
          </div>
          <div className="p-3 rounded-lg bg-[#171A21] border border-[#242832]">
            <div className="text-[10px] font-mono uppercase text-[#5C6370]">Qualified</div>
            <div className="text-lg font-semibold text-[#32D583] mt-1">18</div>
            <div className="text-[10px] text-[#8B93A1]">ICP matches</div>
          </div>
          <div className="p-3 rounded-lg bg-[#171A21] border border-[#242832]">
            <div className="text-[10px] font-mono uppercase text-[#5C6370]">Contacts</div>
            <div className="text-lg font-semibold text-[#F5F5F7] mt-1">27</div>
            <div className="text-[10px] text-[#8B93A1]">decision makers</div>
          </div>
          <div className="p-3 rounded-lg bg-[#171A21] border border-[#242832]">
            <div className="text-[10px] font-mono uppercase text-[#5C6370]">Added to CRM</div>
            <div className="text-lg font-semibold text-[#FF6B35] mt-1">18</div>
            <div className="text-[10px] text-[#8B93A1]">{destination} contacts</div>
          </div>
          <div className="p-3 rounded-lg bg-[#171A21] border border-[#242832] col-span-2 sm:col-span-1">
            <div className="text-[10px] font-mono uppercase text-[#5C6370]">Time Taken</div>
            <div className="text-lg font-semibold text-[#F5B544] mt-1 font-mono">7m 12s</div>
            <div className="text-[10px] text-[#8B93A1]">autonomous run</div>
          </div>
        </div>

        {/* Buttons Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#242832]">
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-xs text-[#8B93A1] hover:text-[#F5F5F7]"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            <span>Reset & run again</span>
          </Button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Link href="/dashboard/agents" className="flex-1 sm:flex-none">
              <Button variant="secondary" size="sm" className="w-full text-xs">
                Back to agents
              </Button>
            </Link>

            <Link href="/dashboard/tasks/task-1#results" className="flex-1 sm:flex-none">
              <Button size="sm" className="w-full text-xs font-semibold bg-[#FF6B35] hover:bg-[#E95724] text-[#08090C]">
                <span>View full results & prospects</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};
