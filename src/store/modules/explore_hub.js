const state = {

    companies: [],
    isFetchingCompanies: false,
    editCompany:null,

    listingCategories: [],
    isFetchingCategories: false,

    activeListings: [],
    activeListingsFilters: {},
    editListing: null,
    viewedListing: null,

};

const mutations = {
    STORE_EXPLORE_LISTED_COMPANIES: (state, data)=> state.companies = data,
    SET_IS_FETCHING_COMPANIES: (state, value)=> state.isFetchingCompanies = value,
    SET_EDIT_COMPANY: (state, data)=> state.editCompany = data,

    STORE_EXPLORE_LISTING_CATEGORIES: (state, data)=> state.listingCategories = data,
    SET_IS_FETCHING_CATEGORIES: (state, value)=> state.isFetchingCategories = value,

    STORE_ACTIVE_LISTINGS: (state, data)=> state.activeListings = data,
    STORE_ACTIVE_LISTINGS_FILTERS: (state, data)=> state.activeListingsFilters = data,
    STORE_EDIT_LISTING: (state, data)=> state.editListing = data,
    STORE_VIEWED_LISTING: (state, data)=> state.viewedListing = data,
};

export default {
    namespaced: true,
    state,
    mutations,
};