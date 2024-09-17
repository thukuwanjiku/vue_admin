<script setup>

import {ref, computed, onMounted} from "vue";
import api from "@/services/api";
import {apiRoutes} from "@/services/apiRoutes";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {ElMessage, ElMessageBox} from "element-plus";
import {AwesomeSocialButton} from "awesome-social-button";
import {ArrowDown, Plus} from "@element-plus/icons-vue";
import {checkHasPermission, fetchRoles, fetchUsers, isSmallScreen} from "@/services/Helpers";
import {startCase} from "lodash-es";

/* -----------------------------
 * Variables
 * -----------------------------
 * */
const store = useStore();
const router = useRouter();

const isModalLoading = ref(false);
const isInvitingUsers = ref(false);
const inviteEmail = ref("");
const inviteRole = ref(null);


/* -----------------------------
 * Computed Properties
 * -----------------------------
 * */
const users = computed(()=> store.state.auth.users);
const roles = computed(()=> store.state.auth.roles);
const isLoading = computed({
    get: ()=> store.state.auth.isFetchingUsers,
    set: (value) => store.commit('auth/SET_IS_FETCHING_USERS', value)
});



/* -----------------------------
 * Component Lifecycle Hooks
 * -----------------------------
 * */
onMounted(()=>{
    //fetch users
    if(checkHasPermission('users.list') && !users.value.length) fetchUsers();
    if(!roles.value.length) fetchRoles();
});


/* -----------------------------
 * Methods
 * -----------------------------
 * */
function inviteUser(){
    //prepare payload
    let payload = {
        emails: [inviteEmail.value],
        role_id: inviteRole.value,
    };

    //show loader
    isModalLoading.value = true;

    //make api call
    api.post(apiRoutes.INVITE_USERS, payload)
            .then(response => {
                //show success message
                $.growl.notice({message: response.data.message});

                //dismiss modal
                isInvitingUsers.value = false;

                //dismiss loader
                isModalLoading.value = false;

                //reset values
                inviteRole.value = null;
                inviteEmail.value = "";
            })
            .catch(error => isModalLoading.value = false)
}

function handleEntryAction(payload){
    return;
    switch (payload.action){
        case 'edit':
            return handleEditRole(payload.role);

        case 'delete':
            return confirmDelete(payload.role);
    }
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
        <h1>Users</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link :to="{name:'dashboard'}">Home</router-link></li>
                <li class="breadcrumb-item">Access Control</li>
                <li class="breadcrumb-item active">Users</li>
            </ol>
        </nav>
    </div>

    <div class="card">
        <div class="card-body">
            <br>
            <div class="row p-2" v-loading="isLoading">
                <template v-if="checkHasPermission('users.invite')">
                    <div class="col-sm-12 d-flex m-b-10">
                        <el-button @click="isInvitingUsers = true"
                                   type="primary" :icon="Plus" plain>Invite User</el-button>
                    </div>
                    <br>
                </template>

                <div v-if="checkHasPermission('users.list')" class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                        <tr>
                            <th>User</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Roles</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-if="users.length" v-for="(user, index) in users"
                            :key="'users-'+index">
                            <td>{{ user.name }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.phone_number }}</td>
                            <td>{{ user.roles.map(role => startCase(role.name)).join(', ') }}</td>
                            <td>
                                <el-dropdown trigger="click"
                                             @command="handleEntryAction"
                                             v-if="!user.roles.some(entry => entry.name == 'super_admin')
                                                && (checkHasPermission('users.delete') || checkHasPermission('users.manage_roles'))">
                                    <el-button plain type="primary" size="small">
                                        Actions<el-icon class="el-icon--right"><ArrowDown /></el-icon>
                                    </el-button>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item :command="{action:'delete',user}" v-if="checkHasPermission('users.delete')">Delete</el-dropdown-item>
                                            <el-dropdown-item :command="{action:'manage_roles',user}" v-if="checkHasPermission('users.manage_roles')">Manage Roles</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </td>
                        </tr>
                        <tr v-else><td colspan="5" class="text-center p-3">No data</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal to add roles -->
    <el-dialog
            v-model="isInvitingUsers"
            width="40%"
            title="Invite users"
            :fullscreen="isSmallScreen">
        <div class="p-3" v-loading="isModalLoading">
            <form @submit.prevent="inviteUser">
                <input-label>Email</input-label>
                <input type="email"
                       class="form-control"
                       placeholder="Enter email to invite here"
                       v-model="inviteEmail" required>

                <br>
                <input-label>Role</input-label>
                <br>

                <el-select
                        v-model="inviteRole"
                        placeholder="Select a role for the invited user"
                        size="large"
                        filterable>
                    <el-option
                            v-for="role in roles.filter(entry => entry.name != 'super_admin')"
                            :key="'user-invite-role-picker-'+role.id"
                            :label="startCase(role.name)"
                            :value="role.id" />
                </el-select>
                <br>

                <div class="m-t-10">
                    <el-button native-type="submit"
                               type="primary" :disabled="!inviteEmail.length || !inviteRole">Invite User</el-button>
                </div>
            </form>
        </div>
    </el-dialog>

    <!-- Modal to edit role -->
<!--    <el-dialog-->
<!--            v-if="editRole"-->
<!--            v-model="isEditingRole"-->
<!--            width="30%"-->
<!--            title="Edit Role"-->
<!--            :fullscreen="isSmallScreen">-->
<!--        <div class="p-3" v-loading="isModalLoading">-->
<!--            <form @submit.prevent="saveRoleChanges">-->
<!--                <input type="text"-->
<!--                       class="form-control"-->
<!--                       placeholder="Enter role name here"-->
<!--                       v-model="editRole.new_name" required>-->

<!--                <div class="m-t-10">-->
<!--                    <el-button size="small" native-type="submit" type="primary" :disabled="editRole.name == editRole.new_name">Save Changes</el-button>-->
<!--                </div>-->

<!--            </form>-->
<!--        </div>-->
<!--    </el-dialog>-->

</template>

<style scoped>

</style>