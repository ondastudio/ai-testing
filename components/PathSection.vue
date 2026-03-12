<template>
  <section class="relative py-20">

    <!-- ══ DEFAULT / HOVER: two cards side by side ══════════════════════════ -->
    <Transition name="fade" mode="out-in">
      <div v-if="!expandedCard" key="cards" class="container">
        <div class="grid grid-cols-2 gap-4">

          <!-- ── Product Card ──────────────────────────────────────── -->
          <div
            class="card"
            @mouseenter="hoveredCard = 'product'"
            @mouseleave="hoveredCard = null"
          >
            <div class="flex flex-col gap-8">

              <!-- Header: icon + title + video thumbnail -->
              <div class="flex items-end justify-between">
                <div class="flex flex-col gap-2 max-w-[311px]">
                  <img :src="product.icon" alt="" class="w-10 h-10 object-contain" />
                  <h3 class="font-primary text-[2.25rem] leading-[2.5rem] tracking-[-0.72px] text-text-heading-primary">
                    <span :class="hoveredCard === 'product' ? 'text-text-highlighted underline decoration-solid' : ''">Product Studio,</span><br />
                    Whatever you need, we'll build
                  </h3>
                </div>
                <button
                  class="video-thumb"
                  @click="expandedCard = 'product'"
                  aria-label="Play Product video"
                >
                  <img :src="product.thumb" alt="" class="absolute inset-0 w-full h-full object-cover" />
                  <span class="relative z-10 flex items-center justify-center w-12 h-12 rounded-button bg-surface-action">
                    <svg viewBox="0 0 24 24" class="w-6 h-6 fill-white"><path d="M8 5v14l11-7z"/></svg>
                  </span>
                </button>
              </div>

              <!-- Text sections -->
              <div class="flex flex-col gap-6">
                <InfoSection label="About" :text="product.about" />
                <InfoSection label="What We Do" :text="product.whatWeDo" />
                <div class="flex flex-col gap-4">
                  <hr class="border-t border-border-secondary" />
                  <span class="text-body-xsm font-secondary text-text-body-primary uppercase">Outcomes</span>
                  <div class="text-body-lg font-secondary text-text-body-primary">
                    <p>{{ product.outcomesIntro }}</p>
                    <ul class="list-disc pl-8 mt-4 space-y-1">
                      <li v-for="item in product.outcomesList" :key="item">{{ item }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <!-- CTA -->
            <div class="flex items-center gap-0.5">
              <template v-if="hoveredCard === 'product'">
                <button class="btn-filled">Explore Product (Sandbox)</button>
                <button class="btn-icon-filled">
                  <svg viewBox="0 0 24 24" class="w-5 h-5 fill-white"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
                </button>
              </template>
              <button v-else class="btn-outline">Explore Product (Sandbox)</button>
            </div>
          </div>

          <!-- ── Venture Card ───────────────────────────────────────── -->
          <div
            class="card"
            @mouseenter="hoveredCard = 'venture'"
            @mouseleave="hoveredCard = null"
          >
            <div class="flex flex-col gap-8">

              <!-- Header -->
              <div class="flex items-end justify-between">
                <div class="flex flex-col justify-between h-[168px]">
                  <img :src="venture.icon" alt="" class="w-10 h-10 object-contain" />
                  <h3 class="font-primary text-[2.25rem] leading-[2.5rem] tracking-[-0.72px] text-text-heading-primary max-w-[234px]">
                    <span :class="hoveredCard === 'venture' ? 'text-text-highlighted underline decoration-solid' : ''">Venture Studio,</span><br />
                    Bring the idea
                  </h3>
                </div>
                <button
                  class="video-thumb"
                  @click="expandedCard = 'venture'"
                  aria-label="Play Venture video"
                >
                  <img :src="venture.thumb" alt="" class="absolute inset-0 w-full h-full object-cover" />
                  <div class="absolute inset-0 bg-black/20" />
                  <span class="relative z-10 flex items-center justify-center w-12 h-12 rounded-button bg-surface-action">
                    <svg viewBox="0 0 24 24" class="w-6 h-6 fill-white"><path d="M8 5v14l11-7z"/></svg>
                  </span>
                </button>
              </div>

              <!-- Text sections -->
              <div class="flex flex-col gap-6">
                <InfoSection label="About" :text="venture.about" />
                <InfoSection label="What We Do" :text="venture.whatWeDo" />
                <div class="flex flex-col gap-4">
                  <hr class="border-t border-border-secondary" />
                  <span class="text-body-xsm font-secondary text-text-body-primary uppercase">Process and Outcomes</span>
                  <div class="text-body-lg font-secondary text-text-body-primary">
                    <p>{{ venture.outcomesIntro }}</p>
                    <ul class="list-disc pl-8 mt-4 space-y-1">
                      <li v-for="item in venture.outcomesList" :key="item">{{ item }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <!-- CTA -->
            <div class="flex items-center gap-0.5">
              <template v-if="hoveredCard === 'venture'">
                <button class="btn-filled">Explore Venture</button>
                <button class="btn-icon-filled">
                  <svg viewBox="0 0 24 24" class="w-5 h-5 fill-white"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
                </button>
              </template>
              <button v-else class="btn-outline">Explore Venture</button>
            </div>
          </div>

        </div>
      </div>
    </Transition>

    <!-- ══ PRODUCT EXPANDED ══════════════════════════════════════════════════ -->
    <Transition name="fade" mode="out-in">
      <div v-if="expandedCard === 'product'" key="product-expanded" class="container">
        <div class="expanded-card">

          <!-- Left: text content -->
          <div class="expanded-content">
            <div class="flex flex-col gap-2">
              <img :src="product.icon" alt="" class="w-10 h-10 object-contain" />
              <h3 class="font-primary text-[2.25rem] leading-[2.5rem] tracking-[-0.72px] text-text-heading-primary max-w-[305px]">
                Product Studio, Whatever you need, we'll build
              </h3>
            </div>
            <div class="flex flex-col gap-6">
              <InfoSection label="About" :text="product.about" />
              <InfoSection label="What We Do" :text="product.whatWeDo" />
              <div class="flex flex-col gap-4">
                <hr class="border-t border-border-secondary" />
                <span class="text-body-xsm font-secondary text-text-body-primary uppercase">Outcomes</span>
                <div class="text-body-lg font-secondary text-text-body-primary">
                  <p>{{ product.outcomesIntro }}</p>
                  <ul class="list-disc pl-8 mt-4 space-y-1">
                    <li v-for="item in product.outcomesList" :key="item">{{ item }}</li>
                  </ul>
                </div>
              </div>
            </div>
            <button class="btn-outline self-start">Explore Product (Sandbox)</button>
          </div>

          <!-- Right: video -->
          <div class="video-panel">
            <img :src="product.video" alt="Product video" class="absolute inset-0 w-full h-full object-cover rounded-[16px]" />
            <!-- Stop (bottom center) -->
            <button @click="expandedCard = null" class="video-btn-stop" aria-label="Stop video">
              <svg viewBox="0 0 24 24" class="w-6 h-6"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="8" y="8" width="8" height="8" fill="currentColor"/></svg>
            </button>
            <!-- Collapse (top right) -->
            <button @click="expandedCard = null" class="video-btn-collapse" aria-label="Close video">
              <svg viewBox="0 0 24 24" class="w-6 h-6 fill-white"><path d="M22 3.41L16.71 8.7 20 12h-8V4l3.29 3.29L20.59 2 22 3.41zM3.41 22l5.29-5.29L12 20v-8H4l3.29 3.29L2 20.59 3.41 22z"/></svg>
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ══ VENTURE EXPANDED ══════════════════════════════════════════════════ -->
    <Transition name="fade" mode="out-in">
      <div v-if="expandedCard === 'venture'" key="venture-expanded" class="container">
        <div class="expanded-card">

          <!-- Left: video -->
          <div class="video-panel">
            <img :src="venture.video" alt="Venture video" class="absolute inset-0 w-full h-full object-cover rounded-[16px]" />
            <!-- Stop (bottom center) -->
            <button @click="expandedCard = null" class="video-btn-stop" aria-label="Stop video">
              <svg viewBox="0 0 24 24" class="w-6 h-6"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="8" y="8" width="8" height="8" fill="currentColor"/></svg>
            </button>
            <!-- Collapse (top right) -->
            <button @click="expandedCard = null" class="video-btn-collapse" aria-label="Close video">
              <svg viewBox="0 0 24 24" class="w-6 h-6 fill-white"><path d="M22 3.41L16.71 8.7 20 12h-8V4l3.29 3.29L20.59 2 22 3.41zM3.41 22l5.29-5.29L12 20v-8H4l3.29 3.29L2 20.59 3.41 22z"/></svg>
            </button>
          </div>

          <!-- Right: text content -->
          <div class="expanded-content">
            <div class="flex flex-col gap-2">
              <img :src="venture.icon" alt="" class="w-10 h-10 object-contain" />
              <h3 class="font-primary text-[2.25rem] leading-[2.5rem] tracking-[-0.72px] text-text-heading-primary max-w-[234px]">
                Venture Studio, Bring the idea
              </h3>
            </div>
            <div class="flex flex-col gap-6">
              <InfoSection label="About" :text="venture.about" />
              <InfoSection label="What We Do" :text="venture.whatWeDo" />
              <div class="flex flex-col gap-4">
                <hr class="border-t border-border-secondary" />
                <span class="text-body-xsm font-secondary text-text-body-primary uppercase">Process and Outcomes</span>
                <div class="text-body-lg font-secondary text-text-body-primary">
                  <p>{{ venture.outcomesIntro }}</p>
                  <ul class="list-disc pl-8 mt-4 space-y-1">
                    <li v-for="item in venture.outcomesList" :key="item">{{ item }}</li>
                  </ul>
                </div>
              </div>
            </div>
            <button class="btn-outline self-start">Explore Venture</button>
          </div>
        </div>
      </div>
    </Transition>

  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const expandedCard = ref<null | 'product' | 'venture'>(null)
const hoveredCard  = ref<null | 'product' | 'venture'>(null)

// TODO: Replace Figma asset URLs with permanent assets in /public/
const product = {
  icon:         'https://www.figma.com/api/mcp/asset/da65c5d0-c2c7-4f5a-9c06-a79bd4246e19',
  thumb:        'https://www.figma.com/api/mcp/asset/3b858ba2-8246-4716-8dd2-4b794145d00c',
  video:        'https://www.figma.com/api/mcp/asset/187097ef-398c-420a-9878-088fa8456881',
  about:        'A focused collaboration that can last for as long as the project needs us.',
  whatWeDo:     'Validate the business, test assumptions, and ship either a PoC or a finished product. We do consulting, team augmentation, or even take creative lead.',
  outcomesIntro:'You leave with a repo, demo, architecture notes, a prioritized backlog, and a decision memo.',
  outcomesList: ['Decision-ready plan', 'Working PoC', 'Clear next steps'],
}

const venture = {
  icon:         'https://www.figma.com/api/mcp/asset/c967b5fd-c435-44a1-9bb5-77823f7c20d6',
  thumb:        'https://www.figma.com/api/mcp/asset/40f99106-7b13-46c9-a6fa-720674814546',
  video:        'https://www.figma.com/api/mcp/asset/c1c1f244-7511-4902-a327-00b74b21307f',
  about:        'Pitch us. We tailor capital, team, and equity to what moves fastest.',
  whatWeDo:     'We shape team, capital, and scope to move fastest. Founders first; corporates/newcos welcome.',
  outcomesIntro:'Pitch → Working session → Scope → Build & iterate → Raise/scale.',
  outcomesList: ['Company-shaping support', 'Senior product & engineering', 'Access to our network'],
}

// ── Sub-component: info section row ─────────────────────────────────────────
const InfoSection = defineComponent({
  props: { label: String, text: String },
  template: `
    <div class="flex flex-col gap-4">
      <hr class="border-t border-border-secondary" />
      <span class="text-body-xsm font-secondary text-text-body-primary uppercase">{{ label }}</span>
      <p class="text-body-lg font-secondary text-text-body-primary">{{ text }}</p>
    </div>
  `
})
</script>

<style scoped>
/* Card base */
.card {
  @apply backdrop-blur-[7px] bg-[rgba(255,255,255,0.5)] rounded-[16px] px-[60px] py-[40px] flex flex-col gap-8;
}

/* Video thumbnail in collapsed card */
.video-thumb {
  @apply relative w-[120px] h-[120px] flex-shrink-0 overflow-hidden rounded flex items-center justify-center;
}

/* Buttons */
.btn-outline {
  @apply border border-border-action text-text-action-inverted text-body-md font-secondary h-12 px-6 flex items-center rounded-button whitespace-nowrap hover:bg-surface-action hover:text-text-action-primary transition-all duration-200;
}
.btn-filled {
  @apply bg-surface-action text-text-action-primary text-body-md font-secondary h-12 px-6 flex items-center rounded-button whitespace-nowrap;
}
.btn-icon-filled {
  @apply bg-surface-action w-12 h-12 flex items-center justify-center rounded-button flex-shrink-0;
}

/* Expanded card layout */
.expanded-card {
  @apply backdrop-blur-[7px] bg-[rgba(255,255,255,0.5)] rounded-[16px] px-[60px] py-[40px] flex items-start justify-between gap-8;
}
.expanded-content {
  @apply flex flex-col gap-8 w-[576px] flex-shrink-0;
}

/* Video panel */
.video-panel {
  @apply relative w-[479px] h-[648px] flex-shrink-0 overflow-hidden rounded-[16px];
}
.video-btn-stop {
  @apply absolute bottom-6 left-1/2 -translate-x-1/2 bg-white w-12 h-12 rounded-full flex items-center justify-center text-text-heading-primary hover:opacity-80 transition-opacity;
}
.video-btn-collapse {
  @apply absolute top-6 right-6 bg-surface-action w-12 h-12 rounded-button flex items-center justify-center hover:opacity-80 transition-opacity;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
