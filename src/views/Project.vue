<template>
  <el-container>
    <el-header>
      <iHeader
        :isProject="true"
        :projectName="projectInfo ? projectInfo.project_name : '未命名项目'"
      ></iHeader>
    </el-header>
    <el-header style="box-shadow:2px 2px 2px rgba(0,0,0,.1); z-index:3">
      <el-menu default-active="1" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">
          接口管理
        </el-menu-item>
        <!-- <el-menu-item index="2">动态</el-menu-item> -->
        <el-menu-item index="3">
          项目设置
        </el-menu-item>
      </el-menu>
    </el-header>
    <router-view></router-view>
  </el-container>
</template>

<script>
import iHeader from '../components/group/header.vue'

export default {
  components: {
    iHeader
  },
  data() {
    return {
      projectInfo: {}
    }
  },
  async mounted() {
    await this.getProjectDetail()
  },
  methods: {
    // 项目详细信息
    async getProjectDetail() {
      let { data: res } = await this.$http.get(
        `projects/project/${this.projectId}`
      )
      if (!res || res.status != '1') {
        return this.$message.error(
          res.msg && res.msg !== '' ? res.msg : '编辑项目失败'
        )
      }
      this.projectInfo = res.data ? res.data.project : {}
    },
    handleSelect(idx) {
      if (idx == 1) {
        console.log(idx)
        this.$router.push({ path: `/project/${this.projectId}/interface` })
      }
      if (idx == 3) {
        console.log(idx)
        this.$router.push({ path: `/project/${this.projectId}` })
      }
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
.el-container {
  height: 100%;
  .el-header {
    padding: o !important;
    //
  }
}
</style>
