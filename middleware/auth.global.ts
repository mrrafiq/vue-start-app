// import { useAuth } from '@/stores/auth'
import { link } from '@/data/public-routes'
export default defineNuxtRouteMiddleware((to, from) => {

  if (!link.includes(to.fullPath)) {

    if(useCookie('token') == null){
      return navigateTo('/auth/login')
    }
    navigateTo(to.fullPath)
  }
  navigateTo(to.fullPath)
})
