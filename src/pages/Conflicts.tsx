import { useState } from "react";
import { SeverityBadge } from "../components/Badge";
import StatCard from "../components/StatCard";
import { useApp } from "../context/AppContext";
import type { Conflict, ConflictType } from "../types";
import { blockName } from "../utils/search";

const SEVERITIES = [
  { key: "all", label: "전체" },
  { key: "high", label: "심각" },
  { key: "medium", label: "보통" },
  { key: "low", label: "가벼움" },
] as const;

const CONFLICT_TYPES: (ConflictType | "all")[] = [
  "all",
  "인물 상태 오류",
  "숫자/시간 오류",
  "가족 관계 오류",
  "세계관 규칙 위반",
  "사건 순서 오류",
  "관계 충돌",
];

function ConflictCard({ conflict }: { conflict: Conflict }) {
  const { state, setConflictStatus, openBlockDetail } = useApp();
  const [showGuide, setShowGuide] = useState(false);
  const resolvedStyle = conflict.status !== "open" ? "opacity-60" : "";

  return (
    <article className={`card p-6 ${resolvedStyle}`}>
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <SeverityBadge severity={conflict.severity} />
        <span className="chip border border-paper-300 bg-paper-100 text-stone-600">
          {conflict.type}
        </span>
        <span className="chip border border-paper-300 text-stone-500">
          📍 {conflict.location.episode}
        </span>
        {conflict.status === "resolved" && (
          <span className="chip bg-emerald-100 text-emerald-800">✓ 해결했어요</span>
        )}
        {conflict.status === "ignored" && (
          <span className="chip bg-stone-200 text-stone-600">넘어가기로 함</span>
        )}
      </div>

      <h3 className="text-lg font-bold text-stone-800">{conflict.title}</h3>
      <p className="mt-1 text-base leading-relaxed text-stone-500">{conflict.description}</p>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <blockquote className="rounded-xl border-l-4 border-violet-400 bg-paper-100 p-3 text-base italic leading-relaxed text-stone-600">
          <div className="mb-1 text-sm font-bold not-italic text-violet-700">원고 속 문장 A</div>
          {conflict.evidenceA}
        </blockquote>
        <blockquote className="rounded-xl border-l-4 border-red-400 bg-paper-100 p-3 text-base italic leading-relaxed text-stone-600">
          <div className="mb-1 text-sm font-bold not-italic text-red-600">원고 속 문장 B</div>
          {conflict.evidenceB}
        </blockquote>
      </div>

      <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3">
        <div className="mb-1 flex items-center gap-1.5 text-sm font-bold text-emerald-700">
          🤖 AI가 추천하는 고치는 방법
        </div>
        <p className="text-base leading-relaxed text-emerald-900">{conflict.recommendation}</p>
      </div>

      {conflict.relatedBlockIds.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="text-sm font-bold text-stone-500">관련 설정 카드</span>
          {conflict.relatedBlockIds.map((id) => (
            <button
              key={id}
              className="chip cursor-pointer border border-paper-300 bg-paper-100 text-stone-600 hover:bg-paper-200"
              onClick={() => openBlockDetail(id)}
            >
              {blockName(state, id)}
            </button>
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {conflict.status === "open" ? (
          <>
            <button className="btn-green" onClick={() => setConflictStatus(conflict.id, "resolved")}>
              ✓ 해결했어요
            </button>
            <button className="btn-ghost" onClick={() => setConflictStatus(conflict.id, "ignored")}>
              이건 넘어가기
            </button>
          </>
        ) : (
          <button className="btn-ghost" onClick={() => setConflictStatus(conflict.id, "open")}>
            ↺ 다시 확인하기
          </button>
        )}
        <button className="btn-ghost" onClick={() => setShowGuide((s) => !s)}>
          🛠️ 자세한 수정 방법
        </button>
      </div>

      {showGuide && (
        <div className="fade-up mt-3 rounded-xl border border-amber-300 bg-amber-50 p-3">
          <div className="mb-1.5 text-sm font-bold text-amber-800">이렇게 고칠 수 있어요</div>
          <ol className="list-inside list-decimal space-y-1 text-base leading-relaxed text-stone-700">
            {conflict.fixGuide.map((g, i) => (
              <li key={i}>{g}</li>
            ))}
          </ol>
        </div>
      )}
    </article>
  );
}

export default function Conflicts() {
  const { state } = useApp();
  const [severity, setSeverity] = useState<(typeof SEVERITIES)[number]["key"]>("all");
  const [ctype, setCtype] = useState<ConflictType | "all">("all");

  const filtered = state.conflicts.filter(
    (c) =>
      (severity === "all" || c.severity === severity) &&
      (ctype === "all" || c.type === ctype)
  );
  const open = filtered.filter((c) => c.status === "open");
  const closed = filtered.filter((c) => c.status !== "open");
  const all = state.conflicts;

  return (
    <div className="fade-up space-y-5">
      <div>
        <h2 className="text-2xl font-extrabold text-stone-800">설정 오류 검사</h2>
        <p className="text-base text-stone-500">
          AI가 원고를 비교해 서로 어긋나는 설정을 찾아냈어요. 하나씩 확인하고 해결해 보세요.
        </p>
      </div>

      {/* 요약 카드 */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="찾아낸 오류 전체" value={all.length} icon="🚨" />
        <StatCard
          label="아직 해결 전"
          value={all.filter((c) => c.status === "open").length}
          icon="🔥"
          accent="text-red-600"
        />
        <StatCard
          label="해결함"
          value={all.filter((c) => c.status === "resolved").length}
          icon="✅"
          accent="text-emerald-700"
        />
        <StatCard
          label="넘어가기로 함"
          value={all.filter((c) => c.status === "ignored").length}
          icon="🙈"
          accent="text-stone-600"
        />
      </div>

      {/* 필터 */}
      <div className="card space-y-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm font-bold text-stone-500">심각한 정도</span>
          {SEVERITIES.map((s) => (
            <button
              key={s.key}
              onClick={() => setSeverity(s.key)}
              className={`chip cursor-pointer transition ${
                severity === s.key
                  ? "bg-amber-600 text-white"
                  : "border border-paper-300 bg-white text-stone-600 hover:bg-paper-100"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm font-bold text-stone-500">오류 종류</span>
          {CONFLICT_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setCtype(t)}
              className={`chip cursor-pointer transition ${
                ctype === t
                  ? "bg-emerald-600 text-white"
                  : "border border-paper-300 bg-white text-stone-500 hover:bg-paper-100"
              }`}
            >
              {t === "all" ? "전체" : t}
            </button>
          ))}
        </div>
      </div>

      {/* 미해결 */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-red-600">아직 해결 전 ({open.length})</h3>
        {open.map((c) => (
          <ConflictCard key={c.id} conflict={c} />
        ))}
        {open.length === 0 && (
          <div className="card p-6 text-center text-base text-emerald-700">
            해결할 설정 오류가 없습니다. 설정이 잘 지켜지고 있어요. ✨
          </div>
        )}
      </section>

      {/* 처리됨 */}
      {closed.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-lg font-bold text-stone-500">처리한 오류 ({closed.length})</h3>
          {closed.map((c) => (
            <ConflictCard key={c.id} conflict={c} />
          ))}
        </section>
      )}
    </div>
  );
}
