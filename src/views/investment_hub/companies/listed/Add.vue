<script setup>

import {useRouter} from "vue-router";
import {onMounted, ref, computed} from "vue";
import api from "@/services/api";
import {apiRoutes} from "@/services/apiRoutes";
import {useStore} from "vuex";
import CloseButton from "@/components/CloseButton.vue";
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';
import {startCase} from "lodash-es";
import {isSmallScreen, socialPlatforms} from "@/services/Helpers";
import {validateSocialHandle} from "@/services/SocialHandlesLinksValidator";
import {ElMessage} from "element-plus";
import SocialHandle from "@/components/SocialHandle.vue";

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
let logoFile = ref(null);

let bannerUpload = ref(null);
let bannerFile = ref(null);

const isLoading = ref(false);
const isAddingSocialHandles = ref(false);
let aboutQuillEditor = ref(null);


/* ------------------------------
* Computed Properties
* ------------------------------
* */
const availableSocials = computed(()=>{
    //get socials already added to the company
    let alreadyAddedSocials = addedSocials.value.map(entry => entry.platform);
    return socialPlatforms.filter(entry => !alreadyAddedSocials.includes(entry));
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

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        logoFile.value = e.target.result;
    };
    reader.readAsDataURL(file);
}

function bannerProcessUpload(event) {
  bannerUpload.value = event.target.files[0];

  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    bannerFile.value = e.target.result;
  };
  reader.readAsDataURL(file);
}

function removeUpload(){
    logoUpload.value = null;
    logoFile.value = null;
    $("#companyLogo").val("");
}

function removeBannerUpload() {
  bannerUpload.value = null;
  bannerFile.value = null;
  $("#companyBanner").val("");
}

function selectSocialPlatform(social){
    newSocialHandle.value.platform = social;
    //if social platform is whatsapp, prefill the link field with whatsapp api link
    newSocialHandle.value.link = social === 'whatsapp' ? "https://wa.me/" : "";
}

function addSocial(){
    if(newSocialHandle.value.platform !== 'whatsapp')
        newSocialHandle.value.link = newSocialHandle.value.link.replace(/\/+$/, '');

    //validate link entered
    if(!validateSocialHandle(newSocialHandle.value))
        return ElMessage.warning(`Please enter a valid ${startCase(newSocialHandle.value.platform)} url`);

    //add new social to company list of socials
    addedSocials.value.push({
        platform: newSocialHandle.value.platform,
        link: newSocialHandle.value.link
    });
    //reset new social handle details
    newSocialHandle.value = {platform: "", link: ""};
}

function submit(){
    //validate that logo has been uploaded
    if(!logoUpload.value)
        return ElMessage.warning("Please upload the company logo");

    //validate that company about is provided
    let about = aboutQuillEditor.getSemanticHTML();
    if(!about || !about.toString().length || about == "<p></p>") {
        return ElMessage.warning("Please enter the company's bio");
    }
    company.value['about'] = about;

    //validate that phone number is entered
    if(!company.value.contact_phone || !company.value.contact_phone.toString().length) {
        return ElMessage.warning("Please enter contact phone");
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

    //add banner to payload
    payload.append('company_banner', bannerUpload.value);

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
    api.post(apiRoutes.ADD_INVESTMENT_HUB_LISTED_COMPANY, payload)
            .then(response => {
                //show success response
                $.growl.notice({message: response.data.message});

                //get a copy of current companies list
                let companies = JSON.parse(JSON.stringify(store.state.investmentHub.companies));
                //add the new company to the copy
                companies.unshift(response.data.data);
                //overwrite the vuex companies list with the updated copy
                store.commit('investmentHub/STORE_LISTED_COMPANIES', companies)

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
            <div class="col-md-6">
                <!-- Logo -->
                <div class="col-md-10 m-b-20">
                    <div class="form-floating">
                        <input type="text" class="form-control" id="companyName"
                               placeholder="Company Name" v-model="company.name" required>
                        <label for="companyName">Company Name</label>
                    </div>
                </div>

                <!-- Tagline -->
                <div class="col-md-10 m-b-20">
                    <div class="form-floating">
                        <input type="text" class="form-control" id="companyTagline"
                               placeholder="Tagline" v-model="company.description" required>
                        <label for="companyTagline">Tagline</label>
                    </div>
                </div>

                <!-- Contact Person -->
                <div class="col-md-10 m-b-20">
                    <div class="form-floating">
                        <input type="text" class="form-control" id="companyContactPerson"
                               placeholder="Company Person" v-model="company.contact_name" required>
                        <label for="companyContactPerson">Contact Person</label>
                    </div>
                </div>

                <!-- Contact Phone -->
                <div class="col-md-10 m-b-20">
                    <small class="text-muted">Contact Phone</small>
                    <vue-tel-input
                            v-model="company.contact_phone"
                            mode="international"></vue-tel-input>
                </div>

                <!-- Contact Email -->
                <div class="col-md-10 m-b-20">
                    <div class="form-floating">
                        <input type="email" class="form-control" id="companyContactEmail"
                               placeholder="Email" v-model="company.email" required>
                        <label for="companyContactEmail">Email</label>
                    </div>
                </div>

                <!-- About -->
                <div class="col-md-10 m-b-20">
                    <h6>Company's Bio (About)</h6>

                    <!-- Quill Editor Default -->
                    <div id="addCompanyAboutEditor" class="quill-editor-default">
                    </div>
                    <!-- End Quill Editor Default -->
                </div>
            </div>
            <div class="col-md-6">
                <!-- Logo -->
                <div class="col-md-10 m-b-20">
                    <div class="form-floating">
                        <input type="file" class="form-control" id="companyLogo" @change="processUpload" accept=".png,.jpg,.jpeg,.gif">
                        <label for="companyLogo">Company Logo</label>
                    </div>

                    <div class="d-flex flex-wrap m-t-10" v-if="logoFile">
                        <div class="p-1 uploaded-image">
                            <img :src="logoFile"  style="max-width:80px;max-height:60px;">
                            <div class="remover" @click="removeUpload">
                                <i class="ri ri-close-line"></i>
                            </div>
                        </div>
                    </div>
                </div>

              <!-- Company Banner -->
              <div class="col-md-10 m-b-20">
                <div class="form-floating">
                  <input type="file" class="form-control" id="companyBanner" @change="bannerProcessUpload" accept=".png,.jpg,.jpeg,.gif">
                  <label for="companyBanner">Company Banner</label>
                </div>

                <div class="d-flex flex-wrap m-t-10" v-if="bannerFile">
                  <div class="p-1 uploaded-image">
                    <img :src="bannerFile"  style="max-width:80px;max-height:60px;">
                    <div class="remover" @click="removeBannerUpload">
                      <i class="ri ri-close-line"></i>
                    </div>
                  </div>
                </div>
              </div>

                <!-- Socials -->
                <div class="col-md-10 m-b-20">
                    <h6>Social Media Handles</h6>
                    <div class="d-inline-flex align-items-center flex-wrap">
                        <div v-if="addedSocials.length" class="d-inline-flex">
                            <social-handle v-for="(social, index) in addedSocials"
                                           :key="'form-current-socials-'+index"
                                           v-bind="social"></social-handle>
                        </div>
                        <el-button @click="isAddingSocialHandles = !isAddingSocialHandles" size="small" round>
                            <i class="ri ri-add-line" v-if="!addedSocials.length"></i>{{ addedSocials.length ? "Click to edit" : "Click to add" }}
                        </el-button>
                    </div>
                </div>

            </div>
        </div>

        <hr>
        <div class="modal-footer">
            <button class="btn btn-primary" type="submit">Add Company</button>
            &nbsp;
            <button @click="router.back()" class="btn btn-secondary" type="button">Cancel</button>
        </div>
    </form>

    <!-- Modal to add company socials -->
    <el-dialog
            :fullscreen="isSmallScreen"
            v-model="isAddingSocialHandles">
        <div class="row" v-if="addedSocials.length">
            <h6 class="fw-bold">
                <small class="text-muted">Currently added</small>
            </h6>
            <small class="text-muted text-italic">Click to remove</small>
            <div class="d-inline-flex">
                <div class="p-1" @click="addedSocials.splice(index,1)"
                     v-for="(social, index) in addedSocials" :key="'current-socials-'+index">
                    <social-handle :platform="social.platform"></social-handle>
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
                    <p><small>Select Platform</small></p>
                    <div class="d-inline-flex flex-wrap">
                        <template v-for="(social, index) in availableSocials"
                                  :key="'to-add-social'+index">
                            <div @click="selectSocialPlatform(social)" v-if="social == newSocialHandle.platform">
                                <el-badge value="✓" class="item" type="primary">
                                    <social-handle :platform="social"></social-handle>
                                </el-badge>
                            </div>
                            <div @click="selectSocialPlatform(social)" v-else>
                                <social-handle :platform="social"></social-handle>
                            </div>
                        </template>
                    </div>
                    <br><br>
                    <div class="col-md-6" v-if="newSocialHandle.platform.length">
                        <div class="input-group mb-3">
                            <div class="form-floating">
                                <input type="text" class="form-control" id="newSocialLink"
                                       placeholder="Tagline" v-model="newSocialHandle.link" required>
                                <label for="newSocialLink">
                                    <template v-if="newSocialHandle.platform == 'whatsapp'">
                                        Enter Whatsapp number
                                    </template>
                                    <template v-else>
                                        Enter {{ startCase(newSocialHandle.platform) }} Link here
                                    </template>
                                </label>
                            </div>
                            <span class="input-group-text" id="basic-addon2">
                                <el-button native-type="submit" link>Add</el-button>
                            </span>
                        </div>
                        <small v-if="newSocialHandle.platform == 'whatsapp'">Please enter the whatsapp number in international format (+254712345678)</small>
                    </div>
                </form>
            </div>
            <div class="col-sm-12 d-flex justify-content-end">
                <el-button type="primary" @click="isAddingSocialHandles = !isAddingSocialHandles">Close</el-button>
            </div>
        </div>
    </el-dialog>

</template>


<style scoped>

</style>
