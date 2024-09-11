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