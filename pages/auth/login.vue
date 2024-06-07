<template>
  <div>
    <v-card outlined class="mx-auto" max-width="720">
      <v-card-title class="text-center">
        Welcome!
      </v-card-title>
      <v-divider></v-divider>
      <div class="pa-4 mt-4">
        <v-form @submit.prevent="login">
          <v-text-field density="compact" class="text-center" variant="outlined" label="Email" v-model="form.email">
          </v-text-field>
          <v-text-field density="compact" variant="outlined" label="Password" type="password" v-model="form.password">
          </v-text-field>

          <v-btn block color="secondary" type="submit" :loading="loading">
            Sign In
          </v-btn>
        </v-form>

      </div>

    </v-card>
    <v-snackbar v-model="showError" color="error">
      {{ errorMessage }}
    </v-snackbar>
  </div>
</template>
<script setup lang="ts">

definePageMeta({
  layout: 'auth',
})

const auth = useAuthStore()
const permissions = userAuthPermissions()
const menu = useUserMenu()
const form = ref({
  email: "admin@gmail.com",
  password: "password",
})

const loading = ref(false);
const showError = ref(false)
const errorMessage = ref('')

async function login() {
  loading.value = true
  await auth.login(form.value)
  await permissions.getPermissions()
  await menu.getUserMenu()

  if (auth.getUser.error) {
    showError.value = true
    errorMessage.value = auth.getUser.error.message
    loading.value = false
    console.log(auth.getUser)
  }else{
    navigateTo('/')
  }
  // loading.value = false
}


</script>