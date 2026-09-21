'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Tabs } from '@/components/ui/Tabs';
import { AgentStatus } from '@/components/ui/AgentStatus';
import { Drawer } from '@/components/ui/Modal';
import { initialTasks } from '@/data/mockData';
import { Task } from '@/types';
import { Search, CheckCircle2, Clock, Play, ArrowUpRight, Terminal, RefreshCw, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function TasksPage() {
  const [tasks] = useState<Task[]>(initialTasks);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All Tasks', count: tasks.length },
    { id: 'running', label: 'Running', count: tasks.filter((t) => t.status === 'running').length },
    { id: 'completed', label: 'Completed', count: tasks.filter((t) => t.status === 'completed').length },
  ];

  const filteredTasks = tasks.filter((task) => {
    const matchesTab = activeTab === 'all' ? true : task.status === activeTab;
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.result.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F5F7]">
            Tasks
          </h1>
          <p className="text-sm text-[#8B93A1] mt-1">
            Track the work your agents have completed and are currently running.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#8B93A1] bg-[#111318] border border-[#242832] px-3 py-1.5 rounded-lg">
          <RefreshCw className="w-3.5 h-3.5 text-[#FF6B35] animate-spin" />
          <span>Real-time Task Stream</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-2">
        <Tabs
          items={filterTabs}
          activeId={activeTab}
          onChange={setActiveTab}
        />

        <div className="w-full md:w-72">
          <Input
            icon={<Search className="w-3.5 h-3.5" />}
            placeholder="Search tasks by name, agent, or output..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Realistic B2B Task Table */}
      <Card className="overflow-hidden border-[#242832]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#242832] bg-[#0E1015] text-[11px] font-mono text-[#5C6370] uppercase tracking-wider">
                <th className="py-3 px-4 font-medium">Task</th>
                <th className="py-3 px-4 font-medium">Agent</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Started</th>
                <th className="py-3 px-4 font-medium">Duration</th>
                <th className="py-3 px-4 font-medium">Result</th>
                <th className="py-3 px-4 font-medium text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#242832]/60 text-xs">
              {filteredTasks.map((task) => (
                <tr
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className="hover:bg-[#171A21]/70 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4 font-medium text-[#F5F5F7]">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/dashboard/tasks/${task.id}`}
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        className="hover:text-[#FF6B35] hover:underline transition-colors font-semibold"
                      >
                        {task.title}
                      </Link>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[#8B93A1]">{task.agentName}</span>
                      <span className="text-[10px] font-mono text-[#5C6370]">({task.agentCategory})</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <AgentStatus status={task.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#8B93A1]">
                    {task.startedAt}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#8B93A1]">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-[#5C6370]" />
                      <span>{task.duration}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#171A21] border border-[#242832] font-mono text-[11px] text-[#D1D5DB]">
                      {task.result}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTask(task);
                      }}
                      className="p-1 rounded text-[#5C6370] group-hover:text-[#FF6B35] transition-colors"
                      aria-label="Inspect task execution"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Task Inspection Drawer */}
      <Drawer
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        title={selectedTask?.title || 'Task Details'}
        subtitle={`Executed by ${selectedTask?.agentName} (${selectedTask?.agentCategory})`}
      >
        {selectedTask && (
          <div className="space-y-6">
            {/* Overview Stats */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#0E1015] border border-[#242832]">
              <div>
                <div className="text-[10px] font-mono uppercase text-[#5C6370]">Status</div>
                <div className="mt-1">
                  <AgentStatus status={selectedTask.status} size="sm" />
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase text-[#5C6370]">Duration</div>
                <div className="text-xs font-mono font-medium text-[#F5F5F7] mt-1.5">
                  {selectedTask.duration}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase text-[#5C6370]">Output</div>
                <div className="text-xs font-mono font-medium text-[#32D583] mt-1.5">
                  {selectedTask.result}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div>
              <h4 className="text-xs font-semibold text-[#8B93A1] uppercase font-mono tracking-wider mb-2">
                Executive Outcome Summary
              </h4>
              <p className="text-xs text-[#D1D5DB] bg-[#171A21] p-3.5 rounded-lg border border-[#242832] leading-relaxed">
                {selectedTask.outputSummary}
              </p>
            </div>

            {/* Step-by-Step Execution Trail */}
            <div>
              <h4 className="text-xs font-semibold text-[#8B93A1] uppercase font-mono tracking-wider mb-3">
                Execution Workflow Steps ({selectedTask.steps.length})
              </h4>
              <div className="space-y-3 relative pl-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-[#242832]">
                {selectedTask.steps.map((step, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-5 top-1 w-3.5 h-3.5 rounded-full bg-[#111318] border border-[#242832] flex items-center justify-center">
                      {step.status === 'completed' ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#32D583]" />
                      ) : step.status === 'running' ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-ping" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5C6370]" />
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-[#F5F5F7]">{step.name}</span>
                      <span className="text-[10px] font-mono text-[#5C6370]">{step.time}</span>
                    </div>
                    {step.detail && (
                      <p className="text-[11px] text-[#8B93A1] mt-0.5 font-mono">
                        ↳ {step.detail}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Raw Audit Logs */}
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-[#8B93A1] uppercase font-mono tracking-wider">
                <Terminal className="w-3.5 h-3.5" />
                <span>Raw Agent Telemetry</span>
              </div>
              <div className="p-3 bg-[#08090C] rounded-lg border border-[#242832] font-mono text-[11px] text-[#8B93A1] space-y-1">
                <div className="text-[#32D583]">[INIT] Agent thread dispatch: {selectedTask.agentId}</div>
                <div>[ENV] Sandboxed runtime: Isolated Docker VPC node</div>
                <div>[AUTH] OAuth credentials verified for target endpoints</div>
                <div className="text-[#FFB49B]">[RESULT] Completed in {selectedTask.duration} with status 200 OK</div>
              </div>
            </div>

            {/* Link to Full Task Detail Page */}
            <div className="pt-2">
              <Link
                href={`/dashboard/tasks/${selectedTask.id}`}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#FF6B35] hover:bg-[#E95724] text-[#08090C] text-xs font-semibold transition-colors shadow-lg shadow-[#FF6B35]/20 cursor-pointer"
              >
                <span>Open Full Task Observability Page</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
