//determine the base URL base on the env
/*
* POSSIBLE BASE URLS (for easy copy-pasting)
* https://zola-api.codebreeze.co.ke
* https://staging.myzola.io
* http://127.0.0.1:8000
*
* */
const baseUrl = process.env.NODE_ENV === 'production'
        ? 'https://staging.myzola.io'
        : 'http://127.0.0.1:8000';

const apiBaseUrl = `${baseUrl}/api/admin`;

//define the api routes
const apiRoutes = {
    SANCTUM_CSRF_TOKEN: `${baseUrl}/sanctum/csrf-cookie`,

    LOGIN: `${apiBaseUrl}/auth/login`,

    //Explore hub
    GET_EXPLORE_LISTED_COMPANIES: `${apiBaseUrl}/explore-hub/get-listed-companies`,
    ADD_EXPLORE_LISTED_COMPANY: `${apiBaseUrl}/explore-hub/add-listed-company`,
    EDIT_EXPLORE_LISTED_COMPANY: `${apiBaseUrl}/explore-hub/edit-listed-company`,
    ARCHIVE_EXPLORE_LISTED_COMPANY: `${apiBaseUrl}/explore-hub/delete-listed-company`,
    //DELETE_EXPLORE_LISTED_COMPANY: `${apiBaseUrl}/explore-hub/delete-listed-company`,

    EXPLORE_HUB_ADD_LISTING_CATEGORIES: `${apiBaseUrl}/explore-hub/add-listing-categories`,
    EXPLORE_HUB_FETCH_LISTING_CATEGORIES: `${apiBaseUrl}/explore-hub/get-listing-categories`,
    EXPLORE_HUB_EDIT_LISTING_CATEGORY: `${apiBaseUrl}/explore-hub/edit-listing-category`,
    EXPLORE_HUB_DELETE_LISTING_CATEGORIES: `${apiBaseUrl}/explore-hub/delete-listing-categories`,

    EXPLORE_HUB_FETCH_LISTINGS: `${apiBaseUrl}/explore-hub/get-listings`,
    EXPLORE_HUB_ADD_LISTING: `${apiBaseUrl}/explore-hub/add-listing`,
    EXPLORE_HUB_EDIT_LISTING: `${apiBaseUrl}/explore-hub/edit-listing`,


    //Investment hub
    GET_INVESTMENT_HUB_LISTED_COMPANIES: `${apiBaseUrl}/investment-hub/get-listed-companies`,
    ADD_INVESTMENT_HUB_LISTED_COMPANY: `${apiBaseUrl}/investment-hub/add-listed-company`,
    EDIT_INVESTMENT_HUB_LISTED_COMPANY: `${apiBaseUrl}/investment-hub/edit-listed-company`,
    DELETE_INVESTMENT_HUB_LISTED_COMPANY: `${apiBaseUrl}/investment-hub/delete-listed-company`,

    INVESTMENT_HUB_ADD_LISTING_CATEGORIES: `${apiBaseUrl}/investment-hub/add-listing-categories`,
    INVESTMENT_HUB_FETCH_LISTING_CATEGORIES: `${apiBaseUrl}/investment-hub/get-listing-categories`,
    INVESTMENT_HUB_EDIT_LISTING_CATEGORY: `${apiBaseUrl}/investment-hub/edit-listing-category`,
    INVESTMENT_HUB_DELETE_LISTING_CATEGORIES: `${apiBaseUrl}/investment-hub/delete-listing-categories`,
};

export { baseUrl, apiBaseUrl, apiRoutes };