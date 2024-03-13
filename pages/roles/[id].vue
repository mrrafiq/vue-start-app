<template>
  <div>
    <h1>{{ roleData.data.name }}</h1>
    <v-card>
      <v-card-title>Info</v-card-title>
      <v-container>
        <v-row>
          <v-col>
            <v-list disabled :items="detailsKey">
            </v-list>
          </v-col>
          <v-col>
            <v-list disabled :items="detailsValue">
            </v-list>
          </v-col>
        </v-row>

      </v-container>
    </v-card>
  </div>
  <v-card class="pa-4 my-4">
    <v-card-title>Permissions</v-card-title>
    <v-container>
      <v-row justify="end">
        <v-col cols="4">
          <v-btn color="primary" align-self="end" class="float-right">
            Manage
            <v-dialog min-width="480" max-width="1024" v-model="dialog" activator="parent">
              <v-card class="pa-3">
                <v-card-title>Manage Permission</v-card-title>
                <v-form class="pa-3" @submit.prevent="">
                  <v-card-actions class="float-right">
                    <v-btn color="error" @click="dialog = !dialog">Cancel</v-btn>
                    <v-btn color="primary" variant="elevated" type="submit" :loading="btnLoading">Submit</v-btn>
                  </v-card-actions>
                </v-form>
              </v-card>
            </v-dialog>
          </v-btn>
        </v-col>
      </v-row>
      <div class="text-start w-25">
        <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" density="compact" label="Search" flat single-line
          hide-details variant="outlined"></v-text-field>
      </div>
      <v-data-table :items-per-page="10" :headers="headers" :items="listOfPermissions.data" class="m-4 p-4"
        :loading="loading" v-model="selected" show-select>

      </v-data-table>
    </v-container>

  </v-card>
</template>
<script setup lang="ts">
import * as api from '@/apis/roles'
import * as permissions_api from '@/apis/permissions'

const route = useRoute()
const id = route.params.id
const search = ref('')
const loading = ref(false)
const dialog = ref(false)
const btnLoading = ref(false)

type Role = {
  data: {
    id: number,
    name: string,
    guardName: string,
    createdAt: string,
    updatedAt: string
  }
}

type Permission = {
  id: number,
  name: string,
  guardName: string,
  createdAt: string,
  updatedAt: string,
}

type Permissions = {
  draw: string,
  recordsTotal: number,
  recordsFiltered: number,
  data: Permission[]
}

type ListPermissions = {
  data: Permission[]

}

var roleData: Role = {
  data: {
    id: 0,
    name: '',
    guardName: '',
    createdAt: '',
    updatedAt: ''
  }
}

var permissionsData: Permissions = {
  draw: "",
  recordsTotal: 0,
  recordsFiltered: 0,
  data: [],
}

var listOfPermissions: ListPermissions = {
  data: []

}


const headers = [
  { title: "id", key: 'id' },
  { title: "Name", key: 'name' },
  { title: "Guard Name", key: 'guardName' },
  { title: "Created At", key: 'createdAt' },
  { title: "Updated At", key: 'updatedAt' },
]

await getListOfPermissions()
await readData()
await getPermissionsData()

const detailsKey = Object.keys(roleData.data)
const detailsValue = Object.values(roleData.data)
const selected = permissionsData.data
console.log(selected)

async function readData() {
  const { data, status, error } = await useApiFetch(api.show + id)
  if (status.value == "success") {
    roleData = data.value as Role
  } else {
    console.log(error.value)
  }
}

async function getPermissionsData() {
  const { data, status, error } = await useApiFetch(api.show_permissions + id)
  if (status.value == "success") {
    permissionsData = data.value as Permissions
  } else {
    console.log(error.value)
  }
}

async function getListOfPermissions() {
  const { data, status, error } = await useApiFetch(permissions_api.index)
  if (status.value == "success") {
    listOfPermissions = data.value as ListPermissions
  } else {
    console.log(error.value)
  }
}
</script>