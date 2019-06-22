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
              <el-button @click="handleSendCode">获取验证码</el-button>
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
import axios from 'axios'
// 引入极验gt  gt.js会向去全局window暴露一个initGeetest
import '@/vendor/gt'

export default {
  name: 'AppLogin',
  data() {
    return {
      form: {
        mobile: '15931441062',
        code: ''
      },
      // 通过initGeetest得到的极验验证码对象
      captchaObj: null
    }
  },

  methods: {
    onSubmit() {
      console.log('submit!')
    },

    handleSendCode() {
      const { mobile } = this.form

      if (this.captchaObj) {
        return this.captchaObj.verify()
      }

      axios({
        method: 'GET',
        url: `http://ttapi.research.itcast.cn/mp/v1_0/captchas/${mobile}`
      }).then(res => {
        // console.log(res.data)
        const data = res.data.data
        window.initGeetest({
          // 以下配置参数来自服务端 SDK
          gt: data.gt,
          challenge: data.challenge,
          offline: !data.success,
          new_captcha: data.new_captcha,
          // 隐藏按钮式
          product: 'bind'
        }, (captchaObj) => {
          this.captchaObj = captchaObj
          // 这里可以调用验证实例 captchaObj 的实例方法
          // console.log(captchaObj)
          captchaObj.onReady(function() {
            // 隐藏按钮式
            captchaObj.verify()
          }).onSuccess(function() {
            console.log('gt验证成功！')
          })
        })
      })
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
