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
    EXPLORE_HUB_COMPANY_REVIEWS: `${apiBaseUrl}/explore-hub/company-reviews`,
    EXPLORE_HUB_COMPANY_REVIEWS_SUMMARY: `${apiBaseUrl}/explore-hub/company-reviews-summary`,

    EXPLORE_HUB_ADD_LISTING_CATEGORIES: `${apiBaseUrl}/explore-hub/add-listing-categories`,
    EXPLORE_HUB_FETCH_LISTING_CATEGORIES: `${apiBaseUrl}/explore-hub/get-listing-categories`,
    EXPLORE_HUB_EDIT_LISTING_CATEGORY: `${apiBaseUrl}/explore-hub/edit-listing-category`,
    EXPLORE_HUB_DELETE_LISTING_CATEGORIES: `${apiBaseUrl}/explore-hub/delete-listing-categories`,

    EXPLORE_HUB_FETCH_LISTINGS: `${apiBaseUrl}/explore-hub/get-listings`,
    EXPLORE_HUB_ADD_LISTING: `${apiBaseUrl}/explore-hub/add-listing`,
    EXPLORE_HUB_EDIT_LISTING: `${apiBaseUrl}/explore-hub/edit-listing`,
    EXPLORE_HUB_ARCHIVE_LISTING: `${apiBaseUrl}/explore-hub/archive-listing`,
    EXPLORE_HUB_ADD_LISTING_PAYMENTS: `${apiBaseUrl}/explore-hub/add-listing-payments`,
    EXPLORE_HUB_ADD_LISTING_MEDIA: `${apiBaseUrl}/explore-hub/add-listing-media`,
    EXPLORE_HUB_LISTING_REVIEWS: `${apiBaseUrl}/explore-hub/listing-reviews`,
    EXPLORE_HUB_LISTING_REVIEWS_SUMMARY: `${apiBaseUrl}/explore-hub/listing-reviews-summary`,
    EXPLORE_HUB_REPORTED_LISTINGS: `${apiBaseUrl}/explore-hub/reported-listings`,
    EXPLORE_HUB_LISTING_REPORTS: `${apiBaseUrl}/explore-hub/listing-reports`,


    //Investment hub
    GET_INVESTMENT_HUB_LISTED_COMPANIES: `${apiBaseUrl}/investment-hub/get-listed-companies`,
    ADD_INVESTMENT_HUB_LISTED_COMPANY: `${apiBaseUrl}/investment-hub/add-listed-company`,
    EDIT_INVESTMENT_HUB_LISTED_COMPANY: `${apiBaseUrl}/investment-hub/edit-listed-company`,
    DELETE_INVESTMENT_HUB_LISTED_COMPANY: `${apiBaseUrl}/investment-hub/delete-listed-company`,
    INVESTMENT_HUB_COMPANY_REVIEWS: `${apiBaseUrl}/investment-hub/company-reviews`,
    INVESTMENT_HUB_COMPANY_REVIEWS_SUMMARY: `${apiBaseUrl}/investment-hub/company-reviews-summary`,

    INVESTMENT_HUB_ADD_LISTING_CATEGORIES: `${apiBaseUrl}/investment-hub/add-listing-categories`,
    INVESTMENT_HUB_FETCH_LISTING_CATEGORIES: `${apiBaseUrl}/investment-hub/get-listing-categories`,
    INVESTMENT_HUB_EDIT_LISTING_CATEGORY: `${apiBaseUrl}/investment-hub/edit-listing-category`,
    INVESTMENT_HUB_DELETE_LISTING_CATEGORIES: `${apiBaseUrl}/investment-hub/delete-listing-categories`,

    INVESTMENT_HUB_FETCH_LISTINGS: `${apiBaseUrl}/investment-hub/get-listings`,
    INVESTMENT_HUB_ADD_LISTING: `${apiBaseUrl}/investment-hub/add-listing`,
    INVESTMENT_HUB_EDIT_LISTING: `${apiBaseUrl}/investment-hub/edit-listing`,
    INVESTMENT_HUB_ARCHIVE_LISTING: `${apiBaseUrl}/investment-hub/archive-listing`,
    INVESTMENT_HUB_ADD_LISTING_PAYMENTS: `${apiBaseUrl}/investment-hub/add-listing-payments`,
    INVESTMENT_HUB_ADD_LISTING_MEDIA: `${apiBaseUrl}/investment-hub/add-listing-media`,
    INVESTMENT_HUB_LISTING_REVIEWS: `${apiBaseUrl}/investment-hub/listing-reviews`,
    INVESTMENT_HUB_LISTING_REVIEWS_SUMMARY: `${apiBaseUrl}/investment-hub/listing-reviews-summary`,
    INVESTMENT_HUB_REPORTED_LISTINGS: `${apiBaseUrl}/investment-hub/reported-listings`,
    INVESTMENT_HUB_LISTING_REPORTS: `${apiBaseUrl}/investment-hub/listing-reports`,


    /* ---------------------------------------
    * ACCESS CONTROL ROUTES
    * ---------------------------------------
    * */
    //Roles
    LIST_ROLES: `${apiBaseUrl}/roles/list`,
    ADD_NEW_ROLES: `${apiBaseUrl}/roles/add-roles`,
    EDIT_ROLE: `${apiBaseUrl}/roles/edit-role`,
    DELETE_ROLES: `${apiBaseUrl}/roles/delete-roles`,

    //Permissions
    GET_ROLE_PERMISSIONS: `${apiBaseUrl}/permissions/get-role-permissions`,
    SAVE_ROLE_PERMISSIONS: `${apiBaseUrl}/permissions/save-role-permissions`,

    //Users
    LIST_USERS: `${apiBaseUrl}/users/list`,
    INVITE_USERS: `${apiBaseUrl}/users/invite-users`,
    VALIDATE_INVITE_TOKEN: `${apiBaseUrl}/users/validate-invite-token`,
    ACCEPT_INVITE: `${apiBaseUrl}/users/accept-invite`,
};

export { baseUrl, apiBaseUrl, apiRoutes };