import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { CategoryType } from '../types/category';

// 用於測試日期格式
describe('news.json 日期格式', () => {
  // 取得 news.json 文件內容
  const getNewsJsonData = () => {
    const filePath = path.resolve(process.cwd(), './public/data/news.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  };

  it('所有新聞日期應該符合 yyyy/MM/dd 格式', () => {
    const newsJsonData = getNewsJsonData();
    const dateFormatRegex = /^\d{4}\/\d{2}\/\d{2}$/; // 符合 yyyy/MM/dd 的正則表達式

    newsJsonData.items.forEach((item: { date: string }) => {
      expect(item.date).toMatch(dateFormatRegex);

      // 進一步驗證月份和日期的範圍
      const [year, month, day] = item.date.split('/').map(Number);

      // 檢查年份是否是有效的四位數字
      expect(year).toBeGreaterThanOrEqual(1000);
      expect(year).toBeLessThanOrEqual(9999);

      // 檢查月份是否在1-12之間
      expect(month).toBeGreaterThanOrEqual(1);
      expect(month).toBeLessThanOrEqual(12);

      // 檢查日期是否在1-31之間
      expect(day).toBeGreaterThanOrEqual(1);
      expect(day).toBeLessThanOrEqual(31);

      // 檢查每個月的日期是否有效
      const isValidDate = !isNaN(
        new Date(item.date.replace(/\//g, '-')).getTime()
      );
      expect(isValidDate).toBe(true);
    });
  });

  // 測試分類枚舉與 JSON 數據的一致性
  it('確保 news.json 中的分類與 CategoryType 枚舉一致', () => {
    const newsJsonData = getNewsJsonData();

    // 檢查所有新聞項目的分類是否都在枚舉中定義
    newsJsonData.items.forEach((item: { category: string }) => {
      const isValidCategory = Object.values(CategoryType).includes(
        item.category as CategoryType
      );
      expect(isValidCategory).toBe(true);
    });
  });
});
