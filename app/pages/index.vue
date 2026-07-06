<script lang="ts" setup>
definePageMeta({
  layout: 'landing',
})

useHead({
  title: 'Home',
})
</script>

<template>
  <!--
    The home page is composed of small, focused section components.
    Each section lives in `app/components/home` so it stays easy to read
    and maintain. Update or reorder sections here without touching layout.
  -->
  <div class="flex flex-col">
    <HomeHero />
    <HomeCategories />
    <HomeFeaturedProducts />
    <HomePromoBanner />
    <HomeNewsletter />
  </div>
</template>
