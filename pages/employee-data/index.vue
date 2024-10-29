<template>
  <div>
    <PermissionChecker permission="browse_employee">
      <v-card title="Employee Data">
        <v-container>
          <PermissionChecker permission="add_employee" :isComponent=true>
            <v-row justify="end">
              <v-col cols="4">
                <v-btn color="primary" align-self="end" class="float-right" @click="searchDisabled = true">
                  Add Data+
                  <v-dialog max-width="1024" v-model="dialog" activator="parent">
                    <v-card class="pa-3">
                      <v-card-title>Add Employee</v-card-title>
                      <v-form class="pa-3" @submit.prevent="addData()">
                        <v-text-field density="compact" variant="outlined" label="Email"
                          v-model="form.email"></v-text-field>
                        <v-text-field density="compact" variant="outlined" label="Name"
                          v-model="form.name"></v-text-field>
                        <v-text-field density="compact" variant="outlined" label="Password" type="password"
                          v-model="form.password"></v-text-field>
                        <v-select v-model="form.roles" :items="rolesData.data" item-value="id" item-title="name"
                          density="compact" label="Roles" multiple persistent-hint return-object
                          variant="outlined"></v-select>
                        <v-card-actions class="float-right">
                          <v-btn color="error" @click="
                            dialog = !dialog;
                          searchDisabled = false;
                          ">Cancel</v-btn>
                          <v-btn color="primary" variant="elevated" type="submit" :loading="btnLoading">Submit</v-btn>
                        </v-card-actions>
                      </v-form>
                    </v-card>
                  </v-dialog>
                </v-btn>
              </v-col>
            </v-row>
          </PermissionChecker>
          <v-row>
            <v-col>
              <div class="text-start w-25">
                <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" density="compact" label="Search" flat
                  single-line hide-details variant="outlined" :disabled="searchDisabled"></v-text-field>
              </div>

              <v-data-table :items-per-page="10" :headers="headers" :items="items.data" class="m-4 p-4" :loading="loading"
                :search="search">
                <template v-slot:item.count="{ item }">
                  {{ items.data.indexOf(item) + 1 }}
                </template>
                <template v-slot:item.actions="{ item }">
                  <PermissionChecker permission="edit_employee" :isComponent=true> 
                    <v-icon @click="clickDetail(item.id)">mdi-eye-circle</v-icon>
                  </PermissionChecker>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </PermissionChecker>
  </div>
</template>
<script setup lang="ts">
import * as api from "@/apis/employee-data";
import * as roles_api from "@/apis/roles";
const dialog = ref(false);
const loading = ref(false);
const btnLoading = ref(false);
const editDialog = ref(false);
const editedItem = ref();
const search = ref("");
const searchDisabled = ref(false);
const form = ref({
  email: "",
  name: "",
  password: "",
  roles: [],
});

const headers = [
  { title: "#", key: "count" },
  { title: "Name", key: "user.name" },
  { title: "Employee Number", key: "employeeNumber" },
  { title: "Job Title", key: "jobTitle.name" },
  { title: "Grade", key: "grade" },
  { title: "Created At", key: "createdAt" },
  { title: "Updated At", key: "updatedAt" },
  { title: "Actions", key: "actions" },
];

type Users = {
  draw: string;
  recordsTotal: number;
  recordsFiltered: number;
  data: User[];
};

type User = {
  id: number;
  email: string;
  name: string;
  password: string;
  no: number;
  roles: Role[];
};

var items: Users = {
  draw: "",
  recordsTotal: 0,
  recordsFiltered: 0,
  data: [], // Ensure this is an array of User objects
};

type Roles = {
  data: Role[];
};

type Role = {
  id: number;
  name: string;
};

var rolesData: Roles = {
  data: [],
};

await fetchData();
// await getRolesData();

async function fetchData() {
  loading.value = true;
  const { data, status, error } = await useApiFetch(api.index);
  if (status.value == "success") {
    items = data.value as Users;
    loading.value = false;
  } else {
    console.log(error.value);
  }
}

async function clickDetail(id: number){
  navigateTo('/employee-data/' + id)
}

async function addData() {
  btnLoading.value = true;

  const { status, error } = await useApiFetch(api.store, {
    method: "POST",
    body: form.value,
  });

  if (status.value == "success") {
    await fetchData();
    form.value = {
      email: "",
      name: "",
      password: "",
      roles: []
    };
    dialog.value = false;
    btnLoading.value = false;
    searchDisabled.value = false;
  } else {
    console.log(error.value);
  }
}

async function readData(item: User) {
  editedItem.value = Object.assign({}, item);
  
  searchDisabled.value = true;
  editDialog.value = true;
}

async function editData(item: User) {
  btnLoading.value = true;
  console.log(item);
  
  const { status, error } = await useApiFetch(api.update + item.id, {
    method: "PUT",
    body: editedItem.value,
  });
  if (status.value == "success") {  
    await fetchData();

    editDialog.value = false;
    btnLoading.value = false;
  } else {
    console.log(error.value);
  }
}

</script>