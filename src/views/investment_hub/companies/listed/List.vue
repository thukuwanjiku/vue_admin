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
                  <th>Business Name</th>
                  <th>Business Type</th>
                  <th>Business Address</th>
                  <th>Business Contact</th>
                  <th>Contact Person</th>
                  <th>Status</th>
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
      width="70%"
      class="view-company-modal"
  >
    <div class="container">
      <div class="text-center mb-4">
        <h3 class="h4 fw-bold mb-0">{{ activeCompany.business_name }}</h3>
        <p class="text-muted">{{ activeCompany.business_tagline }}</p>
        <p class="mb-0">
          <a :href="activeCompany.business_website" target="_blank" class="text-primary">
            {{ activeCompany.business_website }}
          </a>
        </p>
        <p class="text-secondary">
          {{ activeCompany.business_type }} | {{ activeCompany.business_industry.name }}
        </p>
      </div>

      <div class="border-top pt-3 mb-4">
        <h6 class="fw-bold">Description</h6>
        <p v-if="activeCompany.bio" v-html="activeCompany.bio"></p>
        <p v-else class="text-muted">No description available.</p>
      </div>

      <div class="row border-top pt-3 mb-4">
        <div class="col-md-6">
          <h6 class="fw-bold">Company Contact</h6>
          <ul class="list-unstyled">
            <li>
              <i class="bi bi-envelope-fill text-muted me-2"></i>
              <a :href="'mailto:' + activeCompany.business_email" class="text-primary">
                {{ activeCompany.business_email }}
              </a>
            </li>
            <li>
              <i class="bi bi-telephone-fill text-muted me-2"></i>
              {{ activeCompany.business_phone_number }}
            </li>
            <li>
              <i class="bi bi-geo-alt-fill text-muted me-2"></i>
              {{ activeCompany.business_address.formatted_address }}
            </li>
          </ul>
        </div>

        <div class="col-md-6">
          <h6 class="fw-bold">Contact Person</h6>
          <ul class="list-unstyled">
            <li>
              <i class="bi bi-person-fill text-muted me-2"></i>
              {{ activeCompany.partner_contact_person.formatted_name }}
            </li>
            <li>
              <i class="bi bi-envelope-fill text-muted me-2"></i>
              <a :href="'mailto:' + activeCompany.partner_contact_person.user.email" class="text-primary">
                {{ activeCompany.partner_contact_person.user.email }}
              </a>
            </li>
            <li>
              <i class="bi bi-telephone-fill text-muted me-2"></i>
              {{ activeCompany.partner_contact_person.user.phone_number }}
            </li>
          </ul>
        </div>
      </div>

      <div class="row border-top pt-3 mb-4">
        <div class="col-md-6">
          <h6 class="fw-bold">Bank Details</h6>
          <ul class="list-unstyled">
            <li v-for="(bank, index) in activeCompany.banks" :key="index">
              <strong>{{ bank.bank_name }}</strong> ({{ bank.bank_branch }})<br />
              Account Name: {{ bank.bank_account_name }}<br />
              Account Number: {{ bank.bank_account_number }}
            </li>
          </ul>
        </div>
        <div class="col-md-6">
          <h6 class="fw-bold">Company Documents</h6>
          <ul class="list-unstyled">
            <li v-if="activeCompany.documents.business_registration_certificate_file_path">
              <a :href="activeCompany.documents.business_registration_certificate_file_url" target="_blank" class="text-primary">
                Business Registration Certificate
              </a>
            </li>
            <li v-if="activeCompany.documents.company_kra_pin_certificate_file_path">
              <a :href="activeCompany.documents.company_kra_pin_certificate_file_url" target="_blank" class="text-primary">
                KRA PIN Certificate
              </a>
            </li>
            <li v-if="activeCompany.documents.business_permit_certificate_file_path">
              <a :href="activeCompany.documents.business_permit_certificate_file_url" target="_blank" class="text-primary">
                Business Permit
              </a>
            </li>
            <li v-if="activeCompany.documents.partnership_deed_file_path">
              <a :href="activeCompany.documents.partnership_deed_file_url" target="_blank" class="text-primary">
                Partnership Deed
              </a>
            </li>
            <li v-if="activeCompany.documents.partners_resolution_letter_file_path">
              <a :href="activeCompany.documents.partners_resolution_letter_file_url" target="_blank" class="text-primary">
                Partners Resolution Letter
              </a>
            </li>
            <li v-if="activeCompany.documents.cr12_certificate_file_path">
              <a :href="activeCompany.documents.cr12_certificate_file_url" target="_blank" class="text-primary">
                CR12 Certificate
              </a>
            </li>
          </ul>
        </div>

      </div>

      <!-- Directors Information -->
      <div v-if="activeCompany.directors.length" class="border-top pt-3 mb-4">
        <h6 class="fw-bold">Directors</h6>
        <table class="table table-bordered table-hover text-center">
          <thead class="table-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>ID Document</th>
            <th>KRA PIN Document</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="director in activeCompany.directors" :key="director.id">
            <td>{{ director.first_name }} {{ director.last_name }}</td>
            <td>{{ director.email }}</td>
            <td>{{ director.phone_number }}</td>
            <td>
              <a :href="director.id_file_url" target="_blank" class="text-primary">
                Download
              </a>
            </td>
            <td>
              <a :href="director.kra_pin_file_url" target="_blank" class="text-primary">
                Download
              </a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <div v-if="Object.keys(activeCompany.business_socials).length" class="border-top pt-3 mb-4">
        <div class="d-flex justify-content-center gap-3">
          <a
              v-if="activeCompany.business_socials.linkedin"
              :href="activeCompany.business_socials.linkedin"
              target="_blank"
              class="text-primary"
          >
            <i class="bi bi-linkedin fs-5"></i>
          </a>
          <a
              v-if="activeCompany.business_socials.twitter"
              :href="activeCompany.business_socials.twitter"
              target="_blank"
              class="text-primary"
          >
            <i class="bi bi-twitter fs-5"></i>
          </a>
          <a
              v-if="activeCompany.business_socials.facebook"
              :href="activeCompany.business_socials.facebook"
              target="_blank"
              class="text-primary"
          >
            <i class="bi bi-facebook fs-5"></i>
          </a>
          <a
              v-if="activeCompany.business_socials.instagram"
              :href="activeCompany.business_socials.instagram"
              target="_blank"
              class="text-danger"
          >
            <i class="bi bi-instagram fs-5"></i>
          </a>
          <a
              v-if="activeCompany.business_socials.youtube"
              :href="activeCompany.business_socials.youtube"
              target="_blank"
              class="text-danger"
          >
            <i class="bi bi-youtube fs-5"></i>
          </a>
          <a
              v-if="activeCompany.business_socials.tiktok"
              :href="activeCompany.business_socials.tiktok"
              target="_blank"
              class="text-dark"
          >
            <i class="bi bi-tiktok fs-5"></i>
          </a>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="text-end">
        <button class="btn btn-secondary" @click="isViewingCompany = false">Close</button>
      </div>
    </template>
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
