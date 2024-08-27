const state = {

    companies: [],
    editCompany:null

};

const mutations = {
    STORE_EXPLORE_LISTED_COMPANIES: (state, data)=> state.companies = data,
    SET_EDIT_COMPANY: (state, data)=> state.editCompany = data,
};

export default {
    namespaced: true,
    state,
    mutations,
};