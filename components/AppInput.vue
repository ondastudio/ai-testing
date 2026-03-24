<template>
  <div class="bg-brand-white flex items-center pl-6 pr-[2px] py-[2px] rounded-button input-w">
    <input
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      class="flex-1 min-w-0 text-body-md font-secondary bg-transparent outline-none placeholder:text-text-action-secondary"
      :class="model ? 'text-text-highlighted' : 'text-text-body-primary'"
    />
    <button
      @click="$emit('submit', model)"
      :aria-label="submitLabel"
      class="bg-surface-action w-12 h-12 rounded-button flex items-center justify-center shrink-0 hover:opacity-80 transition-opacity"
    >
      <svg viewBox="0 0 20 20" class="w-5 h-5 fill-brand-white" aria-hidden="true">
        <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  type?:        string
  placeholder?: string
  submitLabel?: string
}>(), {
  type:        'text',
  placeholder: 'Enter your email',
  submitLabel: 'Submit',
})

const model = defineModel<string>({ default: '' })
defineEmits<{ submit: [value: string] }>()
</script>

<style scoped>
.input-w {
  width: var(--footer-input-w);
}
</style>
