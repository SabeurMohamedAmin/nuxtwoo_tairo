<script lang="ts" setup>
// The CITADIUM storefront uses a custom announcement bar + header, so we use
// the `empty` layout and compose the full-width sections ourselves.
definePageMeta({
  layout: 'empty',
})

useHead({ title: 'CITADIUM – Streetwear & Sneakers' })
</script>

<template>
  <div class="bg-white text-black">
    <HomeAnnouncementBar />
    <HomeHeader />

    <main>
      <HomeHero />
      <HomeCategoryGrid />
      <HomeSneakerRail />
      <HomeEditorialBanners />
      <HomeNewsletter />
    </main>

    <HomeFooter />
  </div>
</template>
