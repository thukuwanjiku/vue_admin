const state = {
    user: JSON.parse(localStorage.getItem('mz.admin')) || null,
    accessToken: localStorage.getItem('bearer_token') || null,
    isAppLocked: JSON.parse(localStorage.getItem('isAppLocked')) || false,

    roles:[],
    isFetchingRoles: false,

    users:[],
    isFetchingUsers: false,

    permissions: [],
    hasFetchedPermissions: false

};


const mutations = {
    STORE_AUTH_USER(state, user){
        state.user = user;

        //set token expiry time
        const expirationTime = Date.now() + 60 * 60 * 1000; // 1 hour from now
        localStorage.setItem('token_expires_at', expirationTime.toString());
    },
    STORE_AUTH_TOKEN(state, token){
        state.accessToken = token;
    },
    LOGOUT(state){
        state.user = null;
        state.accessToken = null;
        localStorage.removeItem('mz.admin');
        localStorage.removeItem('bearer_token');
        localStorage.removeItem('token_expires_at');
    },

    EXTEND_TOKEN_EXPIRY(){
        const newExpiryTime = Date.now() + 60 * 60 * 1000; // Extend by 1 hour
        localStorage.setItem('token_expires_at', newExpiryTime.toString());
    },
    LOCK_APP(state){
        state.isAppLocked = true;
        localStorage.setItem('isAppLocked', true);
    },
    UNLOCK_APP(state){
        state.isAppLocked = false;
        localStorage.setItem('isAppLocked', false);
    },

    STORE_ROLES: (state, data)=> state.roles = data,
    SET_IS_FETCHING_ROLES: (state, value)=> state.isFetchingRoles = value,

    STORE_USERS: (state, data)=> state.users = data,
    SET_IS_FETCHING_USERS: (state, value)=> state.isFetchingUsers = value,

    STORE_PERMISSIONS: (state, data)=> {
        state.permissions = data;
        state.hasFetchedPermissions = true
        //console.log('Set permissions', data);
    },
};

const getters = {
    isAuthenticated: (state) => !!state.accessToken,
    isTokenExpired: (_) => {
        const expiryTime = parseInt(localStorage.getItem('token_expires_at'), 10);
        return Date.now() > expiryTime;
    },
    isSuperAdmin: (state) => state.user && state.user.roles.find(role => role.name == 'super_admin')
}

export default {
    namespaced: true,
    state,
    mutations,
    getters
};