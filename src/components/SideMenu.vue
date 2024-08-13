<script setup>

/**
 * Imports
 * */
import {useRouter} from "vue-router";
import {computed} from "vue";

/**
 * Variables definitions
 * */
const router = useRouter();

/**
 * Computed properties
 * */
const currentRoute = computed(()=> router.currentRoute.value.name);

</script>

<template>

    <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <ul class="nav">
            <li class="nav-item" :class="{'active': currentRoute == 'dashboard'}">
                <router-link class="nav-link" :to="{name:'dashboard'}" id="menu_dashboard">
                    <i class="icon-grid menu-icon"></i>
                    <span class="menu-title">Dashboard</span>
                </router-link>
            </li>
            <li class="nav-item" :class="{'active': currentRoute.toString().includes('explore')}">
                <a class="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                    <i class="icon-layout menu-icon"></i>
                    <span class="menu-title">Explore</span>
                    <i class="menu-arrow"></i>
                </a>
                <div class="collapse" id="ui-basic">
                    <ul class="nav flex-column sub-menu">
                        <li class="nav-item"> <router-link class="nav-link" :to="{name: 'explore.companies'}">Companies</router-link></li>
                        <li class="nav-item"> <router-link class="nav-link" :to="{name: 'explore.listings'}">Listings</router-link></li>
                    </ul>
                </div>
            </li>
            <!--<li class="nav-item">
                <a class="nav-link" data-bs-toggle="collapse" href="#form-elements" aria-expanded="false" aria-controls="form-elements">
                    <i class="icon-columns menu-icon"></i>
                    <span class="menu-title">Form elements</span>
                    <i class="menu-arrow"></i>
                </a>
                <div class="collapse" id="form-elements">
                    <ul class="nav flex-column sub-menu">
                        <li class="nav-item"><a class="nav-link" href="pages/forms/basic_elements.html">Basic Elements</a></li>
                    </ul>
                </div>
            </li>-->
        </ul>
    </nav>

</template>