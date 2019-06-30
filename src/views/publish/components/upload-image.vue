<template>
  <div>
    <div class="box-wrap">
      <p>点击上传图片</p>
      <i class="el-icon-upload" style="margin-top:20px
        font-size:90px;color:#eee">
        <img src="http://toutiao.meiduo.site/FvGUrO7Ru_T2ToQwn_OznfwKnjoL" width="120" />
      </i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UploadImage',
  data() {
    return {}
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
</style>
