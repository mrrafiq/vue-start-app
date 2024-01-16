<template>
  <div>
    <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
    
    >
      <v-list>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
          title="Sandra Adams"
          subtitle="sandra_a88@gmailcom"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
        <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
        <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon
        @click="rail = !rail"
      >
      </v-app-bar-nav-icon>
      <v-app-bar-title>My Application</v-app-bar-title>
    </v-app-bar>
  </div>
  
  
</template>
<script setup lang="ts">
  var rail = ref(true)
  var drawer = ref(true)
</script>