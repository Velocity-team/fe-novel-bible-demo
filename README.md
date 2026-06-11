# LoreBlock 🌑

> 작가가 입력한 세계관과 원고를 학습한 AI가 인물·사건·설정을 기억하고, 서브 스토리
> 시나리오를 제작하며, 글쓰기 오류를 방지해주는 **작가용 세계관 AI 에이전트** (프론트엔드 MVP 데모)

장편 웹소설 「검은 달의 계승자」 목데이터가 기본 탑재되어 있으며, 모든 기능은
**백엔드/외부 AI 호출 없이** mockData + localStorage + 로컬 시뮬레이션 함수로 동작합니다.

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 안내된 주소(기본 http://localhost:5173)를 열면 됩니다.

## 기술 스택

- React 18 + TypeScript + Vite
- Tailwind CSS (다크 모드 고정)
- 그래프: 외부 라이브러리 없이 SVG 직접 구현 (드래그/줌/모드 전환)
- 저장소: localStorage (블록/관계/충돌 상태/Draft/시나리오/대화 기록/노드 위치)

## 주요 화면

| 메뉴 | 설명 |
| --- | --- |
| Dashboard | 작품 현황, 통계, 최근 충돌, 미니 그래프 |
| New Writing | 글쓰기 에디터 + 실시간 AI Canon Guard 경고 |
| Manuscript Import | 텍스트/파일/엑셀/빈 문서 4가지 입력 + 분석 시뮬레이션 |
| AI Memory | Canon Confidence Score, 학습 소스 관리, Rebuild |
| World Blocks | 세계관 블록 CRUD, AI 학습 배지, Source Evidence, AI Recall |
| Graph | Obsidian식 관계도 (Memory/Focus/Conflict/Scenario 모드) |
| Relation Builder | 블록 코딩식 [주어]+[관계]+[대상] 관계 편집 + 자연어 미리보기 |
| Scenario Generator | 캐논을 지키는 서브 스토리 생성 (조건별 분기) |
| Ask Lore AI | 채팅형 세계관 질의응답 (사전 정의 + 키워드 매칭) |
| Conflict Report | 설정 충돌 검수 센터 (유형/심각도 필터, 수정 가이드) |
| Quality Report | 완성도 점수, 게이지, 개선 제안 체크리스트 |
| Project Settings | 작품 정보, 기본 규칙/생성 제약/금지 설정, JSON Export, Reset |

## Canon Guard 시연 문장

New Writing 에디터에 아래 문장을 입력하면 실시간 경고를 볼 수 있습니다.

- `이라온이 하준에게 말했다` → 사망 인물 등장 경고
- `정오에 검은 달 마법을 사용했다` → 마법 규칙 위반 경고
- `백도윤이 흑월 길드 소속이라는 소문이 돌았다` → 소속 충돌 경고
- `강하준은 27세라고 했다` → 나이 충돌 경고
- `강하준은 미래를 말했다` → 회귀 제약 위반 경고

## 데이터 초기화

Project Settings → **Reset Mock Data** 버튼이 localStorage를 비우고 기본
목데이터로 되돌립니다.
