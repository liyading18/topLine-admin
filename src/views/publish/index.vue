<template>
  <el-card class="publish-card">
    <div slot="header" class="header">
      <span>发布文章</span>
      <div>
        <el-button type="success" plain @click="handlePublish(false)">发布</el-button>
        <el-button type="primary" @click="handlePublish(true)" plain>存入草稿</el-button>
      </div>
    </div>
    <el-form>
      <!-- 文章标题不能少于5个字符 -->
      <el-form-item>
        <el-input type="text" v-model="articleForm.title" placeholder="标题"></el-input>
      </el-form-item>
      <el-form-item>
        <!-- git中的富文本编辑器 -->
        <quill-editor v-model="articleForm.content" ref="myQuillEditor" :options="editorOption"></quill-editor>
      </el-form-item>
      <el-form-item label="封面"></el-form-item>
      <el-form-item label="频道">
        <!-- 给频道组件一个出口 -->
        <!-- 利用组件通信 -->
        <!-- 父传值: Props Down
        子传父: Events Up-->
        <!-- <article-channel
          :value="articleForm.channel_id"
          @input="articleForm.channel_id=$event"
        ></article-channel>-->
        <article-channel v-model="articleForm.channel_id"></article-channel>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
// 引入频道组件
import ArticleChannel from '@/components/article-channel'
// 引入富文本编辑器css样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 引入富文本编辑器
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'AppPublish',
  // 配置频道组件选项
  components: {
    ArticleChannel,
    quillEditor
  },
  data() {
    return {
      articleForm: {
        // 标题
        title: '',
        // 内容
        content: '',
        // 封面
        cover: {
          // 封面类型
          type: 0,
          // 图片链接
          images: []
        },
        // 频道,自己设置它默认是空字符串
        channel_id: ''
      },
      // 富文本编辑器相关参数选项
      editorOption: {}
    }
  },
  // 计算属性
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  mounted() {
    console.log('this is current quill instance object', this.editor)
  },
  methods: {
    handlePublish(draft = false) {
      this.$http({
        method: 'POST',
        url: '/articles',
        // post请求发送添加的数据放在data中
        data: this.articleForm,
        // 草稿状态参数
        params: {
          draft
        }
      }).then(data => {
        this.$message({
          type: 'success',
          message: '发布成功'
        })
      }).catch(err => {
        console.log(err)
        this.$message.error('发送失败')
      })
    }
  }
}
</script>

<style lang='less' scoped>
.publish-card {
  min-height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
