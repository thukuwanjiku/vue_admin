<script setup>

import {computed, onMounted, ref} from "vue";
import api from "@/services/api";
import {apiRoutes} from "@/services/apiRoutes";
import {useStore} from "vuex";
import echoInstance from '@/utils/echo';
import {ElMessage} from "element-plus";
import {
  trimParagraph,
  formatChatTimestamp
} from "@/services/Helpers";

const store = useStore();
const form = ref({
  message: "",
  conversation_id: "",
  image: "",
  imagePreview: ""
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
  echoInstance.private('chat').listen('MessageSent', (e) => {
      console.log(e)
      fetchNewMessages(e.conversationId);
      fetchCustomerConversations()
		})
})

const handleImageUpload = (event) => {
  const file = event.target.files[0];

  if (!file) {
    form.value.image = null;
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    ElMessage.error('Image file size exceeds 2MB limit. Please upload a smaller image.');
    event.target.value = null;
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    form.value.imagePreview = e.target.result;
  };
  reader.readAsDataURL(file);

  form.value.image = file;
};

const removeImage = () => {
  form.value.image = null;
  form.value.imagePreview = null;
  document.getElementById('image-input').value = '';
};


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

const sendMessage = async () => {
  try {
    loadSendingMessage.value = true;
    const conversationId = store.state.chat.selectedConversation.conversation_id;

    // Prepare the payload
    const payload = new FormData();
    payload.append('message', form.value.message);
    payload.append('conversation_id', conversationId);

    if (form.value.image) {
      payload.append('image', form.value.image);
    }

    // Send the message
    const response = await api.post(apiRoutes.SEND_MESSAGE_TO_CUSTOMER, payload);
    $.growl.notice({ message: response.data });

    // Reset message input
    form.value.message = "";
    removeImage();

    // Fetch new messages after sending
    await fetchNewMessages(conversationId);
  } catch (error) {
    console.error("Error sending message:", error);
  } finally {
    loadSendingMessage.value = false;
  }
};

const fetchNewMessages = async (conversationId) => {
  try {
    const response = await api.post(apiRoutes.GET_CONVERSATION_MESSAGES, { conversation_id: conversationId });
    store.commit("chat/STORE_CONVERSATION_MESSAGES", response.data.data);
  } catch (error) {
    console.error("Error fetching new messages:", error);
  }
};
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
              <div v-if="conversations.length > 0">
                <a href="#" @click="openChat(conversation)" :class="['d-flex p-3 chat-box', {'border-bottom': conversations.length > 1}]" v-for="(conversation, index) in conversations" :key="`conversation-${conversation.id}`">
                  <div class="me-3">
                    <img :src="conversation.conversation.data.customer_profile_photo_url" class="rounded-circle" style="width: 60px;" :alt="conversation.conversation.data.customer_name" />
                  </div>
                  <div>
                    <p class="fw-bold text-dark mb-0">{{ conversation.conversation.data.customer_name }} - {{ conversation.conversation.data.module }}</p>
                    <p class="mb-0 text-dark text-md mb-2">{{ conversation.conversation.last_message ? trimParagraph(conversation.conversation.last_message.body) : "Start Message" }}</p>
                    <small class="text-muted">{{ conversation.conversation.last_message ? formatChatTimestamp(conversation.conversation.last_message.updated_at) : "" }}</small>
                  </div>
                </a>
              </div>
              <div v-else>
                <div class="d-flex flex-col justify-content-center align-items-center py-4">
                  <p class="fw-bold text-center mb-3 text-lg">No tickets opened.</p>
                  <img src="/img/no_data.svg" alt="Chat Illustration" class="mb-4" width="200px"/>
                  <p class="fw-medium text-center">There are no chat conversations yet. No tickets opened yet.</p>
                </div>
              </div>
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
                  <img :src="selectedConversation.conversation.data.customer_profile_photo_url" class="rounded-circle" style="width: 60px;" :alt="selectedConversation.conversation.data.customer_name" />
                </div>
                <div>
                  <p class="fw-bold text-dark mb-0">{{ selectedConversation.conversation.data.customer_name }} - {{ selectedConversation.conversation.data.module }}</p>
                  <p class="mb-0 text-dark">{{ selectedConversation.conversation.data.customer_email }}</p>
                </div>
              </div>

              <hr class="my-0"/>

              <div class="pt-4">
                <div v-if="messages.length > 0">
                  <div class="px-3" v-for="message in messages" :key="`chat-${selectedConversation.id}-message-${message.id}`">
                    <div class="d-flex justify-content-start mb-3" v-if="!message.is_sender">
                      <div class="message-container">
                        <div v-if="message.type === 'image'">
                           <img :src="message.body" alt="Image" class="chat-image"/>
                        </div>
                        <div v-else>
                         {{ message.body }}
                      </div>
                        <span class="message-time"> {{ message.sender.name || message.sender.formatted_name }} - {{ formatChatTimestamp(message.created_at) }}</span>
                      </div>
                    </div>

                    <div class="d-flex justify-content-end mb-4" v-else-if="message.is_sender">
                      <div class="message-container-send">
                        <div v-if="message.type === 'image'">
                           <img :src="message.body" alt="Image" class="chat-image"/>
                        </div>
                        <div v-else>
                         {{ message.body }}
                      </div>
                        <span class="message-time-send"> {{ message.sender.name || message.sender.formatted_name }} - {{ formatChatTimestamp(message.created_at) }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-else>
                  <div class="d-flex flex-col justify-content-center align-items-center py-4">
                    <img src="/img/no_data.svg" alt="Chat Illustration" class="mb-4" width="250px"/>
                    <p class="fw-medium">No messages present between you and <b>{{ selectedConversation.conversation.data.customer_name }}</b>.</p>
                  </div>
                </div>
              </div>

              <hr class="my-0"/>

              <div class="p-3">
                <form @submit.prevent="sendMessage">
                  <div class="input-group">
                    <!-- File upload button inside input group -->
                    <input type="file" id="image-input" @change="handleImageUpload" accept=".jpg,.jpeg,.png,.gif" class="d-none" ref="imageInput" />
                    <span class="input-group-text">
                    <i class="bi bi-paperclip" @click="$refs.imageInput.click()"></i>
                  </span>

                    <!-- Text input field -->
                    <input class="form-control me-3 border-0 border-bottom send-text-input rounded-0" v-model="form.message"  placeholder="Type a message" :disabled="loadSendingMessage" />

                    <!-- Send button -->
                    <button class="btn btn-primary" type="submit" :disabled="loadSendingMessage">
                      <i class="bi bi-send"></i>
                    </button>
                  </div>

                  <!-- Show selected image preview -->
                  <div v-if="form.imagePreview" class="mt-2 d-flex align-items-center">
                    <img :src="form.imagePreview" alt="Image Preview" class="img-preview" />
                    <button @click="removeImage" type="button" class="btn btn-sm btn-danger ms-2" style="border-radius: 50%;">
                      <i class="bi bi-x"></i>
                    </button>
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

  .message-container {
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 10px;
    border-radius: 5px;
    background-color: #f1f5f9;
    padding: 15px;
    position: relative;
    width: 45%;
  }

  .message-container-send {
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 10px;
    border-radius: 5px;
    background-color: #3b82f6;
    color: #ffffff;
    padding: 15px;
    position: relative;
    width: 45%;
  }

  .message-time {
    margin-top: 4px;
    display: block;
    color: #94a3b8;
    font-size: 12px;
    font-weight: 600;
  }

  .message-time-send {
    margin-top: 4px;
    display: block;
    color: #e2e8f0;
    font-size: 12px;
    font-weight: 600;
  }

  .send-text-input:focus {
    box-shadow: unset !important;
    border-bottom: 1px solid #3b82f6 !important;
  }
  .input-group-text {
    background-color: #f1f5f9;
    cursor: pointer;
  }

  .send-text-input {
    background-color: #f1f5f9;
    border-radius: 50px;
    padding: 10px;
  }

  .btn-primary {
    background-color: #00bfa5;
    border: none;
    border-radius: 50px;
  }

  .img-preview {
    max-width: 150px;
    max-height: 150px;
    border-radius: 10px;
    object-fit: cover;
  }
  .btn-danger {
    background-color: #ff0000;
    border: none;
  }

  .btn-danger i {
    font-size: 16px;
    color: #fff;
  }
  .chat-image {
  max-width: 200px; 
  max-height: 200px;
  border-radius: 10px;
  object-fit: cover; 
}
</style>
