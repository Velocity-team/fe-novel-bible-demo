import type { AIStatus, BlockType } from "../types";
import { AI_STATUS_META, BLOCK_TYPE_META, SEVERITY_META } from "./meta";

export function TypeBadge({ type }: { type: BlockType }) {
  const m = BLOCK_TYPE_META[type];
  return (
    <span className={`chip ${m.chip}`}>
      <span>{m.icon}</span>
      {m.label}
    </span>
  );
}

export function AIStatusBadge({ status }: { status: AIStatus }) {
  const m = AI_STATUS_META[status];
  return (
    <span className={`chip ${m.chip}`}>
      <span>{m.icon}</span>
      {m.label}
    </span>
  );
}

export function SeverityBadge({ severity }: { severity: "high" | "medium" | "low" }) {
  const m = SEVERITY_META[severity];
  return <span className={`chip ${m.chip}`}>{m.label}</span>;
}

export function Tag({ children }: { children: string }) {
  return (
    <span className="chip border border-paper-300 bg-paper-100 text-stone-600">
      #{children}
    </span>
  );
}
