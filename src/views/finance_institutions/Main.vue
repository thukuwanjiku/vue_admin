<script setup>
import {computed, onMounted, ref} from "vue";
import {checkHasPermission} from "@/services/Helpers";
import Pagination from "@/components/pagination/PaginationComponent"
import store from "@/store";
import api from "@/services/api";
import {apiRoutes} from "@/services/apiRoutes";
import {ArrowDown, Plus} from "@element-plus/icons-vue";

const filters = ref({
  institution: ''
})

let institutions = computed({
  get: ()=> store.state.financeInstitution.institutions,
  set: (data) => store.commit('financeInstitution/STORE_INSTITUTIONS', data)
});

let isLoading = computed({
  get: ()=> store.state.financeInstitution.isFetchingInstitutions,
  set: (value) => store.commit('financeInstitution/SET_IS_FETCHING_INSTITUTIONS', value)
});

onMounted(()=> {
  fetchInstitutions({});
});

const fetchInstitutions = ({page = 1, perPage = 20}) => {
  store.commit("financeInstitution/SET_IS_FETCHING_INSTITUTIONS", true);

  let filterData = {
    page: page,
    perPage: perPage
  }

  api.post(apiRoutes.FETCH_FINANCE_INSTITUTIONS, filterData).then(response => {
    store.commit("financeInstitution/STORE_INSTITUTIONS", response.data);
    store.commit("financeInstitution/SET_IS_FETCHING_INSTITUTIONS", false);
  }).catch(error => {
    store.commit("financeInstitution/SET_IS_FETCHING_INSTITUTIONS", false);
  })
}

const viewInstitution = () => {

}

function handleEntryAction(payload){
  switch (payload.action){
    case 'view':
      return viewInstitution(payload.item);
  }
}
</script>

<template>
  <div>
    <div class="pagetitle">
      <h1>Finance Institutions</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><router-link :to="{name:'dashboard'}">Dashboard</router-link></li>
          <li class="breadcrumb-item">Finance Institutions</li>
          <li class="breadcrumb-item">List</li>
        </ol>
      </nav>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-12">
            <div class="d-flex my-3">
              <el-button @click="router.push({name: 'investment_hub.companies.add'})" type="primary" :icon="Plus" plain style="margin-right: 15px">Add Institution</el-button>
              <el-input v-model="filters.institution" style="width: 240px" placeholder="Type to search" clearable />
            </div>
          </div>
        </div>

        <div v-loading="isLoading" class="row">
          <div class="col-12">
            <div class="table-responsive m-t-10">
              <table class="table table-hover">
                <thead>
                <tr>
                  <th>#</th>
                  <th>Logo</th>
                  <th>Name</th>
                  <th>Acronym</th>
                  <th>Type</th>
                  <th>Domain</th>
                  <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                <tr v-for="(institution, index) in institutions.data" :key="'institution'+index" :class="{'table-info': institution.selected}" style="cursor: pointer;">
                  <td @click="viewInstitution(institution)">
                    {{ institution.id }}
                  </td>
                  <td>
                    <img class="table-img" :src="institution.logo_url" :alt="institution.name+'\'s logo'">
                  </td>
                  <td>
                    {{ institution.name }}
                  </td>
                  <td>
                    {{ institution.acronym }}
                  </td>
                  <td>
                    {{ institution.institution_type }}
                  </td>
                  <td>
                    {{ institution.domain }}
                  </td>
                  <td>
                    <el-dropdown trigger="click" @command="handleEntryAction">
                      <el-button plain type="primary" size="small">
                        Actions<el-icon class="el-icon--right"><arrow-down /></el-icon>
                      </el-button>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item :command="{action:'view',institution}">View</el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </td>
                </tr>
                </tbody>
              </table>

              <Pagination :pagination="institutions" @pagination-change-page="fetchInstitutions"/>
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
