export type AgentStatusType = 'running' | 'idle' | 'paused' | 'thinking' | 'failed';

export interface Agent {
  id: string;
  name: string;
  category: string;
  status: AgentStatusType;
  taskCount: number;
  successRate: number;
  lastActive: string;
  description: string;
  tools: string[];
  model: string;
  avgDuration: string;
  schedule?: string;
  recentOutput?: string;
}

export type TaskStatusType = 'completed' | 'running' | 'failed' | 'queued';

export interface TaskStep {
  name: string;
  status: 'completed' | 'running' | 'pending' | 'failed';
  time: string;
  detail?: string;
}

export interface Task {
  id: string;
  title: string;
  agentId: string;
  agentName: string;
  agentCategory: string;
  status: TaskStatusType;
  startedAt: string;
  duration: string;
  result: string;
  steps: TaskStep[];
  outputSummary: string;
  affectedItems?: number;
}

export type ActivityType = 'task_completed' | 'escalation' | 'analysis' | 'task_started' | 'sync' | 'warning';

export interface ActivityItem {
  id: string;
  time: string;
  dateGroup: 'Today' | 'Yesterday' | 'Earlier';
  agentName: string;
  agentCategory: string;
  action: string;
  type: ActivityType;
  status: 'completed' | 'warning' | 'running' | 'failed';
  details?: string;
}

export interface InsightStat {
  label: string;
  value: number;
  percentage: number;
  note?: string;
}

export type InsightCategoryType = 'Performance' | 'Business' | 'Agents' | 'Conversion' | 'Anomaly' | 'Efficiency' | 'Workflow';

export interface InsightItem {
  id: string;
  title: string;
  category: InsightCategoryType;
  headline: string;
  description: string;
  impactBadge: string;
  stats?: InsightStat[];
  trend?: string;
  recommendation?: string;
  sources?: string;
  confidenceScore?: number;
  timeframe?: string;
  whatObserved?: string;
  dataAnalyzed?: string;
  whyItMatters?: string;
  relatedTaskIds?: string[];
  relatedAgentNames?: string[];
}

export type KnowledgeCategoryType =
  | 'Documents'
  | 'Websites'
  | 'Guidelines'
  | 'Data'
  | 'Instructions'
  | 'Examples';

export interface KnowledgeSection {
  title: string;
  content: string;
}

export interface KnowledgeResource {
  id: string;
  name: string;
  type: string;
  category?: KnowledgeCategoryType;
  createdDate?: string;
  updatedDate: string;
  usedByAgents: string[];
  status: 'Synced' | 'Indexing' | 'Up to date' | 'Active';
  size: string;
  description: string;
  itemsCount: number;
  sections?: KnowledgeSection[];
  tags?: string[];
}

export interface Integration {
  id: string;
  name: string;
  category: 'CRM' | 'Communication' | 'Productivity' | 'Payments';
  description: string;
  status: 'connected' | 'disconnected';
  lastSync: string;
  activeAgents: number;
  authMethod: string;
  syncFrequency: string;
}

export interface MetricCardData {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'neutral' | 'negative';
  period: string;
  iconName: string;
}

export type WorkflowStepType =
  | 'trigger'
  | 'research'
  | 'analyze'
  | 'qualify'
  | 'enrich'
  | 'generate'
  | 'send'
  | 'update'
  | 'wait'
  | 'approval'
  | 'action';

export type NodeStatusType = 'idle' | 'working' | 'completed' | 'error' | 'ready';

export interface WorkflowNodeConfig {
  // Research config
  researchObjective?: string;
  sources?: string[];
  maxResults?: number;
  depth?: 'Quick' | 'Standard' | 'Deep';

  // Qualify config
  companySize?: string;
  industry?: string;
  funding?: string;
  location?: string[];
  confidenceThreshold?: number;

  // Enrich config
  fieldsToFind?: string[];
  maxContacts?: number;

  // Approval config
  requireApprovalBefore?: {
    updatingCrm: boolean;
    sendingMessages: boolean;
    creatingRecords: boolean;
    internalAnalysis: boolean;
  };

  // Action config
  destination?: string;
  action?: string;
  mappedFields?: string[];

  // General/Trigger config
  triggerType?: 'manual' | 'scheduled' | 'event';
  scheduleDetails?: string;
}

export interface WorkflowNodeData {
  id: string;
  stepNumber: string;
  type: WorkflowStepType;
  name: string;
  description: string;
  status: NodeStatusType;
  config: WorkflowNodeConfig;
}

export interface ProspectCandidate {
  id: string;
  company: string;
  contact: string;
  role: string;
  score: number;
  reason: string;
  confidence: 'high' | 'medium';
}

export type BuilderPhase =
  | 'goal_input'
  | 'generating'
  | 'canvas'
  | 'confirm_run'
  | 'running'
  | 'waiting_approval'
  | 'completed';

// Phase 3 Observability & Execution types

export interface AgentRunRecord {
  id: string;
  taskId: string;
  taskTitle: string;
  date: string;
  dateGroup: 'Today' | 'Yesterday' | 'Earlier';
  status: 'completed' | 'failed' | 'paused' | 'running';
  duration: string;
  resultSummary: string;
  prospectsFound?: number;
  prospectsQualified?: number;
}

export interface TimelineEventDetail {
  discoveredCount?: number;
  matchedFunding?: number;
  matchedSize?: number;
  failedQualification?: number;
  sources?: string[];
  contactsFound?: number;
  notes?: string[];
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  title: string;
  status: 'completed' | 'working' | 'pending' | 'failed';
  description?: string;
  details?: TimelineEventDetail;
  actionRequired?: boolean;
}

export interface ProspectDetail {
  id: string;
  company: string;
  contact: string;
  role: string;
  location: string;
  score: number;
  status: 'Qualified' | 'Review' | 'Rejected';
  companySize: string;
  funding: string;
  signals: string[];
  linkedinUrl?: string;
  email?: string;
  website?: string;
  addedToCrm?: boolean;
}

export interface ApprovalHistoryItem {
  id: string;
  taskId: string;
  title: string;
  reason: string;
  requestedAt: string;
  decidedAt?: string;
  deciderName: string;
  decision: 'Approved' | 'Rejected' | 'Pending';
  outcomeSummary: string;
}

export interface AgentPerformanceDataPoint {
  date: string;
  tasksCompleted: number;
  successRate: number;
  avgDurationMinutes: number;
}

// Phase 4 Intelligence Layer types

export interface AgentMemoryItem {
  id: string;
  agentId: string;
  title: string;
  updatedAt: string;
  category: 'ICP' | 'Qualification' | 'Markets' | 'Terminology' | 'Preferences' | 'Workflows';
  content: string;
}

export interface AgentLearningItem {
  id: string;
  agentId: string;
  observation: string;
  criteria: string[];
  source: string;
  confidence: 'High' | 'Medium';
  confidencePercentage: number;
  sampleCount: number;
  updatedAt: string;
}

export interface ExecutionQualityBreakdown {
  successful: number;
  needsReview: number;
  failed: number;
  commonIssues: {
    id: string;
    label: string;
    count: number;
    severity: 'low' | 'medium' | 'high';
  }[];
}

export interface RecommendationItem {
  id: string;
  insightId?: string;
  agentId: string;
  agentName: string;
  title: string;
  description: string;
  field: string;
  currentValue: string;
  recommendedValue: string;
  status: 'active' | 'applied' | 'dismissed';
  appliedAt?: string;
  impactSummary: string;
  type: 'criteria_update' | 'knowledge_attachment' | 'schedule_optimization';
}

export interface AgentTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  exampleWorkflow: string[];
  requiredIntegrations: string[];
  recommendedKnowledge: string[];
  preconfiguredGoal: string;
  model: string;
}

export interface AppNotification {
  id: string;
  title: string;
  time: string;
  type: 'success' | 'warning' | 'info' | 'error';
  desc: string;
  read: boolean;
  link?: string;
}

