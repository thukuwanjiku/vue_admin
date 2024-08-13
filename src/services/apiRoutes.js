//determine the base URL base on the env
const baseUrl = process.env.NODE_ENV === 'production'
        ? 'https://staging.myzola.io/api/admin'
        : 'http://localhost:8000/api/admin';

//define the api routes
const apiRoutes = {
    login: `${baseUrl}/auth/login`,
};

export { baseUrl, apiRoutes };