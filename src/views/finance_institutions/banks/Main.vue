<script setup>
import {onMounted, ref} from "vue";
import {checkHasPermission} from "@/services/Helpers";
import store from "@/store";
import api from "@/services/api";
import {apiRoutes} from "@/services/apiRoutes";

const banks = ref([]);
const loading = ref(false)

onMounted(()=> {
  fetchBanks();
});

const fetchBanks = () => {
  loading.value = true

  api.post(apiRoutes.FINANCE_INSTITUTION_FETCH_BANKS).then(response => {
    banks.value = response.data
    loading.value = false
  }).catch(error => {
    loading.value = false
  })
}

const viewBank = () => {

}

function handleEntryAction(payload){
  switch (payload.action){
    case 'view':
      return viewBank(payload.item);
  }
}
</script>

<template>
  <div>
    <div class="pagetitle">
      <h1>Banks</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><router-link :to="{name:'dashboard'}">Dashboard</router-link></li>
          <li class="breadcrumb-item">Finance Institutions</li>
          <li class="breadcrumb-item active">Commercial Banks</li>
        </ol>
      </nav>
    </div>

    <div class="card">
      <div class="card-body">
        <div v-loading="loading" class="row">
          <div class="col-12">
            <div class="table-responsive m-t-10">
              <table class="table table-hover">
                <thead>
                <tr>
                  <th>#</th>
                  <th>Logo</th>
                  <th>Name</th>
                  <th>Acronym</th>
                  <th>Domain</th>
                  <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                <tr v-if="banks.length" v-for="(bank, index) in banks" :key="'bank'+index" :class="{'table-info': bank.selected}" style="cursor: pointer;">
                  <td @click="viewBank(bank)">
                    {{ index+1 }}
                  </td>
                  <td>
                    <img class="table-img" :src="bank.logo_url" :alt="bank.name+'\'s logo'">
                  </td>
                  <td>
                    {{ bank.name }}
                  </td>
                  <td>
                    {{ bank.acronym }}
                  </td>
                  <td>
                    {{ bank.domain }}
                  </td>
                  <td>
                    <el-dropdown trigger="click" @command="handleEntryAction">
                      <el-button plain type="primary" size="small">
                        Actions<el-icon class="el-icon--right"><arrow-down /></el-icon>
                      </el-button>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item :command="{action:'view',bank}">View</el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table-img{
  max-height:40px;
  border-radius: 50%;
}
</style>
