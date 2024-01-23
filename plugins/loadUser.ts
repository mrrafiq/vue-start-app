export default defineNuxtPlugin(async (nuxtApp) => {
  const auth = useAuthStore()
  if (useCookie('token') ) {
    await auth.me()
  }
})