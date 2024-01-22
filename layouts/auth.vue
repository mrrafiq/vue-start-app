<template>
  <v-app class="custom-background">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center">
          <v-col cols="12">
            <slot />
          </v-col>
        </v-row>

      </v-container>

    </v-main>
    <v-footer border class="pa-3 text-center" style="max-height: 60px;">
    <v-container>
      <v-row>
        <v-col>
          <span>This template is made by @mrrafiq</span>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
  </v-app>
</template>

<style>
.custom-background{
  background-image: url(../assets/img/background-login.jpg); /* Replace with the path to your image */
  background-size: cover;
  background-position: bottom;
}
</style>