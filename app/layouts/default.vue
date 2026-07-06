<template>
  <TairoTopnavLayout>
    <TairoTopnavNavbar>
      <TairoTopnavHeader>
        <TairoMenu>
          <TairoMenuList class="flex-col lg:flex-row">
            <TairoMenuItem>
              <TairoMenuLink as-child>
                <NuxtLink to="/" class="nav-link"> Prebuilt pages </NuxtLink>
              </TairoMenuLink>
            </TairoMenuItem>

            <TairoMenuItem>
              <TairoMenuLink as-child>
                <NuxtLink to="/" class="nav-link"> Documentation </NuxtLink>
              </TairoMenuLink>
            </TairoMenuItem>

            <TairoMenuItem>
              <TairoMenuTrigger>
                <span>Featured</span>
                <Icon
                  name="lucide:chevron-down"
                  class="transition-transform duration-200 ease-in group-data-[state=open]:-rotate-180"
                />
              </TairoMenuTrigger>
              <TairoMenuContent>
                <div class="m-0 grid gap-x-[10px] p-[22px] sm:w-[600px]">
                  <div class="grid sm:grid-cols-5 gap-4">
                    <div class="hidden sm:block sm:col-span-2">
                      <div
                        class="flex flex-col justify-end h-full w-full bg-primary-950 rounded-xl p-4"
                      >
                        <div>
                          <TairoLogo class="size-10 text-white mb-3" />
                          <BaseHeading class="text-white mb-2">
                            Amazing UI
                          </BaseHeading>
                          <BaseParagraph
                            size="xs"
                            class="max-w-[260px] text-white"
                          >
                            Build high-quality, accessible design systems and
                            web apps.
                          </BaseParagraph>
                        </div>
                      </div>
                    </div>
                    <div
                      class="sm:col-span-3 flex flex-col justify-between gap-4"
                    >
                      <TairoMenuLink as-child>
                        <NuxtLink to="/auth/login">
                          <BaseHeading
                            size="sm"
                            weight="medium"
                            class="text-muted-900 dark:text-white"
                          >
                            Login Page
                          </BaseHeading>
                          <BaseParagraph
                            size="sm"
                            class="max-w-[260px] text-muted-600 dark:text-muted-400"
                          >
                            Welcome to our website login and take a tour.
                          </BaseParagraph>
                        </NuxtLink>
                      </TairoMenuLink>

                      <TairoMenuLink as-child>
                        <NuxtLink to="/auth/login">
                          <BaseHeading
                            size="sm"
                            weight="medium"
                            class="text-muted-900 dark:text-white"
                          >
                            Login
                          </BaseHeading>
                          <BaseParagraph
                            size="sm"
                            class="max-w-[260px] text-muted-600 dark:text-muted-400"
                          >
                            Build high-quality, accessible design systems and
                            web apps.
                          </BaseParagraph>
                        </NuxtLink>
                      </TairoMenuLink>

                      <TairoMenuLink as-child>
                        <NuxtLink to="#">
                          <BaseHeading
                            size="sm"
                            weight="medium"
                            class="text-muted-900 dark:text-white"
                          >
                            Amazing UI
                          </BaseHeading>
                          <BaseParagraph
                            size="sm"
                            class="max-w-[260px] text-muted-600 dark:text-muted-400"
                          >
                            Build high-quality, accessible design systems and
                            web apps.
                          </BaseParagraph>
                        </NuxtLink>
                      </TairoMenuLink>
                    </div>
                  </div>
                </div>
              </TairoMenuContent>
            </TairoMenuItem>
          </TairoMenuList>

          <div class="absolute top-full start-0 flex w-full mt-[10px] z-50">
            <TairoMenuViewport />
          </div>
        </TairoMenu>
      </TairoTopnavHeader>
    </TairoTopnavNavbar>

    <TairoTopnavContent>
      <slot />
    </TairoTopnavContent>
  </TairoTopnavLayout>
</template>

<style scoped>
.nav-link.router-link-active,
.nav-link.router-link-exact-active {
  color: rgb(var(--color-primary-200));
  background: rgb(var(--color-primary-200));
}
</style>
