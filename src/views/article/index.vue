<template>
  <div>
    <!-- 筛选区域 -->
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <el-form ref="form" :model="filterParams" label-width="80px">
        <el-form-item label="文章状态">
          <el-radio-group v-model="filterParams.status">
            <el-radio label="">全部</el-radio>
            <!-- 这里之所以用index,是因为接口要求用0-草稿等表示，
            数组的索引正好满足,这里的indexz将同步到status中-->
            <el-radio
              v-for="(item,index) in stateTypes"
              :key="item.label"
              :label="index+''"
            >{{ item.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表">
          <!-- 这里接口列表要求传channel_id -->
          <!-- <el-select v-model="filterParams.channel_id" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select> -->
          <!-- 应用列表组件 -->
          <article-channel
            v-model="filterParams.channel_id"
          ></article-channel>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="begin_end_pubdate"
            @change="handleDateChange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
            :loading="articleLoading"
          >查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选区域 -->

    <!-- 列表 -->
    <el-card class="list-card">
      <div slot="header" class="clearfix">
        <span>共找到{{ totalCount }}条符合条件的内容</span>
      </div>
      <!-- table表格 -->
      <!-- data用来指点表格的数据 -->
      <!-- 表格不需要我们手动遍历 -->
      <!-- 只需要把数据给el-table的data属性就可以了 -->
      <!-- 然后配置el-table-column需要展示的数据字段即可 -->
      <el-table v-loading="articleLoading" class="list-table" :data="articles" style="width: 100%">
        <!-- 表格列默认只能输出文本，如果需要自定义里面的内容，则需要自定义 -->
        <el-table-column prop="cover.images[0]" label="封面" width="60">
          <!-- slot-scope是插槽作用域，scope是自己起的名字，scope中有个成员叫row
          scope.row就是当前的遍历项-->
          <template slot-scope="scope">
            <img width="40" :src="scope.row.cover.images[0]" alt>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column prop="pubdate" label="发布日期" width="180"></el-table-column>
        <el-table-column label="状态">
          <!-- 组件库搜索tag标签 -->
          <template slot-scope="scope">
            <!-- stateTypes[scope.row.status]表示当前行的状态的类型
            意思是说选择自定义stateTypes数组的某一个对象-->
            <el-tag
              :type="stateTypes[scope.row.status].type"
            >{{ stateTypes[scope.row.status].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="success" round>修改</el-button>
            <el-button type="danger" round @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- table表格 -->

      <!-- 数据分页 -->
      <!-- 默认每页10条数据 -->
      <!-- current-change分页组件事件 -->
      <!-- current-page表示当前页码随着改变而改变，也就是当前页码高亮效果 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCount"
        @current-change="handleCurrentPage"
        :current-page="page"
        :disabled="articleLoading"
      ></el-pagination>
      <!-- 数据分页 -->
    </el-card>
    <!-- 列表 -->
  </div>
</template>

<script>
// 引入频道组件
import ArticleChannel from '@/components/article-channel'
// const userInfo = JSON.parse(window.localStorage.getItem('user_info'))
export default {
  name: 'ArticleList',
  components: {
    ArticleChannel
  },
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
      articleLoading: false,
      page: 1,
      // 自定义状态数据字段
      stateTypes: [
        {
          type: 'info',
          label: '草稿'
        },
        {
          type: '',
          label: '待审核'
        },
        {
          type: 'success',
          label: '审核通过'
        },
        {
          type: 'warning',
          label: '审核失败'
        },
        {
          type: 'danger',
          label: '已删除'
        }
      ],
      // 频道列表
      // channels: [],
      // 文章查询条件参数，为了方便把参数写在这里
      filterParams: {
        // 文章状态
        status: '',
        // 频道id
        channel_id: '',
        // 开始时间
        begin_pubdate: '',
        // 截止时间
        end_pubdate: ''
      },
      // 这个字段没有什么用，只是日期选择器必须v-model绑定一个数据才出发
      // 所以设置这个字段存储同步的[开始时间，结束时间]
      begin_end_pubdate: []
    }
  },

  created() {
    // 加载文章列表
    this.loadArticles()
    // 初始化的时候加载频道列表
    // this.loadChannels()
  },
  methods: {
    loadArticles(page = 1) {
      this.articleLoading = true
      // 过滤出有效的查询条件数据字段
      // 空字符串，null,undefined都不会进入
      const filetrData = {}
      for (let key in this.filterParams) {
        if (this.filterParams[key]) {
          filetrData[key] = this.filterParams[key]
        }
      }

      this.$http({
        method: 'GET',
        url: '/articles',
        params: {
          // 请求数据的页码，不传默认为1
          page,
          // 请求数据的每页大小，不传默认为10
          per_page: 10,
          // 将查询出有效的数据字段拷贝到当前对象
          ...filetrData
        }
      }).then(data => {
        // 查看数据
        // console.log(data)
        // 列表数据
        this.articles = data.results
        // 总记录数
        this.totalCount = data.total_count
        this.articleLoading = false
      })
    },
    // loadChannels() {
    //   this.$http({
    //     method: 'GET',
    //     url: '/channels'
    //     // 不需要传参数，默认值带参数
    //   }).then(data => {
    //     // console.log(data)
    //     // 将channels列表赋值给自定义的channels
    //     this.channels = data.channels
    //   })
    // },
    onSubmit() {
      // console.log('submit了')
      // 让分页组件的页码回到第一页
      this.page = 1
      this.loadArticles()
    },
    handleCurrentPage(page) {
      // 当页码发生改变的时候，请求页码对应的页码
      this.page = page
      // 当页码改变的时候，请求页码对应的数据
      this.loadArticles(page)
    },
    // 删除文章列表事件
    handleDelete(article) {
      this.$confirm('确认要删除吗？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          method: 'DELETE',
          url: `articles/${article.id}`
        }).then(data => {
          // console.log(data)
          // data.total_count--
          // this.totalCount = data.total_count
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // 重新加载数据列表
          this.loadArticles(this.page)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 日期选择组件改变事件
    // 这里的参数value是什么什么无所谓，element组件库有说明
    handleDateChange(value) {
      // console.log(value)
      this.filterParams.begin_pubdate = value[0]
      this.filterParams.end_pubdate = value[1]
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
