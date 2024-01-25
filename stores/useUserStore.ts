import * as api from '@/apis/users'

type Users = {}
export const useUsersStore = defineStore('users', {
  state: () => ({
    users: {},
  }),
  getters: {
    getUsers: (state) => state.users,
  },
  actions: {
    async fetchUsers() {
      const { data, status, error } = await useApiFetch(api.index)
      if (status.value == "success") {
        this.users = data.value as Users
        console.log(this.users)
      } else {
        console.log(error.value)
      }
    },
  },
})