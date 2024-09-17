<script setup>

import {useStore} from "vuex";
import {computed} from "vue";

/* ------------------------
* Variables
* -----------------------
* */
const store = useStore();

/* ------------------------
* Computed
* -----------------------
* */
const isSuperAdmin = computed(()=> store.getters["auth/isSuperAdmin"]);
const permissions = computed(()=> store.state.auth.permissions);

</script>

<template>

    <aside id="sidebar" class="sidebar">

        <ul class="sidebar-nav" id="sidebar-nav">

            <li class="nav-item" data-bs-parent="#sidebar-nav">
                <router-link :to="{name:'dashboard'}" class="nav-link collapsed">
                    <i class="bi bi-grid"></i>
                    <span>Dashboard</span>
                </router-link>
            </li>
            <!-- End Dashboard Nav -->

            <!-- Explore Hub -->
            <li class="nav-item">
                <a class="nav-link collapsed" data-bs-target="#explore-hub-nav" data-bs-toggle="collapse" href="#">
                    <i class="bx bxs-map"></i><span>Explore Hub</span><i class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="explore-hub-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li>
                        <router-link :to="{name:'explore_hub.companies'}">
                            <i class="bi bi-circle"></i><span>Companies</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'explore_hub.categories'}">
                            <i class="bi bi-circle"></i><span>Categories</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'explore_hub.listings'}">
                            <i class="bi bi-circle"></i><span>Listings</span>
                        </router-link>
                    </li>
                </ul>
            </li>

            <!-- Investment Hub -->
            <li class="nav-item">
                <a class="nav-link collapsed" data-bs-target="#investment-hub-nav" data-bs-toggle="collapse" href="#">
                    <i class="bx bx-dollar"></i><span>Investment Hub</span><i class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="investment-hub-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li>
                        <router-link :to="{name:'investment_hub.companies'}">
                            <i class="bi bi-circle"></i><span>Companies</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'investment_hub.categories'}">
                            <i class="bi bi-circle"></i><span>Categories</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'investment_hub.listings'}">
                            <i class="bi bi-circle"></i><span>Listings</span>
                        </router-link>
                    </li>
                </ul>
            </li>

            <!-- Access Control -->
            <li class="nav-item"
                v-if="isSuperAdmin
                    || permissions.some(perm =>
                        perm.includes('user') || perm.includes('role')
                    )">
                <a class="nav-link collapsed" data-bs-target="#user-management-nav" data-bs-toggle="collapse" href="#">
                    <i class="bx bx-shield-quarter"></i><span>Access Control</span><i class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="user-management-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li>
                        <router-link :to="{name:'users'}">
                            <i class="bi bi-circle"></i><span>Users</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'roles'}">
                            <i class="bi bi-circle"></i><span>Roles</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'permissions'}">
                            <i class="bi bi-circle"></i><span>Permissions</span>
                        </router-link>
                    </li>
                </ul>
            </li>

        </ul>

    </aside>

</template>

<style scoped>

</style>