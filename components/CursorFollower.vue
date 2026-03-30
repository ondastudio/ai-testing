<template>
  <ClientOnly>
    <div
      class="cursor-follower"
      :style="{ transform: `translate(${x}px, ${y}px)` }"
    >
      <span
        class="cursor-follower__label"
        :class="{ 'cursor-follower__label--visible': visible }"
      >Coming Soon</span>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
defineProps<{ visible: boolean }>()

const x = ref(-200)
const y = ref(-200)
let targetX = -200
let targetY = -200
let rafId: number | null = null

function onMouseMove(e: MouseEvent) {
  targetX = e.clientX
  targetY = e.clientY
}

function loop() {
  // lerp towards target for smooth lag effect
  x.value += (targetX - x.value) * 0.12
  y.value += (targetY - y.value) * 0.12
  rafId = requestAnimationFrame(loop)
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove, { passive: true })
  rafId = requestAnimationFrame(loop)
})
onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<style scoped>
.cursor-follower {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
  margin-top: var(--spacing-3xsm);
  margin-right: calc(var(--spacing-3xsm) * -1);
  will-change: transform;
}
.cursor-follower__label {
  display: block;
  padding: var(--spacing-xsm) var(--spacing-sm);
  border-radius: var(--border-radius-button);
  background: var(--color-text-muted);
  color: var(--color-white);
  font-family: var(--font-family-secondary);
  font-size: var(--font-size-body-md);
  font-weight: var(--font-weight-regular);
  line-height: 1;
  letter-spacing: var(--letter-spacing-body-lg);
  white-space: nowrap;
  opacity: 0;
  transform: scale(0.85);
  transition: opacity 0.2s var(--easing-default), transform 0.2s var(--easing-default);
}
.cursor-follower__label--visible {
  opacity: 1;
  transform: scale(1);
}
</style>
