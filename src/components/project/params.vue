<template>
  <div>
    <el-row>
      <el-button type="success" size="mini" icon="el-icon-edit" plain>添加头部</el-button>
    </el-row>
    <el-row v-for="(item, idx) in params" :key="idx">
      <el-col :span="5">
        <el-input size="mini" v-model="item.params_name"></el-input>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="item.required"></el-select>
      </el-col>
      <el-col :span="6">
        <el-input size="mini" v-model="item.params_value"></el-input>
      </el-col>
      <el-col :span="7">
        <el-input size="mini" v-model="item.params_desc"></el-input>
      </el-col>
      <el-col :span="1" style="margin-left:5px !important">
        <el-button type="danger" icon="el-icon-delete" size="mini" plain></el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    params: {
      type: Array,
      default: function() {
        return [
          {
            params_name: '艹',
            required: '',
            params_value: '',
            params_desc: ''
          }
        ]
      }
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss">
.el-row {
  margin-bottom: 6px;
  .el-col {
    margin-right: 3px;
  }
}
</style>