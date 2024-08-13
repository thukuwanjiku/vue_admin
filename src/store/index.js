import { createStore } from 'vuex'

export default createStore({
  state: {

    //Auth
    user: JSON.parse(localStorage.getItem('mz.admin')) || null,
    accessToken: localStorage.getItem('bearer_token') || null,

  },

  mutations: {

    //Auth Mutations
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

  },

  getters: {

    //Auth
    user: (state)=> state.user,
    accessToken: (state)=> state.accessToken,
    isAuthenticated: (state) => !!state.accessToken,

  },

  modules: {
  }
})
