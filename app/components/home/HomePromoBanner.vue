<script setup lang="ts">
const promo = {
  eyebrow: 'Limited time',
  title: 'Up to 40% off summer essentials',
  subtitle: 'Refresh your wardrobe with our seasonal sale. Offer ends soon.',
  cta: { label: 'Shop the sale', to: '/' },
}
</script>

<template>
  <section class="py-16">
    <div class="mx-auto w-full max-w-7xl px-4">
      <div
        class="bg-primary-600 relative overflow-hidden rounded-3xl px-6 py-14 text-center lg:px-16 lg:py-20"
      >
        <div class="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-5">
          <BaseTag rounded="full" variant="default" class="w-fit">
            {{ promo.eyebrow }}
          </BaseTag>
          <BaseHeading as="h2" size="3xl" weight="bold" class="text-white">
            {{ promo.title }}
          </BaseHeading>
          <BaseParagraph class="text-white/80">
            {{ promo.subtitle }}
          </BaseParagraph>
          <BaseButton :to="promo.cta.to" variant="default" rounded="lg" size="lg">
            {{ promo.cta.label }}
            <Icon name="lucide:arrow-right" class="size-4" />
          </BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>
