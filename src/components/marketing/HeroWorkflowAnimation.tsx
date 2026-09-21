'use client';

import React, { useState, useEffect } from 'react';
import {
  Terminal,
  Layers,
  Zap,
  ShieldCheck,
  CheckCircle2,
  RotateCcw,
  Check,
  Play,
  Pause,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface PipelineNode {
  id: number;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
}

export function HeroWorkflowAnimation() {
  const [activeStep, setActiveStep] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [streamedText, setStreamedText] = useState('');
  const [approved, setApproved] = useState(false);

  const nodes: PipelineNode[] = [
    { id: 1, label: 'Goal', sublabel: 'Specification', icon: <Terminal className="w-3.5 h-3.5" /> },
    { id: 2, label: 'Reasoning', sublabel: 'Plan Generation', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 3, label: 'Execution', sublabel: 'Tool Operations', icon: <Zap className="w-3.5 h-3.5" /> },
    { id: 4, label: 'Verification', sublabel: 'Human Review', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
    { id: 5, label: 'Sync', sublabel: 'Database Write', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  ];

  const fullLogs: Record<number, string> = {
    1: '[10:42:01 INFO] Dispatching workflow: "Find recently funded SaaS companies with >$5M Series A, qualify against ICP, and add verified decision makers to HubSpot."\n[10:42:02 INFO] Intent resolved. Target audience: US/EU B2B software (50-250 FTE).',
    2: '[10:42:04 PLAN] Decomposing workflow into 4 parallel operations:\n  1. Ingest Series A funding filings from SEC & business registries (<30d)\n  2. Query company metadata: headcount, tech stack, ARR proxy\n  3. Resolve executive contacts: VP Sales, CRO, Head of RevOps\n  4. Verify corporate MX records and mailbox deliverability',
    3: '[10:42:08 EXEC] Ingesting candidate pool: 38 companies match funding filter.\n  ✓ Verified 42 executive contacts across target accounts\n  ✓ Filtered deliverability: 42 of 42 addresses confirmed active\n  → Staging formatted contact payloads for CRM integration',
    4: '[10:42:12 GATE] Human review gate active:\n  - 42 verified executive contacts ready for ingest\n  - Target destination: HubSpot CRM (Pipeline: "Inbound Qualified")\n  - Awaiting operator confirmation to write records...',
    5: '[10:42:15 SUCCESS] Operator approved batch.\n  ✓ Created 38 company records and 42 associated contacts in HubSpot\n  ✓ Dispatched notification to Slack #revenue-ops with account dossiers\n  ✓ Workflow completed in 3m 14s with zero manual data entry.',
  };

  // Step progression
  useEffect(() => {
    if (isPaused) return;

    const timer = setTimeout(() => {
      setActiveStep((prev) => (prev >= 5 ? 1 : prev + 1));
      if (activeStep === 4 && !approved) {
        setApproved(true);
      }
    }, 4500);

    return () => clearTimeout(timer);
  }, [activeStep, isPaused, approved]);

  // Streaming text typewriter effect
  useEffect(() => {
    const textToStream = fullLogs[activeStep] || '';
    setStreamedText('');
    let i = 0;
    const interval = setInterval(() => {
      if (i < textToStream.length) {
        setStreamedText(textToStream.slice(0, i + 1));
        i += 2;
      } else {
        clearInterval(interval);
      }
    }, 14);

    return () => clearInterval(interval);
  }, [activeStep]);

  const handleManualStep = (stepId: number) => {
    setActiveStep(stepId);
    if (stepId === 5) setApproved(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-1 border border-white/[0.08] shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden text-left relative group">
      {/* Inner Machined Chassis */}
      <div className="rounded-xl bg-[#0E1015]/95 backdrop-blur-2xl border border-white/[0.04] overflow-hidden">
        {/* Top Window Bar */}
        <div className="h-11 px-4 bg-[#090A0D] border-b border-white/[0.06] flex items-center justify-between text-xs text-[#8B93A1]">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            </div>
            <span className="ml-2 font-mono text-[11px] text-[#8B93A1] hidden sm:inline">
              Workflow #8492 • Inbound Prospect Research
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#32D583] bg-[#32D583]/10 px-2 py-0.5 rounded border border-[#32D583]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#32D583]" />
              <span>Running Live</span>
            </div>

            <button
              onClick={() => setIsPaused(!isPaused)}
              className="text-[#5C6370] hover:text-[#F5F5F7] p-1 transition-colors"
              title={isPaused ? 'Resume simulation' : 'Pause simulation'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => {
                setActiveStep(1);
                setApproved(false);
              }}
              className="text-[#5C6370] hover:text-[#F5F5F7] p-1 transition-colors"
              title="Restart simulation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Pipeline Stage Track */}
        <div className="p-4 sm:p-5 border-b border-white/[0.05] bg-[#0A0C0F] relative overflow-x-auto scrollbar-none">
          <div className="flex items-center justify-between min-w-[580px] relative">
            {/* SVG Connecting Beam */}
            <svg
              className="absolute top-1/2 left-6 right-6 -translate-y-1/2 w-[calc(100%-48px)] h-2 z-0 pointer-events-none"
              preserveAspectRatio="none"
            >
              <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#1F242E" strokeWidth="2" />
              <line
                x1="0"
                y1="50%"
                x2="100%"
                y2="50%"
                stroke="#FF6B35"
                strokeWidth="2"
                className="animate-laser"
                strokeDasharray="8 16"
              />
            </svg>

            {nodes.map((node) => {
              const isActive = activeStep === node.id;
              const isDone = activeStep > node.id;

              return (
                <button
                  key={node.id}
                  onClick={() => handleManualStep(node.id)}
                  className="relative z-10 flex flex-col items-center group cursor-pointer select-none"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'bg-[#FF6B35] text-[#08090C] shadow-[0_0_20px_rgba(255,107,53,0.4)] scale-105 font-bold'
                        : isDone
                        ? 'bg-[#1F242E] text-[#32D583] border border-[#32D583]/30'
                        : 'bg-[#14171F] text-[#5C6370] border border-white/[0.06] hover:border-white/[0.15]'
                    }`}
                  >
                    {isDone ? <Check className="w-4 h-4" /> : node.icon}
                  </div>

                  <span
                    className={`mt-2 font-mono text-[11px] font-semibold transition-colors ${
                      isActive ? 'text-[#FF6B35]' : isDone ? 'text-[#32D583]' : 'text-[#5C6370]'
                    }`}
                  >
                    {node.label}
                  </span>
                  <span className="text-[10px] text-[#8B93A1] font-medium">{node.sublabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Execution Log */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-[#FF6B35]" />
              <span className="text-[11px] font-mono text-[#8B93A1]">
                Execution Stream
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#5C6370]">Grounded to verified APIs</span>
          </div>

          {/* Log Window */}
          <div className="p-4 rounded-xl bg-[#08090C] border border-white/[0.06] min-h-[140px] font-mono text-xs leading-relaxed text-[#F5F5F7] shadow-inner relative">
            <pre className="whitespace-pre-wrap font-mono text-xs text-[#8B93A1]">
              <span className="text-[#F5F5F7]">{streamedText}</span>
              <span className="inline-block w-2 h-3.5 ml-1 bg-[#FF6B35] animate-pulse align-middle" />
            </pre>

            {/* Operator Approval Gate */}
            {activeStep === 4 && (
              <div className="mt-4 pt-3 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-300">
                <div className="text-[11px] text-[#FFB49B] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FF6B35]" />
                  <span>Operator confirmation required before database write</span>
                </div>
                <Button
                  size="sm"
                  onClick={() => {
                    setApproved(true);
                    setActiveStep(5);
                  }}
                  className="text-xs bg-[#32D583] hover:bg-[#28B870] text-[#08090C] font-semibold"
                >
                  <Check className="w-3 h-3 mr-1" />
                  Confirm & Write to HubSpot
                </Button>
              </div>
            )}
          </div>

          {/* Output Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-2.5 rounded-lg bg-[#0A0C0F] border border-white/[0.04]">
              <div className="text-[10px] font-mono text-[#5C6370]">Destination</div>
              <div className="text-xs font-semibold text-[#F5F5F7] mt-0.5">HubSpot CRM</div>
            </div>
            <div className="p-2.5 rounded-lg bg-[#0A0C0F] border border-white/[0.04]">
              <div className="text-[10px] font-mono text-[#5C6370]">Candidate Accounts</div>
              <div className="text-xs font-semibold text-[#32D583] mt-0.5">38 SaaS companies</div>
            </div>
            <div className="p-2.5 rounded-lg bg-[#0A0C0F] border border-white/[0.04]">
              <div className="text-[10px] font-mono text-[#5C6370]">Decision Makers</div>
              <div className="text-xs font-semibold text-[#F5F5F7] mt-0.5">42 verified contacts</div>
            </div>
            <div className="p-2.5 rounded-lg bg-[#0A0C0F] border border-white/[0.04]">
              <div className="text-[10px] font-mono text-[#5C6370]">Mailbox Verification</div>
              <div className="text-xs font-semibold text-[#32D583] mt-0.5">100% deliverable</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
