<template>
  <div class="setting-container">
    <el-tabs tab-position="left" style="height: 100%;" type="border-card">
      <el-tab-pane label="项目配置">
        <el-row>
          <el-col :span="16" :offset="4">
            <div class="project-header">
              <div class="project-header__icon" v-html="generateProjectIcon(projectId)"></div>
              <div class="project-header__text">{{ projectInfo.project_name }}</div>
            </div>
            <el-form
              :model="projectInfo"
              :rules="projectInfoRule"
              ref="editProjectRef"
              label-width="150px"
              size="small"
            >
              <el-form-item label="项目ID:" prop="id">
                <el-tag type="info">PROJECT - {{ projectId }}</el-tag>
              </el-form-item>
              <el-form-item label="项目名称:" prop="”project_name“">
                <el-input v-model="projectInfo.project_name" placeholder="接口名称"></el-input>
              </el-form-item>
              <el-form-item label="项目所属分组:" prop="group_name">
                <el-select
                  style="width:100%;"
                  v-model="projectInfo.group_name"
                  placeholder="项目分组"
                  disabled
                ></el-select>
              </el-form-item>
              <el-form-item label="项目基本路径:" prop="basepath">
                <el-input v-model="projectInfo.basepath" placeholder="项目基本路径"></el-input>
              </el-form-item>
              <el-form-item label="MOCK服务测试地址:" prop="basepath">
                <el-input v-model="mockPath" placeholder="MOCK服务测试地址" disabled></el-input>
              </el-form-item>
              <el-form-item label="描述:" prop="project_desc">
                <el-input
                  type="textarea"
                  placeholder="项目描述"
                  v-model="projectInfo.project_desc"
                  :autosize="{ minRows: 6, maxRows: 6 }"
                ></el-input>
              </el-form-item>
              <el-form-item label="项目标签:">
                <iTagMaker></iTagMaker>
              </el-form-item>

              <el-form-item label="开启json5:" prop="is_json5">
                <el-switch v-model="projectInfo.is_json5" disabled></el-switch>
              </el-form-item>
              <el-form-item>
                <el-alert
                  title="功能正在开发中，暂时不支持json5。"
                  type="info"
                  show-icon
                  :closable="false"
                  style="height:30px !important;"
                ></el-alert>
              </el-form-item>
              <el-form-item label="项目权限:" prop="project_type">
                <el-radio v-model="projectInfo.project_type" label="private" type="success">
                  <span style="font-weight:700">
                    <i class="el-icon-lock"></i>私有
                  </span>
                </el-radio>
              </el-form-item>
              <el-form-item>
                <el-alert
                  title="功能正在开发中，暂时不支持json5。"
                  type="success"
                  show-icon
                  :closable="false"
                  style="height:30px !important;"
                ></el-alert>
              </el-form-item>
              <el-form-item style=" margin-top:30px">
                <el-button type="success" size="small" @click="updateProjectSetting">更改配置</el-button>
              </el-form-item>
              <!-- <el-row style="display:flex; justify-content:center; margin-top:30px">
                <el-button type="info" size="small">更改配置</el-button>
              </el-row>-->
            </el-form>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="环境配置">
        <el-row>
          <el-col :span="16" :offset="4">
            <div class="project-header">
              <div class="project-header__icon" v-html="generateProjectIcon(projectId)"></div>
              <div class="project-header__text">{{ projectInfo.project_name }}</div>
            </div>
            <el-form
              :model="projectInfo"
              :rules="projectInfoRule"
              ref="editProjectRef"
              label-width="150px"
              size="small"
            >
              <el-form-item label="项目ID:" prop="id">
                <el-tag type="info">PROJECT - {{ projectId }}</el-tag>
              </el-form-item>
              <el-form-item label="项目名称:" prop="project_name">
                <el-input v-model="projectInfo.project_name" placeholder="接口名称"></el-input>
              </el-form-item>
              <el-form-item label="项目所属分组:" prop="group_name">
                <el-input
                  style="width:100%;"
                  v-model="projectInfo.group_name"
                  placeholder="项目分组"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item label="项目基本路径:" prop="basepath">
                <el-input v-model="projectInfo.basepath" placeholder="项目基本路径"></el-input>
              </el-form-item>
              <el-form-item label="MOCK服务测试地址:" prop="basepath">
                <el-input v-model="mockPath" placeholder="MOCK服务测试地址" disabled></el-input>
              </el-form-item>
              <el-form-item label="描述:" prop="project_desc">
                <el-input
                  type="textarea"
                  placeholder="项目描述"
                  v-model="projectInfo.project_desc"
                  :autosize="{ minRows: 6, maxRows: 6 }"
                ></el-input>
              </el-form-item>
              <el-form-item label="开启json5:" prop="is_json5">
                <el-switch v-model="projectInfo.is_json5" disabled></el-switch>
              </el-form-item>
              <el-form-item>
                <el-alert
                  title="功能正在开发中，暂时不支持json5。"
                  type="info"
                  show-icon
                  :closable="false"
                  style="height:30px !important;"
                ></el-alert>
              </el-form-item>
              <el-form-item label="项目权限:" prop="project_type">
                <el-radio
                  v-model="projectInfo.project_type"
                  label="private"
                  type="success"
                  disabled
                >
                  <span style="font-weight:700">
                    <i class="el-icon-lock"></i>私有
                  </span>
                </el-radio>
              </el-form-item>
              <el-form-item>
                <el-alert
                  title="功能正在开发中，暂时不支持json5。"
                  type="success"
                  show-icon
                  :closable="false"
                  style="height:30px !important;"
                ></el-alert>
              </el-form-item>
              <el-form-item style=" margin-top:30px">
                <el-button type="success" size="small" @click="updateProjectSetting">更改配置</el-button>
              </el-form-item>
              <!-- <el-row style="display:flex; justify-content:center; margin-top:30px">
                <el-button type="info" size="small">更改配置</el-button>
              </el-row>-->
            </el-form>
          </el-col>
        </el-row>
        <!-- {{ projectInfo}} -->
        <!-- {{ projectTag }} -->
        {{ projectEnv }}
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import iTitle from '../public/title.vue'
import iTagMaker from '../project/tagMaker.vue'
import { genetarProjectIconBySeed } from '../../util/avatar'

export default {
  components: {
    iTitle,
    iTagMaker
  },
  data() {
    return {
      projectInfo: {},
      projectInfoRule: {
        project_name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        group_name: [
          { required: true, message: '请选择项目分类', trigger: 'blur' }
        ],
        is_json5: [
          { required: true, message: 'is_json5配置不能为空', trigger: 'blur' }
        ],
        project_type: [
          { required: true, message: '项目分类不能为空', trigger: 'blur' }
        ]
      },
      projectTag: [],
      projectEnv: [],
      isPrivate: true
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
      let gname = this.$store.getters.curGroup.gname
      this.projectInfo = res.data ? res.data.project : {}
      this.$set(this.projectInfo, 'group_name', gname)
      console.log(this.projectInfo)
      this.projectTag = res.data ? res.data.project_tag : []
      this.projectEnv = res.data ? res.data.project_env : []
    },
    generateProjectIcon(pid) {
      return `${genetarProjectIconBySeed('kapi-' + pid)}`
    },
    // 更新项目信息
    async updateProjectSetting() {
      let updateParams = {
        id: this.projectInfo.id,
        gid: this.projectInfo.gid,
        project_name: this.projectInfo.project_name,
        project_desc: this.projectInfo.project_desc,
        project_type: this.projectInfo.project_type,
        base_path: this.projectInfo.basepath
      }
      let { data: res } = await this.$http.put(`projects`, updateParams)
      if (!res || res.status != '1') {
        return this.$message.error(
          res.msg && res.msg !== '' ? res.msg : '编辑项目失败'
        )
      }
      await this.getProjectDetail()
      this.$message.success('编辑项目成功')
    }
  },
  computed: {
    projectId() {
      return this.$route.params.pid
    },
    mockPath() {
      return (
        'http://127.0.0.1:10001/mock' +
        this.projectInfo.basepath +
        '+$接口请求路径'
      )
    }
    // isPrivate() {
    //   return this.projectInfo.project_type == 'private'
    // }
  }
}
</script>

<style lang="scss">
.setting-container {
  height: 100%;
  // padding: 0 20px 20px 20px;
  background: #c8ebdf;
  .el-tabs {
    .el-tab-pane {
      padding-top: 20px;
      .project-header {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-end;
        width: 100%;
        margin-bottom: 20px;

        padding-bottom: 15px;
        border-bottom: 1px solid #eee;
        .project-header__icon {
          width: fit-content;
          height: 50px;
          svg {
            width: 50px;
            height: 50px;
          }
        }
        .project-header__text {
          margin-left: 20px;
          font-size: 25px;
          font-weight: 300;
        }
      }
    }
  }
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
