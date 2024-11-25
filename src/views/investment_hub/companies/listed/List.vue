<script setup>

import {ref, computed, onMounted} from "vue";
import api from "@/services/api";
import {apiRoutes} from "@/services/apiRoutes";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {ElMessageBox} from "element-plus";
import {ArrowDown, Plus} from "@element-plus/icons-vue";
import {
    checkHasPermission, fetchInvestmentHubArchivedCompanies,
    fetchInvestmentHubCompanies,
    hasPermissionsWhichContain,
    isSmallScreen
} from "@/services/Helpers";
import AccessDenied from "@/components/AccessDenied.vue";

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
    if(checkHasPermission('investment_hub.companies.view') && !companies.value.length) fetchInvestmentHubCompanies();
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
            return confirmArchive(payload.company);

        case 'delete':
            return confirmDelete(payload.company);
    }
}

function viewCompany(company){
    if(!checkHasPermission('investment_hub.companies.view')) return;

    //set the company being viewed
    activeCompany.value = JSON.parse(JSON.stringify(company));
    //view the company on a dialog
    return isViewingCompany.value = true;
}

function editCompany(company){
    if(!checkHasPermission('investment_hub.companies.edit'))return;

    //store the company to be edited in vuex store
    store.commit('investmentHub/SET_EDIT_COMPANY', JSON.parse(JSON.stringify(company)));

    //navigate to edit route
    router.push({name: 'investment_hub.companies.edit'});
}

function confirmArchive(company){
    if(!checkHasPermission('investment_hub.companies.archive'))return;

    ElMessageBox.prompt('Sure you want to archive this company?\nPlease give a reason why you want to archive', 'Confirm Archive', {
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
                    id: company.id,
                    reason: value
                };

                //send payload to method handling the
                archiveCompany(payload);
            })
            .catch(() => {})
}
function archiveCompany(payload){
    //show loader
    isLoading.value = true;

    //make api call
    api.post(apiRoutes.ARCHIVE_INVESTMENT_HUB_LISTED_COMPANY, payload)
            .then(response => {
                //refresh companies list
                fetchInvestmentHubCompanies();
                //refresh archived companies
                fetchInvestmentHubArchivedCompanies();

                //show success message
                $.growl.notice({message: response.data.message});
            })
            .catch(error => isLoading.value = false)
}

function confirmDelete(company){
    if(!checkHasPermission('investment_hub.companies.delete'))return;

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
    api.post(apiRoutes.DELETE_INVESTMENT_HUB_LISTED_COMPANY, payload)
            .then(response => {
                //refresh companies list
                fetchInvestmentHubCompanies();

                //show success message
                $.growl.notice({message: response.data.message});
            })
            .catch(error => isLoading.value = false)
}

</script>

<template>

    <div class="row p-2" v-loading="isLoading">
        <div class="col-sm-12 d-flex m-b-10" v-if="checkHasPermission('investment_hub.companies.add')">
            <el-button @click="router.push({name: 'investment_hub.companies.add'})" type="primary" :icon="Plus" plain>Add Company</el-button>
        </div>
        <br>

        <div class="table-responsive" v-if="checkHasPermission('investment_hub.companies.view')">
            <table class="table table-hover">
                <thead>
                <tr>
                    <th>Logo</th>
                    <th>Reference</th>
                    <th>Name</th>
                  <th>Business Type</th>
                    <th>Tagline</th>
                    <th>Contact Person</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr v-if="companies.length" v-for="(company, index) in companies"
                    :key="'investment_hub-companies-'+index" style="cursor: pointer;">
                  <td @click="viewCompany(company)">
                    <img class="table-img" :src="company.logo_url" :alt="company.business_name + '\'s logo'" />
                    <br />
                    <small>{{ company.reference }}</small>
                  </td>
                  <td @click="viewCompany(company)">
                    <span class="text-center">{{ company.business_name }}</span>
                    <br />
                    <small>{{ company.business_tagline  }}</small>
                  </td>
                  <td @click="viewCompany(company)">
                    <span class="text-center">{{ company.business_type }}</span>
                    <br />
                    <small>{{ company.business_industry.name  }}</small>
                  </td>
                  <td @click="viewCompany(company)">
                    <span class="text-center">{{ company.business_country.name }}</span>
                    <br />
                    <small>{{ company.business_address.formatted_address  }}</small>
                  </td>
                  <td @click="viewCompany(company)">
                    <span>{{ company.business_website }}</span>
                    <br />
                    <small>
                      {{ company.business_phone_number }} |
                      <a :href="'mailto:' + company.business_email">
                        {{ company.business_email }}
                      </a>
                    </small>
                  </td>
                  <td @click="viewCompany(company)">
                    <span>{{ company.partner_contact_person.formatted_name }}</span>
                    <br />
                    <small>
                      {{ company.partner_contact_person.user.phone_number }} |
                      <a :href="'mailto:' + company.partner_contact_person.user.email">
                        {{ company.partner_contact_person.user.email }}
                      </a>
                    </small>
                  </td>
                  <td>
                      <span :class="{'badge bg-warning': company.status === 'pending', 'badge bg-success': company.status === 'approved'}" >
                       {{company.status }}
                      </span>
                  </td>
                    <td>
                        <el-dropdown trigger="click" @command="handleEntryAction">
                            <el-button plain type="primary" size="small"
                                       :disabled="!hasPermissionsWhichContain(['investment_hub.companies.view', 'investment_hub.companies.edit', 'investment_hub.companies.archive', 'investment_hub.companies.delete'])">
                                Actions<el-icon class="el-icon--right"><ArrowDown /></el-icon>
                            </el-button>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item v-if="checkHasPermission('investment_hub.companies.view')" :command="{action:'view',company}">View</el-dropdown-item>
                                    <el-dropdown-item v-if="checkHasPermission('investment_hub.companies.edit')" :command="{action:'edit',company}">Edit</el-dropdown-item>
                                    <el-dropdown-item v-if="checkHasPermission('investment_hub.companies.archive')" :command="{action:'archive',company}">Archive</el-dropdown-item>
                                    <el-dropdown-item v-if="checkHasPermission('investment_hub.companies.delete')" :command="{action:'delete',company}">Delete</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </td>
                </tr>
                <tr v-else><td colspan="8" class="text-center p-3">No data</td></tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            <access-denied></access-denied>
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
              <div class="mb-4">
                <p class="mb-1">Logo</p>
                <img :src="activeCompany.logo" alt="" class="view_company_logo">
              </div>

              <div>
                <p class="mb-1">Banner</p>
                <img :src="activeCompany.banner" alt="" class="view_banner_logo">
              </div>
            </div>

            <div class="col-sm-6">
                <h3>{{ activeCompany.name }}</h3>
              <p class="fw-bold">{{ activeCompany.reference }}</p>
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
                            <social-handle v-for="(social, index) in activeCompany.socials"
                                           :key="'form-current-socials-'+index"
                                           v-bind="social"></social-handle>
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

      <div class="row p-4" v-if="activeCompany.documents">
        <h6 class="fw-bold">KYB Documents</h6>
        <ul>
          <li v-for="(url, name) in activeCompany.documents" :key="name">
            <a :href="url" download>{{ name }}</a>
          </li>
        </ul>
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
.view_company_logo, .view_banner_logo{
    max-height: 130px;
    max-width: 150px;
    //border-radius: 50%;
}
</style>
