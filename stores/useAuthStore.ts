import { defineStore } from 'pinia'
import * as api from '@/apis/auth'

type User = {
  data: {
    token: string,
    user:{
      id: number,
      name: string,
      email: string,
      loginAs: string,
    }
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
      token: '',
      user: {
        id: 0,
        name: '',
        email: '',
        loginAs: '',
      }
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
      const {data, status, error} = await useApiFetch(api.me)
      const tempData = data.value as User
      if (status.value == "success") {
        this.data.user = tempData.data.user
        this.isLoggedIn = true
      }else {
        console.log(error.value)
      }
    },
    async logout() {
      const {status, error} = await useApiFetch(api.logout,{
        method: "POST"
      })
      if (status.value == "success") {
        this.data.token = ''
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