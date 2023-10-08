<script setup>
import {ref} from 'vue'
import store from "@/store";
import axios from "axios";
import router from "@/router";
import Cookies from 'js-cookie'


const loginUrl = import.meta.env.VITE_LOGIN_URL;
const notice = "화면 가장 아래의 디스코드 버튼을 눌러 디스코드 서버에 접속하고 공지사항의 내용대로 따라주세요. 감사합니다."
const key = ref('')
const dialog = ref(false);


const login = async () => {
  try {

    console.log("csrf:" + store.getters.csrfToken);
    const response = await axios.post(loginUrl,
        {
          "cocomoKey": key.value,
        },
        {
          headers: {
            'Content-Type': "application/json",
            'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
          },
        }
    );
    console.log('응답값: ', response.data);
    if (response.status === 200) {
      console.log('로그인 성공');
      store.commit('setAuthentication', true);
      await router.push('/alarm');
    }
  } catch (error) {
    console.error('로그인 에러: ' + error);
    dialog.value = true;
  }
};
</script>

<template>
  <v-container v-show="!store.getters.isAuthenticated">
    <v-row>
      <v-col class="notice-card d-flex justify-center align-center">
        <v-card title="사용법" :text="notice" variant="outlined">
        </v-card>
      </v-col>
    </v-row>
    <v-row class="d-flex">
      <v-col>
        <v-card>
          <v-card-title>코코모 로그인</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field label="인증 키" outlined v-model="key"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="primary" @click="login">로그인</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-dialog v-model="dialog" max-width="400px">
        <v-card>
          <v-card-title>로그인 실패</v-card-title>
          <v-card-text>유효하지 않은 인증 키입니다.</v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="dialog = false">닫기</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
  <v-container v-show="store.getters.isAuthenticated">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        메인 페이지입니다. 상단 우측의 메뉴에서 알람 등록이나 현황을 확인할 수 있습니다.
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

.notice-card {
  font-weight: 24;

}
</style>