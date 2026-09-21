'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { WorkflowNodeData, WorkflowStepType } from '@/types';
import {
  Zap,
  Search,
  BarChart3,
  Target,
  Users,
  ShieldAlert,
  Send,
  Database,
  Clock,
  FileText,
  MoreVertical,
  Trash2,
  Copy,
  ChevronDown,
  ArrowDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface WorkflowNodeProps {
  node: WorkflowNodeData;
  isSelected: boolean;
  onSelect: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
  isExecuting?: boolean;
}

export const WorkflowNode: React.FC<WorkflowNodeProps> = ({
  node,
  isSelected,
  onSelect,
  onDelete,
  onDuplicate,
  isExecuting,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const getNodeIcon = (type: WorkflowStepType) => {
    switch (type) {
      case 'trigger':
        return <Zap className="w-4 h-4 text-[#F5B544]" />;
      case 'research':
        return <Search className="w-4 h-4 text-[#FF6B35]" />;
      case 'analyze':
        return <BarChart3 className="w-4 h-4 text-[#FFB49B]" />;
      case 'qualify':
        return <Target className="w-4 h-4 text-[#32D583]" />;
      case 'enrich':
        return <Users className="w-4 h-4 text-[#FF6B35]" />;
      case 'approval':
        return <ShieldAlert className="w-4 h-4 text-[#F5B544]" />;
      case 'action':
        return <Database className="w-4 h-4 text-[#32D583]" />;
      case 'generate':
        return <FileText className="w-4 h-4 text-[#FFB49B]" />;
      case 'wait':
        return <Clock className="w-4 h-4 text-[#8B93A1]" />;
      case 'send':
      case 'update':
        return <Send className="w-4 h-4 text-[#32D583]" />;
      default:
        return <Zap className="w-4 h-4 text-[#FF6B35]" />;
    }
  };

  const renderStatus = () => {
    switch (node.status) {
      case 'working':
        return (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#FF6B35] bg-[#FF6B35]/15 px-2 py-0.5 rounded border border-[#FF6B35]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] animate-pulse" />
            <span>Working</span>
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#32D583] bg-[#32D583]/15 px-2 py-0.5 rounded border border-[#32D583]/30">
            <span>✓</span>
            <span>Completed</span>
          </span>
        );
      case 'error':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#F04438] bg-[#F04438]/15 px-2 py-0.5 rounded border border-[#F04438]/30">
            <span>×</span>
            <span>Failed</span>
          </span>
        );
      case 'ready':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#8B93A1] bg-[#171A21] px-2 py-0.5 rounded border border-[#242832]">
            <span className="text-[#32D583]">✓</span>
            <span>Ready</span>
          </span>
        );
      case 'idle':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#5C6370] bg-[#171A21] px-2 py-0.5 rounded border border-[#242832]">
            <span>○</span>
            <span>Idle</span>
          </span>
        );
    }
  };

  const isApprovalNode = node.type === 'approval';

  return (
    <div
      onClick={onSelect}
      className={cn(
        'w-full max-w-lg mx-auto rounded-[12px] border p-4 transition-all duration-150 cursor-pointer relative select-none group',
        isSelected
          ? 'bg-[#171A21] border-[#FF6B35] shadow-[0_0_20px_rgba(255,107,53,0.18)]'
          : node.status === 'working'
          ? 'bg-[#13161F] border-[#FF6B35]/80 shadow-[0_0_15px_rgba(255,107,53,0.25)] ring-1 ring-[#FF6B35]/50'
          : node.status === 'completed'
          ? 'bg-[#111318] border-[#32D583]/40'
          : isApprovalNode
          ? 'bg-[#13141A] border-[#F5B544]/30 hover:border-[#F5B544]/60'
          : 'bg-[#111318] border-[#242832] hover:border-[#3D4454] hover:bg-[#141720]'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {/* Node Icon */}
          <div
            className={cn(
              'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-colors mt-0.5',
              isSelected
                ? 'bg-[#FF6B35]/20 border-[#FF6B35]'
                : node.status === 'working'
                ? 'bg-[#FF6B35]/20 border-[#FF6B35] animate-agent-pulse'
                : 'bg-[#171A21] border-[#242832]'
            )}
          >
            {getNodeIcon(node.type)}
          </div>

          {/* Node Details */}
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-semibold text-[#5C6370] uppercase">
                {node.stepNumber}
              </span>
              <h4 className="text-sm font-semibold text-[#F5F5F7] group-hover:text-white transition-colors">
                {node.name}
              </h4>
              {isApprovalNode && (
                <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-[#F5B544]/15 text-[#F5B544] border border-[#F5B544]/30">
                  Human Control
                </span>
              )}
            </div>
            <p className="text-xs text-[#8B93A1] leading-relaxed line-clamp-2">
              {node.description}
            </p>
          </div>
        </div>

        {/* Status + Overflow menu */}
        <div className="flex items-center gap-2 shrink-0">
          {renderStatus()}

          <div className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(!menuOpen);
              }}
              className="p-1 rounded text-[#5C6370] hover:text-[#F5F5F7] hover:bg-[#171A21] transition-colors"
              aria-label="Node options"
            >
              <MoreVertical className="w-3.5 h-3.5" />
            </button>

            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(false);
                  }}
                />
                <div className="absolute right-0 mt-1 w-36 rounded-lg bg-[#171A21] border border-[#242832] shadow-xl py-1 z-30 text-xs text-[#F5F5F7] animate-in fade-in zoom-in-95 duration-100">
                  {onDuplicate && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDuplicate();
                        setMenuOpen(false);
                      }}
                      className="w-full px-3 py-1.5 text-left hover:bg-[#242832] flex items-center gap-2"
                    >
                      <Copy className="w-3 h-3 text-[#8B93A1]" />
                      <span>Duplicate</span>
                    </button>
                  )}
                  {onDelete && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                        setMenuOpen(false);
                      }}
                      className="w-full px-3 py-1.5 text-left hover:bg-[#242832] text-[#F04438] flex items-center gap-2"
                    >
                      <Trash2 className="w-3 h-3 text-[#F04438]" />
                      <span>Delete step</span>
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
