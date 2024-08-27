<script setup>

import {ref, computed} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import BackButton from "@/components/BackButton.vue";

//TODO where company is not set, fetch using name_slug

/**
 * Variables
 * */
const store = useStore();
const router = useRouter();

const rating = ref(4);

/**
 * Computed
 * */
const company = computed({
    get:()=> store.state.explore.viewedCompany,
    set: (data) => store.commit('explore/SET_VIEWED_COMPANY', data)
});

</script>

<template>

    <div class="col-md-12 grid-margin stretch-card">

        <div class="card">
            <!--<div class="row">
                <div class="col-md-11 col-sm-10">&nbsp;</div>
                <div class="col-md-1 col-sm-2">
                    <i @click="router.back()" class="mdi mdi-close fa-2x me-3" style="cursor: pointer"></i>
                </div>
            </div>-->

            <div class="card-body">
                <div class="row">
                    <back-button></back-button>
                </div>

                <template v-if="!company">
                    <p class="text-center text-danger">No company details to show</p>
                </template>
                <template v-else>
                    <div class="logo_and_name">
                        <div class="me-md-5 me-sm-4">
                            <img :src="company.logo" :alt="company.name+'\'s logo'" style="max-height: 100px;">
                        </div>
                        <div>
                            <h4><strong>Name: </strong> {{ company.name }}</h4>
                            <h6><strong>Tagline:</strong> {{ company.description }}</h6>
                        </div>
                    </div>

                    <hr>

                    <div class="row mt-5">
                        <div class="col-md-4">
                            <h5 class="fw-bold">Contact Details</h5>

                            <p>
                                {{ company.contact_name }}
                            </p>
                            <p>
                                {{ company.contact_phone }}
                            </p>
                            <p>
                                {{ company.email }}
                            </p>
                        </div>

                        <div class="col-md-4">
                            <h5 class="fw-bold">Added</h5>

                            <p>By: {{ company.added_by }}</p>
                            <p>At: {{ company.added_at }}</p>
                        </div>
                    </div>

                    <hr>

                    <div class="row mt-3">
                        <h4>
                            <span class="fw-bold">Reviews</span> (152)
                            &nbsp;

                            <span style="font-size: 12px;">
                            <a href="#" style="text-decoration:underline">See All</a>
                        </span>
                        </h4>

                        <div class="row p-4 reviews_grid">
                            <div class="review_card">
                                <el-rate disabled
                                         v-model="rating"
                                         disabled-void-color="#b1b0b0"/>
                                <br>
                                <h6 class="fw-bold">John Doe</h6>
                                <p class="truncated_review">
                                    Lorem ipsum dolor sit amet sicut. Lorem ipsum dolor sit amet sicut.
                                    Lorem ipsum dolor sit amet sicut. Lorem ipsum dolor sit amet sicut.
                                </p>
                            </div>
                            <div class="review_card">
                                <el-rate disabled
                                         v-model="rating"
                                         disabled-void-color="#b1b0b0"/>
                                <br>
                                <h6 class="fw-bold">John Doe</h6>
                                <p class="truncated_review">
                                    Lorem ipsum dolor sit amet sicut. Lorem ipsum dolor sit amet sicut.
                                    Lorem ipsum dolor sit amet sicut. Lorem ipsum dolor sit amet sicut.
                                </p>
                            </div>
                            <div class="review_card">
                                <el-rate disabled
                                         v-model="rating"
                                         disabled-void-color="#b1b0b0"/>
                                <br>
                                <h6 class="fw-bold">John Doe</h6>
                                <p class="truncated_review">
                                    Lorem ipsum dolor sit amet sicut. Lorem ipsum dolor sit amet sicut.
                                    Lorem ipsum dolor sit amet sicut. Lorem ipsum dolor sit amet sicut.
                                </p>
                            </div>
                            <div class="review_card">
                                <el-rate disabled
                                         v-model="rating"
                                         disabled-void-color="#b1b0b0"/>
                                <br>
                                <h6 class="fw-bold">John Doe</h6>
                                <p class="truncated_review">
                                    Lorem ipsum dolor sit amet sicut. Lorem ipsum dolor sit amet sicut.
                                    Lorem ipsum dolor sit amet sicut. Lorem ipsum dolor sit amet sicut.
                                </p>
                            </div>
                            <div class="review_card">
                                <el-rate disabled
                                         v-model="rating"
                                         disabled-void-color="#b1b0b0"/>
                                <br>
                                <h6 class="fw-bold">John Doe</h6>
                                <p class="truncated_review">
                                    Lorem ipsum dolor sit amet sicut. Lorem ipsum dolor sit amet sicut.
                                    Lorem ipsum dolor sit amet sicut. Lorem ipsum dolor sit amet sicut.
                                </p>
                            </div>

                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>

</template>

<style scoped>
.logo_and_name{
    display: flex;
    align-items: end;
}

/*.reviews_grid{
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}*/
.reviews_grid{
    box-sizing: border-box;
    display: grid;
    grid-template-columns: auto auto auto;
    gap: 10px;
}

@media only screen and (max-width: 768px) {
    .reviews_grid{
        grid-template-columns: auto auto;
    }
}

@media only screen and (max-width: 400px) {
    .reviews_grid{
        grid-template-columns: auto;
    }
}

</style>