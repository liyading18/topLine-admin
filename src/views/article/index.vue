<template>
  <div>
    <!-- 筛选区域 -->
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="文章状态">
          <el-radio-group v-model="form.resource">
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="开发者资讯" value="shanghai"></el-option>
            <el-option label="ios" value="beijing"></el-option>
            <el-option label="c++" value="beijing"></el-option>
            <el-option label="css" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-date-picker
            v-model="form.value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选区域 -->

    <!-- 列表 -->
    <el-card class="list-card">
      <div slot="header" class="clearfix">
        <span>共找到15条符合条件的内容</span>
      </div>
      <!-- table表格 -->
      <!-- data用来指点表格的数据 -->
      <!-- 表格不需要我们手动遍历 -->
      <!-- 只需要把数据给el-table的data属性就可以了 -->
      <!-- 然后配置el-table-column需要展示的数据字段即可 -->
      <el-table class="list-table" :data="articles" style="width: 100%">
        <!-- 表格列默认只能输出文本，如果需要自定义里面的内容，则需要自定义 -->
        <el-table-column prop="cover.images[0]" label="封面" width="60">
          <!-- slot-scope是插槽作用域，scope是自己起的名字，scope中有个成员叫row
          scope.row就是当前的遍历项-->
          <template slot-scope="scope">
            <img :src="scope.row.cover.images[0]" alt>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column prop="pubdate" label="发布日期" width="180"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
      </el-table>
      <!-- table表格 -->

      <!-- 数据分页 -->
      <!-- 默认每页10条数据 -->
      <!-- current-change分页组件事件 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCount"
        @current-change="handleCurrentPage"
      ></el-pagination>
      <!-- 数据分页 -->
    </el-card>
    <!-- 列表 -->
  </div>
</template>

<script>
// const userInfo = JSON.parse(window.localStorage.getItem('user_info'))
export default {
  name: 'ArticleList',
  data() {
    return {
      // 列表数据
      articles: [],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        value1: ''
      },
      totalCount: 0,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },

  created() {
    this.loadArticles()
  },
  methods: {
    loadArticles(page = 1) {
      this.$http({
        method: 'GET',
        url: '/articles',
        params: {
          // 请求数据的页码，不传默认为1
          page,
          // 请求数据的每页大小，不传默认为10
          per_page: 10
        }
      }).then(data => {
        // console.log(data)
        // 列表数据
        this.articles = data.results
        // 总记录数
        this.totalCount = data.total_count
      })
    },
    onSubmit() {
      console.log('submit了')
    },
    handleCurrentPage(page) {
      // 当页码改变的时候，请求页码对应的数据
      this.loadArticles(page)
    }
  }
}
</script>

<style lang='less' scoped>
.filter-card {
  margin-bottom: 20px;
}
.list-table {
  margin-bottom: 30px;
}
</style>
