<script setup lang="ts">
import type { Product } from '~~/shared/types/shop'

// Reusable product card shown in the PLP grid and recommendation carousels.
const props = defineProps<{
  product: Product
}>()

const { addItem } = useCart()

// Quick add uses the first available size/colour as a sensible default.
function quickAdd() {
  const size = props.product.sizes?.[0] ?? 'One Size'
  const colour = props.product.colours?.[0] ?? 'Default'
  addItem(props.product, size, colour, 1)
}
</script>

<template>
  <div class="group relative flex flex-col">
    <!-- Image + hover overlay -->
    <div class="relative aspect-square w-full overflow-hidden bg-gray-100">
      <NuxtLink :to="`/products/${product.slug}`" :aria-label="product.title">
        <NuxtImg
          :src="product.image"
          :alt="product.title"
          class="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </NuxtLink>

      <!-- Wishlist heart, top-right -->
      <button
        type="button"
        class="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-white/90 text-black hover:bg-white"
        aria-label="Add to wishlist"
      >
        <Icon name="lucide:heart" class="size-4" />
      </button>

      <!-- Quick add button, revealed on hover -->
      <button
        type="button"
        class="absolute inset-x-0 bottom-0 bg-black py-3 text-xs font-bold uppercase tracking-wide text-white opacity-0 motion-safe:transition-opacity group-hover:opacity-100"
        @click="quickAdd"
      >
        Quick add
      </button>
    </div>

    <!-- Meta -->
    <div class="mt-3 flex flex-col gap-1">
      <span class="text-xs font-bold uppercase tracking-wide text-gray-500">
        {{ product.brand }}
      </span>
      <NuxtLink
        :to="`/products/${product.slug}`"
        class="text-sm font-medium hover:underline"
      >
        {{ product.title }}
      </NuxtLink>
      <span class="text-sm font-bold">
        {{ formatPrice(product.price) }}
      </span>
    </div>
  </div>
</template>
