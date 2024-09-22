<script setup>

import {useRouter} from "vue-router";
import {onMounted} from "vue";
import ReportedListings from "@/views/investment_hub/listings/ReportedListings.vue";
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
    router.push({name: 'investment_hub.listings.active'});
});

function tabChanged(tab){
    switch (tab){
        case 'active':
            return router.push({name: 'investment_hub.listings.active'})
        case 'reviews':
            //router.push({name: 'investment_hub.companies.listed'})
        case 'archived':
            return router.push({name: 'investment_hub.listings.archived'})
    }
}

</script>

<template>

    <div class="pagetitle">
        <h1>Listings</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link :to="{name:'dashboard'}">Home</router-link></li>
                <li class="breadcrumb-item">Investment Hub</li>
                <li class="breadcrumb-item active">Listings</li>
            </ol>
        </nav>
    </div>


    <div class="card">
        <div class="card-body">
            <br>

            <!-- Default Tabs -->
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation" v-if="hasPermissionsWhichContain(['investment_hub.listings'])">
                    <button class="nav-link active"
                            @click="tabChanged('active')"
                            data-bs-toggle="tab" data-bs-target="#investment_listings_active"
                            type="button" role="tab" aria-controls="home" aria-selected="false" tabindex="-1">Active</button>
                </li>
                <li class="nav-item" role="presentation" v-if="hasPermissionsWhichContain(['investment_hub.reported_listings'])">
                    <button class="nav-link"
                            @click="tabChanged('reported')"
                            data-bs-toggle="tab" data-bs-target="#investment_listings_reported"
                            type="button" role="tab" aria-controls="contact" aria-selected="true">Reported</button>
                </li>
                <!--<li class="nav-item" role="presentation">
                    <button class="nav-link" id="contact-tab"
                            @click="tabChanged('closed')"
                            data-bs-toggle="tab" data-bs-target="#investment_listings_closed"
                            type="button" role="tab" aria-controls="contact" aria-selected="true">Closed</button>
                </li>-->
                <li class="nav-item" role="presentation" v-if="hasPermissionsWhichContain(['investment_hub.archived_listings'])">
                    <button class="nav-link" id="contact-tab"
                            @click="tabChanged('archived')"
                            data-bs-toggle="tab" data-bs-target="#investment_listings_archived"
                            type="button" role="tab" aria-controls="contact" aria-selected="true">Archived</button>
                </li>
            </ul>
            <div class="tab-content pt-2" id="myTabContent">
                <div class="tab-pane fade show active p-1" id="investment_listings_active"
                     v-if="hasPermissionsWhichContain(['investment_hub.listings'])"
                     role="tabpanel" aria-labelledby="home-tab">
                    <router-view name="investment_listings_active"></router-view>
                </div>
                <div class="tab-pane fade" id="investment_listings_closed" role="tabpanel" aria-labelledby="profile-tab">
                    Closed Listings
                </div>
                <div class="tab-pane fade" id="investment_listings_reported"
                     v-if="hasPermissionsWhichContain(['investment_hub.reported_listings'])"
                     role="tabpanel" aria-labelledby="profile-tab">
                    <reported-listings></reported-listings>
                </div>
                <div class="tab-pane fade" id="investment_listings_archived"
                     v-if="hasPermissionsWhichContain(['investment_hub.archived_listings'])"
                     role="tabpanel" aria-labelledby="contact-tab">
                    <router-view name="investment_listings_archived"></router-view>
                </div>
            </div>
            <!-- End Default Tabs -->

        </div>
    </div>

</template>

<style scoped>

</style>