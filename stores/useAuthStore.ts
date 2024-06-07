import { defineStore } from 'pinia'
import * as api from '@/apis/auth'

type User = {
  data: {
    user: {
      id: number,
      name: string,
      email: string,
      loginAs: string,
      error: any
    }
    token: string,

  },
  isLoggedIn: boolean,
}

type Credentials = {
  email: string,
  password: string
}
export const useAuthStore = defineStore('auth', {

  state: (): User => ({
    data: {
      user: {
        id: 0,
        name: '',
        email: '',
        loginAs: '',
        error: null,
      },
      token: "",
    },
    isLoggedIn: false,
  }),
  getters: {
    getUser: (state) => state.data.user,
  },

  actions: {
    async login(credentials: Credentials) {
      const { data, status, error } = await useApiFetch(api.login, {
        method: 'POST',
        body: credentials
      })

      if (status.value == 'success') {
        const getData = data.value as User
        const token = useCookie('token')
        token.value = getData.data.token
        this.isLoggedIn = true
        this.data.user = getData.data.user
      } else {
        this.data.user.error = error.value?.data
      }
    },

    async me() {
      const { data } = await useApiFetch(api.me)
      if (data.value == null) return this.isLoggedIn = false
      const tempData = data.value as User
      this.data.user = tempData.data.user
      this.isLoggedIn = true
    },
    async logout() {
      const { status, error } = await useApiFetch(api.logout, {
        method: "POST"
      })
      if (status.value == "success") {
        this.data.user = {
          id: 0,
          name: '',
          email: '',
          loginAs: '',
          error: null,
        }
        this.isLoggedIn = false
        const token = useCookie('token')
        token.value = null
        const permissions = userAuthPermissions()
        await permissions.clearPermissions()
        const menu = useUserMenu()
        await menu.resetMenu()
      } else {
        console.log(error.value)
      }
    },
  }
})