<script setup>

import {useStore} from "vuex";
import {computed, ref} from "vue";
import InputLabel from "@/components/InputLabel.vue";
import api from "@/services/api";
import {apiRoutes} from "@/services/apiRoutes";
import {ElMessage} from "element-plus";
import {isSmallScreen} from "@/services/Helpers";


/* -----------------------------
 * Variables
 * -----------------------------
 * */
const store = useStore();

const isLoading = ref(false);
const isChangingCompany = ref(false);

const companyID = ref(null);
const company = ref({});

const reviewsSummary = ref({});
const reviews = ref({});
const paginationLinks = ref({});
const currentPage = ref(null);
const totalPages = ref(null);


/* -----------------------------
 * Computed Properties
 * -----------------------------
 * */
const companies = computed(()=> store.state.exploreHub.companies);
const pageReviews = computed(()=> {
    if(!currentPage.value || !reviews.value[currentPage.value])
        return [];

    return reviews.value[currentPage.value];
});


/* -----------------------------
 * Methods
 * -----------------------------
 * */
function acceptSelectedCompany(){
    //set company
    let selectedCompany = companies.value.find(entry => entry.id == companyID.value);
    if(!selectedCompany) return ElMessage.warning("An error occurred, please reload the page and try again");
    company.value = JSON.parse(JSON.stringify(selectedCompany));

    //call method to fetch reviews summary
    fetchReviewsSummary();
}
function fetchReviewsSummary(){
    //prepare payload
    let payload = {company_id: companyID.value};

    //show loader
    isLoading.value = true;

    //make api call
    api.post(apiRoutes.EXPLORE_HUB_COMPANY_REVIEWS_SUMMARY, payload)
            .then(response => {
                //set reviews summary
                reviewsSummary.value = response.data;

                //call method to fetch reviews
                fetchReviews();
            })
            .catch(error => isLoading.value = false)
}
function fetchReviews(url=null){
    //set api endpoint
    if(!url) url = apiRoutes.EXPLORE_HUB_COMPANY_REVIEWS;

    //prepare payload
    let payload = {company_id: company.value.id};

    //show loader
    isLoading.value = true;

    //make api call
    api.post(url, payload)
            .then(response => {
                //set pagination data
                paginationLinks.value = response.data.pagination.links;
                currentPage.value = response.data.pagination.current_page;
                totalPages.value = response.data.pagination.last_page;

                //store reviews fetched
                reviews.value[response.data.pagination.current_page] = response.data.data
                        .map(entry => {
                            entry.reviewer.avatar = `https://randomuser.me/api/portraits/men/${entry.rating}.jpg`;
                            return entry;
                        });

                //set is not changing company
                isChangingCompany.value = false;

                //hide loader
                isLoading.value = false;

                //reset company picker
                companyID.value = null;
            })
            .catch(error => isLoading.value = false)
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
                    entry.url = pageNo == 1 ? null : `${apiRoutes.EXPLORE_HUB_COMPANY_REVIEWS}?page=${currentPage - 1}`
                }
                if(entry.label.toLowerCase().includes('next')){
                    entry.url = pageNo == totalPages.value ? null : `${apiRoutes.EXPLORE_HUB_COMPANY_REVIEWS}?page=${currentPage + 1}`
                }
                return entry;
            });

    //update pagination links
    paginationLinks.value = newLinks;

    //scroll to start of reviews
}
</script>

<template>

    <!-- When no company is selected -->
    <div class="row d-flex align-items-center justify-content-center p-t-20 p-b-20" v-if="!Object.keys(company).length">
        <div class="col-md-4 col-sm-12">
            <input-label>Select company to browse reviews</input-label>
            <el-select
                    v-model="companyID"
                    placeholder="Click to select"
                    size="large"
                    filterable>
                <el-option
                        v-for="company in companies"
                        :key="'reviews-company-picker-'+company.id"
                        :label="company.name"
                        :value="company.id">
                    <img :src="company.logo" style="max-width:30px;max-height: 20px;border-radius:10px;">
                    &nbsp;{{ company.name }}
                </el-option>
            </el-select>

            <div class="col-sm-12 m-t-10">
                <el-button :disabled="!companyID" type="primary" @click="acceptSelectedCompany">Browse Reviews</el-button>
            </div>
        </div>
    </div>

    <!-- When there's a company selected -->
    <div class="row" v-loading="isLoading" v-else>

        <!-- Company Indicator -->
        <div class="row p-t-15 p-b-10">
            <div class="col-md-12 d-flex align-items-center justify-content-center flex-wrap p-2">
                <h3 class="m-0">{{ company.name }}</h3>
                &nbsp;&nbsp;<el-button size="small" v-if="!isChangingCompany" @click="isChangingCompany = true" plain round>Change</el-button>

                <div class="d-flex align-items-center flex-wrap company_changer m-l-10" v-if="isChangingCompany">
                    <el-select
                            v-model="companyID"
                            placeholder="Click to select another company"
                            style="width: 255px;"
                            filterable>
                        <el-option
                                v-for="company in companies.filter(entry => entry.id != company.id)"
                                :key="'reviews-company-picker-'+company.id"
                                :label="company.name"
                                :value="company.id">
                            <img :src="company.logo" style="max-width:30px;max-height: 20px;border-radius:10px;">
                            &nbsp;{{ company.name }}
                        </el-option>
                    </el-select>
                    &nbsp;&nbsp;
                    <div class="change_actions">
                        <el-button :disabled="!companyID" type="primary" @click="acceptSelectedCompany">Go</el-button>
                        <el-button @click="isChangingCompany = false">Cancel</el-button>
                    </div>
                </div>
            </div>
        </div>

        <template v-if="reviewsSummary.reviews_count && reviewsSummary.reviews_count > 0">
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

                    <!-- Review Listing -->
                    <div class="col-sm-12 review_listing">
                        <small class="text-muted fs-11">Posted for</small>
                        <br>
                        <p class="m-0 fw-bold fs-12">{{ review.listing_title }}</p>
                    </div>
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
        </template>

        <template v-else>
            <div class="text-center text-muted p-5">
                No reviews found
            </div>
        </template>
    </div>

</template>

<style scoped>
</style>