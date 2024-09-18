<script setup>

import {checkHasPermission, fetchRoles, fetchSignedInUserPermissions} from "@/services/Helpers";
import {startCase} from "lodash-es";
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";
import InputLabel from "@/components/InputLabel.vue";
import {ElMessage} from "element-plus";
import api from "@/services/api";
import {apiRoutes} from "@/services/apiRoutes";
import {Check} from "@element-plus/icons-vue";

/* -----------------------------
 * Variables
 * -----------------------------
 * */
const store = useStore();

const isLoading = ref(false);
const roleID = ref(null);
const role = ref({});
const rolePermissions = ref([]);
const selectedModules = ref([]);


/* -----------------------------
 * Computed Properties
 * -----------------------------
 * */
const roles = computed(()=> store.state.auth.roles);


/* -----------------------------
 * Component Lifecycle Hooks
 * -----------------------------
 * */
onMounted(()=>{
    //fetch roles
    if(!roles.value.length) fetchRoles();
});


/* -----------------------------
 * Methods
 * -----------------------------
 * */
function acceptSelectedRole(){
    //set role
    let selectedRole = roles.value.find(role => role.id == roleID.value);
    if(!selectedRole) return ElMessage.warning("An error occurred, please reload the page and try again");
    role.value = JSON.parse(JSON.stringify(selectedRole));

    //call method to fetch reviews summary
    fetchRolePermissions();
}
function fetchRolePermissions(){
    //prepare payload
    let payload = {role_id: role.value.id};

    //show loader
    isLoading.value = true;

    //make api call
    api.post(apiRoutes.GET_ROLE_PERMISSIONS, payload)
            .then(response => {
                //set role permissions
                rolePermissions.value = response.data.permissions;

                //reset role selection
                roleID.value = null;

                //hide loader
                isLoading.value = false;
            })
            .catch(error => isLoading.value = false)
}
function handleSavePermissions(){
    //get all permissions as a direct array not the complex array grouped by modules/submodules
    let permissions = rolePermissions.value
            .filter(_module => !selectedModules.length || selectedModules.value.includes(_module.module))
            .flatMap(module =>
                module.submodules.flatMap(submodule =>
                        submodule.actions.map(action => ({
                            name: action.name,
                            has_permission: action.has_permission
                        }))
                )
            );

    //prepare payload
    let payload = {
        role_id: role.value.id,
        permissions: permissions
    };

    //show loader
    isLoading.value = true;

    //make api call
    api.post(apiRoutes.SAVE_ROLE_PERMISSIONS, payload)
            .then(response => {
                //show success message
                $.growl.notice({message: response.data.message})

                //reload page to reload app permissions
                window.location.reload();

                //hide loader
                isLoading.value = false;
            })
            .catch(error => isLoading.value = false)
}

</script>

<template>

    <div class="pagetitle">
        <h1>Role Permissions</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link :to="{name:'dashboard'}">Home</router-link></li>
                <li class="breadcrumb-item">Access Control</li>
                <li class="breadcrumb-item active">Role Permissions</li>
            </ol>
        </nav>
    </div>

    <div class="card">
        <div class="card-body">
            <br>
            <div class="row p-2" v-loading="isLoading" v-if="checkHasPermission('permissions.list')">

                <!-- Role Selector-->
                <div class="row p-b-10">
                    <div class="col-md-6 col-sm-12">
                        <input-label>Select a role to manage permissions</input-label>
                        <div class="d-flex align-items-center flex-wrap">
                            <el-select
                                    style="width: 250px;"
                                    v-model="roleID"
                                    placeholder="Click to select"
                                    size="large"
                                    filterable>
                                <el-option
                                        v-for="role in roles.filter(role => role.name != 'super_admin')"
                                        :key="'roles-permission-picker-'+role.id"
                                        :label="startCase(role.name)"
                                        :value="role.id" />
                            </el-select>
                            <el-button :disabled="!roleID"
                                       type="primary"
                                       id="btn-get-permissions"
                                       @click="acceptSelectedRole">Get Permissions</el-button>
                        </div>
                    </div>
                </div>

                <!-- Role Permissions -->
                <div class="row" v-if="rolePermissions.length">
                    <!-- Separator -->
                    <el-divider></el-divider>

                    <!-- Role Indicator -->
                    <h4 class="m-0 text-center">Permissions for {{ startCase(role.name) }}</h4>
                    <!-- Modules Picker -->
                    <div class="row m-t-10">
                        <el-checkbox-group
                                class="d-flex flex-wrap justify-content-center align-items-center"
                                v-model="selectedModules">
                            <el-checkbox v-for="module in rolePermissions"
                                         :key="'modules-checker-'+module.module"
                                         :label="startCase(module.module)"
                                         :value="module.module" border></el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <el-divider>
                        <i class="bx bx-shield-quarter"></i>
                    </el-divider>

                    <!-- Permissions -->
                    <div class="col-md-12">
                        <!-- Loop through permissions modules -->
                        <div class="col-md-12 p-2 permission_module m-t-10"
                             v-for="(module, index) in rolePermissions.filter(_module => !selectedModules.length || selectedModules.includes(_module.module))"
                             :key="'permissions-module-'+module.module">
                            <el-divider v-if="index > 0"></el-divider>

                            <!-- Module title -->
                            <div class="d-flex align-items-center">
                                <h5 class="fw-bold m-0">{{ startCase(module.module) }}</h5>

                                <div v-if="module.submodules.length == 1 && module.submodules.some(_submodule => _submodule.actions.some(_action => !_action.has_permission))"
                                     @click="module.submodules.forEach(_submodule => _submodule.actions.forEach(_action => _action.has_permission = true))"
                                     class="m-l-10 check_all d-flex align-items-center">
                                    <small>Check all</small>
                                </div>
                            </div>

                            <!-- Submodules -->
                            <div class="col-md-12 p-1 m-l-15 m-t-10"
                                 v-for="(submodule, submoduleIndex) in module.submodules"
                                 :key="module.module+'-submodule-'+submoduleIndex">

                                <!-- Submodule title -->
                                <div class="d-flex align-items-center" v-if="submodule.submodule.length">
                                    <h6 class="fw-bold m-0">
                                        {{ startCase(submodule.submodule) }}
                                    </h6>

                                    <div v-if="submodule.actions.length > 1 && submodule.actions.some(entry => !entry.has_permission)"
                                         @click="submodule.actions.forEach(action => action.has_permission = true)"
                                         class="m-l-10 check_all d-flex align-items-center">
                                        <small>Check all</small>
                                    </div>
                                </div>

                                <!-- Submodule actions -->
                                <div class="p-1 row m-l-10">
                                    <div class="col-md-2 col-sm-6"
                                         v-for="action in submodule.actions"
                                         :key="'module-permission-'+action.action">
                                        <el-checkbox v-model="action.has_permission"
                                                     :label="startCase(action.action)"
                                                     :disabled="!checkHasPermission(action.has_permission ? 'permissions.revoke' : 'permissions.grant')"
                                                     size="large" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <el-divider></el-divider>
                    <div class="col-md-12 d-flex justify-content-end">
                        <el-button size="large" type="primary" @click="handleSavePermissions">Save Permissions</el-button>
                    </div>

                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>

@media (max-width: 500px) {
    #btn-get-permissions {
        margin-left: 0;
        margin-top: 5px;
    }
}

#btn-get-permissions{
    margin-left:5px;
}
.check_all {
    background: #eff1f1;
    padding: 2px 5px;
    font-size: 11px;
    border-radius: 5px;
    cursor: pointer;
}
.check_all:hover {
    background: #e5e5e5;
}
.check_all.selected {
    color: #0c74df;
}
</style>