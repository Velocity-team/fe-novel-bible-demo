import type { AppState } from "../types";
import { buildEmptyState } from "../data/mockData";

const STATE_KEY = "loreblock_state_v2";
// v3: force 레이아웃 도입으로 기존 정렬형 배치 저장본을 버린다
export const GRAPH_POS_KEY = "loreblock_graph_positions_v3";

/** 첫 방문이면 빈 상태(온보딩 전), 이후에는 저장본을 사용한다. */
export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<AppState>;
      // 과거 버전 저장본과의 누락 필드 병합
      return { ...buildEmptyState(), ...parsed } as AppState;
    }
  } catch {
    // 손상된 저장본은 무시하고 초기화
  }
  const initial = buildEmptyState();
  saveState(initial);
  return initial;
}

export function saveState(state: AppState) {
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
}

export function resetState(): AppState {
  localStorage.removeItem(STATE_KEY);
  localStorage.removeItem(GRAPH_POS_KEY);
  const initial = buildEmptyState();
  saveState(initial);
  return initial;
}

export type NodePositions = Record<string, { x: number; y: number }>;

export function loadGraphPositions(): NodePositions {
  try {
    const raw = localStorage.getItem(GRAPH_POS_KEY);
    if (raw) return JSON.parse(raw) as NodePositions;
  } catch {
    /* ignore */
  }
  return {};
}

export function saveGraphPositions(pos: NodePositions) {
  localStorage.setItem(GRAPH_POS_KEY, JSON.stringify(pos));
}

export function downloadJSON(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function uid(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 7)}`;
}
