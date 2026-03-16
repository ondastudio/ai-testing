<template>
  <!-- Scroll space: 100vh per project creates the scroll room -->
  <div ref="sectionRef" class="relative" :style="{ height: projectScrollHeight }">

    <!-- Sticky viewport — stays fixed while scroll space is consumed -->
    <div class="sticky top-0 h-screen overflow-hidden bg-surface-page flex items-center">

      <!-- Project content -->
      <div class="container relative w-full">
        <Transition name="proj" mode="out-in" @after-enter="showContent">
          <div :key="activeIndex" class="flex flex-col gap-md">

            <!-- ── Image / Video (entire area clickable → case study) ── -->
            <NuxtLink :to="active.url" class="block cursor-pointer group">
              <div class="bg-black rounded-[16px] overflow-hidden h-[44vw] max-h-[692px] relative reveal-fade" :class="{ 'is-visible': isVisible }">
                <img
                  :src="active.image"
                  :alt="active.title"
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
            </NuxtLink>

            <!-- ── Copy row ── -->
            <div class="flex items-end justify-between">
              <!-- Title — clickable → case study -->
              <NuxtLink :to="active.url" class="reveal-title" :class="{ 'is-visible': isVisible }">
                <h3 class="text-h3 font-primary text-text-heading-primary hover:text-text-highlighted transition-colors duration-200">
                  {{ active.title }}
                </h3>
              </NuxtLink>

              <!-- Description -->
              <p
                class="reveal-fade font-secondary text-body-md text-text-body-primary max-w-[630px]"
                :class="{ 'is-visible': isVisible }"
              >
                {{ active.description }}
              </p>
            </div>

          </div>
        </Transition>
      </div>

      <!-- ── Scroll progress bar (right edge, vertically centred) ── -->
      <div class="absolute right-14 top-1/2 -translate-y-1/2">
        <div
          class="relative w-1 rounded-full bg-[#525252]"
          style="height: 80px"
        >
          <div
            class="absolute top-0 w-1 rounded-full bg-white transition-all duration-500 ease-out"
            :style="{ height: fillPx + 'px' }"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'

// ── Project data — extend this array to add more projects ───────────────────
const projects = [
  {
    id: 'filecoin-station',
    title: 'FileCoin Station',
    description:
      'Filecoin Station is part of the broader Protocol Labs ecosystem. It has two jobs: connecting users to decentralized storage and providing rewards for participation.',
    image: 'https://www.figma.com/api/mcp/asset/433f9114-b9fb-41b2-873c-f792f884d20d',
    url: '/case-studies/filecoin-station',
  },
]

// ── Constants ───────────────────────────────────────────────────────────────
const TRACK_H = 80 // progress bar track height in px

// ── State ───────────────────────────────────────────────────────────────────
const sectionRef  = ref<HTMLElement | null>(null)
const scrollRatio = ref(0)
const isVisible   = ref(false)

// ── Derived ─────────────────────────────────────────────────────────────────
const projectScrollHeight = computed(() => `${projects.length * 100}vh`)

const activeIndex = computed(() =>
  Math.min(Math.floor(scrollRatio.value * projects.length), projects.length - 1)
)

const active = computed(() => projects[activeIndex.value])

const fillPx = computed(() =>
  Math.round(((activeIndex.value + 1) / projects.length) * TRACK_H)
)

// ── Scroll handler ──────────────────────────────────────────────────────────
function onScroll() {
  const el = sectionRef.value
  if (!el) return
  const { top, height } = el.getBoundingClientRect()
  const scrollable = height - window.innerHeight
  const scrolled   = -top
  scrollRatio.value = Math.max(0, Math.min(1, scrolled / scrollable))
}

// ── Reveal content after project transition ─────────────────────────────────
function showContent() {
  isVisible.value = true
}

// Reset reveal when project changes so animation re-triggers
watch(activeIndex, () => {
  isVisible.value = false
})

// ── Lifecycle ───────────────────────────────────────────────────────────────
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  // trigger initial reveal after a short delay
  nextTick(() => setTimeout(() => { isVisible.value = true }, 100))
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
/* Project switch: title + content slide up and fade in */
.proj-enter-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.proj-leave-active {
  transition: opacity 0.25s ease;
}
.proj-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.proj-leave-to {
  opacity: 0;
}
</style>
