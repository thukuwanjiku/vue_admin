<script setup>

import {ref, computed, onMounted} from "vue";
import api from "@/services/api";
import {apiRoutes} from "@/services/apiRoutes";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {ElMessageBox} from "element-plus";
import {AwesomeSocialButton} from "awesome-social-button";
import {ArrowDown, Plus} from "@element-plus/icons-vue";
import {fetchInvestmentHubCompanies, isSmallScreen} from "@/services/Helpers";

/* -----------------------------
 * Variables
 * -----------------------------
 * */
const store = useStore();
const router = useRouter();

const isViewingCompany = ref(false);
const activeCompany = ref(null);

/* -----------------------------
 * Computed Properties
 * -----------------------------
 * */
let companies = computed({
    get: ()=> store.state.investmentHub.companies,
    set: (data) => store.commit('investmentHub/STORE_LISTED_COMPANIES', data)
});
let isLoading = computed({
    get: ()=> store.state.investmentHub.isFetchingCompanies,
    set: (value) => store.commit('investmentHub/SET_IS_FETCHING_COMPANIES', value)
});



/* -----------------------------
 * Component Lifecycle Hooks
 * -----------------------------
 * */
onMounted(()=>{
    //fetch companies
    if(!companies.value.length) fetchInvestmentHubCompanies();
});


/* -----------------------------
 * Methods
 * -----------------------------
 * */
function handleEntryAction(payload){
    switch (payload.action){
        case 'view':
            return viewCompany(payload.company);

        case 'edit':
            return editCompany(payload.company);

        case 'archive':
            break;

        case 'delete':
            break;
    }
}

function viewCompany(company){
    //set the company being viewed
    activeCompany.value = JSON.parse(JSON.stringify(company));
    //view the company on a dialog
    return isViewingCompany.value = true;
}

function editCompany(company){
    //store the company to be edited in vuex store
    store.commit('investmentHub/SET_EDIT_COMPANY', JSON.parse(JSON.stringify(company)));

    //navigate to edit route
    router.push({name: 'investment_hub.companies.edit'});
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
    api.post(apiRoutes.DELETE_INVESTMENT_HUB_LISTED_COMPANY, payload)
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

    <div class="row p-2" v-loading="isLoading">
        <div class="col-sm-12 d-flex m-b-10">
            <el-button @click="router.push({name: 'investment_hub.companies.add'})" type="primary" :icon="Plus" plain>Add Company</el-button>
        </div>
        <br>

        <div class="table-responsive">
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
                    :key="'investment_hub-companies-'+index" style="cursor: pointer;">
                    <td @click="viewCompany(company)">
                        <img class="table-img" :src="company.logo" :alt="company.name+'\'s logo'">
                    </td>
                    <td @click="viewCompany(company)">{{ company.name }}</td>
                    <td @click="viewCompany(company)">{{ company.description }}</td>
                    <td @click="viewCompany(company)">{{ company.contact_name }}</td>
                    <td>
                        <el-dropdown trigger="click" @command="handleEntryAction">
                            <el-button plain type="primary" size="small">
                                Actions<el-icon class="el-icon--right"><ArrowDown /></el-icon>
                            </el-button>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item :command="{action:'view',company}">View</el-dropdown-item>
                                    <el-dropdown-item :command="{action:'edit',company}">Edit</el-dropdown-item>
                                    <el-dropdown-item :command="{action:'archive',company}">Archive</el-dropdown-item>
                                    <!--                                    <el-dropdown-item :command="{action:'delete',company}">Delete</el-dropdown-item>-->
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </td>
                </tr>
                <tr v-else><td colspan="5" class="text-center p-3">No data</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Modal to view company -->
    <el-dialog
            v-if="activeCompany"
            v-model="isViewingCompany"
            width="60%"
            align-center
            :fullscreen="isSmallScreen">
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
                    <div v-if="activeCompany.socials.length" class="col-sm-6">
                        <h6>Social Media Handles</h6>
                        <div class="d-inline-flex">
                            <div class="p-1"
                                 v-for="(social, index) in activeCompany.socials" :key="'form-current-socials-'+index">
                                <AwesomeSocialButton
                                        :type="social.platform"
                                        :link="{src: social.link}"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row p-4 pb-1" v-if="activeCompany.about">
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
}
.view_company_logo{
    max-height: 130px;
    max-width: 150px;
    //border-radius: 50%;
}
</style>