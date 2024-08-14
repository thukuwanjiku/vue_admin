import { createStore } from 'vuex'

//modules imports
import explore from "@/store/modules/explore";
import auth from "@/store/modules/auth";

export default createStore({
  state: {},
  mutations: {},
  getters: {},

  modules: {
    auth,
    explore,
  }
})
