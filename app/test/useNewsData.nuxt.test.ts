import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { CategoryType } from '../types/category';
import { validateDate } from '../utils/dateValidator';

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

    newsJsonData.items.forEach((item: { date: string; title: string }) => {
      const validation = validateDate(item.date);
      if (!validation.isValid) {
        // 提供更詳細的錯誤訊息
        const errorMessage = `新聞「${item.title}」日期格式錯誤: ${validation.error}`;
        expect(validation.isValid, errorMessage).toBe(true);
      }
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
