<script setup>

import {useRouter} from "vue-router";
import {Close} from "@element-plus/icons-vue";

const router = useRouter();

</script>

<template>

    <el-button @click="router.back()" :icon="Close" type="info" plain circle />

</template>

<style scoped>
a {
    display: flex;
    align-items: center;
    color: inherit;
}
</style>