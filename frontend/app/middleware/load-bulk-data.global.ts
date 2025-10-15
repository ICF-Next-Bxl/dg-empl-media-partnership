export default defineNuxtRouteMiddleware(async () => {
  const dataStore = useAppStore();
  if (!dataStore.isLoaded && !dataStore.isLoading) {
    try {
      await dataStore.loadBulkData();
    } catch (err) {
      // @ts-expect-error — https://nuxt.com/docs/4.x/api/utils/abort-navigation#err-as-an-error-object
      return abortNavigation(err);
    }
  }
});
