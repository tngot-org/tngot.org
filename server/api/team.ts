import { readFileSync } from 'fs';
import { resolve } from 'path';

export default defineEventHandler(async () => {
  try {
    // 讀取 team.json 檔案
    const filePath = resolve(process.cwd(), 'app/assets/data/team.json');
    const fileContent = readFileSync(filePath, 'utf-8');
    const teamData = JSON.parse(fileContent);

    // 從 Google 試算表獲取實際總人數
    let actualMemberCount = 0;
    let fetchFailed = false;
    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbx1PCyuA_k2rBD4PxITVGe6atflFEAFRYNmxjgLXkpbQC7WS9aTXpRHPL18gmWZKBlOJQ/exec'
      );
      const data = await response.json();
      actualMemberCount = data.members;
    } catch (fetchError) {
      console.error(
        'Error fetching member count from Google Sheet:',
        fetchError
      );
      // 設置獲取失敗標誌
      fetchFailed = true;
    }

    // 將實際總人數添加到返回數據中
    return {
      ...teamData,
      totalMemberCount: actualMemberCount,
      fetchFailed: fetchFailed
    };
  } catch (error) {
    console.error('Error loading team data:', error);
    throw createError({
      statusCode: 500,
      message: '無法載入團隊資料'
    });
  }
});
