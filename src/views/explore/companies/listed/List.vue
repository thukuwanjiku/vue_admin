<script setup>

import {ref, computed, onMounted} from "vue";
import api from "@/services/api";
import {apiRoutes} from "@/services/apiRoutes";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {ElMessageBox} from "element-plus";

/* -----------------------------
 * Variables
 * -----------------------------
 * */
const store = useStore();
const router = useRouter();

const isLoading = ref(false);
const isViewingCompany = ref(false);
const activeCompany = ref(null);

/* -----------------------------
 * Computed Properties
 * -----------------------------
 * */
let companies = computed({
    get: ()=> store.state.explore.companies,
    set: (data) => store.commit('explore/STORE_EXPLORE_LISTED_COMPANIES', data)
});



/* -----------------------------
 * Component Lifecycle Hooks
 * -----------------------------
 * */
onMounted(()=>{
    //fetch companies
    fetchCompanies();
});


/* -----------------------------
 * Methods
 * -----------------------------
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
    //set the company being viewed
    activeCompany.value = JSON.parse(JSON.stringify(company));
    //view the company on a dialog
    return isViewingCompany.value = true;
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

</script>

<template>

    <div class="col-md-12 p-2" v-loading="isLoading">
        <div class="col-sm-12 d-flex flex-row-reverse">
            <button type="button" class="btn btn-primary" @click="router.push({name: 'explore.companies.add'})"><i class="bi bi-plus-circle me-1"></i> Add Company</button>
        </div>
        <br>

        <table class="table table-hover">
            <thead>
            <tr>
                <th>Logo</th>
                <th>Name</th>
                <th>Tagline</th>
                <th>Contact Person</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-if="companies.length" v-for="(company, index) in companies"
                :key="'explore-companies-'+index" style="cursor: pointer;">
                <td @click="viewCompany(company)">
                    <img class="table-img" :src="company.logo" :alt="company.name+'\'s logo'">
                </td>
                <td @click="viewCompany(company)">{{ company.name }}</td>
                <td @click="viewCompany(company)">{{ company.description }}</td>
                <td @click="viewCompany(company)">{{ company.contact_name }}</td>
                <td>
                    <div class="btn-group" role="group" aria-label="Basic outlined example">
                        <button @click="viewCompany(company)" type="button" class="btn btn-outline-primary"><i class="bi bi-eye-fill"></i></button>
                        <button @click="console.log('Edit', company)" type="button" class="btn btn-outline-primary"><i class="bi bi-pencil-square"></i></button>
                        <button @click="confirmDelete(company)" type="button" class="btn btn-outline-danger"><i class="bi bi-trash-fill"></i></button>
                    </div>
                </td>
            </tr>
            <tr v-else><td colspan="5" class="text-center p-3">No data</td></tr>
            </tbody>
        </table>
    </div>

    <!-- Modal to view company -->
    <el-dialog
            v-if="activeCompany"
            v-model="isViewingCompany"
            width="60%"
            align-center
    >
        <div class="row">
            <!--     Logo, name & tagline       -->
            <div class="col-sm-3">
                <img :src="activeCompany.logo" alt="" class="view_company_logo">
            </div>
            <div class="col-sm-6">
                <h3>{{ activeCompany.name }}</h3>
                <p class="text-italic">{{ activeCompany.description }}</p>

                <div class="row">
                    <div class="col-sm-6">
                        <h6 class="fw-bold">Contact</h6>
                        <p>
                            {{ activeCompany.contact_name }}
                            <br>
                            {{ activeCompany.email }}
                            <br>
                            {{ activeCompany.contact_phone }}
                        </p>
                    </div>
                    <div class="col-sm-6">
                        Company Socials here
                    </div>
                </div>
            </div>
        </div>
        <div class="row p-4 pb-1">
            <h6 class="fw-bold">About</h6>
            <div class="alert alert-secondary  alert-dismissible fade show"
                 role="alert" v-html="activeCompany.about"></div>
        </div>
        <hr class="m-0">
        <div class="row p-4">
            <p>
                <strong>Added</strong><br>

                By: {{ activeCompany.added_by }}
                <br>
                At: {{ activeCompany.added_at }}
            </p>
        </div>
    </el-dialog>

</template>

<style scoped>
.table-img{
    max-height:30px;
    border-radius: 50%;
}
.view_company_logo{
    max-height: 150px;
    border-radius: 50%;
}
</style>