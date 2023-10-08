<script setup>
import {computed, ref} from 'vue'
import axios from "axios";
import store from "@/store";
import Cookies from "js-cookie";
import router from "@/router";

const alarmAddBtnText = "알람 등록"
const alarmAddBtnLink = "/alarm"

const alarmListBtnText = "알람 등록 현황"
const alarmListBtnLink = computed(() => `/alarm/list`)

const logoutUrl = import.meta.env.VITE_LOGOUT_URL;
const logout = async (e) => {
  try {
    const res = await axios.post(logoutUrl,{
    }, {
      headers: {
        'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN')
      }
    });
    if (res.status === 200) {
      console.log("로그아웃 성공")
      store.commit('setAuthentication', false);
      await router.push('/');
    }
    else{
      console.log("로그아웃 실패")
    }
  } catch (e) {
    console.error('로그아웃 에러 발생' + e);
  }
};
</script>

<template>
  <v-app-bar app>
    <v-toolbar-title>
      <v-btn to="/" class="no-bg-on-hover btn-logo">
        <v-img src="/cocomo_logo.png" alt="Logo" :style="{ width: '80px', height: '40px'}"></v-img>
      </v-btn>
    </v-toolbar-title>

    <v-btn :to="alarmAddBtnLink">
      {{ alarmAddBtnText }}
    </v-btn>
    <v-btn :to="alarmListBtnLink">
      {{ alarmListBtnText }}
    </v-btn>
    <v-btn @click="logout" v-if="store.getters.isAuthenticated">
      로그아웃
    </v-btn>
  </v-app-bar>
</template>

<style scoped>
.no-bg-on-hover.v-btn:hover {
  background: none !important;
}

.btn-logo {
  width: 60px;
  height: 40px;
}
</style>