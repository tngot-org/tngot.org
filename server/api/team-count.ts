export default defineEventHandler(async () => {
  // 從 Google 試算表獲取實際總人數

  try {
    const data = await $fetch<{ members: number }>(
      'https://script.google.com/macros/s/AKfycbx1PCyuA_k2rBD4PxITVGe6atflFEAFRYNmxjgLXkpbQC7WS9aTXpRHPL18gmWZKBlOJQ/exec'
    );
    // 回傳實際總人數數據
    return {
      totalMemberCount: data.members
    };
  } catch {
    throw createError({
      statusCode: 500,
      message: '無法取得團隊人數'
    });
  }
});
