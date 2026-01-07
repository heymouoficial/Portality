# Product Guide: Portality (Elevat OS)

## Initial Concept
**Portality** is the central Operating System for **Elevat Marketing** and the **Multiversa Lab** ecosystem. It unifies operations, intelligence (Aureon AI), and data into a single verified interface.

**LiquidGlass UI Architecture:** The interface is not static; it utilizes a generative chat system that renders interactive components instead of plain text, allowing for fluid navigation between global summaries and detailed views.

## Target Users
- **Agency Administrators:** Managing operations and high-level strategy.
- **Marketing Operatives:** Executing daily tasks and campaigns.
- **Aureon AI (Agentic):** The AI system itself acts as a user/operator within the OS.

## Core Goals
- **Bidirectional Agentic Integration (Alpha v1.0):** Implement the foundational architecture for active synchronization.
    - Configure Notion SDK for CRUD operations linked to 'Clients, Services, and Tasks'.
    - Prepare the MCP Hub to orchestrate containers on Hostinger/Dokploy.
    - Integrate Google Workstation SDK for environment deployment.
    - Establish RAG persistence in Supabase, connecting with Flowise (rag.elevatmarketing.com) and preparing endpoints for n8n webhooks (n8n.elevatmarketing.com).
- **Data Verification:** Ensure data logic is verified and ready for total automation.

## Key Features
- **Infrastructure & Automation Orchestrator:** A control module to monitor container health on Hostinger/Dokploy, manage custom image deployments on Google Workstation, and act as the execution bridge for n8n webhooks and Flowise RAG queries.
- **Session-Aware Dynamic Dashboard:** A unique template that hydrates based on the logged-in user. Guests see their personal task summaries but maintain global read access to Notion's Clients, Tasks, and Services databases.
- **Invitation-Led Onboarding:** Identification and registration system managed directly from the UI, allowing new members to join via invitation and activate their operational profiles immediately.
- **Agent-Controlled Rendering:** Aureon has total control over the dashboard. It uses an initial interactive summary template and deploys specific components (charts, tables, editors) based on the conversational context.
- **Unified Data & RAG Hub:** A centralized "Data" section housing knowledge bases and dynamic views of the 5 Notion databases, connected to the functional RAG system (Flowise).
- **Omnipresent Aureon:** Floating chatbot (Landing + Dashboard) with command execution and screen navigation capabilities.

## Success Metrics
- **Centralized Operations & Bidirectional Sync:** Portality must be a functional mirror of the 5 Notion databases (Clients, Services, Tasks, Team, Calendar), where changes are reflected in Notion via the SDK.
- **RAG Precision & Prioritization:** Ensure Aureon uses 'Active Services' and 'Operational Tasks' data to prioritize responses/automations.
- **Technical Knowledge Indexing:** Validate that Google Workstation and Hostinger technical documentation is indexed in Supabase for infrastructure maintenance assistance.
- **Component Rendering Accuracy:** 100% success rate in generating interactive components from Aureon's chat.
- **Frictionless Onboarding:** Successful invitation and registration flow completed from the interface without manual database intervention.
- **RAG Interface Latency:** Optimal response time in the Aureon tab, connecting with Supabase persistence and resolving existing loading issues.
