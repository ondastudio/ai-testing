<template>
  <main>

    <!-- ═══════════════════════════════════════════════════════════════ HERO -->
    <section class="relative min-h-screen flex items-center justify-center">

      <div class="fixed inset-0 flex items-center justify-center pointer-events-none z-[-1]" aria-hidden="true">
        <video
          :src="bgVideo"
          class="hero-blob opacity-60 blur-[15px] mix-blend-screen"
          autoplay
          loop
          muted
          playsinline
        />
      </div>

      <div class="container relative z-10">
        <div class="grid-12">
          <div class="col-span-12 flex flex-col items-center gap-xlg">
            <div class="flex flex-col items-center gap-lg">
              <div ref="heroTitleRef" class="reveal-title w-full max-w-[724px]">
                <h1 class="text-h1 font-primary text-text-highlighted text-center">
                  We build products and the companies behind them.
                </h1>
              </div>
              <div ref="heroSubtitleRef" class="reveal-slide max-w-[318px]">
                <p class="text-body-lg font-secondary text-text-body-primary text-center">
                  Two paths: Product or Venture. Same senior team, tailored to you.
                </p>
              </div>
            </div>
            <div ref="heroCtaRef" class="reveal-slide flex items-center gap-3xsm">
              <AppButton variant="outline" href="#">Explore Product</AppButton>
              <AppButton variant="outline" href="#">Explore Venture</AppButton>
            </div>
          </div>
        </div>
      </div>

    </section>

    <!-- ══════════════════════════════════════════════════════════════ INTRO -->
    <section class="relative flex flex-col">

      <div class="container pt-2xlg">
        <div ref="introMarqueeRef" class="reveal-slide flex items-stretch border-t border-border-secondary">
          <div class="flex items-center pr-lg shrink-0 py-sm">
            <span class="text-body-xsm font-secondary text-text-label-primary uppercase tracking-widest whitespace-nowrap">
              trusted by
            </span>
          </div>
          <div class="border-l border-border-secondary overflow-hidden flex-1">
            <div class="marquee-track py-sm">
              <template v-for="n in 2" :key="n">
                <img
                  v-for="logo in logos"
                  :key="`${n}-${logo.name}`"
                  :src="logo.src"
                  :alt="logo.name"
                  class="h-[34px] w-auto shrink-0"
                />
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="container flex-1 flex items-center pt-2xlg pb-0">
        <div class="grid-12 w-full">
          <div ref="introContentRef" class="col-span-12 flex flex-col items-center gap-xlg">
            <!-- label + heading grouped with gap-md -->
            <div class="flex flex-col items-center gap-md w-full">
              <div ref="introLabelRef">
                <span class="text-body-xsm font-secondary text-text-label-primary uppercase tracking-widest">
                  choose your path
                </span>
              </div>
              <div ref="introHeadingRef" class="w-full">
                <h2 class="text-h2 font-primary text-text-heading-primary text-center">
                  Every project is custom. Whether it's design-only, team augmentation,
                  or full product org. We've embedded for years, delivered end-to-end
                  for crypto PSPs, staffed multinationals, and hired our own replacements
                  without slowing delivery.
                </h2>
              </div>
            </div>
            <img ref="introIconRef" :src="iconCallSplit" alt="" class="w-10 h-10" aria-hidden="true" />
          </div>
        </div>
      </div>

    </section>

    <!-- ════════════════════════════════════════════════════════════════ PATH -->
    <section class="relative pt-xlg pb-2xlg">
      <div class="container relative">

        <!-- Each card lives in a slot that transitions its width on expand/collapse -->
        <div class="path-cards">
          <div
            v-for="card in cards"
            :key="card.id"
            class="path-card-slot"
            :class="{
              'path-card-slot--expanded': expandedCard === card.id,
              'path-card-slot--hidden':   expandedCard !== null && expandedCard !== card.id,
            }"
          >
            <Transition name="path-body" mode="out-in">

              <!-- Collapsed -->
              <div v-if="expandedCard !== card.id" key="collapsed">
                <PathCard
                  :data="card"
                  :hovered="hoveredCard === card.id"
                  @expand="expandedCard = card.id"
                  @hoverenter="hoveredCard = card.id"
                  @hoverleave="hoveredCard = null"
                />
              </div>

              <!-- Expanded -->
              <div
                v-else
                key="expanded"
                class="expanded-card"
                :class="{ 'flex-row-reverse': card.videoSide === 'left' }"
              >
                <div class="expanded-content">
                  <div class="flex flex-col gap-2xsm">
                    <img :src="card.icon" alt="" class="w-10 h-10 object-contain" />
                    <h3 class="text-h3 font-primary text-text-heading-primary">
                      {{ card.headingHighlight }},<br />{{ card.headingRest }}
                    </h3>
                  </div>
                  <div class="flex flex-col gap-lg">
                    <InfoSection label="About" :text="card.about" />
                    <InfoSection label="What We Do" :text="card.whatWeDo" />
                    <div class="flex flex-col gap-xsm">
                      <hr class="border-t border-border-secondary" />
                      <span class="text-body-xsm font-secondary text-text-body-primary uppercase">{{ card.outcomesLabel }}</span>
                      <div class="text-body-lg font-secondary text-text-body-primary">
                        <p>{{ card.outcomesIntro }}</p>
                        <ul class="list-disc pl-8 mt-xsm space-y-2xsm">
                          <li v-for="item in card.outcomesList" :key="item">{{ item }}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <AppButton variant="outline-icon" href="#" class="self-start">{{ card.buttonLabel }}</AppButton>
                </div>

                <div class="video-panel" :class="card.videoSide === 'left' ? 'video-panel--left' : 'video-panel--right'">
                  <img :src="card.video" :alt="`${card.headingHighlight} video`" class="absolute inset-0 w-full h-full object-cover" style="border-radius: var(--border-radius-card)" />
                  <button @click="expandedCard = null" class="video-btn-stop" aria-label="Stop video">
                    <svg viewBox="0 0 24 24" class="w-5 h-5"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="8" y="8" width="8" height="8" fill="currentColor"/></svg>
                  </button>
                  <button @click="expandedCard = null" class="video-btn-collapse" aria-label="Close video">
                    <svg viewBox="0 0 24 24" class="w-5 h-5 fill-white"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                  </button>
                </div>
              </div>

            </Transition>
          </div>
        </div>

      </div>
    </section>

    <!-- ══════════════════ WHITE BACKGROUND FROM HERE TO BOTTOM ══════════════ -->
    <div class="bg-brand-white">

    <!-- ══════════════════════════════════════════════════════════ PROJECTS -->
    <StickyCarousel :items="projects" v-slot="{ item, fillPx }">
      <div class="container">
        <div class="flex flex-col gap-md">

          <NuxtLink :to="item.url" class="block group cursor-pointer">
            <div class="relative bg-black rounded-card overflow-hidden" style="height: var(--carousel-card-h)">
              <div
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
                style="width: 83.3%; height: 94.5%"
              >
                <img
                  :src="item.image"
                  :alt="item.title"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
              <!-- Progress bar — dark track, white fill -->
              <div class="absolute top-1/2 -translate-y-1/2 pointer-events-none z-10" style="right: var(--spacing-lg)">
                <div class="progress-bar-track">
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
    <section class="py-xlg pb-3xlg">
      <div class="container flex flex-col gap-lg">

        <p ref="proofLabelRef" class="reveal-fade text-body-xsm font-secondary text-text-label-primary uppercase text-center">
          proof and recognition
        </p>

        <div class="flex flex-col gap-lg">
          <div
            v-for="(item, i) in proofItems"
            :key="item.id"
            :ref="(el) => setProofRowRef(el as HTMLElement | null, i)"
            class="sticky bg-brand-white border-t border-border-secondary flex gap-proof-gap items-center"
            :style="{ top: `${PROOF_STACK_BASE + i * PROOF_STACK_STEP}px`, zIndex: i + 1 }"
          >
            <div class="shrink-0 flex items-center justify-center w-8 h-8">
              <img :src="item.icon" :alt="item.label" class="w-full h-full object-contain" />
            </div>
            <div class="flex-1 border-l border-border-secondary p-lg">
              <p
                class="text-h2 font-primary transition-colors duration-700"
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
    <div>
      <StickyCarousel :items="testimonials" v-slot="{ item, fillPx }">
        <div class="container">
          <div class="relative bg-surface-action rounded-card overflow-hidden" style="height: var(--carousel-card-h)">

            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2xlg items-center w-[954px]">
              <p class="text-body-xsm font-secondary text-white uppercase tracking-widest">
                what our clients say
              </p>
              <div class="flex flex-col gap-xlg items-center">
                <p class="text-h1 font-primary text-white text-center" style="max-width: 796px">
                  "{{ item.quote }}"
                </p>
                <div class="flex flex-col items-center gap-2xsm">
                  <p class="text-body-md font-secondary text-white text-center font-medium">{{ item.name }}</p>
                  <p class="text-body-md font-secondary text-white text-center">
                    {{ item.role }}, <span class="underline">{{ item.company }}</span>
                  </p>
                </div>
              </div>
            </div>

            <!-- Progress bar — blue-500 track, white fill -->
            <div class="absolute top-1/2 -translate-y-1/2 pointer-events-none z-10" style="right: var(--spacing-lg)">
              <div class="progress-bar-track progress-bar-track--blue">
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
    <section class="pt-xlg" style="padding-bottom: 200px">
      <div class="container flex flex-col gap-lg">

        <p ref="faqLabelRef" class="reveal-fade text-body-xsm font-secondary text-text-label-primary uppercase">
          faqs
        </p>

        <div class="flex flex-col gap-lg">
          <div
            v-for="(faq, i) in faqs"
            :key="faq.number"
            :ref="(el) => { faqRefs[i] = el as HTMLElement | null }"
            class="reveal-slide border-t border-border-secondary flex items-start w-full"
            style="gap: 315px"
          >
            <div class="flex items-center py-lg shrink-0">
              <span class="text-body-xsm font-secondary text-brand-black uppercase">{{ faq.number }}</span>
            </div>
            <div class="flex-1 border-l border-border-secondary flex flex-col h-[200px] items-start justify-between pt-lg px-lg">
              <h3 class="text-h3 font-primary text-text-heading-primary">{{ faq.question }}</h3>
              <div class="text-body-md font-secondary max-w-[638px]">
                <a v-if="faq.isLink" :href="faq.link" class="text-text-highlighted underline hover:opacity-80 transition-opacity">{{ faq.answer }}</a>
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
// ─── HERO ────────────────────────────────────────────────────────────────────
const heroTitleRef    = ref<HTMLElement | null>(null)
const heroSubtitleRef = ref<HTMLElement | null>(null)
const heroCtaRef      = ref<HTMLElement | null>(null)

// ─── INTRO ───────────────────────────────────────────────────────────────────

const introMarqueeRef  = ref<HTMLElement | null>(null)
const introContentRef  = ref<HTMLElement | null>(null)
const introLabelRef    = ref<HTMLElement | null>(null)
const introHeadingRef  = ref<HTMLElement | null>(null)
const introIconRef     = ref<HTMLElement | null>(null)

import bgVideo        from '~/assets/3d-bg.mp4'
import iconCallSplit   from '~/assets/icons/call_split.svg'
import iconFunding     from '~/assets/icons/money_bag.svg'
import iconCountries   from '~/assets/icons/globe_location_pin.svg'
import iconProjects    from '~/assets/icons/rocket_launch.svg'
import iconDeloitte    from '~/assets/icons/rewarded_ads.svg'

import logoAtt      from '~/assets/svg/att.svg'
import logoProtocol  from '~/assets/svg/Protocol.svg'
import logoUphold    from '~/assets/svg/Uphold.svg'
import logoRemote    from '~/assets/svg/Remote.svg'
import logoBrazos    from '~/assets/svg/Brazos.svg'
import logoOrki      from '~/assets/svg/Orki.svg'
import logoQuill     from '~/assets/svg/Quill.svg'

const logos = [
  { name: 'AT&T',          src: logoAtt },
  { name: 'Protocol Labs', src: logoProtocol },
  { name: 'Uphold',        src: logoUphold },
  { name: 'Remote',        src: logoRemote },
  { name: 'Brazos',        src: logoBrazos },
  { name: 'Orki',          src: logoOrki },
  { name: 'Quill',         src: logoQuill },
]

// ─── PATH ────────────────────────────────────────────────────────────────────
const { cards } = usePathCards()

const expandedCard = ref<null | 'product' | 'venture'>(null)
const hoveredCard  = ref<null | 'product' | 'venture'>(null)

// ─── PROJECTS ────────────────────────────────────────────────────────────────
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

// ─── PROOF & RECOGNITION ─────────────────────────────────────────────────────
const PROOF_STACK_BASE = 96
const PROOF_STACK_STEP = 64

const proofItems = [
  { id: 'funding',  label: 'Funding',  icon: iconFunding,   text: 'Helped raised $100M' },
  { id: 'countries',label: 'Countries',icon: iconCountries, text: '10 countries connected' },
  { id: 'projects', label: 'Projects', icon: iconProjects,  text: '35 new projects (2020)' },
  { id: 'deloitte', label: 'Deloitte', icon: iconDeloitte,  text: 'Deloitte Technology Fast 500 EMEA (2019)' },
]

const proofLabelRef   = ref<HTMLElement | null>(null)
const proofRowRefs    = ref<(HTMLElement | null)[]>([])
const activeProofRows = ref<Set<number>>(new Set())

function setProofRowRef(el: HTMLElement | null, i: number) {
  proofRowRefs.value[i] = el
}

// rAF-throttled — runs at most once per frame
let proofRafId: number | null = null
function onProofScroll() {
  if (proofRafId) return
  proofRafId = requestAnimationFrame(() => {
    proofRafId = null
    const next = new Set<number>()
    proofRowRefs.value.forEach((el, i) => {
      if (!el) return
      const stickyTop = PROOF_STACK_BASE + i * PROOF_STACK_STEP
      if (el.getBoundingClientRect().top <= stickyTop + 2) next.add(i)
    })
    activeProofRows.value = next
  })
}

// ─── TESTIMONIALS ────────────────────────────────────────────────────────────
const testimonials = [
  { quote: 'We … got the product built on time; we found a highly engaged team.', name: 'Rui Silva',   role: 'EVP Product', company: 'Uphold' },
  { quote: 'Subvisual helped us move fast without sacrificing quality. They truly became part of our team.', name: 'Alex Costa',  role: 'Co-founder',  company: 'Significa' },
  { quote: 'The level of craft and attention to detail they bring is rare. We ship better products together.', name: 'Maria Santos', role: 'CTO',         company: 'Remote' },
]

// ─── FAQS ────────────────────────────────────────────────────────────────────
const faqLabelRef = ref<HTMLElement | null>(null)
const faqRefs     = ref<(HTMLElement | null)[]>([])

import { asLink } from '@prismicio/client'

const { client } = usePrismic()
const { data: homeDoc } = await useAsyncData('home', () => client.getSingle('home'))

const faqs = computed(() => {
  const items = homeDoc.value?.data?.faqs
  if (!items?.length) return []
  return items.map((item: any, i: number) => ({
    id:       String(i + 1),
    number:   item.number   ?? String(i + 1).padStart(2, '0'),
    question: item.question ?? '',
    answer:   item.answer   ?? '',
    isLink:   item.is_link  ?? false,
    link:     asLink(item.link) ?? '#',
  }))
})

// ─── LIFECYCLE ───────────────────────────────────────────────────────────────
const { $lenis } = useNuxtApp()

// ─── SCROLL-DRIVEN INTRO ANIMATION ───────────────────────────────────────────
// Each element reveals as the section scrolls from the viewport bottom to ~40%
// from the top. Progress is mapped per-element with a stagger offset.

function mapRange(value: number, start: number, end: number) {
  return Math.max(0, Math.min(1, (value - start) / (end - start)))
}

function onIntroScroll() {
  const container = introContentRef.value
  if (!container) return

  const rect = container.getBoundingClientRect()
  const vh   = window.innerHeight

  // 0 = section top at viewport bottom, 1 = section top at 40% from top
  const progress = mapRange(vh - rect.top, 0, vh * 0.6)

  const reveal = (el: HTMLElement | null, pStart: number, pEnd: number, yMax = 48) => {
    if (!el) return
    const p = mapRange(progress, pStart, pEnd)
    el.style.opacity   = String(p)
    el.style.transform = `translateY(${yMax * (1 - p)}px)`
  }

  reveal(introLabelRef.value,   0.00, 0.35, 32)
  reveal(introHeadingRef.value, 0.15, 0.70, 56)

  // Icon has a base rotate(180deg) — combine with the y-offset
  const iconEl = introIconRef.value
  if (iconEl) {
    const p = mapRange(progress, 0.55, 0.90)
    iconEl.style.opacity   = String(p)
    // After rotate(180deg), translateY is visually inverted — use negative to come from below
    iconEl.style.transform = `rotate(180deg) translateY(${-20 * (1 - p)}px)`
  }
}

onMounted(() => {
  const { observe } = useScrollReveal()

  // Set initial hidden state for scroll-driven intro elements
  ;[introLabelRef.value, introHeadingRef.value, introIconRef.value].forEach(el => {
    if (el) { el.style.opacity = '0'; el.style.willChange = 'opacity, transform' }
  })

  // Hero (staggered entrance after nav)
  observe(heroTitleRef.value,    400)
  observe(heroSubtitleRef.value, 600)
  observe(heroCtaRef.value,      800)

  // Intro marquee (intersection-triggered)
  observe(introMarqueeRef.value, 0)

  // Proof
  observe(proofLabelRef.value, 0)

  // FAQs — staggered by 100ms each
  observe(faqLabelRef.value, 0)
  faqRefs.value.forEach((el, i) => observe(el, i * 100))

  ;($lenis as any).on('scroll', onProofScroll)
  ;($lenis as any).on('scroll', onIntroScroll)
})

onUnmounted(() => {
  ;($lenis as any).off('scroll', onProofScroll)
  ;($lenis as any).off('scroll', onIntroScroll)
})
</script>

<style scoped>
/* ── Expanded card ───────────────────────────────────────────────────────── */
.expanded-card {
  @apply backdrop-blur-[7px] bg-surface-secondary flex items-start justify-between;
  padding: var(--spacing-lg) var(--spacing-xlg);
  gap: var(--spacing-2xlg);
  border-radius: var(--border-radius-card);
}
.expanded-content {
  @apply flex flex-col flex-shrink-0;
  gap: var(--spacing-2xlg);
  width: var(--expanded-content-w);
}
.video-panel {
  @apply relative flex-shrink-0 overflow-hidden;
  border-radius: var(--border-radius-card);
  width:  var(--video-panel-w);
  height: var(--video-panel-h);
}
.video-btn-stop {
  @apply absolute left-1/2 -translate-x-1/2 bg-white w-12 h-12 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity;
  bottom: var(--spacing-lg);
  color: var(--color-text-heading-primary);
}
.video-btn-collapse {
  @apply absolute bg-surface-action w-12 h-12 flex items-center justify-center hover:opacity-80 transition-opacity;
  top: var(--spacing-lg);
  right: var(--spacing-lg);
  border-radius: var(--border-radius-button);
}

/* Responsive expanded card */
@media (max-width: 768px) {
  .expanded-card {
    @apply flex-col;
  }
  .expanded-content {
    width: 100%;
  }
  .video-panel {
    width: 100%;
    height: 300px;
  }
}

/* ── Progress bars ───────────────────────────────────────────────────────── */
.progress-bar-track {
  @apply relative rounded-full;
  width: 4px;
  height: 80px;
  background: var(--color-black);
  opacity: 0.3;
}
.progress-bar-track--blue {
  background: var(--color-blue);
  opacity: 1;
}

/* ── Path card slots (horizontal expand/collapse) ─────────────────────────── */
.path-cards {
  position: relative;
  display: flex;
  gap: var(--spacing-xsm);
  align-items: start;
}
.path-card-slot {
  overflow: hidden;
  flex-shrink: 0;
  width: calc(50% - var(--spacing-xsm) / 2);
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
}
.path-card-slot--expanded { width: 100%; }
.path-card-slot--hidden {
  position: absolute;
  width: 0;
  opacity: 0;
  pointer-events: none;
  overflow: hidden;
}

/* ── Content swap (collapsed ↔ expanded) ──────────────────────────────────── */
.path-body-enter-active { transition: opacity 0.3s ease 0.3s; }
.path-body-leave-active { transition: opacity 0.15s ease; }
.path-body-enter-from,
.path-body-leave-to     { opacity: 0; }

/* ── Video panel entrance ──────────────────────────────────────────────────── */
.video-panel {
  @apply relative flex-shrink-0 overflow-hidden;
  border-radius: var(--border-radius-card);
  width:  var(--video-panel-w);
  height: var(--video-panel-h);
  animation: videoRevealRight 0.45s cubic-bezier(0.4, 0, 0.2, 1) 0.45s both;
}
.video-panel--left {
  animation-name: videoRevealLeft;
}

@keyframes videoRevealRight {
  from { opacity: 0; transform: translateX(40px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes videoRevealLeft {
  from { opacity: 0; transform: translateX(-40px); }
  to   { opacity: 1; transform: translateX(0); }
}

</style>
