<script setup lang="ts">
interface Banner {
  id: number
  title: string
  subtitle: string
  cta: string
  image: string
  to: string
}

const banners: Banner[] = [
  {
    id: 1,
    title: 'City Essentials',
    subtitle: 'Everyday pieces built for the street.',
    cta: 'Shop now',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
    to: '/',
  },
  {
    id: 2,
    title: 'Girls Run The City',
    subtitle: 'Bold looks for bold moves.',
    cta: 'Discover',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    to: '/',
  },
  {
    id: 3,
    title: 'Sneaker Culture',
    subtitle: 'The latest drops and icons.',
    cta: 'Explore',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80',
    to: '/',
  },
]
</script>

<template>
  <section class="py-12">
    <div class="mx-auto w-full max-w-7xl px-4">
      <div class="grid gap-4 md:grid-cols-3">
        <article
          v-for="banner in banners"
          :key="banner.id"
          class="relative h-[420px] overflow-hidden"
        >
          <NuxtImg
            :src="banner.image"
            :alt="banner.title"
            class="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-black/40" />
          <div class="absolute inset-0 flex flex-col justify-end gap-3 p-6">
            <BaseHeading as="h3" size="2xl" weight="bold" class="uppercase leading-tight tracking-tight text-white">
              {{ banner.title }}
            </BaseHeading>
            <BaseParagraph size="sm" class="text-white/80">
              {{ banner.subtitle }}
            </BaseParagraph>
            <BaseButton
              :to="banner.to"
              rounded="none"
              variant="outline"
              size="sm"
              class="w-fit border-white! font-bold uppercase tracking-wide text-white! hover:bg-white! hover:text-black!"
            >
              {{ banner.cta }}
            </BaseButton>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
