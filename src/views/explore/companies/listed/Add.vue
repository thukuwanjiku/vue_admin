<script setup>

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import api from "@/services/api";
import {apiRoutes} from "@/services/apiRoutes";
import {useStore} from "vuex";
import BackButton from "@/components/BackButton.vue";

/* ------------------------------
* Variables & Properties
* ------------------------------
* */
const router = useRouter();
const store = useStore();

const company = ref({
    name:"",
    description:"",
    contact_name:"",
    contact_phone:"",
    email:"",
    about:""
});

let logoUpload = ref(null);
const isLoading = ref(false);
let aboutQuillEditor = ref(null);

/* ------------------------------
* Lifecycle Hooks
* ------------------------------
* */
onMounted(()=>{
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
                    <input type="file" class="form-control" id="companyLogo" @change="processUpload" required>
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
                <div id="addCompanyAboutEditor" class="quill-editor-default">
                </div>
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
                <div class="form-floating">
                    <input type="text" class="form-control" id="companyContactPhone"
                           placeholder="Company Phone" v-model="company.contact_phone" required>
                    <label for="companyContactPhone">Contact Phone</label>
                </div>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-md-5">
                <div class="form-floating">
                    <input type="text" class="form-control" id="companyContactEmail"
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