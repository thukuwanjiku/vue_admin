//determine the base URL base on the env
const baseUrl = process.env.NODE_ENV === 'production'
        ? 'https://staging.myzola.io/api/admin'
        : 'http://localhost:8000/api/admin';

//define the api routes
const apiRoutes = {
    LOGIN: `${baseUrl}/auth/login`,

    //Explore hub
    GET_EXPLORE_LISTED_COMPANIES: `${baseUrl}/explore-hub/get-listed-companies`,
};

export { baseUrl, apiRoutes };