<template>
  <!--
    Scroll space: 100vh per slide.
    The sticky inner keeps the section locked in place
    while the extra scroll height is consumed.
  -->
  <div ref="sectionRef" :style="{ height: `${projects.length * 100}vh` }">
    <div class="sticky top-0 h-screen overflow-hidden bg-surface-page flex items-center">

      <!-- Project content -->
      <div class="relative w-full">

        <Transition name="proj" mode="out-in" @enter="onEnter">
          <div :key="activeIndex" class="flex flex-col gap-md px-4">

            <!-- ── Image / Video (entire area clickable) ── -->
            <NuxtLink :to="active.url" class="block group cursor-pointer relative">
              <div class="bg-black rounded-[16px] overflow-hidden relative" style="height: 692px">
                <img
                  :src="active.image"
                  :alt="active.title"
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>

              <!-- ── Progress bar: right side of the image card ── -->
              <div class="absolute top-1/2 -translate-y-1/2 right-[-28px] flex flex-col items-center">
                <!-- Track -->
                <div class="relative w-1 rounded-full overflow-hidden" style="height: 80px; background: #525252">
                  <!-- Fill (white, grows from top) -->
                  <div
                    class="absolute top-0 left-0 w-full rounded-full bg-white transition-none"
                    :style="{ height: fillPx + 'px' }"
                  />
                </div>
              </div>
            </NuxtLink>

            <!-- ── Copy row ── -->
            <div class="flex items-end justify-between max-w-[1280px] mx-auto w-full">

              <!-- Title — clickable -->
              <NuxtLink
                :to="active.url"
                class="reveal-title"
                :class="{ 'is-visible': isVisible }"
              >
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'

// ── Project data — add more entries here ─────────────────────────────────────
const projects = [
  {
    id: 'filecoin-station',
    title: 'FileCoin Station',
    description:
      'Filecoin Station is part of the broader Protocol Labs ecosystem. It has two jobs: connecting users to decentralized storage and providing rewards for participation.',
    image: 'https://www.figma.com/api/mcp/asset/433f9114-b9fb-41b2-873c-f792f884d20d',
    url: '/case-studies/filecoin-station',
  },
  {
    id: 'project-two',
    title: 'Project Two',
    description:
      'A second project description goes here. Replace with real project data.',
    image: 'https://www.figma.com/api/mcp/asset/433f9114-b9fb-41b2-873c-f792f884d20d',
    url: '/case-studies/project-two',
  },
  {
    id: 'project-three',
    title: 'Project Three',
    description:
      'A third project description goes here. Replace with real project data.',
    image: 'https://www.figma.com/api/mcp/asset/433f9114-b9fb-41b2-873c-f792f884d20d',
    url: '/case-studies/project-three',
  },
]

const TRACK_H = 80 // px — progress bar track height

// ── State ────────────────────────────────────────────────────────────────────
const sectionRef  = ref<HTMLElement | null>(null)
const scrollRatio = ref(0) // 0 → 1 across the full section
const isVisible   = ref(false)

// ── Derived ──────────────────────────────────────────────────────────────────

// 0 → projects.length (continuous float)
const totalProgress = computed(() => scrollRatio.value * projects.length)

// Which slide is active
const activeIndex = computed(() =>
  Math.min(Math.floor(totalProgress.value), projects.length - 1)
)

// Progress within the current slide: 0 → 1
const slideProgress = computed(() => {
  if (activeIndex.value === projects.length - 1) return 1
  return totalProgress.value - activeIndex.value
})

// Height of white fill in px
const fillPx = computed(() => Math.round(slideProgress.value * TRACK_H))

const active = computed(() => projects[activeIndex.value])

// ── Scroll handler ────────────────────────────────────────────────────────────
function onScroll() {
  const el = sectionRef.value
  if (!el) return
  const { top, height } = el.getBoundingClientRect()
  const scrollable = height - window.innerHeight
  scrollRatio.value = Math.max(0, Math.min(1, -top / scrollable))
}

// ── Reveal animation reset on slide change ────────────────────────────────────
watch(activeIndex, () => {
  isVisible.value = false
})

function onEnter() {
  nextTick(() => setTimeout(() => { isVisible.value = true }, 50))
}

// ── Lifecycle ─────────────────────────────────────────────────────────────────
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  setTimeout(() => { isVisible.value = true }, 100)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
/* Slide transition: new slide fades + rises from below */
.proj-enter-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.proj-leave-active {
  transition: opacity 0.25s ease;
}
.proj-enter-from {
  opacity: 0;
  transform: translateY(24px);
}
.proj-leave-to {
  opacity: 0;
}
</style>
