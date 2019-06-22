import Vue from 'vue'
import App from './App.vue'

// 优先查找文件，如果文件找不到则找目录
// 找到目录，优先加载目录中的index.js
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
