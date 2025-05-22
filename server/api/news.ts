import { readFileSync } from 'fs';
import { resolve } from 'path';

export default defineEventHandler(async () => {
  try {
    // 讀取 news.json 檔案
    const filePath = resolve(process.cwd(), 'public/data/news.json');
    const fileContent = readFileSync(filePath, 'utf-8');
    const newsData = JSON.parse(fileContent);

    // 回傳新聞資料
    return newsData;
  } catch (error) {
    console.error('Error loading news data:', error);
    throw createError({
      statusCode: 500,
      message: '無法載入新聞資料'
    });
  }
});
