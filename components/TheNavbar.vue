<template>
  <nav
    class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6"
    :style="navStyle"
  >
    <div
      ref="pillRef"
      class="bg-white/80 backdrop-blur-sm flex items-center pl-8 pr-2 py-2 rounded-[200px]"
      :class="isScrolled ? 'gap-[30px]' : 'justify-between'"
    >

      <!-- Logo: full wordmark → symbol on scroll -->
      <a href="/" class="shrink-0 flex items-center">
        <Transition name="logo-fade" mode="out-in">
          <img
            v-if="!isScrolled"
            key="wordmark"
            :src="imgMainLogo"
            alt="Subvisual"
            width="141"
            height="24"
            style="width: 141px; height: 24px;"
            class="block"
          />
          <img
            v-else
            key="symbol"
            :src="imgSymbolBlue"
            alt="Subvisual"
            width="29"
            height="28"
            style="width: 29px; height: 28px;"
            class="block"
          />
        </Transition>
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
const imgMainLogo   = 'https://www.figma.com/api/mcp/asset/d0ca2c68-6b56-4f25-8542-a921027b34a2'
const imgSymbolBlue = 'https://www.figma.com/api/mcp/asset/a175604e-dc80-444d-98f5-53e855f8610c'

const navLinks = [
  { label: 'Product',                href: '#' },
  { label: 'Venture',                href: '#' },
  { label: 'Stables',                href: '#' },
  { label: 'Subvisual as a Service', href: '#' },
  { label: 'Content',                href: '#' },
  { label: 'Academy',                href: '#' },
]

const SCROLL_THRESHOLD = 80

const isScrolled    = ref(false)
const pillRef       = ref<HTMLElement | null>(null)
const fullWidth     = ref(0)
const compactWidth  = ref(0)
const ready         = ref(false)

// Computed inline style — width transitions once we have both measurements
const navStyle = computed(() => {
  if (!ready.value) return {}
  return {
    width:      isScrolled.value ? `${compactWidth.value}px` : `${fullWidth.value}px`,
    transition: 'width 0.4s ease',
  }
})

const { $lenis } = useNuxtApp()

onMounted(async () => {
  const el = pillRef.value
  if (!el) return

  // --- Measure FULL width (default state) ---
  fullWidth.value = el.offsetWidth

  // --- Measure COMPACT width (scrolled state) ---
  // Temporarily switch to compact layout without transition
  isScrolled.value = true
  await nextTick()
  compactWidth.value = el.offsetWidth

  // Restore default state without triggering the width transition
  isScrolled.value = false
  await nextTick()

  // Now enable the transition
  ready.value = true

  $lenis.on('scroll', ({ scroll }: { scroll: number }) => {
    isScrolled.value = scroll > SCROLL_THRESHOLD
  })
})

onUnmounted(() => {
  $lenis.off('scroll')
})
</script>

<style scoped>
.logo-fade-enter-active,
.logo-fade-leave-active {
  transition: opacity 0.25s ease;
}
.logo-fade-enter-from,
.logo-fade-leave-to {
  opacity: 0;
}
</style>
