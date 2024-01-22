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

          <v-btn block color="secondary" type="submit">
            Sign In
          </v-btn>
        </v-form>

      </div>

    </v-card>
  </div>
</template>
<script setup lang="ts">

definePageMeta({
  layout: 'auth',
})

const auth = useAuthStore()
const form = ref({
  email: "admin@gmail.com",
  password: "password",
})

async function login() {
  await auth.login(form.value)

  navigateTo('/')
}


</script>