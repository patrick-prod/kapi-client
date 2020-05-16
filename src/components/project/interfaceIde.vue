<template>
  <div class="form-container">
    <iHeader :title="'基本设置'"></iHeader>
    <div class="form-panel">
      <el-form
        :model="editInterForm"
        :rules="editInterRules"
        ref="editInterRef"
        label-width="80px"
        size="small"
      >
        <el-form-item label="接口名称" prop="interface_name">
          <el-input v-model="editInterForm.interface_name" size="small" placeholder="接口名称"></el-input>
        </el-form-item>
        <el-form-item label="接口分类" prop="icid">
          <el-select style="width:100%;" v-model="editInterForm.icid" placeholder="公共分类" disabled>
            <el-option
              v-for="(cat, idx) in interfaceMenu"
              :key="idx"
              :label="cat.cat_name"
              :value="cat.cat_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="接口路径" prop="path">
          <el-input placeholder="接口地址" v-model="editInterForm.path">
            <el-select
              v-model="editInterForm.method"
              slot="prepend"
              placeholder="GET"
              :style="'width:100px;color:' + reqColor[editInterForm.method]"
            >
              <el-option label="GET" value="GET"></el-option>
              <el-option label="POST" value="POST"></el-option>
              <el-option label="PUT" value="PUT"></el-option>
              <el-option label="DELETE" value="DELETE"></el-option>
              <el-option label="OPTION" value="OPTION"></el-option>
              <el-option label="HEAD" value="HEAD"></el-option>
              <el-option label="PATCH" value="PATCH"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="接口分类" prop="status">
          <el-select style="width:100%;" v-model="editInterForm.status" placeholder="公共分类">
            <el-option label="已完成" value="done"></el-option>
            <el-option label="未完成" value="undone"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <iHeader :title="'Query参数设置'"></iHeader>
    <div class="form-panel">
      <iParams></iParams>
    </div>
    <iHeader :title="'Header参数设置'"></iHeader>
    <div class="form-panel">
      <iParams></iParams>
    </div>
    <iHeader
      :title="'Body参数设置'"
      v-if="editInterForm.method !== 'GET' && editInterForm.method !== 'HEAD' && editInterForm.method !== 'OPTION'"
    ></iHeader>
    <div
      class="form-panel"
      v-if="editInterForm.method !== 'GET' && editInterForm.method !== 'HEAD' && editInterForm.method !== 'OPTION'"
    >
      <iParams></iParams>
    </div>
    <iHeader :title="'返回参数设置'"></iHeader>

    <div class="form-panel">{{ editInterForm }}</div>
    <iHeader :title="'备注'"></iHeader>
    <div class="form-panel">
      <quill-editor
        ref="text"
        v-model="editInterForm.markdown"
        :options="editorOption"
        style="background:#fff;"
      />
    </div>
  </div>
</template>

<script>
import iHeader from '../public/title.vue'
import iParams from './params.vue'

import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  components: {
    iHeader,
    iParams,
    quillEditor
  },
  props: {
    interfaceId: Number
  },
  data() {
    return {
      editInterRules: {
        icid: [{ required: true, message: '请选择接口分类', trigger: 'blur' }],
        interface_name: [
          { required: true, message: '请输入接口名称', trigger: 'blur' }
        ],
        path: [{ required: true, message: '请输入接口路径', trigger: 'blur' }],
        status: [
          { required: true, message: '选择接口完成状态', trigger: 'blur' }
        ],
        editorOption: {}
      },
      editInterForm: {},
      reqColor: {
        GET: 'green',
        POST: '#E6A23C',
        PUT: '#909399',
        DELETE: '#F56C6C',
        HEAD: 'purple',
        OPTION: '#4890bf',
        PATCH: 'pink'
      }
    }
  },
  async mounted() {
    await this.getInterfaceInfo(this.interfaceId)
  },
  methods: {
    // 获取接口信息
    async getInterfaceInfo(iid) {
      let { data: res } = await this.$http.get(
        `/interfaces/${this.projectId}/interface/${iid}`
      )
      if (!res || res.status != '1') {
        return this.$message.error(
          res.msg && res.msg !== '' ? res.msg : '获取接口详情失败'
        )
      }
      this.editInterForm = res.data
    }
  },
  computed: {
    projectId() {
      return this.$route.params.pid
    }
  }
}
</script>

<style lang="scss" scoped>
.form-container {
  width: 100%;
  .form-panel {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    margin: 20px 0px;
    background: #eceef1;
  }
}
</style>
