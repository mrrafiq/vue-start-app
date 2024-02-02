import * as api from '@/apis/users'

type Users = {}

type User = {}

type Credentials = {
  email: string,
  password: string,
  name: string
}
export const useUsersStore = defineStore('users', {
  state: () => ({
    users: {},
    user: {}
  }),
  getters: {
    getUsers: (state) => state.users,
  },
  actions: {
    async fetchUsers() {
      const { data, status, error } = await useApiFetch(api.index)
      if (status.value == "success") {
        this.users = data.value as Users
      } else {
        console.log(error.value)
      }
    },

    async addUser( credentials: Credentials){
      const { data, status, error } = await useApiFetch(api.store,{
        method: 'POST',
        body: credentials
      })
      if (status.value == "success") {
        this.users = data.value as Users
      } else {
        console.log(error.value)
      }
    },

    async readUser(id: number){
      const { data, status, error } = await useApiFetch(api.show+id)
      if (status.value == "success") {
        this.user = data.value as User
      } else {
        console.log(error.value)
      }
    }
  },
})