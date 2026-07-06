<script setup lang="ts">
interface NavLink {
  label: string
  to: string
  /** SALE is styled in red for emphasis. */
  highlight?: boolean
}

const navLinks: NavLink[] = [
  { label: 'New In', to: '/' },
  { label: 'Men', to: '/' },
  { label: 'Women', to: '/' },
  { label: 'Kids', to: '/' },
  { label: 'Sneakers', to: '/' },
  { label: 'Brands', to: '/' },
  { label: 'Life/Culture', to: '/' },
  { label: 'Sale', to: '/', highlight: true },
]

// Right-aligned action icons.
const actions = [
  { icon: 'lucide:search', label: 'Search' },
  { icon: 'lucide:user', label: 'Account' },
  { icon: 'lucide:heart', label: 'Wishlist' },
  { icon: 'lucide:shopping-bag', label: 'Cart' },
]
</script>

<template>
  <header class="border-b border-gray-200 bg-white">
    <div class="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-4">
      <!-- Logo: circled C + wordmark -->
      <NuxtLink to="/" class="flex items-center gap-2" aria-label="CITADIUM home">
        <span
          class="flex size-7 items-center justify-center rounded-full border-2 border-black text-sm font-black"
        >
          C
        </span>
        <span class="text-xl font-black uppercase tracking-tight">Citadium</span>
      </NuxtLink>

      <!-- Primary navigation -->
      <nav class="hidden lg:block">
        <ul class="flex items-center gap-6">
          <li v-for="link in navLinks" :key="link.label">
            <NuxtLink
              :to="link.to"
              class="text-xs font-bold uppercase tracking-wide hover:opacity-70"
              :class="link.highlight ? 'text-red-600' : 'text-black'"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- Action icons -->
      <div class="flex items-center gap-5">
        <button
          v-for="action in actions"
          :key="action.label"
          type="button"
          class="text-black hover:opacity-70"
          :aria-label="action.label"
        >
          <Icon :name="action.icon" class="size-5" />
        </button>
      </div>
    </div>
  </header>
</template>
