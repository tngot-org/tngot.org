import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { validateImage } from '../utils/fileValidator';
import { validateDate } from '../utils/dateValidator';

describe('event.json 資料驗證測試', () => {
  // 取得 event.json 文件內容
  const getEventJsonData = (): EventItem[] => {
    const filePath = path.resolve(process.cwd(), './public/data/event.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  };

  it('應該具有唯一的 ID', () => {
    const eventData = getEventJsonData();
    const seen = new Set<string>();
    const duplicates: { id: string; index: number }[] = [];

    eventData.forEach((item, index) => {
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
      expect(duplicates.length, errorMsg).toBe(0);
    }
  });

  it('應該具有有效的圖片路徑', () => {
    const eventData = getEventJsonData();

    eventData.forEach((eventItem) => {
      // 首先確認結構正確
      expect(eventItem).toHaveProperty('id');
      expect(eventItem).toHaveProperty('detail');
      expect(eventItem.detail).toHaveProperty('card');
      expect(eventItem.detail.card).toHaveProperty('image');

      // 確認圖片是陣列
      const images = eventItem.detail.card.image;
      expect(Array.isArray(images)).toBe(true);

      // 檢查每個圖片路徑是否有效
      images.forEach((imagePath: string) => {
        const validation = validateImage(imagePath);
        if (!validation.isValid) {
          // 提供更詳細的錯誤訊息
          const errorMessage = `活動 "${eventItem.id}" 的圖片路徑錯誤: ${validation.error}`;
          expect(validation.isValid, errorMessage).toBe(true);
        }
      });
    });
  });

  it('應該具有有效的日期格式', () => {
    const eventData = getEventJsonData();

    eventData.forEach((eventItem) => {
      if (eventItem.detail && eventItem.detail.date) {
        // 將 yyyy-MM-dd 轉換為 yyyy/MM/dd 格式再驗證
        const dateStr = eventItem.detail.date.replace(/-/g, '/');
        const validation = validateDate(dateStr);

        if (!validation.isValid) {
          // 提供更詳細的錯誤訊息
          const errorMessage = `活動 "${eventItem.id}" 的日期格式錯誤: ${validation.error}`;
          expect(validation.isValid, errorMessage).toBe(true);
        }
      }
    });
  });
});
