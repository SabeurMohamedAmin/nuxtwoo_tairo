<script setup lang="ts">
const hero = {
  title: 'Play Your Way',
  subtitle: 'New season. New energy. Styles that move with you.',
  primaryCta: { label: 'Shop New In', to: '/' },
  secondaryCta: { label: 'Explore', to: '/' },
  badge: 'New Drop',
  image:
    'https://images.unsplash.com/photo-1516575334481-f85287c2c82d?auto=format&fit=crop&w=1600&q=80',
}
</script>

<template>
  <section class="relative">
    <!-- Full-bleed hero image -->
    <div class="relative h-[70vh] min-h-[480px] w-full overflow-hidden">
      <NuxtImg
        :src="hero.image"
        alt="Group of friends in urban streetwear"
        class="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
      <!-- Dark overlay for text contrast -->
      <div class="absolute inset-0 bg-black/40" />

      <!-- Hero content -->
      <div class="relative mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-4">
        <h1
          class="max-w-xl text-6xl font-black uppercase leading-[0.9] tracking-tight text-white sm:text-7xl lg:text-8xl"
        >
          {{ hero.title }}
        </h1>
        <p class="mt-5 max-w-sm text-sm font-medium text-white">
          {{ hero.subtitle }}
        </p>

        <div class="mt-8 flex flex-wrap gap-3">
          <!-- Solid white button -->
          <NuxtLink
            :to="hero.primaryCta.to"
            class="bg-white px-7 py-3 text-xs font-bold uppercase tracking-wide text-black hover:bg-gray-100"
          >
            {{ hero.primaryCta.label }}
          </NuxtLink>
          <!-- Outlined button -->
          <NuxtLink
            :to="hero.secondaryCta.to"
            class="border border-white px-7 py-3 text-xs font-bold uppercase tracking-wide text-white hover:bg-white/10"
          >
            {{ hero.secondaryCta.label }}
          </NuxtLink>
        </div>
      </div>

      <!-- Angled red badge, bottom-right -->
      <div
        class="absolute bottom-8 right-0 rotate-[-8deg] bg-red-600 px-6 py-2 text-sm font-black uppercase tracking-wide text-white shadow-lg"
      >
        {{ hero.badge }}
      </div>
    </div>
  </section>
</template>
