//  引入vuex必备条件
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//  创建容器对象
const store = new Vuex.Store({
//  state中存储容器中的数据，类似于组件中的data
  state: {
    user: JSON.parse(window.localStorage.getItem('user_info'))
  },
  //  mutations类似于组件中的methods
  //  原则：修改state永远通过mutations函数修改，不要在组件中去$this.$store.state.xxx=xxx
  //  函数自己定义，函数默认接收一个参数state,也就是容器中的state
  //  我们可以在mutation函数中去state.xxx=xxx
  mutations: {
    changeUser(state, data) {
    // 修改容器中的用户信息。
    // 对象拷贝，将data中的数据成员拷贝到state.user中
      Object.assign(state.user, data)
      //  将修改之后的用户信息保存到本地存储
      window.localStorage.setItem('user_info', JSON.stringify(state.user))
    }
  }
})
//  导出容器对象
export default store
