const state = {

    companies: [],
    viewedCompany:null

};

const mutations = {
    STORE_EXPLORE_LISTED_COMPANIES: (state, data)=> state.companies = data,
    SET_VIEWED_COMPANY: (state, data)=> state.viewedCompany = data,
};

export default {
    namespaced: true,
    state,
    mutations,
};