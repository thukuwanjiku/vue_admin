import {createRouter, createWebHistory} from 'vue-router'
import Main from '../views/Main.vue'
import Dashboard from "@/views/Dashboard.vue";
import store from "@/store";

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/auth/Login.vue')
    },
    {
        path: '/',
        name: 'home',
        component: Main,
        meta: { requiresAuth: true },
        children: [
            {
                path: '/',
                name: 'dashboard',
                component: () => import('../views/Dashboard.vue')
            },

            //Explore Hub Routes
            {
                path: 'explore',
                children: [
                    {
                        path: 'companies',
                        name: 'explore.companies',
                        component: ()=> import('@/views/explore/ListedCompanies.vue')
                    },
                    {
                        path: 'listings',
                        name: 'explore.listings',
                        component: ()=> import('@/views/explore/Listings.vue')
                    }
                ]
            }
        ]
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

//define auth protections for routes
router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters.isAuthenticated;
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        next({ name: 'login' });
    } else {
        next();
    }
});

export default router
