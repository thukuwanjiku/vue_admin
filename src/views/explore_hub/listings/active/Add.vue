<script setup>

import CloseButton from "@/components/CloseButton.vue";
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {
    fetchExploreHubCompanies,
    fetchExploreHubListingCategories, isSmallScreen, moneyFormatter
} from "@/services/Helpers";
import InputLabel from "@/components/InputLabel.vue";
import {startCase} from "lodash-es";
import {Plus} from "@element-plus/icons-vue";
import axios from "axios";
import {ElMessage} from "element-plus";
import api from "@/services/api";
import {apiRoutes} from "@/services/apiRoutes";
import {useRouter} from "vue-router";

/* -----------------------------
 * Properties & Variables
 * -----------------------------
 * */
const store = useStore();
const router = useRouter();

const isLoading = ref(false);
const listing = ref({
    title: null,
    placement: null,
    category_id: null,
    company_id: null,
    start_at: null,
    end_at: null,
    description: null,
});

const placements = ref(['for_you', 'featured', 'exclusive']);
let descriptionQuillEditor = ref(null);
const primaryMedia = ref(null);
const primaryMediaFile = ref(null);
const media = ref([]);
const mediaFiles = ref([]);

const isAddingPayments = ref(false);
const paymentModes = ref([]);
const newPayment = ref({
    mode:null,
    amount:null,
    reference:null
});
const payments = ref([]);



/* -----------------------------
 * Computed Properties
 * -----------------------------
 * */
let companies = computed(()=> store.state.exploreHub.companies);
let categories = computed(()=> store.state.exploreHub.listingCategories);

/* -----------------------------
 * Hooks
 * -----------------------------
 * */
onMounted(()=> {
    //fetch required resource which aren't loaded yet
    if(!companies.value.length) fetchExploreHubCompanies();
    if(!categories.value.length) fetchExploreHubListingCategories();
    fetchPaymentModes();

    descriptionQuillEditor = new Quill('#descriptionEditor', {
        theme: 'snow',
        placeholder: 'Enter listing body here'
    });
});


/* -----------------------------
 * Methods & Functions
 * -----------------------------
 * */
function fetchPaymentModes(){
    axios.get('/assets/PaymentModes.json')
            .then(response =>
                    paymentModes.value = response.data
                            .map(entry => {
                                entry.image = require(`@/assets/images/payments/${entry.image}`);
                                return entry;
                            }));
}
function processPrimaryMediaUpload(event){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        primaryMedia.value = e.target.result;
        primaryMediaFile.value = file;
    };
    reader.readAsDataURL(file);


    //reset selection
    $("#primaryListingMedia").val("");
}
function processUpload(event){
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = (e) => {
            media.value.push({
                name: file.name,
                url: e.target.result,
            });
            mediaFiles.value.push(file);
        };

        reader.readAsDataURL(file);
    }


    //reset selection
    $("#listingMedia").val("");
}
function removePrimaryUpload(){
    primaryMedia.value = null;
    primaryMediaFile.value = null;
}
function removeUpload(index){
    media.value.splice(index, 1);
    mediaFiles.value.splice(index, 1);
}
function acceptNewPayment(){
    //validate that all required fields have been entered: mode & amount
    if(!newPayment.value.mode || !newPayment.value.mode.length)
        return ElMessage.warning("Please select a payment mode");
    if(!newPayment.value.amount || !newPayment.value.amount.toString().length)
        return ElMessage.warning("Please enter the payment amount");
    if(!newPayment.value.reference || !newPayment.value.reference.toString().length)
        return ElMessage.warning("Please enter the payment reference");
    //validate that a valid payment amount has been entered
    if(isNaN(newPayment.value.amount))
        return ElMessage.warning("Please enter a valid amount");

    //check that reference code is not repeated
    if(payments.value.find(entry =>
            entry.reference != null
            && entry.reference.toString().toLowerCase()
            == newPayment.value.reference.toString().toLowerCase()))
        return ElMessage.warning("Reference code has already been used");

    //everything's ok, add the new payment to list of payments
    payments.value.push(JSON.parse(JSON.stringify(newPayment.value)));

    //clear the fields
    newPayment.value = {mode:null,amount:null,reference:null};

    //dismiss the add payment dialog
    isAddingPayments.value = false;
}

function handleCreateListing(){
    //validate title
    if(!listing.value.title || !listing.value.title.length){
        return ElMessage.warning("Please enter title");
    }
    //validate placement
    if(!listing.value.placement || !listing.value.placement.length){
        return ElMessage.warning("Please select listing placement");
    }
    //validate company selection
    if(!listing.value.company_id || !listing.value.company_id.toString().length){
        return ElMessage.warning("Please select the company");
    }
    //validate category selection
    if(!listing.value.category_id || !listing.value.category_id.toString().length){
        return ElMessage.warning("Please select the category");
    }
    //validate media
    if(!primaryMediaFile.value){
        return ElMessage.warning("Please upload the primary media");
    }
    if(!mediaFiles.value.length){
        return ElMessage.warning("Please upload some images for this listing");
    }
    //validate description
    let description = descriptionQuillEditor.getSemanticHTML();
    if(!description
            || !description.toString().length
            || description == "<p></p>") {
        return ElMessage.warning("Please enter the listing description")
    }
    //validate start date
    if(!listing.value.start_at || !listing.value.start_at.length){
        return ElMessage.warning("Please select start date");
    }
    //validate end date
    if(!listing.value.end_at || !listing.value.end_at.length){
        return ElMessage.warning("Please select end date");
    }

    //set description from rich text editor
    listing.value.description = description;

    //prepare request payload
    let payload = new FormData();
    //add all listing details to the form data
    Object.keys(listing.value)
            .forEach(key => {
                let value = listing.value[key];
                payload.append(key, value)
            });
    //append media to payload
    for(let count=0; count < mediaFiles.value.length; count++){
        payload.append(`media[${count}]`, mediaFiles.value[count]);
    }
    //add primary media to payload
    payload.append(`primary_media`, primaryMediaFile.value);
    //append payments to payload
    if(payments.value.length){
        for (let count = 0; count < payments.value.length; count++) {
            payload.append(`payments[${count}][amount]`, payments.value[count].amount);
            payload.append(`payments[${count}][mode]`, payments.value[count].mode);
            payload.append(`payments[${count}][reference]`, payments.value[count].reference || startCase(payments.value[count].mode));
        }
    }

    //show loading
    isLoading.value = true;

    //make api call
    api.post(apiRoutes.EXPLORE_HUB_ADD_LISTING, payload)
            .then(response => {
                //show success message
                $.growl.notice({message: response.data.message});

                //reset listings array & filters in vuex so that listings can be refreshed when we go back to list
                store.commit('exploreHub/STORE_ACTIVE_LISTINGS', []);
                store.commit('exploreHub/STORE_ACTIVE_LISTINGS_FILTERS', {});

                //hide loading
                isLoading.value = false;

                //TODO NAVIGATE TO VIEW NEWLY ADDED LISTING
                //navigate back
                router.back();

            })
            .catch(error => isLoading.value = false)
}
</script>

<template>

    <div class="row" v-loading="isLoading">
        <div class="col-sm-12 mb-3 d-inline-flex align-items-center justify-content-between">
            <h5 class="fw-bold mb-0" style="margin-left: 20px;">Create a new Listing</h5>
            <close-button></close-button>
        </div>

        <div class="row">
            <div class="col-md-6">
                <!-- Title -->
                <div class="col-md-10 m-b-20">
                    <input-label>Title</input-label>
                    <el-input placeholder="Enter listing title here" size="large" v-model="listing.title"></el-input>
                </div>

                <!-- Description -->
                <div class="col-md-10 m-b-20">
                    <input-label>Description</input-label>
                    <div id="descriptionEditor" class="quill-editor-default">
                    </div>
                </div>

                <!-- Placement -->
                <div class="col-md-10 m-b-20">
                    <div class="form-floating">
                        <input-label>Placement</input-label>
                        <el-select
                                placeholder="Select Placement"
                                size="large"
                                v-model="listing.placement"
                        >
                            <el-option
                                    v-for="placement in placements"
                                    :key="'create-listing-placement-'+placement"
                                    :label="startCase(placement)"
                                    :value="placement"
                            >
                                <el-tag
                                        v-if="placement == 'for_you'"
                                        type="success"
                                        effect="light"
                                        round
                                        size="small"
                                >
                                    {{ startCase(placement) }}
                                </el-tag>
                                <el-tag
                                        v-if="placement == 'featured'"
                                        type="primary"
                                        effect="light"
                                        round
                                        size="small"
                                >
                                    {{ startCase(placement) }}
                                </el-tag>
                                <el-tag
                                        v-if="placement == 'exclusive'"
                                        type="warning"
                                        effect="light"
                                        round
                                        size="small"
                                >
                                    {{ startCase(placement) }}
                                </el-tag>
                            </el-option>
                        </el-select>
                    </div>
                </div>

                <!-- Company -->
                <div class="col-md-10 m-b-20">
                    <div class="form-floating">
                        <input-label>Company</input-label>
                        <el-select
                                v-model="listing.company_id"
                                placeholder="Select Company"
                                size="large"
                                filterable>
                            <el-option
                                    v-for="company in companies"
                                    :key="'create-listing-company-'+company.id"
                                    :label="company.name"
                                    :value="company.id">
                                <img :src="company.logo" style="max-width:30px;max-height: 20px;border-radius:10px;">
                                &nbsp;{{ company.name }}
                            </el-option>
                        </el-select>
                    </div>
                </div>

                <!-- Category -->
                <div class="col-md-10 m-b-20">
                    <div class="form-floating">
                        <input-label>Category</input-label>
                        <el-select
                                v-model="listing.category_id"
                                placeholder="Select Category"
                                size="large"
                                filterable>
                            <el-option
                                    v-for="category in categories"
                                    :key="'create-listing-category-'+category.name"
                                    :label="category.name"
                                    :value="category.id"
                            >
                                <div class="d-flex align-items-center">
                                    <span class="material-symbols-outlined">{{ category.icon }}</span> &nbsp;
                                    <span>{{ category.name }}</span>
                                </div>
                            </el-option>
                        </el-select>
                    </div>
                </div>

            </div>
            <div class="col-md-6">
                <!-- Start Date -->
                <div class="col-md-10 m-b-20">
                    <div class="form-floating">
                        <input-label>Runs from</input-label>
                        <el-date-picker
                                v-model="listing.start_at"
                                type="date"
                                value-format="YYYY-MM-DD"
                                format="MMM D, YYYY"
                                placeholder="Start Date"
                                size="large"
                        />
                    </div>
                </div>
                <!-- End date -->
                <div class="col-md-10 m-b-20">
                    <div class="form-floating">
                        <input-label>To</input-label>
                        <el-date-picker
                                v-model="listing.end_at"
                                type="date"
                                value-format="YYYY-MM-DD"
                                format="MMM D, YYYY"
                                placeholder="End Date"
                                size="large"
                        />
                    </div>
                </div>

                <!-- Media -->
                <div class="col-md-10 m-b-20">
                    <div class="form-floating">
                        <input-label>Media</input-label>

                        <div class="p-l-10">
                            <small>Primary Media</small><br>

                            <input type="file" class="form-control" id="primaryListingMedia" @change="processPrimaryMediaUpload">
                            <div class="d-flex flex-wrap m-t-5" v-if="primaryMedia != null">
                                <div class="p-1 uploaded-image">
                                    <img :src="primaryMedia"  style="max-width:80px;max-height:60px;">
                                    <div class="remover" @click="removePrimaryUpload">
                                        <i class="ri ri-close-line"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="p-l-10 m-t-10">
                            <small>Other Media</small><br>

                            <input type="file" multiple class="form-control" id="listingMedia" @change="processUpload">
                            <div class="d-flex flex-wrap m-t-5">
                                <div class="p-1 uploaded-image" v-for="(file, index) in media" :key="'uploaded-media-'+index">
                                    <img :src="file.url"  style="max-width:80px;max-height:60px;">
                                    <div class="remover" @click="removeUpload(index)">
                                        <i class="ri ri-close-line"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Payments -->
                <div class="col-md-10 m-b-20">
                    <div class="form-floating">
                        <input-label>Payments</input-label>

                        <div class="col-sm-12 d-flex flex-wrap align-items-center">
                            <div class="p-1 added-payment"
                                 v-for="(payment, index) in payments" :key="'added-payment-'+index">
                                <div class="p-1">
                                    <small>
                                        <strong>Amount</strong>: {{ moneyFormatter(payment.amount) }}
                                        <br>
                                        <strong>Mode</strong>: {{ startCase(payment.mode) }}
                                        <template v-if="payment.reference">
                                            <br>
                                            <strong>Reference</strong>: {{ payment.reference }}
                                        </template>
                                    </small>
                                </div>
                                <div class="remover" @click="payments.splice(index, 1)">
                                    <i class="ri ri-close-line"></i>
                                </div>
                            </div>

                            &nbsp;&nbsp;
                            <el-button @click="isAddingPayments = !isAddingPayments" :icon="Plus" round>
                                Add payment
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <hr class="m-0">
        <div class="modal-footer m-t-10">
            <el-button size="large" type="primary" @click="handleCreateListing">Create Listing</el-button>
            <el-button size="large" type="info" @click="router.back()">Cancel</el-button>
        </div>

    </div>

    <!-- Modal to add payments -->
    <el-dialog
            custom-class="el-dialog-width"
            width="45%"
            :fullscreen="isSmallScreen"
            v-model="isAddingPayments">

        <div class="col-md-12 m-b-20">
            <input-label>Select Payment Mode</input-label>
            <div class="col-md-12 m-t-10 d-flex flex-wrap">

                <div class="p-1 payment-mode hov-pointer" :class="{'selected': mode.name == newPayment.mode}"
                     v-for="mode in paymentModes"
                     :key="'all-payment-modes-'+mode.name"
                     @click="newPayment.mode = mode.name">

                    <div class="col-md-12 d-flex align-items-center">
                        <img :src="mode.image"  style="max-width:40px;max-height:20px;">
                        &nbsp;&nbsp;
                        <h6 class="m-0">{{ startCase(mode.name) }}</h6>
                    </div>

                    <div class="selected_indicator" v-show="newPayment.mode == mode.name">
                        <i class="ri ri-check-line"></i>
                    </div>
                </div>

            </div>
        </div>

        <div class="row">
            <div class="col-md-6">
                <input-label>Payment Amount</input-label>
                <el-input placeholder="Enter payment amount" v-model="newPayment.amount"></el-input>

            </div>
            <div class="col-md-6">
                <input-label>Transaction Reference</input-label>
                <el-input placeholder="Enter reference code" v-model="newPayment.reference"></el-input>
            </div>
        </div>
        <br>
        <div class="col-md-12">
            <el-button type="primary" @click="acceptNewPayment">Add Payment</el-button>
        </div>

    </el-dialog>

</template>

<style scoped>

</style>