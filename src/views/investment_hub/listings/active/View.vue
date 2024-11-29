<script setup>

import {useStore} from "vuex";
import {useRouter} from "vue-router";
import CloseButton from "@/components/CloseButton.vue";
import {onMounted, ref} from "vue";
import {startCase} from "lodash-es";
import {
    checkHasPermission, fetchInvestmentHubActiveListings,
    hasPermissionsWhichContain,
    isSmallScreen,
    moneyFormatter
} from "../../../../services/Helpers";
import {Carousel, Slide, Navigation, Pagination} from "vue3-carousel";
import 'vue3-carousel/dist/carousel.css'
import {
    ArrowDown,
    CircleCheck,
    CircleCheckFilled, CloseBold,
    Comment,
    Edit,
    Money,
    PictureFilled,
    TopRight
} from "@element-plus/icons-vue";
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
  listingMedia.value = JSON.parse(JSON.stringify(listing.value.secondary_media_formatted_links));

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

        case 'submit_for_approval':
            return confirmSubmitForApproval();
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
    if(!checkHasPermission('investment_hub.reviewed_listings.view')) return;

    return router.push({
        name: 'investment_hub.listings.reviews',
        params:{
            listingTitleSlug: listing.value.product_name.toString().replaceAll(" ", "-")
        }
    })
}

function confirmSubmitForApproval(){
    ElMessageBox.confirm('Sure you want to submit this listing for approval?', 'Confirm', {
        confirmButtonText: 'Yes, continue',
        cancelButtonText: 'Cancel',
    })
            .then(() => {
                //define payload to send to api
                let payload = {
                    listing_id: listing.value.id
                };

                //send payload to method handling the
                submitListingForApproval(payload);
            })
            .catch(() => {})
}
function submitListingForApproval(payload){
    //show loader
    isLoading.value = true;

    //make api call
    api.post(apiRoutes.INVESTMENT_HUB_SUBMIT_LISTING_FOR_APPROVAL, payload)
            .then(response => {
                //refresh listings
                fetchInvestmentHubActiveListings(JSON.parse(JSON.stringify(store.state.investmentHub.activeListingsFilters)));

                //show success message
                $.growl.notice({message: response.data.message});

                //redirect back
                router.back();
            })
            .catch(error => isLoading.value = false)
}

function confirmApprove(){
    ElMessageBox.confirm(`Sure you want to <strong>approve</strong> this listing?`, 'Confirm', {
        confirmButtonText: 'Approve',
        cancelButtonText: 'Cancel',
        dangerouslyUseHTMLString:true
    })
            .then(() => {
                //define payload to send to api
                let payload = {
                    listing_id: listing.value.id
                };

                //send payload to method handling the
                approveListing(payload);
            })
            .catch(() => {})
}
function approveListing(payload){
    //show loader
    isLoading.value = true;

    //make api call
    api.post(apiRoutes.INVESTMENT_HUB_APPROVE_LISTING, payload)
            .then(response => {
                //refresh listings
                fetchInvestmentHubActiveListings(JSON.parse(JSON.stringify(store.state.investmentHub.activeListingsFilters)));

                //show success message
                $.growl.notice({message: response.data.message});

                //redirect back
                router.back();
            })
            .catch(error => isLoading.value = false)
}

function confirmReject(){
    ElMessageBox.prompt('Sure you want to reject this listing?\nPlease give a reason why you want to reject', 'Confirm Reject', {
        confirmButtonText: 'Reject',
        cancelButtonText: 'Cancel',
        inputPlaceholder: "Type here why you want to reject",
        inputValidator: (value)=> {
            if(!value || !value.length){
                return "Please give a reason";
            }
            return true;
        },
    })
            .then(({ value }) => {
                //define payload to send to api
                let payload = {
                    listing_id: listing.value.id,
                    reason: value
                };

                //send payload to method handling the
                rejectListing(payload);
            })
            .catch(() => {})
}
function rejectListing(payload){
    //show loader
    isLoading.value = true;

    //make api call
    api.post(apiRoutes.INVESTMENT_HUB_REJECT_LISTING, payload)
            .then(response => {
                //refresh listings
                fetchInvestmentHubActiveListings(JSON.parse(JSON.stringify(store.state.investmentHub.activeListingsFilters)));

                //show success message
                $.growl.notice({message: response.data.message});

                //redirect back
                router.back();
            })
            .catch(error => isLoading.value = false)
}

</script>

<template>
  <div class="container listing-view-page" v-if="Object.keys(listing).length" v-loading="isLoading">
    <!-- Header Section -->
    <div class="text-center mb-2">
      <h3 class="h4 fw-bold">{{ listing.product_name }}</h3>
      <p class="text-muted mb-2">{{ listing.partner_company.business_name }}</p>
      <p>
        <el-tag
            :type="listing.status === 'approved' ? 'success' : listing.status === 'pending' ? 'warning' : 'danger'"
            effect="dark">
          {{ listing.status }}
        </el-tag>
      </p>
    </div>

    <!-- Primary Image -->
    <div class="text-center mb-4">
      <img :src="listing.primary_media_file_url" alt="Primary Image" class="img-fluid rounded">
    </div>

    <!-- Details Section -->
    <div class="border-top pt-3 mb-4">
      <h6 class="fw-bold">Details</h6>
      <div class="text-muted">
        <p class="mb-2"><strong>Reference:</strong> {{ listing.reference }}</p>
        <p class="mb-2"><strong>Category:</strong> {{ listing.category.name }}</p>
        <p class="mb-2"><strong>Price:</strong> {{ listing.formatted_price }}</p>
        <p class="mb-2">
          <strong>Stock:</strong>
          <span v-if="listing.stock_availability">{{ listing.stock_availability }}</span>
          <span v-else class="text-muted">N/A</span>
        </p>
        <p>
          <strong>Placement:</strong>
          <span
              :class="{
          'text-primary': listing.placement === 'top_picks',
          'text-warning': listing.placement === 'popular'
        }"
              class="fw-bold">
        {{ startCase(listing.placement) }}
      </span>
        </p>
      </div>
    </div>


    <!-- Description -->
    <div class="border-top pt-3 mb-4">
      <h6 class="fw-bold">Description</h6>
      <p v-html="listing.description" class="text-muted"></p>
    </div>

    <!-- Dates Section -->
    <div class="border-top pt-3 mb-4">
      <h6 class="fw-bold">Running Dates</h6>
      <div class="text-muted">
        <p class="mb-2"><strong>Start Date:</strong> {{ listing.formatted_start_date }}</p>
        <p><strong>End Date:</strong> {{ listing.formatted_end_date }}</p>
      </div>
    </div>

    <!-- Media Carousel -->
    <div class="border-top pt-3 mb-4">
      <h6 class="fw-bold">Gallery</h6>
      <Carousel :itemsToShow="2" :wrapAround="true" :transition="500" :autoplay="2000">
        <Slide
            v-for="(image, index) in listingMedia"
            :key="'secondary-media-'+index">
          <img :src="image" alt="Secondary Media" class="img-fluid rounded">
        </Slide>
        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
    </div>
  </div>
</template>

<style scoped>
.listing-view-page {
  font-family: 'Roboto', sans-serif;
  max-width: 100%;
  margin: 0 auto;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.img-fluid {
  max-height: 300px;
  object-fit: cover;
}
</style>