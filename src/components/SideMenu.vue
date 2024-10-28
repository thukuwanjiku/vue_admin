<script setup>
import {hasPermissionsWhichContain} from "@/services/Helpers";
</script>

<template>
    <aside id="sidebar" class="sidebar">

        <ul class="sidebar-nav" id="sidebar-nav">
          <!-- Dashboard Nav -->
            <li class="nav-item" data-bs-parent="#sidebar-nav">
                <router-link :to="{name:'dashboard'}" class="nav-link collapsed">
                    <i class="bi bi-grid"></i>
                    <span>Dashboard</span>
                </router-link>
            </li>

            <!-- Explore Hub -->
            <li class="nav-item" v-if="hasPermissionsWhichContain(['explore_hub.'])">
                <a class="nav-link collapsed" data-bs-target="#explore-hub-nav" data-bs-toggle="collapse" href="#">
                    <i class="bx bxs-map"></i><span>Explore Hub</span><i class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="explore-hub-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li v-if="hasPermissionsWhichContain(['explore_hub.companies', 'explore_hub.companies_reviews'])">
                        <router-link :to="{name:'explore_hub.companies'}">
                            <i class="bi bi-circle"></i><span>Companies</span>
                        </router-link>
                    </li>
                    <li v-if="hasPermissionsWhichContain(['explore_hub.categories'])">
                        <router-link :to="{name: 'explore_hub.categories'}">
                            <i class="bi bi-circle"></i><span>Categories</span>
                        </router-link>
                    </li>
                    <li v-if="hasPermissionsWhichContain(['explore_hub.listings'])">
                        <router-link :to="{name: 'explore_hub.listings'}">
                            <i class="bi bi-circle"></i><span>Listings</span>
                        </router-link>
                    </li>
                </ul>
            </li>

            <!-- Investment Hub -->
            <li class="nav-item" v-if="hasPermissionsWhichContain(['investment_hub.'])">
                <a class="nav-link collapsed" data-bs-target="#investment-hub-nav" data-bs-toggle="collapse" href="#">
                    <i class="bx bx-dollar"></i><span>Investment Hub</span><i class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="investment-hub-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li v-if="hasPermissionsWhichContain(['investment_hub.companies', 'investment_hub.companies_reviews'])">
                        <router-link :to="{name:'investment_hub.companies'}">
                            <i class="bi bi-circle"></i><span>Companies</span>
                        </router-link>
                    </li>
                    <li v-if="hasPermissionsWhichContain(['investment_hub.categories'])">
                        <router-link :to="{name: 'investment_hub.categories'}">
                            <i class="bi bi-circle"></i><span>Categories</span>
                        </router-link>
                    </li>
                    <li v-if="hasPermissionsWhichContain(['investment_hub.listings'])">
                        <router-link :to="{name: 'investment_hub.listings'}">
                            <i class="bi bi-circle"></i><span>Listings</span>
                        </router-link>
                    </li>
                </ul>
            </li>

            <!-- Access Control -->
            <li class="nav-item"
                v-if="hasPermissionsWhichContain(['users.', 'roles.', 'permissions.'])">
                <a class="nav-link collapsed" data-bs-target="#user-management-nav" data-bs-toggle="collapse" href="#">
                    <i class="bx bx-shield-quarter"></i><span>Access Control</span><i class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="user-management-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li v-if="hasPermissionsWhichContain(['roles.'])">
                        <router-link :to="{name: 'roles'}">
                            <i class="bi bi-circle"></i><span>Roles</span>
                        </router-link>
                    </li>
                    <li v-if="hasPermissionsWhichContain(['permissions.'])">
                        <router-link :to="{name: 'permissions'}">
                            <i class="bi bi-circle"></i><span>Permissions</span>
                        </router-link>
                    </li>
                    <li v-if="hasPermissionsWhichContain(['users.'])">
                        <router-link :to="{name:'users'}">
                            <i class="bi bi-circle"></i><span>Users</span>
                        </router-link>
                    </li>
                </ul>
            </li>

          <!-- Customer Care -->
          <li class="nav-item" data-bs-parent="#sidebar-nav">
            <router-link :to="{name:'customer_care'}" class="nav-link collapsed">
              <i class="bi bi-chat"></i>
              <span>Customer Care</span>
            </router-link>
          </li>

          <!-- Finance Institutions -->
          <li class="nav-item">
            <a class="nav-link collapsed" data-bs-target="#finance-institutions-nav" data-bs-toggle="collapse" href="#">
              <i class="bx bx-building"></i><span>Finance Institutions</span><i class="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul id="finance-institutions-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
              <li>
                <router-link :to="{name:'finance_institutions.banks'}">
                  <i class="bi bi-circle"></i><span>Commercial Banks</span>
                </router-link>
              </li>
              <li>
                <router-link :to="{name: 'finance_institutions.saccos'}">
                  <i class="bi bi-circle"></i><span>Saccos</span>
                </router-link>
              </li>
              <li>
                <router-link :to="{name: 'finance_institutions.mobile_money'}">
                  <i class="bi bi-circle"></i><span>Mobile Money Platform</span>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
    </aside>
</template>
