<script setup>

//imports
import { ref } from 'vue';
import Header from "@/components/Header.vue"
import SideMenu from "@/components/SideMenu.vue";
import Footer from "@/components/Footer.vue";

/**
 * All variables definitions
 * */


</script>

<template>

    <div class="container-scroller">
        <!-- Main header -->
        <Header></Header>

        <!-- partial -->
        <div class="container-fluid page-body-wrapper">
            <!-- Side menu navigation -->
            <side-menu></side-menu>

            <!-- partial -->
            <div class="main-panel">
                <div class="content-wrapper">
                    <router-view></router-view>
                </div>
                <!-- content-wrapper ends -->

                <!-- Footer -->
                <footer></footer>
            </div>
            <!-- main-panel ends -->
        </div>
        <!-- page-body-wrapper ends -->
    </div>

</template>