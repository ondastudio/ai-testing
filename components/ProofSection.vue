<template>
  <section class="py-[60px]">
    <div class="container flex flex-col gap-[120px]">

      <!-- Proof rows -->
      <div class="flex flex-col gap-lg">

        <!-- Label — centred -->
        <p class="reveal-fade text-body-xsm font-secondary text-text-label-primary uppercase text-center" :class="{ 'is-visible': isVisible }">
          proof and recognition
        </p>

        <!--
          Stacking rows: each row is position:sticky with an incrementally
          higher top value so they physically stack on top of each other as
          you scroll — exactly like the cards on native.inc.
          z-index increases per row so later cards sit above earlier ones.
          bg-surface-page covers the row behind when stacked.
        -->
        <div>
          <div
            v-for="(item, i) in items"
            :key="item.id"
            :ref="(el) => setRowRef(el as HTMLElement | null, i)"
            class="sticky border-t border-border-secondary flex gap-[131px] items-center"
            :style="{ top: `${STACK_BASE + i * STACK_STEP}px`, zIndex: i + 1 }"
          >
            <!-- Icon -->
            <div class="py-lg shrink-0 flex items-center justify-center w-8 h-8">
              <img :src="item.icon" :alt="item.label" class="w-full h-full object-contain" />
            </div>

            <!-- Text -->
            <div class="flex-1 border-l border-border-secondary px-lg py-lg">
              <p
                class="text-h2 font-primary tracking-[-0.96px] transition-colors duration-700"
                :class="activeRows.has(i) ? 'text-text-highlighted' : 'text-text-heading-primary'"
              >
                {{ item.text }}
              </p>
            </div>
          </div>
        </div>

      </div>

      <!-- Testimonial card -->
      <div
        class="reveal-fade bg-surface-action rounded-[16px] overflow-hidden relative"
        style="height: 692px"
        :class="{ 'is-visible': isVisible }"
      >
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-[80px] items-center w-[954px]">

          <p class="text-body-xsm font-secondary text-white uppercase tracking-wide">
            what our clients say
          </p>

          <div class="flex flex-col gap-[60px] items-center">
            <p class="text-h1 font-primary text-white text-center w-[796px]">
              "We … got the product built on time; we found a highly engaged team."
            </p>
            <div class="flex flex-col items-center gap-1">
              <p class="text-body-md font-secondary text-white text-center">Rui Silva,</p>
              <p class="text-body-md font-secondary text-white text-center">
                EVP Product, <span class="underline">Uphold</span>
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const items = [
  {
    id: 'funding',
    label: 'Funding',
    icon: 'https://www.figma.com/api/mcp/asset/41474f9b-c686-40a2-a59a-74c0d4e95b79',
    text: 'Helped raised $100M',
  },
  {
    id: 'countries',
    label: 'Countries',
    icon: 'https://www.figma.com/api/mcp/asset/555d70c7-f62c-4d47-a417-034c24ca4d69',
    text: '10 countries connected',
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: 'https://www.figma.com/api/mcp/asset/f2d74d6b-4100-4504-9dde-78e13950970a',
    text: '35 new projects (2020)',
  },
  {
    id: 'deloitte',
    label: 'Deloitte',
    icon: 'https://www.figma.com/api/mcp/asset/dc8191a4-bd2e-470c-94b8-a32b2653ce4c',
    text: 'Deloitte Technology Fast 500 EMEA (2019)',
  },
]

// Each row sticks STACK_STEP px below the previous one,
// creating a cascading deck effect on scroll.
const STACK_BASE = 80  // top offset for the first row (px)
const STACK_STEP = 64  // how many px each subsequent row is lower (px)

const rowRefs   = ref<(HTMLElement | null)[]>([])
const activeRows = ref<Set<number>>(new Set())
const isVisible  = ref(false)

function setRowRef(el: HTMLElement | null, i: number) {
  rowRefs.value[i] = el
}

function onScroll() {
  const next = new Set<number>()
  rowRefs.value.forEach((el, i) => {
    if (!el) return
    const stickyTop = STACK_BASE + i * STACK_STEP
    // Row is "stacked" once its top edge has reached its sticky threshold
    if (el.getBoundingClientRect().top <= stickyTop + 2) {
      next.add(i)
    }
  })
  activeRows.value = next
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  nextTick(() => setTimeout(() => { isVisible.value = true }, 150))
})

onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>
