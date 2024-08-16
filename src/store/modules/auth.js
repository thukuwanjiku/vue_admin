const state = {

    user: JSON.parse(localStorage.getItem('mz.admin')) || null,
    accessToken: localStorage.getItem('bearer_token') || null,

};

const mutations = {
    STORE_AUTH_USER(state, user){
        state.user = user;
    },
    STORE_AUTH_TOKEN(state, token){
        state.accessToken = token;
    },
    LOGOUT(state){
        state.user = null;
        state.accessToken = null;
        localStorage.removeItem('mz.admin');
        localStorage.removeItem('bearer_token');
    }
};

const getters = {
    isAuthenticated: (state) => !!state.accessToken,
}

export default {
    namespaced: true,
    state,
    mutations,
    getters
};