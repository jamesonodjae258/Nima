'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { AgentStatus } from '@/components/ui/AgentStatus';
import { Button } from '@/components/ui/Button';
import { Agent } from '@/types';
import {
  MoreVertical,
  Play,
  Pause,
  ExternalLink,
  CheckCircle2,
  Clock,
  BookOpen,
  Copy,
  Archive,
  ArrowRight,
} from 'lucide-react';
import { initialKnowledgeResources } from '@/data/mockData';

interface AgentCardProps {
  agent: Agent;
  onToggleStatus?: (agentId: string) => void;
  onPauseRequest?: (agent: Agent) => void;
  onDuplicateRequest?: (agent: Agent) => void;
  onArchiveRequest?: (agent: Agent) => void;
  onRunTask?: (agent: Agent) => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({
  agent,
  onToggleStatus,
  onPauseRequest,
  onDuplicateRequest,
  onArchiveRequest,
  onRunTask,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Count attached knowledge sources
  const attachedKnowledgeCount = initialKnowledgeResources.filter(
    (k) =>
      k.usedByAgents.includes(agent.name) ||
      k.usedByAgents.includes('All active agents')
  ).length;

  return (
    <Card className="p-5 flex flex-col justify-between hover:border-[#3D4454] transition-all duration-150 relative group bg-[#111318]">
      <div>
        {/* Card Header: Category, Status, Overflow menu */}
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1 min-w-0">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8B93A1]">
              {agent.category}
            </span>
            <Link
              href={`/dashboard/agents/${agent.id}`}
              className="block group-hover:text-white transition-colors truncate"
            >
              <h4 className="text-base font-semibold text-[#F5F5F7] tracking-tight hover:text-[#FF6B35] transition-colors truncate">
                {agent.name}
              </h4>
            </Link>
          </div>

          <div className="flex items-center gap-2 relative shrink-0">
            <AgentStatus status={agent.status} size="sm" />

            {/* Overflow menu trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-1 rounded-md text-[#5C6370] hover:text-[#F5F5F7] hover:bg-[#171A21] transition-colors"
                aria-label="Agent options"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {menuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-1 w-48 rounded-xl bg-[#171A21] border border-[#242832] shadow-2xl py-1.5 z-30 text-xs text-[#F5F5F7] animate-in fade-in zoom-in-95 duration-100">
                    <Link
                      href={`/dashboard/agents/${agent.id}`}
                      onClick={() => setMenuOpen(false)}
                      className="w-full px-3 py-1.5 text-left hover:bg-[#242832] flex items-center gap-2 block transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#FF6B35]" />
                      <span>Open agent</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        if (onRunTask) onRunTask(agent);
                      }}
                      className="w-full px-3 py-1.5 text-left hover:bg-[#242832] flex items-center gap-2 transition-colors"
                    >
                      <Play className="w-3.5 h-3.5 text-[#32D583]" />
                      <span>Run task</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        if (onPauseRequest) {
                          onPauseRequest(agent);
                        } else if (onToggleStatus) {
                          onToggleStatus(agent.id);
                        }
                      }}
                      className="w-full px-3 py-1.5 text-left hover:bg-[#242832] flex items-center gap-2 transition-colors"
                    >
                      <Pause className="w-3.5 h-3.5 text-[#F5B544]" />
                      <span>{agent.status === 'running' ? 'Pause agent' : 'Resume agent'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        if (onDuplicateRequest) onDuplicateRequest(agent);
                      }}
                      className="w-full px-3 py-1.5 text-left hover:bg-[#242832] flex items-center gap-2 transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5 text-[#8B93A1]" />
                      <span>Duplicate agent</span>
                    </button>

                    <div className="my-1 border-t border-[#242832]" />

                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        if (onArchiveRequest) onArchiveRequest(agent);
                      }}
                      className="w-full px-3 py-1.5 text-left hover:bg-[#242832] flex items-center gap-2 text-[#F04438] transition-colors"
                    >
                      <Archive className="w-3.5 h-3.5 text-[#F04438]" />
                      <span>Archive agent</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-[#8B93A1] mt-2.5 line-clamp-2 leading-relaxed">
          {agent.description}
        </p>

        {/* Attached Knowledge & Tools */}
        <div className="flex flex-wrap items-center gap-1.5 mt-3">
          {attachedKnowledgeCount > 0 && (
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#FF6B35]/10 text-[#FF6B35] border border-[#FF6B35]/20 font-mono flex items-center gap-1">
              <BookOpen className="w-2.5 h-2.5" />
              <span>{attachedKnowledgeCount} knowledge {attachedKnowledgeCount === 1 ? 'doc' : 'docs'}</span>
            </span>
          )}

          {agent.tools.map((tool) => (
            <span
              key={tool}
              className="text-[10px] px-2 py-0.5 rounded bg-[#171A21] text-[#8B93A1] border border-[#242832] font-mono"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Metrics & Footer */}
      <div className="mt-5 pt-3.5 border-t border-[#242832]/60">
        <div className="grid grid-cols-3 gap-2 text-left mb-3">
          <div>
            <div className="text-[10px] uppercase font-mono text-[#5C6370]">Tasks</div>
            <div className="text-xs font-semibold text-[#F5F5F7] mt-0.5">
              {agent.taskCount.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono text-[#5C6370]">Success</div>
            <div className="text-xs font-semibold text-[#32D583] mt-0.5">
              {agent.successRate}%
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono text-[#5C6370]">Last Run</div>
            <div className="text-xs font-medium text-[#8B93A1] mt-0.5 flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#5C6370]" />
              <span className="truncate">{agent.lastActive}</span>
            </div>
          </div>
        </div>

        {/* Actions bar: Primary Open Agent, Secondary Run Task */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <Link href={`/dashboard/agents/${agent.id}`} className="flex-1">
            <Button
              variant="secondary"
              size="sm"
              className="w-full text-xs font-medium"
            >
              <span>Open agent</span>
              <ArrowRight className="w-3 h-3 ml-1 text-[#FF6B35]" />
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (onRunTask) onRunTask(agent);
              else if (onToggleStatus) onToggleStatus(agent.id);
            }}
            className="text-xs text-[#8B93A1] hover:text-[#32D583]"
          >
            <Play className="w-3 h-3 mr-1 text-[#32D583]" />
            <span>Run task</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};
