import { createStore } from 'vuex'

//modules imports
import auth from "@/store/modules/auth";
import shared from "@/store/modules/shared";
import customers from "@/store/modules/customers";
import exploreHub from "@/store/modules/explore_hub";
import investmentHub from "@/store/modules/investment_hub";
import chat from "@/store/modules/chat";
import financeInstitution from "@/store/modules/finance_institutions";

export default createStore({
  state: {},
  mutations: {},
  getters: {},

  modules: {
    auth,
    shared,
    customers,
    exploreHub,
    investmentHub,
    chat,
    financeInstitution
  }
})
