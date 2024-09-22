<script setup>

import {useStore} from "vuex";
import {useRouter} from "vue-router";
import CloseButton from "@/components/CloseButton.vue";
import {onMounted, ref} from "vue";
import {startCase} from "lodash-es";
import {
    checkHasPermission, fetchInvestmentHubActiveListings,
    fetchInvestmentHubArchivedListings,
    hasPermissionsWhichContain,
    isSmallScreen,
    moneyFormatter
} from "@/services/Helpers";
import {Carousel, Slide, Navigation, Pagination} from "vue3-carousel";
import 'vue3-carousel/dist/carousel.css'
import {ArrowDown, Comment, Delete, Edit, Money, PictureFilled, RefreshLeft, TopRight} from "@element-plus/icons-vue";
import InputLabel from "@/components/InputLabel.vue";
import axios from "axios";
import {ElMessage, ElMessageBox} from "element-plus";
import api from "@/services/api";
import {apiRoutes} from "@/services/apiRoutes";

/* ----------------------------------
* Variables & properties
* ----------------------------------
* */
const store = useStore();
const router = useRouter();

const isLoading = ref(false);
const isModalLoading = ref(false);

const listing = ref({});
const listingMedia = ref([]);

const paymentModes = ref([]);

/* ----------------------------------
* Lifecycle Hooks
* ----------------------------------
* */
onMounted(()=>{
    if(store.state.investmentHub.viewedArchivedListing == null){
        return router.back();
    }

    //copy listing to local variable
    listing.value = JSON.parse(JSON.stringify(store.state.investmentHub.viewedArchivedListing));

    //copy listing media to variable for managing them
    listingMedia.value = JSON.parse(JSON.stringify(listing.value.media));

    setTimeout(()=>{
        //reset background color on listing description p
        $(".listing_desc > p > span").css('background', 'inherit');
    }, 500);
});


/* ----------------------------------
* Methods & functions
* ----------------------------------
* */
function handleActionsClick(action){
    switch (action){
        case 'restore':
            return confirmRestore();

        case 'delete':
            return confirmDelete();
    }
}

function confirmRestore(){
    ElMessageBox.confirm('Sure you want to restore this listing?', 'Confirm Restore', {
        confirmButtonText: 'Restore',
        cancelButtonText: 'Cancel',
    })
            .then(() => {
                //define payload to send to api
                let payload = {
                    id: listing.value.id
                };

                //send payload to method handling the
                restoreListing(payload);
            })
            .catch(() => {})
}
function restoreListing(payload){
    //show loader
    isLoading.value = true;

    //make api call
    api.post(apiRoutes.INVESTMENT_HUB_RESTORE_ARCHIVED_LISTING, payload)
            .then(response => {
                //refresh archived listings
                fetchInvestmentHubArchivedListings();
                //refresh active listings list
                fetchInvestmentHubActiveListings(JSON.parse(JSON.stringify(store.state.investmentHub.activeListingsFilters)));

                //show success message
                $.growl.notice({message: response.data.message});

                //go back
                return router.back();
            })
            .catch(error => isLoading.value = false)
}

function confirmDelete(){
    ElMessageBox.confirm('Sure you want to delete this listing?', 'Confirm Delete', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
    })
            .then(() => {
                //define payload to send to api
                let payload = {
                    id: listing.value.id
                };

                //send payload to method handling the
                deleteListing(payload);
            })
            .catch(() => {})
}
function deleteListing(payload){
    //show loader
    isLoading.value = true;

    //make api call
    api.post(apiRoutes.INVESTMENT_HUB_DELETE_ARCHIVED_LISTING, payload)
            .then(response => {
                //refresh listings
                fetchInvestmentHubArchivedListings();

                //show success message
                $.growl.notice({message: response.data.message});

                return router.back();
            })
            .catch(error => isLoading.value = false)
}
</script>

<template>

    <div class="row" v-if="Object.keys(listing).length" v-loading="isLoading">
        <div class="col-sm-12 mb-3 d-inline-flex align-items-center"
             :class="{
                'justify-content-end': !isSmallScreen,
                'justify-content-between': isSmallScreen
             }">
            <div class="p-1 m-r-10 d-flex align-items-center flex-wrap"
                 v-if="hasPermissionsWhichContain(['investment_hub.archived_listings.restore', 'investment_hub.archived_listings.delete'])">
                <template v-if="!isSmallScreen">
                    <el-button v-if="checkHasPermission('investment_hub.archived_listings.restore')" @click="confirmRestore" type="primary" :icon="RefreshLeft" text bg>Restore Listing</el-button>
                    <el-divider v-if="hasPermissionsWhichContain(['investment_hub.archived_listings.delete'])" direction="vertical"></el-divider>
                    <el-button v-if="checkHasPermission('investment_hub.archived_listings.delete')" @click="confirmDelete" type="danger" :icon="Delete" text bg>Delete Listing</el-button>
                </template>

                <el-dropdown trigger="click" @command="handleActionsClick" v-if="isSmallScreen">
                    <el-button plain size="large">
                        Listing Actions<el-icon class="el-icon--right"><arrow-down /></el-icon>
                    </el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item v-if="checkHasPermission('investment_hub.archived_listings.restore')" command="restore" :icon="RefreshLeft">Restore Listing</el-dropdown-item>
                            <el-dropdown-item v-if="checkHasPermission('investment_hub.archived_listings.delete')" command="delete" :icon="Delete">Delete Listing</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>

            <close-button></close-button>
        </div>

        <!-- Media Carousel -->
        <div class="col-md-12">
            <Carousel :itemsToShow="2" :wrapAround="true" :transition="500" :autoplay="2000">
                <Slide v-for="(file, index) in listing.media" :key="'view-listing-media-'+file.id">

                    <div class="w-100 listing_carousel_primary_media">
                        <img :src="file.path" class="d-block w-100 carousel__item" style="max-height:300px;">

                        <div class="primary_indicator" v-show="file.is_primary">primary</div>
                    </div>
                </Slide>

                <template #addons>
                    <Navigation />
                    <Pagination />
                </template>
            </Carousel>
        </div>

        <!-- Title -->
        <div class="col-md-12 m-t-20">
            <h5 class="mz-color">{{ listing.title }}</h5>
        </div>

        <!-- Company Details -->
        <div class="col-md-12 d-flex align-items-center">
            <div class="listing_company_logo">
                <img :src="listing.company.logo" :alt="listing.company.name+'\'s logo'">
            </div>
            <div>
                <h6 class="m-0">{{ listing.company.name }}</h6>
                <h6 class="m-0"><small>{{ listing.company.description }}</small></h6>
            </div>
        </div>

        <!-- Description -->
        <div class="col-md-12 m-t-20">
            <h6>Description</h6>
            <div class="alert alert-secondary  alert-dismissible fade show listing_desc"
                 role="alert" v-html="listing.description"></div>
        </div>

        <!-- Payments -->
        <div class="col-md-12 m-t-20">
            <h6>Payments</h6>
            <div class="col-md-12 d-flex flex-wrap align-items-center" v-if="listing.payments.length">
                <div class="p-1 view_listing_payment" v-for="payment in listing.payments" :key="'listing-payment-'+payment.id">
                    <small>
                        <strong>Mode</strong>: {{ startCase(payment.mode) }} <br>
                        <strong>Amount</strong>: {{ moneyFormatter(payment.amount, 'KES') }}<br>
                        <strong>Reference</strong>:
                        <template v-show="payment.reference && payment.reference.length && payment.reference != payment.mode">
                            {{ payment.reference }}
                        </template>
                        <br>
                        <strong>Added</strong>: {{ payment.added_at }}
                    </small>
                </div>
            </div>
            <div class="col-md-12" v-if="!listing.payments.length">
                <small class="text-italic text-muted">No payments added</small>
            </div>
        </div>

        <!-- Running Dates -->
        <div class="col-md-12 m-t-20">
            <p class="m-0">
                <strong>Archived By</strong>: {{ listing.deleted_by }}
                &nbsp;&nbsp;
                <strong>on</strong>: {{ listing.deleted_at }}
                <br>
                <strong>Reason</strong>: {{ listing.delete_reason }}
            </p>
        </div>
    </div>

</template>

<style scoped>
.carousel__viewport {
    perspective: 2000px;
}

.carousel__track {
    transform-style: preserve-3d;
}

.carousel__slide--sliding {
    transition: 0.5s;
}

.carousel__slide {
    opacity: 0.9;
    transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
    transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
    opacity: 1;
    transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--next {
    opacity: 1;
    transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
    opacity: 1;
    transform: rotateY(0) scale(1.1);
}
</style>