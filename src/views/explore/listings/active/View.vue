<script setup>

import {useStore} from "vuex";
import {useRouter} from "vue-router";
import CloseButton from "@/components/CloseButton.vue";
import {onMounted, ref} from "vue";

/* ----------------------------------
* Variables & properties
* ----------------------------------
* */
const store = useStore();
const router = useRouter();

const listing = ref(null);
const listingMedia = ref([]);

/* ----------------------------------
* Lifecycle Hooks
* ----------------------------------
* */
onMounted(()=>{
    if(store.state.exploreHub.viewedListing == null){
        return router.back();
    }

    //copy listing to local variable
    listing.value = JSON.parse(JSON.stringify(store.state.exploreHub.viewedListing));

    //copy listing media to variable for managing them
    listingMedia.value = JSON.parse(JSON.stringify(listing.value.media));
});

</script>

<template>

    <div class="row">
        <div class="col-sm-12 mb-3 d-inline-flex justify-content-end">
            <close-button></close-button>
        </div>

        <div class="col-md-12">
            <el-carousel :interval="4000" indicator-position="outside">
                <el-carousel-item v-for="(file, index) in listingMedia" :key="'listing-media-'+index">
                    <img style="max-height: 200px;" :src="file.path">
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>

</template>

<style scoped>

</style>