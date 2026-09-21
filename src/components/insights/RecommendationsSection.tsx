'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { RecommendationItem } from '@/types';
import { mockRecommendations } from '@/data/mockData';
import {
  Sliders,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Zap,
  Check,
  HelpCircle,
} from 'lucide-react';

export function RecommendationsSection() {
  const [recommendations, setRecommendations] =
    useState<RecommendationItem[]>(mockRecommendations);
  const [selectedRec, setSelectedRec] = useState<RecommendationItem | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [appliedNotice, setAppliedNotice] = useState<string | null>(null);

  const handleApply = () => {
    if (!selectedRec) return;
    setIsApplying(true);

    setTimeout(() => {
      setRecommendations((prev) =>
        prev.map((r) =>
          r.id === selectedRec.id
            ? { ...r, status: 'applied', appliedAt: 'Just now' }
            : r
        )
      );
      setIsApplying(false);
      setAppliedNotice(selectedRec.title);
      setSelectedRec(null);

      setTimeout(() => {
        setAppliedNotice(null);
      }, 3500);
    }, 700);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-[#FF6B35]/15 border border-[#FF6B35]/30 flex items-center justify-center text-[#FF6B35]">
            <Sliders className="w-3 h-3" />
          </div>
          <h2 className="text-sm font-semibold text-[#F5F5F7] tracking-tight">
            System Recommendations
          </h2>
          <span className="text-[11px] font-mono text-[#5C6370]">
            Autonomous system optimizations grounded in recent telemetry
          </span>
        </div>

        {appliedNotice && (
          <span className="text-xs text-[#32D583] flex items-center gap-1 font-mono animate-in fade-in duration-200">
            <Check className="w-3.5 h-3.5" /> Recommendation applied
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((rec) => {
          const isApplied = rec.status === 'applied';

          return (
            <Card
              key={rec.id}
              className={`p-5 flex flex-col justify-between transition-all relative ${
                isApplied
                  ? 'bg-[#111318]/70 border-[#242832]/60'
                  : 'bg-[#111318] border-[#242832] hover:border-[#FF6B35]/40'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#171A21] text-[#FF6B35] border border-[#242832] flex items-center gap-1">
                      <Cpu className="w-2.5 h-2.5" />
                      {rec.agentName}
                    </span>
                    <span className="text-[10px] font-mono text-[#5C6370]">
                      {rec.field}
                    </span>
                  </div>

                  {isApplied ? (
                    <Badge variant="success" size="sm">
                      <Check className="w-3 h-3 mr-1" />
                      Applied
                    </Badge>
                  ) : (
                    <Badge variant="orange" size="sm">
                      <Zap className="w-3 h-3 mr-1" />
                      Recommended
                    </Badge>
                  )}
                </div>

                <h3 className="text-sm font-semibold text-[#F5F5F7] tracking-tight mt-3">
                  {rec.title}
                </h3>
                <p className="text-xs text-[#8B93A1] mt-1.5 leading-relaxed">
                  {rec.description}
                </p>

                {/* Diff comparison box */}
                <div className="mt-3.5 p-3 rounded-xl bg-[#0E1015] border border-[#242832] space-y-1.5 font-mono text-[11px]">
                  <div className="flex items-center justify-between text-[#8B93A1]">
                    <span className="text-[#5C6370]">Current:</span>
                    <span className="line-through text-[#8B93A1]">{rec.currentValue}</span>
                  </div>
                  <div className="flex items-center justify-between text-[#32D583]">
                    <span className="text-[#5C6370]">Recommended:</span>
                    <span className="font-semibold flex items-center gap-1">
                      <ArrowRight className="w-3 h-3 text-[#FF6B35]" />
                      {rec.recommendedValue}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3.5 border-t border-[#242832]/60 flex items-center justify-between">
                <span className="text-[11px] text-[#5C6370]">
                  {rec.impactSummary}
                </span>

                {isApplied ? (
                  <span className="text-xs text-[#5C6370] font-mono">
                    Active in agent runtime
                  </span>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => setSelectedRec(rec)}
                    className="text-xs font-medium shadow-[0_0_12px_rgba(255,107,53,0.25)]"
                  >
                    <span>Apply recommendation</span>
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Confirmation Modal */}
      {selectedRec && (
        <Modal
          isOpen={!!selectedRec}
          onClose={() => {
            if (!isApplying) setSelectedRec(null);
          }}
          title="Apply Optimization"
          description={`Nima will update ${selectedRec.agentName}'s configuration based on empirical performance telemetry.`}
        >
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#0E1015] border border-[#242832] space-y-2.5">
              <div className="text-xs font-semibold text-[#F5F5F7] flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-[#FF6B35]" />
                <span>Target: {selectedRec.agentName}</span>
              </div>
              <div className="text-xs text-[#8B93A1]">
                Parameter: <span className="font-mono text-[#F5F5F7]">{selectedRec.field}</span>
              </div>

              <div className="pt-2 border-t border-[#242832]/60 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-[10px] font-mono text-[#5C6370] uppercase">Current Value</div>
                  <div className="font-mono text-[#8B93A1] mt-0.5">{selectedRec.currentValue}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#32D583] uppercase">New Value</div>
                  <div className="font-mono text-[#32D583] font-medium mt-0.5">
                    {selectedRec.recommendedValue}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#171A21] border border-[#242832] text-xs text-[#8B93A1] flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-[#FF6B35] shrink-0 mt-0.5" />
              <span>
                {selectedRec.impactSummary}. This modification takes effect on the next scheduled run.
              </span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#242832]">
              <Button
                variant="ghost"
                onClick={() => setSelectedRec(null)}
                disabled={isApplying}
              >
                Cancel
              </Button>
              <Button
                onClick={handleApply}
                disabled={isApplying}
                className="font-medium shadow-[0_0_12px_rgba(255,107,53,0.3)]"
              >
                {isApplying ? 'Applying changes...' : 'Confirm & Apply'}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
