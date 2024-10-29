<template>
  <div>
    <h1>{{ roleData.data.name }}</h1>
    <v-card>
      <v-card-title>Info</v-card-title>
      <v-container>
        <v-row>
          <v-col>
            <v-list disabled :items="detailsKey"> </v-list>
          </v-col>
          <v-col>
            <v-list disabled :items="detailsValue"> </v-list>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
  <div>
    <v-card class="pa-4 my-4">
      <v-card-title>Permissions</v-card-title>
      <v-container>
        <div class="text-start w-25">
          <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            density="compact"
            label="Search"
            flat
            single-line
            hide-details
            variant="outlined"
          ></v-text-field>
        </div>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="permissionsData.data"
          class="m-4 p-4 elevation-1"
          :loading="loading"
          :search="search"
          show-select
          return-object
          item-value="id"
        >
        </v-data-table>
        <v-row justify="end" class="mt-4">
          <v-col cols="4">
            <v-btn color="primary" align-self="end" class="float-right">
              Assign
              <v-dialog
                min-width="480"
                max-width="1024"
                v-model="dialog"
                activator="parent"
              >
                <v-card class="pa-3">
                  <v-card-title>Delete Data</v-card-title>
                  <v-card-text
                    >Are you sure you want to delete this data?</v-card-text
                  >
                  <v-form class="pa-3" @submit.prevent="assignPermission()">
                    <v-card-actions class="float-right">
                      <v-btn color="error" @click="dialog = false"
                        >Cancel</v-btn
                      >
                      <v-btn
                        color="primary"
                        variant="elevated"
                        type="submit"
                        :loading="btnLoading"
                        >Submit</v-btn
                      >
                    </v-card-actions>
                  </v-form>
                </v-card>
              </v-dialog>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-snackbar v-model="snackbar" :color="color">
      {{ message }}
    </v-snackbar>
  </div>
</template>
<script setup lang="ts">
import * as api from "@/apis/roles";
import * as permission_api from "@/apis/permissions";

const route = useRoute();
const id = route.params.id;
const search = ref("");
const loading = ref(false);
const dialog = ref(false);
const btnLoading = ref(false);
const selected = ref();
const snackbar = ref(false);
const message: any = ref();
const color = ref("success");

type Role = {
  data: {
    id: number;
    name: string;
    guardName: string;
    createdAt: string;
    updatedAt: string;
  };
};

type Permission = {
  id: number;
  name: string;
  guardName: string;
  createdAt: string;
  updatedAt: string;
};

type Permissions = {
  draw: string;
  recordsTotal: number;
  recordsFiltered: number;
  data: Permission[];
};

var roleData: Role = {
  data: {
    id: 0,
    name: "",
    guardName: "",
    createdAt: "",
    updatedAt: "",
  },
};

var permissionsData: Permissions = {
  draw: "",
  recordsTotal: 0,
  recordsFiltered: 0,
  data: [],
};

var selectedData: Permissions = {
  draw: "",
  recordsTotal: 0,
  recordsFiltered: 0,
  data: [],
};

const headers = [
  { title: "#", key: "id" },
  { title: "Name", key: "name" },
  { title: "Guard Name", key: "guardName" },
];

await getPermissionsData();
await readData();
await getSelected();

const detailsKey = Object.keys(roleData.data);
const detailsValue = Object.values(roleData.data);

async function readData() {
  const { data, status, error } = await useApiFetch(api.show + id);
  if (status.value == "success") {
    roleData = data.value as Role;
  } else {
    console.log(error.value);
  }
}

async function getPermissionsData() {
  const { data, status, error } = await useApiFetch(permission_api.index);
  if (status.value == "success") {
    permissionsData = data.value as Permissions;
  } else {
    console.log(error.value);
  }
}

async function getSelected() {
  const { data, status, error } = await useApiFetch(api.show_permissions + id);
  if (status.value == "success") {
    selectedData = data.value as Permissions;
    selected.value = selectedData.data;
  } else {
    console.log(error.value);
  }
}

async function assignPermission() {
  btnLoading.value = true;
  var postData = selected.value.map((data: any) => data.id);

  const { status, error } = await useApiFetch(api.assign_permissions + id, {
    method: "POST",
    body: { permission_id: postData },
  });
  if (status.value == "success") {
    snackbar.value = true;
    message.value = "Permissions assigned successfully";
    await getSelected();
  } else {
    snackbar.value = true;
    color.value = "error";
    message.value = error.value?.message;
  }
  dialog.value = false;
  btnLoading.value = false;
}
</script>
