<template>
  <div>
    <h1>Employee Data</h1>
    <v-tabs v-model="tab">
      <v-tab :value="1">Landscape</v-tab>
      <v-tab :value="2">City</v-tab>
      <v-tab :value="3">Abstract</v-tab>
    </v-tabs>
  </div>
</template>
<script setup lang="ts">
const tab = ref("");

const tabs = ref([
  { name: 'overview', label: 'Overview' },
  { name: 'settings', label: 'Settings' },
  { name: 'profile', label: 'Profile' },
])
</script>
