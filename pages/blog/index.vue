<template>
  <main>

    <!-- ══════════════════════════════════════════════════════════════ HEADER -->
    <section class="pt-[10rem] pb-2xlg">
      <div class="container flex flex-col gap-md">
        <span ref="labelRef" class="reveal-fade text-body-xsm font-secondary text-text-label-primary uppercase tracking-widest">
          content
        </span>
        <h1 ref="titleRef" class="text-h1 font-primary text-text-heading-primary max-w-[640px]">
          Our thinking.
        </h1>
      </div>
    </section>

    <!-- ════════════════════════════════════════════════════════════════ POSTS -->
    <section class="pb-3xlg">
      <div class="container">

        <!-- Empty state -->
        <p v-if="!posts.length" class="text-body-lg font-secondary text-text-body-primary">
          No posts yet — check back soon.
        </p>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-md">
          <NuxtLink
            v-for="(post, i) in posts"
            :key="post.uid"
            :to="`/blog/${post.uid}`"
            :ref="(el) => { postRefs[i] = el as HTMLElement | null }"
            class="post-card reveal-slide group"
          >
            <div class="post-card__image overflow-hidden rounded-card bg-border-secondary">
              <img
                v-if="post.cover_image"
                :src="post.cover_image"
                :alt="post.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div v-else class="w-full h-full bg-surface-secondary" />
            </div>
            <div class="flex flex-col gap-xsm pt-md">
              <div class="flex items-center gap-sm">
                <span class="text-body-xsm font-secondary text-text-label-primary uppercase tracking-widest">
                  {{ post.author }}
                </span>
                <span class="text-body-xsm font-secondary text-text-body-primary">
                  {{ post.date }}
                </span>
              </div>
              <h2 class="text-h3 font-primary text-text-heading-primary group-hover:text-text-highlighted transition-colors duration-200">
                {{ post.title }}
              </h2>
              <p class="text-body-md font-secondary text-text-body-primary line-clamp-3">
                {{ post.excerpt }}
              </p>
            </div>
          </NuxtLink>
        </div>

      </div>
    </section>

    <TheFooter />
    <TheNavbar />

  </main>
</template>

<script setup lang="ts">
const labelRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const postRefs = ref<(HTMLElement | null)[]>([])

const DUMMY_POSTS = [
  {
    uid:         'design-systems-that-scale',
    title:       'Design systems that actually scale',
    excerpt:     'Most design systems collapse under the weight of a growing product. What we learned from building them for companies across ten countries.',
    cover_image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=900&q=80',
    date:        '14 March 2024',
    author:      'Subvisual',
  },
  {
    uid:         'shipping-without-slowing-down',
    title:       'How to ship fast without slowing down later',
    excerpt:     'Speed and quality are not opposites — but most teams treat them that way. A look at the habits that let senior teams move fast without accumulating debt.',
    cover_image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&q=80',
    date:        '28 February 2024',
    author:      'Subvisual',
  },
  {
    uid:         'embedded-teams-vs-outsourcing',
    title:       'Embedded teams vs. outsourcing: what nobody tells you',
    excerpt:     'Outsourcing is sold as a shortcut. Embedding is sold as a premium. The truth is messier — and more interesting — than either pitch.',
    cover_image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80',
    date:        '10 February 2024',
    author:      'Subvisual',
  },
  {
    uid:         'crypto-product-lessons',
    title:       'Five product lessons from building in crypto',
    excerpt:     'We have built payment infrastructure for crypto PSPs, DeFi dashboards, and NFT platforms. The technology changes fast — the user problems do not.',
    cover_image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=900&q=80',
    date:        '22 January 2024',
    author:      'Subvisual',
  },
]

const { client } = usePrismic()

const { data: docs } = await useAsyncData('blog_posts', () =>
  (client as any).getAllByType('blog_post', { orderings: [{ field: 'my.blog_post.date', direction: 'desc' }] })
)

const posts = computed(() => {
  const fromPrismic = ((docs.value as any[]) ?? []).map((doc: any) => ({
    uid:         doc.uid,
    title:       doc.data.title      ?? '',
    excerpt:     doc.data.excerpt    ?? '',
    cover_image: doc.data.cover_image?.url ?? null,
    date:        doc.data.date
      ? new Date(doc.data.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
      : '',
    author:      doc.data.author     ?? 'Subvisual',
  }))
  return fromPrismic.length ? fromPrismic : DUMMY_POSTS
})

onMounted(() => {
  const { observe } = useScrollReveal()
  observe(labelRef.value, 0)
  observe(titleRef.value, 100)
  postRefs.value.forEach((el, i) => observe(el, i * 100))
})
</script>

<style scoped>
.post-card {
  @apply flex flex-col cursor-pointer;
}
.post-card__image {
  width: 100%;
  aspect-ratio: 16 / 10;
}
</style>
