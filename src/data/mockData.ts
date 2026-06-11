import type {
  AppState,
  Conflict,
  MemorySource,
  Project,
  ProjectNote,
  Relation,
  WorldBlock,
} from "../types";

const T0 = "2026-06-01T09:00:00.000Z";

const block = (
  b: Omit<WorldBlock, "createdAt" | "updatedAt" | "canonNotes" | "sourceEvidence"> &
    Partial<Pick<WorldBlock, "canonNotes" | "sourceEvidence">>
): WorldBlock => ({
  canonNotes: "",
  sourceEvidence: [],
  createdAt: T0,
  updatedAt: T0,
  ...b,
});

export const mockBlocks: WorldBlock[] = [
  // ── 인물 ──────────────────────────────────────────────
  block({
    id: "c1",
    name: "흥부",
    type: "character",
    description: "마음씨 착한 동생. 가난하지만 다친 제비를 정성껏 돌봐준다.",
    firstAppearance: "1화",
    attributes: { 성격: "착함", 형편: "가난함", 가족: "아내와 자식 열두 명" },
    tags: ["주인공", "동생", "착한 사람"],
    aiStatus: "Learned",
    sourceEvidence: [
      "1화: “흥부는 형에게 쫓겨나면서도 원망 한마디 하지 않았다.”",
      "3화: “흥부는 부러진 제비 다리에 헝겊을 감아 주었다.”",
    ],
  }),
  block({
    id: "c2",
    name: "놀부",
    type: "character",
    description: "욕심 많은 형. 부모님의 유산을 독차지하고 흥부네를 내쫓는다.",
    firstAppearance: "1화",
    attributes: { 성격: "욕심 많음", 형편: "부자", 가족: "아내와 단둘" },
    tags: ["형", "욕심쟁이", "악역"],
    aiStatus: "Learned",
    sourceEvidence: ["1화: “놀부는 곳간 열쇠를 꼭 쥔 채 동생을 내쫓았다.”"],
  }),
  block({
    id: "c3",
    name: "흥부 아내",
    type: "character",
    description: "흥부와 함께 어려운 살림을 꾸려 가는 부지런한 사람.",
    firstAppearance: "1화",
    attributes: { 성격: "부지런함", 형편: "가난함" },
    tags: ["가족", "조연"],
    aiStatus: "Learned",
    sourceEvidence: ["1화: “흥부 아내는 남의 집 일을 도와주고 곡식을 얻어 왔다.”"],
  }),
  block({
    id: "c4",
    name: "놀부 아내",
    type: "character",
    description: "놀부만큼 인색한 사람. 밥을 구걸하러 온 흥부의 뺨을 밥주걱으로 때린다.",
    firstAppearance: "2화",
    attributes: { 성격: "인색함", 형편: "부자" },
    tags: ["악역", "조연"],
    aiStatus: "Conflict Risk",
    sourceEvidence: ["2화: “놀부 아내는 밥주걱으로 흥부의 뺨을 철썩 때렸다.”"],
  }),
  block({
    id: "c5",
    name: "제비",
    type: "character",
    description: "흥부네 처마에 둥지를 튼 제비. 구렁이에게서 떨어져 다리를 다친다.",
    firstAppearance: "3화",
    attributes: { 상태: "오른쪽 다리를 다침", 고향: "강남" },
    tags: ["은혜 갚는 동물", "핵심 인물"],
    aiStatus: "Learned",
    sourceEvidence: ["3화: “둥지에서 떨어진 제비는 오른쪽 다리가 부러져 있었다.”"],
  }),
  // ── 장소 ──────────────────────────────────────────────
  block({
    id: "l1",
    name: "흥부네 초가집",
    type: "location",
    description: "흥부 가족이 사는 다 쓰러져 가는 초가집. 제비가 둥지를 튼 곳이다.",
    firstAppearance: "1화",
    attributes: {},
    tags: ["흥부네", "집"],
    aiStatus: "Learned",
  }),
  block({
    id: "l2",
    name: "놀부네 기와집",
    type: "location",
    description: "놀부 부부가 사는 으리으리한 기와집. 곳간에 곡식이 가득하다.",
    firstAppearance: "1화",
    attributes: {},
    tags: ["놀부네", "집"],
    aiStatus: "Learned",
  }),
  block({
    id: "l3",
    name: "강남",
    type: "location",
    description: "제비들이 겨울을 나러 가는 따뜻한 남쪽 나라. 제비 임금님이 산다.",
    firstAppearance: "4화",
    attributes: {},
    tags: ["제비", "먼 나라"],
    aiStatus: "Learned",
  }),
  block({
    id: "l4",
    name: "박 넝쿨 지붕",
    type: "location",
    description: "박씨를 심은 흥부네 지붕. 가을이 되자 큰 박이 주렁주렁 열린다.",
    firstAppearance: "4화",
    attributes: { 위치: "흥부네 초가집 지붕" },
    tags: ["박", "보물"],
    aiStatus: "Imported from Excel",
    sourceEvidence: ["4화: “지붕 위 박 넝쿨에는 집채만 한 박이 세 통 열렸다.”"],
  }),
  // ── 무리(집단) ────────────────────────────────────────
  block({
    id: "o1",
    name: "흥부네 가족",
    type: "organization",
    description: "흥부 부부와 자식들. 가난하지만 서로 아끼며 산다.",
    firstAppearance: "1화",
    attributes: {},
    tags: ["가족", "주인공네"],
    aiStatus: "Learned",
  }),
  block({
    id: "o2",
    name: "놀부네 가족",
    type: "organization",
    description: "놀부 부부. 재산을 끌어안고 이웃에게 인색하게 군다.",
    firstAppearance: "1화",
    attributes: {},
    tags: ["가족", "악역네"],
    aiStatus: "Learned",
  }),
  block({
    id: "o3",
    name: "강남 제비 마을",
    type: "organization",
    description: "강남에 있는 제비들의 마을. 은혜를 입은 일을 기록해 두었다가 갚는다.",
    firstAppearance: "4화",
    attributes: {},
    tags: ["제비", "은혜 갚기"],
    aiStatus: "Imported from Excel",
  }),
  // ── 사건 ──────────────────────────────────────────────
  block({
    id: "e1",
    name: "유산 독차지",
    type: "event",
    description: "놀부가 부모님의 재산을 모두 차지하고 흥부네 가족을 내쫓은 사건.",
    episode: "1화",
    firstAppearance: "1화",
    attributes: {},
    tags: ["시작 사건"],
    aiStatus: "Learned",
  }),
  block({
    id: "e2",
    name: "밥주걱 사건",
    type: "event",
    description: "밥을 구걸하러 간 흥부가 놀부 아내에게 밥주걱으로 뺨을 맞은 사건.",
    episode: "2화",
    firstAppearance: "2화",
    attributes: {},
    tags: ["갈등"],
    aiStatus: "Learned",
  }),
  block({
    id: "e3",
    name: "제비 다리 치료",
    type: "event",
    description: "흥부가 구렁이에게서 떨어진 제비를 구해 부러진 다리를 치료해 준 사건.",
    episode: "3화",
    firstAppearance: "3화",
    attributes: {},
    tags: ["선행", "핵심 사건"],
    aiStatus: "Learned",
  }),
  block({
    id: "e4",
    name: "박씨 선물",
    type: "event",
    description: "강남에 다녀온 제비가 은혜를 갚으려고 박씨 하나를 물어다 준 사건.",
    episode: "4화",
    firstAppearance: "4화",
    attributes: { 중요도: "높음" },
    tags: ["보답", "복선"],
    aiStatus: "Learned",
    sourceEvidence: ["4화: “제비는 흥부의 손바닥에 박씨 하나를 떨어뜨렸다.”"],
  }),
  block({
    id: "e5",
    name: "박 타기",
    type: "event",
    description: "다 익은 박을 타자 금은보화와 쌀이 쏟아져 나와 흥부네가 부자가 된 사건.",
    episode: "5화",
    firstAppearance: "5화",
    attributes: { 중요도: "높음" },
    tags: ["보상", "핵심 사건"],
    aiStatus: "Learned",
  }),
  // ── 규칙 ──────────────────────────────────────────────
  block({
    id: "r1",
    name: "은혜 갚기 규칙",
    type: "rule",
    description: "제비는 진심으로 은혜를 베푼 사람에게만, 입은 만큼 보답한다.",
    attributes: {},
    tags: ["세계관 규칙", "보답"],
    aiStatus: "Learned",
  }),
  block({
    id: "r2",
    name: "박 타기 규칙",
    type: "rule",
    description: "박은 가을에 다 익은 뒤에만 탈 수 있다. 덜 익은 박은 아무것도 나오지 않는다.",
    attributes: {},
    tags: ["세계관 규칙", "박"],
    aiStatus: "Conflict Risk",
  }),
  block({
    id: "r3",
    name: "욕심의 대가",
    type: "rule",
    description: "보답을 바라고 일부러 꾸민 선행에는 보물 대신 재앙이 따른다.",
    attributes: {},
    tags: ["세계관 규칙", "교훈"],
    aiStatus: "Learned",
  }),
  // ── 물건 ──────────────────────────────────────────────
  block({
    id: "i1",
    name: "박씨",
    type: "item",
    description: "제비가 물어다 준 씨앗. 심으면 신비한 박이 열린다.",
    firstAppearance: "4화",
    attributes: {},
    tags: ["보물", "복선"],
    aiStatus: "Learned",
  }),
  block({
    id: "i2",
    name: "밥주걱",
    type: "item",
    description: "놀부 아내가 흥부의 뺨을 때린 밥주걱. 놀부네의 인색함을 보여주는 물건.",
    firstAppearance: "2화",
    attributes: {},
    tags: ["상징"],
    aiStatus: "Learned",
  }),
];

const rel = (
  id: string,
  sourceId: string,
  type: string,
  targetId: string,
  extra?: Partial<Relation>
): Relation => ({
  id,
  sourceId,
  targetId,
  type,
  origin: "mock",
  createdAt: T0,
  ...extra,
});

export const mockRelations: Relation[] = [
  rel("rel1", "c1", "형제", "c2"),
  rel("rel2", "c1", "소속", "o1"),
  rel("rel3", "c2", "소속", "o2"),
  rel("rel4", "c3", "가족", "c1"),
  rel("rel5", "c4", "가족", "c2"),
  rel("rel6", "o1", "거점", "l1"),
  rel("rel7", "o2", "거점", "l2"),
  rel("rel8", "c5", "은인", "c1"),
  rel("rel9", "c5", "소속", "o3"),
  rel("rel10", "e2", "장소", "l2"),
  rel("rel11", "e3", "장소", "l1"),
  rel("rel12", "i1", "소유자", "c1"),
  rel("rel13", "i2", "소유자", "c4"),
  rel("rel14", "r1", "적용대상", "c5"),
  rel("rel15", "r2", "사용조건", "", { targetLabel: "가을에 다 익은 박" }),
  rel("rel16", "r3", "위반결과", "", { targetLabel: "보물 대신 재앙" }),
  rel("rel17", "c2", "적대", "c1"),
  rel("rel18", "e4", "관련사건", "e3"),
  rel("rel19", "e5", "관련사건", "e4"),
  rel("rel20", "e4", "장소", "l1"),
  rel("rel21", "i1", "관련사건", "e5"),
  // ── 인물 사이를 잇는 사건 연결선 (설정 지도에서 선 위에 사건 이름이 표시됨) ──
  rel("ev1", "c2", "유산 독차지", "c1", { kind: "event", eventId: "e1", episode: "1화" }),
  rel("ev2", "c4", "밥주걱 사건", "c1", { kind: "event", eventId: "e2", episode: "2화" }),
  rel("ev3", "c1", "제비 다리 치료", "c5", { kind: "event", eventId: "e3", episode: "3화" }),
  rel("ev4", "c5", "박씨 선물", "c1", { kind: "event", eventId: "e4", episode: "4화" }),
];

export const mockConflicts: Conflict[] = [
  {
    id: "cf1",
    title: "흥부네 자식 수가 다름",
    type: "숫자/시간 오류",
    severity: "high",
    description: "1화에서는 흥부네 자식이 열두 명인데, 4화에서는 아홉 명으로 적혀 있습니다.",
    evidenceA: "1화 “흥부네 좁은 방에는 자식 열두 명이 옹기종기 모여 있었다.”",
    evidenceB: "4화 “아홉 남매는 박씨를 신기한 듯 들여다보았다.”",
    recommendation: "자식 수를 열두 명으로 통일하거나, 4화 문장을 ‘아이들은’처럼 숫자 없이 고쳐 보세요.",
    relatedBlockIds: ["c1", "o1"],
    status: "open",
    location: { episode: "4화", sentence: "“아홉 남매는 박씨를 신기한 듯 들여다보았다.”" },
    fixGuide: [
      "4화의 ‘아홉 남매’를 ‘열두 남매’로 고친다.",
      "숫자를 빼고 ‘아이들은’으로 바꿔 충돌을 피한다.",
      "설정 카드(흥부)의 가족 속성을 기준으로 전 회차를 검토한다.",
    ],
  },
  {
    id: "cf2",
    title: "제비가 다친 다리가 다름",
    type: "인물 상태 오류",
    severity: "high",
    description: "3화에서는 제비의 오른쪽 다리가 부러졌는데, 5화에서는 왼쪽 다리를 다쳤던 것으로 나옵니다.",
    evidenceA: "3화 “둥지에서 떨어진 제비는 오른쪽 다리가 부러져 있었다.”",
    evidenceB: "5화 “왼쪽 다리를 다쳤던 그 제비가 다시 날아왔다.”",
    recommendation: "다친 다리를 오른쪽으로 통일하세요. 첫 묘사(3화)가 기준이 됩니다.",
    relatedBlockIds: ["c5", "e3"],
    status: "open",
    location: { episode: "5화", sentence: "“왼쪽 다리를 다쳤던 그 제비가 다시 날아왔다.”" },
    fixGuide: [
      "5화의 ‘왼쪽 다리’를 ‘오른쪽 다리’로 고친다.",
      "설정 카드(제비)의 상태 속성을 기준으로 적는다.",
      "다리 방향이 이야기에 중요하지 않다면 ‘다쳤던 다리’로 표현을 바꾼다.",
    ],
  },
  {
    id: "cf3",
    title: "덜 익은 박을 타는 장면",
    type: "세계관 규칙 위반",
    severity: "medium",
    description:
      "박은 가을에 다 익은 뒤에만 탈 수 있다는 규칙이 있는데, 4화에서 한여름에 박을 타는 장면이 나옵니다.",
    evidenceA: "규칙 “박은 가을에 다 익은 뒤에만 탈 수 있다.”",
    evidenceB: "4화 “한여름 뙤약볕 아래, 흥부는 설익은 박에 톱을 대었다.”",
    recommendation: "장면의 계절을 가을로 바꾸거나, 덜 익은 박이라 아무것도 나오지 않는 장면으로 고치세요.",
    relatedBlockIds: ["r2", "i1"],
    status: "open",
    location: { episode: "4화", sentence: "“한여름 뙤약볕 아래, 흥부는 설익은 박에 톱을 대었다.”" },
    fixGuide: [
      "4화 장면의 계절을 가을로 바꾼다.",
      "덜 익은 박에서는 아무것도 나오지 않았다는 전개로 규칙을 지킨다.",
      "박 타기 장면 자체를 5화로 옮긴다.",
    ],
  },
  {
    id: "cf4",
    title: "박씨를 받기 전에 부자가 된 흥부",
    type: "사건 순서 오류",
    severity: "low",
    description:
      "흥부가 부자가 되는 것은 5화 박 타기 이후인데, 2화에 이미 ‘새로 산 기와집’이라는 표현이 나옵니다.",
    evidenceA: "5화 “박이 갈라지자 금은보화가 쏟아져 나왔다.”",
    evidenceB: "2화 “흥부는 새로 산 기와집 마루에 앉아 한숨을 쉬었다.”",
    recommendation: "2화의 ‘새로 산 기와집’을 ‘다 쓰러져 가는 초가집’으로 고치세요.",
    relatedBlockIds: ["c1", "l1", "e5"],
    status: "open",
    location: { episode: "2화", sentence: "“흥부는 새로 산 기와집 마루에 앉아 한숨을 쉬었다.”" },
    fixGuide: [
      "2화의 배경을 흥부네 초가집으로 고친다.",
      "부자가 되는 시점(5화) 이전 회차에서 재산 관련 표현을 점검한다.",
    ],
  },
];

export const mockProject: Project = {
  id: "p1",
  title: "흥부와 놀부",
  genre: "전래동화 / 가족 / 권선징악",
  logline:
    "욕심 많은 형 놀부에게 쫓겨난 착한 동생 흥부가, 다친 제비를 구해 준 보답으로 받은 박씨 덕분에 복을 받는 이야기",
  summary:
    "부모님의 유산을 독차지한 놀부는 동생 흥부네를 내쫓는다. 가난하지만 착하게 살던 흥부는 구렁이에게서 떨어져 다리가 부러진 제비를 정성껏 치료해 준다. 이듬해 봄, 강남에 다녀온 제비가 박씨 하나를 물어다 주고, 가을에 다 익은 박을 타자 금은보화가 쏟아져 나온다. 이를 샘낸 놀부는 일부러 제비 다리를 부러뜨리지만, 욕심으로 꾸민 선행에는 재앙이 따른다.",
  episodes: [
    { id: "ep1", title: "1화 쫓겨난 흥부네", number: 1, summary: "놀부가 유산을 독차지하고 흥부네 가족을 내쫓는다.", wordCount: 3200 },
    { id: "ep2", title: "2화 밥주걱", number: 2, summary: "밥을 구걸하러 간 흥부가 놀부 아내에게 밥주걱으로 뺨을 맞는다.", wordCount: 2900 },
    { id: "ep3", title: "3화 다친 제비", number: 3, summary: "흥부가 구렁이에게서 떨어진 제비의 부러진 오른쪽 다리를 치료해 준다.", wordCount: 3100 },
    { id: "ep4", title: "4화 박씨 선물", number: 4, summary: "강남에 다녀온 제비가 박씨를 물어다 주고, 지붕에 큰 박이 열린다.", wordCount: 3000 },
    { id: "ep5", title: "5화 박 타기", number: 5, summary: "다 익은 박을 타자 금은보화가 쏟아져 흥부네가 부자가 된다.", wordCount: 3400 },
    { id: "ep6", title: "6화 놀부의 욕심", number: 6, summary: "샘이 난 놀부가 일부러 제비 다리를 부러뜨리고 박씨를 기다린다.", wordCount: 3300 },
  ],
  canonRules: [
    "제비는 진심으로 은혜를 베푼 사람에게만 보답한다.",
    "박은 가을에 다 익은 뒤에만 탈 수 있다.",
    "보답을 바라고 꾸민 선행에는 보물 대신 재앙이 따른다.",
  ],
  generationConstraints: [
    "놀부는 마지막 회차 전까지 벌을 받으면 안 된다.",
    "놀부 박에서 무엇이 나오는지는 마지막 회차 전까지 밝히면 안 된다.",
    "제비가 사람처럼 길게 말하는 장면은 넣지 않는다.",
  ],
  forbiddenSettings: [
    "흥부가 놀부에게 직접 복수하는 전개 금지",
    "박에서 나온 보물을 도둑맞는 전개 금지",
    "덜 익은 박에서 보물이 나오는 장면 금지",
  ],
};

export const mockMemorySources: MemorySource[] = [
  { id: "ms1", title: "1화 원고", sourceType: "manuscript", learnedItems: 9, status: "synced", updatedAt: "2026-06-02T10:00:00.000Z" },
  { id: "ms2", title: "2화 원고", sourceType: "manuscript", learnedItems: 7, status: "synced", updatedAt: "2026-06-02T10:01:00.000Z" },
  { id: "ms3", title: "3화 원고", sourceType: "manuscript", learnedItems: 8, status: "synced", updatedAt: "2026-06-02T10:02:00.000Z" },
  { id: "ms4", title: "4화 원고", sourceType: "manuscript", learnedItems: 10, status: "synced", updatedAt: "2026-06-02T10:03:00.000Z" },
  { id: "ms5", title: "5화 원고", sourceType: "manuscript", learnedItems: 8, status: "synced", updatedAt: "2026-06-02T10:04:00.000Z" },
  { id: "ms6", title: "6화 원고", sourceType: "manuscript", learnedItems: 6, status: "synced", updatedAt: "2026-06-02T10:05:00.000Z" },
  { id: "ms7", title: "설정 정리표 (엑셀)", sourceType: "excel", learnedItems: 9, status: "synced", updatedAt: "2026-06-02T10:06:00.000Z" },
  { id: "ms8", title: "인물 메모", sourceType: "manual", learnedItems: 4, status: "synced", updatedAt: "2026-06-02T10:07:00.000Z" },
];

export const mockNotes: ProjectNote[] = [
  {
    id: "n1",
    title: "놀부 박 복선",
    content:
      "놀부의 박에서 무엇이 나올지는 끝까지 숨긴다. 도깨비가 나와 재산을 가져가는 전개를 예고 없이 터뜨리면 효과가 크다.",
    relatedBlockIds: ["c2", "r3"],
    createdAt: T0,
  },
  {
    id: "n2",
    title: "제비 다리 방향 통일",
    content: "제비가 다친 다리는 ‘오른쪽’으로 통일한다. 3화 첫 묘사가 기준.",
    relatedBlockIds: ["c5"],
    createdAt: T0,
  },
  {
    id: "n3",
    title: "자식 수 표현",
    content: "흥부네 자식은 열두 명. 숫자가 중요하지 않은 장면에서는 ‘아이들’로 표현해 충돌을 줄인다.",
    relatedBlockIds: ["c1", "o1"],
    createdAt: T0,
  },
];

/** 온보딩 드래그앤드롭에 보여줄 가상의 파일 목록 */
export interface OnboardingFile {
  id: string;
  name: string;
  kind: "원고" | "설정표" | "메모";
  icon: string;
  detail: string;
}

export const ONBOARDING_FILES: OnboardingFile[] = [
  { id: "f1", name: "1화 쫓겨난 흥부네.txt", kind: "원고", icon: "📄", detail: "3,200자" },
  { id: "f2", name: "2화 밥주걱.txt", kind: "원고", icon: "📄", detail: "2,900자" },
  { id: "f3", name: "3화 다친 제비.txt", kind: "원고", icon: "📄", detail: "3,100자" },
  { id: "f4", name: "4화 박씨 선물.txt", kind: "원고", icon: "📄", detail: "3,000자" },
  { id: "f5", name: "5화 박 타기.txt", kind: "원고", icon: "📄", detail: "3,400자" },
  { id: "f6", name: "6화 놀부의 욕심.txt", kind: "원고", icon: "📄", detail: "3,300자" },
  { id: "f7", name: "설정 정리표.xlsx", kind: "설정표", icon: "📊", detail: "인물·장소·규칙 9건" },
  { id: "f8", name: "인물 메모.txt", kind: "메모", icon: "📝", detail: "흥부·놀부·제비 메모" },
];

/** 엑셀(설정표) 업로드 미리보기용 목데이터 */
export interface ExcelRow {
  type: string;
  name: string;
  description: string;
  episode: string;
  attribute: string;
  relationSource: string;
  relationType: string;
  relationTarget: string;
  tags: string;
}

export const excelPreviewRows: ExcelRow[] = [
  {
    type: "character",
    name: "도깨비",
    description: "놀부의 박에서 나와 욕심의 대가를 치르게 하는 존재",
    episode: "7화",
    attribute: "역할=응징자",
    relationSource: "도깨비",
    relationType: "응징",
    relationTarget: "놀부",
    tags: "도깨비, 응징, 반전",
  },
  {
    type: "location",
    name: "놀부네 박밭",
    description: "놀부가 박씨를 심으려고 일부러 만든 밭",
    episode: "7화",
    attribute: "위치=놀부네 기와집 마당",
    relationSource: "놀부네 박밭",
    relationType: "장소",
    relationTarget: "놀부의 박 타기",
    tags: "박, 욕심",
  },
  {
    type: "event",
    name: "놀부의 박 타기",
    description: "놀부가 욕심으로 받은 박을 타는 사건. 보물 대신 재앙이 나온다.",
    episode: "7화",
    attribute: "중요도=높음",
    relationSource: "놀부의 박 타기",
    relationType: "관련사건",
    relationTarget: "박 타기",
    tags: "응징, 절정",
  },
  {
    type: "rule",
    name: "꾸민 선행의 박",
    description: "일부러 다치게 한 제비가 물어다 준 박씨에서는 재앙이 나온다.",
    episode: "7화",
    attribute: "적용대상=놀부",
    relationSource: "꾸민 선행의 박",
    relationType: "적용대상",
    relationTarget: "놀부",
    tags: "세계관 규칙, 교훈",
  },
];

export const excelRelationRows = [
  { source: "도깨비", type: "응징", target: "놀부" },
  { source: "놀부네 박밭", type: "장소", target: "놀부의 박 타기" },
  { source: "놀부의 박 타기", type: "관련사건", target: "박 타기" },
  { source: "꾸민 선행의 박", type: "적용대상", target: "놀부" },
];

export const RELATION_TYPES = [
  "가족",
  "형제",
  "소속",
  "적대",
  "은인",
  "조력자",
  "소유자",
  "거점",
  "장소",
  "적용대상",
  "사용조건",
  "위반결과",
  "원인",
  "결과",
  "응징",
  "약속",
  "배신",
  "관련사건",
];

/** 온보딩 학습 완료 후 채워지는 전체 데이터 */
export function buildLearnedState(): Omit<AppState, "onboarded" | "project"> & {
  project: Project;
} {
  return {
    project: structuredClone(mockProject),
    blocks: structuredClone(mockBlocks),
    relations: structuredClone(mockRelations),
    conflicts: structuredClone(mockConflicts),
    drafts: [],
    scenarios: [],
    notes: structuredClone(mockNotes),
    memorySources: structuredClone(mockMemorySources),
    chatHistory: [],
    checkedSuggestions: [],
    canonScore: 87,
    lastTrainedAt: new Date().toISOString(),
  };
}

/** 온보딩 전 빈 상태 */
export function buildEmptyState(): AppState {
  return {
    onboarded: false,
    project: {
      id: "p1",
      title: "",
      genre: "",
      logline: "",
      summary: "",
      episodes: [],
      canonRules: [],
      generationConstraints: [],
      forbiddenSettings: [],
    },
    blocks: [],
    relations: [],
    conflicts: [],
    drafts: [],
    scenarios: [],
    notes: [],
    memorySources: [],
    chatHistory: [],
    checkedSuggestions: [],
    canonScore: 0,
    lastTrainedAt: T0,
  };
}

export function buildInitialState(): AppState {
  return { onboarded: true, ...buildLearnedState() };
}
