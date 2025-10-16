<script lang="ts" setup>
const route = useRoute();
</script>
<template>
  <div
    :class="[
      'layout grid place-content-center',
      `layout--${route.meta.theme ?? 'default'}`,
    ]"
  >
    <main class="page max-w-5xl my-[10dvh]">
      <div class="fixed top-6 left-6">
        <img src="~/assets/img/logo.svg" alt="ICF Next" />
      </div>
      <div v-if="route.meta.hideAbout !== true" class="fixed top-6 right-6">
        <UButton color="neutral" variant="ghost" to="/about">About</UButton>
      </div>
      <slot />
    </main>
  </div>
</template>
