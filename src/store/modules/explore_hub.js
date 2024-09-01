const state = {

    companies: [],
    editCompany:null,

    listingCategories: [],
    isFetchingCategories: false,

    activeListings: [],

};

const mutations = {
    STORE_EXPLORE_LISTED_COMPANIES: (state, data)=> state.companies = data,
    SET_EDIT_COMPANY: (state, data)=> state.editCompany = data,

    STORE_EXPLORE_LISTING_CATEGORIES: (state, data)=> state.listingCategories = data,
    SET_IS_FETCHING_CATEGORIES: (state, value)=> state.isFetchingCategories = value,

    STORE_ACTIVE_LISTINGS: (state, data)=> state.activeListings = data,
};

export default {
    namespaced: true,
    state,
    mutations,
};