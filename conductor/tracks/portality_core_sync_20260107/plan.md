# Plan: Portality OS Core Integration & Bidirectional Notion Sync

## Phase 1: Core Notion Integration & Schema Alignment
- [x] Task: Initialize Notion SDK and configure environment secrets (`NOTION_API_KEY`, `NOTION_DATABASE_IDS`). (fdae477)
- [x] Task: Implement `notionService.ts` for reading the 5 core databases (Clients, Services, Tasks, Team, Calendar). (c4f768f)
- [x] Task: Create data mappers to align Notion database schemas with Portality's internal state. (60bc6a1)
- [x] Task: Write tests for Notion data fetching and mapping logic. (1e90827)
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Core Notion Integration' (Protocol in workflow.md)

## Phase 2: Bidirectional Sync Logic
- [ ] Task: Implement `write` operations in `notionService.ts` for Tasks and Clients.
- [ ] Task: Setup Supabase Edge Functions or internal sync logic to detect changes in Portality and push to Notion.
- [ ] Task: Write tests for bidirectional data flow (Mocking Notion API).
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Bidirectional Sync' (Protocol in workflow.md)

## Phase 3: RAG Performance & Aureon Optimization
- [ ] Task: Profile current Aureon chat performance and identify RAG connection bottlenecks.
- [ ] Task: Refactor `ragService.ts` to optimize Supabase/Flowise handshake and implement caching where appropriate.
- [ ] Task: Implement initial "Agent-Controlled Rendering" logic for Task Cards and Table components.
- [ ] Task: Write tests for component rendering triggers and RAG response times.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: RAG & Aureon Optimization' (Protocol in workflow.md)

## Phase 4: UI Hydration & Final Polish
- [ ] Task: Implement session-aware hydration logic for `Dashboard.tsx`.
- [ ] Task: Integrate `Omnipresent Aureon` chatbot with the new sync and rendering logic.
- [ ] Task: Final end-to-end verification of Notion mirroring.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: UI & Final Polish' (Protocol in workflow.md)
