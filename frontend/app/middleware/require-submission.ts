/**
 * Nuxt Route Middleware: Require Submission
 *
 * This middleware ensures that a user cannot access certain quiz pages
 * unless they have an active quiz submission.
 *
 * If no submission exists in the store, the user is redirected to the home page ("/").
 */

export default defineNuxtRouteMiddleware(() => {
  const store = useAppStore();

  // Check if there is an active submission
  if (!store.submission) {
    // Redirect to home page if submission is missing
    return navigateTo("/");
  }
});
