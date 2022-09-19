import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import "@/assets/styles/index.scss"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from '@/utils/axios'
// Message 消息弹框样式
import 'element-plus/theme-chalk/src/message.scss'
import 'element-plus/theme-chalk/src/message-box.scss'
// import './styles/element/index.scss'
// md-editor-v3 markdow 编辑器
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css';
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.component('MdEditor', MdEditor)
// 全局挂载 axios
app.config.globalProperties.$http = axios
app.use(router).use(store).mount('#app')
