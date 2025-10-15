<script setup lang="ts">
definePageMeta({
  middleware: "require-outcome",
});
const store = useAppStore();
</script>
<template>
  <div
    v-if="store.submission?.is_complete && store.submission?.outcome"
    class="flex flex-col mx-auto max-w-5xl mt-12 rounded-2xl bg-secondary-800/70 p-4 border-2 border-secondary-400"
  >
    <h3 class="text-3xl mb-4">{{ store.submission.outcome.title }}</h3>
    <p class="text-lg">{{ store.submission.outcome.text }}</p>
    <div class="flex flex-row space-x-4">
      <h4 class="font-extrabold w-48 block">Proof point:</h4>
      <p>{{ store.submission.outcome.proof }}</p>
    </div>
    <div class="flex flex-row justify-center">
      <UButton to="/end" size="xl">Next</UButton>
    </div>
  </div>
</template>
