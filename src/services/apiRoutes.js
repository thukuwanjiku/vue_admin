//determine the base URL base on the env
const baseUrl = process.env.NODE_ENV === 'production'
        ? 'https://zola-api.codebreeze.co.ke/api/admin'
        : 'https://zola-api.codebreeze.co.ke/api/admin';

//define the api routes
const apiRoutes = {
    LOGIN: `${baseUrl}/auth/login`,

    //Explore hub
    GET_EXPLORE_LISTED_COMPANIES: `${baseUrl}/explore-hub/get-listed-companies`,
    ADD_EXPLORE_LISTED_COMPANY: `${baseUrl}/explore-hub/add-listed-company`,
    DELETE_EXPLORE_LISTED_COMPANY: `${baseUrl}/explore-hub/delete-listed-company`,
};

export { baseUrl, apiRoutes };