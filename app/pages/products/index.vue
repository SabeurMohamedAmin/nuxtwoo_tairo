<script lang="ts" setup>
import { products } from '~/utils/products'

definePageMeta({
  layout: 'empty',
})

useHead({ title: 'Men T-Shirts – CITADIUM' })

const breadcrumb = [
  { label: 'Home', to: '/' },
  { label: 'Men', to: '/products' },
  { label: 'T-Shirts' },
]

// Brand filter pills shown above the grid.
const brandPills = [
  'All Brands',
  'Nike',
  'Carhartt WIP',
  'Stüssy',
  'The North Face',
  'Adidas',
  'Patta',
  'Vans',
]
const activeBrand = ref('All Brands')
</script>

<template>
  <div class="bg-white text-black">
    <HomeAnnouncementBar />
    <HomeHeader />

    <main class="mx-auto w-full max-w-7xl px-4 py-8">
      <ShopBreadcrumb :crumbs="breadcrumb" />

      <!-- Page title -->
      <div class="mt-4 flex flex-col gap-2">
        <h1 class="text-4xl font-black uppercase tracking-tight">
          Men T-Shirts
        </h1>
        <p class="text-sm text-gray-600">
          {{ products.length }} items · Everyday staples and statement graphics.
        </p>
      </div>

      <!-- Brand filter pills -->
      <div class="mt-6 flex items-center gap-3">
        <div class="flex flex-1 gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            v-for="brand in brandPills"
            :key="brand"
            type="button"
            class="shrink-0 border px-4 py-2 text-xs font-bold uppercase tracking-wide"
            :class="activeBrand === brand
              ? 'border-black bg-black text-white'
              : 'border-gray-300 text-black hover:border-black'"
            @click="activeBrand = brand"
          >
            {{ brand }}
          </button>
        </div>
        <button
          type="button"
          class="flex size-9 shrink-0 items-center justify-center border border-gray-300 hover:border-black"
          aria-label="Scroll brands"
        >
          <Icon name="lucide:arrow-right" class="size-4" />
        </button>
      </div>

      <!-- Sidebar + grid -->
      <div class="mt-8 flex flex-col gap-8 lg:flex-row">
        <div class="lg:w-64 lg:shrink-0">
          <PlpFilters />
        </div>

        <div class="flex-1">
          <div class="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-3">
            <ProductCard
              v-for="product in products"
              :key="product.slug"
              :product="product"
            />
          </div>
        </div>
      </div>

      <!-- Editorial banner -->
      <section class="relative mt-16 h-[320px] overflow-hidden">
        <NuxtImg
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1600&q=80"
          alt="New season graphics"
          class="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-black/50" />
        <div class="absolute inset-0 flex flex-col justify-center gap-4 px-8 lg:px-16">
          <h2 class="text-3xl font-black uppercase tracking-tight text-white lg:text-4xl">
            New Season Graphics
          </h2>
          <p class="max-w-md text-sm text-white/80">
            Bold prints and fresh silhouettes to define your next look.
          </p>
          <NuxtLink
            to="/products"
            class="w-fit bg-white px-7 py-3 text-xs font-bold uppercase tracking-wide text-black hover:bg-gray-100"
          >
            Shop now
          </NuxtLink>
        </div>
      </section>
    </main>
  </div>
</template>
