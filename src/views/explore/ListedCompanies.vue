<script setup>

import {computed, onMounted} from "vue";
import api from "@/services/api";
import {apiRoutes} from "@/services/apiRoutes";
import {useStore} from "vuex";

/**
 * Variables
 * */
const store = useStore();

/**
 * Computed Properties
 * */
let companies = computed({
    get: ()=> store.state.explore.companies,
    set: (data) => store.commit('explore/STORE_EXPLORE_LISTED_COMPANIES', data)
});

/**
 * Methods
 * */
function fetchCompanies(){
    //TODO show loader

    //make api call
    api.get(apiRoutes.GET_EXPLORE_LISTED_COMPANIES)
            .then(response => {
                companies.value = response.data.data;
                //TODO dismiss loader
            });
}

//mounted hook
onMounted(()=>{
    //fetch companies
    fetchCompanies();
});

</script>

<template>

    <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title">Listed Companies</h4>
                <button type="button" class="btn btn-outline-secondary btn-icon-text"> Add Company <i class="fa fa-plus btn-icon-append"></i></button>

                <div class="table-responsive" style="margin-top: 10px;">
                    <table class="table table-hover">
                        <thead>
                        <tr>
                            <th>Logo</th>
                            <th>Name</th>
                            <th>Desc</th>
                            <th>Contact Person</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-if="companies.length" v-for="(company, index) in companies" :key="'explore-companies-'+index">
                            <td>
                                <img style="max-height:150px;" :src="company.logo" :alt="company.name+'\'s logo'">
<!--                                <img style="max-height:150px;" src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/company-logo-design-template-e089327a5c476ce5c70c74f7359c5898_screen.jpg?ts=1672291305" :alt="company.name+'\'s logo'">-->
                            </td>
                            <td>{{ company.name }}</td>
                            <td>{{ company.description }}</td>
                            <td>{{ company.contact_name }}</td>
                            <td>
                                <button type="button" class="btn btn-outline-secondary btn-rounded btn-icon" style="margin-right:3px;">
                                    <i class="mdi mdi-eye"></i>
                                </button>
                                <button type="button" class="btn btn-outline-secondary btn-rounded btn-icon" style="margin-right:3px;">
                                    <i class="mdi mdi-pencil"></i>
                                </button>
                                <button type="button" class="btn btn-danger btn-rounded btn-icon">
                                    <i class="mdi mdi-delete-forever"></i>
                                </button>
                            </td>
                        </tr>
                        <tr v-else><td colspan="5">No data</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>

</style>