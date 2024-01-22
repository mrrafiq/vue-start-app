// import { useAuth } from '@/stores/auth'
import { link } from '@/data/public-routes'
export default defineNuxtRouteMiddleware((to, from) => {

  if (!link.includes(to.fullPath)) {

    const authData = useAuthStore()
    if (!authData.isLoggedIn) {
      console.log(authData.isLoggedIn);
      return navigateTo('/auth/login')
    }
    navigateTo(to.fullPath)
  }
  navigateTo(to.fullPath)
})
