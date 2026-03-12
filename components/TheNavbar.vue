<template>
  <nav class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-container px-6">
    <div class="bg-white/80 backdrop-blur-sm flex items-center justify-between pl-8 pr-2 py-2 rounded-[200px]">

      <!-- Logo — TODO: save permanently to /public/images/logo.svg -->
      <a href="/" class="shrink-0 flex items-center h-[25px]">
        <img
          src="https://www.figma.com/api/mcp/asset/59e345f1-f248-4e75-bbf5-28fe7bacf66b"
          alt="Subvisual"
          class="h-full w-auto object-contain"
        />
      </a>

      <!-- Nav Links + CTA -->
      <div class="flex items-center gap-11">
        <a
          v-for="link in navLinks"
          :key="link.label"
          :href="link.href"
          class="text-body-md font-secondary text-brand-black hover:text-text-highlighted transition-colors whitespace-nowrap"
        >
          {{ link.label }}
        </a>
        <a
          href="#"
          class="bg-surface-action text-text-action-primary text-body-md font-secondary h-12 px-6 flex items-center rounded-button whitespace-nowrap hover:opacity-90 transition-opacity"
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
