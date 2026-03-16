<template>
  <!--
    Scroll space: rows activate blue one by one as you scroll.
    Section stays sticky while scroll space is consumed.
  -->
  <div ref="sectionRef" :style="{ height: sectionHeight }">
    <div class="sticky top-0 min-h-screen bg-surface-page flex items-center overflow-hidden py-[60px]">
      <div class="container flex flex-col gap-[120px]">

        <!-- ── Proof rows ──────────────────────────────────────────────── -->
        <div class="flex flex-col gap-lg">

          <!-- Label -->
          <p class="reveal-fade text-body-xsm font-secondary text-text-label-primary uppercase" :class="{ 'is-visible': isVisible }">
            proof and recognition
          </p>

          <!-- Rows -->
          <div class="flex flex-col">
            <div
              v-for="(item, i) in items"
              :key="item.id"
              class="flex gap-[131px] items-center border-t border-border-secondary"
            >
              <!-- Icon -->
              <div class="shrink-0 w-8 h-8 flex items-center justify-center">
                <img :src="item.icon" :alt="item.label" class="w-full h-full object-contain" />
              </div>

              <!-- Text -->
              <div class="flex-1 border-l border-border-secondary px-lg py-lg">
                <p
                  class="text-h2 font-primary tracking-[-0.96px] transition-colors duration-700"
                  :class="i <= activeRow ? 'text-text-highlighted' : 'text-text-heading-primary'"
                >
                  {{ item.text }}
                </p>
              </div>
            </div>
          </div>

        </div>

        <!-- ── Testimonial card ────────────────────────────────────────── -->
        <div class="reveal-fade bg-surface-action rounded-[16px] overflow-hidden relative" style="height: 692px" :class="{ 'is-visible': isVisible }">
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-[80px] items-center w-[954px]">

            <!-- Label -->
            <p class="text-body-xsm font-secondary text-white uppercase tracking-wide">
              what our clients say
            </p>

            <!-- Quote block -->
            <div class="flex flex-col gap-[60px] items-center">
              <p class="text-h1 font-primary text-white text-center tracking-[-0.02em] w-[796px]">
                "We … got the product built on time; we found a highly engaged team."
              </p>
              <div class="flex flex-col items-center">
                <p class="text-body-md font-secondary text-white text-center">Rui Silva,</p>
                <p class="text-body-md font-secondary text-white text-center">
                  EVP Product, <span class="underline">Uphold</span>
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

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

// Extra scroll ticks: one per row + buffer at start and end
const TICKS = items.length + 2

const sectionRef  = ref<HTMLElement | null>(null)
const scrollRatio = ref(0)
const isVisible   = ref(false)

// -1 = none active; 0..3 = rows activated up to this index
const activeRow = computed(() =>
  Math.min(Math.floor(scrollRatio.value * TICKS) - 1, items.length - 1)
)

// Section is tall enough to scroll through each row activation
const sectionHeight = computed(() => `${TICKS * 50}vh`)

function onScroll() {
  const el = sectionRef.value
  if (!el) return
  const { top, height } = el.getBoundingClientRect()
  const scrollable = height - window.innerHeight
  scrollRatio.value = Math.max(0, Math.min(1, -top / scrollable))
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  nextTick(() => setTimeout(() => { isVisible.value = true }, 150))
})

onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>
