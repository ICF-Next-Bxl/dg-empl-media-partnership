<script lang="ts" setup>
/**
 * This page serves as the introductory guide for the media partnership quiz.
 * It explains the purpose of the quiz and encourages users to start with a project in mind.
 */

definePageMeta({
  /**
   * Sets the theme for this page.
   * "default" theme likely controls layout, colors, or other UI elements globally.
   */
  theme: "default",
});
</script>

<template>
  <div class="px-12">
    <!-- Contains the guidebook introduction and call-to-action button. -->
    <!-- Structured content area using ActionSection layout component -->
    <ActionSection>
      <!-- Leading slot: displays the main heading of the page -->
      <template #leading>
        <h1 class="text-4xl md:text-6xl mb-8">
          The media partnership guidebook
        </h1>
      </template>

      <!-- Default slot: provides explanatory text about the quiz -->
      <template #default>
        <p class="mb-6">
          We have crafted this short pathfinder quiz to spark inspiration and
          help you explore the many ways media partnerships can elevate your
          project. Whether you are just starting to shape your strategy or
          looking to refine it, these ideas are designed to guide your thinking.
        </p>
        <p>
          By answering just 3 quick questions, you will unlock over 20
          partnership ideas, each one a stepping stone towards building
          meaningful connections with your audience.
        </p>
        <p>We recommend that you start this quiz with a project in mind.</p>
      </template>
    </ActionSection>

    <!-- Navigation section: start quiz button -->
    <div class="flex flex-row justify-center mt-[10dvh] space-x-8">
      <UButton to="/start">Let's start</UButton>
    </div>
  </div>
</template>
