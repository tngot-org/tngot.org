import fs from 'fs';
import { describe, it, expect } from 'vitest';

describe('event.json 非重複 ID 檢查', () => {
  it('應該具有唯一的 ID', () => {
    const raw = fs.readFileSync('public/data/event.json', 'utf8');
    const data = JSON.parse(raw);
    const seen = new Set<string>();
    data.forEach((item: { id: string }) => {
      expect(seen.has(item.id)).toBe(false);
      seen.add(item.id);
    });
  });
});
