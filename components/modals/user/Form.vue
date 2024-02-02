<template>
  <v-dialog min-width="480" max-width="1024" v-model="dialog" activator="parent" id="add">
    <v-card class="pa-3">
      <v-card-title>Add User</v-card-title>
      <v-form class="pa-3" @submit.prevent="addData">
        <v-text-field density="compact" variant="outlined" label="Email" v-model="data.email"></v-text-field>
        <v-text-field density="compact" variant="outlined" label="Name" v-model="data.name"></v-text-field>
        <v-text-field density="compact" variant="outlined" label="Password" type="password"
          v-model="data.password"></v-text-field>
        <v-card-actions class="float-right">
          <v-btn color="error" @click="dialog = !dialog">Cancel</v-btn>
          <v-btn color="primary" variant="elevated" type="submit">Submit</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
  <v-dialog min-width="480" max-width="1024" v-model="dialog" activator="parent" id="edit">
    <v-card class="pa-3">
      <v-card-title>Edit User</v-card-title>
      <v-form class="pa-3" @submit.prevent="">
        <v-text-field density="compact" variant="outlined" label="Email" v-model="data.email"></v-text-field>
        <v-text-field density="compact" variant="outlined" label="Name" v-model="data.name"></v-text-field>
        <v-text-field density="compact" variant="outlined" label="Password" type="password"
          v-model="data.password"></v-text-field>
        <v-card-actions class="float-right">
          <v-btn color="error" @click="dialog = !dialog">Cancel</v-btn>
          <v-btn color="primary" variant="elevated" type="submit">Submit</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
// props for component
defineProps({
  isActive: Boolean,
  form: Object
})

const userData = useUsersStore()

const dialog = ref(false)
const data = ref({
  email: "",
  name: "",
  password: "",
})

async function addData() {
  await userData.addUser(data.value)
  await userData.fetchUsers()
  dialog.value = !dialog.value
}

async function readData() {
  
}
</script>