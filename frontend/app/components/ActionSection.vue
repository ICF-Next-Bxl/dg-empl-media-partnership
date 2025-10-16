<template>
  <div class="flex flex-col w-full md:items-center md:flex-row">
    <section
      class="flex-1 animate-slide-top md:animate-slide-left md:text-right md:pr-4"
    >
      <slot name="leading" />
    </section>
    <div class="border-white border-b md:border-l md:w-0.5 self-stretch" />
    <section
      class="flex-1 pt-6 animate-slide-bottom md:pl-6 md:pt-0 md:animate-slide-right delay-500"
    >
      <slot name="default" />
    </section>
  </div>
</template>
