<script setup>

import {useRouter} from "vue-router";
import {onMounted, ref, computed} from "vue";
import api from "@/services/api";
import {apiRoutes} from "@/services/apiRoutes";
import {useStore} from "vuex";
import CloseButton from "@/components/CloseButton.vue";
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';
import {AwesomeSocialButton} from "awesome-social-button";
import {startCase} from "lodash-es";

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
    about:"",
});
const addedSocials = ref([]);
const newSocialHandle = ref({platform:"", link:""});

let logoUpload = ref(null);
const isLoading = ref(false);
const isAddingSocialHandles = ref(false);
let aboutQuillEditor = ref(null);

//define all possible social handles for a company
const socialPlatforms = ref([
    "instagram","facebook","whatsapp","linkedin","youtube","twitter",
]);


/* ------------------------------
* Computed Properties
* ------------------------------
* */
const availableSocials = computed(()=>{
    //get socials already added to the company
    let alreadyAddedSocials = addedSocials.value.map(entry => entry.platform);
    return socialPlatforms.value.filter(entry => !alreadyAddedSocials.includes(entry));
});



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
function addSocial(){
    //add new social to company list of socials
    addedSocials.value.push({
        platform: newSocialHandle.value.platform,
        link: newSocialHandle.value.link
    });
    //reset new social handle details
    newSocialHandle.value = {platform: "", link: ""};
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

    //add logo to payload
    payload.append('company_logo', logoUpload.value);

    //where company socials are specified, add them to form data
    if(addedSocials.value.length){
        addedSocials.value.forEach((social, index) => {
            payload.append(`socials[${index}][platform]`, social.platform);
            payload.append(`socials[${index}][link]`, social.link);
        });
    }

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

    <div class="col-sm-12 mb-3 d-inline-flex align-items-center justify-content-between">
        <h6 class="fw-bold mb-0" style="margin-left: 20px;">Add a new Company</h6>
        <close-button></close-button>
    </div>

    <form @submit.prevent="submit" v-loading="isLoading">
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
                <div class="d-inline-flex align-items-center">
                    <div v-if="addedSocials.length" class="d-inline-flex">
                        <div class="p-1"
                             v-for="(social, index) in addedSocials" :key="'form-current-socials-'+index">
                            <AwesomeSocialButton
                                    :type="social.platform"
                                    :link="{src: social.link}"
                            />
                        </div>
                    </div>
                    <el-button @click="isAddingSocialHandles = !isAddingSocialHandles" size="small" round>
                        <i class="ri ri-add-line" v-if="!addedSocials.length"></i>{{ addedSocials.length ? "Click to edit" : "Click to add" }}
                    </el-button>
                </div>
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

    <!-- Modal to add company socials -->
    <el-dialog
            v-model="isAddingSocialHandles">
        <div class="row" v-if="addedSocials.length">
            <h6 class="fw-bold">
                <small class="text-muted">Currently added</small>
            </h6>
            <small class="text-muted text-italic">Click to remove</small>
            <div class="d-inline-flex">
                <div class="p-1" @click="addedSocials.splice(index,1)"
                     v-for="(social, index) in addedSocials" :key="'current-socials-'+index">
                    <AwesomeSocialButton
                            :type="social.platform"
                            :link="{src: '#'}"
                    />
                </div>
            </div>
        </div>
        <br>
        <div class="row">
            <h6 class="fw-bold" v-if="addedSocials.length">
                <small class="text-muted">Add more here</small>
            </h6>
            <div class="p-l-20">
                <form @submit.prevent="addSocial">
                    <small>Select Platform</small>
                    <br>
                    <div class="d-inline-flex flex-wrap">
                        <div class="p-1" @click="newSocialHandle.platform = social"
                             v-for="(social, index) in availableSocials" :key="'to-add-social'+index">
                            <template v-if="newSocialHandle.platform == social">
                                <el-badge value="✓" class="item" type="primary">
                                    <AwesomeSocialButton
                                            :type="social"
                                            :link="{src: '#'}"
                                    />
                                </el-badge>
                            </template>
                            <template v-else>
                                <AwesomeSocialButton
                                        :type="social"
                                        :link="{src: '#'}"
                                />
                            </template>
                        </div>
                    </div>
                    <br><br>
                    <div class="col-md-6" v-if="newSocialHandle.platform.length">
                        <div class="input-group mb-3">
                            <div class="form-floating">
                                <input type="url" class="form-control" id="newSocialLink"
                                       placeholder="Tagline" v-model="newSocialHandle.link" required>
                                <label for="newSocialLink">Enter {{ startCase(newSocialHandle.platform) }} Link here</label>
                            </div>
                            <span class="input-group-text" id="basic-addon2">
                                <el-button native-type="submit" link>Add</el-button>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </el-dialog>

</template>


<style scoped>

</style>