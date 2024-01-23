<template>
  <div class=".d-sm-none .d-md-flex">
    <v-navigation-drawer v-model="drawer" app expand-on-hover>
      <v-list>
        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg">
          <!-- <v-list-item-title v-text="userData.email"></v-list-item-title> -->
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item v-for="(menu, i) in data" :key="i" :value="menu" :to=menu.link>
          <template v-slot:prepend>
            <v-icon :icon="menu.icon"></v-icon>
          </template>

          <v-list-item-title v-text="menu.title"></v-list-item-title>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="error" @click="logout">
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
  <v-app-bar>
    <v-app-bar-nav-icon @click="onClickDrawer">
      <v-icon>mdi-menu</v-icon>
    </v-app-bar-nav-icon>
    <v-app-bar-title>
      {{ appName }}
    </v-app-bar-title>
  </v-app-bar>
</template>
<script setup lang="ts">
import { menus, applicationName } from '@/data/menus'

var drawer = ref(false)
const userData = ref()
const data = menus
const appName = applicationName

const auth = useAuthStore()
userData.value = auth.getUser as object

//when display is on md make v-navigation-drawer show
function onClickDrawer() {
  drawer.value = !drawer.value
}

function fitToScreen() {
  // set drawer to false when screen display is under 720px
  if (window.innerWidth < 720) {
    drawer.value = false
  }
}

async function logout() {
  {
    await auth.logout()
    navigateTo('/auth/login')
  }
}

onMounted(() => {
  fitToScreen()
})

</script>