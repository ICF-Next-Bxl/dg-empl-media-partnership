<template>
  <div class="flex w-full items-center">
    <section class="flex-1 text-right pr-4 animate-slide-left">
      <slot name="leading" />
    </section>
    <div class="border-l border-white w-0.5 self-stretch" />
    <section class="flex-1 pl-4 animate-slide-right animation-delay-300">
      <slot name="default" />
    </section>
  </div>
</template>
<style>
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-left {
  animation: slideInLeft 0.6s ease-out forwards;
}

.animate-slide-right {
  animation: slideInRight 0.6s ease-out forwards;
}

/* Délai pour l'animation de droite */
.animation-delay-300 {
  animation-delay: 0.3s;
  opacity: 0; /* Caché au début */
  animation-fill-mode: forwards;
}
</style>
