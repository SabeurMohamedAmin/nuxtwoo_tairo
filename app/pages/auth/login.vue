<script lang="ts" setup>
definePageMeta({
  layout: 'empty',
})

const email = ref('')
const password = ref('')

function onSubmit() {
  // TODO: wire up authentication
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center p-4">
    <BaseCard rounded="lg" class="w-full max-w-md p-8">
      <div class="mb-6 text-center">
        <BaseHeading as="h1" size="xl" weight="bold" class="text-muted-800 dark:text-white">
          Sign in
        </BaseHeading>
        <BaseParagraph size="sm" class="text-muted-500">
          Welcome back, please sign in to continue.
        </BaseParagraph>
      </div>

      <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
        <BaseField label="Email">
          <BaseInput
            v-model="email"
            type="email"
            placeholder="you@example.com"
            autocomplete="email"
          />
        </BaseField>

        <BaseField label="Password">
          <BaseInput
            v-model="password"
            type="password"
            placeholder="••••••••"
            autocomplete="current-password"
          />
        </BaseField>

        <BaseButton type="submit" variant="primary" class="w-full">
          Sign in
        </BaseButton>
      </form>
    </BaseCard>
  </div>
</template>
