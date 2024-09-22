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
    fetchInvestmentHubActiveListings,
    fetchInvestmentHubArchivedListings,
    hasPermissionsWhichContain
} from "@/services/Helpers";

/* ----------------------------------
* Variables & properties
* ----------------------------------
* */
const store = useStore();
const router = useRouter();


/* ----------------------------------
* Computed properties
* ----------------------------------
* */
const listings = computed({
    get: ()=> store.state.investmentHub.archivedListings,
    set: (data)=> store.commit("investmentHub/STORE_ARCHIVED_LISTINGS", data)
});
const isLoading = computed({
    get: ()=> store.state.investmentHub.isFetchingArchivedListings,
    set: (value)=> store.commit("investmentHub/SET_IS_FETCHING_ARCHIVED_LISTINGS", value)
});


/* ----------------------------------
* Lifecycle Hooks
* ----------------------------------
* */
onMounted(()=> {
    //fetch listings if they're not already
    if(checkHasPermission('investment_hub.archived_listings.list') && !listings.value.length) fetchInvestmentHubArchivedListings();
});


/* ----------------------------------
* Methods & functions
* ----------------------------------
* */
function handleEntryAction(payload){
    switch (payload.action){
        case 'view':
            return viewListing(payload.listing);

        case 'restore':
            return confirmRestore(payload.listing);

        case 'delete':
            return confirmDelete(payload.listing);
    }
}

function viewListing(listing){
    //store viewed listing in vuex store
    store.commit("investmentHub/STORE_VIEWED_ARCHIVED_LISTING", JSON.parse(JSON.stringify(listing)));
    //go to view page
    return router.push({
        name: 'investment_hub.listings.archived.view',
        params:{
            listingTitleSlug: listing.title.toString().replaceAll(" ", "-")
        }
    })
}

function confirmRestore(listing){
    ElMessageBox.confirm('Sure you want to restore this listing?', 'Confirm Restore', {
        confirmButtonText: 'Restore',
        cancelButtonText: 'Cancel',
    })
            .then(() => {
                //define payload to send to api
                let payload = {
                    id: listing.id
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
    api.post(apiRoutes.INVESTMENT_HUB_DELETE_ARCHIVED_LISTING, payload)
            .then(response => {
                //refresh listings
                fetchInvestmentHubArchivedListings();

                //show success message
                $.growl.notice({message: response.data.message});
            })
            .catch(error => isLoading.value = false)
}

</script>

<template>

    <div class="row" v-loading="isLoading">
        <!-- Datatable -->
        <div class="table-responsive m-t-10" v-if="checkHasPermission('investment_hub.archived_listings.list')">
            <table class="table table-hover">
                <thead>
                <tr>
                    <!--<th>Select</th>-->
                    <th>ID</th>
                    <th>Title</th>
                    <th>Company</th>
                    <th>Archived By</th>
                    <th>On</th>
                    <th>Reason</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr v-if="listings.length" v-for="(listing, index) in listings"
                    :key="'investment_hub-archived-listings-'+index"
                    :class="{'table-info': listing.selected}"
                    style="cursor: pointer;">
                    <td @click="viewListing(listing)">
                        {{ listing.listing_id }}
                    </td>
                    <td @click="viewListing(listing)">{{ listing.title }}</td>
                    <td @click="viewListing(listing)">{{ listing.company.name }}</td>
                    <td @click="viewListing(listing)">{{ listing.deleted_by }}</td>
                    <td @click="viewListing(listing)">{{ listing.deleted_at }}</td>
                    <td @click="viewListing(listing)">{{ listing.delete_reason }}</td>
                    <td>
                        <el-dropdown trigger="click" @command="handleEntryAction">
                            <el-button plain type="primary"
                                       size="small">
                                Actions<el-icon class="el-icon--right"><arrow-down /></el-icon>
                            </el-button>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item :command="{action:'view',listing}">View</el-dropdown-item>
                                    <el-dropdown-item v-if="checkHasPermission('investment_hub.archived_listings.restore')" :command="{action:'restore',listing}">Restore</el-dropdown-item>
                                    <el-dropdown-item v-if="checkHasPermission('investment_hub.archived_listings.delete')" :command="{action:'delete',listing}">Delete</el-dropdown-item>
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

</template>

<style scoped>

</style>