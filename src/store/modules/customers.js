const state = {
    customers: [],
    isFetchingCustomers: false,
}

const mutations = {
    STORE_CUSTOMERS: (state, data)=> state.customers = data,
    SET_IS_FETCHING_CUSTOMERS: (state, value)=> state.isFetchingCustomers = value,
}

export default {
    namespaced: true,
    state,
    mutations,
};
