<script setup lang="ts">
interface FooterColumn {
  title: string
  links: { label: string, to: string }[]
}

// Footer link columns. Point to real routes where they exist.
const columns: FooterColumn[] = [
  {
    title: 'Shop',
    links: [
      { label: 'New In', to: '/products' },
      { label: 'Men', to: '/products' },
      { label: 'Women', to: '/products' },
      { label: 'Sneakers', to: '/products' },
      { label: 'Sale', to: '/products' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Delivery', to: '/' },
      { label: 'Returns', to: '/' },
      { label: 'Size guide', to: '/' },
      { label: 'Contact us', to: '/' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Sign in', to: '/auth/login' },
      { label: 'Create account', to: '/auth/register' },
      { label: 'Your cart', to: '/cart' },
      { label: 'Track order', to: '/' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/' },
      { label: 'Careers', to: '/' },
      { label: 'Stores', to: '/' },
      { label: 'Sustainability', to: '/' },
    ],
  },
]

// Social icons in the bottom bar.
const socials = [
  { icon: 'lucide:instagram', label: 'Instagram' },
  { icon: 'lucide:facebook', label: 'Facebook' },
  { icon: 'lucide:twitter', label: 'Twitter' },
  { icon: 'lucide:youtube', label: 'YouTube' },
]

const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-black text-white">
    <div class="mx-auto w-full max-w-7xl px-4 py-14">
      <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
        <!-- Brand block -->
        <div class="lg:col-span-1">
          <div class="flex items-center gap-2">
            <span class="flex size-7 items-center justify-center rounded-full border-2 border-white text-sm font-black">
              C
            </span>
            <span class="text-xl font-black uppercase tracking-tight">Citadium</span>
          </div>
          <p class="mt-4 text-sm text-gray-400">
            Style, culture, community. Streetwear and sneakers for the city.
          </p>
        </div>

        <!-- Link columns -->
        <div v-for="column in columns" :key="column.title">
          <h3 class="text-xs font-bold uppercase tracking-wide text-gray-300">
            {{ column.title }}
          </h3>
          <ul class="mt-4 space-y-2">
            <li v-for="link in column.links" :key="link.label">
              <NuxtLink :to="link.to" class="text-sm text-gray-400 hover:text-white">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
        <p class="text-xs text-gray-500">
          © {{ year }} CITADIUM. All rights reserved.
        </p>
        <div class="flex items-center gap-4">
          <a
            v-for="social in socials"
            :key="social.label"
            href="#"
            class="text-gray-400 hover:text-white"
            :aria-label="social.label"
          >
            <Icon :name="social.icon" class="size-5" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
