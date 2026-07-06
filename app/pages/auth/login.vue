<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import { Field, useForm } from 'vee-validate'
import { z } from 'zod'

definePageMeta({
  layout: 'empty',
})

useHead({ title: 'Sign in' })

// Validation messages kept together for easy editing/translation.
const VALIDATION_TEXT = {
  EMAIL_REQUIRED: 'Enter a valid email address',
  PASSWORD_REQUIRED: 'Your password can\'t be empty',
}

const zodSchema = z.object({
  email: z.string().email(VALIDATION_TEXT.EMAIL_REQUIRED),
  password: z.string().min(1, VALIDATION_TEXT.PASSWORD_REQUIRED),
  rememberMe: z.boolean().optional(),
})

type FormInput = z.infer<typeof zodSchema>

const validationSchema = toTypedSchema(zodSchema)
const initialValues: FormInput = {
  email: '',
  password: '',
  rememberMe: false,
}

const { handleSubmit, isSubmitting } = useForm({
  validationSchema,
  initialValues,
})

const toaster = useNuiToasts()

const onSubmit = handleSubmit(async (_values) => {
  // TODO: replace with real authentication (nuxt-auth-utils).
  await new Promise(resolve => setTimeout(resolve, 1200))

  toaster.add({
    title: 'Welcome back!',
    icon: 'ph:check',
    progress: true,
  })

  await navigateTo('/')
})
</script>

<template>
  <AuthCard
    eyebrow="Welcome back"
    title="Sign in to your account"
    subtitle="Enter your credentials to access your account."
  >
    <form novalidate class="flex flex-col gap-4" @submit.prevent="onSubmit">
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
            placeholder="••••••••"
            autocomplete="current-password"
            rounded="lg"
            :model-value="field.value"
            :error="errorMessage"
            :disabled="isSubmitting"
            @update:model-value="handleChange"
            @blur="handleBlur"
          />
        </BaseField>
      </Field>

      <div class="flex items-center justify-between">
        <Field v-slot="{ field, handleChange }" name="rememberMe">
          <BaseCheckbox
            :model-value="field.value"
            label="Remember me"
            :disabled="isSubmitting"
            @update:model-value="handleChange"
          />
        </Field>
        <NuxtLink
          to="/auth/forgot-password"
          class="text-primary-500 text-sm font-medium hover:underline"
        >
          Forgot password?
        </NuxtLink>
      </div>

      <BaseButton
        type="submit"
        color="primary"
        rounded="lg"
        class="w-full"
        :loading="isSubmitting"
        :disabled="isSubmitting"
      >
        Sign in
      </BaseButton>

      <BaseParagraph size="sm" class="text-muted-500 text-center">
        Don't have an account?
        <NuxtLink to="/auth/register" class="text-primary-500 font-medium hover:underline">
          Create one
        </NuxtLink>
      </BaseParagraph>
    </form>
  </AuthCard>
</template>
