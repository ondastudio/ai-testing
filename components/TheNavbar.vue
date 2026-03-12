<template>
  <nav class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[1280px] max-w-[calc(100vw-2rem)]">
    <div class="bg-white/80 backdrop-blur-sm flex items-center justify-between pl-8 pr-2 py-2 rounded-[200px]">

      <!-- Logo -->
      <!-- TODO: Replace with permanent logo asset in /public/images/logo.svg -->
      <img
        src="https://www.figma.com/api/mcp/asset/61eba48b-305e-4eb7-aca8-52d340f154fc"
        alt="Subvisual"
        class="h-[25px] w-auto shrink-0"
      />

      <!-- Nav Links + CTA -->
      <div class="flex items-center gap-11">
        <a
          v-for="link in navLinks"
          :key="link.label"
          :href="link.href"
          class="text-body-md text-brand-black hover:text-text-highlighted transition-colors whitespace-nowrap"
        >
          {{ link.label }}
        </a>

        <a
          href="#"
          class="bg-surface-action text-text-action-primary text-body-md h-12 px-6 flex items-center rounded-button whitespace-nowrap hover:opacity-90 transition-opacity"
        >
          Book Intro
        </a>
      </div>

    </div>
  </nav>
</template>

<script setup lang="ts">
const navLinks = [
  { label: 'Product',                href: '#' },
  { label: 'Venture',                href: '#' },
  { label: 'Stables',                href: '#' },
  { label: 'Subvisual as a Service', href: '#' },
  { label: 'Content',                href: '#' },
  { label: 'Academy',                href: '#' },
]
</script>
