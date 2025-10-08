<script lang="ts" setup>
const store = useAppStore();
</script>
<template>
  <div
    v-if="store.outcome"
    class="flex flex-col mx-auto max-w-5xl mt-12 rounded-2xl bg-secondary-800/70 p-4 border-2 border-secondary-400"
  >
    <h3 class="text-3xl mb-4">{{ store.outcome.title }}</h3>
    <p class="text-lg">{{ store.outcome.text }}</p>
    <div class="flex flex-row space-x-4">
      <h4 class="font-extrabold w-48 block">Proof point:</h4>
      <p>{{ store.outcome.proof }}</p>
    </div>
    <div class="flex flex-row justify-center">
      <UButton to="/end" size="xl">Next</UButton>
    </div>
  </div>
</template>
