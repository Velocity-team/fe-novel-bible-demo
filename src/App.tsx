import { useState } from "react";
import BlockDetailPanel from "./components/BlockDetailPanel";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useApp } from "./context/AppContext";
import About from "./pages/About";
import AIMemory from "./pages/AIMemory";
import AskLoreAI from "./pages/AskLoreAI";
import Conflicts from "./pages/Conflicts";
import Dashboard from "./pages/Dashboard";
import ManuscriptImport from "./pages/ManuscriptImport";
import NewWriting from "./pages/NewWriting";
import Onboarding from "./pages/Onboarding";
import ProjectSettings from "./pages/ProjectSettings";
import RelationBuilder from "./pages/RelationBuilder";
import ScenarioGenerator from "./pages/ScenarioGenerator";
import WorldBlocks from "./pages/WorldBlocks";

export default function App() {
  const { state, page } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  // 처음 사용하는 작가는 온보딩(작품 정보 → 원고 올리기 → AI 학습)부터 시작한다.
  if (!state.onboarded) {
    return <Onboarding />;
  }

  return (
    <div className="min-h-screen bg-[#faf6ef] text-stone-800">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="lg:pl-72">
        <Header onMenuClick={() => setMobileOpen(true)} />
        <main className="mx-auto max-w-7xl p-4 lg:p-6">
          {page === "dashboard" && <Dashboard />}
          {page === "writing" && <NewWriting />}
          {page === "import" && <ManuscriptImport />}
          {page === "memory" && <AIMemory />}
          {page === "blocks" && <WorldBlocks />}
          {page === "about" && <About />}
          {page === "relations" && <RelationBuilder />}
          {page === "scenario" && <ScenarioGenerator />}
          {page === "ask" && <AskLoreAI />}
          {page === "conflicts" && <Conflicts />}
          {page === "settings" && <ProjectSettings />}
        </main>
      </div>
      <BlockDetailPanel />
    </div>
  );
}
