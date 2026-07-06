<script setup lang="ts">
interface Category {
  label: string
  image: string
  to: string
}

// Six square tiles in a single row.
const categories: Category[] = [
  { label: 'Women', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=80', to: '/' },
  { label: 'Men', image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=400&q=80', to: '/' },
  { label: 'Sneakers', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=400&q=80', to: '/' },
  { label: 'Accessories', image: 'https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=400&q=80', to: '/' },
  { label: 'Kids', image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=400&q=80', to: '/' },
  { label: 'Life/Culture', image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=400&q=80', to: '/' },
]
</script>

<template>
  <section class="py-10">
    <div class="mx-auto w-full max-w-7xl px-4">
      <div class="grid grid-cols-3 gap-2 sm:grid-cols-6">
        <NuxtLink
          v-for="category in categories"
          :key="category.label"
          :to="category.to"
          class="group flex flex-col items-center gap-3"
          :aria-label="category.label"
        >
          <div class="aspect-square w-full overflow-hidden bg-gray-100">
            <NuxtImg
              :src="category.image"
              :alt="category.label"
              class="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <BaseText size="xs" weight="bold" class="text-center uppercase tracking-wide">
            {{ category.label }}
          </BaseText>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
