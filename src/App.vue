<script setup>

import Header from "@/layouts/Header.vue";
import Footer from "@/layouts/Footer.vue";



</script>

<template>
  <v-app>
    <Header>
    </Header>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
    <Footer>
    </Footer>
  </v-app>

</template>

<style scoped>
header {
  line-height: 1.5;
}

.v-main {
  background-color: whitesmoke;

}


</style>
