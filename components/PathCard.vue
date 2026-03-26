<template>
  <div
    class="path-card"
    :class="expanded ? 'path-card--expanded' : 'path-card--closed'"
    @mouseenter="!expanded && $emit('hoverenter')"
    @mouseleave="!expanded && $emit('hoverleave')"
  >

    <!-- Main content — always in DOM, layout shifts via CSS -->
    <div class="card-main">
      <div class="card-top">
        <div
          class="card-heading"
          :class="data.id !== 'product' && !expanded ? 'card-heading--tall' : ''"
        >
          <img :src="data.icon" alt="" class="w-10 h-10 object-contain" />
          <h3 class="text-h3 font-primary text-text-heading-primary">
            <span :class="!expanded && hovered ? 'text-text-highlighted underline decoration-solid' : ''">
              {{ data.headingHighlight }},
            </span><br />
            {{ data.headingRest }}
          </h3>
        </div>

        <!-- Thumbnail — only visible in closed state -->
        <button
          v-show="!expanded"
          class="video-thumb"
          @click.stop.prevent="$emit('expand')"
          aria-label="Play video"
        >
          <video
            v-if="data.video.endsWith('.mp4')"
            :src="data.video + '#t=0.001'"
            class="absolute inset-0 w-full h-full object-cover"
            preload="metadata"
            muted
            playsinline
          />
          <img v-else :src="data.poster" alt="" class="absolute inset-0 w-full h-full object-cover" />
          <div v-if="data.id === 'venture'" class="absolute inset-0 bg-black/20" />
          <span class="relative z-10 flex items-center justify-center w-12 h-12 rounded-button bg-surface-action">
            <svg viewBox="0 0 24 24" class="w-6 h-6 fill-white"><path d="M8 5v14l11-7z"/></svg>
          </span>
        </button>
      </div>

      <div class="card-details">
        <InfoSection label="About" :text="data.about" />
        <InfoSection label="What We Do" :text="data.whatWeDo" />
        <div class="flex flex-col gap-xsm">
          <hr class="border-t border-border-secondary" />
          <span class="text-body-xsm font-secondary text-text-body-primary uppercase">{{ data.outcomesLabel }}</span>
          <div class="text-body-lg font-secondary text-text-body-primary">
            <p>{{ data.outcomesIntro }}</p>
            <ul class="list-disc pl-8 mt-xsm space-y-2xsm">
              <li v-for="item in data.outcomesList" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>

      <AppButton
        variant="outline-icon"
        href="#"
        :forceHover="!expanded && hovered"
        class="self-start"
      >{{ data.buttonLabel }}</AppButton>
    </div>

    <!-- Video panel — only visible in expanded state -->
    <div
      v-show="expanded"
      class="video-panel"
      :class="data.videoSide === 'left' ? 'video-panel--left' : 'video-panel--right'"
    >
      <video
        v-if="data.video.endsWith('.mp4')"
        :src="data.video"
        :poster="data.poster"
        class="absolute inset-0 w-full h-full object-cover"
        :style="{ borderRadius: 'var(--border-radius-card)' }"
        autoplay
        loop
        muted
        playsinline
      />
      <img
        v-else
        :src="data.video"
        alt=""
        class="absolute inset-0 w-full h-full object-cover"
        :style="{ borderRadius: 'var(--border-radius-card)' }"
      />
      <button @click="$emit('collapse')" class="video-btn-stop" aria-label="Stop video">
        <svg viewBox="0 0 24 24" class="w-5 h-5"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="8" y="8" width="8" height="8" fill="currentColor"/></svg>
      </button>
      <button @click="$emit('collapse')" class="video-btn-collapse" aria-label="Close">
        <svg viewBox="0 0 24 24" class="w-5 h-5 fill-white"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import type { PathCardData } from '~/composables/usePathCards'

withDefaults(defineProps<{
  data:      PathCardData
  hovered?:  boolean
  expanded?: boolean
}>(), {
  hovered:  false,
  expanded: false,
})

defineEmits<{
  expand:     []
  hoverenter: []
  hoverleave: []
  collapse:   []
}>()
</script>

<style scoped>
/* ── Base ───────────────────────────────────────────────────────────────── */
.path-card {
  display: flex;
  border-radius: var(--border-radius-card);
  height: 100%;
}

/* ── Closed ─────────────────────────────────────────────────────────────── */
.path-card--closed {
  @apply backdrop-blur-[7px] bg-surface-secondary flex-col;
  padding: var(--spacing-lg) var(--spacing-xlg);
  gap: var(--spacing-md);
}
.path-card--closed .card-main {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: var(--spacing-md);
}
.path-card--closed .card-top {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
.path-card--closed .card-heading {
  max-width: 320px;
}
.path-card--closed .card-details {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}
.path-card--closed .card-main > .self-start {
  margin-top: auto;
}

/* ── Expanded ───────────────────────────────────────────────────────────── */
.path-card--expanded {
  @apply bg-surface-page items-start justify-between;
  padding: var(--spacing-lg) var(--spacing-xlg);
  gap: var(--spacing-2xlg);
}
.path-card--expanded .card-main {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: var(--spacing-2xlg);
  width: var(--expanded-content-w);
}
.path-card--expanded .card-top {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xsm);
}
.path-card--expanded .card-details {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

/* ── Shared elements ────────────────────────────────────────────────────── */
.card-heading {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xsm);
}
.card-heading--tall {
  height: 10.5rem;
  justify-content: space-between;
}
.video-thumb {
  @apply relative flex-shrink-0 overflow-hidden rounded flex items-center justify-center;
  width:  var(--video-thumb-size);
  height: var(--video-thumb-size);
}
.video-panel {
  @apply relative flex-shrink-0 overflow-hidden;
  border-radius: var(--border-radius-card);
  width:  min(var(--video-panel-w), 320px);
  height: var(--video-panel-h);
  animation: videoRevealRight 0.45s cubic-bezier(0.4, 0, 0.2, 1) 0.45s both;
}
.video-panel--left  { animation-name: videoRevealLeft; }
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

@keyframes videoRevealRight {
  from { opacity: 0; transform: translateX(40px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes videoRevealLeft {
  from { opacity: 0; transform: translateX(-40px); }
  to   { opacity: 1; transform: translateX(0); }
}

/* ── Responsive ─────────────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .path-card--expanded { flex-direction: column; }
  .path-card--expanded .card-main { width: 100%; }
  .video-panel { width: 100%; height: 300px; }
}
</style>
