export default defineNuxtPlugin((nuxtApp) => {
  /**
   * Register a global v-focus directive.
   * Only register if not already defined to avoid Vue warnings.
   **/
  if (!nuxtApp.vueApp.directive('focus')) {
    nuxtApp.vueApp.directive<HTMLElement, boolean | undefined>('focus', {
      mounted(el, { value }) {
        if (value === false) { return; }

        // If the element is not focusable, find the first focusable child
        if (el && el.tabIndex === -1) {
          const focusable = el.querySelector<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          )
          if (focusable) { 
            focusable.focus();
          }
          return; 
        }
        el.focus()
      },
    })
  }
})
