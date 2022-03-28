import { createStore } from "vuex";

export default createStore({
    state: {
        accessToken: ""
    },
    getters: {},
    mutations: {
        setAccessToken(state, newAccessToken) {
            state.accessToken = newAccessToken;
        }
    },
    actions: {
        setNewAccessToken: function ({ commit }, newAccessToken) {
            commit("setAccessToken", newAccessToken);
        }
    },
    modules: {}
});
