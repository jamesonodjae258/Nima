'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Agent } from '@/types';
import { Copy, CheckCircle2 } from 'lucide-react';

interface AgentDuplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  agent: Agent | null;
  onDuplicate: (newAgent: Agent) => void;
}

export function AgentDuplicationModal({
  isOpen,
  onClose,
  agent,
  onDuplicate,
}: AgentDuplicationModalProps) {
  if (!agent) return null;

  const [name, setName] = useState(`Copy of ${agent.name}`);
  const [description, setDescription] = useState(agent.description);
  const [copyKnowledge, setCopyKnowledge] = useState(true);
  const [preserveWorkflow, setPreserveWorkflow] = useState(true);
  const [isDuplicating, setIsDuplicating] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsDuplicating(true);
    setTimeout(() => {
      const duplicated: Agent = {
        ...agent,
        id: `agent-${Date.now()}`,
        name: name.trim(),
        description: description.trim(),
        status: 'idle',
        taskCount: 0,
        successRate: 100,
        lastActive: 'Just now',
      };

      onDuplicate(duplicated);
      setIsDuplicating(false);
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 900);
    }, 500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        if (!isDuplicating) onClose();
      }}
      title="Duplicate Agent"
      description={`Create an independent clone of ${agent.name} with its full reasoning chain and configuration.`}
    >
      {success ? (
        <div className="py-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#32D583]/10 border border-[#32D583]/30 flex items-center justify-center text-[#32D583] mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-base font-medium text-[#F5F5F7]">Agent Duplicated</h4>
          <p className="text-xs text-[#8B93A1]">
            &ldquo;{name}&rdquo; is now ready in your agent directory.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-[#F5F5F7] block mb-1">
              New Agent Name
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-xs font-medium text-[#F5F5F7] block mb-1">
              Description
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
          </div>

          <div className="p-3 rounded-xl bg-[#0E1015] border border-[#242832] space-y-2 text-xs">
            <label className="flex items-center gap-2 text-[#8B93A1] cursor-pointer">
              <input
                type="checkbox"
                checked={copyKnowledge}
                onChange={(e) => setCopyKnowledge(e.target.checked)}
                className="accent-[#FF6B35]"
              />
              <span className="text-[#F5F5F7]">Clone connected knowledge context & memory</span>
            </label>

            <label className="flex items-center gap-2 text-[#8B93A1] cursor-pointer">
              <input
                type="checkbox"
                checked={preserveWorkflow}
                onChange={(e) => setPreserveWorkflow(e.target.checked)}
                className="accent-[#FF6B35]"
              />
              <span className="text-[#F5F5F7]">Preserve multi-step workflow nodes & rules</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#242832]">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isDuplicating}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isDuplicating || !name.trim()}>
              {isDuplicating ? 'Duplicating...' : 'Duplicate Agent'}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
