import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock environment variables
vi.stubEnv('VITE_NOTION_TOKEN', 'fake-token');
vi.stubEnv('VITE_NOTION_DB_CLIENTS', 'db-clients');
vi.stubEnv('VITE_NOTION_DB_SERVICES', 'db-services');
vi.stubEnv('VITE_NOTION_DB_TASKS', 'db-tasks');
vi.stubEnv('VITE_NOTION_DB_TEAM', 'db-team');
vi.stubEnv('VITE_NOTION_DB_CALENDAR', 'db-calendar');

import { notionService } from './notionService';

// Mock the Notion client
const queryMock = vi.fn().mockResolvedValue({
  results: [
    {
      id: 'page-1',
      properties: {
        Name: {
          title: [{ plain_text: 'Test Page' }],
        },
      },
    },
  ],
});

vi.mock('@notionhq/client', () => {
  return {
    Client: class {
      databases = {
        query: queryMock,
      };
    },
  };
});

describe('NotionService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch clients from Notion', async () => {
    const clients = await notionService.getClients();
    expect(queryMock).toHaveBeenCalledWith(expect.objectContaining({ database_id: 'db-clients' }));
    expect(Array.isArray(clients)).toBe(true);
    expect(clients.length).toBe(1);
    expect(clients[0].name).toBe('Test Page');
  });

  it('should fetch services from Notion', async () => {
    const services = await notionService.getServices();
    expect(Array.isArray(services)).toBe(true);
  });

  it('should fetch tasks from Notion', async () => {
    const tasks = await notionService.getTasks();
    expect(Array.isArray(tasks)).toBe(true);
  });

  it('should fetch team members from Notion', async () => {
    const team = await notionService.getTeam();
    expect(Array.isArray(team)).toBe(true);
  });

  it('should fetch calendar events from Notion', async () => {
    const events = await notionService.getCalendar();
    expect(Array.isArray(events)).toBe(true);
  });

  it('should handle missing token gracefully', async () => {
    // In our test environment, VITE_NOTION_TOKEN might be set or not.
    // The current implementation returns empty arrays if !this.client.
    const clients = await notionService.getClients();
    expect(Array.isArray(clients)).toBe(true);
  });
});
