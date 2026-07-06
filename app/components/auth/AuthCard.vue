<script setup lang="ts">
// Shared split-screen shell for all auth pages (login, register, forgot).
// Left side: the form (passed via the default slot).
// Right side: a decorative brand panel (hidden on small screens).
withDefaults(
  defineProps<{
    /** Small label shown above the title. */
    eyebrow?: string
    /** Main heading of the auth card. */
    title: string
    /** Supporting text under the title. */
    subtitle?: string
    /** Background image for the decorative side panel. */
    image?: string
  }>(),
  {
    eyebrow: undefined,
    subtitle: undefined,
    image:
      'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1200&q=80',
  },
)
</script>

<template>
  <div class="bg-muted-100 dark:bg-muted-900 flex min-h-screen">
    <!-- Left: form column -->
    <div class="relative flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16">
      <!-- Top bar: logo + theme toggle -->
      <div class="absolute inset-x-0 top-0 flex items-center justify-between p-6 lg:px-16">
        <NuxtLink to="/" class="inline-flex" aria-label="Go to homepage">
          <TairoLogoText class="text-primary-500 h-7" />
        </NuxtLink>
        <BaseThemeToggleCustom aria-label="Toggle dark mode" />
      </div>

      <div class="mx-auto w-full max-w-md">
        <div class="mb-8 flex flex-col gap-2">
          <BaseParagraph
            v-if="eyebrow"
            size="sm"
            weight="medium"
            class="text-primary-500 uppercase tracking-wide"
          >
            {{ eyebrow }}
          </BaseParagraph>
          <BaseHeading as="h1" size="2xl" weight="bold" class="text-muted-900 dark:text-white">
            {{ title }}
          </BaseHeading>
          <BaseParagraph v-if="subtitle" class="text-muted-500">
            {{ subtitle }}
          </BaseParagraph>
        </div>

        <!-- The page-specific form goes here -->
        <slot />
      </div>
    </div>

    <!-- Right: decorative brand panel -->
    <div class="relative hidden w-1/2 overflow-hidden lg:block">
      <NuxtImg
        :src="image"
        alt=""
        class="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div class="bg-primary-900/40 absolute inset-0" />
      <div class="absolute inset-0 flex flex-col justify-end p-16">
        <BaseHeading as="h2" size="3xl" weight="bold" class="text-white">
          Elevate your everyday style
        </BaseHeading>
        <BaseParagraph class="mt-3 max-w-md text-white/80">
          Join thousands of members enjoying exclusive access to new collections
          and members-only offers.
        </BaseParagraph>
      </div>
    </div>
  </div>
</template>
