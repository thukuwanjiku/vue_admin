<script setup>

import {useStore} from "vuex";
import {useRouter} from "vue-router";
import CloseButton from "@/components/CloseButton.vue";
import {onMounted, ref} from "vue";
import {startCase} from "lodash-es";
import {moneyFormatter} from "../../../../services/Helpers";
import {Carousel, Slide, Navigation, Pagination} from "vue3-carousel";
import 'vue3-carousel/dist/carousel.css'
import {ArrowDown, Money, PictureFilled} from "@element-plus/icons-vue";

/* ----------------------------------
* Variables & properties
* ----------------------------------
* */
const store = useStore();
const router = useRouter();

const listing = ref({});
const listingMedia = ref([]);

/* ----------------------------------
* Lifecycle Hooks
* ----------------------------------
* */
onMounted(()=>{
    if(store.state.exploreHub.viewedListing == null){
        return router.back();
    }

    //copy listing to local variable
    listing.value = JSON.parse(JSON.stringify(store.state.exploreHub.viewedListing));

    //copy listing media to variable for managing them
    listingMedia.value = JSON.parse(JSON.stringify(listing.value.media));

    setTimeout(()=>{
        //reset background color on listing description p
        $(".listing_desc > p > span").css('background', 'inherit');
    }, 500);
});

</script>

<template>

    <div class="row" v-if="Object.keys(listing).length">
        <div class="col-sm-12 mb-3 d-inline-flex justify-content-end align-items-center">
            <div class="p-1">
                <el-dropdown trigger="click">
                    <el-button plain size="small">
                        Actions<el-icon class="el-icon--right"><arrow-down /></el-icon>
                    </el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item :icon="Money">Add Payment</el-dropdown-item>
                            <el-dropdown-item :icon="PictureFilled">Add Media</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>

            <close-button></close-button>
        </div>

        <div class="col-md-12">
            <Carousel :itemsToShow="2" :wrapAround="true" :transition="500">
                <Slide v-for="(file, index) in listing.media" :key="'view-listing-media-'+file.id">
                    <img :src="file.path" class="d-block w-100 carousel__item">
                </Slide>

                <template #addons>
                    <Navigation />
                    <Pagination />
                </template>
            </Carousel>
        </div>

        <div class="col-md-12 m-t-20">
            <h5 class="mz-color">{{ listing.title }}</h5>
        </div>

        <div class="col-md-12 d-flex align-items-center">
            <div class="listing_company_logo">
                <img :src="listing.company.logo" :alt="listing.company.name+'\'s logo'">
            </div>
            <div>
                <h6 class="m-0">{{ listing.company.name }}</h6>
                <h6 class="m-0"><small>{{ listing.company.description }}</small></h6>
            </div>
        </div>

        <div class="col-md-12 m-t-20">
            <h6>Description</h6>
            <div class="alert alert-secondary  alert-dismissible fade show listing_desc"
                 role="alert" v-html="listing.description"></div>
        </div>

        <div class="col-md-12 m-t-20" v-if="listing.payments.length">
            <h6>Payments</h6>
            <div class="col-md-12 d-flex flex-wrap align-items-center">
                <div class="p-1 view_listing_payment" v-for="payment in listing.payments" :key="'listing-payment-'+payment.id">
                    <small>
                        <strong>Mode</strong>: {{ startCase(payment.mode) }} <br>
                        <strong>Amount</strong>: {{ moneyFormatter(payment.amount, 'KES') }}<br>
                        <strong>Reference</strong>:
                        <template v-show="payment.reference && payment.reference.length && payment.reference != payment.mode">
                            {{ payment.reference }}
                        </template>
                        <br>
                        <strong>Added</strong>: {{ payment.added_at }}
                    </small>
                </div>
            </div>
        </div>

        <div class="col-md-12 m-t-20">
            <p class="m-0">
                {{ listing.start_date_desc }}
                <strong>{{ listing.start_at_formatted }}</strong>
                &nbsp;-&nbsp;
                <strong>{{ listing.end_at_formatted }}</strong>
            </p>
        </div>
    </div>

</template>

<style scoped>
.carousel__viewport {
    perspective: 2000px;
}

.carousel__track {
    transform-style: preserve-3d;
}

.carousel__slide--sliding {
    transition: 0.5s;
}

.carousel__slide {
    opacity: 0.9;
    transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
    transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
    opacity: 1;
    transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--next {
    opacity: 1;
    transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
    opacity: 1;
    transform: rotateY(0) scale(1.1);
}
</style>