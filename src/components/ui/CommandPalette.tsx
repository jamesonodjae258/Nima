'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Cpu,
  CheckSquare,
  Activity,
  TrendingUp,
  BookOpen,
  Layers,
  Settings,
  Plus,
  ArrowRight,
  ShieldCheck,
  FileText,
  Clock,
} from 'lucide-react';
import {
  initialAgents,
  initialTasks,
  initialInsights,
  initialKnowledgeResources,
  initialActivities,
} from '@/data/mockData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navItems = [
    { label: 'Command Center', href: '/dashboard', icon: <Cpu className="w-4 h-4 text-[#FF6B35]" />, category: 'Navigation' },
    { label: 'Agents Catalog', href: '/dashboard/agents', icon: <Cpu className="w-4 h-4 text-[#8B93A1]" />, category: 'Navigation' },
    { label: 'Create New Agent', href: '/dashboard/agents/new', icon: <Plus className="w-4 h-4 text-[#32D583]" />, category: 'Actions' },
    { label: 'Tasks & Executions', href: '/dashboard/tasks', icon: <CheckSquare className="w-4 h-4 text-[#8B93A1]" />, category: 'Navigation' },
    { label: 'Activity Timeline', href: '/dashboard/activity', icon: <Activity className="w-4 h-4 text-[#8B93A1]" />, category: 'Navigation' },
    { label: 'Intelligence Insights', href: '/dashboard/insights', icon: <TrendingUp className="w-4 h-4 text-[#F5B544]" />, category: 'Navigation' },
    { label: 'Knowledge Base', href: '/dashboard/knowledge', icon: <BookOpen className="w-4 h-4 text-[#8B93A1]" />, category: 'Navigation' },
    { label: 'Integrations', href: '/dashboard/integrations', icon: <Layers className="w-4 h-4 text-[#8B93A1]" />, category: 'Navigation' },
    { label: 'Workspace Settings', href: '/dashboard/settings', icon: <Settings className="w-4 h-4 text-[#8B93A1]" />, category: 'Navigation' },
  ];

  const q = query.toLowerCase().trim();

  const filteredNav = navItems.filter((item) =>
    item.label.toLowerCase().includes(q)
  );

  const filteredAgents = initialAgents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(q) ||
      agent.category.toLowerCase().includes(q) ||
      agent.tools.some((t) => t.toLowerCase().includes(q))
  );

  const filteredTasks = initialTasks.filter(
    (task) =>
      task.title.toLowerCase().includes(q) ||
      task.agentName.toLowerCase().includes(q) ||
      task.outputSummary.toLowerCase().includes(q)
  );

  const filteredInsights = initialInsights.filter(
    (insight) =>
      insight.title.toLowerCase().includes(q) ||
      insight.headline.toLowerCase().includes(q) ||
      insight.category.toLowerCase().includes(q)
  );

  const filteredKnowledge = initialKnowledgeResources.filter(
    (k) =>
      k.name.toLowerCase().includes(q) ||
      k.type.toLowerCase().includes(q) ||
      k.description.toLowerCase().includes(q) ||
      k.usedByAgents.some((a) => a.toLowerCase().includes(q))
  );

  const filteredActivity = initialActivities.filter(
    (act) =>
      act.agentName.toLowerCase().includes(q) ||
      act.action.toLowerCase().includes(q) ||
      (act.details && act.details.toLowerCase().includes(q))
  );

  const handleSelect = (href: string) => {
    router.push(href);
    onClose();
  };

  const hasAnyResults =
    filteredNav.length > 0 ||
    filteredAgents.length > 0 ||
    filteredTasks.length > 0 ||
    filteredInsights.length > 0 ||
    filteredKnowledge.length > 0 ||
    filteredActivity.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl rounded-2xl bg-[#111318] border border-[#242832] shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#242832] gap-3">
          <Search className="w-4 h-4 text-[#8B93A1]" />
          <input
            autoFocus
            type="text"
            placeholder="Search across agents, tasks, insights, knowledge, and activity..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-[#F5F5F7] placeholder-[#5C6370] outline-none"
          />
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-[#171A21] border border-[#242832] rounded text-[#8B93A1]">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          {/* Navigation Items (when query is short or matches) */}
          {filteredNav.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase text-[#5C6370] px-3 py-1 tracking-wider">
                Quick Navigation
              </div>
              <div className="space-y-0.5 mt-1">
                {filteredNav.slice(0, 4).map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleSelect(item.href)}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg hover:bg-[#171A21] text-[#F5F5F7] transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    <ArrowRight className="w-3 h-3 text-[#5C6370] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 1. Agents */}
          {filteredAgents.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase text-[#5C6370] px-3 py-1 tracking-wider flex items-center justify-between">
                <span>Agents ({filteredAgents.length})</span>
                <span className="text-[#FF6B35]">Entity</span>
              </div>
              <div className="space-y-0.5 mt-1">
                {filteredAgents.map((agent) => (
                  <button
                    key={agent.id}
                    type="button"
                    onClick={() => handleSelect(`/dashboard/agents/${agent.id}`)}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg hover:bg-[#171A21] text-[#F5F5F7] transition-colors group text-left"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-5 h-5 rounded bg-[#171A21] border border-[#242832] flex items-center justify-center text-[#FF6B35] shrink-0">
                        <Cpu className="w-3 h-3" />
                      </div>
                      <div className="truncate">
                        <span className="font-medium text-[#F5F5F7]">{agent.name}</span>
                        <span className="text-[#5C6370] ml-2 font-mono text-[11px]">{agent.category}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-[#32D583] shrink-0 ml-2">
                      {agent.successRate}% • {agent.taskCount} tasks
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 2. Tasks */}
          {filteredTasks.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase text-[#5C6370] px-3 py-1 tracking-wider flex items-center justify-between">
                <span>Tasks ({filteredTasks.length})</span>
                <span className="text-[#32D583]">Executions</span>
              </div>
              <div className="space-y-0.5 mt-1">
                {filteredTasks.map((task) => (
                  <button
                    key={task.id}
                    type="button"
                    onClick={() => handleSelect(`/dashboard/tasks/${task.id}`)}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg hover:bg-[#171A21] text-[#F5F5F7] transition-colors group text-left"
                  >
                    <div className="flex items-center gap-2 min-w-0 truncate">
                      <CheckSquare className="w-3.5 h-3.5 text-[#32D583] shrink-0" />
                      <span className="truncate font-medium">{task.title}</span>
                      <span className="text-[11px] text-[#8B93A1] shrink-0">({task.agentName})</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#8B93A1] shrink-0 ml-2">
                      {task.result}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 3. Insights */}
          {filteredInsights.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase text-[#5C6370] px-3 py-1 tracking-wider flex items-center justify-between">
                <span>Intelligence Insights ({filteredInsights.length})</span>
                <span className="text-[#F5B544]">Telemetry</span>
              </div>
              <div className="space-y-0.5 mt-1">
                {filteredInsights.map((insight) => (
                  <button
                    key={insight.id}
                    type="button"
                    onClick={() => handleSelect(`/dashboard/insights/${insight.id}`)}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg hover:bg-[#171A21] text-[#F5F5F7] transition-colors group text-left"
                  >
                    <div className="flex items-center gap-2 min-w-0 truncate">
                      <TrendingUp className="w-3.5 h-3.5 text-[#F5B544] shrink-0" />
                      <span className="truncate font-medium">{insight.headline}</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#32D583] shrink-0 ml-2">
                      {insight.impactBadge}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 4. Knowledge Resources */}
          {filteredKnowledge.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase text-[#5C6370] px-3 py-1 tracking-wider flex items-center justify-between">
                <span>Knowledge Context ({filteredKnowledge.length})</span>
                <span className="text-[#FF6B35]">Ground Truth</span>
              </div>
              <div className="space-y-0.5 mt-1">
                {filteredKnowledge.map((res) => (
                  <button
                    key={res.id}
                    type="button"
                    onClick={() => handleSelect(`/dashboard/knowledge/${res.id}`)}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg hover:bg-[#171A21] text-[#F5F5F7] transition-colors group text-left"
                  >
                    <div className="flex items-center gap-2 min-w-0 truncate">
                      <FileText className="w-3.5 h-3.5 text-[#FF6B35] shrink-0" />
                      <span className="truncate font-medium">{res.name}</span>
                      <span className="text-[10px] font-mono text-[#5C6370]">({res.type})</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#8B93A1] shrink-0 ml-2">
                      {res.itemsCount} chunks
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 5. Activity */}
          {filteredActivity.length > 0 && q.length > 1 && (
            <div>
              <div className="text-[10px] font-mono uppercase text-[#5C6370] px-3 py-1 tracking-wider flex items-center justify-between">
                <span>Recent Activity ({filteredActivity.length})</span>
                <span className="text-[#8B93A1]">Audit</span>
              </div>
              <div className="space-y-0.5 mt-1">
                {filteredActivity.slice(0, 3).map((act) => (
                  <button
                    key={act.id}
                    type="button"
                    onClick={() => handleSelect('/dashboard/activity')}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg hover:bg-[#171A21] text-[#F5F5F7] transition-colors group text-left"
                  >
                    <div className="flex items-center gap-2 min-w-0 truncate">
                      <Clock className="w-3.5 h-3.5 text-[#5C6370] shrink-0" />
                      <span className="truncate">
                        <strong className="text-[#F5F5F7] font-medium">{act.agentName}</strong>{' '}
                        <span className="text-[#8B93A1]">{act.action}</span>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#5C6370] shrink-0 ml-2">
                      {act.time}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {!hasAnyResults && (
            <div className="py-12 text-center text-xs text-[#8B93A1]">
              No results found across agents, tasks, insights, knowledge, or activity for &ldquo;{query}&rdquo;
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
