<template>
  <NuxtPage />
  <GridDebug v-if="isDev" />
</template>

<script setup lang="ts">
const isDev = import.meta.dev
</script>
