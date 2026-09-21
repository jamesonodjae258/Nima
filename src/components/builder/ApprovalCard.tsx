'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProspectCandidate } from '@/types';
import { ShieldAlert, Check, X, ChevronDown, ChevronUp, Building2, User, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ApprovalCardProps {
  agentName: string;
  destination: string;
  candidates: ProspectCandidate[];
  onApprove: () => void;
  onReject: () => void;
  onEdit: () => void;
}

export const ApprovalCard: React.FC<ApprovalCardProps> = ({
  agentName,
  destination,
  candidates,
  onApprove,
  onReject,
  onEdit,
}) => {
  const [detailsExpanded, setDetailsExpanded] = useState(false);

  const highCount = candidates.filter((c) => c.confidence === 'high').length;
  const medCount = candidates.filter((c) => c.confidence === 'medium').length;

  return (
    <div className="w-full max-w-2xl mx-auto my-6 animate-in fade-in zoom-in-95 duration-200">
      <Card className="border-[#F5B544]/50 bg-gradient-to-b from-[#17181F] to-[#111318] shadow-[0_0_35px_rgba(245,181,68,0.14)] p-6 space-y-5">
        {/* Header Alert */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F5B544]/15 border border-[#F5B544]/40 flex items-center justify-center text-[#F5B544] shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#F5B544] font-semibold">
                  Human In The Loop
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5B544] animate-ping" />
              </div>
              <h3 className="text-lg font-semibold text-[#F5F5F7] tracking-tight mt-0.5">
                Approval required
              </h3>
            </div>
          </div>

          <Badge variant="warning" size="sm">
            Action Paused
          </Badge>
        </div>

        {/* Narrative Description */}
        <p className="text-sm text-[#D1D5DB] leading-relaxed">
          <strong className="text-white">{agentName}</strong> found{' '}
          <strong className="text-white">18 qualified prospects</strong> matching your ICP definition. The agent is ready to add them to{' '}
          <strong className="text-white">{destination}</strong>.
        </p>

        {/* Candidate Count Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => setDetailsExpanded(!detailsExpanded)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#171A21] border border-[#242832] text-xs font-mono text-[#F5F5F7] hover:border-[#FF6B35] transition-colors cursor-pointer group"
          >
            <span>18 contacts found</span>
            {detailsExpanded ? (
              <ChevronUp className="w-3.5 h-3.5 text-[#8B93A1]" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-[#8B93A1]" />
            )}
          </button>
          <span className="text-xs px-2.5 py-1 rounded-lg bg-[#32D583]/10 border border-[#32D583]/30 text-[#32D583] font-mono">
            {highCount} high-confidence matches
          </span>
          <span className="text-xs px-2.5 py-1 rounded-lg bg-[#F5B544]/10 border border-[#F5B544]/30 text-[#F5B544] font-mono">
            {medCount} medium-confidence matches
          </span>
        </div>

        {/* Expandable Review Table */}
        {detailsExpanded && (
          <div className="rounded-xl border border-[#242832] bg-[#0E1015] overflow-hidden animate-in fade-in duration-150">
            <div className="p-3 border-b border-[#242832] flex items-center justify-between text-xs text-[#8B93A1]">
              <span className="font-semibold text-[#F5F5F7]">Candidate Prospect Batch</span>
              <span className="font-mono text-[10px]">Verified against Series A/B ICP</span>
            </div>
            <div className="overflow-x-auto max-h-60 overflow-y-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#242832] bg-[#111318] text-[10px] font-mono uppercase text-[#5C6370]">
                    <th className="py-2.5 px-3">Company</th>
                    <th className="py-2.5 px-3">Contact</th>
                    <th className="py-2.5 px-3">Role</th>
                    <th className="py-2.5 px-3">Score</th>
                    <th className="py-2.5 px-3">Reason</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#242832]/60">
                  {candidates.map((cand) => (
                    <tr key={cand.id} className="hover:bg-[#171A21]/50">
                      <td className="py-2.5 px-3 font-semibold text-[#F5F5F7]">
                        {cand.company}
                      </td>
                      <td className="py-2.5 px-3 text-[#D1D5DB]">{cand.contact}</td>
                      <td className="py-2.5 px-3 text-[#8B93A1]">{cand.role}</td>
                      <td className="py-2.5 px-3 font-mono font-semibold text-[#32D583]">
                        {cand.score}
                      </td>
                      <td className="py-2.5 px-3 text-[11px] text-[#8B93A1]">
                        {cand.reason}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#242832]">
          <div className="text-xs text-[#8B93A1]">
            Nima will resume autonomous execution upon confirmation.
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={onReject}
              className="flex-1 sm:flex-none text-xs text-[#F04438] hover:text-[#F04438] hover:bg-[#F04438]/10"
            >
              <X className="w-3.5 h-3.5 mr-1" />
              <span>Reject</span>
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={onEdit}
              className="flex-1 sm:flex-none text-xs"
            >
              <span>Edit</span>
            </Button>

            <Button
              size="sm"
              onClick={onApprove}
              className="flex-1 sm:flex-none text-xs bg-[#32D583] hover:bg-[#28B06C] text-[#08090C] font-semibold shadow-[0_0_15px_rgba(50,213,131,0.3)]"
            >
              <Check className="w-3.5 h-3.5 mr-1 stroke-[3]" />
              <span>Approve</span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
