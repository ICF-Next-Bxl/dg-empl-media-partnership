<script setup lang="ts">
/**
 * This page displays the final result ("outcome") of a user's quiz submission.
 * It requires that a valid submission and outcome exist before rendering.
 */

definePageMeta({
  /**
   * Page metadata defining route middleware.
   * The "require-outcome" middleware ensures that the user
   * has a completed submission with an outcome before accessing this page.
   */
  middleware: "require-outcome",
});

/**
 * Access the global application store.
 * The store contains the submission data and computed state.
 */
const store = useAppStore();
</script>

<template>
  <div
    v-if="store.submission?.is_complete && store.submission?.outcome"
    class="flex flex-col items-center justify-center"
  >
    <!--
      The main result display area.
      This section only renders if a submission exists,
      is marked as complete, and has an associated outcome.
    -->
    <!-- ActionSection is a layout component used to structure the result display -->
    <ActionSection>
      <!-- Leading slot: displays the title and result heading -->
      <template #leading>
        <p class="text-3xl md:text-5xl">Your result</p>
        <h1 class="text-4xl md:text-6xl mb-4">
          {{ store.submission.outcome.title }}
        </h1>
      </template>

      <!-- Default slot: displays the result description and proof point -->
      <template #default>
        <p class="md:text-lg font-semibold">
          {{ store.submission.outcome.text }}
        </p>

        <h2 class="underline mb-4">Proof point:</h2>
        <p class="text-sm md:text-base">
          {{ store.submission.outcome.proof }}
        </p>
      </template>
    </ActionSection>

    <!-- Navigation button to continue to the next page -->
    <div class="mt-[10dvh]">
      <UButton to="/end">Next</UButton>
    </div>
  </div>
</template>
