import { useMemo, useState } from "react";
import { BLOCK_TYPE_META } from "../components/meta";
import { useApp } from "../context/AppContext";
import { RELATION_TYPES } from "../data/mockData";
import { relationSentence } from "../utils/korean";
import { relationLabel, relationNatural } from "../utils/search";

export default function RelationBuilder() {
  const { state, addRelation, deleteRelation } = useApp();
  const [sourceId, setSourceId] = useState("");
  const [relType, setRelType] = useState("가족");
  const [customType, setCustomType] = useState("");
  const [targetId, setTargetId] = useState("");
  const [search, setSearch] = useState("");
  const [added, setAdded] = useState(false);

  const effectiveType = customType.trim() || relType;
  const source = state.blocks.find((b) => b.id === sourceId);
  const target = state.blocks.find((b) => b.id === targetId);

  const preview =
    source && target
      ? relationSentence(source.name, effectiveType, target.name)
      : "누가, 어떤 관계로, 누구와 이어지는지 고르면 문장으로 미리 보여드려요.";

  const filteredRelations = useMemo(() => {
    const q = search.trim();
    return state.relations.filter((r) => {
      if (!q) return true;
      return (
        relationLabel(state, r).includes(q) || relationNatural(state, r).includes(q)
      );
    });
  }, [state, search]);

  const submit = () => {
    if (!sourceId || !targetId || !effectiveType) return;
    addRelation({
      sourceId,
      targetId,
      type: effectiveType,
      origin: "manual",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const blockOption = (b: (typeof state.blocks)[number]) =>
    `${BLOCK_TYPE_META[b.type].icon} ${b.name}`;

  return (
    <div className="fade-up space-y-5">
      <div>
        <h2 className="text-2xl font-extrabold text-stone-800">관계 만들기</h2>
        <p className="text-base text-stone-500">
          [누가] + [어떤 관계] + [누구와] 순서로 고르면 설정 관계가 만들어지고, 설정
          지도에 바로 표시됩니다.
        </p>
      </div>

      {/* 관계 만들기 */}
      <section className="card p-6">
        <div className="grid gap-3 lg:grid-cols-[1fr_1fr_1fr_auto]">
          <div className="rounded-2xl border-2 border-violet-300 bg-violet-50 p-4">
            <label className="label text-violet-700">① 누가</label>
            <select
              className="input"
              value={sourceId}
              onChange={(e) => setSourceId(e.target.value)}
            >
              <option value="">골라 주세요…</option>
              {state.blocks.map((b) => (
                <option key={b.id} value={b.id}>
                  {blockOption(b)}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-4">
            <label className="label text-emerald-700">② 어떤 관계</label>
            <select
              className="input mb-2"
              value={relType}
              onChange={(e) => {
                setRelType(e.target.value);
                setCustomType("");
              }}
            >
              {RELATION_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <input
              className="input"
              placeholder="직접 쓰기 (예: 이웃)"
              value={customType}
              onChange={(e) => setCustomType(e.target.value)}
            />
          </div>

          <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-4">
            <label className="label text-amber-700">③ 누구와</label>
            <select
              className="input"
              value={targetId}
              onChange={(e) => setTargetId(e.target.value)}
            >
              <option value="">골라 주세요…</option>
              {state.blocks
                .filter((b) => b.id !== sourceId)
                .map((b) => (
                  <option key={b.id} value={b.id}>
                    {blockOption(b)}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex items-center">
            <button
              className="btn-primary h-14 w-full px-6 lg:w-auto"
              onClick={submit}
              disabled={!sourceId || !targetId}
            >
              {added ? "✓ 추가됐어요!" : "+ 관계 추가"}
            </button>
          </div>
        </div>

        {/* 문장 미리보기 */}
        <div className="mt-4 rounded-xl border border-paper-300 bg-paper-100 p-4">
          <span className="mr-2 text-sm font-bold text-stone-500">미리보기</span>
          <span className={`text-lg ${source && target ? "text-stone-800" : "text-stone-400"}`}>
            {preview}
          </span>
        </div>
      </section>

      {/* 관계 목록 */}
      <section className="card p-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-lg font-bold text-stone-800">
            만들어진 관계 ({state.relations.length})
          </h3>
          <input
            className="input w-full sm:w-64"
            placeholder="관계 찾기…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <ul className="grid gap-2 md:grid-cols-2">
          {filteredRelations.map((r) => (
            <li
              key={r.id}
              className="group flex items-center justify-between gap-2 rounded-xl border border-paper-300 bg-paper-100 px-4 py-3"
            >
              <div className="min-w-0">
                <div className="truncate text-base font-semibold text-stone-700">
                  {relationLabel(state, r)}
                </div>
                <div className="truncate text-sm text-stone-500">
                  {relationNatural(state, r)}
                </div>
              </div>
              <button
                className="shrink-0 rounded-md p-1.5 text-stone-400 opacity-0 transition hover:bg-red-100 hover:text-red-600 group-hover:opacity-100"
                onClick={() => deleteRelation(r.id)}
                title="관계 삭제"
              >
                🗑️
              </button>
            </li>
          ))}
          {filteredRelations.length === 0 && (
            <li className="text-base text-stone-500">찾은 관계가 없습니다.</li>
          )}
        </ul>
      </section>
    </div>
  );
}
