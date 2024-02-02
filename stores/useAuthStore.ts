import { defineStore } from 'pinia'
import * as api from '@/apis/auth'

type User = {
  data: {
    user:{
      id: number,
      name: string,
      email: string,
      loginAs: string,
    }
    token: string,
  },
  isLoggedIn: boolean,
}

type Credentials = {
  email: string,
  password: string
}
export const useAuthStore = defineStore('auth',{
  
  state: (): User => ({
    data: {
      user: {
        id: 0,
        name: '',
        email: '',
        loginAs: '',
      },
      token: ""
    },
    isLoggedIn: false,
  }),
  getters: {
    getUser: (state) => state.data.user,
  },
  
  actions: {
    async login(credentials: Credentials) {
      const {data} = await useApiFetch(api.login,{
        method: 'POST',
        body: credentials
      })

      const getData = data.value as User
      const token = useCookie('token')
      token.value = getData.data.token
      this.isLoggedIn = true
      this.data.user = getData.data.user
    },

    async me(){
      const {data} = await useApiFetch(api.me)
      const tempData = data.value as User
      this.data.user = tempData.data.user
      this.isLoggedIn = true
    },
    async logout() {
      const {status, error} = await useApiFetch(api.logout,{
        method: "POST"
      })
      if (status.value == "success") {
        this.data.user = {
          id: 0,
          name: '',
          email: '',
          loginAs: '',
        }
        this.isLoggedIn = false
        const token = useCookie('token')
        token.value = null
      } else {
        console.log(error.value)
      }
    },
  }
})