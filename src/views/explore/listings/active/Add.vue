<script setup>

import CloseButton from "@/components/CloseButton.vue";
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {
    fetchExploreHubCompanies,
    fetchExploreHubListingCategories
} from "@/services/Helpers";
import InputLabel from "@/components/InputLabel.vue";
import {startCase} from "lodash-es";

/* -----------------------------
 * Properties & Variables
 * -----------------------------
 * */
const store = useStore();

const placements = ref(['for_you', 'featured', 'exclusive']);
let descriptionQuillEditor = ref(null);
const media = ref([]);
const mediaFiles = ref([]);

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

    descriptionQuillEditor = new Quill('#descriptionEditor', {
        theme: 'snow',
        placeholder: 'Enter listing body here'
    });
});


/* -----------------------------
 * Methods & Functions
 * -----------------------------
 * */
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

</script>

<template>

    <div class="row">
        <div class="col-sm-12 mb-3 d-inline-flex align-items-center justify-content-between">
            <h5 class="fw-bold mb-0" style="margin-left: 20px;">Create a new Listing</h5>
            <close-button></close-button>
        </div>


        <div class="row">
            <div class="col-md-6">
                <div class="col-md-10 m-b-20">
                    <input-label>Title</input-label>
                    <el-input placeholder="Enter listing title here" size="large"></el-input>
                </div>
                <div class="col-md-10 m-b-20">
                    <div class="form-floating">
                        <input-label>Placement</input-label>
                        <el-select
                                placeholder="Select Placement"
                                size="large"
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
                <div class="col-md-10 m-b-20">
                    <div class="form-floating">
                        <input-label>Company</input-label>
                        <el-select
                                placeholder="Select Company"
                                size="large"
                                filterable
                        >
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
                <div class="col-md-10 m-b-20">
                    <div class="form-floating">
                        <input-label>Category</input-label>
                        <el-select
                                placeholder="Select Category"
                                size="large"
                                filterable
                        >
                            <el-option
                                    v-for="category in categories"
                                    :key="'create-listing-category-'+category.name"
                                    :label="category.name"
                                    :value="category.id"
                            >
                                <span class="material-symbols-outlined">{{ category.icon }}</span> &nbsp;
                                {{ category.name }}
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="col-md-10 m-b-20">
                    <div class="form-floating">
                        <input-label>Media</input-label>
                        <input type="file" multiple class="form-control" id="listingMedia" @change="processUpload">
                        <br>
                        <div class="d-flex">
                            <div class="p-1" v-for="file in media">
                                <img :src="file.url"  style="max-width:80px;max-height:60px;">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="col-md-10 m-b-20">
                    <input-label>Description</input-label>
                    <div id="descriptionEditor" class="quill-editor-default">
                    </div>
                </div>
                <div class="col-md-10 m-b-20">
                    <div class="form-floating">
                        <input-label>Runs from</input-label>
                        <el-date-picker
                                type="date"
                                value-format="YYYY-MM-DD"
                                format="MMM D, YYYY"
                                placeholder="Start Date"
                                size="large"
                        />
                    </div>
                </div>
                <div class="col-md-10 m-b-20">
                    <div class="form-floating">
                        <input-label>To</input-label>
                        <el-date-picker
                                type="date"
                                value-format="YYYY-MM-DD"
                                format="MMM D, YYYY"
                                placeholder="End Date"
                                size="large"
                        />
                    </div>
                </div>
                <div class="col-md-10 m-b-20">
                    <div class="form-floating">
                        <input-label>Payments</input-label>

                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<style scoped>

</style>