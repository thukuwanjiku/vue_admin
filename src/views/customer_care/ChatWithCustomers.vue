<script setup>

import {computed, onMounted} from "vue";
import api from "@/services/api";
import {apiRoutes} from "@/services/apiRoutes";
import {useStore} from "vuex";
import {
  trimParagraph,
  formatChatTimestamp
} from "@/services/Helpers";

const store = useStore();

let conversations = computed({
  get: ()=> store.state.chat.conversations,
  set: (data) => store.commit('chat/STORE_CUSTOMER_CONVERSATIONS', data)
});

let isLoading = computed({
  get: ()=> store.state.chat.isFetchingCustomerConversations,
  set: (value) => store.commit('chat/SET_IS_FETCHING_CUSTOMER_CONVERSATIONS', value)
});

let selectedConversation = computed({
  get: ()=> store.state.chat.selectedConversation,
  set: (data) => store.commit('chat/SET_SELECTED_CUSTOMER_CONVERSATIONS', data)
});

onMounted(()=>{
  fetchCustomerConversations()
})

const fetchCustomerConversations = () => {
  store.commit("chat/SET_IS_FETCHING_CUSTOMER_CONVERSATIONS", true);
  api.get(apiRoutes.GET_CUSTOMER_CONVERSATIONS).then(response => {
    store.commit("chat/STORE_CUSTOMER_CONVERSATIONS", response.data.data);
    store.commit("chat/SET_IS_FETCHING_CUSTOMER_CONVERSATIONS", false);
  }).catch(error => {
    store.commit("chat/SET_IS_FETCHING_CUSTOMER_CONVERSATIONS", false)
  });
}

const openChat = () => {
  console.log('open')
}
</script>

<template>
  <div>
    <div class="row">
      <div class="col-md-12 mb-4">
        <h4 class="font-weight-bold">Customer Chats</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-md-3">
          <div class="card p-4">
            <div v-if="isLoading">
                <div class="d-flex flex-column justify-content-center align-items-center">
                  <div class="spinner-border text-primary"></div>
                  <p class="mt-2">Loading conversations. Please wait...</p>
                </div>
            </div>

            <div v-else>
              <a href="#" @click="openChat(conversation)" class="d-flex border-bottom p-3 chat-box" v-for="conversation in conversations" :key="`conversation-${conversation.id}`">
                <div class="me-3">
                  <img :src="conversation.conversation.data.customer_photo" class="rounded-circle" style="width: 60px;" :alt="conversation.conversation.data.customer_name" />
                </div>
                <div>
                  <p class="fw-bold text-dark mb-0">{{ conversation.conversation.data.customer_name }}</p>
                  <p class="mb-0 text-dark text-md mb-2">{{ trimParagraph(conversation.conversation.last_message.body) }}</p>
                  <small class="text-muted">{{ formatChatTimestamp(conversation.conversation.last_message.updated_at) }}</small>
                </div>
              </a>
            </div>
          </div>
      </div>

      <div class="col-md-9">
          <div class="card" v-if="selectedConversation">
            <div class="d-flex p-4">
              <div class="me-3">
                <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" class="rounded-circle" style="width: 60px;" alt="Avatar" />
              </div>
              <div>
                <p class="fw-bold text-dark mb-0">Daniel</p>
                <p class="mb-0 text-dark">daniel@gmail.com</p>
              </div>
            </div>

            <hr class="my-0"/>

            <div class="py-4 px-3">
              <div class="d-flex justify-content-start mb-4">
                <div class="message-container">
                  Hi, how are you samim?
                  <span class="message-time">8:40 AM, Today</span>
                </div>
              </div>
              <div class="d-flex justify-content-end mb-4">
                <div class="message-container-send">
                  Hi Khalid i am good tnx how about you?
                  <span class="message-time-send">8:55 AM, Today</span>
                </div>
              </div>
            </div>

            <hr class="my-0"/>

            <div class="p-3">
              <div class="d-flex">
                <input class="form-control me-3 border-0 border-bottom send-text-input rounded-0" value="" placeholder="Start typing">
                <button class="btn btn-primary">Send</button>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .chat-box:hover {
    background: #f1f5f9;
  }

  .message-container{
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 10px;
    border-radius: 5px;
    background-color: #f1f5f9;
    padding: 15px;
    position: relative;
  }

  .message-container-send{
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 10px;
    border-radius: 5px;
    background-color: #3b82f6;
    color: #ffffff;
    padding: 15px;
    position: relative;
  }

  .message-time{
    position: absolute;
    left: 0;
    bottom: -15px;
    color: rgba(255,255,255,0.5);
    font-size: 10px;
  }

  .message-time-send{
    position: absolute;
    right:0;
    bottom: -15px;
    color: rgba(255,255,255,0.5);
    font-size: 10px;
  }

  .send-text-input:focus {
    box-shadow: unset !important;
    border-bottom: 1px solid #3b82f6 !important;
  }
</style>
