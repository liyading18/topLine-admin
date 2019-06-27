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
// 引入处理大数字的包
import JSONbig from 'json-bigint'

// 配置axios的基本路由
// 也就是说配置了这个东西，你就不用每次都输入长长的http://xxx
// 路径中的/，多退少补
// axios.defaults.baseURL = 'http://toutiao.course.itcast.cn/mp/v1_0/'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

// 使用JSONbig处理返回数据中超出Javascript安全整数范围的数字
// JSONbig自己会分析数据中的那个数字超出范围
// 由于后端的数据id超出了JavaScript的安全范围，会导致整数无法精确表示
// 记住有这种方案即可
axios.defaults.transformResponse = [function(data) {
  // data 是未经处理的后端响应数据：JSON 格式字符串
  try {
    // data数据可能不是标准的JSON格式字符串，否则会导致JSONbig.parse(data)转换失败
    return JSONbig.parse(data)
  } catch (err) {
    // 无法转换的数据直接原样返回
    return data
  }
}]
// axios请求拦截器
// 所有使用axios发起的请求都要经过这里
// config是本次请求相关的配置
axios.interceptors.request.use(config => {
  const userInfo = JSON.parse(window.localStorage.getItem('user_info'))
  // console.log('有请求经过了')
  // console.log(config)
  // 如果登录了，才给那些需要token的接口统一添加token令牌
  // 登录相关接口不需要添加token令牌，想要也没有
  if (userInfo) {
    config.headers.Authorization = `Bearer ${userInfo.token}`
  }
  // return config 即使允许通过的方式
  return config
}, function(error) {
  return Promise.reject(error)
})

// axios响应拦截器
axios.interceptors.response.use(response => {
  // >=200 <=400会进入这里
  // console.log('response=>', response)
  // 自己定义响应的数据格式
  // 如果返回的数据格式是对象并且它有个成员叫data
  if (typeof response.data === 'object' && response.data.data) {
    return response.data.data
  } else {
    return response.data
  }
}, error => {
  // >=400会进入这里
  // 查看错误对象  dir只能单个使用，不能在一行
  // console.log('response error=>')
  // console.dir(error)
  const status = error.response.status
  if (status === 401) {
    // 过期的token或伪造的token,删除本地存储的用户信息数据
    window.localStorage.removeItem('user_info')
    // 跳转到登录页面
    router.push({
      name: 'login'
    })
  }
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
