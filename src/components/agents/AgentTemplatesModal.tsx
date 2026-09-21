'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { AgentTemplateCard } from './AgentTemplateCard';
import { mockAgentTemplates } from '@/data/mockData';
import { AgentTemplate } from '@/types';

interface AgentTemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate?: (template: AgentTemplate) => void;
}

export function AgentTemplatesModal({
  isOpen,
  onClose,
  onSelectTemplate,
}: AgentTemplatesModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Agent from Template"
      description="Select a pre-engineered enterprise agent architecture with integrated workflows and recommended knowledge."
    >
      <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
        <div className="grid grid-cols-1 gap-4">
          {mockAgentTemplates.map((tmpl) => (
            <AgentTemplateCard
              key={tmpl.id}
              template={tmpl}
              onSelect={(selected) => {
                if (onSelectTemplate) {
                  onSelectTemplate(selected);
                }
                onClose();
              }}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
}
