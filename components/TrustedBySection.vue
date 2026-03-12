<template>
  <section class="relative min-h-screen flex flex-col bg-surface-page">

    <!-- Trusted by bar -->
    <div class="flex items-stretch border-t border-[var(--color-border-secondary)] mx-20 mt-20">

      <!-- Label -->
      <div class="flex items-center pr-10 shrink-0">
        <span class="text-body-xsm text-[var(--color-text-label-primary)] uppercase tracking-widest whitespace-nowrap">
          trusted by
        </span>
      </div>

      <!-- Infinite marquee -->
      <div ref="marqueeRef" class="reveal-fade border-l border-[var(--color-border-secondary)] overflow-hidden flex-1 py-6">
        <div class="marquee-track">
          <!-- logos duplicated for seamless loop -->
          <template v-for="_ in 2" :key="_">
            <div v-for="logo in logos" :key="logo.name + _" class="flex items-center justify-center px-[var(--spacing-xlg)] shrink-0 h-[34px]">
              <img
                :src="logo.src"
                :alt="logo.name"
                class="h-full w-auto object-contain opacity-80"
              />
            </div>
          </template>
        </div>
      </div>

    </div>

    <!-- Main copy — centered -->
    <div class="flex-1 flex flex-col items-center justify-center gap-8 px-20 py-20">

      <div ref="labelRef" class="reveal-fade">
        <span class="text-body-xsm text-[var(--color-text-label-primary)] uppercase tracking-widest">
          choose your path
        </span>
      </div>

      <div ref="headingRef" class="reveal-title max-w-[1288px] w-full">
        <h2 class="text-h2 font-primary text-[var(--color-text-heading-primary)] text-center">
          Every project is custom. Whether it's design-only, team augmentation, or full product org.
          We've embedded for years, delivered end-to-end for crypto PSPs, staffed multinationals,
          and hired our own replacements without slowing delivery.
        </h2>
      </div>

    </div>

  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const marqueeRef = ref<HTMLElement | null>(null)
const labelRef   = ref<HTMLElement | null>(null)
const headingRef = ref<HTMLElement | null>(null)

// TODO: Replace Figma asset URLs with permanent assets in /public/images/logos/
const logos = [
  { name: 'AT&T',          src: 'https://www.figma.com/api/mcp/asset/8b23cabc-c6c4-45a4-9346-7c327f5fa974' },
  { name: 'Protocol Labs', src: 'https://www.figma.com/api/mcp/asset/a8fd3ebe-1b98-461a-adc1-4a4a173603f4' },
  { name: 'Uphold',        src: 'https://www.figma.com/api/mcp/asset/2a89920c-a364-4e00-8f62-8f1fe5af878b' },
  { name: 'Remote',        src: 'https://www.figma.com/api/mcp/asset/a03e0c20-06c3-41b7-a53d-99361af79ec7' },
  { name: 'Brazos',        src: 'https://www.figma.com/api/mcp/asset/8bfd8169-7240-45a2-81e4-70044d58f896' },
  { name: 'Orki',          src: 'https://www.figma.com/api/mcp/asset/c43825ff-0bb0-405f-b994-cc52d7c9c70c' },
  { name: 'Quill',         src: 'https://www.figma.com/api/mcp/asset/4bc5bb2c-c189-4022-a4ef-103b77d857c6' },
]

onMounted(() => {
  const { observe } = useScrollReveal()
  observe(marqueeRef.value, 0)
  observe(labelRef.value,   100)
  observe(headingRef.value, 200)
})
</script>
