<script setup>

import {computed, onMounted, ref} from "vue";
import {apiRoutes} from "@/services/apiRoutes";
import api from "@/services/api";
import {Box} from "@element-plus/icons-vue";
import {isSmallScreen} from "@/services/Helpers";
import {ElMessageBox} from "element-plus";
import {useStore} from "vuex";

/* ----------------------------------
* Variables & properties
* ----------------------------------
* */
const store = useStore();

const isLoading = ref(false);
const isModalLoading = ref(false);
const isViewingListing = ref(false);

const listings = ref([]);
const activeListing = ref({});
const reports = ref({});
const paginationLinks = ref({});
const currentPage = ref(null);
const totalPages = ref(null);


/* -----------------------------
 * Computed Properties
 * -----------------------------
 * */
const pageEntries = computed(()=> {
    if(!currentPage.value || !reports.value[currentPage.value])
        return [];

    return reports.value[currentPage.value];
});


/* ----------------------------------
* Lifecycle Hooks
* ----------------------------------
* */
onMounted(()=> {
    //fetch listings if they're not already
    fetchListings();
});


/* ----------------------------------
* Methods & functions
* ----------------------------------
* */
function fetchListings(){
    //fetch listings from API
    //show loader
    isLoading.value = true;

    //make api call
    api.post(apiRoutes.INVESTMENT_HUB_REPORTED_LISTINGS)
            .then(response => {
                //refresh original listings array
                listings.value = response.data.data;

                //dismiss loader
                isLoading.value = false;
            }).catch(error => isLoading.value = false)
}
function viewListing(listing){
    //set listing being viewed
    activeListing.value = JSON.parse(JSON.stringify(listing));

    //show dialog for viewing listing
    isViewingListing.value = true;

    //fetch listing reports
    fetchReports();
}
function fetchReports(url=null){
    //set api endpoint
    if(!url) url = apiRoutes.INVESTMENT_HUB_LISTING_REPORTS;

    //prepare payload
    let payload = {listing_id: activeListing.value.id};

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
                reports.value[response.data.pagination.current_page] = response.data.data;

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
    if(!reports.value[pageNo]) return fetchReports(link.url);

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
                    entry.url = pageNo == 1 ? null : `${apiRoutes.INVESTMENT_HUB_LISTING_REPORTS}?page=${currentPage.value - 1}`
                }
                if(entry.label.toLowerCase().includes('next')){
                    entry.url = pageNo == totalPages.value ? null : `${apiRoutes.INVESTMENT_HUB_LISTING_REPORTS}?page=${currentPage.value + 1}`
                }
                return entry;
            });

    //update pagination links
    paginationLinks.value = newLinks;

    //scroll to start of reviews
}

function confirmArchive(){
    ElMessageBox.prompt('Sure you want to archive this listing?\nPlease give a reason why you want to archive', 'Confirm Archive', {
        confirmButtonText: 'Archive',
        cancelButtonText: 'Cancel',
        inputPlaceholder: "Type here why you want to archive",
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
                    id: activeListing.value.id,
                    reason: value
                };

                //send payload to method handling the
                archiveListing(payload);
            })
            .catch(() => {})
}
function archiveListing(payload){
    //show loader
    isModalLoading.value = true;

    //make api call
    api.post(apiRoutes.INVESTMENT_HUB_ARCHIVE_LISTING, payload)
            .then(response => {
                //show success message
                $.growl.notice({message: response.data.message});

                //dismiss modal
                isViewingListing.value = false;

                //refresh local list of listings
                fetchListings();

                //reset active listings list so that they will be fetched
                store.commit("investmentHub/STORE_ACTIVE_LISTINGS", []);

                //dismiss loader
                isModalLoading.value = false;
            })
            .catch(error => isModalLoading.value = false)
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
                    <th>Times Reported</th>
                    <th>Details</th>
                </tr>
                </thead>
                <tbody>
                <tr v-if="listings.length" v-for="(listing, index) in listings"
                    :key="'investment_hub-reported-listings-'+index"
                    style="cursor: pointer;">
                    <td @click="viewListing(listing)">
                        {{ listing.listing_id }}
                    </td>
                    <td @click="viewListing(listing)">{{ listing.title }}</td>
                    <td @click="viewListing(listing)">{{ listing.company }}</td>
                    <td @click="viewListing(listing)">{{ listing.times_reported }}</td>
                    <td><el-button @click="viewListing(listing)" type="primary" size="small" plain>Details</el-button></td>
                </tr>
                <tr v-else><td colspan="5" class="text-center p-3">No data</td></tr>
                </tbody>
            </table>
        </div>

    </div>

    <!-- Modal to view listing's reports -->
    <el-dialog
            v-if="activeListing"
            v-model="isViewingListing"
            width="80%"
            top="10px"
            :close-on-click-modal="false"
            :fullscreen="isSmallScreen"
            @closed="reports = {}">

        <div class="row" style="height:95vh;overflow-y:scroll;" v-loading="isModalLoading">

            <!-- Listing Indicator -->
            <div class="col-md-12 d-flex justify-content-center flex-wrap p-t-15">
                <div class="p-2">
                    <small>Listing {{ activeListing.listing_id }}</small>
                    <h3 class="m-0">{{ activeListing.title }}</h3>
                </div>
            </div>

            <!-- Listing Details -->
            <div v-if="isSmallScreen" class="col-md-12 d-flex justify-content-center flex-wrap">
                <div class="p-2">
                    <p class="m-0">
                        Listing Company: <span class="fw-bold">{{ activeListing.company }}</span>
                    </p>
                    <p class="m-0">
                        Times Reported: <span class="fw-bold fs-16">{{ activeListing.times_reported }}</span>
                    </p>
                </div>
            </div>
            <div v-if="!isSmallScreen" class="col-md-12 d-flex justify-content-center flex-wrap p-t-10 p-b-10">
                <div class="col-md-5 col-sm-12 d-flex justify-content-between flex-wrap">
                    <div>
                        <small>Listing Company</small>
                        <h6 class="m-0 fw-bold">{{ activeListing.company }}</h6>
                    </div>
                    <el-divider direction="vertical" style="height:40px;"></el-divider>
                    <div>
                        <small>Times Reported</small>
                        <h6 class="m-0 fw-bold fs-25">{{ activeListing.times_reported }}</h6>
                    </div>
                </div>
            </div>

            <el-divider></el-divider>

            <!-- Reports -->
            <div :class="{
                    'col-md-12 flex-wrap reviews': true,
                    'd-flex': !isSmallScreen
                }">

                <div v-for="report in pageEntries" :key="'page-reviews-'+report.id"
                     class="col-md-4 col-sm-12 review" style="padding:10px">

                    <!-- Reporter details -->
                    <div class="col-md-12 d-flex align-items-center reviewer_details">
                        <img :src="report.reporter.avatar">
                        <div class="m-l-8">
                            <h6>
                                <small>
                                    <span class="fw-bold fs-12">{{ report.reporter.name }}</span>
                                    <br>
                                    <span class="fs-12">
                                    {{ report.reporter.email }}
                                </span>
                                    <br>
                                    <span class="fs-12">
                                    {{ report.reporter.phone }}
                                </span>
                                </small>
                            </h6>
                        </div>
                    </div>

                    <!-- Report Message -->
                    <div class="col-md-12 m-t-5 fs-12" style="color:#993455;">{{ report.reason.toLowerCase() == 'other' ? report.description : report.reason }}</div>

                    <!-- Report date -->
                    <div class="col-md-12">
                        <small class="fs-11 text-italic">
                            {{ report.date }}
                        </small>
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

            <div class="m-t-20 m-b-20 d-flex justify-content-end">
                <el-button @click="confirmArchive" :icon="Box" type="danger" text bg>Archive Listing</el-button>
            </div>
        </div>
    </el-dialog>

</template>

<style scoped>

</style>