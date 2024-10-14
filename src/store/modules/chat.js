const state = {
    conversations: [],
    selectedConversation: null,
    messages: [],
    isFetchingCustomerConversations: false,
    isFetchingConversationMessages: false,
}

const mutations = {
    SET_IS_FETCHING_CUSTOMER_CONVERSATIONS: (state, value)=> state.isFetchingCustomerConversations = value,
    STORE_CUSTOMER_CONVERSATIONS: (state, data)=> state.conversations = data,
    SET_IS_FETCHING_CONVERSATION_MESSAGES: (state, value)=> state.isFetchingConversationMessages = value,
    SET_SELECTED_CONVERSATION: (state, data)=> state.selectedConversation = data,
    STORE_CONVERSATION_MESSAGES: (state, data)=> state.messages = data,
}

export default {
    namespaced: true,
    state,
    mutations,
};
