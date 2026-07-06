<script setup lang="ts">
interface Product {
  id: number
  name: string
  category: string
  price: number
  image: string
  badge?: string
}

const products: Product[] = [
  {
    id: 1,
    name: 'Oversized Wool Coat',
    category: 'Outerwear',
    price: 189,
    image:
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=600&q=80',
    badge: 'New',
  },
  {
    id: 2,
    name: 'Classic Denim Jacket',
    category: 'Jackets',
    price: 129,
    image:
      'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    name: 'Knitted Sweater',
    category: 'Knitwear',
    price: 89,
    image:
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80',
    badge: 'Sale',
  },
  {
    id: 4,
    name: 'Leather Ankle Boots',
    category: 'Shoes',
    price: 159,
    image:
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80',
  },
]

// Format a number as a currency string. Kept simple for readability.
function formatPrice(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}
</script>

<template>
  <section class="bg-muted-50 dark:bg-muted-900/50 py-16">
    <div class="mx-auto w-full max-w-7xl px-4">
      <div class="mb-8 flex items-end justify-between gap-4">
        <div class="flex flex-col gap-2">
          <BaseHeading as="h2" size="2xl" weight="bold" class="text-muted-900 dark:text-white">
            Featured products
          </BaseHeading>
          <BaseParagraph class="text-muted-500">
            Handpicked favorites from our latest drop.
          </BaseParagraph>
        </div>
        <BaseButton to="/" variant="muted" rounded="lg" class="hidden sm:inline-flex">
          View all
          <Icon name="lucide:arrow-right" class="size-4" />
        </BaseButton>
      </div>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <BaseCard
          v-for="product in products"
          :key="product.id"
          rounded="lg"
          class="group flex flex-col overflow-hidden"
        >
          <div class="relative overflow-hidden">
            <NuxtImg
              :src="product.image"
              :alt="product.name"
              class="h-72 w-full object-cover motion-safe:transition-transform motion-safe:duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <BaseTag
              v-if="product.badge"
              rounded="full"
              :variant="product.badge === 'Sale' ? 'primary' : 'default'"
              class="absolute start-3 top-3"
            >
              {{ product.badge }}
            </BaseTag>
          </div>

          <div class="flex flex-col gap-1 p-4">
            <BaseParagraph size="xs" class="text-muted-400 uppercase tracking-wide">
              {{ product.category }}
            </BaseParagraph>
            <BaseHeading as="h3" size="md" weight="medium" class="text-muted-900 dark:text-white">
              {{ product.name }}
            </BaseHeading>
            <div class="mt-2 flex items-center justify-between">
              <span class="text-muted-900 dark:text-white font-semibold">
                {{ formatPrice(product.price) }}
              </span>
              <BaseButton
                variant="primary"
                rounded="lg"
                size="sm"
                :aria-label="`Add ${product.name} to cart`"
              >
                <Icon name="lucide:shopping-bag" class="size-4" />
              </BaseButton>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </section>
</template>
