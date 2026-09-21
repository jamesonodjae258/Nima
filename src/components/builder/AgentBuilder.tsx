'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BuilderTopbar } from './BuilderTopbar';
import { GoalInputSection } from './GoalInputSection';
import { WorkflowCanvas } from './WorkflowCanvas';
import { StepConfigPanel } from './StepConfigPanel';
import { AgentSettingsModal } from './AgentSettingsModal';
import { ApprovalCard } from './ApprovalCard';
import { ResultsSummaryCard } from './ResultsSummaryCard';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { initialWorkflowSteps, mockCandidateProspects } from '@/data/mockData';
import {
  WorkflowNodeData,
  WorkflowStepType,
  WorkflowNodeConfig,
  BuilderPhase,
} from '@/types';
import { Play, Check, AlertCircle, Clock, ArrowRight, ShieldAlert, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

export const AgentBuilder: React.FC = () => {
  const router = useRouter();

  // Core Phase State
  const [phase, setPhase] = useState<BuilderPhase>('goal_input');
  const [generatingStep, setGeneratingStep] = useState(0);

  // Agent Metadata
  const [goal, setGoal] = useState('');
  const [agentName, setAgentName] = useState('Lead Researcher');
  const [agentDescription, setAgentDescription] = useState(
    'Finds and qualifies high-potential SaaS prospects and prepares them for CRM review.'
  );
  const [agentType, setAgentType] = useState('Sales Agent');
  const [executionMode, setExecutionMode] = useState('Manual');
  const [humanApproval, setHumanApproval] = useState(true);

  // Workflow Graph State
  const [steps, setSteps] = useState<WorkflowNodeData[]>(initialWorkflowSteps);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-research');
  const [mobileConfigOpen, setMobileConfigOpen] = useState(false);

  // Modals & Feedback
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isDraftSaved, setIsDraftSaved] = useState(false);

  // Execution Telemetry
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);

  // Validation Check
  const getValidationError = (): string | null => {
    const actionNode = steps.find((s) => s.type === 'action');
    if (!actionNode || !actionNode.config.destination) {
      return 'Action step destination is missing. Complete CRM configuration before running.';
    }
    const qualifyNode = steps.find((s) => s.type === 'qualify');
    if (!qualifyNode || !qualifyNode.config.industry) {
      return 'Qualification criteria missing. Specify target industry before running.';
    }
    return null;
  };

  const validationError = getValidationError();

  // Handlers for Goal Generation Transition
  const handleStartGeneration = () => {
    setPhase('generating');
    setGeneratingStep(1); // "Understanding your goal..."

    setTimeout(() => {
      setGeneratingStep(2); // "Designing the workflow..."
    }, 1100);

    setTimeout(() => {
      setGeneratingStep(3); // "Your agent is ready."
    }, 2200);

    setTimeout(() => {
      setPhase('canvas');
      setGeneratingStep(0);
    }, 3000);
  };

  // Node Selection
  const handleSelectNode = (nodeId: string) => {
    setSelectedNodeId(nodeId);
    setMobileConfigOpen(true);
  };

  // Node Config Updates
  const handleUpdateNodeConfig = (
    nodeId: string,
    newConfig: Partial<WorkflowNodeConfig>
  ) => {
    setSteps((prev) =>
      prev.map((s) =>
        s.id === nodeId ? { ...s, config: { ...s.config, ...newConfig } } : s
      )
    );
  };

  // Add Step
  const handleAddStep = (type: WorkflowStepType, atIndex: number) => {
    const newId = `node-${Date.now()}`;
    const nameMap: Record<WorkflowStepType, string> = {
      trigger: 'Trigger',
      research: 'Research',
      analyze: 'Analyze',
      qualify: 'Qualify',
      enrich: 'Enrich',
      generate: 'Generate',
      send: 'Send',
      update: 'Update',
      wait: 'Wait',
      approval: 'Approval',
      action: 'Action',
    };

    const descMap: Record<WorkflowStepType, string> = {
      trigger: 'New trigger condition dispatch',
      research: 'Autonomous research query',
      analyze: 'Deep reasoning and structure analysis',
      qualify: 'Evaluate target match confidence',
      enrich: 'Append enriched attributes',
      generate: 'Draft customized copy or brief',
      send: 'Dispatch communication payload',
      update: 'Write changes to external CRM',
      wait: 'Wait for temporal delay or event',
      approval: 'Require manual human sign-off',
      action: 'Add prospects to external CRM or destination',
    };

    const newNode: WorkflowNodeData = {
      id: newId,
      stepNumber: String(atIndex + 1).padStart(2, '0'),
      type,
      name: nameMap[type] || 'Step',
      description: descMap[type] || 'Configured agent step',
      status: 'ready',
      config: {},
    };

    const updated = [...steps];
    updated.splice(atIndex, 0, newNode);

    // Renumber steps
    const renumbered = updated.map((step, idx) => ({
      ...step,
      stepNumber: String(idx + 1).padStart(2, '0'),
    }));

    setSteps(renumbered);
    setSelectedNodeId(newId);
  };

  // Delete Node
  const handleDeleteNode = (id: string) => {
    const filtered = steps.filter((s) => s.id !== id);
    const renumbered = filtered.map((step, idx) => ({
      ...step,
      stepNumber: String(idx + 1).padStart(2, '0'),
    }));
    setSteps(renumbered);
    if (selectedNodeId === id && renumbered.length > 0) {
      setSelectedNodeId(renumbered[0].id);
    }
  };

  // Duplicate Node
  const handleDuplicateNode = (id: string) => {
    const nodeToDup = steps.find((s) => s.id === id);
    if (!nodeToDup) return;

    const dupIndex = steps.findIndex((s) => s.id === id);
    const newId = `node-${Date.now()}`;
    const dupNode: WorkflowNodeData = {
      ...nodeToDup,
      id: newId,
      name: `${nodeToDup.name} (Copy)`,
    };

    const updated = [...steps];
    updated.splice(dupIndex + 1, 0, dupNode);
    const renumbered = updated.map((step, idx) => ({
      ...step,
      stepNumber: String(idx + 1).padStart(2, '0'),
    }));
    setSteps(renumbered);
    setSelectedNodeId(newId);
  };

  // Save Draft
  const handleSaveDraft = () => {
    setIsDraftSaved(true);
    setTimeout(() => setIsDraftSaved(false), 2000);
  };

  // Trigger Confirmation Modal before running
  const handleInitiateRun = () => {
    if (validationError) return;
    setConfirmModalOpen(true);
  };

  // Execute Simulated Agent Workflow
  const handleConfirmRun = () => {
    setConfirmModalOpen(false);
    setPhase('running');
    setExecutionLogs([
      'Starting Lead Researcher in isolated execution sandbox...',
      'Loaded qualification criteria: 50-500 headcount, B2B SaaS, Series A/B.',
    ]);

    // Reset all nodes to idle
    const resetNodes = steps.map((s) => ({ ...s, status: 'idle' as const }));
    setSteps(resetNodes);

    // Step 0: Trigger
    setActiveStepIndex(0);
    updateNodeStatusByIndex(0, 'working');

    setTimeout(() => {
      updateNodeStatusByIndex(0, 'completed');
      setExecutionLogs((prev) => [...prev, '[INFO] Trigger verified: Manual dispatch acknowledged.']);

      // Step 1: Research
      setActiveStepIndex(1);
      updateNodeStatusByIndex(1, 'working');
      setExecutionLogs((prev) => [...prev, '[EXEC] Querying recent funding databases & PR feeds...']);
    }, 1000);

    setTimeout(() => {
      updateNodeStatusByIndex(1, 'completed');
      setExecutionLogs((prev) => [...prev, '[DONE] 38 recently funded SaaS companies identified.']);

      // Step 2: Analyze
      setActiveStepIndex(2);
      updateNodeStatusByIndex(2, 'working');
      setExecutionLogs((prev) => [...prev, '[EXEC] Analyzing company business models & revenue indicators...']);
    }, 2500);

    setTimeout(() => {
      updateNodeStatusByIndex(2, 'completed');
      setExecutionLogs((prev) => [...prev, '[DONE] 38 company profiles parsed and structured.']);

      // Step 3: Qualify
      setActiveStepIndex(3);
      updateNodeStatusByIndex(3, 'working');
      setExecutionLogs((prev) => [...prev, '[EXEC] Filtering against enterprise ICP threshold (85%)...']);
    }, 4000);

    setTimeout(() => {
      updateNodeStatusByIndex(3, 'completed');
      setExecutionLogs((prev) => [...prev, '[DONE] 18 high-confidence qualified accounts confirmed.']);

      // Step 4: Enrich
      setActiveStepIndex(4);
      updateNodeStatusByIndex(4, 'working');
      setExecutionLogs((prev) => [...prev, '[EXEC] Resolving decision makers (VP Sales, CRO, Head of Growth)...']);
    }, 5500);

    setTimeout(() => {
      updateNodeStatusByIndex(4, 'completed');
      setExecutionLogs((prev) => [...prev, '[DONE] 27 executive contacts enriched with verified work emails.']);

      // Step 5: Approval
      setActiveStepIndex(5);
      updateNodeStatusByIndex(5, 'working');
      setExecutionLogs((prev) => [...prev, '[GATE] Human approval required before writing to HubSpot.']);

      // TRANSITION TO WAITING APPROVAL
      setPhase('waiting_approval');
    }, 7000);
  };

  // Helper to update node status by index
  const updateNodeStatusByIndex = (index: number, status: WorkflowNodeData['status']) => {
    setSteps((prev) =>
      prev.map((node, idx) => (idx === index ? { ...node, status } : node))
    );
  };

  // Approval Handlers
  const handleApprove = () => {
    setPhase('running');
    setExecutionLogs((prev) => [...prev, '[AUTH] Human approval granted by James.']);
    updateNodeStatusByIndex(5, 'completed');

    // Step 6: Action (HubSpot)
    setActiveStepIndex(6);
    updateNodeStatusByIndex(6, 'working');
    setExecutionLogs((prev) => [...prev, '[SYNC] Synchronizing 18 verified contacts to HubSpot CRM...']);

    setTimeout(() => {
      updateNodeStatusByIndex(6, 'completed');
      setExecutionLogs((prev) => [
        ...prev,
        '[DONE] 18 contacts created in HubSpot under "Nima Verified Leads".',
        '[DONE] Agent run completed successfully in 7m 12s.',
      ]);
      setPhase('completed');
    }, 1800);
  };

  const handleReject = () => {
    setPhase('canvas');
    updateNodeStatusByIndex(5, 'error');
    setExecutionLogs((prev) => [...prev, '× Run halted by user at Approval checkpoint.']);
  };

  const handleReset = () => {
    setPhase('canvas');
    setSteps(initialWorkflowSteps);
    setSelectedNodeId('node-research');
    setExecutionLogs([]);
    setActiveStepIndex(-1);
  };

  const selectedNode = steps.find((s) => s.id === selectedNodeId) || null;
  const isExecuting = phase === 'running' || phase === 'waiting_approval';

  return (
    <div className="flex flex-col min-h-screen bg-[#08090C] text-[#F5F5F7]">
      {/* Topbar */}
      {phase !== 'goal_input' && (
        <BuilderTopbar
          agentName={agentName}
          agentType={agentType}
          phase={phase}
          onOpenSettings={() => setSettingsModalOpen(true)}
          onRunAgent={handleInitiateRun}
          onSaveDraft={handleSaveDraft}
          isDraftSaved={isDraftSaved}
          validationError={validationError}
        />
      )}

      {/* Main Workspace Body */}
      {phase === 'goal_input' || phase === 'generating' ? (
        <GoalInputSection
          goal={goal}
          setGoal={setGoal}
          onBuild={handleStartGeneration}
          isGenerating={phase === 'generating'}
          generatingStep={generatingStep}
        />
      ) : (
        <div className="flex-1 flex flex-col md:flex-row min-w-0 overflow-hidden relative">
          {/* Main Workflow Canvas Area */}
          <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
            {/* Live Telemetry / Execution Strip during run */}
            {isExecuting && (
              <div className="p-4 sm:px-8 border-b border-[#242832] bg-[#0E1015]">
                <div className="w-full max-w-lg mx-auto space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#FF6B35] animate-ping" />
                      <span className="font-semibold text-[#F5F5F7] font-mono uppercase tracking-wider">
                        Autonomous Execution Active
                      </span>
                    </div>
                    <span className="font-mono text-[#8B93A1] text-[11px]">
                      {executionLogs[executionLogs.length - 1]}
                    </span>
                  </div>

                  <div className="h-1.5 w-full bg-[#171A21] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#FF6B35] to-[#32D583] transition-all duration-300"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.max(10, ((activeStepIndex + 1) / steps.length) * 100)
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Human Approval Card when paused */}
            {phase === 'waiting_approval' && (
              <div className="px-4 sm:px-8">
                <ApprovalCard
                  agentName={agentName}
                  destination="HubSpot"
                  candidates={mockCandidateProspects}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  onEdit={() => setSelectedNodeId('node-approval')}
                />
              </div>
            )}

            {/* Results Preview Card when completed */}
            {phase === 'completed' && (
              <div className="px-4 sm:px-8">
                <ResultsSummaryCard
                  agentName={agentName}
                  destination="HubSpot"
                  onReset={handleReset}
                />
              </div>
            )}

            {/* Interactive Workflow Canvas */}
            <WorkflowCanvas
              steps={steps}
              selectedNodeId={selectedNodeId}
              onSelectNode={handleSelectNode}
              onAddStep={handleAddStep}
              onDeleteNode={handleDeleteNode}
              onDuplicateNode={handleDuplicateNode}
              isExecuting={isExecuting}
            />
          </div>

          {/* Right Configuration Panel (Desktop or drawer) */}
          <div className="hidden md:block">
            <StepConfigPanel
              node={selectedNode}
              onUpdateConfig={handleUpdateNodeConfig}
            />
          </div>

          {/* Mobile Drawer for Configuration */}
          {mobileConfigOpen && (
            <div className="fixed inset-0 z-50 md:hidden flex justify-end">
              <div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                onClick={() => setMobileConfigOpen(false)}
              />
              <div className="relative w-full max-w-sm bg-[#0B0D12] h-full shadow-2xl z-10 flex flex-col">
                <StepConfigPanel
                  node={selectedNode}
                  onClose={() => setMobileConfigOpen(false)}
                  onUpdateConfig={handleUpdateNodeConfig}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Confirmation Modal before Run Agent */}
      <Modal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        title="Ready to run"
        description={`${agentName} is configured and ready for autonomous dispatch.`}
      >
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#0E1015] border border-[#242832] space-y-2 text-xs">
            <span className="font-semibold text-[#F5F5F7] block">
              Configured autonomous sequence:
            </span>
            <ul className="space-y-1 text-[#8B93A1]">
              <li className="flex items-center gap-2">
                <span className="text-[#32D583]">✓</span> Research SaaS companies
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#32D583]">✓</span> Qualify prospects against ICP
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#32D583]">✓</span> Enrich decision makers
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#F5B544]">✓</span> Request human approval
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#FF6B35]">✓</span> Add approved contacts to HubSpot
              </li>
            </ul>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#242832]">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setConfirmModalOpen(false)}
            >
              Back to editing
            </Button>
            <Button size="sm" onClick={handleConfirmRun}>
              <Play className="w-3.5 h-3.5 mr-1.5 fill-current" />
              <span>Run agent</span>
            </Button>
          </div>
        </div>
      </Modal>

      {/* Agent Settings Modal */}
      <AgentSettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        name={agentName}
        setName={setAgentName}
        description={agentDescription}
        setDescription={setAgentDescription}
        type={agentType}
        setType={setAgentType}
        executionMode={executionMode}
        setExecutionMode={setExecutionMode}
        humanApproval={humanApproval}
        setHumanApproval={setHumanApproval}
        onSave={handleSaveDraft}
      />
    </div>
  );
};
