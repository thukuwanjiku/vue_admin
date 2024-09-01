<script setup>

import {Plus} from "@element-plus/icons-vue";
import {ref, computed, watch, onMounted} from "vue";
import {startCase} from "lodash-es";
import {useStore} from "vuex";
import api from "@/services/api";
import {apiRoutes} from "@/services/apiRoutes";
import {useRouter} from "vue-router";

/* ----------------------------------
* Variables & properties
* ----------------------------------
* */
const store = useStore();
const router = useRouter();

const filters = ref({
    action: 'added',
    from: null,
    to: null,
});
const listings = ref([]);
const isLoading = ref(false);


/* ----------------------------------
* Computed properties
* ----------------------------------
* */
const listingsSource = computed({
    get: ()=> store.state.exploreHub.activeListings,
    set: (data)=> store.commit("exploreHub/STORE_ACTIVE_LISTINGS", data)
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
})


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
    if(listingsSource.value.length){
        //list fetched before, init the necessary variables
        let availableListings = JSON.parse(JSON.stringify(listingsSource.value))
        listings.value = availableListings.map((entry) => {
            entry.selected = false;
            return entry;
        })

        return;
    }

    //fetch listings from API
    //show loader
    isLoading.value = true;

    //make api call
    api.post(apiRoutes.EXPLORE_HUB_FETCH_LISTINGS, filters.value)
            .then(response => {
                //refresh original listings array
                listingsSource.value = response.data.data;

                //dismiss loader
                isLoading.value = false;
            }).catch(error => isLoading.value = false)
}
function viewListing(listing){
    return console.log("Go to view", listing);
}

</script>

<template>

    <div class="row">
        <div class="col-sm-12 d-flex justify-content-between align-items-center m-b-10">
            <div>
                <el-button @click="router.push({name:'explore_hub.listings.create'})" type="primary" :icon="Plus" plain>Add Listing</el-button>
            </div>
            <div class="d-none d-md-block">
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
                            v-model="filters.from"
                            type="date"
                            placeholder="Pick a date"
                            style="max-width:150px;"
                    />

                    &nbsp;&nbsp;<h6 class="m-0">To</h6>&nbsp;&nbsp;

                    <el-date-picker
                            v-model="filters.to"
                            type="date"
                            placeholder="Pick a date"
                            style="max-width:150px;"
                    />
                </div>
            </div>
        </div>
        <br>

        <!-- Datatable -->
        <div class="table-responsive m-t-10">
            <table class="table table-hover">
                <thead>
                <tr>
                    <th>Select</th>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Company</th>
                    <th>Placement</th>
                    <th>Category</th>
                    <th>Payment Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr v-if="listings.length" v-for="(listing, index) in listings"
                    :key="'explore-active-listings-'+index" style="cursor: pointer;">
                    <td class="text-center">
                        <el-checkbox v-model="listing.selected"></el-checkbox>
                    </td>
                    <td @click="viewListing(listing)">
                        {{ listing.listing_id }}
                    </td>
                    <td @click="viewListing(listing)">{{ listing.title }}</td>
                    <td @click="viewListing(listing)">{{ listing.company_name }}</td>
                    <td @click="viewListing(listing)">{{ startCase(listing.placement) }}</td>
                    <td @click="viewListing(listing)">{{ listing.category_name }}</td>
                    <td @click="viewListing(listing)">Payment status</td>
                    <td>Actions</td>
                </tr>
                <tr v-else><td colspan="8" class="text-center p-3">No data</td></tr>
                </tbody>
            </table>
        </div>
    </div>

</template>

<style scoped>

</style>