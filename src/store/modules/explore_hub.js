const state = {

    companies: [],
    isFetchingCompanies: false,
    editCompany:null,
    archivedCompanies: [],
    isFetchingArchivedCompanies: false,

    listingCategories: [],
    isFetchingCategories: false,

    activeListings: [],
    activeListingsFilters: {},
    isActiveListingsLoading: false,
    editListing: null,
    viewedListing: null,
    archivedListings: [],
    isArchivedListingsLoading: false,
    viewedArchivedListing: null,
};

const mutations = {
    STORE_EXPLORE_LISTED_COMPANIES: (state, data)=> state.companies = data,
    SET_IS_FETCHING_COMPANIES: (state, value)=> state.isFetchingCompanies = value,
    SET_EDIT_COMPANY: (state, data)=> state.editCompany = data,
    STORE_ARCHIVED_COMPANIES: (state, data)=> state.archivedCompanies = data,
    SET_IS_FETCHING_ARCHIVED_COMPANIES: (state, value)=> state.isFetchingArchivedCompanies = value,

    STORE_EXPLORE_LISTING_CATEGORIES: (state, data)=> state.listingCategories = data,
    SET_IS_FETCHING_CATEGORIES: (state, value)=> state.isFetchingCategories = value,

    STORE_ACTIVE_LISTINGS: (state, data)=> state.activeListings = data,
    STORE_ACTIVE_LISTINGS_FILTERS: (state, data)=> state.activeListingsFilters = data,
    SET_IS_ACTIVE_LISTINGS_LOADING: (state, value)=> state.isActiveListingsLoading = value,
    STORE_EDIT_LISTING: (state, data)=> state.editListing = data,
    STORE_VIEWED_LISTING: (state, data)=> state.viewedListing = data,
    STORE_ARCHIVED_LISTINGS: (state, data)=> state.archivedListings = data,
    SET_IS_ARCHIVED_LISTINGS_LOADING: (state, value)=> state.isArchivedListingsLoading = value,
    STORE_VIEWED_ARCHIVED_LISTING: (state, data)=> state.viewedArchivedListing = data,
};

export default {
    namespaced: true,
    state,
    mutations,
};