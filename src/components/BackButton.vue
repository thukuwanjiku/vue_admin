<script setup>

import {useRouter} from "vue-router";

const router = useRouter();

</script>

<template>

    <button
            type="button"
            class="btn btn-light text-muted"
            @click="router.back()">
        <i class="ri ri-arrow-left-line"></i>
        Back
    </button>

</template>

<style scoped>
a {
    display: flex;
    align-items: center;
    color: inherit;
}
</style>