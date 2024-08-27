<script setup>

import AppHeader from "@/components/AppHeader.vue";
import SideMenu from "@/components/SideMenu.vue";
import AppFooter from "@/components/AppFooter.vue";

/**
 * All variables definitions
 * */


</script>

<template>

    <!-- ======= Header ======= -->
    <app-header></app-header>
    <!-- End Header -->

    <!-- ======= Sidebar ======= -->
    <side-menu></side-menu>
    <!-- End Sidebar-->

    <main id="main" class="main">
        <router-view></router-view>
    </main>
    <!-- End #main -->

    <!-- ======= Footer ======= -->
    <app-footer></app-footer>
    <!-- End Footer -->

</template>