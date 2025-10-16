<template>
  <!--
    ActionSection layout component.

    This component is designed to split content into two sections:
    - Leading section (slot `leading`) on the left/top
    - Default section (slot `default`) on the right/bottom
    Includes responsive animations and a divider between sections.
  -->
  <div class="flex flex-col w-full md:items-center md:flex-row">
    <!-- Leading section -->
    <section
      class="flex-1 animate-slide-top md:animate-slide-left md:text-right md:pr-4"
    >
      <!-- Slot for leading content (e.g., headings, introductory text) -->
      <slot name="leading" />
    </section>

    <!-- Divider line between sections -->
    <div class="border-white border-b md:border-l md:w-0.5 self-stretch" />

    <!-- Default section -->
    <section
      class="flex-1 pt-6 animate-slide-bottom md:pl-6 md:pt-0 md:animate-slide-right delay-500"
    >
      <!-- Slot for default content (e.g., main text, inputs, or buttons) -->
      <slot name="default" />
    </section>
  </div>
</template>
