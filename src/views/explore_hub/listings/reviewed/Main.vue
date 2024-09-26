<script setup>

import {onMounted, ref} from "vue";
import {CircleCheck, Loading} from "@element-plus/icons-vue";
import Pending from "@/views/explore_hub/listings/reviewed/Pending.vue";
import Public from "@/views/explore_hub/listings/reviewed/Public.vue";

</script>

<template>

    <!-- Bordered Tabs -->
    <ul class="nav nav-tabs nav-tabs-bordered d-flex justify-content-end" id="borderedTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#pending_reviews" type="button" role="tab" aria-controls="home" aria-selected="true">Pending</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#public_reviews" type="button" role="tab" aria-controls="profile" aria-selected="false" tabindex="-1">Public</button>
        </li>
    </ul>
    <div class="tab-content pt-2" id="borderedTabContent">
        <div class="tab-pane fade show active" id="pending_reviews" role="tabpanel" aria-labelledby="home-tab">
            <pending></pending>
        </div>
        <div class="tab-pane fade" id="public_reviews" role="tabpanel" aria-labelledby="profile-tab">
            <public></public>
        </div>
    </div>

</template>

<style scoped>

</style>