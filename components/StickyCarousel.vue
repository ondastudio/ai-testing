<template>
  <!-- Outer div sets total scroll height: 1 viewport per item -->
  <div ref="sectionRef" :style="{ height: `${items.length * 100}vh` }">
    <!--
      Sticky container: fills viewport minus the bottom navbar safe zone
      (navbar is fixed bottom-8 ≈ 32px + pill height ≈ 64px = 96px total)
    -->
    <div
      class="sticky top-0 flex items-center overflow-hidden"
      :style="{ height: `calc(100vh - ${NAVBAR_SAFE_BOTTOM}px)` }"
    >
      <!--
        Grid wrapper: both the entering and leaving transition elements share
        the same grid cell (row 1 / col 1) so they overlap for a true crossfade
      -->
      <div class="w-full" style="display: grid;">
        <Transition name="crossfade">
          <div :key="activeIndex" class="carousel-slide">
            <slot
              :item="items[activeIndex]"
              :index="activeIndex"
              :fill-px="fillPx"
              :scroll-ratio="scrollRatio"
            />
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Navbar is fixed bottom-8 (32px) + pill height ~64px = 96px of bottom clearance
const NAVBAR_SAFE_BOTTOM = 96
const TRACK_H = 80 // progress bar track height in px

const props = defineProps<{ items: any[] }>()

const sectionRef   = ref<HTMLElement | null>(null)
const scrollRatio  = ref(0)

const fillPx = computed(() => Math.round(scrollRatio.value * TRACK_H))

const activeIndex = computed(() =>
  Math.min(
    Math.floor(scrollRatio.value * props.items.length),
    props.items.length - 1,
  )
)

function onScroll() {
  const el = sectionRef.value
  if (!el) return
  const { top, height } = el.getBoundingClientRect()
  const scrollable = height - window.innerHeight
  scrollRatio.value = Math.max(0, Math.min(1, -top / scrollable))
}

const { $lenis } = useNuxtApp()

onMounted(() => ($lenis as any).on('scroll', onScroll))
onUnmounted(() => ($lenis as any).off('scroll', onScroll))
</script>

<style scoped>
/*
  During the transition both the leaving and entering slides are in the DOM.
  Setting grid-row/column pins them both to the same grid cell so they overlap
  and produce a true crossfade instead of stacking vertically.
*/
.carousel-slide {
  grid-row: 1;
  grid-column: 1;
}

.crossfade-enter-active,
.crossfade-leave-active {
  grid-row: 1;
  grid-column: 1;
  transition: opacity 0.6s ease;
}

.crossfade-enter-from,
.crossfade-leave-to {
  opacity: 0;
}
</style>
