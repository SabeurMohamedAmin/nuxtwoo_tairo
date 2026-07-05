<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    /**
     * The form input identifier.
     */
    id?: string
    /**
     * Sets the toggle element to inverted colors mode.
     */
    inverted?: boolean
    /**
     * Disables transitions when toggling between light and dark mode.
     *
     * @default false
     */
    disableTransitions?: boolean
  }>(),
  {
    id: undefined,
    inverted: false,
    disableTransitions: undefined,
  },
)

const id = useNinjaId(() => props.id)
const disableTransitions = useNuiDefaultProperty(
  props,
  'BaseThemeToggle',
  'disableTransitions',
)

const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(value:any) {
    // disable transitions
    if (import.meta.browser && disableTransitions.value) {
      document.documentElement.classList.add('nui-no-transition')
    }

    colorMode.preference = value ? 'dark' : 'light'

    // re-enable transitions
    if (import.meta.browser && disableTransitions.value) {
      setTimeout(() => {
        document.documentElement.classList.remove('nui-no-transition')
      }, 0)
    }
  },
})
</script>

<template>
  <client-only>
    <label
      class="nui-theme-toggle"
      :class="props.inverted && 'nui-theme-toggle-inverted'"
      :for="id"
    >
      <input
        :id="id"
        v-show="false"
        v-model="isDark"
        type="checkbox"
        class="nui-theme-toggle-input"
      >
      <span class="relative block rounded-full size-9 data-[state=checked]:[&>.sun]:translate-y-[-150%] data-[state=checked]:[&>.sun]:opacity-0 data-[state=checked]:[&>.moon]:-translate-y-1/2 opacity-100 data-[state=checked]:[&>.moon]:-translate-y-1/2 data-[state=checked]:[&>.moon]:opacity-100 data-[state=unchecked]:[&>.moon]:translate-y-[-150%] data-[state=unchecked]:[&>.moon]:opacity-0 bg-white dark:bg-muted-950 border border-muted-300 dark:border-muted-800">
        <Icon v-if="isDark" name="ph:sun-duotone" class="nui-sun iconify i-nui-icon:sun sun pointer-events-none absolute start-1/2 top-1/2 block -translate-y-1/2 translate-x-[-50%] rtl:translate-x-[50%] h-5 w-5 dark:text-yellow-400 transition-all duration-300" />
        <Icon v-else name="ph:moon-duotone" class="nui-moon iconify i-nui-icon:sun sun pointer-events-none absolute start-1/2 top-1/2 block -translate-y-1/2 translate-x-[-50%] rtl:translate-x-[50%] h-5 w-5  dark:text-yellow-400 transition-all duration-300" />
      </span>
    </label>
  </client-only>
</template>

<style>
.nui-no-transition * {
  transition-property: none !important;
  transition-duration: 0 !important;
}
</style>