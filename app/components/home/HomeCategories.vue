<script setup lang="ts">
interface Category {
  id: number
  name: string
  image: string
  to: string
}

const categories: Category[] = [
  {
    id: 1,
    name: 'Women',
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80',
    to: '/',
  },
  {
    id: 2,
    name: 'Men',
    image:
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=600&q=80',
    to: '/',
  },
  {
    id: 3,
    name: 'Accessories',
    image:
      'https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=600&q=80',
    to: '/',
  },
  {
    id: 4,
    name: 'Shoes',
    image:
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=600&q=80',
    to: '/',
  },
]
</script>

<template>
  <section class="py-16">
    <div class="mx-auto w-full max-w-7xl px-4">
      <div class="mb-8 flex flex-col gap-2">
        <BaseHeading as="h2" size="2xl" weight="bold" class="text-muted-900 dark:text-white">
          Shop by category
        </BaseHeading>
        <BaseParagraph class="text-muted-500">
          Find exactly what you're looking for.
        </BaseParagraph>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <NuxtLink
          v-for="category in categories"
          :key="category.id"
          :to="category.to"
          class="group relative block overflow-hidden rounded-2xl"
          :aria-label="`Browse ${category.name}`"
        >
          <NuxtImg
            :src="category.image"
            :alt="category.name"
            class="h-64 w-full object-cover motion-safe:transition-transform motion-safe:duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <!-- Dark overlay so the label stays readable -->
          <div class="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
          <div class="absolute inset-x-0 bottom-0 p-4">
            <BaseHeading as="h3" size="lg" weight="semibold" class="text-white">
              {{ category.name }}
            </BaseHeading>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
