<script setup>

import {useRouter} from "vue-router";
import {onMounted} from "vue";
import ManageCategories from "@/views/explore_hub/categories/ManageCategories.vue";
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
    //
});

</script>

<template>

    <div class="pagetitle">
        <h1>Categories</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link :to="{name:'dashboard'}">Home</router-link></li>
                <li class="breadcrumb-item">Explore Hub</li>
                <li class="breadcrumb-item active">Listing Categories</li>
            </ol>
        </nav>
    </div>


    <div class="card">
        <div class="card-body">
            <br>

            <!-- Default Tabs -->
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation" v-if="hasPermissionsWhichContain(['explore_hub.categories'])">
                    <button class="nav-link active"
                            data-bs-toggle="tab" data-bs-target="#explore_categories_active"
                            type="button" role="tab" aria-controls="home" aria-selected="false" tabindex="-1">Categories</button>
                </li>
<!--                <li class="nav-item" role="presentation" v-if="hasPermissionsWhichContain(['explore_hub.archived_categories'])">
                    <button class="nav-link"
                            data-bs-toggle="tab" data-bs-target="#explore_categories_deleted"
                            type="button" role="tab" aria-controls="contact" aria-selected="true">Archived</button>
                </li>-->
            </ul>
            <div class="tab-content pt-2" id="myTabContent">
                <div class="tab-pane fade show active p-1" id="explore_categories_active"
                      v-if="hasPermissionsWhichContain(['explore_hub.categories'])"
                     role="tabpanel" aria-labelledby="home-tab">
                    <manage-categories></manage-categories>
                </div>
                <div class="tab-pane fade" id="explore_categories_deleted"
                      v-if="hasPermissionsWhichContain(['explore_hub.archived_categories'])"
                     role="tabpanel" aria-labelledby="contact-tab">
                    Will browse archived categories here
                </div>
            </div>
            <!-- End Default Tabs -->

        </div>
    </div>

</template>

<style scoped>

</style>