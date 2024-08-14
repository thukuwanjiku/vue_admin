import axios from "axios";
import store from "@/store";
import { baseUrl, apiRoutes } from "@/services/apiRoutes";
import router from "@/router";


//create axios instance
const api = axios.create({
    baseURL: baseUrl,
});

//define routes which are exempted from Authorization
const exemptedRoutes = [
    apiRoutes.LOGIN
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

            $.growl.error({message});
            throw error;
        })

export default api;