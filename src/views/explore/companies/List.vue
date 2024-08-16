<script setup>

import {ref, computed, onMounted} from "vue";
import api from "@/services/api";
import {apiRoutes} from "@/services/apiRoutes";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {ElMessageBox} from "element-plus";

/**
 * Variables
 * */
const store = useStore();
const router = useRouter();

const isLoading = ref(false);

/**
 * Computed Properties
 * */
let companies = computed({
    get: ()=> store.state.explore.companies,
    set: (data) => store.commit('explore/STORE_EXPLORE_LISTED_COMPANIES', data)
});

/**
 * Methods
 * */
function fetchCompanies(){
    //don't run if companies are already fetched
    if(companies.value.length) return;

    //show loader
    isLoading.value = true;

    //make api call
    api.get(apiRoutes.GET_EXPLORE_LISTED_COMPANIES)
            .then(response => {
                companies.value = response.data.data;

                //dismiss loader
                isLoading.value = false;
            })
            .catch(error => isLoading.value = false);
}
function viewCompany(company){
    //set the company being viewed in vuex
    store.commit('explore/SET_VIEWED_COMPANY', JSON.parse(JSON.stringify(company)));

    //navigate to view page with the necessary
    return router.push({
        name: 'explore.companies.view',
        params: {
            name_slug: company.name.toString().replace(" ", "-"),
        }
    })
}

function confirmDelete(company){
    ElMessageBox.prompt('Sure you want to delete this company?\nPlease give a reason why you want to delete', 'Confirm Delete', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        inputPlaceholder: "Type here why you want to delete",
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
                    id: company.id,
                    reason: value
                };

                //send payload to method handling the
                deleteCompany(payload);
            })
            .catch(() => {})
}
function deleteCompany(payload){
    //show loader
    isLoading.value = true;

    //make api call
    api.post(apiRoutes.DELETE_EXPLORE_LISTED_COMPANY, payload)
            .then(response => {
                //delete the company entry from list of companies
                //create copy of companies list
                let companiesCopy = JSON.parse(JSON.stringify(companies.value));
                //find the index of the entry that's been deleted
                let deletedIndex = companiesCopy.findIndex(entry => entry.id == payload.id);
                //delete the entry at that index
                if(deletedIndex > -1){
                    companiesCopy.splice(deletedIndex, 1);
                    //write the updated copy to vuex companies list
                    companies.value = companiesCopy;
                }

                //show success message
                $.growl.notice({message: response.data.message});

                //dismiss loader
                isLoading.value = false;
            })
            .catch(error => isLoading.value = false)
}

//mounted hook
onMounted(()=>{
    //fetch companies
    fetchCompanies();
});

</script>

<template>

    <div class="col-md-12 grid-margin stretch-card">
        <div class="card" v-loading="isLoading">
            <div class="card-body">
                <h4 class="card-title">Listed Companies</h4>
                <router-link :to="{name: 'explore.companies.add'}" class="btn btn-outline-secondary btn-icon-text">
                    <i class="fa fa-plus btn-icon-append"></i>&nbsp;&nbsp;Add Company
                </router-link>

                <div class="table-responsive" style="margin-top: 10px;">
                    <table class="table table-hover">
                        <thead>
                        <tr>
                            <th>Logo</th>
                            <th>Name</th>
                            <th>Desc</th>
                            <th>Contact Person</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-if="companies.length" v-for="(company, index) in companies"
                            :key="'explore-companies-'+index" @click="viewCompany(company)">
                            <td>
                                <img style="max-height:150px;" :src="company.logo" :alt="company.name+'\'s logo'">
                            </td>
                            <td>{{ company.name }}</td>
                            <td>{{ company.description }}</td>
                            <td>{{ company.contact_name }}</td>
                            <td>
                                <button type="button"
                                        class="btn btn-outline-secondary btn-rounded btn-icon"
                                        style="margin-right:3px;" @click="viewCompany(company)">
                                    <i class="mdi mdi-eye"></i>
                                </button>
                                <!--<button type="button" class="btn btn-outline-secondary btn-rounded btn-icon" style="margin-right:3px;">
                                    <i class="mdi mdi-pencil"></i>
                                </button>-->
                                <button type="button"
                                        @click="confirmDelete(company)"
                                        class="btn btn-danger btn-rounded btn-icon">
                                    <i class="mdi mdi-delete-forever"></i>
                                </button>
                            </td>
                        </tr>
                        <tr v-else><td colspan="5" class="text-center">No data</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>

</style>