import Main from "@/views/Main.vue";

const pageTitleSuffix = "- MyZola Admin";

export default [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/auth/Login.vue'),
        meta: {
            title: `Login ${pageTitleSuffix}`
        }
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
                component: () => import('../views/Dashboard.vue'),
                meta: {
                    title: `Dashboard ${pageTitleSuffix}`
                }
            },

            //Explore Hub Routes
            {
                path: 'explore',
                children: [
                    {
                        path: 'companies',
                        children: [
                            {
                                path: "",
                                name: 'explore.companies',
                                component: ()=> import('@/views/explore/companies/List.vue'),
                                meta: {
                                    title: `Explore Hub: Listed Companies ${pageTitleSuffix}`
                                }
                            },
                            {
                                path: "add",
                                name: 'explore.companies.add',
                                component: ()=> import('@/views/explore/companies/Add.vue'),
                                meta: {
                                    title: `Explore Hub: Add Company ${pageTitleSuffix}`
                                }
                            },
                            {
                                path: ":name_slug",
                                name: 'explore.companies.view',
                                component: ()=> import('@/views/explore/companies/View.vue'),
                                props: true,
                                meta: {
                                    title: `Explore Hub: View Company ${pageTitleSuffix}`
                                }
                            }
                        ]
                    },
                    {
                        path: 'listings',
                        name: 'explore.listings',
                        component: ()=> import('@/views/explore/Listings.vue'),
                        meta: {
                            title: `Explore Hub: Listings ${pageTitleSuffix}`
                        }
                    }
                ]
            }
        ]
    },
]