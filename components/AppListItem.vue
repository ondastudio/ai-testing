<template>
  <component
    :is="href ? 'a' : 'div'"
    :href="href || undefined"
    class="flex flex-col items-start gap-xsm pt-xsm cursor-pointer group"
    :class="{ 'pointer-events-none opacity-40': disabled }"
  >
    <div
      class="flex items-center px-xsm py-md rounded-card w-full transition-all duration-200"
      :class="[
        selected ? 'bg-surface-page' : 'bg-transparent group-hover:bg-surface-page',
        selected ? 'text-text-action-inverted font-medium' : 'text-text-body-primary group-hover:text-text-action-inverted',
        disabled ? 'text-text-body-primary' : ''
      ]"
    >
      <p class="text-body-md font-secondary whitespace-nowrap">
        <slot />
      </p>
    </div>
    <div class="h-px w-full bg-border-secondary" />
  </component>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  href?:     string
  selected?: boolean
  disabled?: boolean
}>(), {
  selected: false,
  disabled: false,
})
</script>
