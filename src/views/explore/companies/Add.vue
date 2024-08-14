<script setup>

import {useRouter} from "vue-router";
import {ref} from "vue";
import api from "@/services/api";
import {apiRoutes} from "@/services/apiRoutes";
import {useStore} from "vuex";

/**
 * Variables
 * */
const router = useRouter();
const store = useStore();

const company = ref({
    name:"",
    description:"",
    contact_name:"",
    contact_phone:"",
    email:""
});
let logoUpload = ref(null);
const isLoading = ref(false);


/**
 * Methods
 * */
function processUpload(event){
    logoUpload.value = event.target.files[0];
}
function submit(){
    //prepare request payload
    let payload = new FormData();
    //add all company details to the form data
    Object.keys(company.value)
            .forEach(key => payload.append(key, company.value[key]));

    //add logo to payload
    payload.append('company_logo', logoUpload.value);

    //SHOW LOADER
    isLoading.value = true;

    //make api call
    api.post(apiRoutes.ADD_EXPLORE_LISTED_COMPANY, payload)
            .then(response => {
                //show success response
                $.growl.notice({message: response.data.message});

                //get a copy of current companies list
                let companies = JSON.parse(JSON.stringify(store.state.explore.companies));
                //add the new company to the copy
                companies.unshift(response.data.data);
                //overwrite the vuex companies list with the updated copy
                store.commit('explore/STORE_EXPLORE_LISTED_COMPANIES', companies)

                //DISMISS LOADER
                isLoading.value = false;

                //navigate back to companies list
                router.back();
            })
            .catch(error => isLoading.value = false);
}

</script>

<template>

    <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title">Add Company</h4>

                <br>
                <form @submit.prevent="submit" v-loading="isLoading">
                    <!-- Name & Tagline -->
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group row">
                                <label class="fw-bold">Name</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control"
                                           placeholder="Company Name"
                                           v-model="company.name" required>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group row">
                                <label class="fw-bold">Description</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control"
                                           placeholder="Tagline" v-model="company.description" required>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Logo & Contact Person -->
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group row">
                                <label class="fw-bold">Company Logo</label>
                                <div class="col-sm-9">
                                    <input type="file" class="form-control"
                                           @change="processUpload" required>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group row">
                                <label class="fw-bold">Contact Person</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control" placeholder="Name"
                                           v-model="company.contact_name" required>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Phone & Email -->
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group row">
                                <label class="fw-bold">Contact Phone</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control" placeholder="Contact phone"
                                           v-model="company.contact_phone" required>
                                </div>
                            </div>
                        </div>


                        <div class="col-md-6">
                            <div class="form-group row">
                                <label class="fw-bold">Email</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control" placeholder="Contact Email"
                                           v-model="company.email" required>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <button class="btn btn-primary" type="submit">Submit</button>
                            &nbsp;
                            <button @click="router.back()" class="btn btn-secondary" type="button">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

</template>


<style scoped>

</style>