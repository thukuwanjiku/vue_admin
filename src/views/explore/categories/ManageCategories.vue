<script setup>

import {ref, computed, onMounted} from "vue";
import {Check, Delete, Plus} from "@element-plus/icons-vue";
import {startCase} from "lodash-es";
import {AwesomeSocialButton} from "awesome-social-button";
import axios from "axios";
import {useStore} from "vuex";
import {
    fetchExploreListingCategories,
    fetchMaterialIconsNames,
    randomString
} from "@/services/Helpers";
import api from "@/services/api";
import {apiRoutes} from "@/services/apiRoutes";
import {ElMessageBox} from "element-plus";


/* -----------------------------
 * Variables
 * -----------------------------
 * */
const store = useStore();

const isModalLoading = ref(false);
const searchString = ref("");

const isAddingCategories = ref(false);
const isSelectingNewCategoryIcon = ref(false);
const newCategory = ref({name:"", icon:""});
const newCategoryIconsSearchString = ref("");
const newCategories = ref([]);

const isEditingCategory = ref(false);
const editCategory = ref(null);
const isSelectingEditCategoryIcon = ref(false);

const isSelectingMultiple = ref(false);
const selectedCategories = ref([]);


/* -----------------------------
 * Computed properties
 * -----------------------------
 * */
const isLoading = computed(()=> store.state.exploreHub.isFetchingCategories);
const materialIconsNames = computed(() =>
        store.state.shared.materialIconsNames
                .filter(icon => !newCategoryIconsSearchString.value.length
                        || icon.includes(newCategoryIconsSearchString.value)));

const categories = computed(()=> store.state.exploreHub.listingCategories
        .filter(entry => !searchString.value.length
                || entry.name.toLowerCase().includes(searchString.value.toLowerCase())));

const categoryBeingEdited = computed(()=> {
    if(!editCategory.value) return null;
    return categories.value
            .find(entry => entry.id == editCategory.value.id);
});
const hasEditedCategory = computed(() => {
    if(!categoryBeingEdited.value) return false;
    return Object.keys(categoryBeingEdited.value)
            .some(key => editCategory.value[key] !== categoryBeingEdited.value[key]);
});


/* -----------------------------
 * Lifecycle Hooks
 * -----------------------------
 * */
onMounted(()=>{
    //fetch listing categories if not already fetched
    if(!categories.value.length) fetchExploreListingCategories();

    //fetch material icons names is not previously fetched
    if(!materialIconsNames.value.length) {
        fetchMaterialIconsNames();
    }
});


/* -----------------------------
 * Functions & Methods
 * -----------------------------
 * */
function goToAddCategories(){
    isAddingCategories.value = true;
    //clear icons search string
    newCategoryIconsSearchString.value = "";
}
function acceptNewCategoryIcon(icon){
    //set new category icon
    newCategory.value.icon = icon;
    //dismiss the select icon popover
    isSelectingNewCategoryIcon.value = false;
}
function acceptNewCategory(){
    //validate that name & icon have been entered
    if(!newCategory.value.name.length)
        return $.growl.warning({message: "Please enter the new category name"});
    if(!newCategory.value.icon.length)
        return $.growl.warning({message: "Please select an icon for the new category"});

    //required fields have been filled, add category to new categories list
    newCategories.value.push({
        id: randomString(),
        name: newCategory.value.name,
        icon: newCategory.value.icon
    });

    //reset the new category fields
    newCategory.value = {name:"", icon:""};
}
function removeNewCategory(id){
    //find index of category with this id
    let index = newCategories.value.findIndex(entry => entry.id == id);
    //if index is found, remove the value that that index
    if(index > -1){
        newCategories.value.splice(index, 1);
    }
}
function saveNewCategories(){
    if(!newCategories.value.length) return;

    //show loading overlay
    isModalLoading.value = true;

    //make api call to save categories
    api.post(apiRoutes.EXPLORE_HUB_ADD_LISTING_CATEGORIES, {categories: newCategories.value})
            .then(response => {
                //show success message
                $.growl.notice({message: response.data.message});

                //refresh categories list
                fetchExploreListingCategories();

                //dismiss add modal
                isAddingCategories.value = false;

                //clear new categories list
                newCategories.value = [];

                //hide loading
                isModalLoading.value = false;

                //clear icons search string
                newCategoryIconsSearchString.value = "";
            })
            .catch(error => isModalLoading.value = false)
}

function handleCategoryClick(category){
    if(isSelectingMultiple.value){
        let index = selectedCategories.value.findIndex(entry => entry.id == category.id);
        if(index > -1){
            selectedCategories.value.splice(index, 1);
        }else {
            selectedCategories.value.push(category);
        }
    }else {
        //set this category is the one to edit
        editCategory.value = JSON.parse(JSON.stringify(category));
        //show modal to edit category
        isEditingCategory.value = true;
        //clear icons search string
        newCategoryIconsSearchString.value = "";
    }
}
function acceptEditCategoryIcon(icon){
    //set new category icon
    editCategory.value.icon = icon;
    //dismiss the select icon popover
    isSelectingEditCategoryIcon.value = false;
}
function promptSaveEdits(){
    ElMessageBox.confirm(
            'Sure you want to save these changes?',
            'Warning',
            {
                confirmButtonText: 'Yes',
                cancelButtonText: 'Cancel',
                type: 'warning',
            }
    )
            .then(() => {
                //call function to call api to save changes
                saveCategoryChanges();
            })
            .catch(() => {})
}
function saveCategoryChanges(){
    //prepare payload to send
    let payload = {
        ...{id: editCategory.value.id},
        ...Object.keys(categoryBeingEdited.value)
                .reduce((changes, key) => {
                    if (editCategory.value[key] !== categoryBeingEdited.value[key]) {
                        changes[key] = editCategory.value[key];
                    }
                    return changes;
                }, {})
    };

    //show loader
    isModalLoading.value = true;

    //make api call
    api.post(apiRoutes.EXPLORE_HUB_EDIT_LISTING_CATEGORY, payload)
            .then(response => {
                //show success message
                $.growl.notice({message: response.data.message});

                //replace updated entry in list
                let categoriesCopy = JSON.parse(JSON.stringify(categories.value));
                //find the edited index
                let index = categoriesCopy.findIndex(entry => entry.id == editCategory.value.id);
                if(index > -1){
                    categoriesCopy[index] = response.data.data;
                    store.commit('exploreHub/STORE_EXPLORE_LISTING_CATEGORIES', categoriesCopy);
                }

                //dismiss modal
                isEditingCategory.value = false;
                //hide loader
                isModalLoading.value = false;
            })
            .catch(error => isModalLoading.value = false);
}

function toggleMultipleSelection(){
    //clear previous selections
    selectedCategories.value = [];
    //toggle multiple selection
    isSelectingMultiple.value = !isSelectingMultiple.value;
}

function confirmDeleteSelections(){
    ElMessageBox.prompt('Sure you want to delete these selections?\nPlease give a reason why you want to delete', 'Confirm Delete', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        inputPlaceholder: "Type here why you want to delete",
        inputValidator: (value)=> {
            if(!value || !value.length){
                return "Please give a reason";
            }
            return true;
        },
    })
            .then(({ value }) => {
                //prepare payload for the delete api call
                let payload = {ids: selectedCategories.value.map(entry => entry.id), reason:value};
                //call function to call api to save changes
                deleteCategories(payload);
            })
            .catch(() => {})
}
function confirmDeleteCategory(){
    ElMessageBox.prompt('Sure you want to delete this category?\nPlease give a reason why you want to delete', 'Confirm Delete', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        inputPlaceholder: "Type here why you want to delete",
        inputValidator: (value)=> {
            if(!value || !value.length){
                return "Please give a reason";
            }
            return true;
        },
    })
            .then(({ value }) => {
                //prepare payload for delete api call
                let payload = {ids: [editCategory.value.id], reason:value};
                //call function to call api to save changes
                deleteCategories(payload);
            })
            .catch(() => {})
}
function deleteCategories(payload){
    //show loader
    store.commit("exploreHub/SET_IS_FETCHING_CATEGORIES", true);
    isModalLoading.value = true;

    //make api call
    api.post(apiRoutes.EXPLORE_HUB_DELETE_LISTING_CATEGORIES, payload)
            .then(response => {
                //show success message
                $.growl.notice({message: response.data.message});

                //undo selections
                selectedCategories.value = [];

                //refresh categories list
                fetchExploreListingCategories();

                //dismiss modal, incase they're deleting from edit dialog
                isEditingCategory.value = false;

                //hide loader
                isModalLoading.value = false;

                //undo multiple selection
                isSelectingMultiple.value = false;
            })
            .catch(error => {
                isModalLoading.value = false;
                store.commit("exploreHub/SET_IS_FETCHING_CATEGORIES", false);
            });
}

</script>

<template>

    <div class="row p-2" v-loading="isLoading">
        <div class="col-sm-12 d-flex m-b-10">
            <el-button type="primary" :icon="Plus" @click="goToAddCategories" plain>Add Categories</el-button>
            &nbsp;&nbsp;&nbsp;&nbsp;

            <el-input v-model="searchString" style="width: 240px" placeholder="Type to search" clearable />
            &nbsp;&nbsp;&nbsp;&nbsp;

            <el-button :icon="Check" :type="isSelectingMultiple ? 'primary' : ''" @click="toggleMultipleSelection" :plain="!isSelectingMultiple">Select Multiple to Delete</el-button>
        </div>
        <br>

        <div class="row" v-if="categories.length">
            <small class="text-muted text-italic" v-if="!isSelectingMultiple">Tap entry to edit</small><br>
            <div class="d-flex m-t-10 m-b-10 flex-wrap align-items-center" v-if="isSelectingMultiple">
                <small class="text-italic" v-if="!selectedCategories.length">Tap to select</small>

                <small class="fw-bold" v-if="selectedCategories.length">Selected:</small>&nbsp;
                <div class="m-1" v-for="category in selectedCategories"
                     :key="'categories-selection-'+category.id">
                    <el-tag
                            closable
                            @close="handleCategoryClick(category)"
                    >
                        {{ category.name }}
                    </el-tag>
                </div>

                <el-button class="m-l-10" v-if="selectedCategories.length" @click="confirmDeleteSelections" type="danger" plain>Delete selections</el-button>
            </div>

            <div v-for="category in categories" :key="'explore-categories-list-'+category.id"
                 class="col-md-2 col-sm-4 col-xs-6 p-1 hov-pointer" @click="handleCategoryClick(category)">
                <el-card shadow="hover">
                    <div class="text-center">
                        <span class="material-symbols-outlined fs-40">{{ category.icon }}</span>
                        <br>
                        {{ category.name }}
                    </div>
                </el-card>
            </div>
        </div>

        <div class="row" v-else>
            <p class="p-5 text-center">
                <small>No categories found</small>
            </p>
        </div>
    </div>

    <!-- Modal to add categories -->
    <el-dialog
            v-model="isAddingCategories">

        <div class="row" v-loading="isModalLoading">
            <div class="row m-b-20">
                <h6 class="fw-bold">
                    <small class="text-muted">Add Categories</small>
                </h6>

                <div class="row p-l-20">
                    <div class="col-md-4">
                        <small>New Category Name</small><br>
                        <el-input v-model="newCategory.name" placeholder="Enter name here"></el-input>
                    </div>
                    <div class="col-md-4">
                        <small>Category Icon</small>
                        <br>
                        <div class="d-flex">
                            <div v-if="newCategory.icon.length">
                                <span class="material-symbols-outlined fs-35">{{ newCategory.icon }}</span>
                            </div>
                            &nbsp;&nbsp;

                            <el-popover :visible="isSelectingNewCategoryIcon" :width="200">
                                <div class="row">
                                    <el-input v-model="newCategoryIconsSearchString" placeholder="Type to search icon"></el-input>
                                    <div class="d-flex flex-wrap m-t-10"
                                         style="max-height: 250px;overflow-y: scroll;overflow-x: hidden;">
                                        <div style="margin:1px;cursor: pointer"
                                             v-for="(icon, index) in materialIconsNames"
                                             @click="acceptNewCategoryIcon(icon)">
                                            <span class="material-symbols-outlined fs-35">{{ icon }}</span>
                                        </div>
                                    </div>
                                </div>

                                <template #reference>
                                    <el-button @click="isSelectingNewCategoryIcon = !isSelectingNewCategoryIcon"
                                               size="small" round>
                                        {{ newCategory.icon.length ? "Change" : "Select icon" }}
                                    </el-button>
                                </template>
                            </el-popover>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <small>&nbsp;</small><br>
                        <el-button @click="acceptNewCategory" plain>Add Category</el-button>
                    </div>
                </div>
            </div>

            <template v-if="newCategories.length">
                <el-divider />

                <h6 class="f-w-600">
                    <small>New Categories to Save</small>
                </h6>
                <el-table :data="newCategories" border style="width: 100%">
                    <el-table-column prop="name" label="Category"/>
                    <el-table-column label="Icon">
                        <template #default="scope">
                            <span class="material-symbols-outlined fs-35">{{ scope.row.icon }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="Remove">
                        <template #default="scope">
                            <el-button @click="removeNewCategory(scope.row.id)" type="danger" :icon="Delete" circle />
                        </template>
                    </el-table-column>
                </el-table>

                <el-divider />
                <div class="row">
                    <div class="col-sm-3">
                        <el-button type="primary" @click="saveNewCategories">Save Categories</el-button>
                    </div>
                </div>
            </template>
        </div>

    </el-dialog>

    <!-- Modal to edit category -->
    <el-dialog
            width="40%"
            v-model="isEditingCategory">

        <div class="row" v-loading="isModalLoading" v-if="editCategory">
            <div class="row m-b-20">
                <div class="d-flex align-items-center">
                    <h6 class="fw-bold">
                        <small class="text-muted">Edit category details below or </small>
                    </h6>
                    &nbsp;&nbsp;&nbsp;

                    <el-button type="danger" @click="confirmDeleteCategory" plain>Delete category</el-button>
                </div>
                <br>
                <el-divider />

                <div class="row p-l-20">
                    <div class="col-md-12">
                        <small>Edit Category Name</small><br>
                        <el-input v-model="editCategory.name" placeholder="Enter name here" style="max-width: 200px;"></el-input>
                    </div>
                    <div class="col-md-12 m-t-20">
                        <small>Change Associated Icon</small><br>
                        <div class="d-flex">
                            <div>
                                <span class="material-symbols-outlined fs-35">{{ editCategory.icon }}</span>
                            </div>
                            &nbsp;&nbsp;

                            <el-popover :visible="isSelectingEditCategoryIcon" :width="200">
                                <div class="row">
                                    <el-input v-model="newCategoryIconsSearchString" placeholder="Type to search icon"></el-input>
                                    <div class="d-flex flex-wrap m-t-10"
                                         style="max-height: 250px;overflow-y: scroll;overflow-x: hidden;">
                                        <div style="margin:1px;cursor: pointer"
                                             v-for="(icon, index) in materialIconsNames"
                                             @click="acceptEditCategoryIcon(icon)">
                                            <span class="material-symbols-outlined fs-35">{{ icon }}</span>
                                        </div>
                                    </div>
                                </div>

                                <template #reference>
                                    <el-button @click="isSelectingEditCategoryIcon = !isSelectingEditCategoryIcon"
                                               size="small" round>Change</el-button>
                                </template>
                            </el-popover>
                        </div>
                    </div>
                </div>

                <hr class="m-2">
                <div class="col-sm-12">
                    <el-button type="primary" @click="promptSaveEdits" :disabled="!hasEditedCategory">Save Edits</el-button>
                </div>
            </div>
        </div>

    </el-dialog>

</template>

<style scoped>
.icons_container{
    max-height: 250px;
    overflow-y: scroll;
    overflow-x: hidden;
}
</style>