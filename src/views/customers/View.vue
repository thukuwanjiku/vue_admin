<script setup>
import {useRouter} from "vue-router/dist/vue-router";
import {onMounted, ref} from "vue";
const router = useRouter();
import {useStore} from "vuex";
import {
  formatFullDate
} from "@/services/Helpers";

const store = useStore();
const customer = ref({});

onMounted(() => {
  customer.value = store.state.customers.viewedCustomer;
})
</script>

<template>
  <div>
    <div class="pagetitle">
      <h1>View Customer</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><router-link :to="{name:'dashboard'}">Dashboard</router-link></li>
          <li class="breadcrumb-item">Customers</li>
          <li class="breadcrumb-item">View</li>
        </ol>
      </nav>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="py-3">
          <p class="fw-bold">Personal Account Details</p>

          <div class="row">
            <div class="col-4">
              <div class="mb-3">
                <img class="table-img me-2" :src="customer.user?.profile_photo_url" :alt="customer.formatted_name+'\'s logo'">
              </div>

              <div>
                <b>Full Name</b>
                <p>{{ customer.formatted_name }}</p>
              </div>

              <div>
                <b>Reference</b>
                <p>{{ customer.reference }}</p>
              </div>

              <div>
                <b>Email</b>
                <p>{{ customer.user?.email }}</p>
              </div>

              <div>
                <b>Phone Number</b>
                <p>{{ customer.user?.phone_number }}</p>
              </div>

              <div>
                <b>Gender</b>
                <p>{{ customer.gender ?? "N/A" }}</p>
              </div>

              <div>
                <b>Number Of Finance Accounts</b>
                <p>{{ customer.number_of_accounts }}</p>
              </div>
            </div>

            <div class="col-4">
              <div>
                <b>Registered On</b>
                <p>{{ formatFullDate(customer.user?.created_at) }}</p>
              </div>

              <div>
                <b>Verified Account On</b>
                <p>{{ formatFullDate(customer.user?.verified_at) }}</p>
              </div>

              <div>
                <b>Last Signed In At</b>
                <p>{{ formatFullDate(customer.user?.last_login_at) }}</p>
              </div>

              <div>
                <b>Terms Accepted At</b>
                <p>{{ formatFullDate(customer.user?.terms_accepted_at) }}</p>
              </div>
            </div>

            <div class="col-4">
              <div>
                <b>Employment Status</b>
                <p>{{ customer.employment_status ?? "N/A" }}</p>
              </div>

              <div>
                <b>Occupation Industry</b>
                <p>{{ customer.occupation_industry ?? "N/A" }}</p>
              </div>

              <div>
                <b>Job Title</b>
                <p>{{ customer.job_title ?? "N/A" }}</p>
              </div>
            </div>
          </div>

          <hr/>

          <p class="fw-bold">Finance Account Details</p>
        </div>
      </div>
    </div>
  </div>
</template>
