<template>
  <v-card width="720">
    <v-card-title>Add User</v-card-title>
    <div class="pa-3">
      <v-form>
        <v-text-field density="compact" variant="outlined" label="Email" v-model="form.email"></v-text-field>
        <v-text-field density="compact" variant="outlined" label="Name" v-model="form.name"></v-text-field>
        <v-text-field density="compact" variant="outlined" label="Password" type="password" v-model="form.password"></v-text-field>
        <v-btn color="primary" class="float-right mb-3">Submit</v-btn>
      </v-form>
    </div>

  </v-card>
</template>

<script setup lang="ts">
const form = ref({
  email: "",
  name: "",
  password: "",
})
</script>