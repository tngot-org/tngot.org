export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const locale = query.locale || 'zh-TW';

  // https://nitro.unjs.io/guide/assets#server-assets
  const assets = useStorage('assets:server');
  const newsData = (await assets.getItem(`news-${locale}.json`)) as {
    items: RawNewsItem[];
  };

  if (!newsData) {
    const defaultData = (await assets.getItem(`news-zh-TW.json`)) as {
      items: RawNewsItem[];
    };
    return defaultData?.items || [];
  }

  return newsData?.items || [];
});
