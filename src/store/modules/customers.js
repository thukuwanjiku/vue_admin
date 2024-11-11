const state = {
    customers: [],
    isFetchingCustomers: false,
    viewedCustomer: null
}

const mutations = {
    STORE_CUSTOMERS: (state, data)=> state.customers = data,
    SET_IS_FETCHING_CUSTOMERS: (state, value)=> state.isFetchingCustomers = value,
    STORE_VIEWED_CUSTOMER: (state, data)=> state.viewedCustomer = data,
}

export default {
    namespaced: true,
    state,
    mutations,
};
