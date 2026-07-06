<script setup lang="ts">
import type { Product } from '~~/shared/types/shop'

defineProps<{
  title: string
  products: Product[]
}>()
</script>

<template>
  <section class="border-t border-gray-200 py-12">
    <h2 class="mb-6 text-2xl font-black uppercase tracking-tight">
      {{ title }}
    </h2>
    <div class="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div
        v-for="product in products"
        :key="product.slug"
        class="w-[220px] shrink-0"
      >
        <ProductCard :product="product" />
      </div>
    </div>
  </section>
</template>
