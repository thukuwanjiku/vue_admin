<script setup>

import {socialPlatforms} from "@/services/Helpers";
import {startCase} from "lodash-es";

/* ------------------------
* Props definition
* ------------------------
* */
const props = defineProps({
    platform: {
        type: String,
        required: true,
        validator(value, props) {
            return socialPlatforms.includes(value);
        }
    },
    link: {
        type: String,
        validator(value, props) {
            return value
        }
    }
});


/* ------------------------
* Functions
* ------------------------
* */
function handleClicked(){
    if(!props.link) return;

    return window.open(props.link, '_blank');
}

</script>

<template>

    <div class="social_handle" :class="link ? 'pointer' : ''" @click="handleClicked">
        <img v-if="platform == 'facebook'" src="@/assets/images/socials/facebook.png" :alt="startCase(platform) +' handle'">
        <img v-if="platform == 'instagram'" src="@/assets/images/socials/instagram.png" :alt="startCase(platform) +' handle'">
        <img v-if="platform == 'x'" src="@/assets/images/socials/x.webp" :alt="startCase(platform) +'handle'">
        <img v-if="platform == 'linkedin'" src="@/assets/images/socials/linkedin.png" :alt="startCase(platform) +' handle'">
        <img v-if="platform == 'website'" src="@/assets/images/socials/website.png" :alt="startCase(platform) +' link'">
        <img v-if="platform == 'whatsapp'" src="@/assets/images/socials/whatsapp.webp" :alt="startCase(platform) +' handle'">
        <img v-if="platform == 'tiktok'" src="@/assets/images/socials/tiktok.png" :alt="startCase(platform) +' handle'">
        <img v-if="platform == 'youtube'" src="@/assets/images/socials/youtube.png" :alt="startCase(platform) +' handle'">
    </div>

</template>

<style scoped>
.social_handle {
    height: 30px;
    width: 30px;
    margin: 5px;
}
.social_handle > img {
    height: 100%;
    width: 100%;
    border-radius: 4px;
}
.social_handle:hover > img {
    filter: grayscale(0);
}
.pointer{
    cursor: pointer;
}
</style>