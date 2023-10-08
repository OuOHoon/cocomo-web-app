import {createRouter, createWebHistory} from 'vue-router';
import Main from "@/views/MainView.vue";
import AlarmAddForm from "@/views/AlarmAddView.vue";
import AlarmList from "@/views/AlarmListView.vue";
import store from "@/store";

const routes = [
    {
        path: '/',
        name: 'Main',
        component: Main
    },
    {
        path: '/alarm',
        name: 'AlarmAddForm',
        component: AlarmAddForm,
        meta: {requiresAuth: true}
    },
    {
        path: '/alarm/list',
        name: 'AlarmList',
        component: AlarmList,
        meta: {requiresAuth: true}
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next({path: '/'}) // 권한이 없을 경우 메인으로 리다이렉트

    } else {
        next(); // 권한이 있다면 라우트 이동
    }
})

export default router;
