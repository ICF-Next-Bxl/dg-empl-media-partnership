<script lang="ts" setup>
definePageMeta({
  hideAbout: true,
});

const router = useRouter();
</script>
<template>
  <div class="h-full flex flex-col justify-center items-center">
    <div class="fixed top-6 right-6">
      <UButton
        color="neutral"
        variant="ghost"
        icon="i-lucide-x"
        @click="router.back()"
      />
    </div>
    <h3 class="text-xl md:text-7xl mb-4">ICF Next:</h3>
    <h4 class="text-center md:text-left text-5xl mb-6">
      it's all about resonance
    </h4>
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
