import Vue from 'vue'
import App from './App.vue'
// 引入element组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 优先查找文件，如果文件找不到则找目录
// 找到目录，优先加载目录中的index.js
import router from './router'

import './styles/index.less'

// 引进nprogress样式
import 'nprogress/nprogress.css'

// 从这里引入axios，以设置全局axios
import axios from 'axios'
// 配置axios的基本路由
// 也就是说配置了这个东西，你就不用每次都输入长长的http://xxx
// 路径中的/，多退少补
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 把设置好的axios加入Vue的原型中
// 为了防止与Vue.prototype中的成员相冲突，所以以$开头命名
Vue.prototype.$http = axios

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
