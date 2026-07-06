<script lang="ts" setup>
definePageMeta({
  layout: 'empty',
})

useHead({ title: 'Checkout – CITADIUM' })

const { items, subtotal, clear } = useCart()

// Checkout flow steps. `current` drives which panel is shown.
const steps = ['Shipping', 'Payment', 'Review', 'Confirmation']
const current = ref(0)

const deliveryCost = computed(() => (subtotal.value >= 50 || subtotal.value === 0 ? 0 : 4.95))
const total = computed(() => subtotal.value + deliveryCost.value)

// Payment method selection.
const paymentMethod = ref<'card' | 'paypal' | 'applepay' | 'klarna'>('card')
const paymentOptions = [
  { id: 'card', label: 'Credit / Debit Card' },
  { id: 'paypal', label: 'PayPal' },
  { id: 'applepay', label: 'Apple Pay' },
  { id: 'klarna', label: 'Klarna' },
] as const

// Trust badges shown under the order summary.
const trustBadges = [
  { icon: 'lucide:lock', label: 'Secure payment' },
  { icon: 'lucide:rotate-ccw', label: 'Free returns' },
  { icon: 'lucide:headphones', label: 'Customer care' },
]

// Placeholder order details for the confirmation screen.
const customerName = ref('Lucas')
const orderNumber = ref('CIT-2026-004821')

function goNext() {
  if (current.value < steps.length - 1) {
    current.value += 1

    // Clear the cart once the order is confirmed.
    if (current.value === steps.length - 1) {
      clear()
    }
  }
}

function goBack() {
  if (current.value > 0)
    current.value -= 1
}
</script>

<template>
  <div class="bg-white text-black">
    <HomeAnnouncementBar />
    <HomeHeader />

    <main class="mx-auto w-full max-w-7xl px-4 py-8">
      <!-- Stepper -->
      <ol class="flex items-center justify-center gap-4">
        <li v-for="(step, index) in steps" :key="step" class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <span
              class="flex size-8 items-center justify-center rounded-full border text-xs font-bold"
              :class="index <= current ? 'border-black bg-black text-white' : 'border-gray-300 text-gray-400'"
            >
              <Icon v-if="index < current" name="lucide:check" class="size-4" />
              <template v-else>{{ index + 1 }}</template>
            </span>
            <span
              class="hidden text-xs font-bold uppercase tracking-wide sm:block"
              :class="index <= current ? 'text-black' : 'text-gray-400'"
            >
              {{ step }}
            </span>
          </div>
          <span v-if="index < steps.length - 1" class="h-px w-8 bg-gray-300" aria-hidden="true" />
        </li>
      </ol>

      <!-- Confirmation state -->
      <div v-if="current === steps.length - 1" class="mx-auto mt-16 flex max-w-md flex-col items-center text-center">
        <div class="flex size-16 items-center justify-center rounded-full bg-red-600">
          <Icon name="lucide:check" class="size-8 text-white" />
        </div>
        <h1 class="mt-6 text-3xl font-black uppercase tracking-tight">
          Thank you, {{ customerName }}!
        </h1>
        <p class="mt-3 text-sm text-gray-600">
          Your order is confirmed. We've emailed your receipt and will notify you when it ships.
        </p>
        <p class="mt-4 text-xs font-bold uppercase tracking-wide text-gray-500">
          Order number: {{ orderNumber }}
        </p>
        <button
          type="button"
          class="mt-8 bg-black px-8 py-4 text-sm font-bold uppercase tracking-wide text-white hover:bg-gray-800"
        >
          Track my order
        </button>
        <NuxtLink to="/" class="mt-4 text-xs font-medium text-gray-600 hover:text-black">
          Back to home
        </NuxtLink>

        <div class="mt-8 flex gap-3">
          <span class="rotate-[-6deg] border border-black px-3 py-1 text-xs font-black uppercase">Good choice</span>
          <span class="rotate-[4deg] border border-red-600 px-3 py-1 text-xs font-black uppercase text-red-600">See you in store!</span>
        </div>
      </div>

      <!-- Three-column checkout -->
      <div v-else class="mt-12 grid gap-8 lg:grid-cols-3">
        <!-- Shipping address -->
        <section class="space-y-4">
          <h2 class="text-lg font-black uppercase tracking-tight">
            Shipping Address
          </h2>
          <form class="space-y-3" @submit.prevent>
            <input type="text" placeholder="Full name" aria-label="Full name" class="w-full border border-gray-300 px-3 py-3 text-sm focus:border-black focus:outline-none">
            <input type="email" placeholder="Email" aria-label="Email" class="w-full border border-gray-300 px-3 py-3 text-sm focus:border-black focus:outline-none">
            <input type="tel" placeholder="Phone" aria-label="Phone" class="w-full border border-gray-300 px-3 py-3 text-sm focus:border-black focus:outline-none">
            <input type="text" placeholder="Address" aria-label="Address" class="w-full border border-gray-300 px-3 py-3 text-sm focus:border-black focus:outline-none">
            <div class="grid grid-cols-2 gap-3">
              <input type="text" placeholder="City" aria-label="City" class="w-full border border-gray-300 px-3 py-3 text-sm focus:border-black focus:outline-none">
              <input type="text" placeholder="Postal code" aria-label="Postal code" class="w-full border border-gray-300 px-3 py-3 text-sm focus:border-black focus:outline-none">
            </div>
            <select aria-label="Country" class="w-full border border-gray-300 px-3 py-3 text-sm focus:border-black focus:outline-none">
              <option>France</option>
              <option>Belgium</option>
              <option>Germany</option>
              <option>Spain</option>
            </select>
          </form>
        </section>

        <!-- Payment -->
        <section class="space-y-4">
          <h2 class="text-lg font-black uppercase tracking-tight">
            Payment
          </h2>
          <div class="space-y-2">
            <label
              v-for="option in paymentOptions"
              :key="option.id"
              class="flex cursor-pointer items-center gap-3 border p-3 text-sm"
              :class="paymentMethod === option.id ? 'border-black' : 'border-gray-300'"
            >
              <input v-model="paymentMethod" type="radio" :value="option.id" class="accent-black">
              {{ option.label }}
            </label>
          </div>

          <!-- Card fields, only when card is selected -->
          <div v-if="paymentMethod === 'card'" class="space-y-3 pt-2">
            <input type="text" placeholder="Card number" aria-label="Card number" class="w-full border border-gray-300 px-3 py-3 text-sm focus:border-black focus:outline-none">
            <div class="grid grid-cols-2 gap-3">
              <input type="text" placeholder="MM / YY" aria-label="Expiry" class="w-full border border-gray-300 px-3 py-3 text-sm focus:border-black focus:outline-none">
              <input type="text" placeholder="CVC" aria-label="CVC" class="w-full border border-gray-300 px-3 py-3 text-sm focus:border-black focus:outline-none">
            </div>
          </div>
        </section>

        <!-- Order summary -->
        <aside class="space-y-4">
          <h2 class="text-lg font-black uppercase tracking-tight">
            Order Summary
          </h2>
          <div class="border border-gray-200 p-5">
            <ul class="space-y-3">
              <li v-for="item in items" :key="`${item.product.slug}-${item.size}-${item.colour}`" class="flex justify-between gap-3 text-sm">
                <span class="text-gray-600">
                  {{ item.quantity }}× {{ item.product.title }}
                </span>
                <span>{{ formatPrice(item.product.price * item.quantity) }}</span>
              </li>
              <li v-if="items.length === 0" class="text-sm text-gray-500">
                Your cart is empty.
              </li>
            </ul>

            <dl class="mt-4 space-y-2 border-t border-gray-200 pt-4 text-sm">
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
          </div>

          <!-- Trust badges -->
          <div class="flex justify-between">
            <div v-for="badge in trustBadges" :key="badge.label" class="flex flex-col items-center gap-1 text-center">
              <Icon :name="badge.icon" class="size-5" />
              <span class="text-[10px] font-medium uppercase tracking-wide text-gray-500">{{ badge.label }}</span>
            </div>
          </div>
        </aside>
      </div>

      <!-- Flow controls -->
      <div v-if="current < steps.length - 1" class="mt-10 flex items-center justify-between">
        <button
          type="button"
          class="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-gray-600 hover:text-black disabled:opacity-40"
          :disabled="current === 0"
          @click="goBack"
        >
          <Icon name="lucide:arrow-left" class="size-4" />
          Back
        </button>
        <button
          type="button"
          class="bg-red-600 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white hover:bg-red-700"
          @click="goNext"
        >
          {{ current === steps.length - 2 ? 'Place order' : 'Continue' }}
        </button>
      </div>
    </main>

    <HomeFooter />
  </div>
</template>
