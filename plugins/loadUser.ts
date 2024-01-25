export default defineNuxtPlugin(async (nuxtApp) => {
  const auth = useAuthStore()
  if (useCookie('token').value != null ) {
    await auth.me()
  }
})