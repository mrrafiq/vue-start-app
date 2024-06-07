<template>
  <div class=".d-sm-none .d-md-flex">
    <v-navigation-drawer v-model="drawer" app expand-on-hover>
      <v-list>
        <v-list-item :prepend-avatar="host + '/' + userData.avatar">
          <v-list-item-title v-text="userData.name"></v-list-item-title>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav density="compact">
        <div v-for="(menu, i) in data" :key="i">
          <v-list-group v-if="menu.hide == false" no-action>
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" :title="menu.group" :prepend-icon="menu.icon"></v-list-item>
            </template>
            <div v-for="(item, j) in menu.items" :key="j" :value="item">
              <v-list-item :to="item.link" :title="item.title" v-if="item.hide == false" :class="{ 'active-menu-item': isActive(item.link) }">
              </v-list-item>
            </div>
          </v-list-group>
        </div>

      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="error" @click="logout" :loading="loading">
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
    <v-app-bar-title @click="navigateTo('/')" class="cursor-pointer">
      {{ appName }}
    </v-app-bar-title>
  </v-app-bar>
</template>
<style>
.active-menu-item {
  color: #009ecf; /* Change the color to red when active, modify as needed */
  background-color: #dff0f5;
}
</style>
<script setup lang="ts">
import { applicationName } from "@/data/menus";
import { useRoute } from 'vue-router';

const route = useRoute();

function isActive(link: string): boolean {
  // This will check if the current route path includes the link
  return route.path.startsWith(link);
}

var drawer = ref(false);
const userData = ref();

const config = useRuntimeConfig()
// host backend url
const host = config.public.apiHost

const appName = applicationName;
const loading = ref(false);

const auth = useAuthStore();
userData.value = auth.getUser as object;

//when display is on md make v-navigation-drawer show
function onClickDrawer() {
  drawer.value = !drawer.value;
}

function fitToScreen() {
  // set drawer to false when screen display is under 720px
  if (window.innerWidth < 720) {
    drawer.value = false;
  }
}

async function logout() {
  {
    loading.value = true;
    await auth.logout();
    navigateTo("/auth/login");
  }
}

const dataMenu = useUserMenu()
const data = dataMenu.userMenu


onMounted(() => {
  fitToScreen();
});
</script>
