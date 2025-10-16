<script lang="ts" setup>
/**
 * Main layout component for the application.
 *
 * This layout handles:
 * - Dynamic theming via route metadata (`route.meta.theme`)
 * - Display of the ICF Next logo
 * - Optional "About" button based on route metadata (`route.meta.hideAbout`)
 * - Slot for page-specific content
 */

const route = useRoute();
</script>

<template>
  <div
    :class="[
      'layout grid place-content-center',
      `layout--${route.meta.theme ?? 'default'}`,
    ]"
  >
    <!--
      Container with dynamic classes for theming and grid layout.
      Applies a default theme if `route.meta.theme` is not specified.
    -->
    <!-- Fixed top-left logo -->
    <div class="fixed top-6 left-6">
      <img src="~/assets/img/logo.svg" alt="ICF Next" />
    </div>

    <!-- Optional "About" button, only shown if `hideAbout` is not true -->
    <div v-if="route.meta.hideAbout !== true" class="fixed top-6 right-6">
      <UButton color="neutral" variant="ghost" to="/about">About</UButton>
    </div>

    <!-- Main content area, receives page-specific content via slot -->
    <main class="page max-w-5xl my-[15dvh] md:my-[10dvh] p-8">
      <slot />
    </main>
  </div>
</template>
