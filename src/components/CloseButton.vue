<script setup>

import {useRouter} from "vue-router";

const router = useRouter();

</script>

<template>

    <button
            type="button"
            class="btn btn-secondary text-muted"
            @click="router.back()">
        <i class="ri ri-close-line text-white"></i>
    </button>

</template>

<style scoped>
a {
    display: flex;
    align-items: center;
    color: inherit;
}
</style>