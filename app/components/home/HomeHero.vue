<script setup lang="ts">
// Static hero content. Move to a composable or API call later if needed.
const hero = {
  eyebrow: 'New Collection 2026',
  title: 'Elevate your everyday style',
  subtitle:
    'Discover curated fashion pieces designed to make you stand out. Quality materials, timeless design.',
  primaryCta: { label: 'Shop now', to: '/' },
  secondaryCta: { label: 'Browse collections', to: '/' },
  image:
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
}
</script>

<template>
  <section class="relative overflow-hidden pt-24 pb-16 lg:pb-24">
    <div class="mx-auto w-full max-w-7xl px-4">
      <div class="grid items-center gap-10 lg:grid-cols-2">
        <!-- Left: copy + calls to action -->
        <div class="flex flex-col gap-6">
          <BaseTag rounded="full" variant="primary" class="w-fit">
            {{ hero.eyebrow }}
          </BaseTag>

          <BaseHeading
            as="h1"
            size="5xl"
            weight="bold"
            class="text-muted-900 dark:text-white"
          >
            {{ hero.title }}
          </BaseHeading>

          <BaseParagraph size="lg" class="text-muted-500 max-w-md">
            {{ hero.subtitle }}
          </BaseParagraph>

          <div class="flex flex-wrap gap-3">
            <BaseButton
              :to="hero.primaryCta.to"
              variant="primary"
              rounded="lg"
              size="lg"
            >
              {{ hero.primaryCta.label }}
              <Icon name="lucide:arrow-right" class="size-4" />
            </BaseButton>
            <BaseButton
              :to="hero.secondaryCta.to"
              variant="muted"
              rounded="lg"
              size="lg"
            >
              {{ hero.secondaryCta.label }}
            </BaseButton>
          </div>
        </div>

        <!-- Right: hero image -->
        <div class="relative">
          <div class="overflow-hidden rounded-3xl">
            <NuxtImg
              :src="hero.image"
              alt="Featured fashion collection"
              class="h-[420px] w-full object-cover lg:h-[520px]"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
