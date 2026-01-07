import { describe, it, expect } from 'vitest';
import { geminiService } from './geminiService';

describe('geminiService', () => {
  it('should parse client_summary actions', () => {
    const text = 'Here is the summary:\n```action:client_summary\n{"clientId": "123"}\n```';
    // @ts-ignore
    const { cleanContent, actions } = geminiService.parseActions(text);
    
    expect(cleanContent).toBe('Here is the summary:');
    expect(actions).toHaveLength(1);
    expect(actions[0].type).toBe('client_summary');
    expect(actions[0].data.clientId).toBe('123');
  });

  it('should parse data_table actions', () => {
    const text = 'Check this table:\n```action:data_table\n{"title": "Stats", "headers": ["A"], "rows": [["B"]]}\n```';
    // @ts-ignore
    const { cleanContent, actions } = geminiService.parseActions(text);
    
    expect(cleanContent).toBe('Check this table:');
    expect(actions).toHaveLength(1);
    expect(actions[0].type).toBe('data_table');
    expect(actions[0].data.title).toBe('Stats');
  });
});
