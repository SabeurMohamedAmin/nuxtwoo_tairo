<script setup lang="ts">
// Scroll-aware sticky header, inspired by the Tairo demo landing navbar.
// At the top of the page it looks like a classic full-width shop header.
// Once the page is scrolled past 60px, it morphs into a floating rounded
// card with a border, a shadow and a subtle blur.
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

// Window scroll position drives the "floating card" look.
const { y } = useNuiWindowScroll()
const isScrolled = computed(() => y.value > 60)

// Mobile navigation panel state (hamburger toggle).
const isMobileOpen = ref(false)
</script>

<template>
  <header
    class="sticky top-0 z-50 mx-auto w-full motion-safe:transition-all motion-safe:duration-200"
    :class="isScrolled ? 'mt-2 max-w-[calc(100%_-_40px)] lg:max-w-7xl' : ''"
  >
    <div
      class="motion-safe:transition-all motion-safe:duration-200"
      :class="isScrolled
        ? 'rounded-2xl border border-gray-200 bg-white/95 shadow-xl shadow-gray-300/30 backdrop-blur'
        : 'border-b border-gray-200 bg-white'"
    >
      <div class="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-4">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2" aria-label="CITADIUM home">
          <span class="flex size-7 items-center justify-center rounded-full border-2 border-black text-sm font-black">
            C
          </span>
          <span class="text-xl font-black uppercase tracking-tight">Citadium</span>
        </NuxtLink>

        <!-- Desktop navigation -->
        <nav class="hidden lg:block" aria-label="Main navigation">
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

          <!-- Cart with live item count -->
          <BaseButton
            to="/cart"
            variant="ghost"
            rounded="full"
            size="icon-sm"
            class="relative text-black!"
            aria-label="Cart"
          >
            <Icon name="lucide:shopping-bag" class="size-5" />
            <span class="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
              {{ count }}
            </span>
          </BaseButton>

          <!-- Mobile menu toggle (animated hamburger) -->
          <button
            type="button"
            class="flex items-center justify-center p-1 lg:hidden"
            :aria-label="isMobileOpen ? 'Close menu' : 'Open menu'"
            @click="isMobileOpen = !isMobileOpen"
          >
            <div class="space-y-1.5">
              <span
                class="block h-0.5 bg-black motion-safe:transition-all motion-safe:duration-300"
                :class="isMobileOpen ? 'w-2' : 'w-6'"
              />
              <span class="block h-0.5 w-6 bg-black motion-safe:transition-all motion-safe:duration-300" />
              <span
                class="block h-0.5 bg-black motion-safe:transition-all motion-safe:duration-300"
                :class="isMobileOpen ? 'w-4' : 'w-6'"
              />
            </div>
          </button>
        </div>
      </div>

      <!-- Mobile navigation panel -->
      <nav
        v-if="isMobileOpen"
        class="border-t border-gray-200 px-4 py-4 lg:hidden"
        aria-label="Mobile navigation"
      >
        <ul class="flex flex-col gap-4">
          <li v-for="link in navLinks" :key="link.label">
            <NuxtLink
              :to="link.to"
              class="text-xs font-bold uppercase tracking-wide hover:opacity-70"
              :class="link.highlight ? 'text-red-600' : 'text-black'"
              @click="isMobileOpen = false"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
