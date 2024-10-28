<script setup>
import {onMounted, ref} from "vue";
import {checkHasPermission} from "@/services/Helpers";
import store from "@/store";
import api from "@/services/api";
import {apiRoutes} from "@/services/apiRoutes";

const saccos = ref([]);
const loading = ref(false)

onMounted(()=> {
  fetchSaccos();
});

const fetchSaccos = () => {
  loading.value = true

  api.post(apiRoutes.FINANCE_INSTITUTION_FETCH_SACCOS).then(response => {
    saccos.value = response.data
    loading.value = false
  }).catch(error => {
    loading.value = false
  })
}

const viewSacco = () => {

}

function handleEntryAction(payload){
  switch (payload.action){
    case 'view':
      return viewSacco(payload.item);
  }
}
</script>

<template>
  <div>
    <div class="pagetitle">
      <h1>Saccos</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><router-link :to="{name:'dashboard'}">Dashboard</router-link></li>
          <li class="breadcrumb-item">Finance Institutions</li>
          <li class="breadcrumb-item active">Saccos</li>
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
                <tr v-if="saccos.length" v-for="(sacco, index) in saccos" :key="'sacco-'+index" :class="{'table-info': sacco.selected}" style="cursor: pointer;">
                  <td @click="viewSacco(sacco)">
                    {{ index+1 }}
                  </td>
                  <td>
                    <img class="table-img" :src="sacco.logo_url" :alt="sacco.name+'\'s logo'">
                  </td>
                  <td>
                    {{ sacco.name }}
                  </td>
                  <td>
                    {{ sacco.acronym }}
                  </td>
                  <td>
                    {{ sacco.domain }}
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
