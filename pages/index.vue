<template>
  <div>
    Hello
    <p>{{ auth.user }}</p>
  </div>
</template>
<script setup lang="ts">
const auth = useAuthStore()

</script>