<template>
  <el-container>
    <el-aside width="240px" style="box-shadow:2px 0 5px rgba(0,0,0,.1);z-index:2">
      <div class="aside-btn">
        <el-button
          type="default"
          icon="el-icon-folder-add"
          size="small"
          plain
          round
          @click="addCatDialogVisible = true"
        >添加接口分类</el-button>
      </div>
      <el-menu
        :default-openeds="opened"
        :default-active="'0'"
        @open="showCatInterface"
        unique-opened
        @close="noclose"
      >
        <el-submenu index="1-1">
          <template slot="title">
            <div @click="showInterfaces(0, '全部接口')">
              <i :class="'el-icon-folder'"></i>
              全部接口
            </div>
          </template>
        </el-submenu>
        <el-submenu v-for="(cat, idx) in interfaceMenu" :index="'' + cat.cat_id" :key="cat.cat_id">
          <template slot="title">
            <i :class="'el-icon-folder-opened'"></i>
            {{ cat.cat_name }}
          </template>
          <el-menu-item
            :index="idx + '-' + iidx"
            v-for="(inter, iidx) in cat.InterfacesBaseValue"
            :key="iidx"
            style="font-size:13px !important;"
            @click="showInterfaceDetail(inter.interface_id)"
          >{{ inter.intetface_name }}</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main>
      <iPanel v-if="isDetail" :interfaceDetail="interfaceInfo"></iPanel>
      <div class="card-container" v-else>
        <el-card>
          <div slot="header">
            <span>接口管理</span>
            <el-button
              style="float: right; padding: 3px 0; color: #41b983;"
              type="text"
              @click="addInterDialogVisible = true"
            >
              <i class="el-icon-document-add" style="margin-right:5px"></i>新建接口
            </el-button>
          </div>
          <!-- 接口列表 -->
          <el-table :data="interfaceList.list" border stripe style="margin-top:0px">
            <el-table-column label="接口名称" prop="interface_name">
              <template slot-scope="scope">
                <el-link
                  type="success"
                  @click="showInterfaceDetail(scope.row.id)"
                  style="font-weight:400"
                >{{ scope.row.interface_name }}</el-link>
              </template>
            </el-table-column>
            <el-table-column label="接口类型" prop="interface_type">
              <template
                slot-scope="scope"
              >{{scope.row.interface_type == 'static' ? '静态请求参数' : '动态请求参数'}}</template>
            </el-table-column>
            <el-table-column label="接口路径" prop="path">
              <template slot-scope="scope">
                <el-tag
                  :type="reqTagType[scope.row.method]"
                  size="small"
                  style="margin-right:10px;width:60px;text-align:center"
                >{{ scope.row.method }}</el-tag>
                {{ scope.row.path }}
              </template>
            </el-table-column>
            <el-table-column label="状态" prop="status">
              <template slot-scope="scope">
                <!-- <el-switch
                  v-model="scope.row.status"
                  inactive-color="#da5861"
                  style="margin-right:10px"
                  size="mini"
                  disabled
                ></el-switch>-->
                {{ scope.row.status == 'done' ? '已完成' : '未完成' }}
              </template>
            </el-table-column>
            <el-table-column label="更新时间" prop="up_time">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span
                  style="margin-left: 10px"
                >{{ scope.row.up_time == ''? scope.row.add_time: scope.row.up_time}}</span>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页区域 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[1, 2, 5, 10]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="queryInfo.total"
            style="margin-top:20px"
          ></el-pagination>
        </el-card>
      </div>
    </el-main>
    <!-- 添加分类的对话框 -->
    <el-dialog
      title="添加接口分类"
      :visible.sync="addCatDialogVisible"
      width="30%"
      @close="onAddCatDialogClosed"
    >
      <!-- 内容主体 -->
      <el-form
        :model="addCatForm"
        :rules="addCatRules"
        ref="addCatRef"
        label-width="70px"
        size="small"
      >
        <el-form-item label="分类名" prop="cat_name">
          <el-input v-model="addCatForm.cat_name" size="small" placeholder="分类名称"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="cat_desc">
          <el-input type="textarea" v-model="addCatForm.cat_desc" size="small" placeholder="备注"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer">
        <el-button @click="addCatDialogVisible = false">取 消</el-button>
        <el-button type="success" @click="addCat">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加接口的对话框 -->
    <el-dialog
      title="添加接口分类"
      :visible.sync="addInterDialogVisible"
      width="30%"
      @close="onAddInterDialogClosed"
    >
      <!-- 内容主体 -->
      <el-form
        :model="addInterForm"
        :rules="addInterRules"
        ref="addInterRef"
        label-width="80px"
        size="small"
      >
        <el-form-item label="接口分类" prop="icid">
          <el-select style="width:100%;" v-model="addInterForm.icid" placeholder="公共分类">
            <el-option
              v-for="(cat, idx) in interfaceMenu"
              :key="idx"
              :label="cat.cat_name"
              :value="cat.cat_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="接口名称" prop="title">
          <el-input v-model="addInterForm.title" size="small" placeholder="接口名称"></el-input>
        </el-form-item>
        <el-form-item label="接口路径" prop="path">
          <el-input placeholder="接口地址" v-model="addInterForm.path" size="small">
            <el-select
              v-model="addInterForm.method"
              slot="prepend"
              placeholder="GET"
              :style="'width:100px;color:' + reqColor[addInterForm.method]"
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

        <el-alert title="详细接口信息可以在编辑页面中添加" type="info" show-icon></el-alert>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer">
        <el-button @click="addInterDialogVisible = false">取 消</el-button>
        <el-button type="success" @click="addInterface">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import iHeader from '../group/header.vue'
import iPanel from './panel.vue'
export default {
  components: {
    iHeader,
    iPanel
  },
  data() {
    return {
      // 添加分类
      addCatForm: {},
      addCatRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      addCatDialogVisible: false,
      // 获取分类菜单
      interfaceMenu: [],
      openedFolder: 0,
      curActive: '0',
      opened: ['1-1'],
      // 添加接口
      addInterForm: {
        method: 'GET'
      },
      addInterRules: {
        icid: [{ required: true, message: '请选择接口分类', trigger: 'blur' }],
        title: [{ required: true, message: '请输入接口名称', trigger: 'blur' }],
        path: [{ required: true, message: '请输入接口路径', trigger: 'blur' }]
      },
      addInterDialogVisible: false,
      // 获取接口
      interfaceList: {},
      queryInfo: {
        pagenum: 1,
        pagesize: 1
      },
      curCat: 0,
      // 显示接口详细信息还是列表
      isDetail: false,
      interfaceInfo: {},
      isReady: false,
      reqColor: {
        GET: 'green',
        POST: '#E6A23C',
        PUT: '#909399',
        DELETE: '#F56C6C',
        HEAD: '#515151',
        OPTION: '#4890bf'
      },
      reqTagType: {
        GET: 'success',
        POST: 'warning',
        PUT: 'info',
        DELETE: 'danger',
        OPTION: 'default',
        HEAD: 'default'
      }
    }
  },
  async mounted() {
    await this.getInterfaceMenu()
    await this.getAllInterface('', 'ALL')
  },
  methods: {
    // 添加分类
    async addCat() {
      this.addCatForm.pid = this.projectId
      let { data: res } = await this.$http.post(
        `interfaces/cats`,
        this.addCatForm
      )
      if (!res || res.status != '1') {
        return this.$message.error(
          res.msg && res.msg !== '' ? res.msg : '添加分类失败'
        )
      }
      this.$message.success('添加分类成功')
      await this.getInterfaceMenu()
      this.addCatDialogVisible = false
    },
    onAddCatDialogClosed() {
      this.$refs.addCatRef.resetFields()
    },
    // 获取接口菜单
    async getInterfaceMenu() {
      let { data: res } = await this.$http.get(
        `interfaces/${this.projectId}/menu`
      )
      if (!res || res.status != '1') {
        return this.$message.error(
          res.msg && res.msg !== '' ? res.msg : '分类菜单获取失败'
        )
      }
      this.interfaceMenu = res.data ? res.data.menu : []
      console.log(this.interfaceMenu.length)
      for (let i = 0; i < this.interfaceMenu.length; i++) {
        this.opened.push('' + this.interfaceMenu[i].cat_id)
      }
      console.log(this.opened)
    },
    async noclose(idx) {
      this.opened.push(idx)
      this.curActive = idx
      await this.showInterfaces(idx)
    },
    showCatInterface(index) {
      console.log(index)
      this.openedFolder = index
    },
    // 添加接口
    async addInterface() {
      this.addInterForm.pid = this.projectId
      let { data: res } = await this.$http.post(`interfaces`, this.addInterForm)
      if (!res || res.status != '1') {
        return this.$message.error(
          res.msg && res.msg !== '' ? res.msg : '添加接口失败'
        )
      }
      this.$message.success('添加接口成功')
      await this.getInterfaceMenu()
      if (this.curCat === 0) {
        await this.getAllInterface(1, 'ALL')
      } else {
        await this.getAllInterfaceByCat(this.curCat, 1, 'ALL')
      }
      this.addInterDialogVisible = false
    },
    onAddInterDialogClosed() {
      this.$refs.addInterRef.resetFields()
    },
    // 获取接口列表
    async getAllInterface(pageNum, pageSize) {
      let { data: res } = await this.$http.get(
        `interfaces/${this.projectId}?limit=${pageSize}&page=${pageNum - 1}`
      )
      if (!res || res.status != '1') {
        return this.$message.error(
          res.msg && res.msg !== '' ? res.msg : '获取接口列表失败'
        )
      }
      this.interfaceList = res.data
      this.queryInfo.total = res.data.count
    },
    async getAllInterfaceByCat(catId, pageNum, pageSize) {
      let { data: res } = await this.$http.get(
        `interfaces/${
          this.projectId
        }/cid/${catId}?limit=${pageSize}&page=${pageNum - 1}`
      )
      if (!res || res.status != '1') {
        return this.$message.error(
          res.msg && res.msg !== '' ? res.msg : '获取接口列表失败'
        )
      }
      this.interfaceList = res.data
      this.queryInfo.total = res.data.count
    },
    async handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      await this.getAllInterface(
        this.queryInfo.pagenum,
        this.queryInfo.pagesize
      )
    },
    async handleCurrentChange(newPageNum) {
      this.queryInfo.pagenum = newPageNum
      await this.getAllInterface(
        this.queryInfo.pagenum,
        this.queryInfo.pagesize
      )
    },
    async showInterfaces(catId) {
      this.isDetail = false
      this.curCat = catId
      if (catId === 0) {
        await this.getAllInterface(1, 'ALL')
        return
      }

      await this.getAllInterfaceByCat(catId, 1, 'ALL')
    },
    // 详细接口信息
    async showInterfaceDetail(iid) {
      await this.getInterfaceInfo(iid)
      this.isDetail = true
    },
    async getInterfaceInfo(iid) {
      let { data: res } = await this.$http.get(
        `/interfaces/${this.projectId}/interface/${iid}`
      )
      if (!res || res.status != '1') {
        return this.$message.error(
          res.msg && res.msg !== '' ? res.msg : '获取接口详情失败'
        )
      }
      this.interfaceInfo = res.data
      console.log(res)
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
.el-container {
  height: 100%;
  .aside-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px 10px 20px;
    border-bottom: 1px solid #eee;
    .el-button {
      color: #2c3e50;
      font-weight: 400;
      width: 100% !important;
    }
  }
  .el-menu {
    border-right: none;
  }
  .el-main {
    padding: 0;
    background-color: #c8ebdf;
    .card-container {
      padding: 20px;
    }
  }
}
</style>
