export default defineEventHandler(async () => {
  try {
    const response = await $fetch(
      'https://script.google.com/macros/s/AKfycbxftUVe7aSwmCsck0xOCmbXIitS6DfxyOHMjOfbocZ5uyVcZLGbk9Cil5_IfBE5HkCHSw/exec'
    );

    return response;
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch team data'
    });
  }
});
