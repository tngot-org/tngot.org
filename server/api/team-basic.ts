export default defineEventHandler(async () => {
  // https://nitro.unjs.io/guide/assets#server-assets
  const assets = useStorage('assets:server');
  const teamData = await assets.getItem('team.json');

  return teamData;
});
