'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MarketingNav } from '@/components/marketing/MarketingNav';
import { MarketingFooter } from '@/components/marketing/MarketingFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Cpu,
  ArrowRight,
  Play,
  RotateCcw,
  CheckCircle2,
  Clock,
  Check,
  Layers,
  Database,
} from 'lucide-react';

export default function DemoPage() {
  const [running, setRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [demoComplete, setDemoComplete] = useState(false);

  const handleStartDemo = () => {
    setRunning(true);
    setDemoComplete(false);
    setCurrentStep(1);

    setTimeout(() => setCurrentStep(2), 1400);
    setTimeout(() => setCurrentStep(3), 2800);
    setTimeout(() => setCurrentStep(4), 4200);
    setTimeout(() => {
      setRunning(false);
      setDemoComplete(true);
    }, 5600);
  };

  const handleReset = () => {
    setRunning(false);
    setCurrentStep(0);
    setDemoComplete(false);
  };

  return (
    <div className="min-h-screen bg-[#08090C] text-[#F5F5F7] flex flex-col selection:bg-[#FF6B35]/30 selection:text-white">
      <MarketingNav />

      <main className="flex-1">
        {/* Header */}
        <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-[#5C6370]">
            Interactive Sandbox <span className="text-[#FF6B35]">/</span> Live Simulation
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#F5F5F7] tracking-tight">
            See Nima in action.
          </h1>
          <p className="text-base sm:text-lg text-[#8B93A1] max-w-2xl mx-auto leading-relaxed">
            Watch Nima transform a natural language business goal into an executed multi-step workflow.
          </p>
        </section>

        {/* Interactive Demo Sandbox */}
        <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="rounded-2xl bg-[#111318] border border-[#242832] shadow-2xl p-6 sm:p-8 space-y-8">
            {/* Input prompt simulation */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-[#FF6B35] font-semibold flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Business Goal</span>
                </span>
                <span className="text-[10px] font-mono text-[#5C6370]">Autonomous Dispatch</span>
              </div>

              <div className="p-4 rounded-xl bg-[#0E1015] border border-[#242832] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-sm text-[#F5F5F7] font-mono leading-relaxed">
                  &ldquo;Research 20 recently funded SaaS companies, qualify against our enterprise ICP, and prepare CRM records.&rdquo;
                </p>

                <div className="flex items-center gap-2 shrink-0">
                  {currentStep > 0 && (
                    <Button variant="ghost" size="sm" onClick={handleReset} className="text-xs text-[#8B93A1]">
                      <RotateCcw className="w-3.5 h-3.5 mr-1" />
                      <span>Reset</span>
                    </Button>
                  )}
                  <Button
                    size="sm"
                    onClick={handleStartDemo}
                    disabled={running}
                    className="text-xs font-medium shadow-[0_0_15px_rgba(255,107,53,0.3)]"
                  >
                    <Play className="w-3 h-3 mr-1 text-white" />
                    <span>{running ? 'Executing...' : demoComplete ? 'Run Again' : 'Run Demo'}</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Generated Workflow Steps */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-[#5C6370]">Workflow Execution Graph</span>
                <span className="text-xs font-mono text-[#8B93A1]">
                  {currentStep === 0 && 'Awaiting trigger...'}
                  {currentStep === 1 && '1/4 Scanning web registries...'}
                  {currentStep === 2 && '2/4 Analyzing architectural fit...'}
                  {currentStep === 3 && '3/4 Scoring against ICP criteria...'}
                  {currentStep === 4 && '4/4 Synthesizing output records...'}
                  {demoComplete && 'Execution complete'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {[
                  { id: 1, name: 'Research', detail: 'Scan 20 candidate firms' },
                  { id: 2, name: 'Analyze', detail: 'Inspect revenue models' },
                  { id: 3, name: 'Qualify', detail: 'Filter 100–250 headcount' },
                  { id: 4, name: 'Report', detail: 'Prepare CRM records' },
                ].map((st) => {
                  const isDone = currentStep > st.id || demoComplete;
                  const isActive = currentStep === st.id;

                  return (
                    <div
                      key={st.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isDone
                          ? 'bg-[#171A21] border-[#32D583]/50'
                          : isActive
                          ? 'bg-[#171A21] border-[#FF6B35] shadow-[0_0_15px_rgba(255,107,53,0.2)]'
                          : 'bg-[#0E1015] border-[#242832] opacity-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-[#FF6B35]">0{st.id}</span>
                        {isDone ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#32D583]" />
                        ) : isActive ? (
                          <Clock className="w-3.5 h-3.5 text-[#FF6B35] animate-spin" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-[#5C6370]" />
                        )}
                      </div>
                      <h4 className="text-sm font-semibold text-[#F5F5F7]">{st.name}</h4>
                      <p className="text-[11px] text-[#8B93A1] mt-1">{st.detail}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Results Display */}
            {demoComplete ? (
              <div className="p-6 rounded-xl bg-[#0E1015] border border-[#32D583]/40 space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#32D583]" />
                    <span className="text-xs font-semibold text-[#F5F5F7]">Workflow Completed Successfully</span>
                  </div>
                  <Badge variant="success" size="sm">
                    Verified Results
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center py-2 border-y border-[#242832]/60">
                  <div>
                    <div className="text-lg font-semibold text-[#F5F5F7]">20</div>
                    <div className="text-[10px] font-mono text-[#5C6370]">Companies Researched</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-[#32D583]">7</div>
                    <div className="text-[10px] font-mono text-[#5C6370]">Matched ICP Criteria</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-[#FF6B35]">14</div>
                    <div className="text-[10px] font-mono text-[#5C6370]">Decision Makers Verified</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <span className="text-xs text-[#8B93A1]">
                    Ready to run this on your live data?
                  </span>

                  <div className="flex items-center gap-2">
                    <Link href="/dashboard">
                      <Button variant="secondary" size="sm" className="text-xs">
                        View in Dashboard →
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button size="sm" className="text-xs font-medium">
                        Build your own agent
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center rounded-xl bg-[#0E1015] border border-[#242832] text-xs text-[#5C6370]">
                {running ? 'Agent executing live simulation...' : 'Click "Run Demo" above to watch Nima execute this goal.'}
              </div>
            )}
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
