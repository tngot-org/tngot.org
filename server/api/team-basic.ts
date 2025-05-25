import { readFileSync } from 'fs';
import { resolve } from 'path';

export default defineEventHandler(async () => {
  try {
    // 讀取 team.json 檔案
    const filePath = resolve(process.cwd(), './server/data/team.json');
    const fileContent = readFileSync(filePath, 'utf-8');
    const teamData = JSON.parse(fileContent);

    // 回傳基本團隊資料
    return teamData;
  } catch (error) {
    console.error('Error loading basic team data:', error);
    throw createError({
      statusCode: 500,
      message: '無法載入基本團隊資料'
    });
  }
});
