

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
import './assets/base.scss'

//全局方法
import Verify from './utils/Verify'
import Message from './utils/Message'
import Request from './utils/Request'

//全局组件
import Dialog from "@/components/Dialog.vue"



const app = createApp(App)

app.use(ElementPlus);
app.config.globalProperties.VueCookies = VueCookies;

app.use(router)

app.config.globalProperties.globalInfo = {
    bodyWidth: 1300,
}

app.config.globalProperties.Verify = Verify;
app.config.globalProperties.Message = Message;
app.config.globalProperties.Request = Request;

app.component("Dialog", Dialog)

app.mount('#app')
