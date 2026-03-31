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
            <img src="~/assets/svg/play_circle.svg" alt="" class="w-6 h-6" />
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
    <Transition name="video-panel">
    <div
      v-show="expanded"
      class="video-panel"
      :class="data.videoSide === 'left' ? 'video-panel--left' : 'video-panel--right'"
    >
      <video
        v-if="data.video.endsWith('.mp4')"
        :ref="video.videoRef"
        :src="data.video"
        :poster="data.poster"
        class="absolute top-0 right-0 h-full w-auto"
        :style="{ borderRadius: 'var(--border-radius-card)' }"
        autoplay
        loop
        muted
        playsinline
        @timeupdate="onTimeUpdate"
        @play="isPlaying = true"
        @pause="isPlaying = false"
      />
      <img
        v-else
        :src="data.video"
        alt=""
        class="absolute inset-0 w-full h-full object-cover"
        :style="{ borderRadius: 'var(--border-radius-card)' }"
      />

      <!-- Play/pause button -->
      <button @click="togglePlay" class="video-btn-stop" :aria-label="isPlaying ? 'Pause video' : 'Play video'">
        <!-- Stop-circle icon (playing state) -->
        <img v-if="isPlaying" src="~/assets/svg/stop_circle.svg" alt="" class="w-6 h-6" />
        <!-- Play icon (blue to show on white button bg) -->
        <svg v-else viewBox="0 0 24 24" class="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#045CFC" d="M10.8206 15.3119L15.0833 12.5661C15.2998 12.4307 15.4081 12.2428 15.4081 12.0022C15.4081 11.7615 15.2998 11.572 15.0833 11.4339L10.8206 8.68806C10.5998 8.53139 10.3708 8.51787 10.1336 8.6475C9.89639 8.77732 9.77778 8.97954 9.77778 9.25417V14.7458C9.77778 15.0205 9.89639 15.2227 10.1336 15.3525C10.3708 15.4821 10.5998 15.4686 10.8206 15.3119ZM12.0036 22C10.6208 22 9.32074 21.7376 8.10333 21.2128C6.88611 20.688 5.82722 19.9757 4.92667 19.0761C4.02611 18.1765 3.31324 17.1185 2.78806 15.9022C2.26269 14.6861 2 13.3866 2 12.0036C2 10.6208 2.26241 9.32074 2.78722 8.10333C3.31204 6.88611 4.02426 5.82722 4.92389 4.92667C5.82352 4.02611 6.88148 3.31324 8.09778 2.78806C9.31389 2.26269 10.6134 2 11.9964 2C13.3792 2 14.6793 2.26241 15.8967 2.78722C17.1139 3.31204 18.1728 4.02426 19.0733 4.92389C19.9739 5.82352 20.6868 6.88148 21.2119 8.09778C21.7373 9.31389 22 10.6134 22 11.9964C22 13.3792 21.7376 14.6793 21.2128 15.8967C20.688 17.1139 19.9757 18.1728 19.0761 19.0733C18.1765 19.9739 17.1185 20.6868 15.9022 21.2119C14.6861 21.7373 13.3866 22 12.0036 22ZM12 20.8889C14.4815 20.8889 16.5833 20.0278 18.3056 18.3056C20.0278 16.5833 20.8889 14.4815 20.8889 12C20.8889 9.51852 20.0278 7.41667 18.3056 5.69444C16.5833 3.97222 14.4815 3.11111 12 3.11111C9.51852 3.11111 7.41667 3.97222 5.69444 5.69444C3.97222 7.41667 3.11111 9.51852 3.11111 12C3.11111 14.4815 3.97222 16.5833 5.69444 18.3056C7.41667 20.0278 9.51852 20.8889 12 20.8889Z"/>
        </svg>
      </button>

      <!-- Progress bar -->
      <div class="video-progress-bar" aria-hidden="true">
        <div class="video-progress-fill" :style="{ width: (videoProgress * 100) + '%' }" />
      </div>

      <button @click="$emit('collapse')" class="video-btn-collapse" aria-label="Close">
        <img src="~/assets/svg/collapse.svg" alt="" class="w-6 h-6" />
      </button>
    </div>
    </Transition>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PathCardData } from '~/composables/usePathCards'

const props = withDefaults(defineProps<{
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

const video = useVideoPlayer(computed(() => props.expanded ?? false))
const { videoProgress, isPlaying, onTimeUpdate, togglePlay } = video
</script>

<style scoped>
/* ── Base ───────────────────────────────────────────────────────────────── */
.path-card {
  display: flex;
  border-radius: var(--border-radius-card);
  height: 100%;
  transition: background-color 0.3s ease;
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
  height: var(--card-heading-tall-h);
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
  width:  var(--video-panel-w);
  height: var(--video-panel-h);
}
.video-panel-enter-active {
  animation: videoRevealRight 0.45s cubic-bezier(0.4, 0, 0.2, 1) 0.45s both;
}
.video-panel--left.video-panel-enter-active {
  animation-name: videoRevealLeft;
}
.video-panel-leave-active {
  transition: opacity 0.2s ease;
}
.video-panel-leave-to {
  opacity: 0;
}
.video-btn-stop {
  @apply absolute bg-white w-12 h-12 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity;
  left: 50%;
  transform: translateX(-50%);
  bottom: var(--spacing-lg);
  color: var(--color-text-heading-primary);
  z-index: 1;
}
.video-progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0.25rem; /* 4px */
  background: var(--color-surface-overlay-light);
}
.video-progress-fill {
  height: 100%;
  background: var(--color-surface-action);
  transition: width 0.1s linear;
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

/* Tablet (768px – 1439px): side-by-side but narrower, flex-1 each */
@media (min-width: 768px) and (max-width: 1439px) {
  .path-card--expanded {
    padding: var(--spacing-lg) var(--spacing-sm);
    gap: var(--spacing-sm);
  }
  .path-card--expanded .card-main {
    width: auto;
    flex: 1 1 0;
    min-width: 0;
  }
  .video-panel {
    width: auto;
    flex: 1 1 0;
    min-width: 0;
    height: auto;
    aspect-ratio: 334 / 612;
  }
}

/* Mobile (<768px): stacked vertically, video above content */
@media (max-width: 767px) {
  .path-card--expanded { flex-direction: column; }
  .path-card--expanded .card-main { width: 100%; }
  .path-card--expanded .video-panel { order: -1; width: 100%; height: 466px; }
}
</style>
