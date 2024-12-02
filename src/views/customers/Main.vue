<script setup>
import {computed, onMounted, ref} from "vue";
import {checkHasPermission} from "@/services/Helpers";
import Pagination from "@/components/pagination/PaginationComponent"
import store from "@/store";
import api from "@/services/api";
import {apiRoutes} from "@/services/apiRoutes";
import {ArrowDown, Plus} from "@element-plus/icons-vue";
import {
  formatFullDate
} from "@/services/Helpers";
import {ElMessage, ElMessageBox} from "element-plus";
import {useRouter} from "vue-router/dist/vue-router";

const filters = ref({
  customer: ''
})

const router = useRouter();

let customers = computed({
  get: ()=> store.state.customers.customers,
  set: (data) => store.commit('customers/STORE_CUSTOMERS', data)
});

let isLoading = computed({
  get: ()=> store.state.customers.isFetchingCustomers,
  set: (value) => store.commit('customers/SET_IS_FETCHING_CUSTOMERS', value)
});

onMounted(()=> {
  fetchCustomers({});
});

const fetchCustomers = ({page = 1, perPage = 20}) => {
  store.commit("customers/SET_IS_FETCHING_CUSTOMERS", true);

  let filterData = {
    page: page,
    perPage: perPage
  }

  api.post(apiRoutes.FETCH_CUSTOMERS, filterData).then(response => {
    store.commit("customers/STORE_CUSTOMERS", response.data);
    store.commit("customers/SET_IS_FETCHING_CUSTOMERS", false);
  }).catch(error => {
    store.commit("customers/SET_IS_FETCHING_CUSTOMERS", false);
  })
}

function handleEntryAction(payload){
  switch (payload.action){
    case 'view':
      return viewCustomer(payload.customer);
    case 'deactivate':
      return confirmDeactivation(payload.customer);
    case 'restore':
      return restoreCustomer(payload.customer);
  }
}

function viewCustomer(customer) {
  store.commit("customers/STORE_VIEWED_CUSTOMER", JSON.parse(JSON.stringify(customer)));
  return router.push({
    name: 'customers.view',
    params:{
      listingTitleSlug: customer.formatted_name.toString().replaceAll(" ", "-")
    }
  })
}

function confirmDeactivation(customer) {
  ElMessageBox.prompt('Sure you want to deactivate this customer\'s account?\nPlease give a reason why you want to deactivate their account', 'Confirm Deactivation', {
    confirmButtonText: 'Deactivate',
    cancelButtonText: 'Cancel',
    inputPlaceholder: "Type here why you want to deactivate",
    inputValidator: (value)=> {
      if(!value || !value.length){
        return "Please type a reason";
      }
      return true;
    },
  })
      .then(({ value }) => {
        let payload = {
          reference: customer.reference,
          reason: value
        };

        deactivateAccount(payload)
      })
      .catch(() => {
        ElMessage({
          type: 'error',
          message: 'Oops! Something went wrong. Try again.',
        })
      })
}

function deactivateAccount(payload) {
  isLoading.value = true;
  api.post(apiRoutes.DEACTIVATE_CUSTOMER_ACCOUNT, payload).then(response => {
    fetchCustomers({});
    $.growl.notice({message: response.data});
  }).catch(error => isLoading.value = false)
}

function restoreCustomer(customer) {
  ElMessageBox.confirm('Sure you want to restore this customer\'s account?', 'Confirm Restore', {
    confirmButtonText: 'Restore',
    cancelButtonText: 'Cancel',
  }).then(() => {
    isLoading.value = true;

    let payload = {
      reference: customer.reference
    }

    api.post(apiRoutes.REACTIVATE_CUSTOMER_ACCOUNT, payload).then(response => {
      fetchCustomers({});
      $.growl.notice({message: response.data});
    }).catch(error => isLoading.value = false)
  }).catch(() => {})
}
</script>

<template>
  <div>
    <div class="pagetitle">
      <h1>Customers</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><router-link :to="{name:'dashboard'}">Dashboard</router-link></li>
          <li class="breadcrumb-item">Customers</li>
          <li class="breadcrumb-item">List</li>
        </ol>
      </nav>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-12">
            <div class="d-flex my-3">
              <el-input v-model="filters.customer" style="width: 240px" placeholder="Type to search" clearable />
            </div>
          </div>
        </div>

        <div v-loading="isLoading" class="row">
          <div class="col-12">
            <div class="table-responsive m-t-10">
              <table class="table table-hover">
                <thead>
                <tr>
                  <th>Reference</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>No. Of Accounts</th>
                  <th>Registered On</th>
                  <th>Account Activated On</th>
                  <th>Last Login Time</th>
                  <th>No Of Devices</th>
                  <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                <tr v-for="(customer, index) in customers.data" :key="'customer'+index" :class="{'table-info': customer.selected}" style="cursor: pointer;">
                  <td @click="viewCustomer(customer)" class="fw-bold">
                    {{ customer.reference }}
                  </td>
                  <td>
                    <div class="d-flex align-items-center">
                      <img class="table-img me-2" :src="customer.user.profile_photo_url" :alt="customer.formatted_name+'\'s logo'">
                      <div>
                        <p class="mb-2">{{ customer.formatted_name }}</p>
                        <p class="mb-0">{{ customer.user.email }}</p>
                        <p class="mb-0">{{ customer.user.phone_number }}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div v-if="customer.user.deleted_at" class="text-danger d-flex align-items-center">
                      <i class="bi bi-circle big-dot m-r-8" style="background:red;"></i>
                      <p class="mb-0">De-Activated</p>
                    </div>

                    <div v-else class="text-success d-flex align-items-center">
                      <i class="bi bi-circle big-dot m-r-8" style="background:green;"></i>
                      <p class="mb-0">Active</p>
                    </div>
                  </td>
                  <td>
                    {{ customer.number_of_accounts }}
                  </td>
                  <td>
                    {{ formatFullDate(customer.user.created_at) }}
                  </td>

                  <td>
                    {{ customer.user.verified_at ? formatFullDate(customer.user.verified_at) : 'Not Activated' }}
                  </td>

                  <td>
                    {{ customer.user.last_login_at ? formatFullDate(customer.user.last_login_at) : 'Not Authenticated' }}
                  </td>

                  <td>
                    <p class="mb-2">{{ customer.user.devices.length }}</p>
                    <span v-if="customer.user.devices.length > 0" v-for="(device, index) in customer.user.devices" :key="index" class="mb-1">
                      V {{ device.build_number}}({{ device.app_version }})
                    </span>
                  </td>

                  <td>
                    <el-dropdown trigger="click" @command="handleEntryAction">
                      <el-button plain type="primary" size="small">
                        Actions<el-icon class="el-icon--right"><arrow-down /></el-icon>
                      </el-button>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item :command="{action:'view',customer}">View</el-dropdown-item>

                          <el-dropdown-item v-if="!customer.user.deleted_at" :command="{action:'deactivate',customer}" class="text-danger">Deactivate Account</el-dropdown-item>
                          <el-dropdown-item v-if="customer.user.deleted_at" :command="{action:'restore',customer}" class="text-warning">Restore Account</el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </td>
                </tr>
                </tbody>
              </table>

              <Pagination :pagination="customers" @pagination-change-page="fetchCustomers"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table-img{
  height:40px;
  width:40px;
  border-radius: 50%;
}
</style>
