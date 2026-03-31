<template>
  <nav
    ref="navRef"
    class="fixed left-1/2 -translate-x-1/2 z-50"
    :class="{ 'nav-entered': navEntered, 'is-scrolled': showCompactLogo }"
    :style="{ bottom: `${bottomPx}px` }"
  >
    <!-- Panel wrapper: plain on desktop/closed, white card when mobile menu open -->
    <div :class="mobileMenuOpen ? 'mobile-panel lg:contents' : ''">

      <!-- Mobile nav list (open state only) ───────────────────────────────── -->
      <Transition name="menu-list">
        <ul v-if="mobileMenuOpen" class="mobile-nav-list lg:hidden">
          <li
            v-for="link in navLinks"
            :key="link.label"
            class="mobile-nav-item"
          >
            <NuxtLink
              :href="link.href"
              class="mobile-nav-link text-body-md font-secondary text-text-body-primary"
              active-class="text-text-highlighted font-medium"
              @click="mobileMenuOpen = false"
            >{{ link.label }}</NuxtLink>
            <hr class="border-t border-border-secondary" />
          </li>
        </ul>
      </Transition>

      <!-- Navbar pill ──────────────────────────────────────────────────────── -->
      <div
        class="backdrop-blur-sm pl-8 pr-2 py-2 rounded-[200px] flex items-center justify-between w-full relative nav-pill"
      >

        <!-- 1. Logo ─────────────────────────────────────────────────────────── -->
        <a href="/" class="shrink-0 block" aria-label="Subvisual home">

          <!-- Mobile: always show S symbol -->
          <img
            :src="imgSymbolBlue"
            alt="Subvisual"
            class="block lg:hidden"
            width="29"
            height="28"
          />

          <!-- Desktop: animated crossfade full wordmark ↔ S symbol -->
          <div class="hidden lg:block logo-wrap relative overflow-hidden" :style="logoWrapStyle">
            <img
              :src="imgMainLogo"
              alt="Subvisual"
              class="absolute left-0 top-1/2 -translate-y-1/2 transition-opacity duration-300 ease-in-out"
              :class="showCompactLogo ? 'opacity-0' : 'opacity-100'"
              width="141"
              height="24"
            />
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

        <!-- 2. Desktop: nav links + CTA ───────────────────────────────────── -->
        <div class="hidden lg:flex items-center gap-11 shrink-0">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.label"
            :href="link.href"
            :data-label="link.label"
            class="nav-link text-body-md font-secondary text-text-body-primary whitespace-nowrap"
          >{{ link.label }}</NuxtLink>

          <AppButton href="#" class="shrink-0">Book Intro</AppButton>
        </div>

        <!-- 3. Mobile: CTA always on right ──────────────────────────────────── -->
        <div class="flex lg:hidden items-center shrink-0">
          <AppButton href="#" class="shrink-0">Book Intro</AppButton>
        </div>

        <!-- Hamburger / X: absolutely centered in pill (mobile only) ─────── -->
        <button
          v-show="!mobileMenuOpen"
          class="hamburger-btn absolute left-1/2 -translate-x-1/2 lg:hidden shrink-0"
          @click="mobileMenuOpen = true"
          aria-label="Open menu"
          :aria-expanded="false"
        >
          <img :src="imgMenu" alt="" class="w-6 h-6" aria-hidden="true" />
        </button>
        <button
          v-show="mobileMenuOpen"
          class="hamburger-btn hamburger-btn--open absolute left-1/2 -translate-x-1/2 lg:hidden shrink-0"
          @click="mobileMenuOpen = false"
          aria-label="Close menu"
          :aria-expanded="true"
        >
          <svg viewBox="0 0 24 24" class="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import imgMainLogo   from '~/assets/svg/subvisual-logo.svg'
import imgSymbolBlue from '~/assets/svg/subvisual-symbol.svg'
import imgMenu       from '~/assets/svg/menu.svg'

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

const navEntered     = ref(false)
const isScrolled     = ref(false)
const bottomPx       = ref(DEFAULT_BOTTOM_PX)
const navRef         = ref<HTMLElement | null>(null)
const mobileMenuOpen = ref(false)

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

  // Measure compact width before entry animation so CSS can transition
  // between two pixel values instead of calc → auto.
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
    bottomPx.value = Math.max(DEFAULT_BOTTOM_PX, window.innerHeight - rect.top + 2)
  }
}

onUnmounted(() => {
  $lenis.off('scroll', onScroll)
})
</script>

<style scoped>
.nav-pill {
  background: color-mix(in srgb, var(--color-white) 80%, transparent);
}

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
/* On mobile/tablet the nav stays full width regardless of scroll state */
@media (max-width: 1439px) {
  nav.is-scrolled {
    width: calc(min(var(--container-max), 100vw) - 2 * var(--container-px));
  }
}
/* Logo wrapper transition */
nav :deep(.logo-wrap) {
  transition: width 0.4s ease;
}

/* ── Mobile panel (open state) ────────────────────────────────────────────── */
.mobile-panel {
  display: flex;
  flex-direction: column;
  background: var(--color-white);
  border-radius: var(--border-radius-card);
  padding-top: var(--spacing-2xsm);
  gap: var(--spacing-sm);
}

/* ── Mobile nav list ─────────────────────────────────────────────────────── */
.mobile-nav-list {
  display: flex;
  flex-direction: column;
  padding: 0 var(--spacing-xlg);
  list-style: none;
  margin: 0;
}
.mobile-nav-item {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding-top: var(--spacing-md);
}
.mobile-nav-link {
  display: block;
}

/* List enter animation */
.menu-list-enter-active {
  animation: menuListReveal 0.3s ease both;
}
.menu-list-leave-active {
  animation: menuListReveal 0.2s ease both reverse;
}
@keyframes menuListReveal {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Hamburger button ─────────────────────────────────────────────────────── */
.hamburger-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: transparent;
  color: var(--color-surface-action);
  transition: background-color 0.2s var(--easing-default), color 0.2s var(--easing-default);
}
@media (min-width: 1440px) {
  .hamburger-btn {
    display: none;
  }
}
.hamburger-btn--open {
  background: var(--color-surface-action);
  color: var(--color-white);
}

/* ── Nav links ────────────────────────────────────────────────────────────── */
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
