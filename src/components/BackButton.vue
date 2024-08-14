<script setup>

import {useRouter} from "vue-router";

const router = useRouter();

</script>

<template>

    <a href="#" @click="router.back()">
        <i class="mdi mdi-chevron-left fa-2x"></i>
        Back
    </a>

</template>

<style scoped>
a {
    display: flex;
    align-items: center;
    color: inherit;
}
</style>