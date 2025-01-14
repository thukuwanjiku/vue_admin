<script setup>

//imports
import { ref } from 'vue';
import api from "@/services/api";
import {apiRoutes} from "@/services/apiRoutes";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {startIdleTracking} from "@/services/idleAppLockTimer";

/* -----------------------------
 * All variables definitions
 * -----------------------------
 * */
const router = useRouter();
const store = useStore();

const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const isLoading = ref(false)
const isPasswordFocused = ref(false)
const showPassword = ref(false)


/* -----------------------------
 * Methods definitions
 * ---------------------------
 * */
function toggleShowPassword(){
    showPassword.value = !showPassword.value;
    //focus the password field
    setTimeout(()=>{
        $("#password").focus();
    }, 100);
}
function getSanctumCSRFToken(){
    //show loader
    isLoading.value = true;

    api.get(apiRoutes.SANCTUM_CSRF_TOKEN)
            //call method to login user
            .then(response => {
                return login();
            })
            .catch(error => isLoading.value = false)
}
function login(){

    //prepare request payload
    let payload = {
        email: email.value.trim(),
        password: password.value.trim()
    }

    //make api call
    api.post(apiRoutes.LOGIN, payload)
            .then(response => {
                //store access token
                store.commit('auth/STORE_AUTH_TOKEN', response.data.token);
                //store user details
                store.commit('auth/STORE_AUTH_USER', response.data.user)
                //store user permissions
                store.commit('auth/STORE_PERMISSIONS', response.data.permissions)

                //if "Remember Me" is checked, save the details in localStorage
                if(rememberMe){
                    localStorage.setItem('mz.admin', JSON.stringify(response.data.user));
                    localStorage.setItem('bearer_token', response.data.token);
                }

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

                                    <div class="pt-4 pb-2">
                                        <h5 class="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                                        <p class="text-center small">Enter your username & password to login.</p>
                                    </div>

                                    <form @submit.prevent="getSanctumCSRFToken" class="row g-3 needs-validation">

                                        <div class="col-12">
                                            <div class="form-floating">
                                                <input type="email" class="form-control" id="email"
                                                       placeholder="Email" v-model="email" required>
                                                <label for="email">Email</label>
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
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe" v-model="rememberMe">
                                                <label class="form-check-label" for="rememberMe">Remember me</label>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <button class="btn btn-primary w-100" type="submit">Login</button>
                                        </div>
                                        <!--<div class="col-12">
                                            <p class="small mb-0">Don't have account? <a href="pages-register.html">Create an account</a></p>
                                        </div>-->
                                    </form>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </section>

        </div>
    </main>
    <!-- End #main -->

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
