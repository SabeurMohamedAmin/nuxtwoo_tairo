<script setup lang="ts">
const email = ref('')
const submitted = ref(false)

function onSubmit() {
  // TODO: wire up newsletter subscription API.
  if (!email.value)
    return

  submitted.value = true
  email.value = ''
}
</script>

<template>
  <section class="border-t border-gray-200 bg-white py-16">
    <div class="mx-auto w-full max-w-7xl px-4">
      <div class="flex max-w-xl flex-col gap-4">
        <h2 class="text-3xl font-black uppercase tracking-tight">
          Stay in the loop
        </h2>
        <p class="text-sm text-gray-600">
          Sign up and get 10% off your first order, plus early access to drops.
        </p>

        <form class="mt-2 flex max-w-md gap-2" @submit.prevent="onSubmit">
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            autocomplete="email"
            aria-label="Email address"
            class="flex-1 border border-gray-300 px-4 py-3 text-sm focus:border-black focus:outline-none"
          >
          <button
            type="submit"
            class="bg-black px-7 py-3 text-xs font-bold uppercase tracking-wide text-white hover:bg-gray-800"
          >
            Sign up
          </button>
        </form>

        <p v-if="submitted" class="text-sm font-medium text-red-600">
          Thanks for signing up!
        </p>
      </div>
    </div>
  </section>
</template>
