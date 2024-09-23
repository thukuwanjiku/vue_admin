<script setup>

import {useRouter} from "vue-router";
import {computed, onMounted, ref} from "vue";
import api from "@/services/api";
import {apiRoutes} from "@/services/apiRoutes";
import {useStore} from "vuex";
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';
import CloseButton from "@/components/CloseButton.vue";
import {startCase} from "lodash-es";
import {isSmallScreen, socialPlatforms} from "@/services/Helpers";
import {ElMessage} from "element-plus";
import InputLabel from "@/components/InputLabel.vue";
import SocialHandle from "@/components/SocialHandle.vue";
import {validateSocialHandle} from "@/services/SocialHandlesLinksValidator";

/* ------------------------------
* Variables & Properties
* ------------------------------
* */
const router = useRouter();
const store = useStore();

let company = ref({});

let logoUpload = ref(null);
let logoFile = ref(null);
const isLoading = ref(false);
let aboutQuillEditor = ref(null);

const isAddingSocialHandles = ref(false);
const companySocials = ref([]);
const newSocials = ref([]);
const newSocialHandle = ref({platform:"", link:""});

/* ------------------------------
* Computed Properties
* ------------------------------
* */
const savedSocials = computed(()=> companySocials.value.filter(social => !social.deleted));
const deletedSocials = computed(()=> companySocials.value.filter(social => social.deleted));
const availableSocials = computed(()=>{
    //get socials already added to the company
    let alreadyAddedSocials = [
            ...newSocials.value.map(entry => entry.platform),
            ...savedSocials.value.map(entry => entry.platform)
    ];
    return socialPlatforms.filter(entry => !alreadyAddedSocials.includes(entry));
});


/* ------------------------------
* Lifecycle Hooks
* ------------------------------
* */
onMounted(()=>{
    //if there's no company to edit, go back to list of companies
    if(store.state.investmentHub.editCompany == null) {
        return router.push({name: 'investment_hub.companies.listed'});
    }

    //copy details of company being edited
    company.value = JSON.parse(JSON.stringify(store.state.investmentHub.editCompany));
    //copy the list of saved socials to variable which will be used to manage them
    companySocials.value = JSON.parse(JSON.stringify(company.value.socials));
    //add deleted property to saved socials to track deletions
    companySocials.value = companySocials.value.map(entry => {
        entry.deleted = false;
        return entry;
    });

    //set the default content for the company's about
    $("#editCompanyAboutEditor").html(company.value["about"]);

    //initialize quill editor
    aboutQuillEditor = new Quill('#editCompanyAboutEditor', {
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
function removeUpload(){
    logoUpload.value = null;
    logoFile.value = null;
    $("#companyLogo").val("");
}
function unmarkForDelete(social){
    //check if save platform has been newly added and remove it
    let index = newSocials.value.findIndex(_social => _social.platform == social.platform);
    if(index > -1){
        //remove that entry and show user message
        newSocials.value.splice(index, 1);
        $.growl({
            title: "Heads-up",
            message: `Newly added ${startCase(social.platform)} handle removed in favor of the one already saved`
        });
    }
    //unmark this social for deletion
    social.deleted = !social.deleted;
}
function selectSocialPlatform(social){
    newSocialHandle.value.platform = social;
    //if social platform is whatsapp, prefill the link field with whatsapp api link
    newSocialHandle.value.link = social == 'whatsapp' ? "https://wa.me/" : "";
}
function addNewSocial(){
    if(newSocialHandle.value.platform != 'whatsapp')
        newSocialHandle.value.link = newSocialHandle.value.link.replace(/\/+$/, '');

    //validate link entered
    if(!validateSocialHandle(newSocialHandle.value))
        return ElMessage.warning(`Please enter a valid ${startCase(newSocialHandle.value.platform)} url`);

    //add new social to company list of socials
    newSocials.value.push({
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
    //add to the form data company details which have changed
    Object.keys(company.value)
            .filter(value => !['socials', 'logo'].includes(value))
            .forEach(key => {
                let value = company.value[key];
                if(key == 'contact_phone') value = value.toString().replaceAll(" ", "");
                payload.append(key, value)
            });

    //add logo to payload, where necessary
    if(logoUpload.value != null) payload.append('company_logo', logoUpload.value);

    //add any new social handles
    if(newSocials.value.length){
        newSocials.value.forEach((social, index) => {
            payload.append(`socials[${index}][platform]`, social.platform);
            payload.append(`socials[${index}][link]`, social.link);
        });
    }
    //add any deleted social handles
    if(deletedSocials.value.length){
        deletedSocials.value.forEach((social, index) => {
            payload.append(`deleted_socials[${index}]`, social.id);
        });
    }

    //SHOW LOADER
    isLoading.value = true;

    //make api call
    api.post(apiRoutes.EDIT_INVESTMENT_HUB_LISTED_COMPANY, payload)
            .then(response => {
                //show success response
                $.growl.notice({message: response.data.message});

                //get a copy of current companies list
                let companies = JSON.parse(JSON.stringify(store.state.investmentHub.companies));

                //replace old company with updated company details
                let editIndex = companies.findIndex(entry => entry.id == company.value["id"]);
                if(editIndex > -1){
                    companies[editIndex] = response.data.data;
                }

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
        <h6 class="fw-bold mb-0" style="margin-left: 20px;">Edit Company Details</h6>
        <close-button></close-button>
    </div>

    <form @submit.prevent="submit" v-loading="isLoading">
        <div class="row">
            <div class="col-md-6">
                <!-- Name -->
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
                    <div id="editCompanyAboutEditor" class="quill-editor-default"></div>
                    <!-- End Quill Editor Default -->
                </div>
            </div>
            <div class="col-md-6">
                <!-- Logo -->
                <div class="col-md-10 m-b-20">
                    <input-label>Saved Logo</input-label>
                    <div class="m-b-10">
                        <img :src="company.logo" style="max-height: 80px;max-width:100px;">
                    </div>

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

                <!-- Socials -->
                <div class="col-md-10 m-b-20">
                    <h6>Social Media Handles</h6>

                    <div class="p-l-10 m-t-10" v-if="savedSocials.length">
                        <h6><small>Currently saved</small></h6>
                        <div class="d-inline-flex align-items-center flex-wrap">
                            <div class="saved-social"
                                 v-for="(social, index) in savedSocials"
                                 :key="'saved-socials-'+index">
                                <social-handle v-bind="social"></social-handle>

                                <div class="remover" @click="social.deleted = !social.deleted">
                                    <i class="ri ri-close-line"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="p-l-10 m-t-10" v-if="deletedSocials.length">
                        <h6 class="text-danger"><small>Marked for deletion</small></h6>
                        <div class="d-inline-flex align-items-center flex-wrap">
                            <div v-for="(social, index) in deletedSocials"
                                 :key="'to-delete-socials-'+index" class="m-r-5">
                                <el-tag closable type="danger" @close="unmarkForDelete(social)">
                                    {{ startCase(social.platform) }}
                                </el-tag>
                            </div>
                        </div>
                    </div>

                    <div class="p-l-10 m-t-10">
                        <h6 v-if="companySocials.length"><small>{{ newSocials.length ? "Newly added to be saved" : "Add new handles" }}</small></h6>
                        <div class="d-inline-flex align-items-center flex-wrap">
                            <div v-if="newSocials.length" class="d-inline-flex">
                                <div class="p-1"
                                     v-for="(social, index) in newSocials" :key="'form-new-socials-'+index">
                                    <social-handle v-bind="social"></social-handle>
                                </div>
                            </div>
                            <el-button @click="isAddingSocialHandles = !isAddingSocialHandles" size="small" round>
                                <i class="ri ri-add-line" v-if="!newSocials.length"></i>{{ newSocials.length ? "Click to edit" : "Click to add" }}
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <hr>
        <div class="modal-footer">
            <button class="btn btn-primary" type="submit">Save Edits</button>
            &nbsp;
            <button @click="router.back()" class="btn btn-secondary" type="button">Cancel</button>
        </div>
    </form>

    <!-- Modal to add company socials -->
    <el-dialog
            :fullscreen="isSmallScreen"
            v-model="isAddingSocialHandles">
        <div class="row" v-if="newSocials.length">
            <h6 class="fw-bold">
                <small class="text-muted">Currently added</small>
            </h6>
            <small class="text-muted text-italic">Click to remove</small>
            <div class="d-inline-flex">
                <div @click="newSocials.splice(index,1)"
                     v-for="(social, index) in newSocials" :key="'current-socials-'+index">
                    <social-handle :platform="social.platform"></social-handle>
                </div>
            </div>
        </div>
        <br>
        <div class="row">
            <h6 class="fw-bold" v-if="newSocials.length">
                <small class="text-muted">Add more here</small>
            </h6>
            <div class="p-l-20">
                <form @submit.prevent="addNewSocial">
                    <small>Select Platform</small>
                    <br>
                    <div class="d-inline-flex flex-wrap">
                        <template
                                v-for="(social, index) in availableSocials" :key="'to-add-social'+index">
                            <div @click="selectSocialPlatform(social)" v-if="newSocialHandle.platform == social">
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
            <div class="col-sm-12 d-flex justify-content-end">
                <el-button type="info" @click="isAddingSocialHandles = !isAddingSocialHandles" plain>Done</el-button>
            </div>
        </div>
    </el-dialog>

</template>
<!---->

<style scoped>
.save-social{
    position: relative;
    margin: 3px;
    border-radius: 5px;
}
.save-social:hover .remover{
    display: flex;
}
.save-social > .remover {
    position: absolute;
    right: -5px;
    top: -6px;
    background: #b7b4b4;
    border-radius: 50%;
    height: 20px;
    width: 20px;
    display: none;
    align-items: center;
    justify-content: center;
    color: #fff;
    cursor: pointer;
}
</style>