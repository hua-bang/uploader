import { createApp } from 'vue'
import App from './App.vue'
import 'element3/lib/theme-chalk/index.css'
import Element3 from 'element3'
import router from './router'

createApp(App).use(Element3).use(router).mount('#app')
