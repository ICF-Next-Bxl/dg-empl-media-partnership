export default defineNuxtRouteMiddleware(() => {
  const store = useAppStore();

  if (!store.submission?.outcome) {
    return navigateTo("/");
  }
});
