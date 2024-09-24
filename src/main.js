import { createApp } from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import router from './router'
import store from './store'
import {startIdleTracking} from "@/services/idleAppLockTimer";

//import element plus ui kit
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//import additional css
import "@/assets/css/app.css";
import {fetchSignedInUserPermissions} from "@/services/Helpers";

createApp(App)
        .use(store)
        .use(router)
        .use(ElementPlus)
        .mount('#app')

//start idle timer
startIdleTracking();

//if there's a signed in user and their permissions aren't fetched, fetch them
if(store.getters["auth/isAuthenticated"] && !store.state.auth.permissions.length){
    fetchSignedInUserPermissions();
}
//if the app is loaded on an unprotected route, set empty permissions so that the app can load
if(!router.currentRoute.value.meta.requiresAuth){
    console.log('Setting empty permissions for unprotected route');
    store.commit("auth/STORE_PERMISSIONS", []);
}