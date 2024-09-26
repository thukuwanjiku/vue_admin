<script setup>

import {computed, onMounted, ref} from "vue";
import {apiRoutes} from "@/services/apiRoutes";
import api from "@/services/api";
import {checkHasPermission, fetchExploreHubApprovedReviewsListings, isSmallScreen} from "@/services/Helpers";
import {useStore} from "vuex";

/* -----------------------
* Variables
* -----------------------
* */
const store = useStore();

const isModalLoading = ref(false);
const isViewingListing = ref(false);
const listing = ref({});

const reviewsSummary = ref({});
const reviews = ref({});
const paginationLinks = ref({});
const currentPage = ref(null);
const totalPages = ref(null);


/* -----------------------------
 * Computed Properties
 * -----------------------------
 * */
const isLoading = computed({
    get: ()=> store.state.exploreHub.isApprovedReviewsListingsLoading,
    set: (value)=> store.commit("exploreHub/SET_IS_APPROVED_REVIEWS_LISTINGS_LOADING", value)
});
const listings = computed(()=> store.state.exploreHub.approvedReviewsListings);
const pageReviews = computed(()=> {
    if(!currentPage.value || !reviews.value[currentPage.value])
        return [];

    return reviews.value[currentPage.value];
});


/* ----------------------------------
* Hooks
* ----------------------------------
* */
onMounted(()=> {
    fetchExploreHubApprovedReviewsListings();
});


/* -----------------------
* Functions
* -----------------------
* */
function viewListing(entry){
    //set the listing being viewed
    listing.value = JSON.parse(JSON.stringify(entry));
    //call method to fetch listing reviews
    fetchReviewsSummary();
    //show dialog to view listing
    isViewingListing.value = true;
}
function fetchReviewsSummary(){
    //prepare payload
    let payload = {listing_id: listing.value.id};

    //show loader
    isModalLoading.value = true;

    //make api call
    api.post(apiRoutes.EXPLORE_HUB_LISTING_REVIEWS_SUMMARY, payload)
            .then(response => {
                //set reviews summary
                reviewsSummary.value = response.data;

                //call method to fetch reviews
                fetchReviews();
            })
            .catch(error => isModalLoading.value = false)
}
function fetchReviews(url=null){
    //set api endpoint
    if(!url) url = apiRoutes.EXPLORE_HUB_LISTING_REVIEWS;

    //prepare payload
    let payload = {listing_id: listing.value.id};

    //show loader
    isModalLoading.value = true;

    //make api call
    api.post(url, payload)
            .then(response => {
                //set pagination data
                paginationLinks.value = response.data.pagination.links;
                currentPage.value = response.data.pagination.current_page;
                totalPages.value = response.data.pagination.last_page;

                //store reviews fetched
                reviews.value[response.data.pagination.current_page] = response.data.data;

                //hide loader
                isModalLoading.value = false;
            })
            .catch(error => isModalLoading.value = false)
}
function handlePaginationClick(link){
    //if is current page, don't do nothing
    if(link.active) return;

    //extract page number from url
    let pageNo = parseInt(link.url.toString().split("page=")[1]);

    //if reviews for this page have not been fetched, fetch them
    if(!reviews.value[pageNo]) return fetchReviews(link.url);

    //request pageNo's reviews have been fetched, switch to that page
    currentPage.value = pageNo;
    //change the active link
    let newLinks = JSON.parse(JSON.stringify(paginationLinks.value))
            .map(entry => {
                entry.active = entry.url
                        && entry.label.length < 2
                        && entry.url.includes(`page=${pageNo}`);
                return entry;
            })
            .map(entry => {
                if(entry.label.toLowerCase().includes('previous')){
                    entry.url = pageNo == 1 ? null : `${apiRoutes.EXPLORE_HUB_LISTING_REVIEWS}?page=${currentPage.value - 1}`
                }
                if(entry.label.toLowerCase().includes('next')){
                    entry.url = pageNo == totalPages.value ? null : `${apiRoutes.EXPLORE_HUB_LISTING_REVIEWS}?page=${currentPage.value + 1}`
                }
                return entry;
            });

    //update pagination links
    paginationLinks.value = newLinks;

    //scroll to start of reviews
}

</script>

<template>

    <div class="table-responsive m-t-10" v-loading="isLoading">
        <table class="table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Company</th>
                <th>Average</th>
                <th>Reviews Count</th>
                <th>View</th>
            </tr>
            </thead>
            <tbody>
            <tr v-if="listings.length" v-for="(listing, index) in listings"
                :key="'explore_hub-public-reviewed-listings-'+index"
                style="cursor: pointer;">
                <td @click="viewListing(listing)">{{ listing.listing_id }}</td>
                <td @click="viewListing(listing)">{{ listing.title }}</td>
                <td @click="viewListing(listing)">{{ listing.company }}</td>
                <td @click="viewListing(listing)">
                    <el-rate
                            disabled-void-color="#c8c5cb" size="small"
                            :colors="['#fdbf08', '#fdbf08', '#fdbf08']"
                            v-model="listing.average_rating" show-score score-template="({value})" disabled/>
                </td>
                <td @click="viewListing(listing)">{{ listing.reviews_count }}</td>
                <td><el-button @click="viewListing(listing)" type="primary" size="small" plain>View</el-button></td>
            </tr>
            <tr v-else><td colspan="6" class="text-center p-3">No data</td></tr>
            </tbody>
        </table>
    </div>

    <!-- Modal to view listing's reviews -->
    <el-dialog
            v-if="Object.keys(listing).length"
            v-model="isViewingListing"
            width="80%"
            top="10px"
            :close-on-click-modal="false"
            :fullscreen="isSmallScreen"
            @closed="reviews = {}">

        <div class="row" style="max-height:95vh;overflow-y:scroll;" v-loading="isModalLoading">
            <!-- Listing Indicator -->
            <div class="col-md-12 d-flex justify-content-center flex-wrap m-b-10">
                <div class="p-2">
                    <small>Listing {{ listing.listing_id }}</small>
                    <h3 class="m-0">{{ listing.title }}</h3>
                    <small>{{ listing.company }}</small>
                </div>
            </div>

            <!-- Reviews Summary -->
            <div class="row m-t-20">
                <div class="col-md-3 text-center">
                    <h5><small class="fw-bold">Total Reviews</small></h5>
                    <div class="total_review_count">
                        {{ reviewsSummary.reviews_count }}
                    </div>
                </div>
                <el-divider :style="'height:'+ (isSmallScreen ? 'inherit' : '7em')+';'" :direction="isSmallScreen ? 'horizontal' : 'vertical'"></el-divider>

                <div class="col-md-3 text-center">
                    <h5><small class="fw-bold">Average Rating</small></h5>
                    <div class="col-md-12 d-flex justify-content-center align-items-center">
                        <div class="average_rating">{{ reviewsSummary.average_rating}}</div>
                        &nbsp;&nbsp;
                        <el-rate class="big_rating" size="large" v-model="reviewsSummary.average_rating" disabled/>
                    </div>
                </div>
                <el-divider :style="'height:'+ (isSmallScreen ? 'inherit' : '7em')+';'" :direction="isSmallScreen ? 'horizontal' : 'vertical'"></el-divider>

                <div class="col-md-3">
                    <div v-for="entry in reviewsSummary.rating_levels_count"
                         :key="'rating-level-'+entry.rating"
                         class="d-flex align-items-center">
                        <div style="font-size:20px;font-weight:600;">{{ entry.rating }}</div>
                        &nbsp;&nbsp;
                        <div class="progress" style="height:12px;width:250px;">
                            <div class="progress-bar"
                                 :class="{
                            'bg-success': entry.rating == 5,
                            'bg-primary': entry.rating == 4,
                            'bg-info': entry.rating == 3,
                            'bg-warning': entry.rating == 2,
                            'bg-danger': entry.rating == 1
                         }"
                                 role="progressbar"
                                 :style="'width: '+entry.percentage+'%'"></div>
                        </div>
                        &nbsp;&nbsp;
                        <div style="font-size:20px;font-weight:600;">{{ entry.count }}</div>
                    </div>
                </div>
            </div>

            <el-divider id="reviewsStart"></el-divider>

            <!-- Reviews -->
            <div class="col-sm-12 d-flex flex-wrap reviews">

                <div v-for="review in pageReviews" :key="'page-reviews-'+review.id"
                     class="col-md-4 review" style="padding:10px">

                    <!-- Reviewer details -->
                    <div class="col-md-12 d-flex align-items-center reviewer_details">
                        <img :src="review.reviewer.avatar">
                        <div class="m-l-8">
                            <h6>
                                <small>
                                    <span class="fw-bold fs-12">{{ review.reviewer.name }}</span>
                                    <br>
                                    <span class="fs-12">
                                    {{ review.reviewer.email }}
                                </span>
                                    <br>
                                    <span class="fs-12">
                                    {{ review.reviewer.phone }}
                                </span>
                                </small>
                            </h6>
                        </div>
                    </div>

                    <!-- Review rating -->
                    <div class="col-md-12 d-flex align-items-center justify-content-between">
                        <div>
                            <el-rate disabled-void-color="#c8c5cb" :colors="['#fdbf08', '#fdbf08', '#fdbf08']" v-model="review.rating" disabled/>
                        </div>
                        <small class="fs-11">
                            {{ review.date }}
                        </small>
                    </div>

                    <!-- Reviews Message -->
                    <div class="col-sm-12 m-t-5 fs-12">{{ review.review }}</div>
                </div>

            </div>

            <!-- Reviews Pagination -->
            <div class="col-sm-12 reviews_pagination m-t-20" v-if="paginationLinks.length > 3">
                <ul class="pagination justify-content-center">
                    <li class="page-item" v-for="link in paginationLinks" :key="'pagination-link-'+link.label">
                        <a :class="{
                            'page-link': true,
                            'disabled': !link.url,
                            'active': link.active
                        }"
                           href="#"
                           @click.prevent="handlePaginationClick(link)"
                           v-html="link.label"></a>
                    </li>
                </ul>
            </div>
        </div>
    </el-dialog>

</template>

<style scoped>

</style>