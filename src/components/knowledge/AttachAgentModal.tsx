'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { initialAgents } from '@/data/mockData';
import { Cpu, CheckCircle2, Search, Check } from 'lucide-react';
import { Input } from '@/components/ui/Input';

interface AttachAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceName: string;
  alreadyAttachedAgents: string[];
  onAttach: (agentName: string) => void;
}

export function AttachAgentModal({
  isOpen,
  onClose,
  resourceName,
  alreadyAttachedAgents,
  onAttach,
}: AttachAgentModalProps) {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [justAttached, setJustAttached] = useState<string | null>(null);

  const filteredAgents = initialAgents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(search.toLowerCase()) ||
      agent.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleConfirm = () => {
    if (!selectedAgent) return;
    onAttach(selectedAgent);
    setJustAttached(selectedAgent);
    setTimeout(() => {
      setJustAttached(null);
      setSelectedAgent(null);
      onClose();
    }, 1200);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        if (!justAttached) {
          setSelectedAgent(null);
          onClose();
        }
      }}
      title="Attach Knowledge to Agent"
      description={`Connect "${resourceName}" to an active agent for automatic context grounding during task execution.`}
    >
      {justAttached ? (
        <div className="py-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#32D583]/10 border border-[#32D583]/30 flex items-center justify-center text-[#32D583] mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-base font-medium text-[#F5F5F7]">
            ✓ Added to {justAttached}
          </h4>
          <p className="text-xs text-[#8B93A1]">
            Agent vector store index re-compiled with new context.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <Input
            icon={<Search className="w-3.5 h-3.5" />}
            placeholder="Search agents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {filteredAgents.map((agent) => {
              const isAlready = alreadyAttachedAgents.includes(agent.name);
              const isSelected = selectedAgent === agent.name;

              return (
                <div
                  key={agent.id}
                  onClick={() => {
                    if (!isAlready) setSelectedAgent(agent.name);
                  }}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                    isAlready
                      ? 'bg-[#111318]/50 border-[#242832]/60 opacity-60 cursor-not-allowed'
                      : isSelected
                      ? 'bg-[#171A21] border-[#FF6B35] shadow-[0_0_12px_rgba(255,107,53,0.2)] cursor-pointer'
                      : 'bg-[#111318] border-[#242832] hover:border-[#3D4454] cursor-pointer'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#171A21] border border-[#242832] flex items-center justify-center text-[#FF6B35] shrink-0">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-medium text-[#F5F5F7] truncate flex items-center gap-2">
                        {agent.name}
                        <span className="text-[10px] font-mono text-[#5C6370]">{agent.category}</span>
                      </div>
                      <div className="text-[11px] text-[#8B93A1] truncate">
                        {agent.taskCount} tasks • {agent.successRate}% success
                      </div>
                    </div>
                  </div>

                  <div>
                    {isAlready ? (
                      <span className="text-[10px] font-mono text-[#5C6370] flex items-center gap-1">
                        <Check className="w-3 h-3 text-[#32D583]" /> Attached
                      </span>
                    ) : (
                      <input
                        type="radio"
                        checked={isSelected}
                        onChange={() => setSelectedAgent(agent.name)}
                        className="accent-[#FF6B35] cursor-pointer"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#242832]">
            <Button
              variant="ghost"
              onClick={() => {
                setSelectedAgent(null);
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={!selectedAgent}
              onClick={handleConfirm}
              className="font-medium"
            >
              Attach Knowledge
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
