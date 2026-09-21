'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AgentTemplate } from '@/types';
import { ArrowRight, Layers, Database, Cpu, Users, LifeBuoy, BarChart3 } from 'lucide-react';

interface AgentTemplateCardProps {
  template: AgentTemplate;
  onSelect?: (template: AgentTemplate) => void;
}

export function AgentTemplateCard({ template, onSelect }: AgentTemplateCardProps) {
  const router = useRouter();

  const handleUseTemplate = () => {
    if (onSelect) {
      onSelect(template);
    } else {
      const encodedGoal = encodeURIComponent(template.preconfiguredGoal);
      router.push(`/dashboard/agents/new?goal=${encodedGoal}`);
    }
  };

  const getCategoryIcon = (cat: string) => {
    const c = cat.toLowerCase();
    if (c.includes('sales')) return <Users className="w-5 h-5" />;
    if (c.includes('support')) return <LifeBuoy className="w-5 h-5" />;
    return <BarChart3 className="w-5 h-5" />;
  };

  return (
    <Card className="p-5 bg-[#111318] border-[#242832] hover:border-[#FF6B35]/50 transition-all flex flex-col justify-between group">
      <div className="space-y-3.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#171A21] border border-[#242832] flex items-center justify-center text-[#FF6B35] group-hover:border-[#FF6B35]/40 transition-colors">
              {getCategoryIcon(template.category)}
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-[#FF6B35] tracking-wider font-medium">
                {template.category}
              </span>
              <h3 className="text-sm font-semibold text-[#F5F5F7] tracking-tight">
                {template.name}
              </h3>
            </div>
          </div>

          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#171A21] text-[#8B93A1] border border-[#242832] flex items-center gap-1">
            <Cpu className="w-2.5 h-2.5 text-[#FF6B35]" />
            {template.model.split(' ')[0]}
          </span>
        </div>

        <p className="text-xs text-[#8B93A1] leading-relaxed">
          {template.description}
        </p>

        {/* Workflow preview */}
        <div>
          <div className="text-[10px] font-mono uppercase text-[#5C6370] mb-1.5 flex items-center gap-1">
            <Layers className="w-3 h-3 text-[#FF6B35]" />
            <span>Workflow Nodes:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1">
            {template.exampleWorkflow.map((step, idx) => (
              <React.Fragment key={step}>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#171A21] text-[#D1D5DB] border border-[#242832]">
                  {step}
                </span>
                {idx < template.exampleWorkflow.length - 1 && (
                  <span className="text-[#5C6370] text-[10px]">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Integrations & Knowledge */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#242832]/60 text-[11px]">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#5C6370] block mb-1">
              Required Tools
            </span>
            <div className="flex flex-wrap gap-1">
              {template.requiredIntegrations.map((tool) => (
                <span
                  key={tool}
                  className="text-[10px] px-1.5 py-0.5 rounded bg-[#0E1015] text-[#8B93A1] border border-[#242832]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-[#5C6370] block mb-1">
              Knowledge Context
            </span>
            <div className="flex flex-wrap gap-1">
              {template.recommendedKnowledge.map((k) => (
                <span
                  key={k}
                  className="text-[10px] px-1.5 py-0.5 rounded bg-[#0E1015] text-[#8B93A1] border border-[#242832] truncate max-w-[120px]"
                >
                  {k}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-3.5 border-t border-[#242832]/60 flex items-center justify-between">
        <span className="text-[10px] font-mono text-[#5C6370]">
          Pre-configured goal included
        </span>
        <Button
          size="sm"
          onClick={handleUseTemplate}
          className="text-xs font-medium shadow-[0_0_12px_rgba(255,107,53,0.25)]"
        >
          <span>Use template</span>
          <ArrowRight className="w-3 h-3 ml-1" />
        </Button>
      </div>
    </Card>
  );
}
