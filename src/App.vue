<script setup>

import {useStore} from "vuex";

const store = useStore();

</script>
<template>
    <div class="p-5" style="width:100vw;height:100vh;" v-loading="true" v-if="!store.state.auth.hasFetchedPermissions"></div>
  <router-view  v-if="store.state.auth.hasFetchedPermissions" />
</template>