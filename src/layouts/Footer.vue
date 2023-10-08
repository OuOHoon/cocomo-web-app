<script setup>

const blogBtnLink = "https://ouohoon.tistory.com";
const blogBtnText = "개발자 블로그"
const discordBtnLink = "https://discord.gg/jMrCfSKqZs"
const discordBtnText = "디스코드"

</script>

<template>
  <footer>
    <v-footer app>
      <v-container>
        <v-row>
          <v-col class="text-center">
            <v-btn :href="blogBtnLink">{{ blogBtnText }}</v-btn>
            <v-btn :href="discordBtnLink">{{ discordBtnText }}</v-btn>
            <v-spacer></v-spacer>
            Copyright © 2023 Cocomo. All rights reserved.
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </footer>
</template>

<style scoped>

</style>