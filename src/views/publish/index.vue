<template>
  <el-card class="publish-card">
    <div slot="header" class="header">
      <span>发布文章</span>
      <div>
        <el-button
          type="success"
          plain
          @click="handlePublish(false)"
          :loading="publishLoading"
        >{{ isEdit ? '更新' : '发布' }}</el-button>
        <el-button type="primary" @click="handlePublish(true)" plain :loading="publishLoading">存入草稿</el-button>
      </div>
    </div>
    <el-form v-loading="$route.name==='publish-edit' && editLoading">
      <!-- 文章标题不能少于5个字符 -->
      <el-form-item>
        <el-input type="text" v-model="articleForm.title" placeholder="标题"></el-input>
      </el-form-item>
      <el-form-item>
        <!-- git中的富文本编辑器 -->
        <quill-editor v-model="articleForm.content" ref="myQuillEditor" :options="editorOption"></quill-editor>
      </el-form-item>
      <el-form-item label="封面">
        <el-radio-group v-model="articleForm.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
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
// import { Promise } from 'q'
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
      editorOption: {},
      // 文章加载状态
      editLoading: false,
      // 按钮状态
      publishLoading: false,
      // 表单是否被编辑过的状态
      fromDirty: false
    }
  },
  // watch: {
  //   articleForm: {
  //     handler() {
  //       console.log('123')
  //       this.fromDirty = true
  //     },
  //     // 对象数组类型需要配置深度监视，如果是普通数据不需要
  //     deep: true
  //     // 如果希望初始的时候就调用一次，则可以配置值为true
  //     // immediate: true
  //   }
  // },
  watch: {
    $route(to, from) {
      // 如果你是从更新页面来
      if (from.name === 'publish-edit') {
        this.articleForm = {
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
        }
      }
    }
  },
  // 计算属性
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    },
    isEdit() {
      return this.$route.name === 'publish-edit'
    },
    // 计算属性表示文章Id
    articleId() {
      return this.$route.params.id
    }
  },
  created() {
    // console.log(this.$route)
    // 自己犯错,这里是$route,而不是$router
    // 如果是编辑文章,首先加载文章内容
    // if (this.$route.name === 'publish-edit') {
    //   this.loadArticle()
    // }
    this.isEdit && this.loadArticle()
    // 如果是发布界面，则直接开启监视
    if (this.$route.name === 'publish') {
      // 开启监视
      this.watchForm()
    }
  },
  mounted() {
    console.log('this is current quill instance object', this.editor)
  },
  methods: {
    loadArticle() {
      // 加载文章详情时候,编辑状态
      this.editLoading = true
      this.$http({
        method: 'GET',
        url: `/articles/${this.articleId}`
      })
        .then(data => {
          // console.log(data)
          // 将获取的内容直接赋值给文章对象
          this.articleForm = data
          // 加载成功,显示表单,状态改变
          this.editLoading = false
          // 如果你需要在数据驱动改变影响视图个性之后做一些DOM操作，可以把代码写在this.$nextTick()
          this.$nextTick(() => {
            this.watchForm()
          })
        })
        .catch(err => {
          console.log(err)
          this.$message.error('加载文章详情失败')
        })
    },
    handlePublish(draft = false) {
      // 禁用按钮的点击状态
      this.publishLoading = true
      // 判断是编辑操作还是添加操作
      if (this.isEdit) {
        // 执行编辑操作
        // Promise 语法
        this.submitEdit(draft).then(() => {
          this.publishLoading = false
        })
      } else {
        // Promise 语法
        // 执行添加操作
        this.submitAdd(draft).then(() => {
          this.publishLoading = false
        })
      }
    },
    // 封装添加操作,自动为它传一个draft是否为草稿状态
    submitAdd(draft) {
      // axios返回promise
      return this.$http({
        method: 'POST',
        url: '/articles',
        // post请求发送添加的数据放在data中
        data: this.articleForm,
        // 草稿状态参数
        params: {
          draft
        }
      })
        .then(data => {
          this.$message({
            type: 'success',
            message: '发布成功'
          })
        })
        .catch(err => {
          console.log(err)
          this.$message.error('发送失败')
        })
    },
    // 封装编辑操作,自动为他传一个draft是否为草稿状态
    submitEdit(draft) {
      // axios返回Promise
      return this.$http({
        method: 'PUT',
        url: `articles/${this.articleId}`,
        data: {
          title: this.articleForm.title,
          content: this.articleForm.content,
          cover: this.articleForm.cover,
          channel_id: this.articleForm.channel_id
        },
        // 查询字符串参数
        params: {
          draft
        }
      })
        .then(data => {
          this.$message({
            type: 'success',
            message: '更新成功'
          })
          this.$router.push({
            name: 'article-list'
          })
        })
        .catch(err => {
          console.log(err)
          this.$message.error('更新失败')
        })
    },
    // 监视方法  vue
    watchForm() {
      const unwatch = this.$watch(
        'articleForm',
        function() {
          console.log('watchForm')
          this.fromDirty = true
          // 之后取消观察
          unwatch()
        },
        {
          deep: true
        }
      )
    }
  },
  // 当要从当前导航到另一个路由的时候被触发
  // 我们可以控制如有离开的行为
  // 例如当前页面如果有未保存的数据，提示用户
  // to要去哪里
  // from来自哪里
  // next就是允许通过的方法
  beforeRouteLeave(to, from, next) {
    // 如果表单没有被用户动过，则让导航直接通过
    if (!this.fromDirty) {
      return next()
    }
    const answer = window.confirm('当前有未保存的数据，确定要离开吗？')
    if (answer) {
      // 正常往后进行导航
      next()
    } else {
      // 取消导航
      next(false)
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
