<template>
  <main>

    <!-- ══════════════════════════════════════════════════════════ COVER IMAGE -->
    <div v-if="post.cover_image" class="w-full overflow-hidden" style="height: 60vh; margin-top: 0">
      <img
        :src="post.cover_image"
        :alt="post.title"
        class="w-full h-full object-cover"
      />
    </div>
    <div v-else class="w-full bg-surface-secondary" style="height: 40vh" />

    <!-- ══════════════════════════════════════════════════════════════ ARTICLE -->
    <article class="pt-2xlg pb-3xlg">
      <div class="container">
        <div class="max-w-[720px] mx-auto flex flex-col gap-xlg">

          <!-- Back -->
          <NuxtLink
            to="/blog"
            class="flex items-center gap-xsm text-body-xsm font-secondary text-text-label-primary uppercase tracking-widest hover:text-text-highlighted transition-colors duration-200 self-start"
          >
            <svg viewBox="0 0 24 24" class="w-4 h-4 fill-current"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
            All posts
          </NuxtLink>

          <!-- Meta -->
          <div ref="headerRef" class="reveal-fade flex flex-col gap-md">
            <div class="flex items-center gap-sm">
              <span class="text-body-xsm font-secondary text-text-label-primary uppercase tracking-widest">
                {{ post.author }}
              </span>
              <span class="text-body-xsm font-secondary text-text-body-primary">
                {{ post.date }}
              </span>
            </div>
            <h1 class="text-h1 font-primary text-text-heading-primary">
              {{ post.title }}
            </h1>
            <p v-if="post.excerpt" class="text-body-lg font-secondary text-text-body-primary">
              {{ post.excerpt }}
            </p>
          </div>

          <!-- Divider -->
          <hr class="border-t border-border-secondary" />

          <!-- Body -->
          <div ref="bodyRef" class="reveal-fade prose-content">
            <PrismicRichText :field="post.body" />
          </div>

        </div>
      </div>
    </article>

    <TheFooter />
    <TheNavbar />

  </main>
</template>

<script setup lang="ts">
const route  = useRoute()
const { client } = usePrismic()

const { data: doc } = await useAsyncData(`blog_post_${route.params.uid}`, () =>
  client.getByUID('blog_post', route.params.uid as string)
)

const post = computed(() => ({
  title:       doc.value?.data.title       ?? '',
  excerpt:     doc.value?.data.excerpt     ?? '',
  cover_image: doc.value?.data.cover_image?.url ?? null,
  body:        doc.value?.data.body        ?? [],
  date:        doc.value?.data.date
    ? new Date(doc.value.data.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : '',
  author: doc.value?.data.author ?? 'Subvisual',
}))

useHead({
  title: post.value.title ? `${post.value.title} — Subvisual` : 'Subvisual',
})

const headerRef = ref<HTMLElement | null>(null)
const bodyRef   = ref<HTMLElement | null>(null)

onMounted(() => {
  const { observe } = useScrollReveal()
  observe(headerRef.value, 0)
  observe(bodyRef.value,   200)
})
</script>

<style scoped>
.prose-content :deep(h2) {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-h2);
  line-height: var(--line-height-h2);
  letter-spacing: var(--letter-spacing-h2);
  color: var(--color-text-heading-primary);
  margin-top: var(--spacing-2xlg);
  margin-bottom: var(--spacing-md);
}
.prose-content :deep(h3) {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-h3);
  line-height: var(--line-height-h3);
  letter-spacing: var(--letter-spacing-h3);
  color: var(--color-text-heading-primary);
  margin-top: var(--spacing-xlg);
  margin-bottom: var(--spacing-sm);
}
.prose-content :deep(p) {
  font-family: var(--font-family-secondary);
  font-size: var(--font-size-body-lg);
  line-height: 1.75;
  color: var(--color-text-body-primary);
  margin-bottom: var(--spacing-md);
}
.prose-content :deep(ul),
.prose-content :deep(ol) {
  font-family: var(--font-family-secondary);
  font-size: var(--font-size-body-lg);
  color: var(--color-text-body-primary);
  padding-left: 1.5rem;
  margin-bottom: var(--spacing-md);
}
.prose-content :deep(li) {
  margin-bottom: var(--spacing-2xsm);
  line-height: 1.75;
}
.prose-content :deep(strong) {
  font-weight: 500;
  color: var(--color-text-heading-primary);
}
.prose-content :deep(a) {
  color: var(--color-text-highlighted);
  text-decoration: underline;
}
.prose-content :deep(img) {
  width: 100%;
  border-radius: var(--border-radius-card);
  margin-top: var(--spacing-xlg);
  margin-bottom: var(--spacing-xlg);
}
.prose-content :deep(pre) {
  background: var(--color-black);
  color: #f9fcff;
  padding: var(--spacing-md);
  border-radius: var(--border-radius-card);
  overflow-x: auto;
  margin-bottom: var(--spacing-md);
  font-size: 0.9rem;
}
</style>
