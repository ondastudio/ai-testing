<template>
  <nav
    ref="navRef"
    class="fixed left-1/2 -translate-x-1/2 z-50"
    :class="{ 'nav-entered': navEntered, 'is-scrolled': showCompactLogo }"
    :style="{ bottom: `${bottomPx}px` }"
  >
    <div
      class="bg-white/80 backdrop-blur-sm pl-8 pr-2 py-2 rounded-[200px] flex items-center justify-between w-full"
    >

      <!-- 1. Logo ───────────────────────────────────────────────────────────── -->
      <a href="/" class="shrink-0 block" aria-label="Subvisual home">
        <div class="logo-wrap relative overflow-hidden" :style="logoWrapStyle">
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
        <NuxtLink
          v-for="link in navLinks"
          :key="link.label"
          :href="link.href"
          :data-label="link.label"
          class="nav-link text-body-md font-secondary text-brand-black whitespace-nowrap"
        >{{ link.label }}</NuxtLink>

        <AppButton href="#" class="shrink-0">Book Intro</AppButton>
      </div>

    </div>
  </nav>
</template>

<script setup lang="ts">
import imgMainLogo   from '~/assets/svg/subvisual-logo.svg'
import imgSymbolBlue from '~/assets/svg/subvisual-symbol.svg'

const navLinks = [
  { label: 'Product',                href: '#' },
  { label: 'Venture',                href: '#' },
  { label: 'Stables',                href: '#' },
  { label: 'Subvisual as a Service', href: '#' },
  { label: 'Content',                href: '/blog' },
  { label: 'Academy',                href: '#' },
]

const SCROLL_THRESHOLD  = 80
const DEFAULT_BOTTOM_PX = 32

const LOGO_FULL_W    = 141
const LOGO_COMPACT_W = 29
const LOGO_H         = 28

const navEntered = ref(false)
const isScrolled = ref(false)
const bottomPx   = ref(DEFAULT_BOTTOM_PX)
const navRef     = ref<HTMLElement | null>(null)

// Docked = footer has scrolled up enough to push the nav above its resting position
const isDocked = computed(() => bottomPx.value > DEFAULT_BOTTOM_PX)

// Compact logo only when scrolled AND not docked to footer
const showCompactLogo = computed(() => isScrolled.value && !isDocked.value)

const logoWrapStyle = computed(() => ({
  width:  `${showCompactLogo.value ? LOGO_COMPACT_W : LOGO_FULL_W}px`,
  height: `${LOGO_H}px`,
}))

const { $lenis } = useNuxtApp()
let footerEl: HTMLElement | null = null

onMounted(async () => {
  footerEl = document.querySelector('footer')

  await nextTick()

  // Measure compact width (content size) before entry animation starts,
  // so CSS can transition between two pixel values instead of calc → auto.
  const nav = navRef.value
  if (nav) {
    nav.style.width = 'max-content'
    const compactW = nav.offsetWidth
    nav.style.width = ''
    nav.style.setProperty('--nav-compact-w', `${compactW}px`)
  }

  requestAnimationFrame(() => { navEntered.value = true })

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
  width: calc(min(var(--container-max), 100vw) - 2 * var(--container-px));
  opacity: 0;
  transform: translateX(-50%) translateY(-100vh);
  transition: width 0.4s ease, opacity 1s ease, transform 1.4s cubic-bezier(0.16, 1, 0.3, 1);
}
nav.nav-entered {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
nav.is-scrolled {
  width: var(--nav-compact-w);
}
/* logo wrapper transition */
nav :deep(.logo-wrap) {
  transition: width 0.4s ease;
}

/* Nav links */
nav :deep(.nav-link) {
  position: relative;
  transition: color 0.2s ease, font-weight 0.15s ease;
  /* Reserve space for bold weight so hover doesn't shift layout */
  display: inline-flex;
  flex-direction: column;
  align-items: center;
}

nav :deep(.nav-link)::before {
  content: attr(data-label);
  font-weight: 500;
  height: 0;
  overflow: hidden;
  visibility: hidden;
  pointer-events: none;
  user-select: none;
}

/* Animated underline — grows left to right on hover */
nav :deep(.nav-link)::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: currentColor;
  transition: width 0.25s ease;
}

nav :deep(.nav-link:hover) {
  font-weight: 500;
  color: var(--color-text-highlighted);
}

nav :deep(.nav-link:hover)::after {
  width: 100%;
}

/* Active / current page — bold, blue, no underline */
nav :deep(.nav-link.router-link-active),
nav :deep(.nav-link.router-link-exact-active) {
  font-weight: 500;
  color: var(--color-text-highlighted);
}
</style>
