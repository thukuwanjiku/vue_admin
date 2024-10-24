<script setup>

import {useRouter} from "vue-router";
import {onMounted, ref, computed, watch} from "vue";
import api from "@/services/api";
import {apiRoutes} from "@/services/apiRoutes";
import {useStore} from "vuex";
import CloseButton from "@/components/CloseButton.vue";
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';
import {startCase} from "lodash-es";
import {checkHasPermission, isSmallScreen, socialPlatforms} from "@/services/Helpers";
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
    business_type: ""
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

const businessTypes = [
    { label: "Sole Proprietorship", value: "Sole Proprietorship" },
    { label: "Partnership", value: "Partnership" },
    { label: "Limited Liability Company (LLC)", value: "Limited Liability Company" }
];
const requiredDocuments = ref([]);
const documents = ref({});


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

    aboutQuillEditor.on('text-change', () => {
        let aboutLength = aboutQuillEditor.getLength();
    });
});

// Watch for business type change and update required documents
watch(() => company.value.business_type, (newType) => {
  documents.value = {}
    if (newType === 'Sole Proprietorship') {
        requiredDocuments.value = [
            "Business Registration Certificate", "KRA PIN Certificate",
            "Owner's National ID", "Owner's KRA PIN Certificate", "Bank Account Confirmation Letter (in business name)"
        ];
    } else if (newType === 'Partnership') {
        requiredDocuments.value = [
            "Partnership Deed", "Certificate of Registration", "Company KRA PIN Certificate", 
            "Partners Resolution Letter", "Owner's National ID", "Bank Letter Stating Partnership Bank Details"
        ];
    } else if (newType === 'Limited Liability Company') {
        requiredDocuments.value = [
            "Business Registration Certificate", "Company KRA PIN Certificate", "Owner's National ID",
            "Owner's KRA PIN Certificate", "Bank Account Confirmation Letter (in business name)"
        ];
    }
});

/* ------------------------------
* Methods & functions
* ------------------------------
* */

// Handle file uploads
function handleFileUpload(event, documentType) {
  const file = event.target.files[0];

  // Check if the file size exceeds 2MB (2 * 1024 * 1024 bytes)
  if (file.size > 2 * 1024 * 1024) {
    ElMessage.error('File size exceeds 2MB limit. Please upload a smaller file.');
    // Clear the file input
    event.target.value = null;
    return;
  }
  documents.value[documentType] = file;
}

function processUpload(event) {
  const file = event.target.files[0];
  if (file.size > 2 * 1024 * 1024) {
    ElMessage.error('Logo file size exceeds 2MB limit. Please upload a smaller file.');
    event.target.value = null;
    logoUpload.value = null;
    return;
  }

  logoUpload.value = file;
  const reader = new FileReader();
  reader.onload = (e) => {
    logoFile.value = e.target.result;
  };
  reader.readAsDataURL(file);
}
function bannerProcessUpload(event) {
  const file = event.target.files[0];
  if (file.size > 2 * 1024 * 1024) {
    ElMessage.error('Banner file size exceeds 2MB limit. Please upload a smaller file.');
    event.target.value = null;
    bannerUpload.value = null;
    return;
  }

  bannerUpload.value = file;
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
    newSocialHandle.value.link = social == 'whatsapp' ? "https://wa.me/" : "";
}

function addSocial(){
    if(newSocialHandle.value.platform != 'whatsapp')
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

     // Add documents
     Object.keys(documents.value).forEach(doc => {
        if (documents.value[doc]) {
            payload.append(`documents[${doc}]`, documents.value[doc]);
        }
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
    api.post(apiRoutes.ADD_EXPLORE_LISTED_COMPANY, payload).then(response => {
        //show success response
        $.growl.notice({message: response.data.message});

        //get a copy of current companies list
        let companies = JSON.parse(JSON.stringify(store.state.exploreHub.companies));
        //add the new company to the copy
        companies.unshift(response.data.data);
        //overwrite the vuex companies list with the updated copy
        store.commit('exploreHub/STORE_EXPLORE_LISTED_COMPANIES', companies)

        //DISMISS LOADER
        isLoading.value = false;

        //navigate back to companies list
        router.back();
    }).catch(error => {
        isLoading.value = false
    });
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
                               placeholder="Tagline" v-model="company.description"
                               maxlength="100" required>
                        <label for="companyTagline">Tagline</label>

                        <div v-if="company.description.toString().length" class="d-flex justify-content-end character_count_indicator">
                            {{ company.description.toString().length }}/100
                        </div>
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
                        <label for="companyLogo">Company Logo (Max 2MB)</label>
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
                  <label for="companyBanner">Company Banner (Max 2MB)</label>
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
              <!-- Business Type Dropdown -->
                <div class="col-md-10 m-b-20">
                <label for="businessType" class="mb-2">Business Type</label>
                <select class="form-control" v-model="company.business_type" required>
                    <option v-for="type in businessTypes" :key="type.value" :value="type.value">{{ type.label }}</option>
                </select>
                </div>
              <!-- Document Upload Fields -->
                <div class="col-md-10 m-b-20">
                        <div v-if="requiredDocuments.length">
                          <h6>Please upload the following required documents (Max 2MB)</h6>
                        <div class="form-floating mb-2" v-for="doc in requiredDocuments" :key="doc">
                            <input  required class="form-control" type="file" @change="(event) => handleFileUpload(event, doc)" accept=".pdf,.doc,.docx" />
                            <label :for="doc">{{ doc }}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <hr>
        <div class="modal-footer">
            <button class="btn btn-primary" type="submit" v-if="checkHasPermission('explore_hub.companies.add')">Add Company</button>
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
