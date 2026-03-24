<template>
  <div class="flex flex-col gap-2xsm">
    <hr class="border-t border-border-secondary" />
    <span class="text-body-xsm font-secondary text-text-body-primary uppercase">{{ label }}</span>
    <p class="text-body-lg font-secondary text-text-body-primary">{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string; text: string }>()
</script>
