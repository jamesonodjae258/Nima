'use client';

import React, { useState } from 'react';
import { ProspectDetail } from '@/types';
import {
  X,
  Building2,
  MapPin,
  ExternalLink,
  CheckCircle2,
  PlusCircle,
  Briefcase,
  DollarSign,
  Users,
  Globe,
  Mail,
  Check,
} from 'lucide-react';

interface ProspectDetailDrawerProps {
  prospect: ProspectDetail | null;
  onClose: () => void;
  onAddToCrm?: (id: string) => void;
  onCreateTask?: (prospect: ProspectDetail) => void;
}

export function ProspectDetailDrawer({
  prospect,
  onClose,
  onAddToCrm,
  onCreateTask,
}: ProspectDetailDrawerProps) {
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [taskCreated, setTaskCreated] = useState(false);

  if (!prospect) return null;

  const handleAddCrm = () => {
    setAddedSuccess(true);
    if (onAddToCrm) onAddToCrm(prospect.id);
    setTimeout(() => setAddedSuccess(false), 3000);
  };

  const handleCreateTask = () => {
    setTaskCreated(true);
    if (onCreateTask) onCreateTask(prospect);
    setTimeout(() => setTaskCreated(false), 3000);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#111318] border-l border-[#242832] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-5 border-b border-[#242832] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[#FF6B35] uppercase tracking-wider font-semibold">
            Prospect Inspection
          </span>
          <span className="text-[#242832]">/</span>
          <span className="text-xs text-[#8B93A1]">ID: {prospect.id}</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg text-[#8B93A1] hover:text-[#F5F5F7] hover:bg-[#171A21] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Contact Identity */}
        <div>
          <div className="flex items-center justify-between gap-3 mb-1">
            <h2 className="text-xl font-bold text-[#F5F5F7] tracking-tight">
              {prospect.contact}
            </h2>
            <span
              className={`px-2.5 py-1 rounded text-xs font-mono font-medium border ${
                prospect.status === 'Qualified'
                  ? 'bg-[#32D583]/10 text-[#32D583] border-[#32D583]/20'
                  : prospect.status === 'Review'
                  ? 'bg-[#F5B544]/10 text-[#F5B544] border-[#F5B544]/20'
                  : 'bg-[#F04438]/10 text-[#F04438] border-[#F04438]/20'
              }`}
            >
              {prospect.status}
            </span>
          </div>

          <div className="text-sm text-[#8B93A1] font-medium flex items-center gap-1.5 mb-2">
            <span>{prospect.role}</span>
            <span className="text-[#242832]">•</span>
            <span className="text-[#F5F5F7]">{prospect.company}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-[#8B93A1]">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#8B93A1]/70" />
              {prospect.location}
            </span>
            {prospect.email && (
              <span className="flex items-center gap-1 font-mono text-[#8B93A1]/80">
                <Mail className="w-3 h-3 text-[#FF6B35]" />
                {prospect.email}
              </span>
            )}
          </div>
        </div>

        {/* Lead Score Card */}
        <div className="p-4 rounded-xl bg-[#171A21] border border-[#242832]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase text-[#8B93A1] tracking-wider">
              Lead Score
            </span>
            <span className="text-2xl font-bold font-mono text-[#FF6B35]">
              {prospect.score}
              <span className="text-xs text-[#8B93A1] font-normal"> / 100</span>
            </span>
          </div>

          <div className="w-full bg-[#08090C] h-1.5 rounded-full overflow-hidden mb-3 border border-[#242832]">
            <div
              className="h-full bg-gradient-to-r from-[#FF6B35] to-[#32D583] rounded-full"
              style={{ width: `${prospect.score}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-[#8B93A1]">Qualification verdict:</span>
            <span className="text-[#F5F5F7] font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#32D583]" />
              Strong ICP match
            </span>
          </div>
        </div>

        {/* Firmographics Info */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-lg bg-[#08090C] border border-[#242832]">
            <div className="text-[10px] font-mono uppercase text-[#8B93A1] tracking-wider mb-1 flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>Company size</span>
            </div>
            <div className="text-sm font-medium text-[#F5F5F7]">
              {prospect.companySize}
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-[#08090C] border border-[#242832]">
            <div className="text-[10px] font-mono uppercase text-[#8B93A1] tracking-wider mb-1 flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              <span>Funding round</span>
            </div>
            <div className="text-sm font-medium text-[#F5F5F7]">
              {prospect.funding}
            </div>
          </div>
        </div>

        {/* Signals Section */}
        <div>
          <h4 className="text-xs font-mono uppercase text-[#8B93A1] tracking-wider mb-2.5">
            Key Signals Detected
          </h4>
          <div className="flex flex-wrap gap-2">
            {prospect.signals.map((signal, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1.5 rounded-lg bg-[#171A21] border border-[#242832] text-xs text-[#F5F5F7] flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3 h-3 text-[#32D583]" />
                {signal}
              </span>
            ))}
          </div>
        </div>

        {/* External Links */}
        <div className="pt-2 border-t border-[#242832] space-y-2">
          {prospect.linkedinUrl && (
            <a
              href={prospect.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-lg bg-[#08090C] border border-[#242832] text-xs text-[#8B93A1] hover:text-[#F5F5F7] hover:border-[#FF6B35]/40 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-[#FF6B35]" />
                <span>LinkedIn Profile</span>
              </span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}

          {prospect.website && (
            <a
              href={prospect.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-lg bg-[#08090C] border border-[#242832] text-xs text-[#8B93A1] hover:text-[#F5F5F7] hover:border-[#FF6B35]/40 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-[#FF6B35]" />
                <span>Company Website</span>
              </span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-5 border-t border-[#242832] bg-[#08090C]/80 space-y-2.5">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleAddCrm}
            className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-[#FF6B35] hover:bg-[#E95724] text-[#08090C] text-xs font-semibold transition-colors shadow-lg shadow-[#FF6B35]/20 cursor-pointer"
          >
            {addedSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#32D583]" />
                <span>Synced to CRM</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Add to CRM</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleCreateTask}
            className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-[#171A21] hover:bg-[#242832] text-[#F5F5F7] border border-[#242832] text-xs font-medium transition-colors cursor-pointer"
          >
            {taskCreated ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#32D583]" />
                <span>Task Created</span>
              </>
            ) : (
              <>
                <PlusCircle className="w-3.5 h-3.5 text-[#FF6B35]" />
                <span>Create task</span>
              </>
            )}
          </button>
        </div>

        {prospect.website && (
          <a
            href={prospect.website}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-[#8B93A1] hover:text-[#F5F5F7] text-xs font-medium transition-colors cursor-pointer"
          >
            <span>Open company</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}
