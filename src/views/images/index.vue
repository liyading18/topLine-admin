<template>
  <el-card class="image-card">
    <div slot="header">
      <span>素材管理</span>
    </div>
    <div class="action">
      <el-radio-group v-model="active">
        <el-radio-button
          label="全部"
          @click.native="loadImages(false)"
        ></el-radio-button>
        <el-radio-button
          label="收藏"
          @click.native="loadImages(true)"
        ></el-radio-button>
      </el-radio-group>
      <el-upload
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="{ Authorization: `Bearer ${$store.state.user.token}` }"
        name="image"
        :show-file-list="false"
        :on-success="handleUplaodSuccess"
      >
        <el-button type="primary" size="small">点击上传</el-button>
      </el-upload>
    </div>
    <el-row :gutter="20">
      <el-col :span="4" v-for="item in images" :key="item.id">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="item.url" class="image" style="max-width: 100%">
          <div style="padding: 10px; display:flex; justify-content:center">
            <el-button
              type="primary"
              :icon="item.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
              circle
              plain
              class="button"
              @click="handleCollect(item)"
            ></el-button>
            <el-button
              type="primary"
              icon="el-icon-delete-solid"
              circle
              plain
              class="button"
              @click="handleDelete(item)"
            ></el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'ImageList',
  data() {
    return {
      active: '全部',
      images: []
    }
  },
  created() {
    this.loadImages()
  },
  methods: {
    loadImages(collect = false) {
      this.$http({
        method: 'GET',
        url: 'user/images',
        params: {
          // true为收藏图片，false:全部图片
          collect
        }
      }).then(data => {
        this.images = data.results
      })
    },
    // 收藏取消状态
    handleCollect(item) {
      const collect = !item.is_collected
      this.$http({
        method: 'PUT',
        url: `user/images/${item.id}`,
        data: {
          collect: !item.is_collected
        }
      }).then(data => {
        //   收藏成功的状态
        item.is_collected = collect
        this.$message({
          type: 'success',
          message: `${collect ? '' : '取消'}收藏成功`
        })
      }).catch(err => {
        console.log(err)
        this.$message.console.error(`${collect ? '' : '取消'}收藏失败`)
      })
    },
    // 删除图片
    handleDelete(item) {
      this.$http({
        method: 'DELETE',
        url: `user/images/${item.id}`
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        // 删除之后，刷新数据列表
        this.loadImages()
      }).catch(err => {
        console.log(err)
        this.$message.error('删除失败')
      })
    },
    handleUplaodSuccess() {
      this.loadImages(false)
    }
  }
}
</script>

<style lang='less' scoped>
.action {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}
</style>
