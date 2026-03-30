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
        <div class="grid-layout">
          <div class="col-span-4 md:col-span-8 flex flex-col items-center gap-xlg">
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

    </section>

    <!-- ══════════════════════════════ PATH TEXT (sticky, releases at xlg gap) -->
    <section class="path-text-section">
      <div class="sticky path-text-sticky z-10">
        <div class="container flex flex-col items-center gap-md">
          <div ref="pathLabelRef" class="reveal-fade">
            <span class="text-body-xsm font-secondary text-text-label-primary uppercase tracking-widest">
              choose your path
            </span>
          </div>
          <div ref="pathHeadingRef" class="w-full">
            <h2 class="text-h2 font-primary text-text-heading-primary text-center max-w-[1200px] mx-auto">
              Every project is custom. Whether it's design-only, team augmentation,
              or full product org. We've embedded for years, delivered end-to-end
              for crypto PSPs, staffed multinationals, and hired our own replacements
              without slowing delivery.
            </h2>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════ PATH CARDS (xlg below text) -->
    <section class="pb-2xlg">
      <div class="flex flex-col items-center gap-xlg pt-xlg">

        <img ref="pathIconRef" :src="iconCallSplit" alt="" class="reveal-fade w-10 h-10 rotate-180" aria-hidden="true" />

        <div class="container path-cards-wrap">
          <div class="path-cards">
            <div
              v-for="(card, i) in cards"
              :key="card.id"
              :ref="(el) => { pathCardRefs[i] = el as HTMLElement | null }"
              class="path-card-slot reveal-slide"
            >
              <div
                class="path-card-inner"
                :class="{
                  'path-card-inner--expanded':  expandedCard === card.id || collapsingCard === card.id,
                  'path-card-inner--collapsing': collapsingCard === card.id,
                  'path-card-inner--hidden':    expandedCard !== null && expandedCard !== card.id && collapsingCard !== card.id,
                  'expand-from-right':          (expandedCard === card.id || collapsingCard === card.id) && i === 1,
                }"
              >
                <PathCard
                  :data="card"
                  :hovered="hoveredCard === card.id"
                  :expanded="expandedCard === card.id || collapsingCard === card.id"
                  @expand="expandedCard = card.id"
                  @collapse="handleCollapse"
                  @hoverenter="hoveredCard = card.id"
                  @hoverleave="hoveredCard = null"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- ══════════════════ WHITE BACKGROUND FROM HERE TO BOTTOM ══════════════ -->
    <div class="bg-white">

    <!-- ══════════════════════════════════════════════════════════ PROJECTS -->
    <CursorFollower :visible="comingSoonHovered" />
    <StickyCarousel :items="projects" v-slot="{ item, fillPx }">
      <div class="flex flex-col gap-md">

        <div class="container">
          <NuxtLink
            :to="item.comingSoon ? undefined : item.url"
            class="block group"
            :class="item.comingSoon ? 'cursor-default' : 'cursor-pointer'"
            @mouseenter="comingSoonHovered = item.comingSoon"
            @mouseleave="comingSoonHovered = false"
          >
            <div class="relative rounded-card overflow-hidden" style="height: var(--carousel-card-h)">
              <img
                :src="item.image"
                :alt="item.title"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                loading="lazy"
              />
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
        </div>

        <!-- Title + description: inside container -->
        <div class="container">
          <div class="flex items-end justify-between">
            <NuxtLink :to="item.comingSoon ? undefined : item.url" class="flex items-start gap-[10px]">
              <h3
                class="text-h3 font-primary text-text-heading-primary transition-colors duration-200"
                :class="!item.comingSoon && 'hover:text-text-highlighted'"
              >
                {{ item.title }}
              </h3>
              <span v-if="item.comingSoon" class="text-body-xsm font-secondary text-text-muted uppercase shrink-0 mt-1">
                Coming Soon
              </span>
            </NuxtLink>
            <p class="font-secondary text-body-md text-text-body-primary max-w-[630px]">
              {{ item.description }}
            </p>
          </div>
        </div>

      </div>
    </StickyCarousel>

    <!-- ═══════════════════════════════════════════════════════════════ PROOF -->
    <section
      ref="proofSectionRef"
      class="relative py-xlg pb-3xlg"
      :style="{ minHeight: `calc(100vh + ${PROOF_SCROLL_PER_ROW * (proofItems.length - 1)}px)` }"
    >
        <!-- sticky div is a direct child of section so the section is the containing block -->
        <div class="sticky container" :style="{ top: `${proofGroupTop}px` }">

          <p
            ref="proofLabelRef"
            class="reveal-fade relative text-body-xsm font-secondary text-text-label-primary uppercase text-center bg-white py-sm"
            :style="{ zIndex: proofItems.length + 1 }"
          >
            proof and recognition
          </p>

          <!-- rows container: height is animated as rows stack -->
          <div class="relative" :style="{ height: `${proofContainerH}px` }">
            <div
              v-for="(item, i) in proofItems"
              :key="item.id"
              class="proof-row absolute inset-x-0 bg-white border-t border-border-secondary flex gap-proof-gap items-center"
              :style="{ top: `${i * proofRowH}px`, zIndex: i + 1, transform: `translateY(${proofRowOffsets[i] ?? 0}px)` }"
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
                <p class="text-h1 font-primary text-white text-center testimonial-quote">
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
    <section class="pt-xlg faqs-section">
      <div class="container flex flex-col gap-lg">

        <p ref="faqLabelRef" class="reveal-fade text-body-xsm font-secondary text-text-label-primary uppercase text-center">
          faqs
        </p>

        <div class="flex flex-col gap-lg">
          <div
            v-for="(faq, i) in faqs"
            :key="faq.number"
            :ref="(el) => { faqRefs[i] = el as HTMLElement | null }"
            class="reveal-slide border-t border-border-secondary flex items-start w-full faq-row"
          >
            <div class="flex items-center py-lg shrink-0">
              <span class="text-body-xsm font-secondary text-text-body-primary uppercase">{{ faq.number }}</span>
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

const introMarqueeRef = ref<HTMLElement | null>(null)

// ─── PATH ────────────────────────────────────────────────────────────────────

const pathLabelRef   = ref<HTMLElement | null>(null)
const pathHeadingRef = ref<HTMLElement | null>(null)
const pathIconRef    = ref<HTMLElement | null>(null)
const pathCardRefs   = ref<(HTMLElement | null)[]>([])

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

const expandedCard  = ref<null | 'product' | 'venture'>(null)
const collapsingCard = ref<null | 'product' | 'venture'>(null)
const hoveredCard   = ref<null | 'product' | 'venture'>(null)

function handleCollapse() {
  collapsingCard.value = expandedCard.value
  expandedCard.value = null
  setTimeout(() => { collapsingCard.value = null }, 300)
}

// ─── PROJECTS ────────────────────────────────────────────────────────────────
const comingSoonHovered = ref(false)

const projects = computed(() => {
  const items = homeDoc.value?.data?.projects
  if (!items?.length) return []
  return items.map((item: any, i: number) => ({
    id:          String(i),
    title:       item.title       ?? '',
    description: item.description ?? '',
    image:       item.image?.url  ?? '',
    url:         asLink(item.url) ?? '#',
    comingSoon:  item.com ?? false,
  }))
})

// ─── PROOF & RECOGNITION ─────────────────────────────────────────────────────
const PROOF_STACK_STEP    = 64
const PROOF_SCROLL_PER_ROW = 200

const proofItems = [
  { id: 'funding',  label: 'Funding',  icon: iconFunding,   text: 'Helped raised $100M' },
  { id: 'countries',label: 'Countries',icon: iconCountries, text: '10 countries connected' },
  { id: 'projects', label: 'Projects', icon: iconProjects,  text: '35 new projects (2020)' },
  { id: 'deloitte', label: 'Deloitte', icon: iconDeloitte,  text: 'Deloitte Technology Fast 500 EMEA (2019)' },
]

const proofSectionRef  = ref<HTMLElement | null>(null)
const proofLabelRef    = ref<HTMLElement | null>(null)
const activeProofRows  = ref<Set<number>>(new Set())
const proofGroupTop    = ref(0)
const proofRowH        = ref(80)   // measured row height
const proofContainerH  = ref(0)    // animated: starts full, compresses as rows stack
const proofRowOffsets  = ref<number[]>([])

// rAF-throttled — runs at most once per frame
let proofRafId: number | null = null
function onProofScroll() {
  if (proofRafId) return
  proofRafId = requestAnimationFrame(() => {
    proofRafId = null
    if (!proofSectionRef.value) return
    const sectionTop = proofSectionRef.value.getBoundingClientRect().top
    const scrolledIn = Math.max(0, proofGroupTop.value - sectionTop)
    const n    = proofItems.length
    const rowH = proofRowH.value
    const step = PROOF_STACK_STEP

    // Each row i slides up by (rowH - step) when it's its turn.
    // Rows below the stacking row move with it so there's no gap.
    const offsets: number[] = [0]
    let cumulative = 0
    for (let i = 1; i < n; i++) {
      const progress = Math.min(1, Math.max(0,
        (scrolledIn - (i - 1) * PROOF_SCROLL_PER_ROW) / PROOF_SCROLL_PER_ROW
      ))
      cumulative += progress * (step - rowH) // negative → slides up
      offsets.push(cumulative)
    }
    proofRowOffsets.value = offsets

    // Container height = bottom of last row
    const lastTop = (n - 1) * rowH + offsets[n - 1]
    proofContainerH.value = lastTop + rowH

    // Activate rows as they finish stacking
    const next = new Set<number>()
    proofItems.forEach((_, i) => {
      if (scrolledIn >= i * PROOF_SCROLL_PER_ROW) next.add(i)
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

onMounted(() => {
  const { observe, observeWords } = useScrollReveal()

  // Hero (staggered entrance after nav)
  observe(heroTitleRef.value,    400)
  observe(heroSubtitleRef.value, 600)
  observe(heroCtaRef.value,      800)

  // Intro marquee (intersection-triggered)
  observe(introMarqueeRef.value, 0)

  // Path — label, heading (word-by-word), icon, cards
  observe(pathLabelRef.value, 0)
  observeWords(pathHeadingRef.value?.querySelector('h2') as HTMLElement | null)
  observe(pathIconRef.value,  0)
  pathCardRefs.value.forEach((el, i) => observe(el, i * 150))

  // Proof — measure elements and center the entire group on the viewport
  const labelH   = proofLabelRef.value?.offsetHeight ?? 48
  const firstRow = proofSectionRef.value?.querySelector('.proof-row') as HTMLElement | null
  const rowH     = firstRow?.offsetHeight ?? 80
  proofRowH.value       = rowH
  proofContainerH.value = proofItems.length * rowH          // initial full height
  proofGroupTop.value   = Math.round(window.innerHeight / 2 - (labelH + proofContainerH.value) / 2)
  proofRowOffsets.value = proofItems.map(() => 0)           // all rows visible, not stacked yet
  onProofScroll()

  observe(proofLabelRef.value, 0)

  // FAQs — staggered by 100ms each
  observe(faqLabelRef.value, 0)
  faqRefs.value.forEach((el, i) => observe(el, i * 100))

  ;($lenis as any).on('scroll', onProofScroll)
})

onUnmounted(() => {
  ;($lenis as any).off('scroll', onProofScroll)
})
</script>

<style scoped>
/* ── Path text section ───────────────────────────────────────────────────── */
.path-text-section {
  padding-top: var(--path-section-offset);
  padding-bottom: 30vh;
}
.path-text-sticky {
  top: var(--path-section-offset);
}

/* ── FAQs ────────────────────────────────────────────────────────────────── */
.faqs-section {
  padding-bottom: var(--section-pb-faq);
}
.faq-row {
  gap: var(--faq-row-gap);
}

/* ── Testimonials ────────────────────────────────────────────────────────── */
.testimonial-quote {
  max-width: var(--testimonial-quote-max-w);
}

/* ── Progress bars ───────────────────────────────────────────────────────── */
.progress-bar-track {
  @apply relative rounded-full;
  width: 4px;
  height: 80px;
  background: rgba(64, 63, 76, 0.2);
}
.progress-bar-track--blue {
  background: var(--color-blue);
  opacity: 1;
}

/* ── Path cards ───────────────────────────────────────────────────────────── */
.path-cards-wrap {
  position: relative;
}
.path-cards {
  display: flex;
  align-items: stretch;
  gap: var(--grid-gutter);
  position: relative;
}
.path-card-slot {
  flex-shrink: 0;
  width: calc(50% - var(--grid-gutter) / 2);
}
/* reveal-slide.is-visible sets transform:translateY(0) which would make the slot
   a containing block for the absolutely-positioned inner wrapper — override it */
.path-card-slot.is-visible {
  transform: none;
}
.path-card-inner {
  height: 100%;
  transition: opacity 0.2s ease;
}
.path-card-inner--expanded {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  z-index: 10;
  animation: overlayRevealLeft 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both;
}
.path-card-inner--expanded.expand-from-right {
  animation-name: overlayRevealRight;
}
.path-card-inner--hidden {
  opacity: 0;
  pointer-events: none;
}
.path-card-inner--collapsing {
  pointer-events: none;
  animation: overlayCollapseLeft 0.3s cubic-bezier(0.4, 0, 0.2, 1) both;
}
.path-card-inner--collapsing.expand-from-right {
  animation-name: overlayCollapseRight;
}
@keyframes overlayRevealLeft {
  from { clip-path: inset(0 50% 0 0); }
  to   { clip-path: inset(0 0% 0 0); }
}
@keyframes overlayRevealRight {
  from { clip-path: inset(0 0 0 50%); }
  to   { clip-path: inset(0 0 0 0); }
}
@keyframes overlayCollapseLeft {
  from { clip-path: inset(0 0% 0 0); }
  to   { clip-path: inset(0 50% 0 0); }
}
@keyframes overlayCollapseRight {
  from { clip-path: inset(0 0 0 0%); }
  to   { clip-path: inset(0 0 0 50%); }
}


</style>
