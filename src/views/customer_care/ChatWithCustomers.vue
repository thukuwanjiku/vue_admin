<script setup>
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
            <a href="#" @click="openChat()" class="d-flex border-bottom p-3 chat-box" v-for="i in 4" :key="i">
              <div class="me-3">
                <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" class="rounded-circle" style="width: 60px;" alt="Avatar" />
              </div>
              <div>
                <p class="fw-bold text-dark mb-0">Daniel</p>
                <p class="mb-0 text-dark">Lorem ipsum....</p>
              </div>
            </a>
          </div>
      </div>

      <div class="col-md-9">
          <div class="card">
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
