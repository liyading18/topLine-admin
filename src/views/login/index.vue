<template>
  <div class="login-wrap">
    <div class="login-form-wrap">
      <div class="login-head">
        <img src="./logo_index.png" alt="黑马头条">
      </div>
      <div class="login-form">
        <el-form ref="form" :model="form">
          <el-form-item>
            <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item>
            <!-- 支持栅格布局 -->
            <el-col :span="10">
              <el-input v-model="form.code" placeholder="验证码"></el-input>
            </el-col>
            <el-col :span="10" :offset="2">
              <el-button>获取验证码</el-button>
            </el-col>
          </el-form-item>
          <el-form-item>
            <!-- 给组件加class,他会作用到根元素上 -->
            <el-button class="btn-login" type="primary" @click="onSubmit">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppLogin',
  data() {
    return {
      form: {
        mobile: '',
        code: ''
      }
    }
  },

  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>
<style lang='less' scoped>
.login-wrap {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: url("../../assets/login_bg.jpg");
  background-size: cover;
  .login-head {
    display: flex;
    justify-content: center;
    margin-bottom: 14px;
  }
  .login-form-wrap {
    border-radius: 10px;
    background-color: #ffffff;
    padding: 50px;
    .btn-login {
      width: 100%;
    }
  }
}
</style>
