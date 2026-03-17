<template>
  <main>

    <!-- ═══════════════════════════════════════════════════════════════ HERO -->
    <section class="relative min-h-screen flex items-center justify-center">

      <div class="fixed inset-0 flex items-center justify-center pointer-events-none z-[-1]" aria-hidden="true">
        <img
          src="https://www.figma.com/api/mcp/asset/1f3a81cf-6050-41e9-b33e-0a30604ac7f3"
          alt=""
          class="w-[1264px] h-[949px] object-cover opacity-60 blur-[15px]"
        />
      </div>

      <div class="container relative z-10">
        <div class="grid-12">
          <div class="col-span-12 flex flex-col items-center gap-xlg">
            <div class="flex flex-col items-center gap-lg">
              <div ref="heroTitleRef" class="reveal-title col-span-8 col-start-3 w-full max-w-[724px]">
                <h1 class="text-h1 font-primary text-text-highlighted text-center">
                  We build products and the companies behind them.
                </h1>
              </div>
              <div ref="heroSubtitleRef" class="reveal-fade max-w-[318px]">
                <p class="text-body-lg font-secondary text-text-body-primary text-center">
                  Two paths: Product or Venture. Same senior team, tailored to you.
                </p>
              </div>
            </div>
            <div ref="heroCtaRef" class="reveal-fade flex items-center gap-3">
              <a href="#" class="border border-border-action text-text-action-inverted text-body-md h-12 px-6 flex items-center rounded-button whitespace-nowrap hover:bg-surface-action hover:text-text-action-primary transition-all duration-200">
                Explore Product
              </a>
              <a href="#" class="border border-border-action text-text-action-inverted text-body-md h-12 px-6 flex items-center rounded-button whitespace-nowrap hover:bg-surface-action hover:text-text-action-primary transition-all duration-200">
                Explore Venture
              </a>
            </div>
          </div>
        </div>
      </div>

    </section>

    <!-- ══════════════════════════════════════════════════════════════ INTRO -->
    <section class="relative min-h-screen flex flex-col">

      <div class="container pt-20">
        <div ref="introMarqueeRef" class="reveal-fade flex items-stretch border-t border-border-secondary">
          <div class="flex items-center pr-10 shrink-0 py-6">
            <span class="text-body-xsm font-secondary text-text-label-primary uppercase tracking-widest whitespace-nowrap">
              trusted by
            </span>
          </div>
          <div class="border-l border-border-secondary overflow-hidden flex-1">
            <div class="marquee-track py-6">
              <template v-for="n in 2" :key="n">
                <div
                  v-for="logo in logos"
                  :key="`${n}-${logo.name}`"
                  class="flex items-center justify-center px-10 shrink-0"
                >
                  <img :src="logo.src" :alt="logo.name" class="h-8 w-auto object-contain max-w-[140px]" />
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="container flex-1 flex items-center py-20">
        <div class="grid-12 w-full">
          <div class="col-span-12 flex flex-col items-center gap-8">
            <div ref="introLabelRef" class="reveal-fade">
              <span class="text-body-xsm font-secondary text-text-label-primary uppercase tracking-widest">
                choose your path
              </span>
            </div>
            <div ref="introHeadingRef" class="reveal-title col-span-10 col-start-2 w-full">
              <h2 class="text-h2 font-primary text-text-heading-primary text-center">
                Every project is custom. Whether it's design-only, team augmentation,
                or full product org. We've embedded for years, delivered end-to-end
                for crypto PSPs, staffed multinationals, and hired our own replacements
                without slowing delivery.
              </h2>
            </div>
          </div>
        </div>
      </div>

    </section>

    <!-- ════════════════════════════════════════════════════════════════ PATH -->
    <section class="relative py-20">

      <Transition name="fade" mode="out-in">
        <div v-if="!expandedCard" key="cards" class="container">
          <div class="grid grid-cols-2 gap-4">

            <!-- Product Card -->
            <div class="card" @mouseenter="hoveredCard = 'product'" @mouseleave="hoveredCard = null">
              <div class="flex flex-col gap-8">
                <div class="flex items-end justify-between">
                  <div class="flex flex-col gap-2 max-w-[311px]">
                    <img :src="product.icon" alt="" class="w-10 h-10 object-contain" />
                    <h3 class="font-primary text-[2.25rem] leading-[2.5rem] tracking-[-0.72px] text-text-heading-primary">
                      <span :class="hoveredCard === 'product' ? 'text-text-highlighted underline decoration-solid' : ''">Product Studio,</span><br />
                      Whatever you need, we'll build
                    </h3>
                  </div>
                  <button class="video-thumb" @click="expandedCard = 'product'" aria-label="Play Product video">
                    <img :src="product.thumb" alt="" class="absolute inset-0 w-full h-full object-cover" />
                    <span class="relative z-10 flex items-center justify-center w-12 h-12 rounded-button bg-surface-action">
                      <svg viewBox="0 0 24 24" class="w-6 h-6 fill-white"><path d="M8 5v14l11-7z"/></svg>
                    </span>
                  </button>
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
              </div>
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

            <!-- Venture Card -->
            <div class="card" @mouseenter="hoveredCard = 'venture'" @mouseleave="hoveredCard = null">
              <div class="flex flex-col gap-8">
                <div class="flex items-end justify-between">
                  <div class="flex flex-col justify-between h-[168px]">
                    <img :src="venture.icon" alt="" class="w-10 h-10 object-contain" />
                    <h3 class="font-primary text-[2.25rem] leading-[2.5rem] tracking-[-0.72px] text-text-heading-primary max-w-[234px]">
                      <span :class="hoveredCard === 'venture' ? 'text-text-highlighted underline decoration-solid' : ''">Venture Studio,</span><br />
                      Bring the idea
                    </h3>
                  </div>
                  <button class="video-thumb" @click="expandedCard = 'venture'" aria-label="Play Venture video">
                    <img :src="venture.thumb" alt="" class="absolute inset-0 w-full h-full object-cover" />
                    <div class="absolute inset-0 bg-black/20" />
                    <span class="relative z-10 flex items-center justify-center w-12 h-12 rounded-button bg-surface-action">
                      <svg viewBox="0 0 24 24" class="w-6 h-6 fill-white"><path d="M8 5v14l11-7z"/></svg>
                    </span>
                  </button>
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
              </div>
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

      <!-- Product expanded -->
      <Transition name="fade" mode="out-in">
        <div v-if="expandedCard === 'product'" key="product-expanded" class="container">
          <div class="expanded-card">
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
            <div class="video-panel">
              <img :src="product.video" alt="Product video" class="absolute inset-0 w-full h-full object-cover rounded-[16px]" />
              <button @click="expandedCard = null" class="video-btn-stop" aria-label="Stop video">
                <svg viewBox="0 0 24 24" class="w-6 h-6"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="8" y="8" width="8" height="8" fill="currentColor"/></svg>
              </button>
              <button @click="expandedCard = null" class="video-btn-collapse" aria-label="Close video">
                <svg viewBox="0 0 24 24" class="w-6 h-6 fill-white"><path d="M22 3.41L16.71 8.7 20 12h-8V4l3.29 3.29L20.59 2 22 3.41zM3.41 22l5.29-5.29L12 20v-8H4l3.29 3.29L2 20.59 3.41 22z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Venture expanded -->
      <Transition name="fade" mode="out-in">
        <div v-if="expandedCard === 'venture'" key="venture-expanded" class="container">
          <div class="expanded-card">
            <div class="video-panel">
              <img :src="venture.video" alt="Venture video" class="absolute inset-0 w-full h-full object-cover rounded-[16px]" />
              <button @click="expandedCard = null" class="video-btn-stop" aria-label="Stop video">
                <svg viewBox="0 0 24 24" class="w-6 h-6"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="8" y="8" width="8" height="8" fill="currentColor"/></svg>
              </button>
              <button @click="expandedCard = null" class="video-btn-collapse" aria-label="Close video">
                <svg viewBox="0 0 24 24" class="w-6 h-6 fill-white"><path d="M22 3.41L16.71 8.7 20 12h-8V4l3.29 3.29L20.59 2 22 3.41zM3.41 22l5.29-5.29L12 20v-8H4l3.29 3.29L2 20.59 3.41 22z"/></svg>
              </button>
            </div>
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

    <!-- ══════════════════ WHITE BACKGROUND FROM HERE TO BOTTOM ══════════════ -->
    <div class="bg-brand-white">

    <!-- ══════════════════════════════════════════════════════════ PROJECTS -->
    <!-- StickyCarousel: image cards with progress bar -->
    <StickyCarousel :items="projects" v-slot="{ item, fillPx }">
      <div class="container">
        <div class="flex flex-col gap-md">

          <NuxtLink :to="item.url" class="block group cursor-pointer">
            <div class="relative bg-black rounded-[16px] overflow-hidden" style="height: 692px">
              <div
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
                style="width: 83.3%; height: 94.5%"
              >
                <img
                  :src="item.image"
                  :alt="item.title"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
              <!-- Progress bar — dark track, white fill -->
              <div class="absolute top-1/2 -translate-y-1/2 pointer-events-none z-10" style="right: 40px">
                <div class="relative rounded-full" style="width: 4px; height: 80px; background: #525252">
                  <div
                    class="absolute top-0 left-0 w-full rounded-full bg-white transition-all duration-150"
                    :style="{ height: fillPx + 'px' }"
                  />
                </div>
              </div>
            </div>
          </NuxtLink>

          <div class="flex items-end justify-between">
            <NuxtLink :to="item.url">
              <h3 class="text-h3 font-primary text-text-heading-primary hover:text-text-highlighted transition-colors duration-200">
                {{ item.title }}
              </h3>
            </NuxtLink>
            <p class="font-secondary text-body-md text-text-body-primary max-w-[630px]">
              {{ item.description }}
            </p>
          </div>

        </div>
      </div>
    </StickyCarousel>

    <!-- ═══════════════════════════════════════════════════════════════ PROOF -->
    <!-- Stacking rows only — no testimonial card -->
    <section class="py-[60px] pb-24">
      <div class="container flex flex-col gap-lg">

        <p class="text-body-xsm font-secondary text-text-label-primary uppercase text-center">
          proof and recognition
        </p>

        <div>
          <div
            v-for="(item, i) in proofItems"
            :key="item.id"
            :ref="(el) => setProofRowRef(el as HTMLElement | null, i)"
            class="sticky border-t border-border-secondary flex gap-[131px] items-center"
            :style="{ top: `${PROOF_STACK_BASE + i * PROOF_STACK_STEP}px`, zIndex: i + 1 }"
          >
            <div class="py-lg shrink-0 flex items-center justify-center w-8 h-8">
              <img :src="item.icon" :alt="item.label" class="w-full h-full object-contain" />
            </div>
            <div class="flex-1 border-l border-border-secondary px-lg py-lg">
              <p
                class="text-h2 font-primary tracking-[-0.96px] transition-colors duration-700"
                :class="activeProofRows.has(i) ? 'text-text-highlighted' : 'text-text-heading-primary'"
              >
                {{ item.text }}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- ════════════════════════════════════════════════════════ FEEDBACK -->
    <!-- StickyCarousel: blue testimonial cards with progress bar -->
    <div>
      <StickyCarousel :items="testimonials" v-slot="{ item, fillPx }">
        <div class="container">
          <div class="relative bg-surface-action rounded-[16px] overflow-hidden" style="height: 692px">

            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-[80px] items-center w-[954px]">
              <p class="text-body-xsm font-secondary text-white uppercase tracking-widest">
                what our clients say
              </p>
              <div class="flex flex-col gap-[60px] items-center">
                <p class="text-h1 font-primary text-white text-center" style="max-width: 796px">
                  "{{ item.quote }}"
                </p>
                <div class="flex flex-col items-center gap-1">
                  <p class="text-body-md font-secondary text-white text-center font-medium">{{ item.name }}</p>
                  <p class="text-body-md font-secondary text-white text-center">
                    {{ item.role }}, <span class="underline">{{ item.company }}</span>
                  </p>
                </div>
              </div>
            </div>

            <!-- Progress bar — blue-500 track, white fill -->
            <div class="absolute top-1/2 -translate-y-1/2 right-6 pointer-events-none z-10">
              <div class="relative rounded-full" style="width: 4px; height: 80px; background: #2191ff">
                <div
                  class="absolute top-0 left-0 w-full rounded-full bg-white transition-all duration-150"
                  :style="{ height: fillPx + 'px' }"
                />
              </div>
            </div>

          </div>
        </div>
      </StickyCarousel>
    </div>

    <!-- ═══════════════════════════════════════════════════════════════ FAQS -->
    <section class="py-[60px]">
      <div class="container flex flex-col gap-lg">

        <p class="text-body-xsm font-secondary text-text-label-primary uppercase text-center">
          faqs
        </p>

        <div>
          <div
            v-for="faq in faqs"
            :key="faq.id"
            class="border-t border-border-secondary flex items-start w-full"
          >
            <div class="flex items-center py-[40px] shrink-0 w-[80px]">
              <span class="text-body-xsm font-secondary text-brand-black uppercase">{{ faq.number }}</span>
            </div>
            <div class="flex-1 border-l border-border-secondary flex flex-col h-[200px] items-start justify-between pt-[40px] px-[40px]">
              <h3 class="text-h3 font-primary text-text-heading-primary tracking-[-0.72px]">{{ faq.question }}</h3>
              <div class="text-body-md font-secondary max-w-[638px]">
                <a v-if="faq.isLink" href="#" class="text-text-highlighted underline hover:opacity-80 transition-opacity">{{ faq.answer }}</a>
                <p v-else class="text-text-body-primary whitespace-pre-line">{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════ FOOTER -->
    <TheFooter />

    </div><!-- end white background -->

    <TheNavbar />

  </main>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'

// ─── HERO ────────────────────────────────────────────────────────────────────
const heroTitleRef    = ref<HTMLElement | null>(null)
const heroSubtitleRef = ref<HTMLElement | null>(null)
const heroCtaRef      = ref<HTMLElement | null>(null)

// ─── INTRO ───────────────────────────────────────────────────────────────────
const introMarqueeRef = ref<HTMLElement | null>(null)
const introLabelRef   = ref<HTMLElement | null>(null)
const introHeadingRef = ref<HTMLElement | null>(null)

const logos = [
  { name: 'AT&T',          src: 'https://www.figma.com/api/mcp/asset/8b23cabc-c6c4-45a4-9346-7c327f5fa974' },
  { name: 'Protocol Labs', src: 'https://www.figma.com/api/mcp/asset/a8fd3ebe-1b98-461a-adc1-4a4a173603f4' },
  { name: 'Uphold',        src: 'https://www.figma.com/api/mcp/asset/2a89920c-a364-4e00-8f62-8f1fe5af878b' },
  { name: 'Remote',        src: 'https://www.figma.com/api/mcp/asset/a03e0c20-06c3-41b7-a53d-99361af79ec7' },
  { name: 'Brazos',        src: 'https://www.figma.com/api/mcp/asset/8bfd8169-7240-45a2-81e4-70044d58f896' },
  { name: 'Orki',          src: 'https://www.figma.com/api/mcp/asset/c43825ff-0bb0-405f-b994-cc52d7c9c70c' },
  { name: 'Quill',         src: 'https://www.figma.com/api/mcp/asset/4bc5bb2c-c189-4022-a4ef-103b77d857c6' },
]

// ─── PATH ────────────────────────────────────────────────────────────────────
const expandedCard = ref<null | 'product' | 'venture'>(null)
const hoveredCard  = ref<null | 'product' | 'venture'>(null)

const product = {
  icon:         'https://www.figma.com/api/mcp/asset/da65c5d0-c2c7-4f5a-9c06-a79bd4246e19',
  thumb:        'https://www.figma.com/api/mcp/asset/3b858ba2-8246-4716-8dd2-4b794145d00c',
  video:        'https://www.figma.com/api/mcp/asset/187097ef-398c-420a-9878-088fa8456881',
  about:        'A focused collaboration that can last for as long as the project needs us.',
  whatWeDo:     'Validate the business, test assumptions, and ship either a PoC or a finished product.',
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

// ─── PROJECTS (StickyCarousel data) ──────────────────────────────────────────
const projects = [
  {
    id: 'filecoin-station',
    title: 'FileCoin Station',
    description: 'Filecoin Station is part of the broader Protocol Labs ecosystem. It has two jobs: connecting users to decentralized storage and providing rewards for participation.',
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

// ─── PROOF & RECOGNITION (stacking rows only) ────────────────────────────────
const PROOF_STACK_BASE = 96  // top offset for first row (matches navbar safe zone)
const PROOF_STACK_STEP = 64  // additional offset per subsequent row

const proofItems = [
  {
    id: 'funding',
    label: 'Funding',
    icon: 'https://www.figma.com/api/mcp/asset/293f929a-5ada-4258-b05b-f605cf7bb776',
    text: 'Helped raised $100M',
  },
  {
    id: 'countries',
    label: 'Countries',
    icon: 'https://www.figma.com/api/mcp/asset/0ca0d78f-833f-4338-aec1-65d9d76e2129',
    text: '10 countries connected',
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: 'https://www.figma.com/api/mcp/asset/cb63919a-180b-40f3-adda-27c01fad5cd8',
    text: '35 new projects (2020)',
  },
  {
    id: 'deloitte',
    label: 'Deloitte',
    icon: 'https://www.figma.com/api/mcp/asset/8d006a4e-46bf-40a5-9c27-4ebf96d700aa',
    text: 'Deloitte Technology Fast 500 EMEA (2019)',
  },
]

const proofRowRefs  = ref<(HTMLElement | null)[]>([])
const activeProofRows = ref<Set<number>>(new Set())

function setProofRowRef(el: HTMLElement | null, i: number) {
  proofRowRefs.value[i] = el
}

function onProofScroll() {
  const next = new Set<number>()
  proofRowRefs.value.forEach((el, i) => {
    if (!el) return
    const stickyTop = PROOF_STACK_BASE + i * PROOF_STACK_STEP
    if (el.getBoundingClientRect().top <= stickyTop + 2) next.add(i)
  })
  activeProofRows.value = next
}

// ─── FEEDBACK / TESTIMONIALS (StickyCarousel data) ───────────────────────────
const testimonials = [
  {
    quote:   'We … got the product built on time; we found a highly engaged team.',
    name:    'Rui Silva',
    role:    'EVP Product',
    company: 'Uphold',
  },
  {
    quote:   'Subvisual helped us move fast without sacrificing quality. They truly became part of our team.',
    name:    'Alex Costa',
    role:    'Co-founder',
    company: 'Significa',
  },
  {
    quote:   'The level of craft and attention to detail they bring is rare. We ship better products together.',
    name:    'Maria Santos',
    role:    'CTO',
    company: 'Remote',
  },
]

// ─── FAQS ────────────────────────────────────────────────────────────────────
const faqs = [
  {
    id: '01',
    number: '01',
    question: 'What is Subvisual?',
    answer: 'A product and venture studio. We build software and help build the company around it. We specialise in Web3 and how it intersects with AI.',
  },
  {
    id: '02',
    number: '02',
    question: 'How do the two paths differ?',
    answer: 'Product = a hands-on sprint (Sandbox) to validate and build.\nVenture = a longer partnership where we co-build the company.',
  },
  {
    id: '03',
    number: '03',
    question: 'Do you work with corporates/newcos?',
    answer: 'Yes',
  },
  {
    id: '04',
    number: '04',
    question: 'What do I get from the Sandbox?',
    answer: 'Working PoC, decision-ready plan, and clear next steps.',
  },
  {
    id: '05',
    number: '05',
    question: "I'm ready. How do we start?",
    answer: 'Book Intro',
    isLink: true,
  },
]

// ─── LIFECYCLE ───────────────────────────────────────────────────────────────
onMounted(() => {
  const { observe } = useScrollReveal()
  observe(heroTitleRef.value,    0)
  observe(heroSubtitleRef.value, 200)
  observe(heroCtaRef.value,      400)
  observe(introMarqueeRef.value, 0)
  observe(introLabelRef.value,   100)
  observe(introHeadingRef.value, 200)

  window.addEventListener('scroll', onProofScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onProofScroll)
})
</script>

<style scoped>
/* ── Path: card base ─────────────────────────────────────────────────────── */
.card {
  @apply backdrop-blur-[7px] bg-[rgba(255,255,255,0.5)] rounded-[16px] px-[60px] py-[40px] flex flex-col gap-8;
}
.video-thumb {
  @apply relative w-[120px] h-[120px] flex-shrink-0 overflow-hidden rounded flex items-center justify-center;
}
.btn-outline {
  @apply border border-border-action text-text-action-inverted text-body-md font-secondary h-12 px-6 flex items-center rounded-button whitespace-nowrap hover:bg-surface-action hover:text-text-action-primary transition-all duration-200;
}
.btn-filled {
  @apply bg-surface-action text-text-action-primary text-body-md font-secondary h-12 px-6 flex items-center rounded-button whitespace-nowrap;
}
.btn-icon-filled {
  @apply bg-surface-action w-12 h-12 flex items-center justify-center rounded-button flex-shrink-0;
}
.expanded-card {
  @apply backdrop-blur-[7px] bg-[rgba(255,255,255,0.5)] rounded-[16px] px-[60px] py-[40px] flex items-start justify-between gap-8;
}
.expanded-content {
  @apply flex flex-col gap-8 w-[576px] flex-shrink-0;
}
.video-panel {
  @apply relative w-[479px] h-[648px] flex-shrink-0 overflow-hidden rounded-[16px];
}
.video-btn-stop {
  @apply absolute bottom-6 left-1/2 -translate-x-1/2 bg-white w-12 h-12 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity;
  color: var(--color-text-heading-primary);
}
.video-btn-collapse {
  @apply absolute top-6 right-6 bg-surface-action w-12 h-12 rounded-button flex items-center justify-center hover:opacity-80 transition-opacity;
}

/* ── Transitions ──────────────────────────────────────────────────────────── */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
