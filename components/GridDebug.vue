<template>
  <div v-if="visible" class="grid-debug" aria-hidden="true">
    <div class="container h-full">
      <div class="grid-12 h-full">
        <div v-for="n in 12" :key="n" class="col-debug" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const visible = ref(false)

function onKeydown(e: KeyboardEvent) {
  if (e.ctrlKey && e.shiftKey && e.key === 'G') visible.value = !visible.value
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<style scoped>
.grid-debug {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
}
.col-debug {
  background: rgba(4, 92, 252, 0.08);
  border-left:  1px solid rgba(4, 92, 252, 0.2);
  border-right: 1px solid rgba(4, 92, 252, 0.2);
  height: 100%;
}
</style>
