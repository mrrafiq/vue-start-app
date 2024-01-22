import { defineStore } from 'pinia'
import { apiHost } from '@/apis/config'
import * as api from '@/apis/auth'

type User = {
  data: object,
  message: string,
  error: string,
}

type Credentials = {
  email: string,
  password: string
}
export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)

  const isLoggedIn = computed(() => !!user.value)

  async function fetchUser() {
    const { data } = await useApiFetch(api.me)
    
    user.value = data.value as User
  }

  async function login(datas: Credentials) {
    await useFetch(apiHost + "/sanctum/csrf-cookie", {
      credentials: 'include',
    })

    const login = await useApiFetch(api.login, {
      method: 'POST',
      body: datas
    })

    await fetchUser()

    return login
  }

  async function logout(){
    await useApiFetch('/logout',{
      method: 'POST'
    })

    user.value = null
  }

  return {
    user,
    login,
    isLoggedIn,
    fetchUser,
    logout
  }
})