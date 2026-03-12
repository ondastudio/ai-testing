<template>
  <section class="relative min-h-screen bg-surface-page flex items-center justify-center overflow-hidden">

    <!-- Blurred blob background -->
    <!-- TODO: Download and replace with permanent asset in /public/images/hero-blob.png -->
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
      <img
        src="https://www.figma.com/api/mcp/asset/1f3a81cf-6050-41e9-b33e-0a30604ac7f3"
        alt=""
        class="w-[1264px] h-[949px] object-cover opacity-60 blur-[15px]"
      />
    </div>

    <!-- Hero content -->
    <div class="relative z-10 flex flex-col items-center gap-xlg">

      <div class="flex flex-col items-center gap-lg">

        <!-- Headline — reveal-title: fade-in + Y movement -->
        <div ref="titleRef" class="reveal-title max-w-[724px] px-6">
          <h1 class="text-h1 font-primary text-text-highlighted text-center">
            We build products and the companies behind them.
          </h1>
        </div>

        <!-- Subtitle — reveal-fade: fade-in only -->
        <div ref="subtitleRef" class="reveal-fade max-w-[318px] px-6">
          <p class="text-body-lg font-secondary text-text-body-primary text-center">
            Two paths: Product or Venture. Same senior team, tailored to you.
          </p>
        </div>

      </div>

      <!-- CTA Buttons — reveal-fade -->
      <div ref="ctaRef" class="reveal-fade flex items-center gap-3">
        <a
          href="#"
          class="border border-border-action text-text-action-inverted text-body-md h-12 px-6 flex items-center rounded-button whitespace-nowrap hover:bg-surface-action hover:text-text-action-primary transition-all duration-200"
        >
          Explore Product
        </a>
        <a
          href="#"
          class="border border-border-action text-text-action-inverted text-body-md h-12 px-6 flex items-center rounded-button whitespace-nowrap hover:bg-surface-action hover:text-text-action-primary transition-all duration-200"
        >
          Explore Venture
        </a>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const titleRef    = ref<HTMLElement | null>(null)
const subtitleRef = ref<HTMLElement | null>(null)
const ctaRef      = ref<HTMLElement | null>(null)

onMounted(() => {
  const { observe } = useScrollReveal()
  observe(titleRef.value,    0)
  observe(subtitleRef.value, 200)
  observe(ctaRef.value,      400)
})
</script>
