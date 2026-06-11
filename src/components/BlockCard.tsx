import type { WorldBlock } from "../types";
import { AIStatusBadge, Tag, TypeBadge } from "./Badge";

export default function BlockCard({
  block,
  selected,
  onClick,
}: {
  block: WorldBlock;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`card w-full p-5 text-left transition hover:-translate-y-0.5 hover:shadow-card-hover ${
        selected ? "border-amber-500 ring-2 ring-amber-200" : ""
      }`}
    >
      <div className="mb-2 flex flex-wrap items-center gap-1.5">
        <TypeBadge type={block.type} />
        <AIStatusBadge status={block.aiStatus} />
        {block.firstAppearance && (
          <span className="chip border border-paper-300 text-stone-500">
            첫 등장 {block.firstAppearance}
          </span>
        )}
      </div>
      <div className="mb-1 text-lg font-bold text-stone-800">{block.name}</div>
      <p className="mb-2 line-clamp-2 text-base leading-relaxed text-stone-500">
        {block.description}
      </p>
      <div className="flex flex-wrap gap-1">
        {block.tags.slice(0, 4).map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
    </button>
  );
}
