<template>
  <div>
    <div class="box-wrap" @click="handleShowMediaBox">
      <p>点击上传图片</p>
      <i class="el-icon-upload" style="margin-top:20px
        font-size:90px;color:#eee">
        <img src="http://toutiao.meiduo.site/FvGUrO7Ru_T2ToQwn_OznfwKnjoL" width="120" />
      </i>
    </div>
    <!-- 对话框 -->
    <el-dialog title="素材" :visible.sync="dialogVisible" width="30%">
      <!-- element组件中tab标签 -->
      <el-tabs value="second">
        <el-tab-pane label="素材库" name="first">素材库</el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <!-- element组件库上传组件 -->
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            name="image"
            :headers="{ Authorization: `Bearer ${$store.state.user.token}` }"
            v-bind:on-success="handleUplaodSuccess"
          >
          <!-- 上传成功，要预览的图片 -->
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UploadImage',
  data() {
    return {
      dialogVisible: false,
      imageUrl: null
    }
  },
  methods: {
    handleShowMediaBox() {
      // 1.弹出弹框
      this.dialogVisible = true
      // 2.在弹框中展示图片素材
      // 3.用户可以点击切换图片的选中状态
      // 4.用户点击确定，我们拿到所选的图片凝结，将数据给谁？
    },
    handleUplaodSuccess() {
      console.log('上传成功')
    }
  }
}
</script>

<style lang='less' scoped>
.box-wrap {
  width: 200px;
  height: 200px;
  border: 1px solid #eee;
  border-radius: 5px;
  display: flex;
  align-items: center;
  flex-direction: column;
}
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
