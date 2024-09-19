<script setup>

import {useStore} from "vuex";
import {useRouter} from "vue-router";
import CloseButton from "@/components/CloseButton.vue";
import {onMounted, ref} from "vue";
import {startCase} from "lodash-es";
import {checkHasPermission, hasPermissionsWhichContain, isSmallScreen, moneyFormatter} from "@/services/Helpers";
import {Carousel, Slide, Navigation, Pagination} from "vue3-carousel";
import 'vue3-carousel/dist/carousel.css'
import {ArrowDown, Comment, Edit, Money, PictureFilled, TopRight} from "@element-plus/icons-vue";
import InputLabel from "@/components/InputLabel.vue";
import axios from "axios";
import {ElMessage} from "element-plus";
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
const newPayment = ref({
    mode:null,
    amount:null,
    reference:null
});
const isAddingPayments = ref(false);

const isAddingMedia = ref(false);
const primaryMedia = ref(null);
const primaryMediaFile = ref(null);
const media = ref([]);
const mediaFiles = ref([]);

/* ----------------------------------
* Lifecycle Hooks
* ----------------------------------
* */
onMounted(()=>{
    if(store.state.investmentHub.viewedListing == null){
        return router.back();
    }

    //copy listing to local variable
    listing.value = JSON.parse(JSON.stringify(store.state.investmentHub.viewedListing));

    //copy listing media to variable for managing them
    listingMedia.value = JSON.parse(JSON.stringify(listing.value.media));

    //get available payment methods
    fetchPaymentModes();

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
        case 'add_payments':
            isAddingPayments.value = true;
            break;

        case 'add_media':
            isAddingMedia.value = true;
            break;

        case 'edit':
            goEditListing();
            break;

        case 'browse_reviews':
            goToReviews();
            break;
    }
}

function goEditListing(){
    //check has permissions
    if(!checkHasPermission('investment_hub.listings.edit')) return;

    //store the entry to be edited in vuex
    store.commit("investmentHub/STORE_EDIT_LISTING", JSON.parse(JSON.stringify(listing.value)));

    //navigate to the edit route
    return router.replace({name: 'investment_hub.listings.edit'})
}

function fetchPaymentModes(){
    axios.get('/assets/PaymentModes.json')
            .then(response =>
                    paymentModes.value = response.data
                            .map(entry => {
                                entry.image = require(`@/assets/images/payments/${entry.image}`);
                                return entry;
                            }));
}
function acceptNewPayment(){
    //validate that all required fields have been entered: mode & amount
    if(!newPayment.value.mode || !newPayment.value.mode.length)
        return ElMessage.warning("Please select a payment mode");
    if(!newPayment.value.amount || !newPayment.value.amount.toString().length)
        return ElMessage.warning("Please enter the payment amount");
    if(!newPayment.value.reference || !newPayment.value.reference.toString().length)
        return ElMessage.warning("Please enter the payment reference");
    //validate that a valid payment amount has been entered
    if(isNaN(newPayment.value.amount))
        return ElMessage.warning("Please enter a valid amount");

    //prepare payload to make API call
    let payload = {
        "id": listing.value.id,
        "payments":[
            JSON.parse(JSON.stringify(newPayment.value))
        ]
    };

    //show modal loader
    isModalLoading.value = true;

    //make API call
    api.post(apiRoutes.INVESTMENT_HUB_ADD_LISTING_PAYMENTS, payload)
            .then(response => {
                //show user response message
                $.growl.notice({message: response.data.message});

                // refresh local copy of listing
                listing.value = response.data.data;

                //hide modal
                isAddingPayments.value = false;
                //hide loading overlay
                isModalLoading.value = false;
                //refresh vuex copy of listing
                let allListings = JSON.parse(JSON.stringify(store.state.investmentHub.activeListings));
                //find the edited index
                let index = allListings.findIndex(entry => entry.id == response.data.data.id);
                if(index > -1){
                    allListings[index] = response.data.data;
                    store.commit('investmentHub/STORE_ACTIVE_LISTINGS', allListings);
                }
            })
            .catch(error => isModalLoading.value = false)
}

function processPrimaryMediaUpload(event){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        primaryMedia.value = e.target.result;
        primaryMediaFile.value = file;
    };
    reader.readAsDataURL(file);


    //reset selection
    $("#primaryListingMedia").val("");
}
function processUpload(event){
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = (e) => {
            media.value.push({
                name: file.name,
                url: e.target.result,
            });
            mediaFiles.value.push(file);
        };

        reader.readAsDataURL(file);
    }


    //reset selection
    $("#listingMedia").val("");
}
function removePrimaryUpload(){
    primaryMedia.value = null;
    primaryMediaFile.value = null;
}
function removeUpload(index){
    media.value.splice(index, 1);
    mediaFiles.value.splice(index, 1);
}
function saveNewMedia(){
    //check that they've uploaded either primary media or other media
    if(!primaryMediaFile.value && !mediaFiles.value.length)
        return ElMessage.warning("Please upload images to save");

    //prepare payload to post new media
    let payload = new FormData();
    //add listing id
    payload.append(`id`, listing.value.id)
    //add primary media to payload
    if(primaryMediaFile.value) payload.append(`primary_media`, primaryMediaFile.value);
    if(mediaFiles.value.length){
        //append media to payload
        for(let count=0; count < mediaFiles.value.length; count++){
            payload.append(`media[${count}]`, mediaFiles.value[count]);
        }
    }

    //show loader
    isModalLoading.value = true;

    api.post(apiRoutes.INVESTMENT_HUB_ADD_LISTING_MEDIA, payload)
            .then(response => {
                //show user response message
                $.growl.notice({message: response.data.message});

                // refresh local copy of listing
                listing.value = response.data.data;

                //hide modal
                isAddingMedia.value = false;
                //hide loading overlay
                isModalLoading.value = false;
                //refresh vuex copy of listing
                let allListings = JSON.parse(JSON.stringify(store.state.investmentHub.activeListings));
                //find the edited index
                let index = allListings.findIndex(entry => entry.id == response.data.data.id);
                if(index > -1){
                    allListings[index] = response.data.data;
                    store.commit('investmentHub/STORE_ACTIVE_LISTINGS', allListings);
                }
            })
            .catch(error => isModalLoading.value = false);
}

function goToReviews(){
    //check has permissions
    if(!checkHasPermission('investment_hub.reviewed_listings.list')) return;

    return router.push({
        name: 'investment_hub.listings.reviews',
        params:{
            listingTitleSlug: listing.value.title.toString().replaceAll(" ", "-")
        }
    })
}
</script>

<template>

    <div class="row" v-if="Object.keys(listing).length">
        <div class="col-sm-12 mb-3 d-inline-flex align-items-center"
             :class="{
                'justify-content-end': !isSmallScreen,
                'justify-content-between': isSmallScreen
             }">
            <div class="p-1 m-r-10 d-flex align-items-center flex-wrap"
                 v-if="hasPermissionsWhichContain(['investment_hub.listings.edit', 'investment_hub.listings.add_media', 'investment_hub.listings.add_payment', 'investment_hub.reviewed_listings.list'])">
                <template v-if="!isSmallScreen">
                    <el-button v-if="checkHasPermission('investment_hub.listings.edit')" @click="goEditListing" type="primary" :icon="Edit" text bg>Edit Listing</el-button>
                    <el-divider v-if="hasPermissionsWhichContain(['investment_hub.listings.add_payment'])" direction="vertical"></el-divider>
                    <el-button v-if="checkHasPermission('investment_hub.listings.add_payment')" @click="isAddingPayments = true" type="primary" :icon="Money" text bg>Add Payment</el-button>
                    <el-divider v-if="hasPermissionsWhichContain(['investment_hub.listings.add_media'])" direction="vertical"></el-divider>
                    <el-button v-if="checkHasPermission('investment_hub.listings.add_media')" @click="isAddingMedia = true" type="primary" :icon="PictureFilled" text bg>Add Media</el-button>
                    <template v-if="listing.has_reviews">
                        <el-divider v-if="hasPermissionsWhichContain(['investment_hub.reviewed_listings.list'])" direction="vertical"></el-divider>
                        <el-button v-if="checkHasPermission('investment_hub.reviewed_listings.list')" @click="goToReviews" type="primary" :icon="Comment" text bg>Browse Listing Reviews</el-button>
                    </template>
                </template>

                <el-dropdown trigger="click" @command="handleActionsClick" v-if="isSmallScreen">
                    <el-button plain size="large">
                        Listing Actions<el-icon class="el-icon--right"><arrow-down /></el-icon>
                    </el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item v-if="checkHasPermission('investment_hub.listings.edit')" command="edit" :icon="Edit">Edit Listing</el-dropdown-item>
                            <el-dropdown-item v-if="checkHasPermission('investment_hub.listings.add_payment')" command="add_payments" :icon="Money">Add Payment</el-dropdown-item>
                            <el-dropdown-item v-if="checkHasPermission('investment_hub.listings.add_media')" command="add_media" :icon="PictureFilled">Add Media</el-dropdown-item>
                            <el-dropdown-item command="browse_reviews" :icon="Comment" v-if="checkHasPermission('investment_hub.reviewed_listings.list') && listing.has_reviews">Browse Reviews</el-dropdown-item>
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
                {{ listing.start_date_desc }}
                <strong>{{ listing.start_at_formatted }}</strong>
                &nbsp;-&nbsp;
                <strong>{{ listing.end_at_formatted }}</strong>
            </p>
        </div>
    </div>

    <!-- Modal to add payments -->
    <el-dialog
            custom-class="el-dialog-width"
            width="45%"
            :fullscreen="isSmallScreen"
            v-model="isAddingPayments">

        <div v-loading="isModalLoading">
            <div class="col-md-12 m-b-20">
                <input-label>Select Payment Mode</input-label>
                <div class="col-md-12 m-t-10 d-flex flex-wrap">

                    <div class="p-1 payment-mode hov-pointer" :class="{'selected': mode.name == newPayment.mode}"
                         v-for="mode in paymentModes"
                         :key="'all-payment-modes-'+mode.name"
                         @click="newPayment.mode = mode.name">

                        <div class="col-md-12 d-flex align-items-center">
                            <img :src="mode.image"  style="max-width:40px;max-height:20px;">
                            &nbsp;&nbsp;
                            <h6 class="m-0">{{ startCase(mode.name) }}</h6>
                        </div>

                        <div class="selected_indicator" v-show="newPayment.mode == mode.name">
                            <i class="ri ri-check-line"></i>
                        </div>
                    </div>

                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <input-label>Payment Amount</input-label>
                    <el-input placeholder="Enter payment amount" v-model="newPayment.amount"></el-input>

                </div>
                <div class="col-md-6">
                    <input-label>Transaction Reference</input-label>
                    <el-input placeholder="Enter reference code" v-model="newPayment.reference"></el-input>
                </div>
            </div>
            <br>
            <div class="col-md-12">
                <el-button type="primary" @click="acceptNewPayment">Add Payment</el-button>
            </div>
        </div>

    </el-dialog>

    <!-- Modal to add images -->
    <el-dialog
            custom-class="el-dialog-width"
            width="45%"
            :fullscreen="isSmallScreen"
            v-model="isAddingMedia">

        <div v-loading="isModalLoading">
            <div class="col-md-12 m-b-20">
                <h6>Upload additional listing media here</h6>


                <div class="p-l-10">
                    <small>Primary Media</small><br>

                    <input style="max-width:400px;" type="file" class="form-control" id="primaryListingMedia" @change="processPrimaryMediaUpload">
                    <div class=" m-t-5" v-if="primaryMedia != null">
                        <div class="d-flex">
                            <div class="p-1 uploaded-image">
                                <img :src="primaryMedia"  style="max-width:80px;max-height:60px;">
                                <div class="remover" @click="removePrimaryUpload">
                                    <i class="ri ri-close-line"></i>
                                </div>
                            </div>
                        </div>
                        <small class="text-danger text-italic">*Will replace previous primary media</small>
                    </div>
                </div>
                <div class="p-l-10 m-t-10">
                    <small>Other Media</small><br>

                    <input style="max-width:400px;" type="file" multiple class="form-control" id="listingMedia" @change="processUpload">
                    <div class="d-flex flex-wrap m-t-5">
                        <div class="p-1 uploaded-image" v-for="(file, index) in media" :key="'uploaded-media-'+index">
                            <img :src="file.url"  style="max-width:80px;max-height:60px;">
                            <div class="remover" @click="removeUpload(index)">
                                <i class="ri ri-close-line"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <br>
            <div class="col-md-12">
                <el-button type="primary" @click="saveNewMedia">Save Media</el-button>
            </div>
        </div>

    </el-dialog>

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