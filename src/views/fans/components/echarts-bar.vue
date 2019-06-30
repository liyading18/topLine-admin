<template>
  <!-- 准备一个画布容器 -->
  <!-- 不要使用id操作DOM，会有冲突的问题 -->
  <!-- vue中获取Dom的方式 -->
  <!-- 1. 给节点声明ref -->
  <!-- 2. 通过this.$refs.ref名字来访问 -->
  <!-- 一个组件中不要有同名ref -->
  <div ref="main" style="width: 600px;height: 400px"></div>
</template>

<script>
// 引入echarts
import echarts from 'echarts'
import { setTimeout } from 'timers'
export default {
  data() {
    return {
      myChart: null
    }
  },
  mounted() {
    // 初始化图表库
    this.initEcharts()
    // 发送请求，更新数据
    this.loadData()
  },
  methods: {
    initEcharts() {
      this.myChart = echarts.init(this.$refs.main)
      // 显示标题，图例和空的坐标轴
      this.myChart.setOption({
        title: {
          text: '南方粉丝数据'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: []
          }
        ]
      })
    },
    loadData() {
      setTimeout(async() => {
        try {
          const data = await this.$http({
            method: 'GET',
            url: 'http://localhost:3000/barData'
          })
          this.myChart.setOption({
            xAxis: {
              data: data.xAxis
            },
            series: [{
            // 根据名字对应到相应的系列
              name: '销量',
              data: data.series
            }]
          })
        } catch (err) {
          this.$message.error('加载粉丝数据失败')
        }
      }, 2000)
    }
  }
}
</script>

<style lang='less' scoped>
</style>
