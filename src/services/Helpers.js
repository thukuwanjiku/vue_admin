import axios from "axios";
import store from "@/store";
import api from "@/services/api";
import {apiRoutes} from "@/services/apiRoutes";

/* --------------------------
* Variables
* --------------------------
* */
const materialIconsNamesUrl = "https://raw.githubusercontent.com/google/material-design-icons/master/font/MaterialIcons-Regular.codepoints";
const socialPlatforms = [
    "instagram","facebook","whatsapp","linkedin","youtube","twitter",
];
const isSmallScreen = window.innerWidth <= 768;

/*
* Export Variables
* */
export {
    socialPlatforms, isSmallScreen
};


/* --------------------------
* Functions
* --------------------------
* */
export function fetchExploreHubCompanies(){
    //show loader
    store.commit("exploreHub/SET_IS_FETCHING_COMPANIES", true);

    //make api call
    api.get(apiRoutes.GET_EXPLORE_LISTED_COMPANIES)
            .then(response => {
                store.commit("exploreHub/STORE_EXPLORE_LISTED_COMPANIES", response.data.data);

                //dismiss loader
                store.commit("exploreHub/SET_IS_FETCHING_COMPANIES", false);
            })
            .catch(error => store.commit("exploreHub/SET_IS_FETCHING_COMPANIES", false));
}
export function fetchExploreHubArchivedCompanies(){
    //show loader
    store.commit("exploreHub/SET_IS_FETCHING_ARCHIVED_COMPANIES", true);

    //make api call
    api.get(apiRoutes.EXPLORE_HUB_ARCHIVED_COMPANIES)
            .then(response => {
                store.commit("exploreHub/STORE_ARCHIVED_COMPANIES", response.data);

                //dismiss loader
                store.commit("exploreHub/SET_IS_FETCHING_ARCHIVED_COMPANIES", false);
            })
            .catch(error => store.commit("exploreHub/SET_IS_FETCHING_ARCHIVED_COMPANIES", false));
}
export function fetchExploreHubListingCategories(){
    //show loading overlay
    store.commit('exploreHub/SET_IS_FETCHING_CATEGORIES', true);

    api.get(apiRoutes.EXPLORE_HUB_FETCH_LISTING_CATEGORIES)
            .then(response => {
                //store data in vuex store
                store.commit('exploreHub/STORE_EXPLORE_LISTING_CATEGORIES', response.data.data);
                //dismiss loading
                store.commit('exploreHub/SET_IS_FETCHING_CATEGORIES', false);
            })
            .catch(error => store.commit('exploreHub/SET_IS_FETCHING_CATEGORIES', false));
}
export function fetchExploreHubActiveListings(payload){
    //show loader
    store.commit('exploreHub/SET_IS_ACTIVE_LISTINGS_LOADING', true);

    //make api call
    api.post(apiRoutes.EXPLORE_HUB_FETCH_LISTINGS, payload)
            .then(response => {
                //store fetched listings
                store.commit('exploreHub/STORE_ACTIVE_LISTINGS', response.data.data);

                //store current filters
                store.commit('exploreHub/STORE_ACTIVE_LISTINGS_FILTERS', response.data.filters);

                //dismiss loader
                store.commit('exploreHub/SET_IS_ACTIVE_LISTINGS_LOADING', false);
            }).catch(error => store.commit('exploreHub/SET_IS_ACTIVE_LISTINGS_LOADING', false))
}
export function fetchExploreHubArchivedListings(){
    //show loader
    store.commit("exploreHub/SET_IS_ARCHIVED_LISTINGS_LOADING", true);

    //make api call
    api.get(apiRoutes.EXPLORE_HUB_ARCHIVED_LISTINGS)
            .then(response => {
                store.commit("exploreHub/STORE_ARCHIVED_LISTINGS", response.data);

                //dismiss loader
                store.commit("exploreHub/SET_IS_ARCHIVED_LISTINGS_LOADING", false);
            })
            .catch(error => store.commit("exploreHub/SET_IS_ARCHIVED_LISTINGS_LOADING", false));
}

export function fetchInvestmentHubCompanies(){
    //show loader
    store.commit("investmentHub/SET_IS_FETCHING_COMPANIES", true);

    //make api call
    api.get(apiRoutes.GET_INVESTMENT_HUB_LISTED_COMPANIES)
            .then(response => {
                store.commit("investmentHub/STORE_LISTED_COMPANIES", response.data.data);

                //dismiss loader
                store.commit("investmentHub/SET_IS_FETCHING_COMPANIES", false);
            })
            .catch(error => store.commit("investmentHub/SET_IS_FETCHING_COMPANIES", false));
}
export function fetchInvestmentHubArchivedCompanies(){
    //show loader
    store.commit("investmentHub/SET_IS_FETCHING_ARCHIVED_COMPANIES", true);

    //make api call
    api.get(apiRoutes.INVESTMENT_HUB_ARCHIVED_COMPANIES)
            .then(response => {
                store.commit("investmentHub/STORE_ARCHIVED_COMPANIES", response.data);

                //dismiss loader
                store.commit("investmentHub/SET_IS_FETCHING_ARCHIVED_COMPANIES", false);
            })
            .catch(error => store.commit("investmentHub/SET_IS_FETCHING_ARCHIVED_COMPANIES", false));
}
export function fetchInvestmentHubListingCategories(){
    //show loading overlay
    store.commit('investmentHub/SET_IS_FETCHING_CATEGORIES', true);

    api.get(apiRoutes.INVESTMENT_HUB_FETCH_LISTING_CATEGORIES)
            .then(response => {
                //store data in vuex store
                store.commit('investmentHub/STORE_LISTING_CATEGORIES', response.data.data);
                //dismiss loading
                store.commit('investmentHub/SET_IS_FETCHING_CATEGORIES', false);
            })
            .catch(error => store.commit('investmentHub/SET_IS_FETCHING_CATEGORIES', false));
}
export function fetchInvestmentHubActiveListings(payload){
    //show loader
    store.commit('investmentHub/SET_IS_ACTIVE_LISTINGS_LOADING', true);

    //make api call
    api.post(apiRoutes.INVESTMENT_HUB_FETCH_LISTINGS, payload)
            .then(response => {
                //store fetched listings
                store.commit('investmentHub/STORE_ACTIVE_LISTINGS', response.data.data);

                //store current filters
                store.commit('investmentHub/STORE_ACTIVE_LISTINGS_FILTERS', response.data.filters);

                //dismiss loader
                store.commit('investmentHub/SET_IS_ACTIVE_LISTINGS_LOADING', false);
            }).catch(error => store.commit('investmentHub/SET_IS_ACTIVE_LISTINGS_LOADING', false))
}
export function fetchInvestmentHubArchivedListings(){
    //show loader
    store.commit("investmentHub/SET_IS_FETCHING_ARCHIVED_LISTINGS", true);

    //make api call
    api.get(apiRoutes.INVESTMENT_HUB_ARCHIVED_LISTINGS)
            .then(response => {
                store.commit("investmentHub/STORE_ARCHIVED_LISTINGS", response.data);

                //dismiss loader
                store.commit("investmentHub/SET_IS_FETCHING_ARCHIVED_LISTINGS", false);
            })
            .catch(error => store.commit("investmentHub/SET_IS_FETCHING_ARCHIVED_LISTINGS", false));
}

export function fetchRoles(){
    store.commit('auth/SET_IS_FETCHING_ROLES', true);

    //show loading overlay
    api.get(apiRoutes.LIST_ROLES)
            .then(response => {
                //store data in vuex store
                store.commit('auth/STORE_ROLES', response.data);
                //dismiss loading
                store.commit('auth/SET_IS_FETCHING_ROLES', false);
            })
            .catch(error => store.commit('auth/SET_IS_FETCHING_ROLES', false));
}
export function fetchUsers(){
    store.commit('auth/SET_IS_FETCHING_USERS', true);

    //show loading overlay
    api.get(apiRoutes.LIST_USERS)
            .then(response => {
                //store data in vuex store
                store.commit('auth/STORE_USERS', response.data);
                //dismiss loading
                store.commit('auth/SET_IS_FETCHING_USERS', false);
            })
            .catch(error => store.commit('auth/SET_IS_FETCHING_USERS', false));
}
export function fetchSignedInUserPermissions(){
    api.get(apiRoutes.SIGNEDIN_USER_PERMISSIONS)
            .then(response => {
                //store data in vuex store
                store.commit('auth/STORE_PERMISSIONS', response.data);
            })
            .catch(error => {});
}

export function checkHasPermission(permission){
    return store.getters["auth/isSuperAdmin"]
            || store.state.auth.permissions.includes(permission);
}
export function hasPermissionsWhichContain(searchPermissions = []){
    if(store.getters["auth/isSuperAdmin"]) return true;
    if(!searchPermissions.length) return false;

    return searchPermissions.filter(perm => perm.length)
            .reduce((accumulator, current)=>{
                return accumulator || store.state.auth.permissions.some(perm => perm.includes(current));
            }, false);
}

export function fetchMaterialIconsNames(){
    //fetch material icons data
    axios.get(materialIconsNamesUrl)
            .then((response) => {
                const materialIconsData = response.data;
                const lines = materialIconsData.split('\n');
                const names = lines.map((line) => {
                    const parts = line.split(' ');
                    return parts[0];
                });

                //store names in vuex store
                store.commit('shared/STORE_MATERIAL_ICONS_NAMES', names);
            });
}
export function randomString (length = 12) {
    let text = "";
    let possible = "A0zBCDy1EFx2GHx3wIJvKL4uMNtOs5PrQR6qSTpU7oVWnXm8YZab9cdefghijkl";
    for (let i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
export function moneyFormatter(amount, currency='' , floating_points = null) {
    //define decimal places to round off the value to
    let dp = parseInt(floating_points) || 0;
    //format the value passed
    let formattedAmount = (new Intl.NumberFormat()).format(parseFloat(amount).toFixed(dp));
    //for whole numbers without a decimal, the Intl.NumberFormat method fails to apply decimal places, apply them manuall
    /*if (dp > 0 && !formattedAmount.includes('.')) {
        let extraZeroes = "00000000";
        formattedAmount = formattedAmount + "." + extraZeroes.substr(0, dp);
    }*/
    //return formatted value plus the business currency
    return (currency ? currency + " " : '') + formattedAmount;
}
export function getNameInitials(fullName, numOfInitials = 2) {
    // Split the full name into an array of words
    const nameParts = fullName.trim().split(/\s+/);

    // Get the initials of the name parts
    const initials = nameParts.map(part => part[0].toUpperCase());

    // Join the available initials up to the requested number and return it
    return initials.slice(0, numOfInitials).join('');
}