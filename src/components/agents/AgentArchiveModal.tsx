'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Agent } from '@/types';
import { Archive, AlertTriangle } from 'lucide-react';

interface AgentArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  agent: Agent | null;
  onConfirmArchive: () => void;
}

export function AgentArchiveModal({
  isOpen,
  onClose,
  agent,
  onConfirmArchive,
}: AgentArchiveModalProps) {
  if (!agent) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Archive ${agent.name}?`}
      description="The agent will be archived and will stop running."
    >
      <div className="space-y-4">
        <div className="p-3.5 rounded-xl bg-[#F04438]/10 border border-[#F04438]/20 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[#F04438] shrink-0 mt-0.5" />
          <div className="text-xs text-[#8B93A1] leading-relaxed">
            Archiving <span className="text-[#F5F5F7] font-medium">{agent.name}</span> will deactivate all its automated tasks, pause webhooks, and remove it from the active agent roster. Historical run records and outputs will remain preserved in the Activity Log.
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#242832]">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              onConfirmArchive();
              onClose();
            }}
          >
            Archive Agent
          </Button>
        </div>
      </div>
    </Modal>
  );
}
