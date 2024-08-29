const state = {

    materialIconsNames: [],

};

const mutations = {
    STORE_MATERIAL_ICONS_NAMES: (state, data)=> state.materialIconsNames = data,
};

export default {
    namespaced: true,
    state,
    mutations,
};