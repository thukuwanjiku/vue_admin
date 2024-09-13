import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import {startIdleTracking} from "@/services/idleAppLockTimer";

//import element plus ui kit
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//import additional css
import "@/assets/css/app.css";

createApp(App)
        .use(store)
        .use(router)
        .use(ElementPlus)
        .mount('#app')

//start idle timer
startIdleTracking();