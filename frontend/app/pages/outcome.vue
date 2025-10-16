<script setup lang="ts">
definePageMeta({
  middleware: "require-outcome",
});
const store = useAppStore();
</script>
<template>
  <div
    v-if="store.submission?.is_complete && store.submission?.outcome"
    class="flex flex-col items-center justify-center"
  >
    <ActionSection>
      <template #leading>
        <p class="text-3xl md:text-5xl">Your result</p>
        <h1 class="text-4xl md:text-6xl mb-4">
          {{ store.submission.outcome.title }}
        </h1>
      </template>
      <template #default>
        <p class="md:text-lg font-semibold">
          {{ store.submission.outcome.text }}
        </p>
        <h2 class="underline mb-4">Proof point:</h2>
        <p class="text-sm md:text-base">{{ store.submission.outcome.proof }}</p>
      </template>
    </ActionSection>
    <div class="mt-[10dvh]">
      <UButton to="/end">Next</UButton>
    </div>
  </div>
</template>
