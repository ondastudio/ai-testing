<template>
  <nav class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-container px-6">
    <div class="bg-white/80 backdrop-blur-sm flex items-center justify-between pl-8 pr-2 py-2 rounded-[200px]">

      <!-- Logo — TODO: replace with /public/images/logo.svg once available -->
      <a href="/" class="shrink-0 flex items-center">
        <span
          class="font-secondary text-text-highlighted whitespace-nowrap"
          style="font-size: 1.125rem; font-weight: 700; letter-spacing: -0.02em;"
        >Subvisual</span>
      </a>

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
