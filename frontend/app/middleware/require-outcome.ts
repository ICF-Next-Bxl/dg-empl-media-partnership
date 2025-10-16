/**
 * Nuxt Route Middleware: Require Outcome
 *
 * This middleware ensures that a user cannot access certain pages
 * unless their quiz submission has a completed outcome.
 *
 * If the submission does not exist or does not have an outcome,
 * the user is redirected to the home page ("/").
 */

export default defineNuxtRouteMiddleware(() => {
  const store = useAppStore();

  // Check if the current submission has a completed outcome
  if (!store.submission?.outcome) {
    // Redirect user to home page if no outcome exists
    return navigateTo("/");
  }
});
