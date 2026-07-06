<script setup lang="ts">
interface NavLink {
  label: string
  to: string
  /** SALE is styled in red for emphasis. */
  highlight?: boolean
}

const navLinks: NavLink[] = [
  { label: 'New In', to: '/products' },
  { label: 'Men', to: '/products' },
  { label: 'Women', to: '/products' },
  { label: 'Kids', to: '/products' },
  { label: 'Sneakers', to: '/products' },
  { label: 'Brands', to: '/products' },
  { label: 'Life/Culture', to: '/products' },
  { label: 'Sale', to: '/products', highlight: true },
]

// Live cart count for the bag badge.
const { count } = useCart()
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
      <div class="flex items-center gap-2">
        <BaseButton
          variant="ghost"
          rounded="full"
          size="icon-sm"
          class="text-black!"
          aria-label="Search"
        >
          <Icon name="lucide:search" class="size-5" />
        </BaseButton>

        <BaseButton
          to="/auth/login"
          variant="ghost"
          rounded="full"
          size="icon-sm"
          class="text-black!"
          aria-label="Account"
        >
          <Icon name="lucide:user" class="size-5" />
        </BaseButton>

        <BaseButton
          variant="ghost"
          rounded="full"
          size="icon-sm"
          class="text-black!"
          aria-label="Wishlist"
        >
          <Icon name="lucide:heart" class="size-5" />
        </BaseButton>

        <!-- Cart with live count badge -->
        <BaseButton
          to="/cart"
          variant="ghost"
          rounded="full"
          size="icon-sm"
          class="relative text-black!"
          aria-label="Cart"
        >
          <Icon name="lucide:shopping-bag" class="size-5" />
          <span
            v-if="count > 0"
            class="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white"
          >
            {{ count }}
          </span>
        </BaseButton>
      </div>
    </div>
  </header>
</template>
