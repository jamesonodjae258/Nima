'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';

interface AgentSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  setName: (n: string) => void;
  description: string;
  setDescription: (d: string) => void;
  type: string;
  setType: (t: string) => void;
  executionMode: string;
  setExecutionMode: (m: string) => void;
  humanApproval: boolean;
  setHumanApproval: (a: boolean) => void;
  onSave: () => void;
}

export const AgentSettingsModal: React.FC<AgentSettingsModalProps> = ({
  isOpen,
  onClose,
  name,
  setName,
  description,
  setDescription,
  type,
  setType,
  executionMode,
  setExecutionMode,
  humanApproval,
  setHumanApproval,
  onSave,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Agent Settings"
      description="Configure operational metadata, execution schedule, and guardrails for this digital worker."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-medium text-[#F5F5F7] block mb-1.5">
            Agent Name
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-xs font-medium text-[#F5F5F7] block mb-1.5">
            Description
          </label>
          <Textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-[#F5F5F7] block mb-1.5">
              Agent Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="flex h-9 w-full rounded-lg border border-[#242832] bg-[#111318] px-3 py-1 text-xs text-[#F5F5F7] outline-none"
            >
              <option value="Sales Agent">Sales Agent</option>
              <option value="Support Agent">Support Agent</option>
              <option value="Operations Agent">Operations Agent</option>
              <option value="Finance Agent">Finance Agent</option>
              <option value="Security Agent">Security Agent</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-[#F5F5F7] block mb-1.5">
              Execution Mode
            </label>
            <select
              value={executionMode}
              onChange={(e) => setExecutionMode(e.target.value)}
              className="flex h-9 w-full rounded-lg border border-[#242832] bg-[#111318] px-3 py-1 text-xs text-[#F5F5F7] outline-none"
            >
              <option value="Manual">Manual</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Event-based">Event-based</option>
            </select>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-[#0E1015] border border-[#242832] flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-[#F5F5F7]">Human Approval Boundary</div>
            <div className="text-[11px] text-[#8B93A1]">Require human review before mutating external tools</div>
          </div>
          <input
            type="checkbox"
            checked={humanApproval}
            onChange={(e) => setHumanApproval(e.target.checked)}
            className="w-4 h-4 rounded text-[#FF6B35] accent-[#FF6B35]"
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#242832]">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            Save draft
          </Button>
        </div>
      </form>
    </Modal>
  );
};
