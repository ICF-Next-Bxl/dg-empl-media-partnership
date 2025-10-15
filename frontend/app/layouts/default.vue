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
    <main class="page max-w-5xl mt-[10sdv]">
      <div
        v-if="route.meta.showAboutButton === true"
        class="fixed top-6 right-6"
      >
        <UButton color="neutral" variant="ghost" to="/about">About</UButton>
      </div>
      <slot />
    </main>
  </div>
</template>
