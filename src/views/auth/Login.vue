<script setup>

//imports
import { ref } from 'vue';
import api from "@/services/api";
import {apiRoutes} from "@/services/apiRoutes";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

/**
 * All variables definitions
 * */
const router = useRouter();
const store = useStore();

const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const isLoading = ref(false)


/**
 * Methods definitions
 * */
function getSanctumCSRFToken(){
    api.get(apiRoutes.SANCTUM_CSRF_TOKEN)
            //call method to login user
            .then(response => {
                console.log('Sanctum response', response);
                return login();
            })
}
function login(){

    //prepare request payload
    let payload = {
        email: email.value.trim(),
        password: password.value.trim()
    }

    //show loader
    isLoading.value = true;

    //make api call
    api.post(apiRoutes.LOGIN, payload)
            .then(response => {
                //store access token
                store.commit('auth/STORE_AUTH_TOKEN', response.data.token);

                //store user details
                store.commit('auth/STORE_AUTH_USER', response.data.user)

                //if "Remember Me" is checked, save the details in localStorage
                if(rememberMe){
                    localStorage.setItem('mz.admin', JSON.stringify(response.data.user));
                    localStorage.setItem('bearer_token', response.data.token);
                }

                //dismiss loader
                isLoading.value = false;

                //redirect user to dashboard
                router.replace({ name: 'dashboard'}); //TODO Implement intended route logic
            })
            .catch(error => isLoading.value = false)
}

</script>

<template>

    <div class="container-scroller">
        <div class="container-fluid page-body-wrapper full-page-wrapper">
            <div class="content-wrapper d-flex align-items-center auth px-0">
                <div class="row w-100 mx-0">
                    <div class="col-lg-4 mx-auto">
                        <div v-loading="isLoading" class="auth-form-light text-left py-5 px-4 px-sm-5">
                            <div class="brand-logo">
                                <img src="@/assets/images/myzola_logo.png" alt="logo">
                            </div>
                            <h4 class="font-weight-light">Sign in to continue.</h4>
                            <form @submit.prevent="getSanctumCSRFToken" class="pt-3">
                                <div class="form-group">
                                    <input type="email" class="form-control form-control-lg" placeholder="Email" v-model="email" required>
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control form-control-lg" placeholder="Password" v-model="password" required>
                                </div>
                                <div class="mt-3 d-grid gap-2">
                                    <button type="submit"
                                            class="btn btn-block btn-lg font-weight-medium auth-form-btn mz-bg mz-bg-hover text-white"
                                    >SIGN IN</button>
                                </div>
                                <div class="my-2 d-flex justify-content-between align-items-center">
                                    <div class="form-check">
                                        <label class="form-check-label text-muted">
                                            <input type="checkbox" class="form-check-input" v-model="rememberMe">
                                            <a href="#">Remember me</a>
                                            <i class="input-helper"></i><i class="input-helper"></i></label>
                                    </div>
                                    <a href="#" class="auth-link text-black">Forgot password?</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- content-wrapper ends -->
        </div>
        <!-- page-body-wrapper ends -->
    </div>

</template>

<style scoped>

</style>