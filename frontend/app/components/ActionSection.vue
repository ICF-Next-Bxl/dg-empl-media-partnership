<template>
  <div class="flex w-full items-center">
    <section class="flex-1 text-right pr-4 animate-slide-left">
      <slot name="leading" />
    </section>
    <div class="border-l border-white w-0.5 self-stretch" />
    <section class="flex-1 pl-6 animate-slide-right delay-300">
      <slot name="default" />
    </section>
  </div>
</template>
