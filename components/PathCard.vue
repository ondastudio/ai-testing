<template>
  <a
    href="#"
    class="card"
    @mouseenter="$emit('hoverenter')"
    @mouseleave="$emit('hoverleave')"
  >
    <div class="flex flex-col gap-2xlg">
      <div class="flex items-end justify-between">
        <!-- heading layout differs slightly between cards -->
        <div :class="data.id === 'product'
          ? 'flex flex-col gap-2xsm max-w-[311px]'
          : 'flex flex-col justify-between card-heading-tall'"
        >
          <img :src="data.icon" alt="" class="w-10 h-10 object-contain" />
          <h3 class="text-h3 font-primary text-text-heading-primary">
            <span :class="hovered ? 'text-text-highlighted underline decoration-solid' : ''">
              {{ data.headingHighlight }},
            </span><br />
            {{ data.headingRest }}
          </h3>
        </div>
        <button class="video-thumb" @click.stop.prevent="$emit('expand')" aria-label="Play video">
          <img :src="data.thumb" alt="" class="absolute inset-0 w-full h-full object-cover" />
          <div v-if="data.id === 'venture'" class="absolute inset-0 bg-black/20" />
          <span class="relative z-10 flex items-center justify-center w-12 h-12 rounded-button bg-surface-action">
            <svg viewBox="0 0 24 24" class="w-6 h-6 fill-white"><path d="M8 5v14l11-7z"/></svg>
          </span>
        </button>
      </div>

      <div class="flex flex-col gap-lg">
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
    </div>

    <div class="flex items-center pointer-events-none">
      <AppButton variant="outline-icon" :forceHover="hovered">{{ data.buttonLabel }}</AppButton>
    </div>
  </a>
</template>

<script setup lang="ts">
import type { PathCardData } from '~/composables/usePathCards'

defineProps<{
  data: PathCardData
  hovered: boolean
}>()

defineEmits<{
  expand:     []
  hoverenter: []
  hoverleave: []
}>()
</script>

<style scoped>
.card {
  @apply backdrop-blur-[7px] bg-surface-secondary px-xlg py-lg flex flex-col gap-2xlg;
  border-radius: var(--border-radius-card);
}
.video-thumb {
  @apply relative flex-shrink-0 overflow-hidden rounded flex items-center justify-center;
  width:  var(--video-thumb-size);
  height: var(--video-thumb-size);
}
.card-heading-tall {
  height: 10.5rem; /* 168px — keeps venture heading area same height as product */
}
</style>
