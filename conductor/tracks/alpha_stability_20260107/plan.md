# Plan: Alpha Stability & Team Access

## Phase 1: Multi-Table Realtime Synchronization [checkpoint: 713d2c5]
- [x] Task: Write tests for multi-table Supabase subscriptions (`Tasks`, `Clients`, `Services`, `Team`). (Impl & Verified)
- [x] Task: Refactor `useRealtimeData` hook to manage unified subscriptions across the 4 core tables. (Impl & Verified)
- [x] Task: Implement instant re-rendering logic in `HomeView` and `NotionView` components. (Implicit via App.tsx prop updates)
- [x] Task: Conductor - User Manual Verification 'Phase 1: Realtime Sync' (Protocol in workflow.md) (713d2c5)

## Phase 2: RAG Robustness & Local pgvector Fix
- [ ] Task: Write tests for `RAGView` timeout behavior and error state rendering.
- [ ] Task: Implement 5-second timeout and "No documents found / Connection Error" UI in `RAGView.tsx`.
- [ ] Task: Refactor `ragService.ts` to query `match_documents` RPC directly from Supabase, removing external Flowise dependencies.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: RAG & pgvector' (Protocol in workflow.md)

## Phase 3: Identity Mapping & Session Filtering
- [ ] Task: Write tests for email-based identity mapping between Supabase Auth and Notion Team DB.
- [ ] Task: Implement strict email mapping in `App.tsx` to link sessions to Notion `notionId`.
- [ ] Task: Update `HomeView` and `NotionView` to apply global filtering based on `currentUser.notionId`.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Identity & Filtering' (Protocol in workflow.md)

## Phase 4: Generative UI Expansion
- [ ] Task: Write tests for intent parsing logic in `geminiService.ts` (detecting requests for summaries vs actions).
- [ ] Task: Implement `TaskActionCard`, `TeamAvailabilitySnippet`, and `ServiceDetailCard` components.
- [ ] Task: Update `FloatingChat.tsx` to handle dynamic injection of the expanded component set.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Generative UI' (Protocol in workflow.md)
