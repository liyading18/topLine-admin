<template>
  <el-card>
    <div slot="header">
      <span>账户设置</span>
    </div>
    <el-row>
      <el-col :span="8">
        <el-form>
          <el-form-item label="媒体名称">
            <el-input v-model="userInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="媒体简介">
            <el-input v-model="userInfo.intro"></el-input>
          </el-form-item>
          <el-form-item label="头条号ID">
            <!-- 首先这里必须又userInfo.id,如果有则转换成字符串 -->
            <el-input disabled :value="userInfo.id && userInfo.id.toString()"></el-input>
          </el-form-item>
          <el-form-item label="绑定手机">
            <el-input disabled :value="userInfo.mobile"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handelUpdate">保存更新</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4" :offset="2">
        <!-- el-upload上传组件，它会自动将用户选择的图片请求上传   -->
        <!-- 我们要做的就是配置一下 -->
        <!-- action请求地址 -->
        <!-- 由于它用的自己内部的请求，不是使用axios去发送请求 -->
        <!-- 它的请求也不会经过 axios 拦截器，所以需要手动配置 token -->
        <!-- 可惜的是它不支持自定义请求方法，前功尽弃 -->
        <!-- http-request 覆盖默认的上传行为，可以自定义上传的实现 -->
        <!-- headers配置的对象参数来自于本地存储,在模板中不要写太多,所以把一些参数放在data中 -->
        <!-- 因为接口要求上传的是字段名字叫photo,upload组件name属性正好支持 -->
        <!-- 因为自己要发请求,所以name不用了,headers不用了,action其实也不用,但是组件要求有action,所以upload简化为以下 -->
        <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/photo"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :http-request="handleUpload"
        >
          <!-- 这里如果有这个链接才会加载这个图片 -->
          <img v-if="userInfo.photo" :src="userInfo.photo" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'AccountSetting',
  data() {
    return {
      userInfo: {},
      //   将token令牌从本地存储中拿出来
      token: `Bearer ${JSON.parse(window.localStorage.getItem('user_info')).token}`
    }
  },
  created() {
    this.loadUserInfo()
  },
  methods: {
    loadUserInfo() {
      this.$http({
        method: 'GET',
        url: 'user/profile'
      }).then(data => {
        this.userInfo = data
      })
    },
    handelUpdate() {
      //   获取表单输入的用户信息
      const { name, intro, email } = this.userInfo
      this.$http({
        method: 'PATCH',
        url: 'user/profile',
        data: {
          name,
          intro,
          email
        }
      }).then(() => {
        this.$message({
          type: 'success',
          message: '更新用户信息成功'
        })
      }).catch(err => {
        console.log(err)
        this.$message.error('更新用户信息失败')
      })
    },
    handleAvatarSuccess() { },
    beforeAvatarUpload() { },
    handleUpload(uploadConfig) {
      //   console.log(a)
      // axios上传文件
      // 1. 构造一个FormData表单对象
      //    将文件对象添加到FormData中
      // 2. 将FormData配置到请求体data选项中
      const formData = new FormData()
      formData.append('photo', uploadConfig.file)
      this.$http({
        method: 'PATCH',
        url: '/user/photo',
        data: formData
        // 这样上传data将把图片转化为字符串,所以需要FormData
        // data: {
        //   photo:  文件对象
        // }
      }).then(data => {
        // 箭头线同步更新
        this.userInfo.photo = data.photo
        this.$message({
          type: 'success',
          message: '上传成功'
        })
      }).catch(err => {
        console.log(err)
        this.$message.error('上传失败')
      })
    }
  }
}
</script>

<style lang='less' scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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
