<script setup>

import {useStore} from "vuex";
import {computed, onMounted} from "vue";
import {
    checkHasPermission, fetchInvestmentHubArchivedCompanies, fetchInvestmentHubCompanies,
    hasPermissionsWhichContain
} from "@/services/Helpers";
import {ArrowDown, Plus} from "@element-plus/icons-vue";
import {ElMessageBox} from "element-plus";
import api from "@/services/api";
import {apiRoutes} from "@/services/apiRoutes";
import AccessDenied from "@/components/AccessDenied.vue";

/* -----------------------------
 * Variables
 * -----------------------------
 * */
const store = useStore();


/* -----------------------------
 * Computed Properties
 * -----------------------------
 * */
const companies = computed(()=> store.state.investmentHub.archivedCompanies);
const isLoading = computed({
    get: ()=> store.state.investmentHub.isFetchingArchivedCompanies,
    set: (value) => store.commit("investmentHub/SET_IS_FETCHING_ARCHIVED_COMPANIES", value)
});


/* -----------------------------
 * Component Lifecycle Hooks
 * -----------------------------
 * */
onMounted(()=>{
    if(checkHasPermission("investment_hub.archived_companies.view")) fetchInvestmentHubArchivedCompanies();
});


/* -----------------------------
 * Methods
 * -----------------------------
 * */
function handleEntryAction(payload){
    switch (payload.action){
        case 'restore':
            return confirmRestore(payload.company);

        case 'delete':
            return confirmDelete(payload.company);
    }
}
function confirmRestore(company){
    ElMessageBox.confirm('Sure you want to restore this company?', 'Confirm Restore', {
        confirmButtonText: 'Restore',
        cancelButtonText: 'Cancel',
    })
            .then(() => {
                //define payload to send to api
                let payload = {
                    id: company.id
                };

                //send payload to method handling the
                restoreCompany(payload);
            })
            .catch(() => {})
}
function restoreCompany(payload){
    //show loader
    isLoading.value = true;

    //make api call
    api.post(apiRoutes.INVESTMENT_HUB_RESTORE_ARCHIVED_COMPANY, payload)
            .then(response => {
                //refresh companies & archived list
                fetchInvestmentHubArchivedCompanies();
                fetchInvestmentHubCompanies();

                //show success message
                $.growl.notice({message: response.data.message});
            })
            .catch(error => isLoading.value = false)
}

function confirmDelete(company){
    ElMessageBox.confirm('Sure you want to delete this company?', 'Confirm Delete', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
    })
            .then(() => {
                //define payload to send to api
                let payload = {
                    id: company.id
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
    api.post(apiRoutes.INVESTMENT_HUB_DELETE_ARCHIVED_COMPANY, payload)
            .then(response => {
                //refresh companies list
                fetchInvestmentHubArchivedCompanies();

                //show success message
                $.growl.notice({message: response.data.message});
            })
            .catch(error => isLoading.value = false)
}

</script>

<template>

    <div class="row p-2" v-loading="isLoading">

        <div class="table-responsive" v-if="checkHasPermission('investment_hub.archived_companies.view')">
            <table class="table table-hover">
                <thead>
                <tr>
                    <th>Logo</th>
                    <th>Name</th>
                    <th>Archived By</th>
                    <th>On</th>
                    <th>Reason</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr v-if="companies.length" v-for="(company, index) in companies"
                    :key="'explore_hub-archived-companies-'+index">
                    <td><img class="table-img" :src="company.logo" :alt="company.name+'\'s logo'"></td>
                    <td>{{ company.name }}</td>
                    <td>{{ company.deleted_by }}</td>
                    <td>{{ company.deleted_at }}</td>
                    <td>{{ company.delete_reason }}</td>
                    <td>
                        <el-dropdown trigger="click" @command="handleEntryAction">
                            <el-button plain type="primary"
                                       :disabled="!hasPermissionsWhichContain(['investment_hub.archived_companies.restore','investment_hub.archived_companies.delete'])"
                                       size="small">
                                Actions<el-icon class="el-icon--right"><arrow-down /></el-icon>
                            </el-button>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item v-if="checkHasPermission('investment_hub.archived_companies.restore')" :command="{action:'restore',company}">Restore</el-dropdown-item>
                                    <el-dropdown-item v-if="checkHasPermission('investment_hub.archived_companies.delete')" :command="{action:'delete',company}">Delete</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </td>
                </tr>
                <tr v-else><td colspan="6" class="text-center p-3">No data</td></tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            <access-denied></access-denied>
        </div>
    </div>

</template>

<style scoped>
.table-img{
    max-height:30px;
}
</style>