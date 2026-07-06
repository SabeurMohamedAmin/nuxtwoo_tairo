<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import { Field, useForm } from 'vee-validate'
import { z } from 'zod'

definePageMeta({
  layout: 'empty',
})

useHead({ title: 'Reset password' })

const VALIDATION_TEXT = {
  EMAIL_REQUIRED: 'Enter a valid email address',
}

const zodSchema = z.object({
  email: z.string().email(VALIDATION_TEXT.EMAIL_REQUIRED),
})

type FormInput = z.infer<typeof zodSchema>

const validationSchema = toTypedSchema(zodSchema)
const initialValues: FormInput = { email: '' }

const { handleSubmit, isSubmitting } = useForm({
  validationSchema,
  initialValues,
})

// Once the email is sent we swap the form for a confirmation message.
const emailSent = ref(false)

const onSubmit = handleSubmit(async (_values) => {
  // TODO: replace with real password reset request.
  await new Promise(resolve => setTimeout(resolve, 1200))
  emailSent.value = true
})
</script>

<template>
  <AuthCard
    eyebrow="Password recovery"
    title="Forgot your password?"
    subtitle="Enter your email and we'll send you a link to reset it."
  >
    <!-- Confirmation state -->
    <div v-if="emailSent" class="flex flex-col gap-4">
      <div class="bg-success-500/10 flex size-14 items-center justify-center rounded-full">
        <Icon name="lucide:mail-check" class="text-success-500 size-7" />
      </div>
      <BaseHeading as="h2" size="lg" weight="semibold" class="text-muted-900 dark:text-white">
        Check your inbox
      </BaseHeading>
      <BaseParagraph class="text-muted-500">
        We've sent a password reset link to your email address. Follow the
        instructions to set a new password.
      </BaseParagraph>
      <BaseButton to="/auth/login" color="primary" rounded="lg" class="w-full">
        Back to sign in
      </BaseButton>
    </div>

    <!-- Request form -->
    <form v-else novalidate class="flex flex-col gap-4" @submit.prevent="onSubmit">
      <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="email">
        <BaseField
          v-slot="{ inputAttrs, inputRef }"
          label="Email address"
          :state="errorMessage ? 'error' : 'idle'"
          :error="errorMessage"
          :disabled="isSubmitting"
          required
        >
          <BaseInput
            :ref="inputRef"
            v-bind="inputAttrs"
            type="email"
            placeholder="you@example.com"
            autocomplete="email"
            rounded="lg"
            :model-value="field.value"
            :error="errorMessage"
            :disabled="isSubmitting"
            @update:model-value="handleChange"
            @blur="handleBlur"
          />
        </BaseField>
      </Field>

      <BaseButton
        type="submit"
        color="primary"
        rounded="lg"
        class="w-full"
        :loading="isSubmitting"
        :disabled="isSubmitting"
      >
        Send reset link
      </BaseButton>

      <BaseParagraph size="sm" class="text-muted-500 text-center">
        Remember your password?
        <NuxtLink to="/auth/login" class="text-primary-500 font-medium hover:underline">
          Sign in
        </NuxtLink>
      </BaseParagraph>
    </form>
  </AuthCard>
</template>
