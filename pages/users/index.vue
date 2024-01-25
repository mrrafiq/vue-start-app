<template>
  <div>
    This is users
  </div>
  <div>
    User Data

  </div>
</template>
<script setup lang="ts">
const userData = useUsersStore()
onMounted(() => {
  fetchData()
})

function fetchData() {
  var datas = userData.fetchUsers()
  return datas
}

</script>