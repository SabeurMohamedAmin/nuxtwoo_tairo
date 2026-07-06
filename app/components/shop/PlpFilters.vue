<script setup lang="ts">
// Static filter sidebar for the PLP. Purely presentational scaffolding for
// now; wiring the filters to the product grid comes later.
const categories = ['T-Shirts', 'Hoodies', 'Jackets', 'Trousers', 'Accessories']
const brands = [
  { name: 'Nike', count: 24 },
  { name: 'Carhartt WIP', count: 18 },
  { name: 'Stüssy', count: 12 },
  { name: 'The North Face', count: 9 },
  { name: 'Adidas', count: 21 },
]
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const colours = [
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Grey', hex: '#9ca3af' },
  { name: 'Red', hex: '#dc2626' },
  { name: 'Blue', hex: '#2563eb' },
  { name: 'Green', hex: '#16a34a' },
]

const maxPrice = ref(100)
</script>

<template>
  <aside class="w-full space-y-8">
    <!-- Category -->
    <details open class="border-b border-gray-200 pb-6">
      <summary class="cursor-pointer text-sm font-bold uppercase tracking-wide">
        Category
      </summary>
      <ul class="mt-4 space-y-2">
        <li v-for="category in categories" :key="category">
          <NuxtLink to="/products" class="text-sm text-gray-600 hover:text-black">
            {{ category }}
          </NuxtLink>
        </li>
      </ul>
    </details>

    <!-- Brand -->
    <details open class="border-b border-gray-200 pb-6">
      <summary class="cursor-pointer text-sm font-bold uppercase tracking-wide">
        Brand
      </summary>
      <ul class="mt-4 space-y-2">
        <li v-for="brand in brands" :key="brand.name">
          <label class="flex items-center justify-between text-sm text-gray-600">
            <span class="flex items-center gap-2">
              <input type="checkbox" class="size-4 accent-black">
              {{ brand.name }}
            </span>
            <span class="text-xs text-gray-400">{{ brand.count }}</span>
          </label>
        </li>
      </ul>
    </details>

    <!-- Size -->
    <details open class="border-b border-gray-200 pb-6">
      <summary class="cursor-pointer text-sm font-bold uppercase tracking-wide">
        Size
      </summary>
      <div class="mt-4 grid grid-cols-3 gap-2">
        <button
          v-for="size in sizes"
          :key="size"
          type="button"
          class="border border-gray-300 py-2 text-xs font-medium hover:border-black"
        >
          {{ size }}
        </button>
      </div>
    </details>

    <!-- Colour -->
    <details open class="border-b border-gray-200 pb-6">
      <summary class="cursor-pointer text-sm font-bold uppercase tracking-wide">
        Colour
      </summary>
      <div class="mt-4 flex flex-wrap gap-3">
        <button
          v-for="colour in colours"
          :key="colour.name"
          type="button"
          class="size-7 rounded-full border border-gray-300"
          :style="{ backgroundColor: colour.hex }"
          :aria-label="colour.name"
        />
      </div>
    </details>

    <!-- Price -->
    <details open>
      <summary class="cursor-pointer text-sm font-bold uppercase tracking-wide">
        Price
      </summary>
      <div class="mt-4">
        <input
          v-model="maxPrice"
          type="range"
          min="0"
          max="200"
          class="w-full accent-black"
        >
        <p class="mt-2 text-sm text-gray-600">
          Up to {{ formatPrice(Number(maxPrice)) }}
        </p>
      </div>
    </details>
  </aside>
</template>
