<script setup>

import {ref, computed, onMounted} from "vue";
import api from "@/services/api";
import {apiRoutes} from "@/services/apiRoutes";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {ElMessage, ElMessageBox} from "element-plus";
import {ArrowDown, Plus} from "@element-plus/icons-vue";
import {checkHasPermission, fetchRoles, isSmallScreen} from "@/services/Helpers";
import {startCase} from "lodash-es";

/* -----------------------------
 * Variables
 * -----------------------------
 * */
const store = useStore();
const router = useRouter();

const isModalLoading = ref(false);
const isAddingRoles = ref(false);
const newRoleName = ref("");
const newRoles = ref([]);

const isEditingRole = ref(false);
const editRole = ref({});


/* -----------------------------
 * Computed Properties
 * -----------------------------
 * */
const roles = computed(()=> store.state.auth.roles);
const isLoading = computed({
    get: ()=> store.state.auth.isFetchingRoles,
    set: (value) => store.commit('auth/SET_IS_FETCHING_ROLES', value)
});



/* -----------------------------
 * Component Lifecycle Hooks
 * -----------------------------
 * */
onMounted(()=>{
    //fetch roles
    if(checkHasPermission('roles.view') && !roles.value.length) fetchRoles();
});


/* -----------------------------
 * Methods
 * -----------------------------
 * */
function handleEntryAction(payload){
    switch (payload.action){
        case 'edit':
            return handleEditRole(payload.role);

        case 'delete':
            return confirmDelete(payload.role);
    }
}

function acceptNewRole(){
    //validate that this role name is not already added
    if(newRoles.value.find(entry => entry == newRoleName.value))
        return ElMessage.warning(`${newRoleName.value} is already added`);
    if(roles.value.find(entry => startCase(entry.name) == newRoleName.value))
        return ElMessage.warning(`${newRoleName.value} is already added`);

    newRoles.value.push(JSON.parse(JSON.stringify(newRoleName.value)));
    newRoleName.value = '';
}
function saveNewRoles(){
    //show loader
    isModalLoading.value = true;

    //make api call
    api.post(apiRoutes.ADD_NEW_ROLES, {roles: newRoles.value.map(entry => entry.toString().replaceAll(' ', '_'))})
            .then(response => {
                //refresh roles list
                fetchRoles();
                //show success message
                $.growl.notice({message: response.data.message});
                //hide new roles dialog
                isAddingRoles.value = false;
                //reset new roles list
                newRoles.value = [];
                //hide loader
                isModalLoading.value = false;
            })
            .catch(error => isModalLoading.value = false)
}

function handleEditRole(role){
    //set edit role
    editRole.value = JSON.parse(JSON.stringify(role));
    editRole.value.name = startCase(editRole.value.name);
    editRole.value.new_name = startCase(editRole.value.name);
    isEditingRole.value = true;
}
function saveRoleChanges(){
    //show loader
    isModalLoading.value = true;

    //make api call
    api.post(apiRoutes.EDIT_ROLE, {
        id: editRole.value.id,
        name: editRole.value.new_name.toString().replaceAll(" ", "_"),
    })
            .then(response => {
                //refresh roles list
                fetchRoles();
                //show success message
                $.growl.notice({message: response.data.message});
                //hide new roles dialog
                isEditingRole.value = false;

                //hide loader
                isModalLoading.value = false;
            })
            .catch(error => isModalLoading.value = false)
}
function confirmDelete(role){
    ElMessageBox.confirm('Sure you want to delete this role?', 'Confirm Delete', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
    })
            .then(() => {
                //send payload to method handling the
                deleteRole(role);
            })
            .catch(() => {})
}
function deleteRole(role){
    //show loader
    isLoading.value = true;

    //make api call
    api.post(apiRoutes.DELETE_ROLES, {ids: [role.id]})
            .then(response => {
                //refresh roles list
                fetchRoles();

                //show success message
                $.growl.notice({message: response.data.message});

                //dismiss loader
                isLoading.value = false;
            })
            .catch(error => isLoading.value = false)
}

</script>

<template>

    <div class="pagetitle">
        <h1>User Roles</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link :to="{name:'dashboard'}">Home</router-link></li>
                <li class="breadcrumb-item">Access Control</li>
                <li class="breadcrumb-item active">Roles</li>
            </ol>
        </nav>
    </div>

    <div class="card">
        <div class="card-body">
            <br>
            <div class="row p-2" v-loading="isLoading">
                <template v-if="checkHasPermission('roles.add')">
                    <div class="col-sm-12 d-flex m-b-10">
                        <el-button @click="isAddingRoles = true" type="primary" :icon="Plus" plain>Add Role</el-button>
                    </div>
                    <br>
                </template>

                <div v-if="checkHasPermission('roles.view')" class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                        <tr>
                            <th>Role</th>
                            <th>Users Added</th>
                            <th>Permissions Assigned</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-if="roles.length" v-for="(role, index) in roles"
                            :key="'roles-'+index" style="cursor: pointer;">
                            <td>{{ startCase(role.name) }}</td>
                            <td>
                                {{ role.users_names.slice(0, 3).join(", ") }}
                                <small v-if="role.users_count > 2">+{{ parseInt(role.users_count) - 2 }} more</small>
                            </td>
                            <td>{{ parseInt(role.permissions_count) == 0 ? '' : `${parseInt(role.permissions_count).toString()} permission${parseInt(role.permissions_count) > 1 ? 's' : ''}` }}</td>
                            <td>
                                <el-dropdown trigger="click"
                                             @command="handleEntryAction">
                                    <el-button plain type="primary" size="small" :disabled="role.name == 'super_admin'
                                                || !(checkHasPermission('roles.edit') || checkHasPermission('roles.delete'))">
                                        Actions<el-icon class="el-icon--right"><ArrowDown /></el-icon>
                                    </el-button>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item :command="{action:'edit',role}" v-if="checkHasPermission('roles.edit')">Edit</el-dropdown-item>
                                            <el-dropdown-item :command="{action:'delete',role}" v-if="checkHasPermission('roles.delete')">Delete</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </td>
                        </tr>
                        <tr v-else><td colspan="4" class="text-center p-3">No data</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal to add roles -->
    <el-dialog
            v-model="isAddingRoles"
            width="30%"
            title="Add new Role"
            :fullscreen="isSmallScreen">
        <div class="p-3" v-loading="isModalLoading">
            <form @submit.prevent="acceptNewRole">
                <input type="text"
                       class="form-control"
                       placeholder="Enter new role name here"
                       v-model="newRoleName" required>

                <div class="m-t-10">
                    <el-button size="small" native-type="submit" type="primary" :disabled="!newRoleName.length">Add Role</el-button>
                </div>

            </form>

            <template v-if="newRoles.length">
                <el-divider></el-divider>
                <h6><small class="fw-bold">New Roles to save</small></h6>
                <div class="d-flex flex-wrap">
                    <div class="p-1" v-for="(role, index) in newRoles"
                         :key="'new-role'+role">
                        <el-tag closable @close="newRoles.splice(index, 1)">
                            {{ startCase(role) }}
                        </el-tag>
                    </div>
                </div>

                <div class="m-t-10 d-flex justify-content-end">
                    <el-button @click="saveNewRoles" size="small" type="primary">Save new Roles</el-button>
                </div>
            </template>
        </div>
    </el-dialog>
    <!-- Modal to edit role -->
    <el-dialog
            v-if="editRole"
            v-model="isEditingRole"
            width="30%"
            title="Edit Role"
            :fullscreen="isSmallScreen">
        <div class="p-3" v-loading="isModalLoading">
            <form @submit.prevent="saveRoleChanges">
                <input type="text"
                       class="form-control"
                       placeholder="Enter role name here"
                       v-model="editRole.new_name" required>

                <div class="m-t-10">
                    <el-button size="small" native-type="submit" type="primary" :disabled="editRole.name == editRole.new_name">Save Changes</el-button>
                </div>

            </form>
        </div>
    </el-dialog>

</template>

<style scoped>

</style>