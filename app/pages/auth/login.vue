<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Field, useForm } from 'vee-validate'
import { z } from 'zod'
import BaseThemeToggleCustom from '~/components/BaseThemeToggleCustom.vue'

const router = useRouter()
const { openInPopup } = useUserSession()
definePageMeta({
  layout: 'empty',
  title: 'Login page',
  preview: {
    title: 'Login to our site take a tour.',
    description: 'For authentication and sign in',
    categories: ['layouts', 'authentication'],
    src: '/img/screens/auth-login.png',
    srcDark: '/img/screens/auth-login-dark.png',
    order: 151,
  },
})

const VALIDATION_TEXT = {
  EMAIL_REQUIRED: 'A valid email is required',
  PASSWORD_REQUIRED: 'A password is required',
}

// This is the Zod schema for the form input
// It's used to define the shape that the form data will have
const zodSchema = z.object({
  email: z.string().email(VALIDATION_TEXT.EMAIL_REQUIRED),
  password: z.string().min(1, VALIDATION_TEXT.PASSWORD_REQUIRED),
  trustDevice: z.boolean(),
})

// Zod has a great infer method that will
// infer the shape of the schema into a TypeScript type
type FormInput = z.infer<typeof zodSchema>

const validationSchema = toTypedSchema(zodSchema)
const initialValues = {
  email: '',
  password: '',
  trustDevice: false,
} satisfies FormInput

const {
  handleSubmit,
  isSubmitting,
  setFieldError,
} = useForm({
  validationSchema,
  initialValues,
})

// This is where you would send the form data to the server
const handleLogin = handleSubmit(async (values) => {
  // here you have access to the validated form values
  // console.log('auth-success', values)
  try {
    // fake delay, this will make isSubmitting value to be true
    await new Promise((resolve, reject) => {
      if (values.password !== 'password') {
        // simulate a backend error
        setTimeout(
          () => reject(new Error('Fake backend validation error')),
          2000,
        )
      }
      setTimeout(resolve, 4000)
    })
  }
  catch (error: any) {
    // this will set the error on the form
    if (error.message === 'Fake backend validation error') {
      setFieldError('password', 'Invalid credentials (use "password")')
    }
    return
  }

  router.push('/dashboards')
})
</script>

<template>
  <div class="dark:bg-muted-800 flex min-h-screen bg-white">
    <div class="relative flex flex-1 flex-col justify-center px-6 py-10 lg:w-2/5 lg:flex-none">
      <div class="dark:bg-muted-800 relative mx-auto w-full max-w-sm bg-white">
        <!-- Navigation Back -->
        <div class="flex w-full items-center justify-between">
          <NuxtLink
            class="text-muted-400 hover:text-primary-500 flex items-center gap-2 font-sans font-medium transition-colors duration-300"
            to="/"
          >
            <Icon name="gg:arrow-long-left" class="size-5" />
            <span>Back to Home</span>
          </NuxtLink>

          <!-- Theme button light/dark mode -->
          <BaseThemeToggleCustom/>
        </div>
        <!-- End Navigation Back -->
        <div>
          <!-- Form Title -->
          <BaseHeading
            as="h2"
            size="3xl"
            lead="relaxed"
            weight="medium"
            class="mt-6"
          >
            Login Form.
          </BaseHeading>

          <!-- Social Sign Up Buttons & Passkey -->
          <BaseParagraph size="sm" class="text-muted-400 mb-6">
            Login with credentials or your social media
          </BaseParagraph>
          <div class="flex w-full items-center gap-2">
            <!-- 1. MAIN BUTTON Fingerprint : Has 'flex-4' to take up remaining space -->
            <BaseTooltip content="use your fingerprint to login.">
              <nuxt-link
                external
                openInPopup
                type="button" 
                to="/api/auth/login/passkey"
                class=" bg-muted-200 dark:bg-muted-700 text-muted-100 hover:bg-muted-100 dark:hover:bg-muted-600 border-muted-300 dark:text-muted-400 dark:border-muted-600 focus-visible:nui-focus relative inline-flex flex-4 items-center justify-center gap-2 rounded-md border  p-4 cursor-pointer transition-colors duration-300"
              >
                <Icon name="heroicons:finger-print-solid" class="scale-150 text-primary-600 text-muted-100 dark:text-muted-400"/>
              </nuxt-link>
            </BaseTooltip>
            <!-- Google -->
            <BaseTooltip content="use this button to login using your Google account.">
              <nuxt-link
                external
                openInPopup
                type="button"
                to="/api/auth/login/google"
                class="bg-muted-200 dark:bg-muted-700 hover:bg-muted-100 dark:hover:bg-muted-600 text-muted-600 dark:text-muted-400 focus-visible:nui-focus inline-flex flex-1 cursor-pointer items-center justify-center rounded-md p-4 transition-colors duration-300"
              >
                <Icon name="logos:google-icon"/>
              </nuxt-link>
            </BaseTooltip>
            <!-- Facebook button -->
            <BaseTooltip content="use this button to login using your Facebook account.">
              <nuxt-link
                external
                openInPopup
                type="button"
                to="/api/auth/login/facebook"
                class="bg-muted-200 dark:bg-muted-700 hover:bg-muted-100 dark:hover:bg-muted-600 text-muted-600 dark:text-muted-400 focus-visible:nui-focus inline-flex flex-1 cursor-pointer items-center justify-center rounded-md p-4 transition-colors duration-300"
              >
                <Icon name="logos:facebook" />
              </nuxt-link>
            </BaseTooltip>
            <!-- Microsoft button -->
            <BaseTooltip content="use this button to login using your Microsoft account.">
              <nuxt-link
                external
                openInPopup
                type="button"
                to="/api/auth/login/microsoft"
                class="bg-muted-200 dark:bg-muted-700 hover:bg-muted-100 dark:hover:bg-muted-600 text-muted-600 dark:text-muted-400 focus-visible:nui-focus inline-flex flex-1 cursor-pointer items-center justify-center rounded-md p-4 transition-colors duration-300"
              >
                <Icon name="logos:microsoft-windows-icon" />
              </nuxt-link>
            </BaseTooltip>
          </div>

          <!-- 'or' divider -->
          <div class="flex-100 mt-8 flex items-center">
            <hr
              class="border-muted-200 dark:border-muted-700 flex-auto border-t-2"
            >
            <span
              class="text-muted-600 dark:text-muted-300 px-4 font-sans font-light"
            >
              OR
            </span>
            <hr
              class="border-muted-200 dark:border-muted-700 flex-auto border-t-2"
            >
          </div>
        </div>

        <!-- Login form section -->
        <form method="POST" action="" class="mt-6" novalidate
          @submit.prevent="handleLogin" >
          <div class="mt-5">
            <div>
              <div class="space-y-4">
                <Field
                  v-slot="{ field, errorMessage, handleChange, handleBlur }"
                  name="email"
                >
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
                      :model-value="field.value"
                      autocomplete="email"
                      @update:model-value="handleChange"
                      @blur="handleBlur"
                    />
                  </BaseField>
                </Field>

                <Field
                  v-slot="{ field, errorMessage, handleChange, handleBlur }"
                  name="password"
                >
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
                      :model-value="field.value"
                      type="password"
                      autocomplete="current-password"
                      @update:model-value="handleChange"
                      @blur="handleBlur"
                    />
                  </BaseField>
                </Field>
              </div>

              <div class="mt-6 text-end">
                  <NuxtLink
                    class="text-primary-600 hover:text-primary-500 text-md font-mono underline-offset-4 transition duration-150 ease-in-out hover:underline"
                    to="/auth/recover"
                  >
                    Forgot your password ?
                  </NuxtLink>
              </div>

              <!-- Submit -->
              <div class="mt-6">
                <div class="block w-full rounded-md shadow-xs">
                  <BaseButton
                    :disabled="isSubmitting"
                    :loading="isSubmitting"
                    color="primary"
                    type="submit"
                    variant="primary"
                    class="h-11! w-full"
                  >
                     <!-- 1. Loading Spinner (Shown when loading) -->
                    <Icon 
                      v-if="isSubmitting" 
                      name="svg-spinners:ring-resize" 
                      class="scale-150 animate-spin mx-2" 
                    />

                    <!-- 2. Normal Icon (Hidden when loading) -->
                    <Icon 
                      v-else 
                      name="heroicons:arrow-right-20-solid" 
                      class="scale-150 mx-2" 
                    />
                    Sign in
                  </BaseButton>
                </div>
              </div>
            </div>

            <!-- No account link -->
            <p class="text-muted-400 mt-4 flex justify-between font-mono text-md leading-5" >
              <span>Don't have an account?</span>
              <NuxtLink
                class="text-primary-600 hover:text-primary-500 font-medium underline-offset-4 transition duration-150 ease-in-out hover:underline"
                to="/auth/register"
              >
                Register here
              </NuxtLink>
            </p>
          </div>
        </form>
      </div>
    </div>
    <div
      class="bg-muted-100 dark:bg-muted-900 relative hidden w-0 flex-1 items-center justify-center lg:flex lg:w-3/5"
    >
      <div class="mx-auto w-full max-w-4xl">
        <!-- Media image -->
        <img
          class="mx-auto max-w-md"
          src="/img/illustrations/magician.svg"
          alt=""
          width="500"
          height="500"
        >
      </div>
    </div>
  </div>
</template>

<style>
</style>