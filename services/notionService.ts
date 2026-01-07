import { Client as NotionClient } from '@notionhq/client';
import { Client, Task, Service, CalendarEvent } from '../types';

/**
 * Notion Service - Core Integration
 * Handles synchronization between Notion databases and Portality OS.
 */
class NotionService {
    private client: NotionClient | null = null;

    private getClient(): NotionClient | null {
        if (this.client) return this.client;
        const token = import.meta.env.VITE_NOTION_TOKEN;
        if (token) {
            this.client = new NotionClient({ auth: token });
        }
        return this.client;
    }

    /**
     * Helper to query a Notion database with pagination.
     */
    private async queryDatabase(databaseId: string): Promise<any[]> {
        const client = this.getClient();
        if (!client) return [];

        let results: any[] = [];
        let hasMore = true;
        let cursor: string | undefined = undefined;

        try {
            while (hasMore) {
                const response: any = await client.databases.query({
                    database_id: databaseId,
                    start_cursor: cursor,
                });
                results = [...results, ...response.results];
                hasMore = response.has_more;
                cursor = response.next_cursor;
            }
            return results;
        } catch (error) {
            console.error(`Error querying database ${databaseId}:`, error);
            return [];
        }
    }

    /**
     * Fetches clients from the Notion Clients database.
     */
    async getClients(): Promise<Client[]> {
        const dbId = import.meta.env.VITE_NOTION_DB_CLIENTS;
        if (!dbId) return [];

        const results = await this.queryDatabase(dbId);
        return results.map(page => this.mapClient(page));
    }

    /**
     * Fetches services from the Notion Services database.
     */
    async getServices(): Promise<Service[]> {
        const dbId = import.meta.env.VITE_NOTION_DB_SERVICES;
        if (!dbId) return [];

        const results = await this.queryDatabase(dbId);
        return results.map(page => this.mapService(page));
    }

    /**
     * Fetches tasks from the Notion Tasks database.
     */
    async getTasks(): Promise<Task[]> {
        const dbId = import.meta.env.VITE_NOTION_DB_TASKS;
        if (!dbId) return [];

        const results = await this.queryDatabase(dbId);
        return results.map(page => this.mapTask(page));
    }

    /**
     * Fetches team members from the Notion Team database.
     */
    async getTeam(): Promise<any[]> {
        const dbId = import.meta.env.VITE_NOTION_DB_TEAM;
        if (!dbId) return [];

        const results = await this.queryDatabase(dbId);
        return results.map(page => this.mapTeamMember(page));
    }

    /**
     * Fetches calendar events from the Notion Calendar database.
     */
    async getCalendar(): Promise<CalendarEvent[]> {
        const dbId = import.meta.env.VITE_NOTION_DB_CALENDAR;
        if (!dbId) return [];

        const results = await this.queryDatabase(dbId);
        return results.map(page => this.mapCalendarEvent(page));
    }

    // --- Mappers ---

    private mapClient(page: any): Client {
        return {
            id: page.id,
            name: page.properties.Name?.title[0]?.plain_text || 'Unknown',
            type: (page.properties.Type?.select?.name as any) || 'fixed',
            status: (page.properties.Status?.select?.name as any) || 'active',
            notion_id: page.id
        };
    }

    private mapService(page: any): Service {
        return {
            id: page.id,
            name: page.properties.Name?.title[0]?.plain_text || 'Unknown',
            clientId: page.properties.Client?.relation[0]?.id || '',
            frequency: (page.properties.Frequency?.select?.name as any) || 'monthly'
        };
    }

    private mapTask(page: any): Task {
        return {
            id: page.id,
            title: page.properties.Name?.title[0]?.plain_text || 'Untitled',
            priority: (page.properties.Priority?.select?.name as any) || 'medium',
            status: (page.properties.Status?.status?.name as any) || 'todo',
            completed: page.properties.Status?.status?.name === 'done',
            deadline: page.properties.Deadline?.date?.start ? new Date(page.properties.Deadline.date.start) : undefined,
            clientId: page.properties.Client?.relation[0]?.id || '',
            assignedTo: page.properties['Assigned To']?.people[0]?.name || ''
        };
    }

    private mapTeamMember(page: any): any {
        return {
            id: page.id,
            name: page.properties.Name?.title[0]?.plain_text || 'Unknown',
            role: page.properties.Role?.select?.name || 'Member',
            avatar: page.properties.Avatar?.url || `https://ui-avatars.com/api/?name=${page.properties.Name?.title[0]?.plain_text || 'U'}`
        };
    }

    private mapCalendarEvent(page: any): CalendarEvent {
        return {
            id: page.id,
            title: page.properties.Name?.title[0]?.plain_text || 'Meeting',
            startTime: page.properties.Date?.date?.start ? new Date(page.properties.Date.date.start) : new Date(),
            type: (page.properties.Type?.select?.name as any) || 'meeting'
        };
    }

    /**
     * Legacy/Support methods
     */
    async provisionWorkspace(organizationId: string, orgName: string): Promise<{ success: boolean; workspaceId?: string }> {
        console.log(`🚀 [Notion] Provisioning workspace for ${orgName}...`);
        const webhookUrl = import.meta.env.VITE_NOTION_SYNC_WEBHOOK;
        if (!webhookUrl) return { success: false };
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'provision_workspace', organizationId, name: orgName })
        });
        return await response.json();
    }

    async checkSyncStatus(organizationId: string): Promise<'connected' | 'error' | 'disconnected'> {
        return 'disconnected';
    }
}

export const notionService = new NotionService();