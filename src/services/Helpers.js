import axios from "axios";
import store from "@/store";
import api from "@/services/api";
import {apiRoutes} from "@/services/apiRoutes";

/* --------------------------
* Variables
* --------------------------
* */
const materialIconsNamesUrl = "https://raw.githubusercontent.com/google/material-design-icons/master/font/MaterialIcons-Regular.codepoints";



/* --------------------------
* Functions
* --------------------------
* */
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
export function fetchExploreListingCategories(){
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
export function randomString (length = 12) {
    let text = "";
    let possible = "A0zBCDy1EFx2GHx3wIJvKL4uMNtOs5PrQR6qSTpU7oVWnXm8YZab9cdefghijkl";
    for (let i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}