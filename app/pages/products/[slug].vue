<script lang="ts" setup>
import { colourSwatches, findProduct, products } from '~/utils/products'

definePageMeta({
  layout: 'empty',
})

const route = useRoute()
const slug = computed(() => String(route.params.slug))
const product = computed(() => findProduct(slug.value))

// Redirect to the PLP if the slug is unknown (scaffolding-safe).
if (!product.value) {
  throw createError({ statusCode: 404, statusMessage: 'Product not found' })
}

useHead({ title: () => `${product.value?.title} – CITADIUM` })

const { addItem } = useCart()

// A size is selectable unless the product flags it as out of stock.
function isSizeAvailable(size: string) {
  return !product.value?.unavailableSizes?.includes(size)
}

// Local variant selection. The default size skips out-of-stock entries.
const selectedColour = ref(product.value.colours?.[0] ?? 'Default')
const selectedSize = ref(product.value.sizes?.find(isSizeAvailable) ?? 'One Size')
const activeImage = ref(product.value.gallery?.[0] ?? product.value.image)

const gallery = computed(() => product.value?.gallery ?? [product.value!.image])

const breadcrumb = computed(() => [
  { label: 'Home', to: '/' },
  { label: 'Men', to: '/products' },
  { label: 'T-Shirts', to: '/products' },
  { label: product.value?.title ?? '' },
])

// Recommendations: every other product except the current one.
const recommendations = computed(() =>
  products.filter(item => item.slug !== product.value?.slug).slice(0, 4),
)

// Info accordion rows.
const infoRows = [
  { icon: 'lucide:truck', title: 'Delivery', text: 'Free from €80. Delivered in 2–4 working days.' },
  { icon: 'lucide:store', title: 'Click & Collect', text: 'Pick up in store for free.' },
  { icon: 'lucide:rotate-ccw', title: 'Returns', text: '30 days to change your mind.' },
]

const toaster = useNuiToasts()

function addToBag() {
  if (!product.value)
    return

  addItem(product.value, selectedSize.value, selectedColour.value, 1)
  toaster.add({ title: 'Added to bag', icon: 'ph:check', progress: true })
}
</script>

<template>
  <div class="bg-white text-black">
    <HomeAnnouncementBar />
    <HomeHeader />

    <main class="mx-auto w-full max-w-7xl px-4 py-8">
      <ShopBreadcrumb :crumbs="breadcrumb" />

      <div class="mt-6 grid gap-10 lg:grid-cols-2">
        <!-- Gallery: vertical thumbnail rail + large primary image -->
        <div class="flex gap-4">
          <div class="flex flex-col gap-3">
            <button
              v-for="(image, index) in gallery"
              :key="index"
              type="button"
              class="size-20 overflow-hidden border"
              :class="activeImage === image ? 'border-black' : 'border-gray-200'"
              @click="activeImage = image"
            >
              <NuxtImg :src="image" :alt="`${product.title} view ${index + 1}`" class="h-full w-full object-cover" loading="lazy" />
            </button>
          </div>

          <div class="aspect-square flex-1 overflow-hidden bg-gray-100">
            <NuxtImg :src="activeImage" :alt="product.title" class="h-full w-full object-cover" loading="eager" />
          </div>
        </div>

        <!-- Product info panel -->
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <span class="text-sm font-bold uppercase tracking-wide text-gray-500">
              {{ product.brand }}
            </span>
            <h1 class="text-3xl font-black uppercase tracking-tight">
              {{ product.title }}
            </h1>
            <span class="text-2xl font-bold">
              {{ formatPrice(product.price) }}
            </span>
            <p v-if="product.description" class="text-sm leading-relaxed text-gray-600">
              {{ product.description }}
            </p>
          </div>

          <!-- Colour swatches: circular dots, ringed when active -->
          <div class="flex flex-col gap-3">
            <span class="text-xs font-bold uppercase tracking-wide">
              Colour: <span class="font-medium normal-case text-gray-600">{{ selectedColour }}</span>
            </span>
            <div class="flex items-center gap-3">
              <button
                v-for="colour in product.colours"
                :key="colour"
                type="button"
                class="size-7 rounded-full border border-gray-300"
                :class="selectedColour === colour ? 'ring-2 ring-black ring-offset-2' : 'hover:ring-1 hover:ring-gray-400 hover:ring-offset-2'"
                :style="{ backgroundColor: colourSwatches[colour] ?? '#e5e7eb' }"
                :aria-label="`Select colour ${colour}`"
                :aria-pressed="selectedColour === colour"
                @click="selectedColour = colour"
              />
            </div>
          </div>

          <!-- Size grid with disabled out-of-stock entries -->
          <div class="flex flex-col gap-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wide">Size</span>
              <NuxtLink to="/products" class="text-xs text-gray-500 underline hover:text-black">
                Size guide
              </NuxtLink>
            </div>
            <div class="grid grid-cols-6 gap-2">
              <button
                v-for="size in product.sizes"
                :key="size"
                type="button"
                class="border py-2 text-xs font-medium"
                :class="[
                  selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-black',
                  !isSizeAvailable(size) && 'cursor-not-allowed border-gray-200 text-gray-300 line-through hover:border-gray-200',
                ]"
                :disabled="!isSizeAvailable(size)"
                @click="selectedSize = size"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <!-- Purchase actions -->
          <div class="flex flex-col gap-3">
            <div class="flex gap-3">
              <button
                type="button"
                class="flex-1 bg-red-600 py-4 text-sm font-bold uppercase tracking-wide text-white hover:bg-red-700"
                @click="addToBag"
              >
                Add to bag
              </button>
              <button
                type="button"
                class="flex size-14 items-center justify-center border border-black hover:bg-black hover:text-white"
                aria-label="Add to wishlist"
              >
                <Icon name="lucide:heart" class="size-5" />
              </button>
            </div>
            <button
              type="button"
              class="w-full border border-black py-4 text-sm font-bold uppercase tracking-wide hover:bg-black hover:text-white"
            >
              Check store availability
            </button>
          </div>

          <!-- Trust / info accordion rows -->
          <div class="mt-2 divide-y divide-gray-200 border-y border-gray-200">
            <details v-for="row in infoRows" :key="row.title" class="py-4">
              <summary class="flex cursor-pointer items-center gap-3 text-sm font-bold uppercase tracking-wide">
                <Icon :name="row.icon" class="size-5" />
                {{ row.title }}
              </summary>
              <p class="mt-3 pl-8 text-sm text-gray-600">
                {{ row.text }}
              </p>
            </details>
          </div>
        </div>
      </div>

      <ProductCarousel title="You may also like" :products="recommendations" />
      <PdpReviews />
    </main>

    <HomeFooter />
  </div>
</template>
