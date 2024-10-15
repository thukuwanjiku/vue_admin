<script setup>

import {computed, onMounted, ref} from "vue";
import api from "@/services/api";
import {apiRoutes} from "@/services/apiRoutes";
import {useStore} from "vuex";
import {
  trimParagraph,
  formatChatTimestamp
} from "@/services/Helpers";

const store = useStore();
const form = ref({
  message: "",
  conversation_id: ""
})

const loadSendingMessage = ref(false)

let conversations = computed({
  get: ()=> store.state.chat.conversations,
  set: (data) => store.commit('chat/STORE_CUSTOMER_CONVERSATIONS', data)
});

let isLoading = computed({
  get: ()=> store.state.chat.isFetchingCustomerConversations,
  set: (value) => store.commit('chat/SET_IS_FETCHING_CUSTOMER_CONVERSATIONS', value)
});

let isLoadingMessages = computed({
  get: ()=> store.state.chat.isFetchingConversationMessages,
  set: (value) => store.commit('chat/SET_IS_FETCHING_CONVERSATION_MESSAGES', value)
});

let selectedConversation = computed({
  get: ()=> store.state.chat.selectedConversation,
  set: (data) => store.commit('chat/SET_SELECTED_CONVERSATION', data)
});

let messages = computed({
  get: ()=> store.state.chat.messages,
  set: (data) => store.commit('chat/STORE_CUSTOMER_CONVERSATIONS', data)
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

const openChat = (conversation) => {
  store.commit("chat/SET_IS_FETCHING_CONVERSATION_MESSAGES", true);
  api.post(apiRoutes.GET_CONVERSATION_MESSAGES, {
    conversation_id: conversation.conversation_id
  }).then(response => {
    store.commit("chat/SET_SELECTED_CONVERSATION", conversation);
    store.commit("chat/STORE_CONVERSATION_MESSAGES", response.data.data);
    store.commit("chat/SET_IS_FETCHING_CONVERSATION_MESSAGES", false);
  }).catch(error => {
    store.commit("chat/SET_IS_FETCHING_CONVERSATION_MESSAGES", false)
  });
}

const sendMessage = () => {
  loadSendingMessage.value = true
  form.value.conversation_id = store.state.chat.selectedConversation.conversation_id

  let payload = new FormData();
  payload.append('message', form.value.message);
  payload.append('conversation_id', form.value.conversation_id);
  api.post(apiRoutes.SEND_MESSAGE_TO_CUSTOMER, payload).then(response => {
    //show success response
    $.growl.notice({message: response.data});
    loadSendingMessage.value = false
  }).catch(error => {
    loadSendingMessage.value = false
  });
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
              <a href="#" @click="openChat(conversation)" :class="['d-flex p-3 chat-box', {'border-bottom': conversations.length > 1}]" v-for="(conversation, index) in conversations" :key="`conversation-${conversation.id}`">
                <div class="me-3">
                  <img :src="conversation.conversation.data.customer_photo" class="rounded-circle" style="width: 60px;" :alt="conversation.conversation.data.customer_name" />
                </div>
                <div>
                  <p class="fw-bold text-dark mb-0">{{ conversation.conversation.data.customer_name }}</p>
                  <p class="mb-0 text-dark text-md mb-2">{{ conversation.conversation.last_message ? trimParagraph(conversation.conversation.last_message.body) : "Start Message" }}</p>
                  <small class="text-muted">{{ conversation.conversation.last_message ? formatChatTimestamp(conversation.conversation.last_message.updated_at) : "" }}</small>
                </div>
              </a>
            </div>
          </div>
      </div>

      <div class="col-md-9">
          <div v-if="isLoadingMessages">
            <div class="d-flex flex-column justify-content-center align-items-center">
              <div class="spinner-border text-primary"></div>
              <p class="mt-2">Loading messages. Please wait...</p>
            </div>
          </div>

        <div v-else>
          <div class="card">
            <div v-if="selectedConversation">
              <div class="d-flex p-4">
                <div class="me-3">
                  <img :src="selectedConversation.conversation.data.customer_photo" class="rounded-circle" style="width: 60px;" :alt="selectedConversation.conversation.data.customer_name" />
                </div>
                <div>
                  <p class="fw-bold text-dark mb-0">{{ selectedConversation.conversation.data.customer_name }}</p>
                  <p class="mb-0 text-dark">{{ selectedConversation.conversation.data.customer_email }}</p>
                </div>
              </div>

              <hr class="my-0"/>

              <div>
                <div v-if="messages.length > 0">
                  <div class="py-4 px-3" v-for="message in messages" :key="`chat-${selectedConversation.id}-message-${message.id}`">
                    <div class="d-flex justify-content-start mb-4" v-if="!message.is_sender">
                      <div class="message-container">
                        {{ message.body }}
                        <span class="message-time">{{ formatChatTimestamp(message.created_at) }}</span>
                      </div>
                    </div>

                    <div class="d-flex justify-content-end mb-4" v-else-if="message.is_sender">
                      <div class="message-container-send">
                        {{ message.body }}
                        <span class="message-time-send">{{ formatChatTimestamp(message.created_at) }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-else>
                  <div class="d-flex flex-col justify-content-center align-items-center py-4">
                    <img src="/img/no_data.svg" alt="Chat Illustration" class="mb-4" width="250px"/>
                    <p class="fw-medium">No messages present between you and {{ selectedConversation.conversation.data.customer_name }}.</p>
                  </div>
                </div>
              </div>

              <hr class="my-0"/>

              <div class="p-3">
                <form @submit.prevent="sendMessage">
                  <div class="d-flex">
                    <input class="form-control me-3 border-0 border-bottom send-text-input rounded-0" v-model="form.message" placeholder="Start typing">
                    <button class="btn btn-primary" type="submit" :disabled="loadSendingMessage">Send</button>
                  </div>
                </form>
              </div>
            </div>

            <div v-else>
                <div class="d-flex flex-col justify-content-center align-items-center py-4">
                  <img src="/img/chat_illustration.svg" alt="Chat Illustration" class="mb-4" width="250px"/>
                  <p class="fw-medium">Click on a conversation to check messages.</p>
                </div>
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
    bottom: -25px;
    color: #94a3b8;
    font-size: 12px;
    font-weight: 600;
  }

  .message-time-send{
    position: absolute;
    right:0;
    bottom: -25px;
    color: #94a3b8;
    font-size: 12px;
    font-weight: 600;
  }

  .send-text-input:focus {
    box-shadow: unset !important;
    border-bottom: 1px solid #3b82f6 !important;
  }
</style>
