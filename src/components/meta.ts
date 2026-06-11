import type { AIStatus, BlockType } from "../types";

export const BLOCK_TYPE_META: Record<
  BlockType,
  { label: string; icon: string; color: string; chip: string; node: string }
> = {
  character: {
    label: "인물",
    icon: "👤",
    color: "#7c3aed",
    chip: "bg-violet-100 text-violet-800",
    node: "#8b5cf6",
  },
  location: {
    label: "장소",
    icon: "🏡",
    color: "#0d9488",
    chip: "bg-teal-100 text-teal-800",
    node: "#14b8a6",
  },
  event: {
    label: "사건",
    icon: "⚡",
    color: "#b45309",
    chip: "bg-amber-100 text-amber-800",
    node: "#f59e0b",
  },
  organization: {
    label: "무리",
    icon: "👨‍👩‍👧‍👦",
    color: "#2563eb",
    chip: "bg-blue-100 text-blue-800",
    node: "#3b82f6",
  },
  rule: {
    label: "규칙",
    icon: "📜",
    color: "#db2777",
    chip: "bg-pink-100 text-pink-800",
    node: "#ec4899",
  },
  item: {
    label: "물건",
    icon: "🎁",
    color: "#ca8a04",
    chip: "bg-yellow-100 text-yellow-800",
    node: "#eab308",
  },
};

export const AI_STATUS_META: Record<
  AIStatus,
  { label: string; chip: string; icon: string }
> = {
  Learned: { label: "원고에서 학습함", chip: "bg-emerald-100 text-emerald-800", icon: "🧠" },
  "Manually Added": { label: "직접 입력함", chip: "bg-stone-200 text-stone-700", icon: "✍️" },
  "Imported from Excel": { label: "설정표에서 가져옴", chip: "bg-teal-100 text-teal-800", icon: "📊" },
  "Needs Review": { label: "확인 필요", chip: "bg-amber-100 text-amber-800", icon: "👁️" },
  "Conflict Risk": { label: "오류 위험", chip: "bg-red-100 text-red-700", icon: "⚠️" },
};

export const SEVERITY_META = {
  high: { label: "심각", chip: "bg-red-100 text-red-700 border border-red-200" },
  medium: { label: "보통", chip: "bg-amber-100 text-amber-800 border border-amber-200" },
  low: { label: "가벼움", chip: "bg-blue-100 text-blue-800 border border-blue-200" },
} as const;
