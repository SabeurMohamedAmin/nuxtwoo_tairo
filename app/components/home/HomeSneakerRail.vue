<script setup lang="ts">
interface Sneaker {
  id: number
  name: string
  price: number
  image: string
}

const sneakers: Sneaker[] = [
  { id: 1, name: 'Nike Air Max 90', price: 149, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80' },
  { id: 2, name: 'Adidas Samba OG', price: 119, image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=500&q=80' },
  { id: 3, name: 'New Balance 550', price: 139, image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=500&q=80' },
  { id: 4, name: 'Puma Suede Classic', price: 89, image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=500&q=80' },
  { id: 5, name: 'Converse Chuck 70', price: 99, image: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=500&q=80' },
  { id: 6, name: 'Vans Old Skool', price: 79, image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=500&q=80' },
]

// Ref to the scroll container so the arrow button can scroll it.
const rail = ref<HTMLElement | null>(null)

function scrollNext() {
  rail.value?.scrollBy({ left: 300, behavior: 'smooth' })
}

function formatPrice(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(value)
}
</script>

<template>
  <section class="py-12">
    <div class="mx-auto w-full max-w-7xl px-4">
      <!-- Section header -->
      <div class="mb-6 flex items-center justify-between">
        <h2 class="text-2xl font-black uppercase tracking-tight">
          Sneaker Rail
        </h2>
        <NuxtLink to="/" class="text-xs font-bold uppercase tracking-wide hover:opacity-70">
          View all
        </NuxtLink>
      </div>

      <div class="relative">
        <!-- Horizontal scroll carousel -->
        <div
          ref="rail"
          class="flex gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div
            v-for="sneaker in sneakers"
            :key="sneaker.id"
            class="w-[220px] shrink-0"
          >
            <div class="aspect-square w-full overflow-hidden bg-gray-100">
              <NuxtImg
                :src="sneaker.image"
                :alt="sneaker.name"
                class="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <p class="mt-3 text-xs font-bold uppercase tracking-wide">
              {{ sneaker.name }}
            </p>
            <p class="mt-1 text-xs text-gray-600">
              {{ formatPrice(sneaker.price) }}
            </p>
          </div>
        </div>

        <!-- Next arrow -->
        <button
          type="button"
          class="absolute -right-3 top-1/3 flex size-11 items-center justify-center rounded-full bg-black text-white shadow-lg hover:bg-gray-800"
          aria-label="Next products"
          @click="scrollNext"
        >
          <Icon name="lucide:arrow-right" class="size-5" />
        </button>
      </div>
    </div>
  </section>
</template>
