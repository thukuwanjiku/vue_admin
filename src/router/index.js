import {createRouter, createWebHistory} from 'vue-router'
import Main from '../views/Main.vue'
import Dashboard from "@/views/Dashboard.vue";
import store from "@/store";
import routes from "@/router/routes";
import {startIdleTracking, stopIdleTracking} from "@/services/idleAppLockTimer";


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})


/*----------------------------------------
* Define navigation guards for:
* 1. Auth, ensure user is logged in or redirect to login
* 2. App locked, if app is locked, correctly redirect to app lock page
* */
router.beforeEach((to, from, next) => {
    /*
    * Attempt to set the page title
    * */
    //check if route metas has title
    let title = to.meta.title || 'MyZola Admin';
    //check if page title was passed via route params
    if (to.params.title) {
        title = `${to.params.title}`;
    }
    //set page title
    document.title = title;

    //set favicon
    document.querySelector('link[rel="icon"]').href = '/favicon.ico';

    //Auth protection logic
    const isAuthenticated = store.getters["auth/isAuthenticated"];
    const isTokenExpired = store.getters["auth/isTokenExpired"];
    const isAppLocked = store.state.auth.isAppLocked;

    //checks for authentication and app locked status
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (isAuthenticated && !isTokenExpired) {
            // User is authenticated and the token is not expired

            // Check if app is locked
            if (isAppLocked && to.name !== 'app_locked') {
                // App is locked and not already on the app_locked page, redirect to app locked page
                next({ name: 'app_locked' });
            } else {
                // App is not locked or already on the app_locked page

                // Extend access token expiry date
                store.commit('auth/EXTEND_TOKEN_EXPIRY');

                // Start idle time tracking
                startIdleTracking();

                // Let user navigation proceed
                next();
            }
        } else {
            // User is not authenticated or the token is expired

            // Stop tracking idle time
            stopIdleTracking();

            // Redirect user to login page if not already on login page
            if (to.name !== 'login') {
                next({ name: 'login' });
            } else {
                next();
            }
        }
    } else {
        // Route does not require authentication
        next();
    }
});

export default router
