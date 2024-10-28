<script setup>
import RenderlessLaravelVuePagination from './RenderlessLaravelVuePagination.vue'

const props = defineProps({
  pagination: {
    type: Object,
    required: true
  },

  showLoadMore: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <div class="py-3">
    <renderless-laravel-vue-pagination :data="props.pagination" @pagination-change-page="$emit('pagination-change-page', $event)">
      <template v-slot="{ computed, onPerPageEvents, nextButtonEvents, prevButtonEvents, pageSelectEvents }">
        <div class="d-none d-md-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center">
            <div class="pe-4 me-4 d-flex align-items-center border-end">
              <p class="my-0 me-2 fw-medium text-dark w-100">Items Per Page</p>
              <select name="pagination" id="pagination" class="text-primary fw-medium border-0 bg-transparent form-select" :value="computed.perPage" v-on="onPerPageEvents()" style="width: max-content;">
                <option v-for="perPageOption in computed.perPageOptions" :key="perPageOption" :value="perPageOption">{{ perPageOption }}</option>
              </select>
            </div>
            <p class="m-0 fw-medium text-dark">
              Showing {{ computed.from ? computed.from : 0 }} - {{ computed.to ? computed.to : 0 }} of {{ computed.total }}
            </p>
          </div>
          <div class="d-flex align-items-center">
            <div class="pe-4 border-end">
              <p class="m-0 fw-medium text-dark">Page {{ computed.currentPage }} of {{ computed.lastPage }}</p>
            </div>
            <div class="me-n3 d-flex align-items-center">
              <a :class="['border-0', { 'opacity-50': computed.currentPage <= 1 }]" role="button" class="btn" href="#" v-on="prevButtonEvents">
                <svg width="24" height="24" viewBox="0 0 16 16" fill="inherit" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                  <g id="pagination-chevron-left">
                    <path d="M9.3335 12.5L5.3335 8.5L9.3335 4.5L10.2668 5.43333L7.20016 8.5L10.2668 11.5667L9.3335 12.5Z"/>
                  </g>
                </svg>
              </a>
              <select name="pagination" class="text-primary fw-medium border-0 bg-transparent form-select" v-on="pageSelectEvents()" :value="computed.currentPage">
                <option v-for="pageNumber in computed.pages" :key="pageNumber">{{ pageNumber }}</option>
              </select>
              <a role="button" :class="['border-0 pe-0', { 'opacity-50': !computed.nextPageUrl }]" class="btn" href="#" v-on="nextButtonEvents">
                <svg width="24" height="24" viewBox="0 0 16 16" fill="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <g id="pagination-chevron-right">
                    <path d="M6.26683 12.5L5.3335 11.5667L8.40016 8.5L5.3335 5.43333L6.26683 4.5L10.2668 8.5L6.26683 12.5Z"/>
                  </g>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </template>
    </renderless-laravel-vue-pagination>

    <renderless-laravel-vue-pagination v-if="props.showLoadMore" :data="props.pagination" @pagination-change-page="$emit('pagination-change-page', $event)">
      <template v-slot="{ computed, loadMoreEvents }">
        <div class="d-flex d-md-none align-items-center justify-content-center">
          <a v-if="computed.nextPageUrl" class="m-0 text-decoration-none fs-5 fw-medium text-primary text-uppercase" v-on="loadMoreEvents">
            Load more
          </a>
          <p v-else class="m-0 fs-5 fw-medium text-uppercase text-secondary">
            Load more
          </p>
        </div>
      </template>
    </renderless-laravel-vue-pagination>

    <renderless-laravel-vue-pagination v-else :data="props.pagination" @pagination-change-page="$emit('pagination-change-page', $event)">
      <template v-slot="{ computed, onPerPageEvents, nextButtonEvents, prevButtonEvents }">
        <div class="d-flex d-md-none align-items-center justify-content-center">
          <a :class="{ 'opacity-50': computed.currentPage <= 1 }" role="button" class="btn p-0" href="#" v-on="prevButtonEvents">
            <svg width="24" height="24" viewBox="0 0 16 16" fill="inherit" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
              <g id="pagination-chevron-left">
                <path d="M9.3335 12.5L5.3335 8.5L9.3335 4.5L10.2668 5.43333L7.20016 8.5L10.2668 11.5667L9.3335 12.5Z"/>
              </g>
            </svg>
          </a>
          <a class="m-0 fw-medium text-uppercase text-dark">
            Page {{ computed.currentPage }} of {{ computed.lastPage }}
          </a>
          <a :class="{ 'opacity-50': !computed.nextPageUrl }" role="button" class="btn p-0" href="#" v-on="nextButtonEvents">
            <svg width="24" height="24" viewBox="0 0 16 16" fill="inherit" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
              <g id="pagination-chevron-right">
                <path d="M6.26683 12.5L5.3335 11.5667L8.40016 8.5L5.3335 5.43333L6.26683 4.5L10.2668 8.5L6.26683 12.5Z"/>
              </g>
            </svg>
          </a>
        </div>
      </template>
    </renderless-laravel-vue-pagination>
  </div>
</template>
