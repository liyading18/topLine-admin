<template>
  <el-card>
    <div slot="header">
      <span>评论管理</span>
    </div>
    <el-table :data="articles">
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="允许评论">
        <template slot-scope="scope">
          <el-switch
            :disabled="scope.row.changeLoading"
            v-model="scope.row.comment_status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="handleChangeCommentStatus(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: 'ArticleComment',
  data() {
    return {
      articles: []
    }
  },
  created() {
    this.loadArticles()
  },
  methods: {
    loadArticles() {
      this.$http({
        method: 'GET',
        url: '/articles',
        // 传关于commnet评论的字段
        params: {
          response_type: 'comment'
        }
      }).then(data => {
        // console.log(data)
        // 循环遍历，对每项switch开关设置初始化禁用状态
        data.results.forEach(item => {
          item.changeLoading = false
        })
        this.articles = data.results
      })
    },
    // 修改文章状态
    handleChangeCommentStatus(item) {
      // switch开关变为禁用状态
      item.changeLoading = true
      this.$http({
        method: 'PUT',
        url: 'comments/status',
        params: {
          // 因为请求参数为字符串，所以转换为字符串
          article_id: item.id.toString()
        },
        data: {
          allow_comment: item.comment_status
        }
      }).then(() => {
        this.$message({
          type: 'success',
          message: `${item.comment_status ? '启用' : '关闭'}评论状态成功`
        })
        // 切换switch状态成功，切换switch状态
        item.changeLoading = false
      }).catch(err => {
        console.log(err)
        // 切换switch状态成功，切换switch状态
        item.changeLoading = false
        item.comment_status = !item.comment_status
        this.$message.console.error('修改评论状态失败')
      })
    }
  }
}
</script>

<style lang='less' scoped>
</style>
