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
  <section class="py-16">
    <div class="mx-auto w-full max-w-3xl px-4 text-center">
      <div class="flex flex-col items-center gap-4">
        <BaseHeading as="h2" size="2xl" weight="bold" class="text-muted-900 dark:text-white">
          Join our newsletter
        </BaseHeading>
        <BaseParagraph class="text-muted-500 max-w-md">
          Be the first to know about new arrivals, exclusive offers, and style tips.
        </BaseParagraph>

        <form
          class="mt-4 flex w-full max-w-md flex-col gap-3 sm:flex-row"
          @submit.prevent="onSubmit"
        >
          <BaseInput
            v-model="email"
            type="email"
            placeholder="you@example.com"
            autocomplete="email"
            rounded="lg"
            class="flex-1"
            aria-label="Email address"
          />
          <BaseButton type="submit" variant="primary" rounded="lg">
            Subscribe
          </BaseButton>
        </form>

        <BaseParagraph v-if="submitted" size="sm" class="text-primary-500">
          Thanks for subscribing!
        </BaseParagraph>
      </div>
    </div>
  </section>
</template>
