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
        <BaseHeading as="h2" size="3xl" weight="bold" class="uppercase tracking-tight">
          Stay in the loop
        </BaseHeading>
        <BaseParagraph size="sm" class="text-gray-600">
          Sign up and get 10% off your first order, plus early access to drops.
        </BaseParagraph>

        <form class="mt-2 flex max-w-md gap-2" @submit.prevent="onSubmit">
          <BaseInput
            v-model="email"
            type="email"
            placeholder="Enter your email"
            autocomplete="email"
            aria-label="Email address"
            rounded="none"
            class="flex-1"
          />
          <BaseButton
            type="submit"
            rounded="none"
            class="bg-black! font-bold uppercase tracking-wide text-white! hover:bg-gray-800!"
          >
            Sign up
          </BaseButton>
        </form>

        <BaseParagraph v-if="submitted" size="sm" weight="medium" class="text-red-600">
          Thanks for signing up!
        </BaseParagraph>
      </div>
    </div>
  </section>
</template>
