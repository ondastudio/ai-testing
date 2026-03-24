<template>
  <!-- outline-icon: pill label + sliding arrow circle on hover -->
  <div
    v-if="variant === 'outline-icon'"
    class="group inline-flex items-center relative"
  >
    <component
      :is="href ? 'a' : 'button'"
      :href="href || undefined"
      :disabled="!href && disabled"
      class="relative z-[2] inline-flex items-center justify-center h-12 px-6 rounded-button whitespace-nowrap text-body-md font-secondary border transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none"
      :class="forceHover
        ? 'bg-surface-action text-text-action-primary border-transparent'
        : 'bg-transparent border-border-action text-text-action-inverted group-hover:bg-surface-action group-hover:text-text-action-primary group-hover:border-transparent'"
      v-bind="$attrs"
    >
      <slot />
    </component>
    <span
      class="relative z-[0] inline-flex items-center justify-center w-12 h-12 rounded-button bg-surface-action transition-all duration-300"
      :class="forceHover
        ? 'ml-[2px] opacity-100'
        : '-ml-[50px] opacity-0 group-hover:ml-[2px] group-hover:opacity-100'"
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" class="w-5 h-5 fill-white">
        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
      </svg>
    </span>
  </div>

  <!-- all other variants: single interactive element -->
  <component
    v-else
    :is="href ? 'a' : 'button'"
    :href="href || undefined"
    :disabled="!href && disabled"
    class="inline-flex items-center justify-center h-12 px-6 rounded-button whitespace-nowrap text-body-md font-secondary transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none"
    :class="variantClasses"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  href?:       string
  variant?:    'primary' | 'secondary' | 'outline' | 'outline-icon' | 'dashed'
  forceHover?: boolean  // outline-icon only: force the hover/active state
  disabled?:   boolean
}>(), {
  variant: 'primary',
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-brand-white text-text-action-inverted hover:bg-surface-action hover:text-text-action-primary'
    case 'outline':
      return 'bg-transparent border border-border-action text-text-action-inverted hover:bg-surface-action hover:text-text-action-primary hover:border-transparent'
    case 'dashed':
      return 'bg-transparent border border-dashed border-border-action text-text-action-inverted hover:bg-surface-action hover:text-text-action-primary hover:border-transparent hover:border-solid'
    case 'primary':
    default:
      return 'bg-surface-action text-text-action-primary hover:opacity-90'
  }
})
</script>
