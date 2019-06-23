<template>
  <div class="login-wrap">
    <div class="login-form-wrap">
      <div class="login-head">
        <img src="./logo_index.png" alt="黑马头条">
      </div>
      <div class="login-form">
        <!-- 表单验证：
        rules  配置验证规则
        将需要验证的字段通过prop属性配置到el-form-item组件上
        ref 获取表单组件，可以手动调用表单组件的验证方法-->
        <el-form ref="ruleForm" :model="form" :rules="rules">
          <el-form-item prop="mobile">
            <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <!-- 支持栅格布局 -->
            <el-col :span="10">
              <el-input v-model="form.code" placeholder="验证码"></el-input>
            </el-col>
            <el-col :span="10" :offset="2">
              <el-button @click="handleSendCode">获取验证码</el-button>
            </el-col>
          </el-form-item>
          <el-form-item prop="agree">
            <el-checkbox class="ckbox" v-model="form.agree">备选项</el-checkbox>
            <span>
              我已阅读并同意
              <a href="#">用户协议</a>和
              <a href="#">隐私条款</a>
            </span>
          </el-form-item>
          <el-form-item>
            <!-- 给组件加class,他会作用到根元素上 -->
            <el-button
              class="btn-login"
              type="primary"
              @click="handleLogin"
              :loading="loginLoading"
            >登录</el-button>
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
      form: { // 表单数据
        mobile: '17815340384',
        code: '',
        agree: '' // 是否同意用户协议
      },
      loginLoading: false, // 登录按钮的loading状态
      rules: { // 表单验证规则
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { len: 11, message: '长度必须为11 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '长度在必须为6个字符', trigger: 'blur' }
        ],
        agree: [
          { required: true, message: '请同意用户协议', trigger: 'change' },
          { pattern: /true/, message: '请同意用户协议', trigger: 'change' }
        ]
      },
      // 通过initGeetest得到的极验验证码对象
      captchaObj: null
    }
  },

  methods: {
    handleLogin() {
      // console.log('submit!')
      // 表单组件有一个方法valiadata可以获取当前表单的验证状态
      this.$refs['ruleForm'].validate(valid => {
        if (!valid) {
          return
        }

        // 表单验证通过，提交登录
        this.submitLogin()
      })
    },

    submitLogin() {
      this.loginLoading = true
      axios({
        method: 'POST',
        url: 'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
        data: this.form
      }).then(res => {
        // 大于等于200小于400的状态码都会进入这里
        // console.log(res.data)
        // Element提供的message消息提示组件
        this.$message({
          message: '恭喜你，登陆成功！',
          type: 'success'
        })

        this.loginLoading = false

        // 建议路由跳转都使用name去跳转，路由传参方便
        this.$router.push({
          name: 'home'
        })
      }).catch(err => {
        // 大于等于400的状态码都会进入这里
        if (err.response.status === 400) {
          this.$message.error('登陆失败，手机号和验证码错误')
        }
        this.loginLoading = false
      })
    },

    handleSendCode() {
      // const { mobile } = this.form
      // 校验手机号是否有效
      this.$refs['ruleForm'].validateField('mobile', errorMessage => {
        if (errorMessage.trim().length > 0) {
          return
        }
        // 手机号码有效，初始化验证码插件
        this.showGeetest()
      })
    },

    showGeetest() {
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
            // console.log(captchaObj.getValidate())
            const {
              geetest_challenge: challenge,
              geetest_validate: validate,
              geetest_seccode: seccode } =
              captchaObj.getValidate()
            // 调用获取验证码（极验API2)接口,发送短信
            axios({
              method: 'GET',
              url: `http://ttapi.research.itcast.cn/mp/v1_0/sms/codes/${mobile}`,
              params: {
                challenge,
                validate,
                seccode
              }
            }).then(res => {
              console.log(res.data)
            })
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
    .login-form {
      box-sizing: border-box;
      .ckbox {
        margin-right: 12px;
      }
      .btn-login {
        margin-top: 20px;
        width: 100%;
      }
    }
  }
}
</style>
