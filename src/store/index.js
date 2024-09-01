import { createStore } from 'vuex'

//modules imports
import auth from "@/store/modules/auth";
import shared from "@/store/modules/shared";
import exploreHub from "@/store/modules/explore_hub";

export default createStore({
  state: {},
  mutations: {},
  getters: {},

  modules: {
    auth,
    shared,
    exploreHub,
  }
})
