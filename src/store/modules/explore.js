const state = {

    companies: [],

};

const mutations = {
    STORE_EXPLORE_LISTED_COMPANIES: (state, data)=> state.companies = data,
};

export default {
    namespaced: true,
    state,
    mutations,
};