<script lang="ts" setup>
definePageMeta({
  layout: 'empty',
})

useHead({ title: 'Your Cart – CITADIUM' })

const { items, count, subtotal, removeItem, updateQuantity } = useCart()

// Free-delivery nudge: show progress towards the €50 threshold.
const FREE_DELIVERY_THRESHOLD = 50
const deliveryCost = computed(() => (subtotal.value >= FREE_DELIVERY_THRESHOLD || subtotal.value === 0 ? 0 : 4.95))
const total = computed(() => subtotal.value + deliveryCost.value)
const progress = computed(() =>
  Math.min(100, Math.round((subtotal.value / FREE_DELIVERY_THRESHOLD) * 100)),
)
const amountToFreeDelivery = computed(() =>
  Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal.value),
)

const promoCode = ref('')
</script>

<template>
  <div class="bg-white text-black">
    <HomeAnnouncementBar />
    <HomeHeader />

    <main class="mx-auto w-full max-w-7xl px-4 py-8">
      <h1 class="text-3xl font-black uppercase tracking-tight">
        Your Cart ({{ count }})
      </h1>

      <!-- Empty state -->
      <div v-if="items.length === 0" class="mt-10 flex flex-col items-start gap-4">
        <p class="text-sm text-gray-600">
          Your cart is empty.
        </p>
        <NuxtLink
          to="/products"
          class="bg-black px-7 py-3 text-xs font-bold uppercase tracking-wide text-white hover:bg-gray-800"
        >
          Start shopping
        </NuxtLink>
      </div>

      <div v-else class="mt-8 grid gap-10 lg:grid-cols-3">
        <!-- Line items -->
        <div class="lg:col-span-2">
          <ul class="divide-y divide-gray-200 border-y border-gray-200">
            <li v-for="(item, index) in items" :key="`${item.product.slug}-${item.size}-${item.colour}`" class="flex gap-4 py-6">
              <div class="size-28 shrink-0 overflow-hidden bg-gray-100">
                <NuxtImg :src="item.product.image" :alt="item.product.title" class="h-full w-full object-cover" loading="lazy" />
              </div>

              <div class="flex flex-1 flex-col justify-between">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <p class="text-xs font-bold uppercase tracking-wide text-gray-500">
                      {{ item.product.brand }}
                    </p>
                    <p class="text-sm font-medium">
                      {{ item.product.title }}
                    </p>
                    <p class="mt-1 text-xs text-gray-500">
                      {{ item.colour }} · {{ item.size }}
                    </p>
                  </div>
                  <button
                    type="button"
                    class="text-gray-400 hover:text-black"
                    aria-label="Remove item"
                    @click="removeItem(index)"
                  >
                    <Icon name="lucide:trash-2" class="size-5" />
                  </button>
                </div>

                <div class="flex items-center justify-between">
                  <!-- Quantity stepper -->
                  <div class="flex items-center border border-gray-300">
                    <button
                      type="button"
                      class="flex size-9 items-center justify-center hover:bg-gray-100"
                      aria-label="Decrease quantity"
                      @click="updateQuantity(index, item.quantity - 1)"
                    >
                      <Icon name="lucide:minus" class="size-4" />
                    </button>
                    <span class="w-10 text-center text-sm">{{ item.quantity }}</span>
                    <button
                      type="button"
                      class="flex size-9 items-center justify-center hover:bg-gray-100"
                      aria-label="Increase quantity"
                      @click="updateQuantity(index, item.quantity + 1)"
                    >
                      <Icon name="lucide:plus" class="size-4" />
                    </button>
                  </div>
                  <span class="text-sm font-bold">
                    {{ formatPrice(item.product.price * item.quantity) }}
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <!-- Sticky summary -->
        <aside class="lg:col-span-1">
          <div class="sticky top-6 border border-gray-200 p-6">
            <h2 class="text-lg font-black uppercase tracking-tight">
              Cart Summary
            </h2>

            <!-- Free delivery nudge -->
            <div class="mt-4">
              <p v-if="amountToFreeDelivery > 0" class="text-xs text-gray-600">
                Add {{ formatPrice(amountToFreeDelivery) }} more for free delivery.
              </p>
              <p v-else class="text-xs font-medium text-red-600">
                You've unlocked free delivery!
              </p>
              <div class="mt-2 h-1.5 w-full bg-gray-200">
                <div class="h-full bg-black" :style="{ width: `${progress}%` }" />
              </div>
            </div>

            <!-- Promo code -->
            <form class="mt-6 flex gap-2" @submit.prevent>
              <input
                v-model="promoCode"
                type="text"
                placeholder="Promo code"
                aria-label="Promo code"
                class="flex-1 border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
              >
              <button type="submit" class="border border-black px-4 py-2 text-xs font-bold uppercase tracking-wide hover:bg-black hover:text-white">
                Apply
              </button>
            </form>

            <!-- Totals -->
            <dl class="mt-6 space-y-2 border-t border-gray-200 pt-4 text-sm">
              <div class="flex justify-between">
                <dt class="text-gray-600">Subtotal</dt>
                <dd>{{ formatPrice(subtotal) }}</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-gray-600">Delivery</dt>
                <dd>{{ deliveryCost === 0 ? 'Free' : formatPrice(deliveryCost) }}</dd>
              </div>
              <div class="flex justify-between border-t border-gray-200 pt-2 text-base font-bold">
                <dt>Total</dt>
                <dd>{{ formatPrice(total) }}</dd>
              </div>
            </dl>

            <NuxtLink
              to="/checkout"
              class="mt-6 block bg-red-600 py-4 text-center text-sm font-bold uppercase tracking-wide text-white hover:bg-red-700"
            >
              Checkout securely
            </NuxtLink>

            <!-- Payment icons -->
            <div class="mt-4 flex items-center justify-center gap-3 text-gray-400">
              <Icon name="lucide:credit-card" class="size-6" />
              <Icon name="logos:visa" class="h-5" />
              <Icon name="logos:mastercard" class="h-6" />
              <Icon name="logos:paypal" class="h-5" />
            </div>

            <NuxtLink
              to="/products"
              class="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-gray-600 hover:text-black"
            >
              <Icon name="lucide:arrow-left" class="size-4" />
              Continue shopping
            </NuxtLink>
          </div>
        </aside>
      </div>
    </main>

    <HomeFooter />
  </div>
</template>
