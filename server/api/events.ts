export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const locale = query.locale || 'zh-TW';

  // https://nitro.unjs.io/guide/assets#server-assets
  const assets = useStorage('assets:server');
  const eventData = (await assets.getItem(
    `event-${locale}.json`
  )) as EventItem[];

  if (!eventData) {
    const defaultData = (await assets.getItem(
      `event-zh-TW.json`
    )) as EventItem[];
    return defaultData || [];
  }

  return eventData || [];
});
