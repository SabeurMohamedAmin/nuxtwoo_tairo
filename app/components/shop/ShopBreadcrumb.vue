<script setup lang="ts">
interface Crumb {
  label: string
  to?: string
}

defineProps<{
  crumbs: Crumb[]
}>()
</script>

<template>
  <nav aria-label="Breadcrumb">
    <ol class="flex flex-wrap items-center gap-2 text-xs text-gray-500">
      <li v-for="(crumb, index) in crumbs" :key="crumb.label" class="flex items-center gap-2">
        <NuxtLink
          v-if="crumb.to"
          :to="crumb.to"
          class="uppercase tracking-wide hover:text-black"
        >
          {{ crumb.label }}
        </NuxtLink>
        <span v-else class="uppercase tracking-wide text-black">
          {{ crumb.label }}
        </span>
        <span v-if="index < crumbs.length - 1" aria-hidden="true">/</span>
      </li>
    </ol>
  </nav>
</template>
