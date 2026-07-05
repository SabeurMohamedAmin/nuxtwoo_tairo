<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'en',
    dir: 'ltr',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/img/favicon.png',
    },
  ],
})
</script>

<template>
  <BaseProviders >
    <NuxtRouteAnnouncer  />
    <NuxtLoadingIndicator  color="var(--color-primary-500)"/>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </BaseProviders>
</template>