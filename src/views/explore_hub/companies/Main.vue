<script setup>

import {useRouter} from "vue-router";
import {onMounted} from "vue";
import Reviews from "@/views/explore_hub/companies/Reviews.vue";
import {hasPermissionsWhichContain} from "@/services/Helpers";

/* ------------------------------
* Variables & Properties
* ------------------------------
* */
const router = useRouter();

/* ------------------------------
* Component Lifecycle hooks
* ------------------------------
* */
onMounted(()=>{
    router.push({name: 'explore_hub.companies.listed'});
});

function tabChanged(tab){
    switch (tab){
        case 'listed':
            router.push({name: 'explore_hub.companies.listed'})
        case 'reviews':
            //router.push({name: 'explore_hub.companies.listed'})
        case 'deleted':
            //router.push({name: 'explore_hub.companies.listed'})
    }
}

</script>

<template>

    <div class="pagetitle">
        <h1>Companies</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link :to="{name:'dashboard'}">Home</router-link></li>
                <li class="breadcrumb-item">Explore Hub</li>
                <li class="breadcrumb-item active">Companies</li>
            </ol>
        </nav>
    </div>


    <div class="card">
        <div class="card-body">
            <br>

            <!-- Default Tabs -->
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation" v-if="hasPermissionsWhichContain(['explore_hub.companies'])">
                    <button class="nav-link active"
                            @click="tabChanged('listed')"
                            data-bs-toggle="tab" data-bs-target="#explore_companies_listed"
                            type="button" role="tab" aria-controls="home" aria-selected="false" tabindex="-1">Listed</button>
                </li>
                <li class="nav-item" role="presentation" v-if="hasPermissionsWhichContain(['explore_hub.companies_reviews'])">
                    <button class="nav-link" id="profile-tab"
                            @click="tabChanged('reviews')"
                            data-bs-toggle="tab" data-bs-target="#explore_companies_reviews"
                            type="button" role="tab"
                            aria-controls="profile" aria-selected="false" tabindex="-1">Reviews</button>
                </li>
                <li class="nav-item" role="presentation" v-if="hasPermissionsWhichContain(['explore_hub.archived_companies'])">
                    <button class="nav-link" id="contact-tab"
                            @click="tabChanged('deleted')"
                            data-bs-toggle="tab" data-bs-target="#explore_companies_deleted"
                            type="button" role="tab" aria-controls="contact" aria-selected="true">Archived</button>
                </li>
            </ul>
            <div class="tab-content pt-2" id="myTabContent">
                <div class="tab-pane fade show active p-1" id="explore_companies_listed"
                     role="tabpanel" aria-labelledby="home-tab" v-if="hasPermissionsWhichContain(['explore_hub.companies'])">
                    <router-view name="explore_companies_listed"></router-view>
                </div>
                <div class="tab-pane fade" id="explore_companies_reviews"
                     role="tabpanel" aria-labelledby="profile-tab" v-if="hasPermissionsWhichContain(['explore_hub.companies_reviews'])">
                    <reviews></reviews>
                </div>
                <div class="tab-pane fade" id="explore_companies_deleted" role="tabpanel" aria-labelledby="contact-tab">
                    Browse archived companies
                </div>
            </div>
            <!-- End Default Tabs -->

        </div>
    </div>

</template>

<style scoped>

</style>