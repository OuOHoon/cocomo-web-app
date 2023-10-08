
import { createStore } from 'vuex';

const store = createStore({
    state: {
        isAuthenticated: false,
        csrfToken: '',
    },
    getters: {
        isAuthenticated: state => state.isAuthenticated,
        csrfToken: state => state.csrfToken,
    },
    mutations: {
        setAuthentication(state, status) {
            state.isAuthenticated = status;
        },
        setCsrfToken(state, status) {
            state.csrfToken = status;
        },
        sessionCheck(state) {
            const session = Cookies.get('SESSION');
            if (session !== undefined) {
                state.isAuthenticated = true;
            }
        },
    },
    actions: {
        authenticate({ commit }, status) {
            commit('setAuthentication', status);
        },
        sessionCheck({commit}, status) {
            commit('sessionCheck');
        },
    }
});

export default store;
