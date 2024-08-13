import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

//import additional css
import "@/assets/css/app.css";

createApp(App)
        .use(store)
        .use(router)
        .mount('#app')
