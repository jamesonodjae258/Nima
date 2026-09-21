'use client';

import React from 'react';
import { ShieldCheck, CheckCircle2, User, Clock, ArrowRight, FileText } from 'lucide-react';
import { ApprovalHistoryItem } from '@/types';
import { mockApprovalHistory } from '@/data/mockData';

interface HumanApprovalHistoryCardProps {
  item?: ApprovalHistoryItem;
  destinationCrm?: string;
  contactsCount?: number;
}

export function HumanApprovalHistoryCard({
  item = mockApprovalHistory,
  destinationCrm = 'HubSpot',
  contactsCount = 18,
}: HumanApprovalHistoryCardProps) {
  return (
    <div className="bg-[#111318] border border-[#242832] rounded-xl p-5 md:p-6 shadow-xl relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6B35]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[#242832]/60">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-[#FF6B35]/15 text-[#FF6B35] border border-[#FF6B35]/30">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-mono font-semibold text-[#F5F5F7] uppercase tracking-wider">
              {item.title}
            </span>
            <span className="text-[11px] text-[#8B93A1] ml-2">
              Human-in-the-Loop Safeguard
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#32D583]/10 text-[#32D583] border border-[#32D583]/20 flex items-center gap-1.5">
            <CheckCircle2 className="w-3 h-3 text-[#32D583]" />
            {item.decision} at {item.decidedAt}
          </span>
        </div>
      </div>

      {/* Main explanation body */}
      <div className="mb-4">
        <div className="text-sm font-medium text-[#F5F5F7] mb-1">
          Nima paused before updating {destinationCrm}.
        </div>
        <div className="text-xs text-[#8B93A1] flex items-center gap-1.5">
          <span className="font-mono text-[#8B93A1]/70">Reason:</span>
          <span>{item.reason}</span>
        </div>
      </div>

      {/* Metadata Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-lg bg-[#08090C]/60 border border-[#242832]/80 text-xs mb-4">
        <div>
          <div className="text-[10px] font-mono uppercase text-[#8B93A1] tracking-wider mb-1 flex items-center gap-1">
            <User className="w-3 h-3" />
            <span>Authorized by</span>
          </div>
          <div className="text-xs font-semibold text-[#F5F5F7]">
            {item.deciderName} <span className="font-normal text-[#8B93A1]">(Workspace Admin)</span>
          </div>
        </div>

        <div>
          <div className="text-[10px] font-mono uppercase text-[#8B93A1] tracking-wider mb-1 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Decision time</span>
          </div>
          <div className="text-xs font-semibold text-[#F5F5F7] font-mono">
            {item.decidedAt} <span className="font-normal text-[#8B93A1]">(1m after pause)</span>
          </div>
        </div>

        <div>
          <div className="text-[10px] font-mono uppercase text-[#8B93A1] tracking-wider mb-1 flex items-center gap-1">
            <FileText className="w-3 h-3" />
            <span>Scope</span>
          </div>
          <div className="text-xs font-semibold text-[#F5F5F7]">
            Write batch ({contactsCount} records)
          </div>
        </div>
      </div>

      {/* Then outcome */}
      <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#32D583]">
        <CheckCircle2 className="w-4 h-4 shrink-0" />
        <span>Then: {contactsCount} contacts verified & added to {destinationCrm}</span>
      </div>
    </div>
  );
}
