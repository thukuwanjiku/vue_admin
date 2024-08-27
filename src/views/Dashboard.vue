<script setup>

import {computed} from "vue";
import {useStore} from "vuex";


/* -----------------------------
 * Variables
 * -----------------------------
 * */
const store = useStore();

/* -----------------------------
 * Computed Properties
 * -----------------------------
 * */
const userFirstName = computed(()=> {
    if(store.state.auth.user){
        return store.state.auth.user.name.toString().split(" ")[0];
    }
    return "";
})

</script>

<template>

    <div class="row">
        <div class="col-md-12 mb-4">
            <h4 class="font-weight-bold">Hello {{ userFirstName }}</h4>
            <h6 class="font-weight-normal mb-0">Welcome to MyZola Admin</h6>
        </div>
    </div>

</template>

<style scoped>

</style>