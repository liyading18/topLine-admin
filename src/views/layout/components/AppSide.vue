<template>
  <!-- el-menu
 default-active 指定默认激活的菜单项
 @open、@close设置菜单栏的背景色
 text-coloe设置菜单栏文本颜色
 active-text-color 设置激活是否的高亮颜色
  router是否使用vue-router的模式，启用该模式会在激活导航时以index作为path进行路由跳转-->
  <!-- el-submenu
  index导航标识，可以用作路由导航，必须唯一-->
  <el-menu
    default-active="2"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <div class="logo">
      <img src="./logo_admin.png" alt>
    </div>
    <el-menu-item index="/">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-s-management"></i>
        <span>内容管理</span>
      </template>
      <el-menu-item index="/publish">
        <i class="el-icon-s-promotion"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
      <el-menu-item index="/article">
        <i class="el-icon-s-promotion"></i>
        <span slot="title">内容列表</span>
      </el-menu-item>
      <el-menu-item index="/comment">
        <i class="el-icon-s-promotion"></i>
        <span slot="title">评论列表</span>
      </el-menu-item>
      <el-menu-item index="/image">
        <i class="el-icon-s-promotion"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-star-on"></i>
        <span>粉丝管理</span>
      </template>
      <el-menu-item index="3-2">
        <i class="el-icon-s-help"></i>
        <span slot="title">图文数据</span>
      </el-menu-item>
      <el-menu-item index="3-3">
        <i class="el-icon-s-help"></i>
        <span slot="title">粉丝概况</span>
      </el-menu-item>
      <el-menu-item index="3-4">
        <i class="el-icon-s-help"></i>
        <span slot="title">粉丝画像</span>
      </el-menu-item>
      <el-menu-item index="3-5">
        <i class="el-icon-s-help"></i>
        <span slot="title">粉丝列表</span>
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="/account">
      <i class="el-icon-user-solid"></i>
      <span slot="title">账户设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'AppSide',
  data() {
    return {

    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang='less' scoped>
.el-menu {
  box-sizing: border-box;
  height: 100%;
  overflow: auto;
  .logo {
    display: flex;
    justify-content: center;
    background: #2d2e31;
    padding: 10px;
    img {
      width: 100%;
    }
  }
}
</style>
