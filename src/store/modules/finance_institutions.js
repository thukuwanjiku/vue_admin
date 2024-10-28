const state = {
    institutions: [],
    isFetchingInstitutions: false,
}

const mutations = {
    STORE_INSTITUTIONS: (state, data)=> state.institutions = data,
    SET_IS_FETCHING_INSTITUTIONS: (state, value)=> state.isFetchingInstitutions = value,
}

export default {
    namespaced: true,
    state,
    mutations,
};
