<template>
  <el-container>
    <el-aside
      width="240px"
      style="box-shadow:2px 0 10px rgba(0,0,0,.1);z-index:2"
    >
      <iList :group-list="groupList" v-if="isReady"></iList>
    </el-aside>
    <el-container>
      <el-header>
        <iHeader></iHeader>
      </el-header>
      <el-main>
        <iPanel v-if="isReady"></iPanel>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import iList from '../components/group/list.vue'
import iHeader from '../components/group/header.vue'
import iPanel from '../components/group/panel.vue'

import { groupSort } from '../util/sort'
export default {
  async mounted() {
    await this.getGroupList()
  },
  components: {
    iList,
    iHeader,
    iPanel
  },
  data() {
    return {
      groupList: [],
      isReady: false
    }
  },
  methods: {
    async getGroupList() {
      const { data: res } = await this.$http.get('groups/mine')
      if (!res || res.status != '1') {
        return this.$message.error('获取分组失败！')
      }
      let list = JSON.parse(res.data)
      list.sort(groupSort)
      this.groupList = list

      this.groupList.forEach((item, idx) => {
        if (item.type == 'own') {
          this.selectGroup(this.groupList[idx])
        }
      })

      this.isReady = true
    },
    selectGroup(group) {
      this.$store.commit('updateCurGroup', {
        gid: group.id,
        gname: group.group_name,
        gtype: group.type
      })
    }
  }
}
</script>

<style lang="scss">
.el-container {
  height: 100%;
  .el-aside {
  }
  .el-container {
    height: 100%;
    .el-header {
      background-color: #bbe6d6;
    }
    .el-main {
      padding: 0;
      background-color: #c8ebdf;
    }
  }
}
</style>
