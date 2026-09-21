'use client';

import React from 'react';
import { WorkflowNode } from './WorkflowNode';
import { AddStepMenu } from './AddStepMenu';
import { WorkflowNodeData, WorkflowStepType } from '@/types';
import { ArrowDown, Layers } from 'lucide-react';

interface WorkflowCanvasProps {
  steps: WorkflowNodeData[];
  selectedNodeId: string;
  onSelectNode: (id: string) => void;
  onAddStep: (type: WorkflowStepType, atIndex: number) => void;
  onDeleteNode: (id: string) => void;
  onDuplicateNode: (id: string) => void;
  isExecuting?: boolean;
}

export const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({
  steps,
  selectedNodeId,
  onSelectNode,
  onAddStep,
  onDeleteNode,
  onDuplicateNode,
  isExecuting,
}) => {
  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-8 flex flex-col items-center">
      {/* Canvas Meta Header */}
      <div className="w-full max-w-lg mb-6 flex items-center justify-between text-xs text-[#8B93A1]">
        <div className="flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-[#FF6B35]" />
          <span className="font-medium text-[#F5F5F7]">Workflow Execution Graph</span>
          <span className="font-mono text-[#5C6370]">({steps.length} nodes)</span>
        </div>
        <div className="text-[11px] font-mono text-[#5C6370]">
          Click any node to configure
        </div>
      </div>

      {/* Nodes Sequence */}
      <div className="w-full max-w-lg space-y-0">
        {steps.map((node, index) => {
          const isSelected = node.id === selectedNodeId;

          return (
            <React.Fragment key={node.id}>
              {/* The Node */}
              <WorkflowNode
                node={node}
                isSelected={isSelected}
                onSelect={() => onSelectNode(node.id)}
                onDelete={steps.length > 2 ? () => onDeleteNode(node.id) : undefined}
                onDuplicate={() => onDuplicateNode(node.id)}
                isExecuting={isExecuting}
              />

              {/* Add Step Connector between nodes */}
              {index < steps.length - 1 && (
                <AddStepMenu
                  index={index}
                  onAddStep={(type) => onAddStep(type, index + 1)}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Canvas Bottom Safe Margin */}
      <div className="h-16" />
    </div>
  );
};
