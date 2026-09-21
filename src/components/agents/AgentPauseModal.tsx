'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Agent } from '@/types';
import { Pause, AlertCircle } from 'lucide-react';

interface AgentPauseModalProps {
  isOpen: boolean;
  onClose: () => void;
  agent: Agent | null;
  onConfirmPause: () => void;
}

export function AgentPauseModal({
  isOpen,
  onClose,
  agent,
  onConfirmPause,
}: AgentPauseModalProps) {
  if (!agent) return null;

  const isCurrentlyRunning = agent.status === 'running';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isCurrentlyRunning ? `Pause ${agent.name}?` : `Resume ${agent.name}?`}
      description={
        isCurrentlyRunning
          ? 'Stops starting new tasks. Current running tasks will finish.'
          : 'Re-enables autonomous task scheduling and webhook triggers for this agent.'
      }
    >
      <div className="space-y-4">
        <div className="p-3.5 rounded-xl bg-[#0E1015] border border-[#242832] flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#F5B544]/15 border border-[#F5B544]/30 flex items-center justify-center text-[#F5B544] shrink-0">
            <Pause className="w-4 h-4" />
          </div>
          <div className="text-xs text-[#8B93A1] leading-relaxed">
            {isCurrentlyRunning ? (
              <>
                When paused, <span className="text-[#F5F5F7] font-medium">{agent.name}</span> will not trigger any scheduled tasks. Any currently in-flight executions will complete normally.
              </>
            ) : (
              <>
                Resuming <span className="text-[#F5F5F7] font-medium">{agent.name}</span> will activate background listeners and resume queued work.
              </>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#242832]">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant={isCurrentlyRunning ? 'secondary' : 'primary'}
            className={isCurrentlyRunning ? 'text-[#F5B544] border-[#F5B544]/30 hover:bg-[#F5B544]/10' : ''}
            onClick={() => {
              onConfirmPause();
              onClose();
            }}
          >
            {isCurrentlyRunning ? 'Pause Agent' : 'Resume Agent'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
