<template>
  <el-row class="app-header">
    <el-col :span="14">中国中科院自动化科技有限责任公司</el-col>
    <el-col :span="4" :offset="6">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <!-- <img src="http://toutiao.meiduo.site/Fkj6tQi3xJwVXi1u2swCElotfdCi" width="30"> -->
          <img :src="userInfo.photo" alt>
          {{ userInfo.name }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>账户设置</el-dropdown-item>
          <el-dropdown-item @click="LogOut()">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    this.userInfo = JSON.parse(window.localStorage.getItem('user_info'))
  },
  methods: {
    LogOut() {
      // window.localStorage.removeItem('this.userInfo')
      window.localStorage.clear()
    }
  }
}
</script>

<style lang='less' scoped>
.app-header {
  height: 60px;
  display: flex;
  align-items: center;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #409eff;
  img {
    width: 20%;
    border-radius: 50%;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }
}
</style>
