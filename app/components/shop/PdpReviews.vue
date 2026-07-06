<script setup lang="ts">
interface Review {
  id: number
  name: string
  avatar: string
  rating: number
  text: string
}

// Static review data for scaffolding.
const averageRating = 4.5
const reviewCount = 128
const reviews: Review[] = [
  {
    id: 1,
    name: 'Sofia M.',
    avatar: 'https://i.pravatar.cc/80?img=47',
    rating: 5,
    text: 'Great fit and the fabric feels premium. Runs true to size.',
  },
  {
    id: 2,
    name: 'James K.',
    avatar: 'https://i.pravatar.cc/80?img=12',
    rating: 4,
    text: 'Solid everyday tee. Colour is slightly darker than pictured.',
  },
]
</script>

<template>
  <section class="border-t border-gray-200 py-12">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-black uppercase tracking-tight">
        Reviews
      </h2>
      <div class="flex items-center gap-2">
        <button type="button" class="flex size-9 items-center justify-center border border-gray-300 hover:border-black" aria-label="Previous reviews">
          <Icon name="lucide:arrow-left" class="size-4" />
        </button>
        <button type="button" class="flex size-9 items-center justify-center border border-gray-300 hover:border-black" aria-label="Next reviews">
          <Icon name="lucide:arrow-right" class="size-4" />
        </button>
      </div>
    </div>

    <!-- Rating summary -->
    <div class="mt-4 flex items-center gap-3">
      <div class="flex">
        <Icon
          v-for="star in 5"
          :key="star"
          name="lucide:star"
          class="size-5"
          :class="star <= Math.round(averageRating) ? 'text-black' : 'text-gray-300'"
        />
      </div>
      <span class="text-sm font-medium">{{ averageRating }}</span>
      <span class="text-sm text-gray-500">({{ reviewCount }} reviews)</span>
    </div>

    <!-- Review snippets -->
    <div class="mt-8 grid gap-6 sm:grid-cols-2">
      <article v-for="review in reviews" :key="review.id" class="border border-gray-200 p-5">
        <div class="flex items-center gap-3">
          <NuxtImg :src="review.avatar" :alt="review.name" class="size-10 rounded-full object-cover" loading="lazy" />
          <div>
            <p class="text-sm font-bold">
              {{ review.name }}
            </p>
            <div class="flex">
              <Icon
                v-for="star in 5"
                :key="star"
                name="lucide:star"
                class="size-3.5"
                :class="star <= review.rating ? 'text-black' : 'text-gray-300'"
              />
            </div>
          </div>
        </div>
        <p class="mt-3 text-sm text-gray-600">
          {{ review.text }}
        </p>
      </article>
    </div>
  </section>
</template>
