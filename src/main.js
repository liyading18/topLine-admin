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
// axios请求拦截器
// 所有使用axios发起的请求都要经过这里
// return config 即使允许通过的方式
// config是本次请求相关的配置
axios.interceptors.request.use(config => {
  const userInfo = JSON.parse(window.localStorage.getItem('user_info'))
  // console.log('有请求经过了')
  // console.log(config)
  config.headers.Authorization = `Bearer ${userInfo.token}`
  return config
}, function(error) {
  return Promise.reject(error)
})

// axios响应拦截器
axios.interceptors.response.use(response => {
  // >=200 <=400会进入这里
  // console.log('response=>', response)
  // 自己定义响应的数据格式
  return response.data.data
}, error => {
  // >=400会进入这里
  // console.log('response error=>', response)
  return Promise.reject(error)
})

// 把设置好的axios加入Vue的原型中
// 为了防止与Vue.prototype中的成员相冲突，所以以$开头命名
Vue.prototype.$http = axios

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
