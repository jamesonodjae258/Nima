'use client';

import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { AgentPerformanceDataPoint } from '@/types';
import { mockAgentPerformanceData } from '@/data/mockData';
import { CheckCircle2, TrendingUp, Clock, Zap } from 'lucide-react';

interface AgentPerformanceProps {
  tasksCompleted?: number;
  successRate?: number;
  avgDuration?: string;
  timeSaved?: string;
  data?: AgentPerformanceDataPoint[];
}

export function AgentPerformanceChart({
  tasksCompleted = 284,
  successRate = 97.2,
  avgDuration = '7m 12s',
  timeSaved = '46h',
  data = mockAgentPerformanceData,
}: AgentPerformanceProps) {
  // Avoid SSR hydration issues with Recharts ResponsiveContainer
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="bg-[#111318] border border-[#242832] rounded-xl p-5 md:p-6 shadow-xl relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h3 className="text-sm font-semibold text-[#F5F5F7] tracking-tight">
            Performance & Throughput
          </h3>
          <p className="text-xs text-[#8B93A1]">
            Execution metrics and task completion volume over time
          </p>
        </div>
        <span className="text-[11px] font-mono text-[#8B93A1] bg-[#171A21] px-2.5 py-1 rounded border border-[#242832] w-fit">
          Autonomous execution
        </span>
      </div>

      {/* 4 Performance Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="p-3.5 rounded-lg bg-[#171A21]/60 border border-[#242832]">
          <div className="flex items-center justify-between text-[#8B93A1] mb-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider">Tasks completed</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-[#32D583]" />
          </div>
          <div className="text-xl font-semibold text-[#F5F5F7] font-mono">
            {tasksCompleted}
          </div>
          <div className="text-[10px] text-[#32D583] mt-0.5 flex items-center gap-1 font-mono">
            <span>+14% vs last week</span>
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-[#171A21]/60 border border-[#242832]">
          <div className="flex items-center justify-between text-[#8B93A1] mb-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider">Success rate</span>
            <TrendingUp className="w-3.5 h-3.5 text-[#FF6B35]" />
          </div>
          <div className="text-xl font-semibold text-[#F5F5F7] font-mono">
            {successRate}%
          </div>
          <div className="text-[10px] text-[#32D583] mt-0.5 flex items-center gap-1 font-mono">
            <span>99.1% target parity</span>
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-[#171A21]/60 border border-[#242832]">
          <div className="flex items-center justify-between text-[#8B93A1] mb-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider">Avg duration</span>
            <Clock className="w-3.5 h-3.5 text-[#F5B544]" />
          </div>
          <div className="text-xl font-semibold text-[#F5F5F7] font-mono">
            {avgDuration}
          </div>
          <div className="text-[10px] text-[#8B93A1] mt-0.5 flex items-center gap-1 font-mono">
            <span>per qualified batch</span>
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-[#171A21]/60 border border-[#242832]">
          <div className="flex items-center justify-between text-[#8B93A1] mb-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider">Time saved</span>
            <Zap className="w-3.5 h-3.5 text-[#FF6B35]" />
          </div>
          <div className="text-xl font-semibold text-[#F5F5F7] font-mono">
            {timeSaved}
          </div>
          <div className="text-[10px] text-[#32D583] mt-0.5 flex items-center gap-1 font-mono">
            <span>vs manual SDR research</span>
          </div>
        </div>
      </div>

      {/* Chart Header */}
      <div className="flex items-center justify-between mb-3 text-xs">
        <span className="font-mono text-[11px] uppercase tracking-wider text-[#8B93A1]">
          Tasks Completed Over Time
        </span>
        <span className="font-mono text-[11px] text-[#8B93A1]">
          Past 14 days
        </span>
      </div>

      {/* Recharts Area Chart */}
      <div className="h-56 w-full bg-[#08090C]/60 border border-[#242832]/60 rounded-lg p-3 pt-4">
        {isMounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="taskThroughput" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#FF6B35" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#242832" vertical={false} />
              <XAxis
                dataKey="date"
                stroke="#8B93A1"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#242832' }}
              />
              <YAxis
                stroke="#8B93A1"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#242832' }}
                allowDecimals={false}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-[#171A21] border border-[#242832] p-2.5 rounded-lg shadow-xl text-xs font-mono">
                        <div className="text-[#8B93A1] mb-1">{label}</div>
                        <div className="text-[#F5F5F7] font-semibold flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#FF6B35]" />
                          <span>{payload[0].value} tasks completed</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="tasksCompleted"
                stroke="#FF6B35"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#taskThroughput)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-xs text-[#8B93A1] font-mono">
            Loading metrics chart...
          </div>
        )}
      </div>
    </div>
  );
}
