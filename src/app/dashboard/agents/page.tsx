'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Tabs } from '@/components/ui/Tabs';
import { AgentCard } from '@/components/dashboard/AgentCard';
import { initialAgents } from '@/data/mockData';
import { Agent, AgentTemplate } from '@/types';
import { Search, Plus, Layers, ArrowUpDown, Check } from 'lucide-react';
import { AgentTemplatesModal } from '@/components/agents/AgentTemplatesModal';
import { AgentDuplicationModal } from '@/components/agents/AgentDuplicationModal';
import { AgentPauseModal } from '@/components/agents/AgentPauseModal';
import { AgentArchiveModal } from '@/components/agents/AgentArchiveModal';

type SortOption = 'recently_active' | 'most_tasks' | 'highest_success';

export default function AgentsPage() {
  const router = useRouter();
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('recently_active');

  // Modals state
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [duplicatingAgent, setDuplicatingAgent] = useState<Agent | null>(null);
  const [pausingAgent, setPausingAgent] = useState<Agent | null>(null);
  const [archivingAgent, setArchivingAgent] = useState<Agent | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleAgent = (agentId: string) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === agentId
          ? {
              ...agent,
              status: agent.status === 'running' ? 'paused' : 'running',
            }
          : agent
      )
    );
  };

  const handleConfirmPause = () => {
    if (!pausingAgent) return;
    const nextStatus = pausingAgent.status === 'running' ? 'paused' : 'running';
    setAgents((prev) =>
      prev.map((a) => (a.id === pausingAgent.id ? { ...a, status: nextStatus } : a))
    );
    showToast(
      nextStatus === 'paused'
        ? `${pausingAgent.name} has been paused.`
        : `${pausingAgent.name} resumed.`
    );
    setPausingAgent(null);
  };

  const handleDuplicateAgent = (newAgent: Agent) => {
    setAgents((prev) => [newAgent, ...prev]);
    showToast(`Created duplicate: ${newAgent.name}`);
  };

  const handleConfirmArchive = () => {
    if (!archivingAgent) return;
    setAgents((prev) => prev.filter((a) => a.id !== archivingAgent.id));
    showToast(`${archivingAgent.name} has been archived.`);
    setArchivingAgent(null);
  };

  const handleRunTask = (agent: Agent) => {
    router.push(`/dashboard/agents/${agent.id}/activity`);
  };

  const filterCounts = {
    all: agents.length,
    running: agents.filter((a) => a.status === 'running').length,
    idle: agents.filter((a) => a.status === 'idle').length,
    paused: agents.filter((a) => a.status === 'paused').length,
  };

  const filterTabs = [
    { id: 'all', label: 'All Agents', count: filterCounts.all },
    { id: 'running', label: 'Running', count: filterCounts.running },
    { id: 'idle', label: 'Idle', count: filterCounts.idle },
    { id: 'paused', label: 'Paused', count: filterCounts.paused },
  ];

  let filtered = agents.filter((agent) => {
    const matchesFilter =
      activeFilter === 'all' ? true : agent.status === activeFilter;
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Sort
  if (sortBy === 'most_tasks') {
    filtered = [...filtered].sort((a, b) => b.taskCount - a.taskCount);
  } else if (sortBy === 'highest_success') {
    filtered = [...filtered].sort((a, b) => b.successRate - a.successRate);
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-[#FF6B35] bg-[#FF6B35]/10 px-2 py-0.5 rounded border border-[#FF6B35]/20">
              Agent Orchestration
            </span>
            <span className="text-xs text-[#5C6370]">• Autonomous Workforce</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F5F7]">
            Agents
          </h1>
          <p className="text-sm text-[#8B93A1] mt-1">
            Create, manage, and inspect the AI agents autonomously executing tasks for your team.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {toastMessage && (
            <span className="text-xs text-[#32D583] flex items-center gap-1 font-mono animate-in fade-in duration-200 mr-2">
              <Check className="w-3.5 h-3.5" />
              {toastMessage}
            </span>
          )}

          <Button
            variant="secondary"
            onClick={() => setTemplateModalOpen(true)}
            className="font-medium text-xs border-[#242832] hover:border-[#FF6B35]"
          >
            <Layers className="w-3.5 h-3.5 mr-1.5 text-[#FF6B35]" />
            <span>Create from template</span>
          </Button>

          <Link href="/dashboard/agents/new">
            <Button className="font-medium shadow-[0_0_15px_rgba(255,107,53,0.3)] text-xs">
              <Plus className="w-4 h-4 mr-1.5" />
              <span>Create agent</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Controls: Filter Tabs, Search, Sorting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-2">
        <Tabs
          items={filterTabs}
          activeId={activeFilter}
          onChange={setActiveFilter}
        />

        <div className="flex items-center gap-2 w-full md:w-auto">
          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 bg-[#111318] border border-[#242832] rounded-lg px-2.5 py-1.5 shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#5C6370]" />
            <select
              aria-label="Sort agents"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent text-xs text-[#8B93A1] focus:outline-none focus:text-[#F5F5F7] cursor-pointer"
            >
              <option value="recently_active" className="bg-[#171A21] text-[#F5F5F7]">
                Recently active
              </option>
              <option value="most_tasks" className="bg-[#171A21] text-[#F5F5F7]">
                Most tasks
              </option>
              <option value="highest_success" className="bg-[#171A21] text-[#F5F5F7]">
                Highest success rate
              </option>
            </select>
          </div>

          <div className="w-full md:w-64">
            <Input
              icon={<Search className="w-3.5 h-3.5" />}
              placeholder="Filter agents by name, category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Grid of Agents */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onToggleStatus={handleToggleAgent}
              onPauseRequest={(a) => setPausingAgent(a)}
              onDuplicateRequest={(a) => setDuplicatingAgent(a)}
              onArchiveRequest={(a) => setArchivingAgent(a)}
              onRunTask={handleRunTask}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-[#242832] bg-[#111318] p-12 text-center">
          <div className="w-10 h-10 rounded-full bg-[#171A21] border border-[#242832] flex items-center justify-center mx-auto text-[#8B93A1] mb-3">
            <Search className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-[#F5F5F7]">No agents found</h3>
          <p className="text-xs text-[#8B93A1] mt-1 max-w-sm mx-auto">
            No agents match the current filter &ldquo;{activeFilter}&rdquo; with search query &ldquo;{searchQuery}&rdquo;.
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setActiveFilter('all');
              setSearchQuery('');
            }}
            className="mt-4"
          >
            Clear filters
          </Button>
        </div>
      )}

      {/* Agent Templates Modal */}
      <AgentTemplatesModal
        isOpen={templateModalOpen}
        onClose={() => setTemplateModalOpen(false)}
      />

      {/* Duplication Modal */}
      <AgentDuplicationModal
        isOpen={!!duplicatingAgent}
        onClose={() => setDuplicatingAgent(null)}
        agent={duplicatingAgent}
        onDuplicate={handleDuplicateAgent}
      />

      {/* Pause / Resume Modal */}
      <AgentPauseModal
        isOpen={!!pausingAgent}
        onClose={() => setPausingAgent(null)}
        agent={pausingAgent}
        onConfirmPause={handleConfirmPause}
      />

      {/* Archive Modal */}
      <AgentArchiveModal
        isOpen={!!archivingAgent}
        onClose={() => setArchivingAgent(null)}
        agent={archivingAgent}
        onConfirmArchive={handleConfirmArchive}
      />
    </div>
  );
}
