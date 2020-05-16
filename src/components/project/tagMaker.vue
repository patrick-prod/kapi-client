<template>
  <div>
    <el-tag
      :key="tag.id"
      v-for="tag in tags"
      closable
      :disable-transitions="false"
      @close="handleClose(tag.id)"
    >{{tag.tag_name}}</el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    ></el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputVisible: false,
      inputValue: '',
      tags: []
    }
  },
  async mounted() {
    await this.getTags(this.projectId)
  },
  methods: {
    async getTags(pid) {
      let { data: res } = await this.$http.get(`/projects/${pid}/tags`)
      if (!res || res.status != '1') {
        return this.$message.error(
          res.msg && res.msg !== '' ? res.msg : '获取标签失败'
        )
      }
      this.tags = res.data
    },
    async addTag(pid, tagName) {
      let { data: res } = await this.$http.post(`/projects/${pid}/tags`, {
        tag_name: tagName
      })
      if (!res || res.status != '1') {
        return this.$message.error(
          res.msg && res.msg !== '' ? res.msg : '添加标签失败'
        )
      }
      this.$message.success('添加标签成功')
      await this.getTags(pid)
    },
    async delTag(pid, tagId) {
      let { data: res } = await this.$http.delete(
        `/projects/${pid}/tags/${tagId}`
      )
      if (!res || res.status != '1') {
        return this.$message.error(
          res.msg && res.msg !== '' ? res.msg : '删除标签失败'
        )
      }
      this.$message.success('删除标签成功')
      await this.getTags(pid)
    },
    // 删除标签
    async handleClose(tagId) {
      await this.delTag(this.projectId, tagId)
    },
    // 显示并且聚焦
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 添加标签
    async handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        await this.addTag(this.projectId, inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  },
  computed: {
    projectId() {
      return this.$route.params.pid
    }
  }
}
</script>

<style lang="scss">
.el-tag + .el-tag {
  margin-left: 10px !important;
}
.button-new-tag {
  margin-left: 10px !important;
  height: 32px !important;
  line-height: 30px !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
.input-new-tag {
  width: 90px !important;
  margin-left: 10px !important;
  vertical-align: bottom !important;
}
</style>