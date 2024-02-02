<template>
  <div>
    <v-card>
      <v-card-title>User Data</v-card-title>
      <v-container>
        <v-row justify="end">
          <v-col>
            <v-btn @click="fetchData" density="comfortable"
              prepend-icon="mdi-reload">refresh</v-btn>
          </v-col>
          <v-col cols="4">
            <v-btn color="primary" align-self="end" class="float-right" @click="dialog = true">
              Add Data+
              <ModalsUserForm id="add" :form="form" :is-active="dialog" />
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <DatatablesUserData :items="items.data" :loading="loading" />
          </v-col>
        </v-row>
      </v-container>
    </v-card>

  </div>
</template>

<script setup lang="ts">
const dialog = ref(false)
const loading = ref(false)
const form = ref({})
const userData = useUsersStore()
const items = ref();

await fetchData()

async function fetchData() {
  loading.value = true
  await userData.fetchUsers()
  items.value = userData.getUsers as object
  loading.value = false
}

</script>