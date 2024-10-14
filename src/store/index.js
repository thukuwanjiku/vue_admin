import { createStore } from 'vuex'

//modules imports
import auth from "@/store/modules/auth";
import shared from "@/store/modules/shared";
import exploreHub from "@/store/modules/explore_hub";
import investmentHub from "@/store/modules/investment_hub";
import chat from "@/store/modules/chat";

export default createStore({
  state: {},
  mutations: {},
  getters: {},

  modules: {
    auth,
    shared,
    exploreHub,
    investmentHub,
    chat
  }
})
