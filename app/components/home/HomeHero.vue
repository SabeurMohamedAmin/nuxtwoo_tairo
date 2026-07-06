<script setup lang="ts">
const hero = {
  title: 'Play Your Way',
  subtitle: 'New season. New energy. Styles that move with you.',
  primaryCta: { label: 'Shop New In', to: '/products' },
  secondaryCta: { label: 'Explore', to: '/products' },
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
        <BaseHeading
          as="h1"
          weight="bold"
          class="max-w-xl text-6xl uppercase leading-[0.9] tracking-tight text-white sm:text-7xl lg:text-8xl"
        >
          {{ hero.title }}
        </BaseHeading>
        <BaseText size="sm" weight="medium" class="mt-5 max-w-sm text-white">
          {{ hero.subtitle }}
        </BaseText>

        <div class="mt-8 flex flex-wrap gap-3">
          <!-- Solid white button -->
          <BaseButton
            :to="hero.primaryCta.to"
            rounded="none"
            size="lg"
            class="bg-white! text-black! font-bold uppercase tracking-wide hover:bg-gray-100!"
          >
            {{ hero.primaryCta.label }}
          </BaseButton>
          <!-- Outlined button -->
          <BaseButton
            :to="hero.secondaryCta.to"
            rounded="none"
            size="lg"
            variant="outline"
            class="border-white! text-white! font-bold uppercase tracking-wide hover:bg-white/10!"
          >
            {{ hero.secondaryCta.label }}
          </BaseButton>
        </div>
      </div>

      <!-- Angled red badge, bottom-right -->
      <BaseTag
        rounded="none"
        class="absolute bottom-8 right-0 rotate-[-8deg] bg-red-600! font-bold uppercase tracking-wide text-white! shadow-lg"
      >
        {{ hero.badge }}
      </BaseTag>
    </div>
  </section>
</template>
