import { useApp } from "../context/AppContext";
import type { PageKey } from "../types";

/** 작가의 작업 흐름(보관·정리 → 집필 도우미)에 맞춰 묶은 메뉴 */
const MENU_GROUPS: {
  title: string | null;
  items: { key: PageKey; label: string; icon: string }[];
}[] = [
  {
    title: null,
    items: [{ key: "dashboard", label: "내 작품 한눈에", icon: "🏠" }],
  },
  {
    title: "원고·설정 보관",
    items: [
      { key: "import", label: "원고·설정 불러오기", icon: "📥" },
      { key: "blocks", label: "설정 사전", icon: "🗂️" },
      { key: "relations", label: "관계 만들기", icon: "🔗" },
      { key: "memory", label: "AI 학습 현황", icon: "🧠" },
    ],
  },
  {
    title: "집필 도우미",
    items: [
      { key: "writing", label: "새 회차 쓰기", icon: "✒️" },
      { key: "scenario", label: "새 에피소드 만들기", icon: "✨" },
      { key: "conflicts", label: "설정 오류 검사", icon: "🚨" },
      { key: "ask", label: "AI에게 물어보기", icon: "💬" },
    ],
  },
  {
    title: "관리",
    items: [{ key: "settings", label: "작품 설정", icon: "⚙️" }],
  },
];

export default function Sidebar({
  mobileOpen,
  onClose,
}: {
  mobileOpen: boolean;
  onClose: () => void;
}) {
  const { page, navigate, state } = useApp();
  const openConflicts = state.conflicts.filter((c) => c.status === "open").length;

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-stone-900/40 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-paper-300 bg-white transition-transform lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 px-5 py-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-2xl shadow-card">
            📚
          </div>
          <div>
            <div className="text-xl font-extrabold tracking-tight text-stone-800">
              로어블록
            </div>
            <div className="text-xs text-stone-500">작가를 위한 세계관 기록 도우미</div>
          </div>
        </div>

        <nav className="flex-1 space-y-4 overflow-y-auto px-3 pb-4">
          {MENU_GROUPS.map((g, gi) => (
            <div key={gi}>
              {g.title && (
                <div className="mb-1 px-3 text-xs font-bold uppercase tracking-wider text-stone-400">
                  {g.title}
                </div>
              )}
              <div className="space-y-0.5">
                {g.items.map((m) => {
                  const active = page === m.key;
                  return (
                    <button
                      key={m.key}
                      onClick={() => {
                        navigate(m.key);
                        onClose();
                      }}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-base transition ${
                        active
                          ? "bg-amber-100 font-bold text-amber-900"
                          : "text-stone-600 hover:bg-paper-100 hover:text-stone-800"
                      }`}
                    >
                      <span className="text-lg">{m.icon}</span>
                      <span className="flex-1 text-left">{m.label}</span>
                      {m.key === "conflicts" && openConflicts > 0 && (
                        <span className="chip bg-red-100 text-red-700">{openConflicts}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-paper-300 px-5 py-4 text-sm leading-relaxed text-stone-500">
          원고를 저장할수록 AI가 작품을 더 정확하게 기억합니다.
        </div>
      </aside>
    </>
  );
}
