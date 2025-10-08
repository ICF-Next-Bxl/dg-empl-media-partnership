<script lang="ts" setup>
const { setTheme, currentTheme } = useAppTheme();
const onTheme = (theme: "default" | "sand" | "artic") => {
  setTheme(theme);
};
</script>
<template>
  <div
    class="layout layout--default bg-linear-80 from-secondary-500 to-secondary-900"
  >
    <header
      class="fixed top-0 w-full py-4 bg-secondary-500/50 backdrop-blur-sm z-50"
    >
      <div
        class="flex flex-row space-x-4 items-center justify-end w-full max-w-5xl mx-auto"
      >
        <UButton to="/" icon="i-lucide-home">Home</UButton>
        <UButton to="/chat" icon="i-lucide-message-circle">Chat</UButton>
        <UButton
          icon="i-lucide-target"
          :variant="currentTheme === 'default' ? 'solid' : 'soft'"
          @click="onTheme('default')"
          >Theme Default</UButton
        >
        <UButton
          icon="i-lucide-sun"
          :variant="currentTheme === 'sand' ? 'solid' : 'soft'"
          @click="onTheme('sand')"
          >Theme Sand</UButton
        >
        <UButton
          icon="i-lucide-snowflake"
          :variant="currentTheme === 'artic' ? 'solid' : 'soft'"
          @click="onTheme('artic')"
          >Theme Artic</UButton
        >
      </div>
    </header>
    <main class="page grid place-content-center min-h-screen">
      <slot />
    </main>
    <footer class="fixed bottom-0 bg-secondary-800 p-8">
      <h3>ICF Next: it's all about resonance</h3>
      <p>
        At ICF Next, we place co-creation with media at the heart of our
        communication strategy. Just in the last four years, we have contacted
        over 130 media partners - in Europe and beyond - to work together on
        solutions for our clients.
      </p>
      <p>
        Our approach to media partnerships is diverse and tailored to specific
        needs, from ad campaigns and branded content that subtly promotes the
        campaign's messages, to full-blown collaborations that include creative
        and storytelling services, distribution strategies and audience
        engagement opportunities.
      </p>
    </footer>
  </div>
</template>
