<template>
  <v-dialog max-width="720" >
    <v-card class="pa-3">
      <v-card-title>Delete Data</v-card-title>
      <v-card-text>Are you sure you want to delete this data?</v-card-text>
      <v-card-actions class="float-right">
        <v-btn color="primary" variant="plain" >Cancel</v-btn>
        <v-btn color="error" variant="elevated" @click="">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
defineProps({
  // showDialog: {
  //   type: Boolean,
  //   default: false
  // },
  action: {
    type: Function,
    default: () => { }
  }
})
const deleteDialog = ref(false)
</script>