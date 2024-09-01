<script setup>

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import api from "@/services/api";
import {apiRoutes} from "@/services/apiRoutes";
import {useStore} from "vuex";
import BackButton from "@/components/CloseButton.vue";
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';

/* ------------------------------
* Variables & Properties
* ------------------------------
* */
const router = useRouter();
const store = useStore();

let company = ref({});

let logoUpload = ref(null);
const isLoading = ref(false);
let aboutQuillEditor = ref(null);

/* ------------------------------
* Lifecycle Hooks
* ------------------------------
* */
onMounted(()=>{
    //copy details of company being edited
    company.value = JSON.parse(JSON.stringify(store.state.exploreHub.editCompany));

    //set the default content for the company's about
    $("#addCompanyAboutEditor").html(company.value["about"]);

    //initialize quill editor
    aboutQuillEditor = new Quill('#addCompanyAboutEditor', {
        theme: 'snow',
        placeholder: 'Enter company about here'
    });
});

/* ------------------------------
* Methods & functions
* ------------------------------
* */
function processUpload(event){
    logoUpload.value = event.target.files[0];
}
function submit(){
    //validate that company about is provided
    let about = aboutQuillEditor.getSemanticHTML();
    if(!about || !about.toString().length || about == "<p></p>") {
        return $.growl.warning({message: "Please enter the company's bio"})
    }
    company.value['about'] = about;

    //validate that phone number is entered
    if(!company.value.contact_phone || !company.value.contact_phone.toString().length) {
        return $.growl.warning({message: "Please enter contact phone"})
    }

    //prepare request payload
    let payload = new FormData();
    //add all company details to the form data
    Object.keys(company.value)
            .forEach(key => {
                let value = company.value[key];
                if(key == 'contact_phone') value = value.toString().replaceAll(" ", "");
                payload.append(key, value)
            });

    //add logo to payload, where necessary
    if(logoUpload.value != null) payload.append('company_logo', logoUpload.value);

    //SHOW LOADER
    isLoading.value = true;

    //make api call
    api.post(apiRoutes.EDIT_EXPLORE_LISTED_COMPANY, payload)
            .then(response => {
                //show success response
                $.growl.notice({message: response.data.message});

                //get a copy of current companies list
                let companies = JSON.parse(JSON.stringify(store.state.exploreHub.companies));

                //replace old company with updated company details
                let editIndex = companies.findIndex(entry => entry.id == company.value["id"]);
                if(editIndex > -1){
                    companies[editIndex] = response.data.data;
                }

                //overwrite the vuex companies list with the updated copy
                store.commit('exploreHub/STORE_EXPLORE_LISTED_COMPANIES', companies)

                //DISMISS LOADER
                isLoading.value = false;

                //navigate back to companies list
                router.back();
            })
            .catch(error => isLoading.value = false);
}

</script>

<template>

    <div class="col-sm-12">
        <back-button></back-button>
    </div>

    <br>

    <form @submit.prevent="submit" v-loading="isLoading">
        <h6 class="text-muted fw-bold">Company Details</h6>
        <div class="row">
            <div class="col-md-5">
                <div class="form-floating">
                    <input type="text" class="form-control" id="companyName"
                           placeholder="Company Name" v-model="company.name" required>
                    <label for="companyName">Company Name</label>
                </div>
            </div>
            <div class="col-md-1">&nbsp;</div>
            <div class="col-md-5">
                <div class="form-floating">
                    <input type="file" class="form-control" id="companyLogo" @change="processUpload">
                    <label for="companyLogo">Logo</label>
                </div>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-md-5">
                <div class="form-floating">
                    <input type="text" class="form-control" id="companyTagline"
                           placeholder="Tagline" v-model="company.description" required>
                    <label for="companyTagline">Tagline</label>
                </div>
            </div>
            <div class="col-md-1">&nbsp;</div>
            <div class="col-md-5">
                <h6>Social Media Handles</h6>
                <small class="text-muted">
                    {-- Company social handles will be added here --}
                </small>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-md-5">
                <h6>Company's Bio (About)</h6>

                <!-- Quill Editor Default -->
                <div id="addCompanyAboutEditor" class="quill-editor-default"></div>
                <!-- End Quill Editor Default -->
            </div>
        </div>

        <br><br><br><br><br><br>

        <h6 class="text-muted fw-bold">Contact Details</h6>
        <div class="row">
            <div class="col-md-5">
                <div class="form-floating">
                    <input type="text" class="form-control" id="companyContactPerson"
                           placeholder="Company Person" v-model="company.contact_name" required>
                    <label for="companyContactPerson">Contact Person</label>
                </div>
            </div>
            <div class="col-md-1">&nbsp;</div>
            <div class="col-md-5">
                <small class="text-muted">Contact Phone</small>
                <vue-tel-input
                        v-model="company.contact_phone"
                        mode="international"></vue-tel-input>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-md-5">
                <div class="form-floating">
                    <input type="email" class="form-control" id="companyContactEmail"
                           placeholder="Email" v-model="company.email" required>
                    <label for="companyContactEmail">Email</label>
                </div>
            </div>
            <div class="col-md-1">&nbsp;</div>
        </div>

        <hr>
        <div class="modal-footer">
            <button class="btn btn-primary" type="submit">Submit</button>
            &nbsp;
            <button @click="router.back()" class="btn btn-secondary" type="button">Cancel</button>
        </div>
    </form>

</template>


<style scoped>

</style>