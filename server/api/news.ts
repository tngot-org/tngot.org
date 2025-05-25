export default defineEventHandler(async () => {
  // https://nitro.unjs.io/guide/assets#server-assets
  const assets = useStorage('assets:server');
  const newsData = (await assets.getItem('news.json')) as {
    items: RawNewsItem[];
  };

  return newsData?.items || [];
});
