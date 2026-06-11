export type BlockType =
  | "character"
  | "location"
  | "event"
  | "organization"
  | "rule"
  | "item";

/** 설정 카드가 어떻게 만들어졌는지 표시하는 상태 */
export type AIStatus =
  | "Learned"
  | "Manually Added"
  | "Imported from Excel"
  | "Needs Review"
  | "Conflict Risk";

export interface WorldBlock {
  id: string;
  name: string;
  type: BlockType;
  description: string;
  episode?: string;
  firstAppearance?: string;
  attributes: Record<string, string>;
  tags: string[];
  aiStatus: AIStatus;
  sourceEvidence: string[];
  canonNotes: string;
  createdAt: string;
  updatedAt: string;
}

export interface Relation {
  id: string;
  sourceId: string;
  targetId: string;
  /** targetId가 빈 문자열일 때 자유 텍스트 대상(예: "가을에 다 익은 박") */
  targetLabel?: string;
  type: string;
  /** "event"면 두 인물을 잇는 사건 연결선 (설정 지도에서 선 위에 사건 이름 표시) */
  kind?: "event";
  /** kind가 "event"일 때 해당 사건 설정 카드 id */
  eventId?: string;
  evidence?: string;
  episode?: string;
  origin?: "mock" | "manual" | "excel" | "analysis";
  createdAt: string;
}

export type ConflictType =
  | "인물 상태 오류"
  | "숫자/시간 오류"
  | "가족 관계 오류"
  | "세계관 규칙 위반"
  | "사건 순서 오류"
  | "관계 충돌";

export interface Conflict {
  id: string;
  title: string;
  type: ConflictType;
  severity: "high" | "medium" | "low";
  description: string;
  evidenceA: string;
  evidenceB: string;
  recommendation: string;
  relatedBlockIds: string[];
  status: "open" | "resolved" | "ignored";
  location: { episode: string; sentence: string };
  fixGuide: string[];
}

export interface Episode {
  id: string;
  title: string;
  number: number;
  summary: string;
  wordCount: number;
}

export interface Project {
  id: string;
  title: string;
  genre: string;
  logline: string;
  summary: string;
  episodes: Episode[];
  canonRules: string[];
  generationConstraints: string[];
  forbiddenSettings: string[];
}

export interface MemorySource {
  id: string;
  title: string;
  sourceType: "manuscript" | "excel" | "manual" | "generated";
  learnedItems: number;
  status: "synced" | "needs_review" | "failed";
  updatedAt: string;
}

export interface Scenario {
  id: string;
  title: string;
  purpose: string;
  mainCharacterId: string;
  relatedEventId?: string;
  tone: string;
  length: string;
  includedBlockIds: string[];
  excludedBlockIds: string[];
  outline: string;
  scenes: string[];
  usedSettings: string[];
  conflictCheck: string[];
  authorNote: string;
  createdAt: string;
}

export interface Draft {
  id: string;
  episodeTitle: string;
  sceneTitle: string;
  content: string;
  detectedBlockIds: string[];
  warnings: string[];
  updatedAt: string;
}

export interface ProjectNote {
  id: string;
  title: string;
  content: string;
  relatedBlockIds: string[];
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "ai";
  text: string;
  relatedBlockIds: string[];
  relatedRelationIds: string[];
  relatedConflictIds: string[];
  createdAt: string;
}

export interface AppState {
  /** 처음 사용 안내(온보딩)를 끝냈는지 여부 */
  onboarded: boolean;
  project: Project;
  blocks: WorldBlock[];
  relations: Relation[];
  conflicts: Conflict[];
  drafts: Draft[];
  scenarios: Scenario[];
  notes: ProjectNote[];
  memorySources: MemorySource[];
  chatHistory: ChatMessage[];
  checkedSuggestions: string[];
  canonScore: number;
  lastTrainedAt: string;
}

export type PageKey =
  | "dashboard"
  | "writing"
  | "import"
  | "memory"
  | "blocks"
  | "relations"
  | "scenario"
  | "ask"
  | "conflicts"
  | "settings"
  | "about";
