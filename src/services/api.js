import axios from "axios";
import store from "@/store";
import { baseUrl, apiRoutes } from "@/services/apiRoutes";
import router from "@/router";


//create axios instance
const api = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    withXSRFToken: true
});

//define routes which are exempted from Authorization
const exemptedRoutes = [
    apiRoutes.LOGIN, apiRoutes.SANCTUM_CSRF_TOKEN
];

//define interceptors for adding Authorization headers
api.interceptors
        .request
        .use(
        (config) => {
            if (!exemptedRoutes.includes(config.url)) {
                const token = store.state.auth.accessToken;
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }

            //set content type & accept headers
            config.headers.Accept = "application/json";
            //config.headers["Content-Type"] = "application/json";

            //since they user is constantly using the app, extend the expiry time
            store.commit('auth/EXTEND_TOKEN_EXPIRY');

            return config;
        },
        (error) => Promise.reject(error)
);

//add interceptors for response
api.interceptors.response.use(
        (response) => {
            // do something i.e. return data object
            return response
        },
        (error) => {
            //attempt to extract the error message
            let message = error.response?.data?.message ?? error.message ?? "An error occurred";

            /*if (error?.response?.status === 408) {
                console.log("Request timed out");
            }*/
            if (error?.response?.status === 401) {
                $.growl.error({ message: "You session has expired, please login and continue" });
                store.commit('auth/LOGOUT');
                router.replace({name: 'login'});
                throw error;
            }
            if (error?.response?.status === 422) {
                $.growl.warning({message});
                throw error;
            }
            if (error?.response?.status === 403) {
                $.growl.warning({message: "Oops! It looks like you don’t have permission to do that. Contact your admin to request access."});
                throw error;
            }

            if (error?.response?.status === 413) {
                $.growl.warning({message: "Please upload a file that is 1MB or less in size."});
                throw error;
            }

            $.growl.error({message});
            throw error;
        })

export default api;
