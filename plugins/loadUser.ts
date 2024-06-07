export default defineNuxtPlugin(async (nuxtApp) => {
  const auth = useAuthStore()
  const permissions = userAuthPermissions()
  const menu = useUserMenu()
  if (useCookie('token').value != null ) {
    await auth.me()
    await permissions.getPermissions()
    await menu.getUserMenu()
  }
})

