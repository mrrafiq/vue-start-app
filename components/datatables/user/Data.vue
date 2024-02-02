
import type { DatatablesUserData } from '#build/components';
<template>
  <v-data-table :items-per-page="10" :headers="headers" :items="items.data" class="m-4 p-4" :loading="loading">
    <template v-slot:item.actions="{ item }">
      <v-btn icon="mdi-checkbox-multiple-blank" density="compact"></v-btn>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
const userData = useUsersStore()


const items = ref();
const loading = ref(false)
const headers = [
  { title: "Id", key: 'id' },
  { title: "Name", key: 'name' },
  { title: "Email", key: 'email' },
  { title: "Email Verified At", key: 'email_verified_at' },
  { title: "Login As", key: 'login_as' },
  { title: "Created At", key: 'created_at' },
  { title: "Updated At", key: 'updated_at' },
  { title: 'Actions', key: 'actions' },
]

const readItems = ref()

await fetchData()

async function fetchData() {
  loading.value = true
  await userData.fetchUsers()
  items.value = userData.getUsers as object
  loading.value = false
  console.log(items.value)
}

async function readData(item: number){
  
}

</script>