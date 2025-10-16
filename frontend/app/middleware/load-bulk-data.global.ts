/**
 * Nuxt Route Middleware: Load Bulk Data
 *
 * This middleware ensures that the application's bulk quiz data
 * is loaded before navigating to a route that requires it.
 *
 * If the data is already loaded or is currently loading, it does nothing.
 * Otherwise, it triggers `loadBulkData()` from the store.
 *
 * If an error occurs during loading, navigation is aborted.
 */

export default defineNuxtRouteMiddleware(async () => {
  const dataStore = useAppStore();

  // Check if the store has already loaded the data or is currently loading
  if (!dataStore.isLoaded && !dataStore.isLoading) {
    try {
      // Load the bulk quiz data (questions, outcomes, etc.)
      await dataStore.loadBulkData();
    } catch (err) {
      // Abort navigation if an error occurs during data loading
      // @ts-expect-error — Nuxt’s abortNavigation typing workaround
      // Documentation: https://nuxt.com/docs/4.x/api/utils/abort-navigation#err-as-an-error-object
      return abortNavigation(err);
    }
  }
});
