<script setup>

import {onMounted, ref} from "vue";
import api from "@/services/api";
import {apiRoutes} from "@/services/apiRoutes";
import {startIdleTracking} from "@/services/idleAppLockTimer";
import {useRoute, useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import {useStore} from "vuex";

/* --------------------------------
* PROPS DEFINITION
* ----------------------------
* */
defineProps({
    token: String
})


/* --------------------------------
* Variables
* ----------------------------
* */
const route = useRoute();
const router = useRouter();
const store = useStore();

const isLoading = ref(false);
const name = ref("");
const password = ref("");
const passwordConfirmation = ref("");
const isPasswordFocused = ref(false)
const showPassword = ref(false)
const isPasswordConfirmationFocused = ref(false)
const showPasswordConfirmation = ref(false)

const tokenValidityStatus = ref("");


/* --------------------------------
* Variables
* ----------------------------
* */
onMounted(()=>{
    //validate token
    validateToken();
});


/* --------------------------------
* Methods
* ----------------------------
* */
function toggleShowPassword(){
    showPassword.value = !showPassword.value;
    //focus the password field
    setTimeout(()=>{
        $("#password").focus();
    }, 100);
}
function toggleShowConfirmPassword(){
    showPasswordConfirmation.value = !showPasswordConfirmation.value;
    //focus the password field
    setTimeout(()=>{
        $("#passwordConfirmation").focus();
    }, 100);
}
function validateToken(){
    //show loader
    isLoading.value = true;

    api.post(apiRoutes.VALIDATE_INVITE_TOKEN, {token: route.params.token})
            //call method to login user
            .then(response => {
                //set validity status
                tokenValidityStatus.value = response.data.valid ? 'valid' : 'invalid';

                //dismiss load
                isLoading.value = false;
            })
            .catch(error => isLoading.value = false)
}
function acceptInvite(){
    //check if passwords match
    if(password.value !== passwordConfirmation.value)
        return ElMessage.warning("Password confirmation does not match");

    //show loader
    isLoading.value = true;

    //prepare request payload
    let payload = {
        token: route.params.token,
        name: name.value.trim(),
        password: password.value.trim(),
        password_confirmation: passwordConfirmation.value.trim()
    }

    //make api call
    api.post(apiRoutes.ACCEPT_INVITE, payload)
            .then(response => {
                //show success message
                $.growl.notice({message: response.data.message});

                //store access token
                store.commit('auth/STORE_AUTH_TOKEN', response.data.token);
                //store user details
                store.commit('auth/STORE_AUTH_USER', response.data.user)
                //store user permissions
                store.commit('auth/STORE_PERMISSIONS', response.data.permissions)

                //dismiss loader
                isLoading.value = false;

                //set that the app is not locked
                store.commit('auth/UNLOCK_APP');

                //redirect user to dashboard
                router.replace({ name: 'dashboard'}); //TODO Implement intended route logic

                //start time for tracking idle time
                startIdleTracking();
            })
            .catch(error => isLoading.value = false)
}

</script>

<template>

    <main>
        <div class="container">

            <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                            <div class="d-flex justify-content-center py-4">
                                <div class="logo d-flex align-items-center w-auto">
                                    <img src="@/assets/images/myzola_icon.png" alt="">
                                    <span class="d-none d-lg-block">MyZola Admin</span>
                                </div>
                            </div><!-- End Logo -->

                            <div class="card mb-3">

                                <div class="card-body" v-loading="isLoading">

                                    <template v-if="tokenValidityStatus == 'valid'">
                                        <div class="pt-4 pb-2">
                                            <h5 class="card-title text-center pb-0 fs-4">Accept Invite</h5>
                                            <p class="text-center small">Enter your details below to accept invite and create account</p>
                                        </div>
                                        <form @submit.prevent="acceptInvite" class="row g-3 needs-validation">

                                            <div class="col-12">
                                                <div class="form-floating">
                                                    <input type="text" class="form-control" id="name"
                                                           placeholder="Name" v-model="name" required>
                                                    <label for="name">Name</label>
                                                </div>
                                            </div>

                                            <div class="col-12">
                                                <div class="form-floating">
                                                    <input :type="showPassword ? 'text' : 'password'"
                                                           class="form-control" id="password"
                                                           placeholder="Password" v-model="password"
                                                           @focus="isPasswordFocused = true"
                                                           @blur="isPasswordFocused = false"
                                                           required>
                                                    <label for="password">Password</label>

                                                    <i
                                                            :class="showPassword ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'"
                                                            @click="toggleShowPassword"
                                                            class="toggle-password" v-if="password.length"
                                                    ></i>
                                                </div>
                                            </div>

                                            <div class="col-12">
                                                <div class="form-floating">
                                                    <input :type="showPasswordConfirmation ? 'text' : 'password'"
                                                           class="form-control" id="passwordConfirmation"
                                                           placeholder="Password Confirmation"
                                                           v-model="passwordConfirmation"
                                                           @focus="isPasswordConfirmationFocused = true"
                                                           @blur="isPasswordConfirmationFocused = false"
                                                           required>
                                                    <label for="passwordConfirmation">Password</label>

                                                    <i
                                                            :class="showPasswordConfirmation ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'"
                                                            @click="toggleShowConfirmPassword"
                                                            class="toggle-password" v-if="passwordConfirmation.length"
                                                    ></i>
                                                </div>
                                            </div>


                                            <div class="col-12">
                                                <button class="btn btn-primary w-100" type="submit">Accept Invite</button>
                                            </div>
                                        </form>
                                    </template>

                                    <template v-if="tokenValidityStatus == 'invalid'">
                                        <div class="row p-2">

                                            <div class="alert alert-danger bg-danger text-light border-0 alert-dismissible fade show" role="alert">
                                                <i class="bx bx-error"></i>
                                                Token Invalid
                                            </div>

                                            <div class="col-md-12">
                                                The invite token is invalid.
                                            </div>

                                        </div>
                                    </template>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </section>

        </div>
    </main>

</template>

<style scoped>
.toggle-password {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    cursor: pointer;
    z-index: 2;
    color: #b7b7b7;
    font-size: 20px;
}

.form-floating input {
    padding-right: 2.5rem; /* Adjust to make space for the icon */
}
</style>