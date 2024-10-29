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
        path: '/locked',
        name: 'app_locked',
        component: ()=> import("../views/auth/AppLocked.vue"),
        meta: {
            requiresAuth: true,
            title: `Locked ${pageTitleSuffix}`
        },
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

            {
                path: '/customers',
                name: 'customers',
                component: () => import('../views/customers/Main.vue'),
                meta: {
                    title: `Customers ${pageTitleSuffix}`
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
                                component: ()=> import('@/views/explore_hub/companies/Main.vue'),
                                meta: {
                                    title: `Explore Hub Companies ${pageTitleSuffix}`
                                },
                                children: [
                                    {
                                        path: "",
                                        name: 'explore_hub.companies.listed',
                                        components: {
                                            explore_companies_listed: ()=> import('@/views/explore_hub/companies/listed/List.vue')
                                        },
                                        meta: {
                                            title: `Explore Hub: Listed Companies ${pageTitleSuffix}`
                                        }
                                    },
                                    {
                                        path: "add",
                                        name: 'explore_hub.companies.add',
                                        components: {
                                            explore_companies_listed: ()=> import('@/views/explore_hub/companies/listed/Add.vue')
                                        },
                                        meta: {
                                            title: `Explore Hub: Add Company ${pageTitleSuffix}`
                                        }
                                    },
                                    {
                                        path: "edit",
                                        name: 'explore_hub.companies.edit',
                                        components: {
                                            explore_companies_listed: ()=> import('@/views/explore_hub/companies/listed/Edit.vue')
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
                                component: ()=> import('@/views/explore_hub/categories/Main.vue'),
                                meta: {
                                    title: `Explore Hub Listing Categories ${pageTitleSuffix}`
                                },
                            },
                        ]
                    },
                    {
                        path: 'listings',
                        name: 'explore_hub.listings',
                        component: ()=> import('@/views/explore_hub/listings/Main.vue'),
                        meta: {
                            title: `Explore Hub: Listings ${pageTitleSuffix}`
                        },
                        children: [
                            {
                                path: "",
                                name: 'explore_hub.listings.active',
                                components: {
                                    explore_listings_active: ()=> import('@/views/explore_hub/listings/active/List.vue')
                                },
                            },
                            {
                                path: "create",
                                name: 'explore_hub.listings.create',
                                components: {
                                    explore_listings_active: ()=> import('@/views/explore_hub/listings/active/Add.vue')
                                },
                                meta: {
                                    title: `Explore Hub: Create Listing ${pageTitleSuffix}`
                                },
                            },
                            {
                                path: "edit",
                                name: 'explore_hub.listings.edit',
                                components: {
                                    explore_listings_active: ()=> import('@/views/explore_hub/listings/active/Edit.vue')
                                },
                                meta: {
                                    title: `Explore Hub: Edit Listing ${pageTitleSuffix}`
                                },
                            },
                            {
                                path: ":listingTitleSlug",
                                name: 'explore_hub.listings.view',
                                components: {
                                    explore_listings_active: ()=> import('@/views/explore_hub/listings/active/View.vue')
                                },
                                meta: {
                                    title: `Explore Hub: View Listing ${pageTitleSuffix}`
                                },
                            },
                            {
                                path: ":listingTitleSlug/reviews",
                                name: 'explore_hub.listings.reviews',
                                components: {
                                    explore_listings_active: ()=> import('@/views/explore_hub/listings/active/Reviews.vue')
                                },
                                meta: {
                                    title: `Explore Hub:Listing Reviews ${pageTitleSuffix}`
                                },
                            },
                            {
                                path: "archived",
                                name: 'explore_hub.listings.archived',
                                components: {
                                    explore_listings_archived: ()=> import('@/views/explore_hub/listings/archived/List.vue')
                                },
                            },
                            {
                                path: "archived/:listingTitleSlug",
                                name: 'explore_hub.listings.archived.view',
                                components: {
                                    explore_listings_archived: ()=> import('@/views/explore_hub/listings/archived/View.vue')
                                },
                                meta: {
                                    title: `Explore Hub: View Archived Listing ${pageTitleSuffix}`
                                },
                            },
                        ]
                    }
                ]
            },

            //Investment Hub Routes
            {
                path: 'investment-hub',
                children: [
                    {
                        path: 'companies',
                        children: [
                            {
                                path: "",
                                name: 'investment_hub.companies',
                                component: ()=> import('@/views/investment_hub/companies/Main.vue'),
                                meta: {
                                    title: `Investment Hub Companies ${pageTitleSuffix}`
                                },
                                children: [
                                    {
                                        path: "",
                                        name: 'investment_hub.companies.listed',
                                        components: {
                                            investment_hub_companies_listed: ()=> import('@/views/investment_hub/companies/listed/List.vue')
                                        },
                                        meta: {
                                            title: `Investment Hub: Listed Companies ${pageTitleSuffix}`
                                        }
                                    },
                                    {
                                        path: "add",
                                        name: 'investment_hub.companies.add',
                                        components: {
                                            investment_hub_companies_listed: ()=> import('@/views/investment_hub/companies/listed/Add.vue')
                                        },
                                        meta: {
                                            title: `Investment Hub: Add Company ${pageTitleSuffix}`
                                        }
                                    },
                                    {
                                        path: "edit",
                                        name: 'investment_hub.companies.edit',
                                        components: {
                                            investment_hub_companies_listed: ()=> import('@/views/investment_hub/companies/listed/Edit.vue')
                                        },
                                        meta: {
                                            title: `Investment Hub: Edit Company ${pageTitleSuffix}`
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
                                name: 'investment_hub.categories',
                                component: ()=> import('@/views/investment_hub/categories/Main.vue'),
                                meta: {
                                    title: `Investment Hub Listing Categories ${pageTitleSuffix}`
                                },
                            },
                        ]
                    },
                    {
                        path: 'listings',
                        name: 'investment_hub.listings',
                        component: ()=> import('@/views/investment_hub/listings/Main.vue'),
                        meta: {
                            title: `Investment Hub: Listings ${pageTitleSuffix}`
                        },
                        children: [
                            {
                                path: "",
                                name: 'investment_hub.listings.active',
                                components: {
                                    investment_listings_active: ()=> import('@/views/investment_hub/listings/active/List.vue'),
                                },
                            },
                            {
                                path: "create",
                                name: 'investment_hub.listings.create',
                                components: {
                                    investment_listings_active: ()=> import('@/views/investment_hub/listings/active/Add.vue')
                                },
                                meta: {
                                    title: `Investment Hub: Create Listing ${pageTitleSuffix}`
                                },
                            },
                            {
                                path: "edit",
                                name: 'investment_hub.listings.edit',
                                components: {
                                    investment_listings_active: ()=> import('@/views/investment_hub/listings/active/Edit.vue')
                                },
                                meta: {
                                    title: `Investment Hub: Edit Listing ${pageTitleSuffix}`
                                },
                            },
                            {
                                path: ":listingTitleSlug",
                                name: 'investment_hub.listings.view',
                                components: {
                                    investment_listings_active: ()=> import('@/views/investment_hub/listings/active/View.vue')
                                },
                                meta: {
                                    title: `Investment Hub: View Listing ${pageTitleSuffix}`
                                },
                            },
                            {
                                path: ":listingTitleSlug/reviews",
                                name: 'investment_hub.listings.reviews',
                                components: {
                                    investment_listings_active: ()=> import('@/views/investment_hub/listings/active/Reviews.vue')
                                },
                                meta: {
                                    title: `Investment Hub:Listing Reviews ${pageTitleSuffix}`
                                },
                            },
                            {
                                path: "archived",
                                name: 'investment_hub.listings.archived',
                                components: {
                                    investment_listings_archived: ()=> import('@/views/investment_hub/listings/archived/List.vue')
                                },
                            },
                            {
                                path: "archived/:listingTitleSlug",
                                name: 'investment_hub.listings.archived.view',
                                components: {
                                    investment_listings_archived: ()=> import('@/views/investment_hub/listings/archived/View.vue')
                                },
                                meta: {
                                    title: `Investment Hub: View Archived Listing ${pageTitleSuffix}`
                                },
                            },
                        ]
                    },
                ]
            },

            //Access Control Routes
            {
                path: 'access-control',
                children: [
                    {
                        path: 'users',
                        name: 'users',
                        component: ()=> import("../views/access_control/ManageUsers.vue"),
                        meta: {
                            title: `Users ${pageTitleSuffix}`
                        }
                    },
                    {
                        path: 'roles',
                        name: 'roles',
                        component: ()=> import("../views/access_control/ManageRoles.vue"),
                        meta: {
                            title: `User Roles ${pageTitleSuffix}`
                        }
                    },
                    {
                        path: 'permissions',
                        name: 'permissions',
                        component: ()=> import("../views/access_control/Permissions.vue"),
                        meta: {
                            title: `Permissions ${pageTitleSuffix}`
                        }
                    },
                ]
            },

            {
                path: '/customer-care',
                name: 'customer_care',
                component: ()=> import("../views/customer_care/ChatWithCustomers.vue"),
                meta: {
                    title: `Chat With Customer ${pageTitleSuffix}`
                }
            },

            //Finance Institutions Routes
            {
                path: '/finance-institutions',
                name: 'finance_institutions',
                component: ()=> import("../views/finance_institutions/Main.vue"),
                meta: {
                    title: `Finance Institutions ${pageTitleSuffix}`
                }
            },
        ]
    },
    {
        path: '/user-invites/:token',
        component: ()=> import("../views/access_control/AcceptInvite.vue"),
        props: true,
        meta: {
            title: `Accept Invite ${pageTitleSuffix}`
        }
    },
]
