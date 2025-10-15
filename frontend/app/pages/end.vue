<script lang="ts" setup>
definePageMeta({
  showAboutButton: true,
  theme: "splash",
});
</script>
<template>
  <div
    class="p-12 flex flex-col items-center justify-center text-secondary-950"
  >
    <h1 class="text-7xl mb-8 max-w-3xl text-center te">
      Ready to bring your vision to life?
    </h1>
    <p class="mb-4 font-semibold max-w-lg text-sm">
      Thank you for completing the quiz! You will receive the results in your
      email.
    </p>
    <p class="mb-4 max-w-lg text-center">
      Now that you have explored a range of media partnership ideas tailored to
      your project, let’s take the next step—together. Our team of experts is
      here to help you shape a strategy that’s not only aligned with your goals
      and audiences, but also creative and impactful.
    </p>
    <p class="font-semibold max-w-lg text-sm">
      Book a call with our experts and let’s co-create a media partnership that
      truly makes a difference.
    </p>
    <div class="flex flex-row justify-center mt-8">
      <UButton color="neutral">Book a call now.</UButton>
    </div>
  </div>
</template>
