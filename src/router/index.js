import {createRouter, createWebHistory} from 'vue-router'
import Main from '../views/Main.vue'
import Dashboard from "@/views/Dashboard.vue";
import store from "@/store";
import routes from "@/router/routes";


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

//define auth protections for routes
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

    //Auth protection logic
    const isAuthenticated = store.getters["auth/isAuthenticated"];
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        next({ name: 'login' });
    } else {
        next();
    }
});

export default router
