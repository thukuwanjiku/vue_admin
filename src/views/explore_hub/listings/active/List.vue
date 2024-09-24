<script setup>

import {ArrowDown, Plus} from "@element-plus/icons-vue";
import {ref, computed, watch, onMounted} from "vue";
import {startCase} from "lodash-es";
import {useStore} from "vuex";
import api from "@/services/api";
import {apiRoutes} from "@/services/apiRoutes";
import {useRouter} from "vue-router";
import {ElMessage, ElMessageBox} from "element-plus";
import {
    checkHasPermission,
    fetchExploreHubActiveListings, fetchExploreHubArchivedListings,
    fetchExploreHubCompanies,
    hasPermissionsWhichContain
} from "@/services/Helpers";
import AccessDenied from "@/components/AccessDenied.vue";

/* ----------------------------------
* Variables & properties
* ----------------------------------
* */
const store = useStore();
const router = useRouter();

//filters
const filters = ref({
    to: null,
    from: null,
    action: 'added'
});
const isDefaultFilters = ref(true);

const listings = ref([]);


/* ----------------------------------
* Computed properties
* ----------------------------------
* */
const isLoading = computed({
    get: ()=> store.state.exploreHub.isActiveListingsLoading,
    set: (value)=> store.commit("exploreHub/SET_IS_ACTIVE_LISTINGS_LOADING", value)
});
const listingsSource = computed({
    get: ()=> store.state.exploreHub.activeListings,
    set: (data)=> store.commit("exploreHub/STORE_ACTIVE_LISTINGS", data)
});
const currentFilters = computed({
    get: ()=> store.state.exploreHub.activeListingsFilters,
    set: (data)=> store.commit("exploreHub/STORE_ACTIVE_LISTINGS_FILTERS", data)
});
const hasChangedFilters = computed(() => {
    return Object.keys(filters.value)
            .some(key => currentFilters.value[key] !== filters.value[key]);
});

/* ----------------------------------
* Watchers
* ----------------------------------
* */
watch(listingsSource, (newValue, oldValue)=> {
    let newListings = JSON.parse(JSON.stringify(newValue))
    listings.value = newListings.map((entry) => {
        entry.selected = false;
        return entry;
    })

    //update new filters
    let newFilters = JSON.parse(JSON.stringify(store.state.exploreHub.activeListingsFilters));
    setCurrentFilters(newFilters);
})


/* ----------------------------------
* Lifecycle Hooks
* ----------------------------------
* */
onMounted(()=> {
    //fetch listings if they're not already
    if(checkHasPermission('explore_hub.listings.view')) fetchListings();
});


/* ----------------------------------
* Methods & functions
* ----------------------------------
* */
function fetchListings(forceFetch = false){
    if(listingsSource.value.length && !forceFetch){
        //list fetched before, init the necessary variables
        let availableListings = JSON.parse(JSON.stringify(listingsSource.value))
        listings.value = availableListings.map((entry) => {
            entry.selected = false;
            return entry;
        });

        //read current filters
        if(Object.values(currentFilters.value).length){
            filters.value = JSON.parse(JSON.stringify(currentFilters.value))
        }

        return;
    }

    //fetch listings from API
    return fetchExploreHubActiveListings(JSON.parse(JSON.stringify(filters.value)))
}
function setCurrentFilters(activeFilters) {
    filters.value.from = activeFilters.from;
    filters.value.to = activeFilters.to;
    filters.value.action = activeFilters.action;
}
function handleFilters(){
    if(!hasChangedFilters){
        //filters haven't changed, reset filters (fetch with defaults)
        filters.value.from = null;
        filters.value.to = null;
        filters.value.action = "added";

        isDefaultFilters.value = true;
    }else{
        //validate that end date is after start date
        let start  = new Date(filters.value.from);
        let end  = new Date(filters.value.to);
        if(start > end){
            return ElMessage.warning("End date must be after start date")
        }

        isDefaultFilters.value = false;
    }

    return fetchListings(true)
}

function handleEntryAction(payload){
    switch (payload.action){
        case 'view':
            return viewListing(payload.listing);

        case 'edit':
            return goEditListing(payload.listing);

        case 'archive':
            return confirmArchive(payload.listing);

        case 'delete':
            return confirmDelete(payload.listing);

        case 'submit_for_approval':
            return confirmSubmitForApproval(payload.listing);

        case 'approve':
            return confirmApprove(payload.listing);

        case 'reject':
            return confirmReject(payload.listing);
    }
}

function viewListing(listing){
    //check has permission to view listing
    if(!checkHasPermission('explore_hub.listings.view')) return;

    //store viewed listing in vuex store
    store.commit("exploreHub/STORE_VIEWED_LISTING", JSON.parse(JSON.stringify(listing)));
    //go to view page
    return router.push({
        name: 'explore_hub.listings.view',
        params:{
            listingTitleSlug: listing.title.toString().replaceAll(" ", "-")
        }
    })
}

function goEditListing(listing){
    //check has permissions to edit listing
    if(!checkHasPermission('explore_hub.listings.edit'))return;

    //store the entry to be edited in vuex
    store.commit("exploreHub/STORE_EDIT_LISTING", JSON.parse(JSON.stringify(listing)));

    //navigate to the edit route
    return router.push({name: 'explore_hub.listings.edit'})
}

function confirmArchive(listing){
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
                    id: listing.id,
                    reason: value
                };

                //send payload to method handling the
                archiveListing(payload);
            })
            .catch(() => {})
}
function archiveListing(payload){
    //show loader
    isLoading.value = true;

    //make api call
    api.post(apiRoutes.EXPLORE_HUB_ARCHIVE_LISTING, payload)
            .then(response => {
                //Refresh listings list
                fetchListings(true);

                //Refresh archived listings
                fetchExploreHubArchivedListings();

                //show success message
                $.growl.notice({message: response.data.message});
            })
            .catch(error => isLoading.value = false)
}

function confirmDelete(listing){
    ElMessageBox.confirm('Sure you want to delete this listing?', 'Confirm Delete', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
    })
            .then(() => {
                //define payload to send to api
                let payload = {
                    id: listing.id
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
    api.post(apiRoutes.EXPLORE_HUB_DELETE_LISTING, payload)
            .then(response => {
                //refresh listings
                fetchListings(true);

                //show success message
                $.growl.notice({message: response.data.message});
            })
            .catch(error => isLoading.value = false)
}

function confirmSubmitForApproval(listing){
    ElMessageBox.confirm('Sure you want to submit this listing for approval?', 'Confirm', {
        confirmButtonText: 'Yes, continue',
        cancelButtonText: 'Cancel',
    })
            .then(() => {
                //define payload to send to api
                let payload = {
                    listing_id: listing.id
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
    api.post(apiRoutes.EXPLORE_HUB_SUBMIT_LISTING_FOR_APPROVAL, payload)
            .then(response => {
                //refresh listings
                fetchListings(true);

                //show success message
                $.growl.notice({message: response.data.message});
            })
            .catch(error => isLoading.value = false)
}

function confirmApprove(listing){
    ElMessageBox.confirm(`Sure you want to <strong>approve</strong> this listing?`, 'Confirm', {
        confirmButtonText: 'Approve',
        cancelButtonText: 'Cancel',
        dangerouslyUseHTMLString:true
    })
            .then(() => {
                //define payload to send to api
                let payload = {
                    listing_id: listing.id
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
    api.post(apiRoutes.EXPLORE_HUB_APPROVE_LISTING, payload)
            .then(response => {
                //refresh listings
                fetchListings(true);

                //show success message
                $.growl.notice({message: response.data.message});
            })
            .catch(error => isLoading.value = false)
}

function confirmReject(listing){
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
                    listing_id: listing.id,
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
    api.post(apiRoutes.EXPLORE_HUB_REJECT_LISTING, payload)
            .then(response => {
                //Refresh listings list
                fetchListings(true);

                //show success message
                $.growl.notice({message: response.data.message});
            })
            .catch(error => isLoading.value = false)
}

</script>

<template>

    <div class="row" v-loading="isLoading">
        <div class="col-sm-12 d-flex justify-content-between align-items-center m-b-10">
            <div v-if="checkHasPermission('explore_hub.listings.add')">
                <el-button @click="router.push({name:'explore_hub.listings.create'})" type="primary" :icon="Plus" plain>Add Listing</el-button>
            </div>
            <div class="d-none d-md-block" v-if="checkHasPermission('explore_hub.listings.view')">
                <div class="d-flex align-items-center">
                    <h6 style="width: 200px;margin:0;">
                        <small>Showing listings</small>
                    </h6>

                    <el-select v-model="filters.action" placeholder="Select" style="max-width: 100px">
                        <el-option
                                v-for="item in ['added', 'running']"
                                :key="'filters-action-'+item"
                                :label="startCase(item)"
                                :value="item"
                        />
                    </el-select>
                    &nbsp;&nbsp;&nbsp;&nbsp;

                    <el-date-picker
                            v-model.deep="filters.from"
                            type="date"
                            value-format="YYYY-MM-DD"
                            format="MMM D, YYYY"
                            placeholder="Pick a date"
                            style="max-width:150px;"
                    />

                    &nbsp;&nbsp;<h6 class="m-0">To</h6>&nbsp;&nbsp;

                    <el-date-picker
                            v-model="filters.to"
                            type="date"
                            value-format="YYYY-MM-DD"
                            format="MMM D, YYYY"
                            placeholder="Pick a date"
                            style="max-width:150px;"
                    />

                    &nbsp;&nbsp;&nbsp;
                    <el-button plain
                               :disabled="isDefaultFilters && !hasChangedFilters"
                               @click="handleFilters" :type="!hasChangedFilters ? 'danger' : ''">
                       <template v-if="hasChangedFilters">
                           <i class="ri ri-filter-3-fill"></i> &nbsp;Apply
                       </template>
                        <template v-if="!hasChangedFilters">
                            <i class="bx bx-reset"></i> &nbsp;Reset
                        </template>
                    </el-button>
                </div>
            </div>
        </div>
        <br>

        <!-- Datatable -->
        <div class="table-responsive m-t-10" v-if="checkHasPermission('explore_hub.listings.view')">
            <table class="table table-hover">
                <thead>
                <tr>
                    <!--<th>Select</th>-->
                    <th>ID</th>
                    <th>Title</th>
                    <th>Company</th>
                    <th>Placement</th>
                    <th>Status</th>
                    <th>Action</th>
                    <th>By</th>
                    <th>Payment Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr v-if="listings.length" v-for="(listing, index) in listings"
                    :key="'explore_hub-active-listings-'+index"
                    :class="{'table-info': listing.selected}"
                    style="cursor: pointer;">
                    <!--<td class="text-center">
                        <el-checkbox v-model="listing.selected"></el-checkbox>
                    </td>-->
                    <td @click="viewListing(listing)">
                        {{ listing.listing_id }}
                    </td>
                    <td @click="viewListing(listing)">{{ listing.title }}</td>
                    <td @click="viewListing(listing)">{{ listing.company.name }}</td>
                    <td @click="viewListing(listing)">
                        <el-tag
                                v-if="listing.placement == 'for_you'"
                                type="success"
                                effect="light"
                                round
                                size="small"
                        >
                            {{ startCase(listing.placement) }}
                        </el-tag>
                        <el-tag
                                v-if="listing.placement == 'featured'"
                                type="primary"
                                effect="light"
                                round
                                size="small"
                        >
                            {{ startCase(listing.placement) }}
                        </el-tag>
                        <el-tag
                                v-if="listing.placement == 'exclusive'"
                                type="warning"
                                effect="light"
                                round
                                size="small"
                        >
                            {{ startCase(listing.placement) }}
                        </el-tag>
                    </td>
                    <td @click="viewListing(listing)">
                        <span class="badge bg-secondary" v-if="listing.status == 'pending'">{{ startCase(listing.status) }}</span>
                        <span class="badge bg-warning" v-if="listing.status == 'waiting_approval'">{{ startCase(listing.status) }}</span>
                        <span class="badge bg-success" v-if="listing.status == 'approved'">{{ startCase(listing.status) }}</span>
                        <span class="badge bg-danger" v-if="listing.status == 'rejected'">{{ startCase(listing.status) }}</span>
                    </td>
                    <td @click="viewListing(listing)">{{ listing.last_action }}</td>
                    <td @click="viewListing(listing)">{{ listing.last_action_by }}</td>
                    <td @click="viewListing(listing)">
                        <div v-if="listing.is_paid" class="text-success d-flex align-items-center">
                            <i class="bi bi-circle big-dot m-r-8" style="background:green;"></i>
                            <small>Confirmed</small>
                        </div>
                        <div v-if="!listing.is_paid" class="text-danger d-flex align-items-center">
                            <i class="bi bi-circle big-dot m-r-8" style="background:red;"></i>
                            <small>Not Paid</small>
                        </div>
                    </td>
                    <td>
                        <el-dropdown trigger="click" @command="handleEntryAction">
                            <el-button plain type="primary"
                                       size="small">
                                Actions<el-icon class="el-icon--right"><arrow-down /></el-icon>
                            </el-button>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item v-if="checkHasPermission('explore_hub.listings.view')" :command="{action:'view',listing}">View</el-dropdown-item>

                                    <el-dropdown-item v-if="!checkHasPermission('explore_hub.listings.approve') && listing.is_creator && ['pending', 'rejected'].includes(listing.status)" :command="{action:'submit_for_approval',listing}">
                                        {{ listing.status == 'pending' ? 'Submit for Approval' : 'Re-submit for Approval' }}
                                    </el-dropdown-item>

                                    <el-dropdown-item v-if="checkHasPermission('explore_hub.listings.approve') && ((listing.status == 'pending' && listing.is_creator) || (listing.status == 'waiting_approval'))" :command="{action:'approve',listing}">Approve</el-dropdown-item>
                                    <el-dropdown-item v-if="checkHasPermission('explore_hub.listings.approve') && (!listing.is_creator && listing.status == 'waiting_approval')" :command="{action:'reject',listing}">Reject</el-dropdown-item>

                                    <el-dropdown-item v-if="checkHasPermission('explore_hub.listings.edit') && (listing.status != 'approved' || checkHasPermission('explore_hub.listings.modify_approved_listing'))" :command="{action:'edit',listing}">Edit</el-dropdown-item>
                                    <el-dropdown-item v-if="checkHasPermission('explore_hub.listings.archive') && (listing.status != 'approved' || checkHasPermission('explore_hub.listings.modify_approved_listing'))" :command="{action:'archive',listing}">Archive</el-dropdown-item>
                                    <el-dropdown-item v-if="checkHasPermission('explore_hub.listings.delete') && (listing.status != 'approved' || checkHasPermission('explore_hub.listings.modify_approved_listing'))" :command="{action:'delete',listing}">Delete</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </td>
                </tr>
                <tr v-else><td colspan="8" class="text-center p-3">No data, change filters and try again</td></tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            <access-denied></access-denied>
        </div>
    </div>

</template>

<style scoped>

</style>