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
     * Fetches clients from the Notion Clients database.
     */
    async getClients(): Promise<Client[]> {
        const client = this.getClient();
        const dbId = import.meta.env.VITE_NOTION_DB_CLIENTS;
        if (!dbId || !client) return [];

        try {
            const response = await client.databases.query({ database_id: dbId });
            // Mapping logic will be implemented in the next task
            return response.results.map((page: any) => ({
                id: page.id,
                name: page.properties.Name?.title[0]?.plain_text || 'Unknown',
                type: 'fixed',
                status: 'active'
            })) as Client[];
        } catch (error) {
            console.error('Error fetching clients from Notion:', error);
            return [];
        }
    }

    /**
     * Fetches services from the Notion Services database.
     */
    async getServices(): Promise<Service[]> {
        const client = this.getClient();
        const dbId = import.meta.env.VITE_NOTION_DB_SERVICES;
        if (!dbId || !client) return [];

        try {
            const response = await client.databases.query({ database_id: dbId });
            return response.results.map((page: any) => ({
                id: page.id,
                name: page.properties.Name?.title[0]?.plain_text || 'Unknown',
                clientId: ''
            })) as Service[];
        } catch (error) {
            console.error('Error fetching services from Notion:', error);
            return [];
        }
    }

    /**
     * Fetches tasks from the Notion Tasks database.
     */
    async getTasks(): Promise<Task[]> {
        const client = this.getClient();
        const dbId = import.meta.env.VITE_NOTION_DB_TASKS;
        if (!dbId || !client) return [];

        try {
            const response = await client.databases.query({ database_id: dbId });
            return response.results.map((page: any) => ({
                id: page.id,
                title: page.properties.Name?.title[0]?.plain_text || 'Untitled',
                priority: 'medium',
                status: 'todo',
                completed: false
            })) as Task[];
        } catch (error) {
            console.error('Error fetching tasks from Notion:', error);
            return [];
        }
    }

    /**
     * Fetches team members from the Notion Team database.
     */
    async getTeam(): Promise<any[]> {
        const client = this.getClient();
        const dbId = import.meta.env.VITE_NOTION_DB_TEAM;
        if (!dbId || !client) return [];

        try {
            const response = await client.databases.query({ database_id: dbId });
            return response.results.map((page: any) => ({
                id: page.id,
                name: page.properties.Name?.title[0]?.plain_text || 'Unknown',
                role: 'Member'
            }));
        } catch (error) {
            console.error('Error fetching team from Notion:', error);
            return [];
        }
    }

    /**
     * Fetches calendar events from the Notion Calendar database.
     */
    async getCalendar(): Promise<CalendarEvent[]> {
        const client = this.getClient();
        const dbId = import.meta.env.VITE_NOTION_DB_CALENDAR;
        if (!dbId || !client) return [];

        try {
            const response = await client.databases.query({ database_id: dbId });
            return response.results.map((page: any) => ({
                id: page.id,
                title: page.properties.Name?.title[0]?.plain_text || 'Meeting',
                startTime: new Date()
            })) as CalendarEvent[];
        } catch (error) {
            console.error('Error fetching calendar from Notion:', error);
            return [];
        }
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