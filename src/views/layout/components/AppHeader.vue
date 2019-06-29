<template>
  <el-row class="app-header">
    <el-col :span="14">中国中科院自动化科技有限责任公司</el-col>
    <el-col :span="4" :offset="6">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <!-- <img src="http://toutiao.meiduo.site/Fkj6tQi3xJwVXi1u2swCElotfdCi" width="30"> -->
          <img :src="$store.state.user.photo" alt>
          {{ $store.state.user.name }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>账户设置</el-dropdown-item>
          <el-dropdown-item @click.native="LogOut()">退出</el-dropdown-item>
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
      // userInfo: {}
    }
  },
  created() {
    // this.userInfo = JSON.parse(window.localStorage.getItem('user_info'))
  },
  methods: {
    LogOut() {
      this.$confirm('确认退出码？', '推出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 清除本地存储中的 用户信息 user_info
        window.localStorage.removeItem('user_info')
        this.$message({
          type: 'success',
          message: '退出成功'
        })
        // 跳转到登录界面
        this.$router.push({
          name: 'login'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
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
