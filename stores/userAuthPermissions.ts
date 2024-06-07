import { defineStore } from 'pinia'
import * as api from '@/apis/auth'

type Permissions = {
	data: string[]
}
export const userAuthPermissions = defineStore('permissions', {
	state: () => ({
		permissions: [] as string[]
	}),
	getters: {
		userPermissions: (state) => state.permissions
	},
	actions: {
		async getPermissions() {
      const { data } = await useApiFetch(api.show_permissions)
      if (data.value == null) return null
			const tempData = data.value as Permissions
			this.permissions = tempData.data
    },
		async clearPermissions(){
			this.permissions = []
		}
	}
})

