<script lang="ts" setup>
/**
 * ICF Next page provides information about the company's media partnership philosophy
 * and highlights its approach to co-creation and audience engagement.
 */

definePageMeta({
  /**
   * Hides the "About" section in the layout or navigation.
   */
  hideAbout: true,
});

/**
 * Router instance for navigation actions.
 * Used here to allow users to go back to the previous page.
 */
const router = useRouter();
</script>

<template>
  <div class="h-full flex flex-col justify-center items-center">
    <!--
      Main container: centers content vertically and horizontally.
      Ensures responsive layout with full height.
    -->
    <!-- Close button in the top-right corner -->
    <div class="fixed top-6 right-6">
      <!-- Navigates to the previous page -->
      <UButton
        color="neutral"
        variant="ghost"
        icon="i-lucide-x"
        @click="router.back()"
      />
    </div>

    <!-- Headings -->
    <h3 class="text-xl md:text-7xl mb-4">ICF Next:</h3>
    <h4 class="text-center md:text-left text-5xl mb-6">
      it's all about resonance
    </h4>

    <!-- Paragraphs describing the company's media partnership approach -->
    <p class="max-w-164 text-center">
      At ICF Next, we place co-creation with media at the heart of our
      communication strategy. Just in the last four years, we have contacted
      over 130 media partners - in Europe and beyond - to work together on
      solutions for our clients.
    </p>
    <p class="max-w-164 text-center">
      Our approach to media partnerships is diverse and tailored to specific
      needs, from ad campaigns and branded content that subtly promotes the
      campaign's messages, to full-blown collaborations that include creative
      and storytelling services, distribution strategies and audience engagement
      opportunities.
    </p>
  </div>
</template>
