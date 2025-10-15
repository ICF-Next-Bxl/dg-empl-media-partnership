<script setup lang="ts">
definePageMeta({
  middleware: "require-outcome",
  showAboutButton: true,
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
        <p class="text-5xl">Your result</p>
        <h1 class="text-7xl mb-4">{{ store.submission.outcome.title }}</h1>
      </template>
      <template #default>
        <p class="text-lg font-semibold">{{ store.submission.outcome.text }}</p>
        <h2 class="underline mb-4">Proof point:</h2>
        <p>{{ store.submission.outcome.proof }}</p>
      </template>
    </ActionSection>
    <div class="mt-48">
      <UButton to="/end">Next</UButton>
    </div>
  </div>
</template>
