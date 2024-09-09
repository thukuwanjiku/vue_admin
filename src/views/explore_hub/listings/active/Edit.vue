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
const listing = ref({});

const placements = ref(['for_you', 'featured', 'exclusive']);
let descriptionQuillEditor = ref(null);

const listingMedia = ref([]);
const currentPrimaryMedia = ref(null);
const primaryMedia = ref(null);
const primaryMediaFile = ref(null);
const media = ref([]);
const mediaFiles = ref([]);

const listingPayments = ref([]);
const editedPayments = ref([]);
const editPayment = ref(null);
const isAddingPayments = ref(false);
const isEditingPayment = ref(false);
const paymentModes = ref([]);
const newPayment = ref({
    mode:null,
    amount:null,
    reference:null
});
const newPayments = ref([]);


/* -----------------------------
 * Computed Properties
 * -----------------------------
 * */
let companies = computed(()=> store.state.exploreHub.companies);
let categories = computed(()=> store.state.exploreHub.listingCategories);
const savedPayments = computed(()=> listingPayments.value.filter(entry => !entry.deleted && !entry.edited))
const deletedPayments = computed(()=> listingPayments.value.filter(entry => entry.deleted));
const paymentBeingEdited = computed(()=> {
    if(!editPayment.value) return null;
    return listingPayments.value
            .find(entry => entry.id == editPayment.value.id);
});
const hasEditedPayment = computed(() => {
    if(!paymentBeingEdited.value) return false;
    return Object.keys(paymentBeingEdited.value)
            .some(key => editPayment.value[key] !== paymentBeingEdited.value[key]);
});

const savedMedia = computed(()=> listingMedia.value.filter(entry => !entry.deleted));
const deletedMedia = computed(()=> listingMedia.value.filter(entry => entry.deleted));

/* -----------------------------
 * Hooks
 * -----------------------------
 * */
onMounted(()=> {
    if(store.state.exploreHub.editListing == null) {
        return router.push({name: 'explore_hub.listings.active'});
    }

    //copy details of listing being edited
    listing.value = JSON.parse(JSON.stringify(store.state.exploreHub.editListing));
    listing.value.company_id = listing.value.company.id;


    //copy listing payments to manage them
    listingPayments.value = JSON.parse(JSON.stringify(store.state.exploreHub.editListing.payments));
    listingPayments.value = listingPayments.value
            .map(entry => {
                entry.deleted = false;
                entry.edited = false;
                return entry;
            });

    //copy listing media
    listingMedia.value = JSON.parse(JSON.stringify(store.state.exploreHub.editListing.media));
    listingMedia.value = listingMedia.value
            .filter(entry => !entry.is_primary)
            .map(entry => {
                entry.deleted = false;
                return entry;
            });
    let currentPrimaryMediaEntry = JSON.parse(JSON.stringify(store.state.exploreHub.editListing.media))
            .find(entry => entry.is_primary);
    if(currentPrimaryMediaEntry) currentPrimaryMedia.value = currentPrimaryMediaEntry.path;

    //fetch required resource which aren't loaded yet
    if(!companies.value.length) fetchExploreHubCompanies();
    if(!categories.value.length) fetchExploreHubListingCategories();
    fetchPaymentModes();

    //set the default content for the company's about
    $("#descriptionEditor").html(listing.value.description);
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
    //validate that a valid payment amount has been entered
    if(isNaN(newPayment.value.amount))
        return ElMessage.warning("Please enter a valid amount");
    //check that reference code is not repeated
    if(newPayment.value.reference != null && newPayment.value.reference.length){
        if(newPayments.value.find(entry =>
                entry.reference.toString().toLowerCase()
                == newPayment.value.reference.toString().toLowerCase()))
            return ElMessage.warning("Reference code has already been used");
        if(savedPayments.value.find(entry =>
                entry.reference.toString().toLowerCase()
                == newPayment.value.reference.toString().toLowerCase()))
            return ElMessage.warning("Reference code has already been used");
    }

    //everything's ok, add the new payment to list of payments
    newPayments.value.push(JSON.parse(JSON.stringify(newPayment.value)));

    //clear the fields
    newPayment.value = {mode:null,amount:null,reference:null};

    //dismiss the add payment dialog
    isAddingPayments.value = false;
}
function goEditPayment(payment){
    editPayment.value = JSON.parse(JSON.stringify(payment));
    isEditingPayment.value = true;
}
function acceptPaymentEdits(){
    //validate that all required fields have been entered: mode & amount
    if(!editPayment.value.mode || !editPayment.value.mode.length)
        return ElMessage.warning("Please select a payment mode");
    if(!editPayment.value.amount || !editPayment.value.amount.toString().length)
        return ElMessage.warning("Please enter the payment amount");
    //validate that a valid payment amount has been entered
    if(isNaN(editPayment.value.amount))
        return ElMessage.warning("Please enter a valid amount");
    //check that reference code is not repeated
    if(editPayment.value.reference != null && editPayment.value.reference.length){
        if(newPayments.value.find(entry =>
                entry.reference.toString().toLowerCase()
                == editPayment.value.reference.toString().toLowerCase()))
            return ElMessage.warning("Reference code has already been used");
        if(editedPayments.value.find(entry =>
                entry.reference.toString().toLowerCase()
                == editPayment.value.reference.toString().toLowerCase()))
            return ElMessage.warning("Reference code has already been used");
    }

    //add payment being edited to edited payments
    editedPayments.value.push(JSON.parse(JSON.stringify(editPayment.value)));
    //unmark payment as edited in the original list
    let payment = listingPayments.value.find(entry => entry.id == editPayment.value.id);
    if(payment) payment.edited = true;
    //dismiss modal
    isEditingPayment.value = false;
}
function removeFromEdited(index, payment){
    //remove payment from edited list
    editedPayments.value.splice(index, 1);
    //make payment not edited
    let _payment = listingPayments.value.find(entry => entry.id == payment.id);
    _payment.edited = false;
}

function handleSaveEdits(){
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
    //add select listing details to the form data
    let properties = ['id', 'title', 'placement', 'company_id', 'category_id', 'description', 'start_at', 'end_at'];
    properties.forEach(key => payload.append(key, listing.value[key]));

    //append media to payload
    //add primary media to payload
    if(primaryMediaFile.value) payload.append(`primary_media`, primaryMediaFile.value);
    if(mediaFiles.value.length) {
        for (let count = 0; count < mediaFiles.value.length; count++) {
            payload.append(`media[${count}]`, mediaFiles.value[count]);
        }
    }
    //append new payments to payload
    if(newPayments.value.length){
        for (let count = 0; count < newPayments.value.length; count++) {
            let _payment = newPayments.value[count];
            payload.append(`payments[${count}][amount]`, _payment.amount);
            payload.append(`payments[${count}][mode]`, _payment.mode);
            payload.append(`payments[${count}][reference]`, _payment.reference || startCase(_payment.mode));
        }
    }
    //append edited payments to payload
    if(editedPayments.value.length){
        for (let count = 0; count < editedPayments.value.length; count++) {
            let _payment = editedPayments.value[count];
            payload.append(`edited_payments[${count}][id]`, _payment.id);
            payload.append(`edited_payments[${count}][amount]`, _payment.amount);
            payload.append(`edited_payments[${count}][mode]`, _payment.mode);
            payload.append(`edited_payments[${count}][reference]`, _payment.reference || startCase(_payment.mode));
        }
    }
    //add any deleted payments
    if(deletedPayments.value.length){
        deletedPayments.value.forEach((social, index) => {
            payload.append(`deleted_payments[${index}]`, social.id);
        });
    }
    //add any deleted media
    if(deletedMedia.value.length){
        deletedMedia.value.forEach((file, index) => {
            payload.append(`deleted_media[${index}]`, file.id);
        });
    }

    //show loading
    isLoading.value = true;

    //make api call
    api.post(apiRoutes.EXPLORE_HUB_EDIT_LISTING, payload)
            .then(response => {
                //show success message
                $.growl.notice({message: response.data.message});

               //replace the entry for this listing in the listings list
                let listingsCopy = JSON.parse(JSON.stringify(store.state.exploreHub.activeListings));
                let index = listingsCopy.findIndex(entry => entry.id == listing.value.id);
                if(index > -1){
                    listingsCopy[index] = response.data.data;
                    store.commit('exploreHub/STORE_ACTIVE_LISTINGS', listingsCopy);
                }

                //hide loading
                isLoading.value = false;

                //TODO NAVIGATE TO VIEW NEWLY ADDED LISTING
                router.back();

            })
            .catch(error => isLoading.value = false)
}
</script>

<template>

    <div class="row" v-loading="isLoading">
        <div class="col-sm-12 mb-3 d-inline-flex align-items-center justify-content-between">
            <h5 class="fw-bold mb-0" style="margin-left: 20px;">Edit Listing</h5>
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

                        <small>Primary Media</small><br>
                        <div class="col-md-12 p-l-10 m-b-10" v-if="currentPrimaryMedia">
                            <h6><small>Saved</small></h6>
                            <div class="d-flex flex-wrap">
                                <div class="p-1 uploaded-image">
                                    <img :src="currentPrimaryMedia"  style="max-width:80px;max-height:60px;">
                                </div>
                            </div>

                            <div class="col-md-10 m-t-10 p-l-10">
                                <h6><small>Upload new primary media</small></h6>
                                <input type="file" class="form-control" id="primaryListingMedia" @change="processPrimaryMediaUpload">
                                <div class="d-flex flex-wrap m-t-10" v-if="primaryMedia">
                                    <div class="p-1 uploaded-image">
                                        <img :src="primaryMedia"  style="max-width:80px;max-height:60px;">
                                        <div class="remover" @click="removePrimaryUpload">
                                            <i class="ri ri-close-line"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="m-t-20">
                            <small>Other Media</small>
                        </div>
                        <div class="col-md-12 p-l-10 m-t-10" v-if="savedMedia.length">
                            <h6><small>Saved</small></h6>
                            <div class="d-flex flex-wrap">
                                <div class="p-1 uploaded-image" v-for="(file, index) in savedMedia" :key="'uploaded-media-'+index">
                                    <img :src="file.path"  style="max-width:80px;max-height:60px;">
                                    <div class="remover" @click="file.deleted = !file.deleted">
                                        <i class="ri ri-close-line"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12 p-l-10 m-t-10" v-if="deletedMedia.length">
                            <h6 class="text-danger"><small>Deleted</small></h6>
                            <div class="d-flex flex-wrap">
                                <div class="p-1 uploaded-image deleted"
                                     v-for="(file, index) in deletedMedia" :key="'uploaded-media-'+index">
                                    <img :src="file.path"  style="max-width:80px;max-height:60px;">
                                    <div class="remover" @click="file.deleted = !file.deleted">
                                        <i class="ri ri-close-line"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-10 m-t-10 p-l-10">
                            <h6><small>Upload new media</small></h6>
                            <input type="file" multiple class="form-control" id="listingMedia" @change="processUpload">
                            <div class="d-flex flex-wrap m-t-10">
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
                <div class="col-md-12 m-b-20">
                    <div class="form-floating">
                        <input-label>Payments</input-label>

                        <div v-if="savedPayments.length" class="p-l-10 m-t-10">
                            <h6><small>Saved Payments</small></h6>
                            <div class="d-flex flex-wrap align-items-center">
                                <div class="p-1 saved-payment"
                                     v-for="(payment, index) in savedPayments" :key="'saved-payments-'+index">
                                    <small>
                                        {{ startCase(payment.mode) }}
                                         -
                                        {{ moneyFormatter(payment.amount) }}
                                    </small>
                                    <br>
                                    <el-tag size="small" style="cursor: pointer;" @click="goEditPayment(payment)" round>Edit</el-tag>
                                    &nbsp;
                                    <el-tag size="small" style="cursor:pointer;" round type="danger" @click="payment.deleted = !payment.deleted">Delete</el-tag>
                                </div>
                            </div>
                        </div>

                        <div class="p-l-10 m-t-10" v-if="editedPayments.length">
                            <h6><small>Edited Payments</small></h6>
                            <div class="d-inline-flex align-items-center flex-wrap">
                                <div v-for="(payment, index) in editedPayments"
                                     :key="'edited-payments-'+index" class="m-r-5">
                                    <el-tag closable type="info" @close="removeFromEdited(index, payment)">
                                        {{ startCase(payment.mode) }} - {{ moneyFormatter(payment.amount) }}
                                    </el-tag>
                                </div>
                            </div>
                        </div>

                        <div class="p-l-10 m-t-10" v-if="deletedPayments.length">
                            <h6 class="text-danger"><small>Marked for deletion</small></h6>
                            <div class="d-inline-flex align-items-center flex-wrap">
                                <div v-for="(payment, index) in deletedPayments"
                                     :key="'to-delete-payments-'+index" class="m-r-5">
                                    <el-tag closable type="danger" @close="payment.deleted = !payment.deleted">
                                        {{ startCase(payment.mode) }} - {{ moneyFormatter(payment.amount) }}
                                    </el-tag>
                                </div>
                            </div>
                        </div>

                        <div class="p-l-10 m-t-10">
                            <h6 v-if="listingPayments.length"><small>{{ newPayments.length ? "New payments to save" : "Add payment" }}</small></h6>
                            <div class="col-sm-12 d-flex flex-wrap align-items-center p-l-15">
                                <div class="added-payment d-flex align-items-center"
                                     v-for="(payment, index) in newPayments"
                                     :key="'all-payment-modes-'+index"
                                     style="padding: 0 10px;">
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
                                    <div class="remover" @click="newPayments.splice(index, 1)">
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
        </div>

        <hr class="m-0">
        <div class="modal-footer m-t-10">
            <el-button size="large" type="primary" @click="handleSaveEdits">Save Edits</el-button>
            <el-button size="large" type="info" @click="router.back()">Cancel</el-button>
        </div>

    </div>

    <!-- Modal to add payments -->
    <el-dialog
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

    <!-- Modal to edit payment -->
    <el-dialog
            width="45%"
            :fullscreen="isSmallScreen"
            v-model="isEditingPayment">

        <div class="col-md-12 m-b-20">
            <input-label>Payment Mode</input-label>
            <div class="col-md-12 m-t-10 d-flex flex-wrap">

                <div class="p-1 payment-mode hov-pointer" :class="{'selected': mode.name == editPayment.mode}"
                     v-for="mode in paymentModes"
                     :key="'edit-payment-modes-'+mode.name"
                     @click="editPayment.mode = mode.name">

                    <div class="col-md-12 d-flex align-items-center">
                        <img :src="mode.image"  style="max-width:40px;max-height:20px;">
                        &nbsp;&nbsp;
                        <h6 class="m-0">{{ startCase(mode.name) }}</h6>
                    </div>

                    <div class="selected_indicator" v-show="editPayment.mode == mode.name">
                        <i class="ri ri-check-line"></i>
                    </div>
                </div>

            </div>
        </div>

        <div class="row">
            <div class="col-md-6">
                <input-label>Payment Amount</input-label>
                <el-input placeholder="Enter payment amount" v-model="editPayment.amount"></el-input>

            </div>
            <div class="col-md-6">
                <input-label>Transaction Reference</input-label>
                <el-input placeholder="Enter reference code" v-model="editPayment.reference"></el-input>
            </div>
        </div>
        <br>
        <div class="col-md-12">
            <el-button type="primary" :disabled="!hasEditedPayment" plain @click="acceptPaymentEdits">Done</el-button>
        </div>

    </el-dialog>

</template>

<style scoped>
.saved-payment{
    margin: 3px;
    border: 1px solid #e5e4e4;
    border-radius: 5px;
}
</style>