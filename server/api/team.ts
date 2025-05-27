export default defineEventHandler(async () => {
  try {
    // 從 Google Apps Script 獲取完整團隊資料（包含 totalMembers 和 groups）
    const response = await $fetch(
      'https://script.google.com/macros/s/AKfycbxftUVe7aSwmCsck0xOCmbXIitS6DfxyOHMjOfbocZ5uyVcZLGbk9Cil5_IfBE5HkCHSw/exec'
    );

    return response;
  } catch (error) {
    // 如果動態獲取失敗，返回新結構的備用資料
    console.error('Failed to fetch team data from Google Apps Script:', error);

    // 使用 server assets 中的備用資料
    const assets = useStorage('assets:server');
    const fallbackData = await assets.getItem('team-new-structure.json');

    if (fallbackData) {
      return fallbackData;
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch team data'
    });
  }
});
