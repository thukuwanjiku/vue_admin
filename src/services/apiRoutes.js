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
        : 'https://zola-api.codebreeze.co.ke';

const apiBaseUrl = `${baseUrl}/api/admin`;

//define the api routes
const apiRoutes = {
    SANCTUM_CSRF_TOKEN: `${baseUrl}/sanctum/csrf-cookie`,

    LOGIN: `${apiBaseUrl}/auth/login`,

    //Explore hub
    GET_EXPLORE_LISTED_COMPANIES: `${apiBaseUrl}/explore-hub/get-listed-companies`,
    ADD_EXPLORE_LISTED_COMPANY: `${apiBaseUrl}/explore-hub/add-listed-company`,
    EDIT_EXPLORE_LISTED_COMPANY: `${apiBaseUrl}/explore-hub/edit-listed-company`,
    DELETE_EXPLORE_LISTED_COMPANY: `${apiBaseUrl}/explore-hub/delete-listed-company`,
    EXPLORE_HUB_ADD_LISTING_CATEGORIES: `${apiBaseUrl}/explore-hub/add-listing-categories`,
    EXPLORE_HUB_FETCH_LISTING_CATEGORIES: `${apiBaseUrl}/explore-hub/get-listing-categories`,
    EXPLORE_HUB_EDIT_LISTING_CATEGORY: `${apiBaseUrl}/explore-hub/edit-listing-category`,
    EXPLORE_HUB_DELETE_LISTING_CATEGORIES: `${apiBaseUrl}/explore-hub/edit-listing-category`,
};

export { baseUrl, apiBaseUrl, apiRoutes };