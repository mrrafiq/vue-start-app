export default defineNuxtPlugin(async (nuxtApp) => {
  const auth = useAuthStore()
  if (!auth.isLoggedIn && nuxtApp._route.fullPath != "/auth/login") {
    await auth.fetchUser()
  }
})