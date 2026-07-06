<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import { Field, useForm } from 'vee-validate'
import { z } from 'zod'

definePageMeta({
  layout: 'empty',
})

useHead({ title: 'Create account' })

const VALIDATION_TEXT = {
  NAME_REQUIRED: 'Your name can\'t be empty',
  EMAIL_REQUIRED: 'Enter a valid email address',
  PASSWORD_LENGTH: 'Password must be at least 8 characters',
  PASSWORD_MATCH: 'Passwords do not match',
  TERMS_REQUIRED: 'You must accept the terms to continue',
}

// `refine` lets us validate that both passwords match.
const zodSchema = z
  .object({
    name: z.string().min(1, VALIDATION_TEXT.NAME_REQUIRED),
    email: z.string().email(VALIDATION_TEXT.EMAIL_REQUIRED),
    password: z.string().min(8, VALIDATION_TEXT.PASSWORD_LENGTH),
    confirmPassword: z.string(),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: VALIDATION_TEXT.TERMS_REQUIRED }),
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: VALIDATION_TEXT.PASSWORD_MATCH,
    path: ['confirmPassword'],
  })

type FormInput = z.infer<typeof zodSchema>

const validationSchema = toTypedSchema(zodSchema)
const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
} as unknown as FormInput

const { handleSubmit, isSubmitting } = useForm({
  validationSchema,
  initialValues,
})

const toaster = useNuiToasts()

const onSubmit = handleSubmit(async (_values) => {
  // TODO: replace with real registration API call.
  await new Promise(resolve => setTimeout(resolve, 1200))

  toaster.add({
    title: 'Account created successfully!',
    icon: 'ph:check',
    progress: true,
  })

  await navigateTo('/auth/login')
})
</script>

<template>
  <AuthCard
    eyebrow="Get started"
    title="Create your account"
    subtitle="Join us and enjoy members-only benefits."
  >
    <form novalidate class="flex flex-col gap-4" @submit.prevent="onSubmit">
      <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="name">
        <BaseField
          v-slot="{ inputAttrs, inputRef }"
          label="Full name"
          :state="errorMessage ? 'error' : 'idle'"
          :error="errorMessage"
          :disabled="isSubmitting"
          required
        >
          <BaseInput
            :ref="inputRef"
            v-bind="inputAttrs"
            type="text"
            placeholder="John Doe"
            autocomplete="name"
            rounded="lg"
            :model-value="field.value"
            :error="errorMessage"
            :disabled="isSubmitting"
            @update:model-value="handleChange"
            @blur="handleBlur"
          />
        </BaseField>
      </Field>

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

      <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="password">
        <BaseField
          v-slot="{ inputAttrs, inputRef }"
          label="Password"
          :state="errorMessage ? 'error' : 'idle'"
          :error="errorMessage"
          :disabled="isSubmitting"
          required
        >
          <BaseInput
            :ref="inputRef"
            v-bind="inputAttrs"
            type="password"
            placeholder="At least 8 characters"
            autocomplete="new-password"
            rounded="lg"
            :model-value="field.value"
            :error="errorMessage"
            :disabled="isSubmitting"
            @update:model-value="handleChange"
            @blur="handleBlur"
          />
        </BaseField>
      </Field>

      <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="confirmPassword">
        <BaseField
          v-slot="{ inputAttrs, inputRef }"
          label="Confirm password"
          :state="errorMessage ? 'error' : 'idle'"
          :error="errorMessage"
          :disabled="isSubmitting"
          required
        >
          <BaseInput
            :ref="inputRef"
            v-bind="inputAttrs"
            type="password"
            placeholder="Re-enter your password"
            autocomplete="new-password"
            rounded="lg"
            :model-value="field.value"
            :error="errorMessage"
            :disabled="isSubmitting"
            @update:model-value="handleChange"
            @blur="handleBlur"
          />
        </BaseField>
      </Field>

      <Field v-slot="{ field, errorMessage, handleChange }" name="acceptTerms">
        <BaseCheckbox
          :model-value="field.value"
          :error="errorMessage"
          :disabled="isSubmitting"
          @update:model-value="handleChange"
        >
          I agree to the
          <NuxtLink to="/" class="text-primary-500 hover:underline">terms</NuxtLink>
          and
          <NuxtLink to="/" class="text-primary-500 hover:underline">privacy policy</NuxtLink>
        </BaseCheckbox>
      </Field>

      <BaseButton
        type="submit"
        color="primary"
        rounded="lg"
        class="w-full"
        :loading="isSubmitting"
        :disabled="isSubmitting"
      >
        Create account
      </BaseButton>

      <BaseParagraph size="sm" class="text-muted-500 text-center">
        Already have an account?
        <NuxtLink to="/auth/login" class="text-primary-500 font-medium hover:underline">
          Sign in
        </NuxtLink>
      </BaseParagraph>
    </form>
  </AuthCard>
</template>
