<template>
  <!-- This component is used to check permission to each route -->
  <div>
    <slot v-if="hasPermission()" />
    <div v-else-if="!isComponent">
      <v-card color="error" variant="elevated" elevation="16">
        <v-card-title>Missing Permission</v-card-title>
        <v-card-subtitle>
          You don't have permission to access this page. Please contact your administrator. You can go back to the
          previous page by clicking the button below.
        </v-card-subtitle>
        <v-card-actions>
          <v-btn class="black--text" @click="goBack()">
            <v-icon left>mdi-chevron-left</v-icon>
            Go Back
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter()
const { permission, isComponent } = defineProps({
  permission: {
    type: String,
    required: true
  },
  isComponent: {
    type: Boolean,
    default: false
  }
})
function hasPermission() {
  // TODO: Implement permission checking logic
  const permissions = userAuthPermissions()
  return permissions.userPermissions.includes(permission)
}
function goBack() {
  // go to previous page
  router.back()
}
</script>

