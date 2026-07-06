<script setup lang="ts">
// Full-width red promo bar shown above the header.
// Messages are separated by a dash on the same line.
const messages = [
  '-10% for students',
  'Free delivery from €50',
  'Free returns',
]
</script>

<template>
  <div class="bg-red-600 text-white">
    <div class="flex items-center justify-center gap-3 px-4 py-2 text-center">
      <template v-for="(message, index) in messages" :key="message">
        <span class="text-[11px] font-medium uppercase tracking-wide">
          {{ message }}
        </span>
        <span
          v-if="index < messages.length - 1"
          class="text-[11px] opacity-70"
          aria-hidden="true"
        >
          &ndash;
        </span>
      </template>
    </div>
  </div>
</template>
