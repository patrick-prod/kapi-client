<template>
  <div class="list-container">
    <div class="list-header">
      <el-dropdown
        trigger="click"
        placement="bottom"
        @command="handleCommand"
        style="width:100% !important; padding:0 20px 0 20px"
      >
        <el-button
          style="width:100% !important;"
          type="default"
          icon="el-icon-edit"
          size="medium"
          plain
          round
          >{{ curSelectedGroupName }}</el-button
        >
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-plus" command="showCreateDialog"
            >添加分组 (分组类型不可更改)
          </el-dropdown-item>
          <el-dropdown-item icon="el-icon-delete" command="" disabled
            >删除分组 (暂时不支持)</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="list-body">
      <div
        :class="[
          'list-body-item',
          curSelectedGroup === item.id ? 'list-item--selected' : ''
        ]"
        v-for="item in groupList"
        :key="item.type == 'own' ? -1 : item.id"
        @click="selectGroup(item)"
      >
        <div class="item-info">
          <div
            class="item-pic"
            v-html="generateGroupIcon(item.group_name)"
          ></div>
          <div class="item-name">
            {{ item.type === 'own' ? '个人空间' : item.group_name }}
          </div>
        </div>
        <el-tooltip effect="light" content="个人私有分组" placement="right">
          <div class="iten-pic">
            <i :class="item.type === 'public' ? '' : 'el-icon-user'"></i>
          </div>
        </el-tooltip>
      </div>
    </div>
    <!-- 添加分组的对话框 -->
    <el-dialog
      title="创建分组"
      :visible.sync="dialogVisible"
      width="50%"
      @close="createGroupDialogClosed"
    >
      <!-- 内容主体 -->
      <el-form
        :model="createGroupForm"
        :rules="createGroupRules"
        ref="createGroupRef"
        label-width="70px"
        size="small"
      >
        <el-form-item label="分组名:" prop="group_name">
          <el-input
            v-model="createGroupForm.group_name"
            placeholder="分组名"
          ></el-input>
        </el-form-item>
        <el-form-item label="分组描述:" prop="group_desc">
          <el-input
            type="textarea"
            :autosize="{ minRows: 6, maxRows: 6 }"
            v-model="createGroupForm.group_desc"
            placeholder="分组描述"
          ></el-input>
        </el-form-item>
        <el-form-item label="私有:" prop="type">
          <el-switch v-model="createGroupForm.type" size="mini"></el-switch>
        </el-form-item>
        <el-alert
          title="私有分组不能添加成员。"
          type="success"
          show-icon
        ></el-alert>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="success" @click="createGroup">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { genetarGroupIconBySeed } from '../../util/avatar'
import { groupSort } from '../../util/sort'

export default {
  props: {
    groupList: Array
  },
  data() {
    return {
      curSelectedGroup: 0,
      curSelectedGroupName: '个人空间',
      createGroupForm: {
        type: true
      },
      dialogVisible: false,
      createGroupRules: {
        group_name: [
          { required: true, message: '请输入分组名', trigger: 'blur' }
        ],
        type: [{ required: true, message: '分组类型不能未空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.curSelectedGroup = this.curGroup.gid
    this.curSelectedGroupName = this.curGroup.gname
  },
  methods: {
    async createGroup() {
      if (this.createGroupForm.type) {
        this.createGroupForm.type = 'private'
      } else {
        this.createGroupForm.type = 'public'
      }
      const { data: res } = await this.$http.post(
        'groups',
        this.createGroupForm
      )
      if (!res || res.status != '1') {
        return this.$message.error(
          res.msg && res.msg !== '' ? res.msg : '创建分组失败！'
        )
      }
      this.$message.success('创建分组成功！')
      this.getGroupList()
      this.dialogVisible = false
    },
    createGroupDialogClosed() {
      this.$refs.createGroupRef.resetFields()
    },
    async getGroupList() {
      const { data: res } = await this.$http.get('groups/mine')
      if (!res || res.status != '1') {
        return this.$message.error(
          res.msg && res.msg !== '' ? res.msg : '获取分组失败！'
        )
      }
      let list = JSON.parse(res.data)
      list.sort(groupSort)
      this.groupList = list
      this.selectGroup(this.groupList[this.curSelectedGroup])
    },
    generateGroupIcon(gid) {
      return genetarGroupIconBySeed(`kapi-${gid}`)
    },
    handleCommand(command) {
      if (command === 'showCreateDialog') {
        this.dialogVisible = true
      }
    },
    selectGroup(group) {
      this.curSelectedGroup = group.id
      this.curSelectedGroupName = group.group_name
      this.$store.commit('updateCurGroup', {
        gid: group.id,
        gname: group.group_name,
        gtype: group.type
      })
    }
  },
  computed: {
    curGroup() {
      return this.$store.getters.curGroup
    }
  }
}
</script>

<style lang="scss" scoped>
.list-container {
  height: 100%;
  box-sizing: border-box;
  background: #fff;
  border-bottom: 3px solid transparent;
  background-clip: padding-box;

  .list-header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    .el-button {
      width: 180px !important;
    }
  }
  .list-item--selected {
    background: #e4f5ef;
    // color: #42b983;
  }
  .list-body {
    height: 100%;
    .list-body-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      box-sizing: border-box;
      padding: 0 25px 0 25px;
      border-bottom: 1px solid #eee;
      cursor: pointer;
      .item-info {
        display: flex;
        justify-content: center;
        align-items: center;
        .item-pic {
          height: 41px;
          width: 41px;
          padding: 1px;
          box-sizing: border-box;
          border-radius: 50px;
          background: #fffadd;
        }
        .item-name {
          height: 50px;
          margin-left: 16px;
          box-sizing: border-box;
          font-size: 15px;
          font-weight: 300;
          line-height: 50px;
          text-align: center;
        }
      }

      .item-icon {
      }
    }
  }
  .list-body-item:hover {
    background: #e4f5ef;
    color: #42b983;
    font-weight: 700 !important;
  }
}
</style>
