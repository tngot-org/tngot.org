import type { EventItem } from '../../app/types/event';

export default defineEventHandler(async () => {
  // https://nitro.unjs.io/guide/assets#server-assets
  const assets = useStorage('assets:server');
  const eventData = (await assets.getItem('event.json')) as EventItem[];

  return eventData || [];
});
