import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { validateImage } from '../utils/fileValidator';
import { validateDate } from '../utils/dateValidator';
import type { EventData } from '../types/event';

// 定義符合 event.json 數據結構的介面
// 使用 type 避免重複定義，並與 event.ts 保持一致
type EventItem = {
  id: string;
  detail: EventData;
};

describe('event.json 圖片與日期測試', () => {
  // 取得 event.json 文件內容
  const getEventJsonData = (): EventItem[] => {
    const filePath = path.resolve(process.cwd(), './public/data/event.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  };

  it('應該具有有效的圖片路徑', () => {
    const eventData = getEventJsonData();

    eventData.forEach((eventItem: EventItem) => {
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

    eventData.forEach((eventItem: EventItem) => {
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
