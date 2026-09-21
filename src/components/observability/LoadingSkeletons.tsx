'use client';

import React from 'react';

export function AgentDetailSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-4 w-28 bg-[#171A21] rounded" />
          <div className="h-8 w-64 bg-[#171A21] rounded" />
          <div className="h-4 w-96 bg-[#171A21] rounded" />
        </div>
        <div className="flex gap-2">
          <div className="h-9 w-20 bg-[#171A21] rounded-lg" />
          <div className="h-9 w-24 bg-[#171A21] rounded-lg" />
        </div>
      </div>

      {/* Metric Cards Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-28 bg-[#111318] border border-[#242832] rounded-xl p-5 space-y-3">
            <div className="h-3 w-20 bg-[#171A21] rounded" />
            <div className="h-6 w-16 bg-[#171A21] rounded" />
          </div>
        ))}
      </div>

      {/* Current Task Card Skeleton */}
      <div className="h-56 bg-[#111318] border border-[#242832] rounded-xl p-6 space-y-4">
        <div className="h-4 w-32 bg-[#171A21] rounded" />
        <div className="h-6 w-80 bg-[#171A21] rounded" />
        <div className="h-2 w-full bg-[#171A21] rounded-full" />
      </div>

      {/* Chart Skeleton */}
      <div className="h-72 bg-[#111318] border border-[#242832] rounded-xl p-6" />
    </div>
  );
}

export function TaskDetailSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-72 bg-[#171A21] rounded" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-[#111318] border border-[#242832] rounded-xl" />
        ))}
      </div>
      <div className="h-64 bg-[#111318] border border-[#242832] rounded-xl" />
      <div className="h-96 bg-[#111318] border border-[#242832] rounded-xl" />
    </div>
  );
}

export function ActivitySkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 w-48 bg-[#171A21] rounded" />
      <div className="h-10 w-full bg-[#111318] border border-[#242832] rounded-lg" />
      <div className="space-y-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-20 bg-[#111318] border border-[#242832] rounded-xl" />
        ))}
      </div>
    </div>
  );
}
