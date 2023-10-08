import {createApp} from 'vue'
import App from './App.vue'
import router from "@/router";


// Vuetify
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import {VDataTable, VDataTableServer, VDataTableVirtual} from "vuetify/labs/components";

import store from "@/store";
import axios from "axios";
import Cookies from 'js-cookie'

// MDI
import '@mdi/font/css/materialdesignicons.css'

// env 환경변수
const sessionCheckUrl = import.meta.env.VITE_SESSION_CHECK_URL;
const csrfUrl = import.meta.env.VITE_CSRF_URL;


// Axios global settings
axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers['X-XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN')

// get csrf token todo 에러 페이지 표시
await axios.get(csrfUrl)
    .then((res) => {

        axios.post(sessionCheckUrl)
            .then((res) => {
                if (res.status === 200) {
                    console.log('session 존재함');
                    store.commit('setAuthentication', true);
                }
            }).catch((err) => {
            console.log('세션 없음')
        })
    });

const vuetify = createVuetify({
    components: {
        ...components,
        VDataTable,
        VDataTableServer,
        VDataTableVirtual
    },
    directives,
})

createApp(App).use(vuetify).use(router).use(store).mount('#app')