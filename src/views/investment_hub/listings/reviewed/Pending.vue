<script setup>

import {onMounted, ref} from "vue";
import api from "@/services/api";
import {apiRoutes} from "@/services/apiRoutes";
import {
    checkHasPermission,
    fetchInvestmentHubActiveListings, fetchInvestmentHubApprovedReviewsListings,
    isSmallScreen
} from "@/services/Helpers";
import {ArrowDown, Box, CircleCheck, Close} from "@element-plus/icons-vue";
import {ElMessageBox} from "element-plus";
import {useStore} from "vuex";

/* -----------------------
* Variables
* -----------------------
* */
const store = useStore();

const reviews = ref([]);
const isLoading = ref(false);
const isViewingReview = ref(false);
const actionReview = ref({});


/* ----------------------------------
* Hooks
* ----------------------------------
* */
onMounted(()=> {
    fetchReviews();
});


/* -----------------------
* Functions
* -----------------------
* */
function fetchReviews(){
    //show loader
    isLoading.value = true;

    //make api call
    api.get(apiRoutes.INVESTMENT_HUB_PENDING_REVIEWS)
            .then(response => {
                //store reviews
                reviews.value = response.data.data;

                //dismiss loader
                isLoading.value = false;
            }).catch(error => isLoading.value = false)
}
function handleEntryAction(payload){
    switch (payload.action){
        case 'view':
            return viewReview(payload.review);

        case 'approve':
            return confirmApprove(payload.review);

        case 'reject':
            return confirmReject(payload.review);
    }
}
function viewReview(review){
    actionReview.value = JSON.parse(JSON.stringify(review));
    isViewingReview.value = true;
}

function confirmApprove(review){
    ElMessageBox.confirm(`Sure you want to <strong>approve</strong> this review? <br>Once approved, it will be <strong>visible to the public</strong>`, 'Confirm Approve Review', {
        confirmButtonText: 'Approve',
        cancelButtonText: 'Cancel',
        dangerouslyUseHTMLString:true
    })
            .then(() => {
                //define payload to send to api
                let payload = {
                    review_id: review.id
                };

                //process
                approveReview(payload);
            })
            .catch(() => {})
}
function approveReview(payload){
    //show loader
    isLoading.value = true;

    //make api call
    api.post(apiRoutes.INVESTMENT_HUB_APPROVE_PENDING_REVIEW, payload)
            .then(response => {
                //refresh pending reviews list
                fetchReviews();

                //dismiss view modal
                isViewingReview.value = false;

                //show success message
                $.growl.notice({message: response.data.message});

                //refresh approved reviews listings
                fetchInvestmentHubApprovedReviewsListings();

                //refresh active listings list
                fetchInvestmentHubActiveListings(JSON.parse(JSON.stringify(store.state.investmentHub.activeListingsFilters)))
            })
            .catch(error => isLoading.value = false)
}

function confirmReject(review){
    ElMessageBox.confirm(`Sure you want to <strong>reject and remove</strong> this review?`, 'Confirm Reject Review', {
        confirmButtonText: 'Reject',
        cancelButtonText: 'Cancel',
        dangerouslyUseHTMLString:true
    })
            .then(() => {
                //define payload to send to api
                let payload = {
                    review_id: review.id
                };

                //process
                rejectReview(payload);
            })
            .catch(() => {})
}
function rejectReview(payload){
    //show loader
    isLoading.value = true;

    //make api call
    api.post(apiRoutes.INVESTMENT_HUB_REJECT_PENDING_REVIEW, payload)
            .then(response => {
                //refresh pending reviews list
                fetchReviews();

                //dismiss view modal
                isViewingReview.value = false;

                //show success message
                $.growl.notice({message: response.data.message});
            })
            .catch(error => isLoading.value = false)
}

</script>

<template>

    <div class="row" v-loading="isLoading">
        <!-- Datatable -->
        <div class="table-responsive m-t-10">
            <table class="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Company</th>
                    <th>Rating</th>
                    <th>Review</th>
                    <th>Posted By</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr v-if="reviews.length" v-for="(review, index) in reviews"
                    :key="'investment_hub-pending-reviews-'+index"
                    style="cursor: pointer;">
                    <td @click="viewReview(review)">{{ review.listing_id }}</td>
                    <td @click="viewReview(review)">{{ review.listing_title }}</td>
                    <td @click="viewReview(review)">{{ review.company }}</td>
                    <td @click="viewReview(review)">
                        <el-rate
                                disabled-void-color="#c8c5cb" size="small"
                                :colors="['#fdbf08', '#fdbf08', '#fdbf08']"
                                v-model="review.rating" show-score score-template="({value})" disabled/>
                    </td>
                    <td @click="viewReview(review)">
                        {{ review.review.toString().substring(0, 90) }}
                        <template v-if="review.review.toString().length > 90">...</template>
                    </td>
                    <td @click="viewReview(review)">{{ review.reviewer.name }}</td>
                    <td>
                        <el-dropdown trigger="click" @command="handleEntryAction">
                            <el-button plain type="primary"
                                       size="small">
                                Actions<el-icon class="el-icon--right"><arrow-down /></el-icon>
                            </el-button>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item :command="{action:'view',review}">View</el-dropdown-item>

                                    <el-dropdown-item v-if="checkHasPermission('investment_hub.reviewed_listings.approve')" :command="{action:'approve',review}">Approve</el-dropdown-item>
                                    <el-dropdown-item v-if="checkHasPermission('investment_hub.reviewed_listings.approve')" :command="{action:'reject',review}">Reject</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </td>
                </tr>
                <tr v-else><td colspan="7" class="text-center p-3">No data</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Modal to view review -->
    <el-dialog
            v-if="Object.keys(actionReview).length"
            v-model="isViewingReview"
            width="40%"
            top="10px"
            :close-on-click-modal="false"
            :fullscreen="isSmallScreen">

        <div class="row p-2" v-loading="isLoading">

            <div class="review">
                <!-- Reviewer details -->
                <div class="col-md-12 d-flex align-items-center reviewer_details">
                    <img :src="actionReview.reviewer.avatar">
                    <div class="m-l-8">
                        <h6>
                            <small>
                                <span class="fw-bold">{{ actionReview.reviewer.name }}</span>
                                <br>
                                <span class="">
                                    {{ actionReview.reviewer.email }}
                                </span>
                                <br>
                                <span class="">
                                    {{ actionReview.reviewer.phone }}
                                </span>
                            </small>
                        </h6>
                    </div>
                </div>

                <!-- Review rating -->
                <div class="col-md-12 d-flex align-items-center justify-content-between">
                    <div>
                        <el-rate disabled-void-color="#c8c5cb" :colors="['#fdbf08', '#fdbf08', '#fdbf08']" v-model="actionReview.rating" disabled/>
                    </div>
                    <small class="">
                        {{ actionReview.date }}
                    </small>
                </div>

                <!-- Reviews Message -->
                <div class="col-sm-12 m-t-5 fs-12">{{ actionReview.review }}</div>

                <!-- Review Listing -->
                <div class="col-sm-12 m-t-10 review_listing">
                    <small class="text-muted fs-11">Posted for</small>
                    <br>
                    <p class="m-0 fw-bold">{{ actionReview.listing_title }}</p>
                    <p class="m-0 fs-13">{{ actionReview.company }}</p>
                </div>
            </div>

            <template v-if="checkHasPermission('investment_hub.reviewed_listings.approve')">
                <el-divider></el-divider>
                <div class="col-md-12 d-flex justify-content-end">
                    <el-button @click="confirmApprove(actionReview)" type="primary" :icon="CircleCheck">Approve for Public</el-button>
                    <el-button @click="confirmReject(actionReview)" type="danger" :icon="Close">Reject & Remove</el-button>
                </div>
            </template>

        </div>
    </el-dialog>

</template>

<style scoped>
.reviewer_details > img{
    height: 60px;
    border-radius: 50%;
}
.review{
    box-shadow: none;
}
</style>