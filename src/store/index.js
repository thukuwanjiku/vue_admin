import { createStore } from 'vuex'

//modules imports
import auth from "@/store/modules/auth";
import shared from "@/store/modules/shared";
import explore from "@/store/modules/explore";

export default createStore({
  state: {},
  mutations: {},
  getters: {},

  modules: {
    auth,
    shared,
    explore,
  }
})
