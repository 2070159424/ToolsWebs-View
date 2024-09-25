import {createApp} from 'vue'
import App from './App.vue'
import router from "./router/index.js";
import element from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App).use(router).use(element).mount('#app')
