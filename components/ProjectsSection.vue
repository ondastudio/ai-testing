<template>
  <div ref="sectionRef" :style="{ height: `${projects.length * 100}vh` }">
    <div class="sticky top-0 h-screen overflow-hidden bg-surface-page flex items-center">

      <div class="relative w-full">
        <Transition name="proj" mode="out-in" @enter="onEnter">
          <div :key="activeIndex" class="container flex flex-col gap-md">

            <!-- ── Image card (entire area clickable) ──────────────────── -->
            <NuxtLink :to="active.url" class="block group cursor-pointer">
              <!--
                Dark card: screenshot centred with dark padding around it.
                Progress bar sits inside the card over the dark padding on the right.
                Figma: card 1408px, bar 40px inset from card right edge.
              -->
              <div class="relative bg-black rounded-[16px] overflow-hidden" style="height: 692px">

                <!-- Screenshot — centred, not full-bleed -->
                <div
                  class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
                  style="width: 83.3%; height: 94.5%"
                >
                  <img
                    :src="active.image"
                    :alt="active.title"
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>

                <!-- Progress bar — fills relative to full carousel progress -->
                <div
                  class="absolute top-1/2 -translate-y-1/2 pointer-events-none z-10"
                  style="right: 40px"
                >
                  <div
                    class="relative rounded-full"
                    style="width: 4px; height: 80px; background: #525252"
                  >
                    <div
                      class="absolute top-0 left-0 w-full rounded-full bg-white"
                      :style="{ height: fillPx + 'px' }"
                    />
                  </div>
                </div>

              </div>
            </NuxtLink>

            <!-- ── Copy row ─────────────────────────────────────────────── -->
            <div class="flex items-end justify-between">

              <NuxtLink
                :to="active.url"
                class="reveal-title"
                :class="{ 'is-visible': isVisible }"
              >
                <h3 class="text-h3 font-primary text-text-heading-primary hover:text-text-highlighted transition-colors duration-200">
                  {{ active.title }}
                </h3>
              </NuxtLink>

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
    description: 'A second project description. Replace with real project data.',
    image: 'https://www.figma.com/api/mcp/asset/433f9114-b9fb-41b2-873c-f792f884d20d',
    url: '/case-studies/project-two',
  },
  {
    id: 'project-three',
    title: 'Project Three',
    description: 'A third project description. Replace with real project data.',
    image: 'https://www.figma.com/api/mcp/asset/433f9114-b9fb-41b2-873c-f792f884d20d',
    url: '/case-studies/project-three',
  },
]

const TRACK_H = 80

const sectionRef  = ref<HTMLElement | null>(null)
const scrollRatio = ref(0)
const isVisible   = ref(false)

// Overall carousel progress 0→1 drives the fill
const fillPx = computed(() => Math.round(scrollRatio.value * TRACK_H))

const activeIndex = computed(() =>
  Math.min(Math.floor(scrollRatio.value * projects.length), projects.length - 1)
)

const active = computed(() => projects[activeIndex.value])

function onScroll() {
  const el = sectionRef.value
  if (!el) return
  const { top, height } = el.getBoundingClientRect()
  const scrollable = height - window.innerHeight
  scrollRatio.value = Math.max(0, Math.min(1, -top / scrollable))
}

watch(activeIndex, () => { isVisible.value = false })

function onEnter() {
  nextTick(() => setTimeout(() => { isVisible.value = true }, 50))
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  setTimeout(() => { isVisible.value = true }, 100)
})

onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.proj-enter-active { transition: opacity 0.5s ease, transform 0.5s ease; }
.proj-leave-active { transition: opacity 0.25s ease; }
.proj-enter-from   { opacity: 0; transform: translateY(24px); }
.proj-leave-to     { opacity: 0; }
</style>
