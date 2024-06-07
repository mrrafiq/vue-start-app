// import { useAuth } from '@/stores/auth'
import { link } from '@/data/public-routes'

export default defineNuxtRouteMiddleware((to, from) => {

  if (!link.includes(to.fullPath)) {

    if(useCookie('token').value == null){
      return navigateTo('/auth/login')
    }

    // if isLoggedIn == false
    const user = useAuthStore()
    if (!user.isLoggedIn) {
      // remove token key from cookies
      const token = useCookie('token')
      token.value = null
      // navigate to login page
      return navigateTo('/auth/login')
    }
    
    navigateTo(to.fullPath)
  }
  navigateTo(to.fullPath)
})

// check if user has permission to access the route
function isPermitted(permission: string){
  const permissions = userAuthPermissions()
  return permissions.userPermissions.includes(permission)
}
