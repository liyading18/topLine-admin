<template>
  <div>
    <!-- 为Echarts准备一个具备大小（宽高的dom）       -->
    <div id="main" style="width: 600px;height:400px;"></div>
    <br />
    <EChartsBar></EChartsBar>
  </div>
</template>

<script>
// 1. npm i echarts
// 2. 在使用的组件中加载echarts
// 3. 在使用的组件中加载echarts准备一个具备宽高的容器
// 4. 基于DOM容器初始化echarts
import echarts from 'echarts'
import EChartsBar from './components/echarts-bar'
export default {
  name: 'FansOverview',
  data() {
    return {}
  },
  components: {
    EChartsBar
  },
  mounted() {
    var myChart = echarts.init(document.getElementById('main'))
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: '粉丝分析数据'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    }
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
  }
}
</script>

<style lang='less' scoped>
</style>
