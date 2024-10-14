//determine the base URL base on the env
/*
* POSSIBLE BASE URLS (for easy copy-pasting)
* https://zola-api.codebreeze.co.ke
* https://staging.myzola.io
* http://127.0.0.1:8000
*
* */
const baseUrl = process.env.NODE_ENV === "development" ? process.env.VUE_APP_API_BASE_URL : "https://staging.myzola.io";

const apiBaseUrl = `${baseUrl}/api/admin`;

//define the api routes
const apiRoutes = {
    SANCTUM_CSRF_TOKEN: `${baseUrl}/sanctum/csrf-cookie`,

    LOGIN: `${apiBaseUrl}/auth/login`,

    /* -----------------------------
     * EXPLORE HUB COMPANIES
     * -----------------------------
     * */
    GET_EXPLORE_LISTED_COMPANIES: `${apiBaseUrl}/explore-hub/get-listed-companies`,
    ADD_EXPLORE_LISTED_COMPANY: `${apiBaseUrl}/explore-hub/add-listed-company`,
    EDIT_EXPLORE_LISTED_COMPANY: `${apiBaseUrl}/explore-hub/edit-listed-company`,
    ARCHIVE_EXPLORE_LISTED_COMPANY: `${apiBaseUrl}/explore-hub/archive-listed-company`,
    DELETE_EXPLORE_LISTED_COMPANY: `${apiBaseUrl}/explore-hub/delete-listed-company`,
    EXPLORE_HUB_COMPANY_REVIEWS: `${apiBaseUrl}/explore-hub/company-reviews`,
    EXPLORE_HUB_COMPANY_REVIEWS_SUMMARY: `${apiBaseUrl}/explore-hub/company-reviews-summary`,
    EXPLORE_HUB_ARCHIVED_COMPANIES: `${apiBaseUrl}/explore-hub/get-archived-companies`,
    EXPLORE_HUB_RESTORE_ARCHIVED_COMPANY: `${apiBaseUrl}/explore-hub/restore-archived-company`,
    EXPLORE_HUB_DELETE_ARCHIVED_COMPANY: `${apiBaseUrl}/explore-hub/delete-archived-company`,

    /* -----------------------------
     * EXPLORE HUB LISTING CATEGORIES
     * -----------------------------
     * */
    EXPLORE_HUB_ADD_LISTING_CATEGORIES: `${apiBaseUrl}/explore-hub/add-listing-categories`,
    EXPLORE_HUB_FETCH_LISTING_CATEGORIES: `${apiBaseUrl}/explore-hub/get-listing-categories`,
    EXPLORE_HUB_EDIT_LISTING_CATEGORY: `${apiBaseUrl}/explore-hub/edit-listing-category`,
    EXPLORE_HUB_DELETE_LISTING_CATEGORIES: `${apiBaseUrl}/explore-hub/delete-listing-categories`,

    /* -----------------------------
     * EXPLORE HUB LISTINGS
     * -----------------------------
     * */
    EXPLORE_HUB_FETCH_LISTINGS: `${apiBaseUrl}/explore-hub/get-listings`,
    EXPLORE_HUB_ADD_LISTING: `${apiBaseUrl}/explore-hub/add-listing`,
    EXPLORE_HUB_EDIT_LISTING: `${apiBaseUrl}/explore-hub/edit-listing`,
    EXPLORE_HUB_ARCHIVE_LISTING: `${apiBaseUrl}/explore-hub/archive-listing`,
    EXPLORE_HUB_DELETE_LISTING: `${apiBaseUrl}/explore-hub/delete-listing`,
    EXPLORE_HUB_ADD_LISTING_PAYMENTS: `${apiBaseUrl}/explore-hub/add-listing-payments`,
    EXPLORE_HUB_ADD_LISTING_MEDIA: `${apiBaseUrl}/explore-hub/add-listing-media`,
    EXPLORE_HUB_REPORTED_LISTINGS: `${apiBaseUrl}/explore-hub/reported-listings`,
    EXPLORE_HUB_LISTING_REPORTS: `${apiBaseUrl}/explore-hub/listing-reports`,
    EXPLORE_HUB_ARCHIVED_LISTINGS: `${apiBaseUrl}/explore-hub/get-archived-listings`,
    EXPLORE_HUB_RESTORE_ARCHIVED_LISTING: `${apiBaseUrl}/explore-hub/restore-archived-listing`,
    EXPLORE_HUB_DELETE_ARCHIVED_LISTING: `${apiBaseUrl}/explore-hub/delete-archived-listing`,
    EXPLORE_HUB_SUBMIT_LISTING_FOR_APPROVAL: `${apiBaseUrl}/explore-hub/submit-listing-for-approval`,
    EXPLORE_HUB_APPROVE_LISTING: `${apiBaseUrl}/explore-hub/approve-listing`,
    EXPLORE_HUB_REJECT_LISTING: `${apiBaseUrl}/explore-hub/reject-listing`,
    EXPLORE_HUB_PENDING_REVIEWS: `${apiBaseUrl}/explore-hub/pending-reviews`,
    EXPLORE_HUB_APPROVE_PENDING_REVIEW: `${apiBaseUrl}/explore-hub/approve-pending-review`,
    EXPLORE_HUB_REJECT_PENDING_REVIEW: `${apiBaseUrl}/explore-hub/reject-pending-review`,
    EXPLORE_HUB_LISTINGS_WITH_APPROVED_REVIEWS: `${apiBaseUrl}/explore-hub/listings-with-approved-reviews`,
    EXPLORE_HUB_LISTING_REVIEWS: `${apiBaseUrl}/explore-hub/listing-reviews`,
    EXPLORE_HUB_LISTING_REVIEWS_SUMMARY: `${apiBaseUrl}/explore-hub/listing-reviews-summary`,


    /* -----------------------------
     * INVESTMENT HUB COMPANIES
     * -----------------------------
     * */
    GET_INVESTMENT_HUB_LISTED_COMPANIES: `${apiBaseUrl}/investment-hub/get-listed-companies`,
    ADD_INVESTMENT_HUB_LISTED_COMPANY: `${apiBaseUrl}/investment-hub/add-listed-company`,
    EDIT_INVESTMENT_HUB_LISTED_COMPANY: `${apiBaseUrl}/investment-hub/edit-listed-company`,
    ARCHIVE_INVESTMENT_HUB_LISTED_COMPANY: `${apiBaseUrl}/investment-hub/archive-listed-company`,
    DELETE_INVESTMENT_HUB_LISTED_COMPANY: `${apiBaseUrl}/investment-hub/delete-listed-company`,
    INVESTMENT_HUB_COMPANY_REVIEWS: `${apiBaseUrl}/investment-hub/company-reviews`,
    INVESTMENT_HUB_COMPANY_REVIEWS_SUMMARY: `${apiBaseUrl}/investment-hub/company-reviews-summary`,
    INVESTMENT_HUB_ARCHIVED_COMPANIES: `${apiBaseUrl}/investment-hub/get-archived-companies`,
    INVESTMENT_HUB_RESTORE_ARCHIVED_COMPANY: `${apiBaseUrl}/investment-hub/restore-archived-company`,
    INVESTMENT_HUB_DELETE_ARCHIVED_COMPANY: `${apiBaseUrl}/investment-hub/delete-archived-company`,

    /* -----------------------------
     * INVESTMENT HUB LISTING CATEGORIES
     * -----------------------------
     * */
    INVESTMENT_HUB_ADD_LISTING_CATEGORIES: `${apiBaseUrl}/investment-hub/add-listing-categories`,
    INVESTMENT_HUB_FETCH_LISTING_CATEGORIES: `${apiBaseUrl}/investment-hub/get-listing-categories`,
    INVESTMENT_HUB_EDIT_LISTING_CATEGORY: `${apiBaseUrl}/investment-hub/edit-listing-category`,
    INVESTMENT_HUB_DELETE_LISTING_CATEGORIES: `${apiBaseUrl}/investment-hub/delete-listing-categories`,

    /* -----------------------------
     * INVESTMENT HUB LISTINGS
     * -----------------------------
     * */
    INVESTMENT_HUB_FETCH_LISTINGS: `${apiBaseUrl}/investment-hub/get-listings`,
    INVESTMENT_HUB_ADD_LISTING: `${apiBaseUrl}/investment-hub/add-listing`,
    INVESTMENT_HUB_EDIT_LISTING: `${apiBaseUrl}/investment-hub/edit-listing`,
    INVESTMENT_HUB_ARCHIVE_LISTING: `${apiBaseUrl}/investment-hub/archive-listing`,
    INVESTMENT_HUB_DELETE_LISTING: `${apiBaseUrl}/investment-hub/delete-listing`,
    INVESTMENT_HUB_ADD_LISTING_PAYMENTS: `${apiBaseUrl}/investment-hub/add-listing-payments`,
    INVESTMENT_HUB_ADD_LISTING_MEDIA: `${apiBaseUrl}/investment-hub/add-listing-media`,
    INVESTMENT_HUB_REPORTED_LISTINGS: `${apiBaseUrl}/investment-hub/reported-listings`,
    INVESTMENT_HUB_LISTING_REPORTS: `${apiBaseUrl}/investment-hub/listing-reports`,
    INVESTMENT_HUB_ARCHIVED_LISTINGS: `${apiBaseUrl}/investment-hub/get-archived-listings`,
    INVESTMENT_HUB_RESTORE_ARCHIVED_LISTING: `${apiBaseUrl}/investment-hub/restore-archived-listing`,
    INVESTMENT_HUB_DELETE_ARCHIVED_LISTING: `${apiBaseUrl}/investment-hub/delete-archived-listing`,
    INVESTMENT_HUB_SUBMIT_LISTING_FOR_APPROVAL: `${apiBaseUrl}/investment-hub/submit-listing-for-approval`,
    INVESTMENT_HUB_APPROVE_LISTING: `${apiBaseUrl}/investment-hub/approve-listing`,
    INVESTMENT_HUB_REJECT_LISTING: `${apiBaseUrl}/investment-hub/reject-listing`,
    INVESTMENT_HUB_PENDING_REVIEWS: `${apiBaseUrl}/investment-hub/pending-reviews`,
    INVESTMENT_HUB_APPROVE_PENDING_REVIEW: `${apiBaseUrl}/investment-hub/approve-pending-review`,
    INVESTMENT_HUB_REJECT_PENDING_REVIEW: `${apiBaseUrl}/investment-hub/reject-pending-review`,
    INVESTMENT_HUB_LISTINGS_WITH_APPROVED_REVIEWS: `${apiBaseUrl}/investment-hub/listings-with-approved-reviews`,
    INVESTMENT_HUB_LISTING_REVIEWS: `${apiBaseUrl}/investment-hub/listing-reviews`,
    INVESTMENT_HUB_LISTING_REVIEWS_SUMMARY: `${apiBaseUrl}/investment-hub/listing-reviews-summary`,

    /* -----------------------------
     * CUSTOMER CARE
     * -----------------------------
     * */
    GET_CUSTOMER_CONVERSATIONS: `${apiBaseUrl}/customer-care/get-admin-chat-conversations`,
    GET_CONVERSATION_MESSAGES: `${apiBaseUrl}/customer-care/get-conversation-messages`,
    SEND_MESSAGE_TO_CUSTOMER: `${apiBaseUrl}/customer-care/send-message-to-customer`,


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
    SIGNEDIN_USER_PERMISSIONS: `${apiBaseUrl}/permissions/auth-user`,

    //Users
    LIST_USERS: `${apiBaseUrl}/users/list`,
    INVITE_USERS: `${apiBaseUrl}/users/invite-users`,
    VALIDATE_INVITE_TOKEN: `${apiBaseUrl}/users/validate-invite-token`,
    ACCEPT_INVITE: `${apiBaseUrl}/users/accept-invite`,
    SET_USER_ROLES: `${apiBaseUrl}/users/set-roles`,
    DELETE_USER: `${apiBaseUrl}/users/delete-user`,
};

export { baseUrl, apiBaseUrl, apiRoutes };
