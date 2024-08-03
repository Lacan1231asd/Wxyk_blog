import './assets/base.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//引入cookies
import VueCookies from 'vue-cookies'
//引入element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//图标 图标在附件中
import '@/assets/icon/iconfont.css'

const app = createApp(App)

app.use(ElementPlus);
app.config.globalProperties.VueCookies = VueCookies;

app.use(router)

app.config.globalProperties.globalInfo = {
    bodyWidth: 1300,
}

app.mount('#app')
