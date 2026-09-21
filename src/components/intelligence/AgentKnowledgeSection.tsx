'use client';

import React from 'react';
import Link from 'next/link';
import { initialKnowledgeResources } from '@/data/mockData';
import { BookOpen, FileText, ArrowRight, ExternalLink, CheckCircle2 } from 'lucide-react';

interface AgentKnowledgeSectionProps {
  agentName?: string;
  connectedResourceIds?: string[];
}

export function AgentKnowledgeSection({
  agentName = 'Lead Researcher',
  connectedResourceIds = ['res-1', 'res-2', 'res-6'],
}: AgentKnowledgeSectionProps) {
  const connectedResources = initialKnowledgeResources.filter((res) =>
    connectedResourceIds.includes(res.id)
  );

  return (
    <div className="bg-[#111318] border border-[#242832] rounded-xl p-5 md:p-6 shadow-xl relative space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#242832]/60">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-4 h-4 text-[#FF6B35]" />
            <h3 className="text-sm font-semibold text-[#F5F5F7] tracking-tight">
              Knowledge
            </h3>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#32D583]/10 text-[#32D583] border border-[#32D583]/20">
              {connectedResources.length} connected
            </span>
          </div>
          <p className="text-xs text-[#8B93A1]">
            Ground-truth documents and rules informing {agentName}&apos;s autonomous reasoning.
          </p>
        </div>

        <Link
          href="/dashboard/knowledge"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#171A21] hover:bg-[#242832] border border-[#242832] text-xs text-[#F5F5F7] font-medium transition-colors cursor-pointer self-start sm:self-auto"
        >
          <span>Manage knowledge</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#FF6B35]" />
        </Link>
      </div>

      {/* Connected Knowledge Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {connectedResources.map((res) => (
          <Link
            key={res.id}
            href={`/dashboard/knowledge/${res.id}`}
            className="p-3.5 rounded-xl bg-[#171A21]/60 border border-[#242832] hover:border-[#FF6B35]/50 transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-[#08090C] border border-[#242832] flex items-center justify-center text-[#FF6B35]">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#08090C] text-[#8B93A1] border border-[#242832]">
                  {res.type}
                </span>
              </div>

              <h4 className="text-xs font-semibold text-[#F5F5F7] group-hover:text-white transition-colors">
                {res.name}
              </h4>
              <p className="text-[11px] text-[#8B93A1] mt-1 line-clamp-2 leading-relaxed">
                {res.description}
              </p>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-[#5C6370] mt-3 pt-2 border-t border-[#242832]/60">
              <span>{res.updatedDate}</span>
              <span className="text-[#FF6B35] group-hover:translate-x-0.5 transition-transform">
                Open →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
