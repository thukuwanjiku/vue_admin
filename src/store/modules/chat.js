const state = {
    conversations: [],
    selectedConversation: null,
    isFetchingCustomerConversations: false
}

const mutations = {
    STORE_CUSTOMER_CONVERSATIONS: (state, data)=> state.conversations = data,
    SET_IS_FETCHING_CUSTOMER_CONVERSATIONS: (state, value)=> state.isFetchingCustomerConversations = value,
}

export default {
    namespaced: true,
    state,
    mutations,
};
