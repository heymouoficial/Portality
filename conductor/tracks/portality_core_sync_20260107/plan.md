# Plan: Portality OS Core Integration & Bidirectional Notion Sync

## Phase 1: Core Notion Integration & Schema Alignment [checkpoint: d2d6d3b]
- [x] Task: Initialize Notion SDK and configure environment secrets (`NOTION_API_KEY`, `NOTION_DATABASE_IDS`). (fdae477)
- [x] Task: Implement `notionService.ts` for reading the 5 core databases (Clients, Services, Tasks, Team, Calendar). (c4f768f)
- [x] Task: Create data mappers to align Notion database schemas with Portality's internal state. (60bc6a1)
- [x] Task: Write tests for Notion data fetching and mapping logic. (1e90827)
- [x] Task: Conductor - User Manual Verification 'Phase 1: Core Notion Integration' (Protocol in workflow.md)

## Phase 2: Aureon UI Integration & Generative Components (Priority) [checkpoint: ba19a3f]
- [x] Task: Fix Aureon View loading state to ensure RAG (Flowise) interface is visible. (c754483)
- [x] Task: Create `ClientSummaryCard` component with LiquidGlass aesthetic. (c754483)
- [x] Task: Integrate `notionService` into `AureonView` (or relevant chat component) to fetch real client data. (c754483)
- [x] Task: Implement logic for Aureon to render `ClientSummaryCard` based on user query "Active Projects". (c754483)
- [x] Task: Conductor - User Manual Verification 'Phase 2: Aureon UI Integration' (Protocol in workflow.md) (ba19a3f)

## Phase 3: Bidirectional Sync Logic [checkpoint: e5bc2ba]
- [x] Task: Implement `write` operations in `notionService.ts` for Tasks and Clients. (d5bfe21)
- [x] Task: Setup Supabase Edge Functions or internal sync logic to detect changes in Portality and push to Notion. (cfaf19a)
- [x] Task: Write tests for bidirectional data flow (Mocking Notion API). (95f4492)
- [x] Task: Conductor - User Manual Verification 'Phase 3: Bidirectional Sync' (Protocol in workflow.md) (e5bc2ba)

## Phase 4: RAG Performance & Aureon Optimization
- [x] Task: Profile current Aureon chat performance and identify RAG connection bottlenecks. (Manual Analysis)
- [x] Task: Refactor `ragService.ts` to optimize Supabase/Flowise handshake and implement caching where appropriate. (3a38eda)
- [x] Task: Implement initial "Agent-Controlled Rendering" logic for Task Cards and Table components. (091a099)
- [x] Task: Write tests for component rendering triggers and RAG response times. (091a099)
- [ ] Task: Conductor - User Manual Verification 'Phase 4: RAG & Aureon Optimization' (Protocol in workflow.md)

## Phase 5: Alpha v1.0 Hotfix & Debugging (Critical) [checkpoint: 456cc6b]
- [x] Task: Fix Realtime UI Sync in `App.tsx` to ensure Supabase updates reflect immediately in UI. (e5bc2ba)
- [x] Task: Debug `RAGView.tsx` and `ragService.ts` to fix loading/error states and ensure Supabase Vector fallback works. (3a38eda)
- [x] Task: Debug `FloatingChat.tsx` to ensure `ClientSummaryCard` injects correctly (Generative UI pattern). (b623c4e)
- [x] Task: Implement User-Session Mapping: Link Supabase Auth email -> `profiles` table -> Notion 'Team' DB entry. (App.tsx updated)
- [x] Task: Overhaul Manual Auth to ensure login redirects to LiquidGlass Dashboard with correct user context. (Verified logic in LoginView/App)
- [x] Task: Conductor - User Manual Verification 'Phase 5: Alpha v1.0 Hotfix' (Protocol in workflow.md) (456cc6b)

## Phase 6: UI Hydration & Final Polish
- [ ] Task: Implement session-aware hydration logic for `Dashboard.tsx`.
- [ ] Task: Integrate `Omnipresent Aureon` chatbot with the new sync and rendering logic.
- [ ] Task: Final end-to-end verification of Notion mirroring.
- [ ] Task: Conductor - User Manual Verification 'Phase 6: UI & Final Polish' (Protocol in workflow.md)
