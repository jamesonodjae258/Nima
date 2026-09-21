'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TimelineEvent } from '@/types';
import { mockLiveTimelineEvents } from '@/data/mockData';
import {
  Check,
  Circle,
  ChevronDown,
  ChevronUp,
  Database,
  ArrowRight,
  ShieldCheck,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

interface LiveExecutionTimelineProps {
  initialEvents?: TimelineEvent[];
  agentId?: string;
  onViewData?: (eventId: string) => void;
}

export function LiveExecutionTimeline({
  initialEvents = mockLiveTimelineEvents,
  agentId = 'agent-1',
  onViewData,
}: LiveExecutionTimelineProps) {
  const [events, setEvents] = useState<TimelineEvent[]>(initialEvents);
  const [expandedEventId, setExpandedEventId] = useState<string | null>('evt-3');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(4); // default at step 4 (evt-5 is working)

  const toggleExpand = (id: string) => {
    setExpandedEventId((prev) => (prev === id ? null : id));
  };

  // Realistic mock progression step-by-step
  const advanceSimulation = () => {
    if (simulationStep < events.length - 1) {
      const nextStep = simulationStep + 1;
      setSimulationStep(nextStep);
      setEvents((prev) =>
        prev.map((ev, idx) => {
          if (idx < nextStep) {
            return { ...ev, status: 'completed' };
          } else if (idx === nextStep) {
            return { ...ev, status: 'working' };
          } else {
            return { ...ev, status: 'pending' };
          }
        })
      );
    } else {
      // Complete all
      setSimulationStep(events.length);
      setEvents((prev) => prev.map((ev) => ({ ...ev, status: 'completed' })));
    }
  };

  const resetSimulation = () => {
    setSimulationStep(4);
    setEvents(mockLiveTimelineEvents);
    setExpandedEventId('evt-3');
  };

  return (
    <div className="space-y-4">
      {/* Simulation Toolbar / Status Controller */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-[#111318] border border-[#242832] rounded-xl text-xs">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#32D583] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#32D583]"></span>
          </span>
          <span className="font-mono text-[#F5F5F7] font-medium">
            LIVE STREAM
          </span>
          <span className="text-[#242832]">|</span>
          <span className="text-[#8B93A1]">
            Events update progressively as agent executes
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={advanceSimulation}
            disabled={simulationStep >= events.length}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF6B35]/15 hover:bg-[#FF6B35]/25 text-[#FF6B35] border border-[#FF6B35]/30 font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Simulate next step</span>
          </button>
          <button
            type="button"
            onClick={resetSimulation}
            className="p-1.5 rounded-lg text-[#8B93A1] hover:text-[#F5F5F7] hover:bg-[#171A21] border border-transparent hover:border-[#242832] transition-colors cursor-pointer"
            title="Reset simulation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="bg-[#111318] border border-[#242832] rounded-xl p-5 md:p-6 shadow-xl relative">
        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-[2px] before:bg-[#242832]">
          {events.map((event) => {
            const isCompleted = event.status === 'completed';
            const isWorking = event.status === 'working';
            const isPending = event.status === 'pending';
            const isExpanded = expandedEventId === event.id;

            return (
              <div key={event.id} className="relative group">
                {/* Status Dot on Line */}
                <div
                  className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 rounded-full flex items-center justify-center font-mono text-[11px] transition-all ${
                    isCompleted
                      ? 'bg-[#111318] border-2 border-[#32D583] text-[#32D583]'
                      : isWorking
                      ? 'bg-[#FF6B35] border-2 border-white text-white shadow-lg shadow-[#FF6B35]/50 animate-pulse'
                      : 'bg-[#111318] border-2 border-[#242832] text-[#8B93A1]'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-3 h-3 stroke-[3]" />
                  ) : isWorking ? (
                    <span className="w-2 h-2 rounded-full bg-white" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#242832]" />
                  )}
                </div>

                {/* Event Card / Header */}
                <div
                  className={`rounded-xl border transition-all ${
                    isWorking
                      ? 'bg-[#171A21] border-[#FF6B35]/60 shadow-lg shadow-[#FF6B35]/10 ring-1 ring-[#FF6B35]/30'
                      : isCompleted
                      ? 'bg-[#171A21]/50 border-[#242832] hover:border-[#8B93A1]/40'
                      : 'bg-[#171A21]/20 border-[#242832]/50 opacity-60'
                  }`}
                >
                  <div
                    onClick={() => toggleExpand(event.id)}
                    className="p-4 flex items-start justify-between gap-3 cursor-pointer select-none"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2.5 mb-1">
                        <span className="font-mono text-xs text-[#8B93A1]">
                          {event.timestamp}
                        </span>
                        <span className="text-[#242832]">/</span>
                        <span
                          className={`text-sm font-semibold tracking-tight ${
                            isWorking
                              ? 'text-white font-bold'
                              : isCompleted
                              ? 'text-[#F5F5F7]'
                              : 'text-[#8B93A1]'
                          }`}
                        >
                          {event.title}
                        </span>

                        {isWorking && (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#FF6B35]/15 text-[#FF6B35] text-[10px] font-mono font-medium border border-[#FF6B35]/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-ping" />
                            PROCESSING
                          </span>
                        )}

                        {event.actionRequired && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#F5B544]/15 text-[#F5B544] text-[10px] font-mono font-medium border border-[#F5B544]/30">
                            <ShieldCheck className="w-3 h-3" />
                            APPROVAL REQUIRED
                          </span>
                        )}
                      </div>

                      {event.description && (
                        <p className="text-xs text-[#8B93A1] mt-0.5 leading-relaxed">
                          {event.description}
                        </p>
                      )}
                    </div>

                    {/* Expand/Collapse Chevron */}
                    <div className="text-[#8B93A1] p-1 group-hover:text-white transition-colors shrink-0">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </div>

                  {/* Progressive Disclosure Details Panel */}
                  {isExpanded && event.details && (
                    <div className="px-4 pb-4 pt-1 border-t border-[#242832]/60 animate-in fade-in slide-in-from-top-1 duration-200">
                      {/* Metric Disclosures (e.g. 38 discovered breakdown) */}
                      {event.details.discoveredCount !== undefined && (
                        <div className="mb-3.5 pt-2">
                          <div className="text-xs font-semibold text-[#F5F5F7] mb-2 font-mono">
                            {event.details.discoveredCount} companies discovered:
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                            <div className="p-2 rounded bg-[#08090C] border border-[#32D583]/20">
                              <span className="text-[#32D583] font-mono font-bold">
                                {event.details.matchedFunding}
                              </span>{' '}
                              <span className="text-[#8B93A1]">matched funding criteria</span>
                            </div>
                            <div className="p-2 rounded bg-[#08090C] border border-[#FF6B35]/20">
                              <span className="text-[#FF6B35] font-mono font-bold">
                                {event.details.matchedSize}
                              </span>{' '}
                              <span className="text-[#8B93A1]">matched company size</span>
                            </div>
                            <div className="p-2 rounded bg-[#08090C] border border-[#F04438]/20">
                              <span className="text-[#F04438] font-mono font-bold">
                                {event.details.failedQualification}
                              </span>{' '}
                              <span className="text-[#8B93A1]">failed qualification</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Sources list */}
                      {event.details.sources && event.details.sources.length > 0 && (
                        <div className="mb-3">
                          <div className="text-[11px] font-mono uppercase text-[#8B93A1] tracking-wider mb-1.5">
                            Sources:
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {event.details.sources.map((src, i) => (
                              <span
                                key={i}
                                className="px-2.5 py-1 rounded bg-[#08090C] border border-[#242832] text-xs text-[#F5F5F7] font-mono flex items-center gap-1.5"
                              >
                                <Database className="w-3 h-3 text-[#FF6B35]" />
                                {src}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Diagnostic Notes */}
                      {event.details.notes && event.details.notes.length > 0 && (
                        <div className="space-y-1 mb-3">
                          {event.details.notes.map((note, i) => (
                            <div key={i} className="text-xs text-[#8B93A1] flex items-center gap-2">
                              <span className="w-1 h-1 rounded-full bg-[#8B93A1]/60" />
                              <span>{note}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* CTA Button */}
                      <div className="pt-2 flex items-center justify-between">
                        <Link
                          href="/dashboard/tasks/task-1"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#FF6B35] hover:text-[#FFB49B] transition-colors cursor-pointer group/link"
                        >
                          <span>View data</span>
                          <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5" />
                        </Link>

                        <span className="text-[10px] font-mono text-[#8B93A1]">
                          ID: {event.id}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
