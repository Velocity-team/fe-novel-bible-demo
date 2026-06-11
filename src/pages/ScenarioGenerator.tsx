import { useState } from "react";
import { useApp } from "../context/AppContext";
import type { Scenario } from "../types";
import {
  simulateScenarioGeneration,
  type GeneratedScenario,
} from "../utils/aiSim";

const PURPOSES = [
  "인물의 과거 이야기",
  "미회수 떡밥 회수",
  "세계관 규칙 보여주기",
  "다음 큰 사건 준비",
  "조연 이야기 늘리기",
  "악역의 속마음 보여주기",
];

const TONES = ["따뜻한", "우스운", "긴장감 있는", "교훈이 또렷한", "슬픈"];
const LENGTHS = ["짧게", "보통", "자세히"];

export default function ScenarioGenerator() {
  const { state, addScenario, addEpisode, addNote, addMemorySource, navigate } = useApp();
  const characters = state.blocks.filter((b) => b.type === "character");
  const events = state.blocks.filter((b) => b.type === "event");

  const [purpose, setPurpose] = useState(PURPOSES[0]);
  const [mainCharacterId, setMainCharacterId] = useState(characters[0]?.id ?? "");
  const [relatedEventId, setRelatedEventId] = useState("");
  const [tone, setTone] = useState(TONES[0]);
  const [length, setLength] = useState(LENGTHS[1]);
  const [included, setIncluded] = useState<string[]>([]);
  const [excluded, setExcluded] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratedScenario | null>(null);
  const [savedEp, setSavedEp] = useState(false);
  const [savedNote, setSavedNote] = useState(false);

  const toggle = (list: string[], set: (v: string[]) => void, id: string) =>
    set(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

  const generate = () => {
    setLoading(true);
    setResult(null);
    setSavedEp(false);
    setSavedNote(false);
    setTimeout(() => {
      const gen = simulateScenarioGeneration(
        {
          purpose,
          mainCharacterId,
          relatedEventId: relatedEventId || undefined,
          tone,
          length,
          includedBlockIds: included,
          excludedBlockIds: excluded,
        },
        state
      );
      setResult(gen);
      addScenario(toScenario(gen));
      setLoading(false);
    }, 1500);
  };

  const toScenario = (g: GeneratedScenario): Omit<Scenario, "id" | "createdAt"> => ({
    title: g.title,
    purpose,
    mainCharacterId,
    relatedEventId: relatedEventId || undefined,
    tone,
    length,
    includedBlockIds: g.usedBlockIds,
    excludedBlockIds: excluded,
    outline: g.outline,
    scenes: g.scenes,
    usedSettings: g.usedSettings,
    conflictCheck: g.conflictCheck,
    authorNote: g.authorNote,
  });

  const saveAsEpisode = () => {
    if (!result || savedEp) return;
    const nextNum = Math.max(...state.project.episodes.map((e) => e.number), 0) + 1;
    addEpisode({
      title: `${nextNum}화 ${result.title}`,
      number: nextNum,
      summary: result.outline,
      wordCount: 0,
    });
    addMemorySource({
      title: `AI와 만든 에피소드: ${result.title}`,
      sourceType: "generated",
      learnedItems: result.usedSettings.length,
      status: "synced",
    });
    setSavedEp(true);
  };

  const saveAsNote = () => {
    if (!result || savedNote) return;
    addNote({
      title: `에피소드 초안: ${result.title}`,
      content: `${result.outline}\n\n주요 장면:\n${result.scenes
        .map((s, i) => `${i + 1}. ${s}`)
        .join("\n")}\n\n작가 메모: ${result.authorNote}`,
      relatedBlockIds: result.usedBlockIds,
    });
    setSavedNote(true);
  };

  return (
    <div className="fade-up space-y-5">
      <div>
        <h2 className="text-2xl font-extrabold text-stone-800">새 에피소드 만들기</h2>
        <p className="text-base text-stone-500">
          저장된 설정을 어기지 않는 다음 이야기 초안을 AI와 함께 만들어요. 만든 초안은
          설정 검사를 거쳐서 나옵니다.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[380px_1fr]">
        {/* 조건 고르기 */}
        <section className="card h-fit space-y-4 p-6">
          <div>
            <label className="label">어떤 이야기를 만들까요?</label>
            <select className="input" value={purpose} onChange={(e) => setPurpose(e.target.value)}>
              {PURPOSES.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">중심 인물</label>
            <select
              className="input"
              value={mainCharacterId}
              onChange={(e) => setMainCharacterId(e.target.value)}
            >
              {characters.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">이어질 사건 (선택)</label>
            <select
              className="input"
              value={relatedEventId}
              onChange={(e) => setRelatedEventId(e.target.value)}
            >
              <option value="">선택 안 함</option>
              {events.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">분위기</label>
              <select className="input" value={tone} onChange={(e) => setTone(e.target.value)}>
                {TONES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">분량</label>
              <select className="input" value={length} onChange={(e) => setLength(e.target.value)}>
                {LENGTHS.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="label">꼭 넣을 설정</label>
            <div className="flex max-h-32 flex-wrap gap-1 overflow-y-auto">
              {state.blocks.map((b) => (
                <button
                  key={b.id}
                  onClick={() => toggle(included, setIncluded, b.id)}
                  className={`chip cursor-pointer transition ${
                    included.includes(b.id)
                      ? "bg-emerald-600 text-white"
                      : "border border-paper-300 bg-white text-stone-500 hover:bg-paper-100"
                  }`}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="label">넣지 말아야 할 설정</label>
            <div className="flex max-h-32 flex-wrap gap-1 overflow-y-auto">
              {state.blocks.map((b) => (
                <button
                  key={b.id}
                  onClick={() => toggle(excluded, setExcluded, b.id)}
                  className={`chip cursor-pointer transition ${
                    excluded.includes(b.id)
                      ? "bg-red-600 text-white"
                      : "border border-paper-300 bg-white text-stone-500 hover:bg-paper-100"
                  }`}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>
          <button
            className="btn-primary w-full py-3 text-lg"
            onClick={generate}
            disabled={loading || !mainCharacterId}
          >
            {loading ? "설정을 지키며 만드는 중…" : "✨ 에피소드 초안 만들기"}
          </button>
        </section>

        {/* 결과 */}
        <section className="space-y-3">
          {loading && (
            <div className="card flex items-center gap-3 p-6">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="pulse-dot h-2.5 w-2.5 rounded-full bg-amber-500"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
              <span className="text-lg text-amber-800">
                저장된 설정과 부딪히지 않는 전개를 찾는 중…
              </span>
            </div>
          )}

          {result && (
            <div className="fade-up card space-y-4 p-7">
              <div>
                <div className="mb-1 text-sm font-bold text-amber-700">AI가 만든 에피소드 초안</div>
                <h3 className="text-2xl font-extrabold text-stone-800">{result.title}</h3>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  <span className="chip bg-violet-100 text-violet-800">{purpose}</span>
                  <span className="chip bg-paper-100 text-stone-600">{tone}</span>
                  <span className="chip bg-paper-100 text-stone-600">{length}</span>
                </div>
              </div>

              <div>
                <h4 className="label">줄거리</h4>
                <p className="text-lg leading-relaxed text-stone-700">{result.outline}</p>
              </div>

              <div>
                <h4 className="label">주요 장면</h4>
                <ol className="space-y-1.5">
                  {result.scenes.map((s, i) => (
                    <li key={i} className="flex gap-3 rounded-xl bg-paper-100 px-3 py-2.5 text-base text-stone-700">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-200 text-sm font-bold text-amber-800">
                        {i + 1}
                      </span>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h4 className="label">사용한 설정</h4>
                <div className="flex flex-wrap gap-1.5">
                  {result.usedSettings.map((s) => (
                    <span key={s} className="chip border border-paper-300 bg-paper-100 text-stone-600">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <h4 className="mb-1.5 text-sm font-bold text-emerald-700">
                  🛡️ 설정 검사 결과
                </h4>
                <ul className="space-y-1 text-base leading-relaxed text-emerald-900">
                  {result.conflictCheck.map((c, i) => (
                    <li key={i}>· {c}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-violet-200 bg-violet-50 p-4">
                <h4 className="mb-1 text-sm font-bold text-violet-700">✍️ 작가님께 드리는 메모</h4>
                <p className="text-base leading-relaxed text-violet-900">{result.authorNote}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button className="btn-primary" onClick={saveAsEpisode} disabled={savedEp}>
                  {savedEp ? "✓ 회차로 저장됨" : "📚 회차로 저장"}
                </button>
                <button className="btn-green" onClick={saveAsNote} disabled={savedNote}>
                  {savedNote ? "✓ 메모로 저장됨" : "📝 메모로 저장"}
                </button>
                <button
                  className="btn-ghost"
                  onClick={() => navigate("dashboard", { graphMode: "scenario" })}
                >
                  🗺️ 사용한 설정을 지도에서 보기
                </button>
              </div>
            </div>
          )}

          {!loading && !result && (
            <div className="card flex min-h-60 flex-col items-center justify-center p-8 text-center">
              <span className="mb-3 text-5xl">✨</span>
              <p className="max-w-md text-base leading-relaxed text-stone-500">
                만들고 싶은 이야기 종류와 중심 인물을 고르고 ‘에피소드 초안 만들기’를
                누르면, AI가 저장된 설정을 지키는 다음 이야기를 만들어 드려요.
              </p>
            </div>
          )}

          {/* 만든 기록 */}
          {state.scenarios.length > 0 && (
            <div className="card p-5">
              <h4 className="label">지금까지 만든 초안 ({state.scenarios.length})</h4>
              <ul className="space-y-1">
                {[...state.scenarios].reverse().slice(0, 5).map((s) => (
                  <li key={s.id} className="flex items-center justify-between rounded-lg bg-paper-100 px-3 py-2 text-base">
                    <span className="font-medium text-stone-700">{s.title}</span>
                    <span className="text-sm text-stone-500">
                      {s.purpose} · {new Date(s.createdAt).toLocaleDateString("ko-KR")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
