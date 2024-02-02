<template>
  <div>
    Hello
    <p>{{ auth.getUser.name }}</p>
  </div>
</template>
<script setup lang="ts">
const auth = useAuthStore()

</script>