export default defineNuxtRouteMiddleware(() => {
  const store = useAppStore();
  if (!store.submission) {
    return navigateTo("/");
  }
});
