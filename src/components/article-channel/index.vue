<template>
  <!-- clearable是css样式中有一个"x"号 -->
  <!-- el-select组件,value属性用来绑定同步的数据 -->
  <!-- 这里的value绑定的时Props中的value值 -->
  <!-- change事件是人家组件的事件,当选中项发生改变被触发,回调参数 就是选项的value -->
  <el-select clearable :value="value" @change="handleChange">
    <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'ArticleChannel',
  //   子组件设置Props来接收值
  props: {
    value: {
      typr: [String, Number],
      required: true
    }
  },
  data() {
    return {
      channels: []
    }
  },
  created() {
    // 加载频道列表
    this.loadChannels()
  },
  methods: {
    handleChange(val) {
      //   console.log(val)
      // 子组件传值给父组件的方法
      this.$emit('input', val)
    },
    loadChannels() {
      this.$http({
        method: 'GET',
        url: '/channels'
        // 不需要传参数，默认值带参数
      }).then(data => {
        // console.log(data)
        // 将channels列表赋值给自定义的channels
        this.channels = data.channels
      }).catch(err => {
        console.log(err)
        this.$message.error('加载频道列表失败')
      })
    }
  }
}
</script>

<style lang='less' scoped>
</style>
