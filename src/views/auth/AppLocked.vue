<script setup>

//imports
import {computed, ref} from 'vue';
import api from "@/services/api";
import {apiRoutes} from "@/services/apiRoutes";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {startIdleTracking} from "@/services/idleAppLockTimer";
import {getNameInitials} from "@/services/Helpers";

/* ---------------------------------
 * All variables definitions
 * --------------------------------
 * */
const router = useRouter();
const store = useStore();

const password = ref("");
const isLoading = ref(false)
const isPasswordFocused = ref(false)
const showPassword = ref(false)


/* ---------------------------------
 * Computed properties
 * --------------------------------
 * */
const authUser = computed(()=> store.state.auth.user);
const userFirstName = computed(()=> {
    if(authUser){
        return store.state.auth.user.name.toString().split(" ")[0];
    }
    return "";
})
const userNameInitials = computed(()=> {
    if(!authUser) return "";
    return getNameInitials(authUser.value.name);
})


/**
 * Methods definitions
 * */
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
        email: authUser.value.email.trim(),
        password: password.value.trim(),
        app_lock: true
    }

    //make api call
    api.post(apiRoutes.LOGIN, payload)
            .then(response => {
                //store access token
                store.commit('auth/STORE_AUTH_TOKEN', response.data.token);

                //store user details
                store.commit('auth/STORE_AUTH_USER', response.data.user)

                //dismiss loader
                isLoading.value = false;

                //set that the app is not locked
                store.commit("auth/UNLOCK_APP");

                //redirect user back to the page they were on before app lock
                router.back();

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
                                        <div class="col-sm-12 d-flex justify-content-center">
                                            <div class="user_initials">{{ userNameInitials }}</div>
                                        </div>

                                        <h5 class="card-title text-center pb-0">Hello, {{ userFirstName }}</h5>
                                        <p class="text-center small">{{ authUser.email }}</p>
                                    </div>

                                    <form @submit.prevent="getSanctumCSRFToken" class="row g-3 needs-validation">
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
                                                        @click="showPassword = !showPassword"
                                                        class="toggle-password" v-if="password.length"
                                                ></i>
                                            </div>
                                        </div>

                                        <div class="col-12">
                                            <button class="btn btn-primary w-100" type="submit">
                                                <i class="ri ri-lock-unlock-line"></i>
                                                Unlock
                                            </button>
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

.user_initials{
    padding: 20px;
    background: #c9bcef;
    border-radius: 50%;
    font-size: 25px;
    font-weight: 600 !important;
}
</style>