<template>
  <div>
    <v-card>
      <v-card-title>Role Data</v-card-title>
      <v-container>
        <v-row justify="end">
          <v-col cols="4">
            <v-btn color="primary" align-self="end" class="float-right">
              Add Data+
              <v-dialog min-width="480" max-width="1024" v-model="dialog" activator="parent">
                <v-card class="pa-3">
                  <v-card-title>Add Role</v-card-title>
                  <v-form class="pa-3" @submit.prevent="addData()">
                    <v-text-field density="compact" variant="outlined" label="Name" v-model="form.name"></v-text-field>
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
        <v-row>
          <v-col>
            <div class="text-start w-25">
              <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" density="compact" label="Search" flat
                single-line hide-details variant="outlined"></v-text-field>
            </div>
            <v-data-table :items-per-page="10" :headers="headers" :items="items.data" class="m-4 p-4" :loading="loading"
              :search="search">
              <template v-slot:item.count="{ item }">
                {{ items.data.indexOf(item) + 1 }}
              </template>
              <template v-slot:top>
                <v-dialog max-width="1024" v-model="editDialog">
                  <v-card class="pa-3">
                    <v-card-title>Edit Role
                    </v-card-title>
                    <v-form class="pa-3" @submit.prevent="editData(editedItem.id)">
                      <v-text-field density="compact" variant="outlined" label="Name"
                        v-model="editedItem.name"></v-text-field>

                      <v-card-actions class="float-right">
                        <v-btn color="error" @click="editDialog = !editDialog">Cancel</v-btn>
                        <v-btn color="primary" variant="elevated" type="submit" :loading="btnLoading">Update</v-btn>
                      </v-card-actions>
                    </v-form>
                  </v-card>
                </v-dialog>
                <v-dialog max-width="720" v-model="deleteDialog">
                  <v-card class="pa-3">
                    <v-card-title>Delete Data</v-card-title>
                    <v-card-text>Are you sure you want to delete this data?</v-card-text>
                    <v-card-actions>
                      <v-form class="pa-3" @submit.prevent="deleteData(editedItem.id)">
                        <v-btn color="primary"
                          @click="deleteDialog = !deleteDialog; searchDisabled = false">Cancel</v-btn>
                        <v-btn color="error" variant="elevated" type="submit" :loading="btnLoading">Delete</v-btn>
                      </v-form>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </template>
              <template v-slot:item.actions="{ item }">
                <div class="d-flex gc-2">
                  <v-icon @click="readData(item)">mdi-pencil</v-icon>
                  <v-icon @click="clickDetail(item.id)">mdi-eye-circle</v-icon>
                  <v-icon @click="clickDelete(item)">mdi-delete</v-icon>
                </div>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

  </div>
</template>

<script setup lang="ts">
import * as api from '@/apis/roles'
const dialog = ref(false)
const loading = ref(false)
const editDialog = ref(false)
const editedItem = ref({
  id: 0,
  name: ''
})
const btnLoading = ref(false)
const search = ref('')
const deleteDialog = ref(false)
const searchDisabled = ref(false)

const form = ref({
  name: "",
})

const headers = [
  { title: "#", key: 'count' },
  { title: "Name", key: 'name' },
  { title: "Guard Name", key: 'guard_name' },
  { title: "Created At", key: 'created_at' },
  { title: "Updated At", key: 'updated_at' },
  { title: 'Actions', key: 'actions' },
]

type Roles = {
  draw: string,
  recordsTotal: number,
  recordsFiltered: number,
  data: Role[],
}

type Role = {
  id: number,
  name: string,
}
var items: Roles = {
  draw: "",
  recordsTotal: 0,
  recordsFiltered: 0,
  data: [],
}

await fetchData()

async function fetchData() {
  loading.value = true
  const { data, status, error } = await useApiFetch(api.index)
  if (status.value == "success") {
    items = data.value as Roles
    loading.value = false
  } else {
    console.log(error.value)
  }
}

async function addData() {
  btnLoading.value = true

  const { status, error } = await useApiFetch(api.store, {
    method: "POST",
    body: form.value
  })

  if (status.value == "success") {
    await fetchData()
    form.value = {
      name: "",
    }
    dialog.value = false
    btnLoading.value = false
  } else {
    btnLoading.value = false
    console.log(error.value)
  }
}

async function readData(item: Role) {
  editedItem.value = Object.assign({}, item)
  editDialog.value = true
}

async function editData(id: number) {
  btnLoading.value = true
  loading.value = true
  const { status, error } = await useApiFetch(api.update + id, {
    method: "PUT",
    body: editedItem.value
  })
  if (status.value == "success") {
    await fetchData()

    editDialog.value = false
    loading.value = false
    btnLoading.value = false
  } else {
    btnLoading.value = false
    console.log(error.value)
  }
}

async function clickDelete(item: Role) {
  editedItem.value = Object.assign({}, item)
  deleteDialog.value = true
}

async function deleteData(id: number) {
  btnLoading.value = true

  const { status, error } = await useApiFetch(api.destroy + id, {
    method: "DELETE",
  })

  if (status.value == "success") {
    await fetchData()
    deleteDialog.value = false
    btnLoading.value = false
  } else {
    btnLoading.value = false
    console.log(error.value)
  }
}

async function clickDetail(id: number) {
  navigateTo('/roles/' + id)
}

</script>