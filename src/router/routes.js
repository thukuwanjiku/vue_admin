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
                path: 'explore-hub',
                children: [
                    {
                        path: 'companies',
                        children: [
                            {
                                path: "",
                                name: 'explore_hub.companies',
                                component: ()=> import('@/views/explore/companies/Main.vue'),
                                meta: {
                                    title: `Explore Hub Companies ${pageTitleSuffix}`
                                },
                                children: [
                                    {
                                        path: "",
                                        name: 'explore_hub.companies.listed',
                                        components: {
                                            explore_companies_listed: ()=> import('@/views/explore/companies/listed/List.vue')
                                        },
                                        meta: {
                                            title: `Explore Hub: Listed Companies ${pageTitleSuffix}`
                                        }
                                    },
                                    {
                                        path: "add",
                                        name: 'explore_hub.companies.add',
                                        components: {
                                            explore_companies_listed: ()=> import('@/views/explore/companies/listed/Add.vue')
                                        },
                                        meta: {
                                            title: `Explore Hub: Add Company ${pageTitleSuffix}`
                                        }
                                    },
                                    {
                                        path: "edit",
                                        name: 'explore_hub.companies.edit',
                                        components: {
                                            explore_companies_listed: ()=> import('@/views/explore/companies/listed/Edit.vue')
                                        },
                                        meta: {
                                            title: `Explore Hub: Edit Company ${pageTitleSuffix}`
                                        }
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        path: 'categories',
                        children: [
                            {
                                path: "",
                                name: 'explore_hub.categories',
                                component: ()=> import('@/views/explore/categories/Main.vue'),
                                meta: {
                                    title: `Explore Hub Listing Categories ${pageTitleSuffix}`
                                },
                            },
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