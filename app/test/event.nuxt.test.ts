import fs from 'fs';
import { describe, it, expect } from 'vitest';

describe('event.json 非重複 ID 檢查', () => {
  it('應該具有唯一的 ID', () => {
    const raw = fs.readFileSync('public/data/event.json', 'utf8');
    const data = JSON.parse(raw);
    const seen = new Set<string>();
    const duplicates: { id: string; index: number }[] = [];

    data.forEach((item: { id: string }, index: number) => {
      if (seen.has(item.id)) {
        duplicates.push({ id: item.id, index });
      }
      seen.add(item.id);
    });

    if (duplicates.length > 0) {
      const errorMsg =
        `發現 ${duplicates.length} 個重複的 ID:\n` +
        duplicates
          .map((d) => `ID: "${d.id}" 在索引 ${d.index} 處重複出現`)
          .join('\n');
      // 使用 fail 替代 expect 來輸出更明確的錯誤信息
      expect(duplicates.length, errorMsg).toBe(0);
    }
  });
});
