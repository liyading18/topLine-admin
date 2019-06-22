import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      // @表示src目录，无论你当前文件在哪里，@都是src
      component: () => import('@/views/home')
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    }
  ]
})
