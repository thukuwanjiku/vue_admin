<script setup>

</script>

<template>

    <aside id="sidebar" class="sidebar">

        <ul class="sidebar-nav" id="sidebar-nav">

            <li class="nav-item">
                <router-link :to="{name:'dashboard'}" class="nav-link collapsed">
                    <i class="bi bi-grid"></i>
                    <span>Dashboard</span>
                </router-link>
            </li><!-- End Dashboard Nav -->

            <li class="nav-item">
                <a class="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
                    <i class="bx bxs-map"></i><span>Explore</span><i class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="forms-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                    <li>
                        <router-link :to="{name:'explore.companies'}">
                            <i class="bi bi-circle"></i><span>Companies</span>
                        </router-link>
                    </li>
                    <li>
                        <a href="forms-layouts.html">
                            <i class="bi bi-circle"></i><span>Categories</span>
                        </a>
                    </li>
                    <li>
                        <a href="forms-editors.html">
                            <i class="bi bi-circle"></i><span>Listings</span>
                        </a>
                    </li>
                </ul>
            </li>

        </ul>

    </aside>

</template>

<style scoped>

</style>