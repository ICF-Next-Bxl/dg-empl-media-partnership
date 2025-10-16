<script lang="ts" setup>
/**
 * This page serves as the final step of the quiz flow.
 * It thanks the user, summarizes the purpose of the quiz,
 * and encourages them to take the next step by booking a call.
 */
</script>

<template>
  <div
    class="page--end p-4 md:p-12 flex flex-col items-center justify-center text-secondary-500 opacity-0 animate-fade-in delay-[2s] duration-1000"
  >
    <!--
      Main container for the end page content.
      Includes fade-in animation and responsive padding.
    -->
    <!-- Page heading -->
    <h1 class="text-3xl md:text-7xl mb-8 max-w-3xl text-center">
      Ready to bring your vision to life?
    </h1>

    <!-- Thank you message -->
    <p class="mb-4 font-semibold max-w-lg text-sm">
      Thank you for completing the quiz! You will receive the results in your
      email.
    </p>

    <!-- Context / next step explanation -->
    <p class="mb-4 max-w-lg text-center">
      Now that you have explored a range of media partnership ideas tailored to
      your project, let’s take the next step—together. Our team of experts is
      here to help you shape a strategy that’s not only aligned with your goals
      and audiences, but also creative and impactful.
    </p>

    <!-- Call-to-action encouragement -->
    <p class="font-semibold max-w-lg text-sm">
      Book a call with our experts and let’s co-create a media partnership that
      truly makes a difference.
    </p>

    <!-- Navigation / CTA button -->
    <div class="flex flex-row justify-center mt-8">
      <UButton color="neutral" to="/">Book a call now.</UButton>
    </div>
  </div>
</template>
