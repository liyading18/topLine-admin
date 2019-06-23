<template>
  <el-container>
    <el-aside width="200px">
      <AppSide/>
    </el-aside>
    <el-container>
      <el-header>
        <AppHeader/>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppHeader from './components/AppHeader'
import AppSide from './components/AppSide'

export default {
  name: 'AppLayout',
  components: {
    AppHeader,
    AppSide
  },
  data() {
    return {

    }
  }
}
</script>

<style lang='less' scoped>
.el-container {
  height: 100%;
}

.el-aside {
  background-color: #d2dbe5;
}

.el-header {
  background-color: #b2bfd0;
}

.el-main {
  background-color: #e8edf2;
}
</style>
