<template>
  <el-card class="image-card">
    <div slot="header">
      <span>素材管理</span>
    </div>
    <div class="action">
      <el-radio-group v-model="active">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="收藏"></el-radio-button>
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
            ></el-button>
            <el-button type="primary" icon="el-icon-delete-solid" circle plain class="button"></el-button>
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
