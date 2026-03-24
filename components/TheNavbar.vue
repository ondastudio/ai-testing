<template>
  <nav
    class="fixed left-1/2 -translate-x-1/2 z-50"
    :class="{ 'nav-entered': navEntered }"
    :style="navStyle"
  >
    <div
      ref="pillRef"
      class="bg-white/80 backdrop-blur-sm pl-8 pr-2 py-2 rounded-[200px] flex items-center justify-between w-full"
    >

      <!-- 1. Logo ───────────────────────────────────────────────────────────── -->
      <a href="/" class="shrink-0 block" aria-label="Subvisual home">
        <div class="relative overflow-hidden" :style="logoWrapStyle">
          <!-- Full wordmark — visible by default and when docked to footer -->
          <img
            :src="imgMainLogo"
            alt="Subvisual"
            class="absolute left-0 top-1/2 -translate-y-1/2 transition-opacity duration-300 ease-in-out"
            :class="showCompactLogo ? 'opacity-0' : 'opacity-100'"
            width="141"
            height="24"
          />
          <!-- S symbol — visible only when scrolled and not docked -->
          <img
            :src="imgSymbolBlue"
            alt=""
            class="absolute left-0 top-1/2 -translate-y-1/2 transition-opacity duration-300 ease-in-out"
            :class="showCompactLogo ? 'opacity-100' : 'opacity-0'"
            width="29"
            height="28"
          />
        </div>
      </a>

      <!-- 2. Nav links + CTA ───────────────────────────────────────────────── -->
      <div class="flex items-center gap-11 shrink-0">
        <a
          v-for="link in navLinks"
          :key="link.label"
          :href="link.href"
          class="text-body-md font-secondary text-brand-black whitespace-nowrap transition-all duration-150 hover:underline hover:font-medium"
        >{{ link.label }}</a>

        <AppButton href="#" class="shrink-0">Book Intro</AppButton>
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

const SCROLL_THRESHOLD  = 80
const CONTAINER_MAX_PX  = 1260
const CONTAINER_SIDE_PX = 24
const DEFAULT_BOTTOM_PX = 32

const LOGO_FULL_W    = 141
const LOGO_COMPACT_W = 29
const LOGO_H         = 28

const navEntered   = ref(false)
const isScrolled   = ref(false)
const pillRef      = ref<HTMLElement | null>(null)
const fullWidth    = ref(0)
const compactWidth = ref(0)
const ready        = ref(false)
const bottomPx     = ref(DEFAULT_BOTTOM_PX)

// Docked = footer has scrolled up enough to push the nav above its resting position
const isDocked = computed(() => bottomPx.value > DEFAULT_BOTTOM_PX)

// Compact logo only when scrolled AND not docked to footer
const showCompactLogo = computed(() => isScrolled.value && !isDocked.value)

const logoWrapStyle = computed(() => ({
  width:      `${showCompactLogo.value ? LOGO_COMPACT_W : LOGO_FULL_W}px`,
  height:     `${LOGO_H}px`,
  transition: ready.value ? 'width 0.4s ease' : 'none',
}))

const navStyle = computed(() => {
  const bottom = `${bottomPx.value}px`
  if (!ready.value) return { bottom }
  // Expand to full width when docked to footer
  const w = (isScrolled.value && !isDocked.value) ? compactWidth.value : fullWidth.value
  return { width: `${w}px`, bottom }
})

const { $lenis } = useNuxtApp()
let footerEl: HTMLElement | null = null

function getFullWidth() {
  return Math.min(CONTAINER_MAX_PX, window.innerWidth - CONTAINER_SIDE_PX * 2)
}

onMounted(async () => {
  const el = pillRef.value
  if (!el) return

  footerEl = document.querySelector('footer')

  await nextTick()
  requestAnimationFrame(() => { navEntered.value = true })

  fullWidth.value  = getFullWidth()

  const naturalWidth = el.offsetWidth
  compactWidth.value = naturalWidth - LOGO_FULL_W + LOGO_COMPACT_W + 30

  ready.value = true

  window.addEventListener('resize', () => {
    fullWidth.value = getFullWidth()
  }, { passive: true })

  $lenis.on('scroll', onScroll)
})

function onScroll({ scroll }: { scroll: number }) {
  isScrolled.value = scroll > SCROLL_THRESHOLD

  if (footerEl) {
    const rect = footerEl.getBoundingClientRect()
    // Track footer: clamp to default so nav never dips below resting position
    bottomPx.value = Math.max(DEFAULT_BOTTOM_PX, window.innerHeight - rect.top + 2)
  }
}

onUnmounted(() => {
  $lenis.off('scroll', onScroll)
})
</script>

<style scoped>
nav {
  opacity: 0;
  transform: translateX(-50%) translateY(-100vh);
  transition: width 0.4s ease, opacity 1s ease, transform 1.4s cubic-bezier(0.16, 1, 0.3, 1);
}
nav.nav-entered {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
</style>
