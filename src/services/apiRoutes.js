//determine the base URL base on the env
//const baseUrl = 'http://zola-api.codebreeze.co.ke/api/admin';
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
    DELETE_EXPLORE_LISTED_COMPANY: `${apiBaseUrl}/explore-hub/delete-listed-company`,
};

export { baseUrl, apiBaseUrl, apiRoutes };