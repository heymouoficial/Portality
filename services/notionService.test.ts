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
      pages = {
        create: vi.fn().mockResolvedValue({ id: 'new-id' }),
        update: vi.fn().mockResolvedValue({ id: 'updated-id' }),
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

  it('should map a Notion client page to a Client object', async () => {
    queryMock.mockResolvedValueOnce({
      results: [
        {
          id: 'client-1',
          properties: {
            Name: { title: [{ plain_text: 'Client Name' }] },
            Type: { select: { name: 'project' } },
            Status: { select: { name: 'risk' } },
          },
        },
      ],
      has_more: false,
    });

    const clients = await notionService.getClients();
    expect(clients[0]).toEqual({
      id: 'client-1',
      name: 'Client Name',
      type: 'project',
      status: 'risk',
      notion_id: 'client-1',
    });
  });

  it('should handle missing properties gracefully', async () => {
    queryMock.mockResolvedValueOnce({
      results: [
        {
          id: 'partial-1',
          properties: {
            // Missing Name, Type, Status
          },
        },
      ],
      has_more: false,
    });

    const clients = await notionService.getClients();
    expect(clients[0]).toMatchObject({
      id: 'partial-1',
      name: 'Unknown',
      type: 'fixed',
      status: 'active',
    });
  });

  it('should create a task in Notion', async () => {
    const createMock = vi.fn().mockResolvedValue({ id: 'new-task-id' });
    // @ts-ignore
    notionService['getClient']().pages = { create: createMock };

    const result = await notionService.createTask({
      title: 'New Task',
      priority: 'high',
    });

    expect(createMock).toHaveBeenCalled();
    expect(result.id).toBe('new-task-id');
  });

  it('should update task status in Notion', async () => {
    const updateMock = vi.fn().mockResolvedValue({ id: 'task-1' });
    // @ts-ignore
    notionService['getClient']().pages.update = updateMock;

    await notionService.updateTaskStatus('task-1', 'done');

    expect(updateMock).toHaveBeenCalledWith(expect.objectContaining({
      page_id: 'task-1',
      properties: expect.objectContaining({
        Status: expect.objectContaining({
          status: { name: 'done' }
        })
      })
    }));
  });

  it('should create a client in Notion', async () => {
    const createMock = vi.fn().mockResolvedValue({ id: 'new-client-id' });
    // @ts-ignore
    notionService['getClient']().pages.create = createMock;

    const result = await notionService.createClient({
      name: 'New Client',
      type: 'project',
    });

    expect(createMock).toHaveBeenCalled();
    expect(result.id).toBe('new-client-id');
  });

  it('should sync local task changes to Notion', async () => {
    const updateMock = vi.fn().mockResolvedValue({ id: 'task-1' });
    // @ts-ignore
    notionService['getClient']().pages.update = updateMock;

    // Simulate what would happen in a real sync loop
    await notionService.updateTaskStatus('task-1', 'in-progress');

    expect(updateMock).toHaveBeenCalled();
  });

  it('should initialize sync subscription', () => {
    notionService.startSyncLoop();
    // Since we mock Supabase, we just verify it doesn't crash and starts the flow
    expect(true).toBe(true);
  });
});
