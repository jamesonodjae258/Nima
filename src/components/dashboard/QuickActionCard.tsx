import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Cpu, ArrowRight } from 'lucide-react';

export const QuickActionCard: React.FC = () => {
  return (
    <Card className="p-6 bg-gradient-to-br from-[#171A21] via-[#111318] to-[#0D0F14] border-[#FF6B35]/30 relative overflow-hidden group">
      {/* Subtle radial glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#FF6B35]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-[#8B93A1]">
            <Cpu className="w-3 h-3 text-[#FF6B35]" />
            <span>Agent Orchestration</span>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-[#F5F5F7] tracking-tight">
            Deploy an agent
          </h3>
          <p className="text-sm text-[#8B93A1] leading-relaxed">
            Define objectives, configure tool access, and launch autonomous execution pipelines with human-in-the-loop review gates.
          </p>
        </div>

        <Link href="/dashboard/agents/new" className="shrink-0">
          <Button
            size="lg"
            className="w-full sm:w-auto font-medium shadow-[0_0_20px_rgba(255,107,53,0.35)]"
          >
            <span>Build an agent</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </Card>
  );
};
