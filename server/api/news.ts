import { readFileSync } from 'fs';
import { resolve } from 'path';
import type { RawNewsItem } from '../../app/types/news';

export default defineEventHandler(async () => {
  try {
    // 讀取 news.json 檔案
    const filePath = resolve(process.cwd(), './server/data/news.json');
    const fileContent = readFileSync(filePath, 'utf-8');

    // 解析 JSON 並返回 items 陣列
    const data = JSON.parse(fileContent);
    return data.items as RawNewsItem[];
  } catch (error) {
    console.error('Error loading news data:', error);
    throw createError({
      statusCode: 500,
      message: '無法載入新聞資料'
    });
  }
});
