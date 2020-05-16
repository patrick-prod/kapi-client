<template>
  <el-row>
    <!-- 分组设置列表 -->
    <el-col :span="5">
      <div class="panel-list">
        <div
          class="panel-list-item"
          :class="curActiveTab == 1 ? 'item--select' : ''"
          @click="handleSelect(1)"
        >
          <div class="item-icon">
            <svg
              t="1589526657978"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3918"
              width="200"
              height="200"
            >
              <path
                d="M840 48h-736A40 40 0 0 0 64 88v848A40 40 0 0 0 104 976h736a40 40 0 0 0 40-40v-848A40 40 0 0 0 840 48z"
                fill="#BDBDBD"
                p-id="3919"
              />
              <path
                d="M840 40h-736c-26.464 0-48 21.536-48 48v848c0 26.464 21.536 48 48 48h736c26.464 0 48-21.536 48-48v-848c0-26.464-21.536-48-48-48z m32 896c0 17.648-14.352 32-32 32h-736c-17.648 0-32-14.352-32-32v-848c0-17.648 14.352-32 32-32h736c17.648 0 32 14.352 32 32v848z"
                fill="#37474F"
                p-id="3920"
              />
              <path
                d="M920 48h-736A40 40 0 0 0 144 88v848a40 40 0 0 0 40 40h736a40 40 0 0 0 40-40v-848A40 40 0 0 0 920 48z"
                fill="#EEEEEE"
                p-id="3921"
              />
              <path
                d="M920 40h-736c-26.464 0-48 21.536-48 48v848c0 26.464 21.536 48 48 48h736c26.464 0 48-21.536 48-48v-848c0-26.464-21.536-48-48-48z m32 896c0 17.648-14.352 32-32 32h-736c-17.648 0-32-14.352-32-32v-848c0-17.648 14.352-32 32-32h736c17.648 0 32 14.352 32 32v848z"
                fill="#37474F"
                p-id="3922"
              />
              <path
                d="M176 80a8 8 0 0 0-8 8v848a8 8 0 0 0 16 0v-848A8 8 0 0 0 176 80z"
                fill="#FAFAFA"
                p-id="3923"
              />
              <path
                d="M928 80a8 8 0 0 0-8 8v848a8 8 0 0 0 16 0v-848A8 8 0 0 0 928 80z"
                fill="#BDBDBD"
                p-id="3924"
              />
              <path
                d="M312 386v277.12l240-138.56V247.424z"
                fill="#26C6DA"
                p-id="3925"
              />
              <path
                d="M556 240.496a8.032 8.032 0 0 0-8 0l-240 138.56a8.048 8.048 0 0 0-4 6.944v277.12a8 8 0 0 0 12 6.928l240-138.56a8 8 0 0 0 4-6.928v-277.12a8.048 8.048 0 0 0-4-6.944zM544 519.936l-224 129.328V390.608l224-129.328v258.656z"
                fill="#37474F"
                p-id="3926"
              />
              <path
                d="M552 247.424v277.136l240 138.56v-277.12z"
                fill="#0097A7"
                p-id="3927"
              />
              <path
                d="M796 379.056l-240-138.56a8.032 8.032 0 0 0-12 6.928v277.12a8 8 0 0 0 4 6.928l240 138.56a8.096 8.096 0 0 0 8 0 8 8 0 0 0 4-6.928v-277.12a8.048 8.048 0 0 0-4-6.928zM784 649.264l-224-129.328V261.296l224 129.328v258.64z"
                fill="#37474F"
                p-id="3928"
              />
              <path
                d="M796 656.192l-240-138.56a8.032 8.032 0 0 0-8 0l-240 138.56a8 8 0 0 0 0 13.856l240 138.576a8.096 8.096 0 0 0 8 0l240-138.576a8 8 0 0 0 0-13.856zM552 792.448l-224-129.328 224-129.328 224 129.328-224 129.328z"
                fill="#37474F"
                p-id="3929"
              />
              <path
                d="M844 683.904l-288-166.288a8 8 0 0 0-8 13.856l288 166.288a7.968 7.968 0 0 0 10.928-2.928 8 8 0 0 0-2.928-10.928z"
                fill="#37474F"
                p-id="3930"
              />
              <path
                d="M558.928 520.56a8 8 0 0 0-10.928-2.928l-288 166.288a8 8 0 0 0 8 13.856l288-166.288a8 8 0 0 0 2.928-10.928z"
                fill="#37474F"
                p-id="3931"
              />
              <path
                d="M552 184a8 8 0 0 0-8 8v332.56a8 8 0 0 0 16 0V192a8 8 0 0 0-8-8zM678.928 589.84a7.968 7.968 0 0 0-10.928-2.928l-240 138.576a8 8 0 0 0 8 13.856l240-138.576a8 8 0 0 0 2.928-10.928zM618.928 555.2a7.968 7.968 0 0 0-10.928-2.928l-240 138.56a8 8 0 0 0 8 13.856l240-138.56a8 8 0 0 0 2.928-10.928zM738.928 624.48a8 8 0 0 0-10.928-2.928l-240 138.576a8 8 0 0 0 8 13.856l240-138.576a8 8 0 0 0 2.928-10.928zM360 816h-96a8 8 0 0 0 0 16h96a8 8 0 0 0 0-16zM360 864h-96a8 8 0 0 0 0 16h96a8 8 0 0 0 0-16z"
                fill="#37474F"
                p-id="3932"
              />
            </svg>
          </div>
          <div class="item-info">
            <p>Detail</p>
            <span>接口详细信息</span>
          </div>
        </div>
        <div
          class="panel-list-item"
          :class="curActiveTab == 2 ? 'item--select' : ''"
          @click="handleSelect(2)"
        >
          <div class="item-icon">
            <svg
              t="1589526294816"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3180"
              width="200"
              height="200"
            >
              <path
                d="M784 192H224a40 40 0 0 0-40 40v720A40 40 0 0 0 224 992h560a40 40 0 0 0 40-40v-720A40 40 0 0 0 784 192z"
                fill="#BDBDBD"
                p-id="3181"
              />
              <path
                d="M784 184H224c-26.464 0-48 21.536-48 48v720c0 26.464 21.536 48 48 48h560c26.464 0 48-21.536 48-48v-720c0-26.464-21.536-48-48-48z m32 768c0 17.648-14.352 32-32 32H224c-17.648 0-32-14.352-32-32v-720c0-17.648 14.352-32 32-32h560c17.648 0 32 14.352 32 32v720z"
                fill="#37474F"
                p-id="3182"
              />
              <path
                d="M832 192H272a40 40 0 0 0-40 40v720A40 40 0 0 0 272 992h560a40 40 0 0 0 40-40v-720A40 40 0 0 0 832 192z"
                fill="#EEEEEE"
                p-id="3183"
              />
              <path
                d="M832 184H272c-26.464 0-48 21.536-48 48v720c0 26.464 21.536 48 48 48h560c26.464 0 48-21.536 48-48v-720c0-26.464-21.536-48-48-48z m32 768c0 17.648-14.352 32-32 32H272c-17.648 0-32-14.352-32-32v-720c0-17.648 14.352-32 32-32h560c17.648 0 32 14.352 32 32v720z"
                fill="#37474F"
                p-id="3184"
              />
              <path
                d="M264 224a8 8 0 0 0-8 8v720a8 8 0 0 0 16 0v-720a8 8 0 0 0-8-8z"
                fill="#FAFAFA"
                p-id="3185"
              />
              <path
                d="M840 224a8 8 0 0 0-8 8v720a8 8 0 0 0 16 0v-720a8 8 0 0 0-8-8z"
                fill="#BDBDBD"
                p-id="3186"
              />
              <path
                d="M952 752h-864a16 16 0 0 0-16 16v128a16 16 0 0 0 16 16h864a16 16 0 0 0 16-16v-128a16 16 0 0 0-16-16z"
                fill="#FFA000"
                p-id="3187"
              />
              <path
                d="M952 744h-864c-13.232 0-24 10.768-24 24v128c0 13.232 10.768 24 24 24h864c13.232 0 24-10.768 24-24v-128c0-13.232-10.768-24-24-24zM960 896a8 8 0 0 1-8 8h-864A8 8 0 0 1 80 896v-128a8 8 0 0 1 8-8h864a8 8 0 0 1 8 8v128z"
                fill="#37474F"
                p-id="3188"
              />
              <path
                d="M984 752h-864a16 16 0 0 0-16 16v128a16 16 0 0 0 16 16h864a16 16 0 0 0 16-16v-128a16 16 0 0 0-16-16z"
                fill="#FFCA28"
                p-id="3189"
              />
              <path
                d="M984 744h-864c-13.232 0-24 10.768-24 24v128c0 13.232 10.768 24 24 24h864c13.232 0 24-10.768 24-24v-128c0-13.232-10.768-24-24-24zM992 896a8 8 0 0 1-8 8h-864A8 8 0 0 1 112 896v-128a8 8 0 0 1 8-8h864a8 8 0 0 1 8 8v128z"
                fill="#37474F"
                p-id="3190"
              />
              <path
                d="M232 744a8 8 0 0 0-8 8v64a8 8 0 0 0 16 0v-64a8 8 0 0 0-8-8zM360 744a8 8 0 0 0-8 8v64a8 8 0 0 0 16 0v-64a8 8 0 0 0-8-8zM488 744a8 8 0 0 0-8 8v64a8 8 0 0 0 16 0v-64a8 8 0 0 0-8-8zM616 744a8 8 0 0 0-8 8v64a8 8 0 0 0 16 0v-64a8 8 0 0 0-8-8zM744 744a8 8 0 0 0-8 8v64a8 8 0 0 0 16 0v-64a8 8 0 0 0-8-8zM872 744a8 8 0 0 0-8 8v64a8 8 0 0 0 16 0v-64a8 8 0 0 0-8-8z"
                fill="#37474F"
                p-id="3191"
              />
              <path
                d="M572.72 70.624l-33.936-33.936a15.984 15.984 0 0 0-22.624 0L52.288 500.544l56.576 56.576L572.72 93.248a16 16 0 0 0 0-22.624z"
                fill="#FF7043"
                p-id="3192"
              />
              <path
                d="M578.368 64.976L544.416 31.04a24.016 24.016 0 0 0-33.936 0L46.624 494.896a8 8 0 0 0 0 11.328l56.576 56.576a7.968 7.968 0 0 0 11.328 0L578.384 98.912a24.032 24.032 0 0 0-0.016-33.936z m-11.312 22.624L108.848 545.808l-45.264-45.264L521.808 42.336a8.016 8.016 0 0 1 11.312 0l33.936 33.936a8.032 8.032 0 0 1 0 11.328z"
                fill="#37474F"
                p-id="3193"
              />
              <path
                d="M52.288 500.544L24 585.408l84.848-28.288z"
                fill="#EEEEEE"
                p-id="3194"
              />
              <path
                d="M114.512 551.456L57.936 494.88a8 8 0 0 0-13.232 3.136l-28.288 84.848a8 8 0 0 0 10.128 10.112l84.848-28.288a8 8 0 0 0 3.12-13.232z m-77.856 21.296l19.136-57.392 38.256 38.256-57.392 19.136z"
                fill="#37474F"
                p-id="3195"
              />
              <path
                d="M572.72 70.624l-33.936-33.936a15.984 15.984 0 0 0-22.624 0l-33.936 33.936 56.576 56.576 33.936-33.936a16.048 16.048 0 0 0-0.016-22.64z"
                fill="#EEEEEE"
                p-id="3196"
              />
              <path
                d="M578.368 64.976L544.416 31.04a24.016 24.016 0 0 0-33.936 0l-33.952 33.936a8 8 0 0 0 0 11.328l56.576 56.576a7.968 7.968 0 0 0 11.328 0l33.952-33.936a24.064 24.064 0 0 0-0.016-33.968z m-11.312 22.624l-28.288 28.288-45.264-45.264 28.288-28.288a8.016 8.016 0 0 1 11.312 0l33.936 33.936a8 8 0 0 1 0.016 11.328zM680 373.248h-256a8 8 0 0 0-8 8v256a8 8 0 0 0 8 8h256a8 8 0 0 0 8-8v-256a8 8 0 0 0-8-8z m-8 256H432v-240h240v240z"
                fill="#37474F"
                p-id="3197"
              />
              <path
                d="M552 421.248c-48.528 0-88 39.472-88 88s39.472 88 88 88 88-39.472 88-88-39.472-88-88-88z m0 160c-39.696 0-72-32.304-72-72s32.304-72 72-72 72 32.304 72 72-32.304 72-72 72z"
                fill="#37474F"
                p-id="3198"
              />
              <path
                d="M709.664 655.584l-304-304a8 8 0 0 0-11.312 11.312l304 304a7.968 7.968 0 0 0 11.328 0 8.016 8.016 0 0 0-0.016-11.312z"
                fill="#37474F"
                p-id="3199"
              />
              <path
                d="M766.96 501.248h-429.92a8 8 0 0 0 0 16h429.92a8 8 0 0 0 0-16z"
                fill="#37474F"
                p-id="3200"
              />
              <path
                d="M896 368h-48a40 40 0 0 0-40 40v176A40 40 0 0 0 848 624h48a40 40 0 0 0 40-40v-176A40 40 0 0 0 896 368z"
                fill="#455A64"
                p-id="3201"
              />
              <path
                d="M896 360h-48c-26.464 0-48 21.536-48 48v176c0 26.464 21.536 48 48 48h48c26.464 0 48-21.536 48-48v-176c0-26.464-21.536-48-48-48z m32 224c0 17.648-14.352 32-32 32h-48c-17.648 0-32-14.352-32-32v-176c0-17.648 14.352-32 32-32h48c17.648 0 32 14.352 32 32v176z"
                fill="#37474F"
                p-id="3202"
              />
              <path
                d="M808 496v88A40 40 0 0 0 848 624h48a40 40 0 0 0 40-40V496h-128z"
                fill="#0097A7"
                p-id="3203"
              />
              <path
                d="M936 488h-128a8 8 0 0 0-8 8v88c0 26.464 21.536 48 48 48h48c26.464 0 48-21.536 48-48V496a8 8 0 0 0-8-8z m-8 96c0 17.648-14.352 32-32 32h-48c-17.648 0-32-14.352-32-32v-80h112v80z"
                fill="#37474F"
                p-id="3204"
              />
              <path
                d="M944 368h-48a40 40 0 0 0-40 40v176A40 40 0 0 0 896 624h48a40 40 0 0 0 40-40v-176A40 40 0 0 0 944 368z"
                fill="#78909C"
                p-id="3205"
              />
              <path
                d="M944 360h-48c-26.464 0-48 21.536-48 48v176c0 26.464 21.536 48 48 48h48c26.464 0 48-21.536 48-48v-176c0-26.464-21.536-48-48-48z m32 224c0 17.648-14.352 32-32 32h-48c-17.648 0-32-14.352-32-32v-176c0-17.648 14.352-32 32-32h48c17.648 0 32 14.352 32 32v176z"
                fill="#37474F"
                p-id="3206"
              />
              <path
                d="M856 496v88A40 40 0 0 0 896 624h48a40 40 0 0 0 40-40V496h-128z"
                fill="#26C6DA"
                p-id="3207"
              />
              <path
                d="M984 488h-128a8 8 0 0 0-8 8v88c0 26.464 21.536 48 48 48h48c26.464 0 48-21.536 48-48V496a8 8 0 0 0-8-8z m-8 96c0 17.648-14.352 32-32 32h-48c-17.648 0-32-14.352-32-32v-80h112v80z"
                fill="#37474F"
                p-id="3208"
              />
            </svg>
          </div>
          <div class="item-info">
            <p>Edit</p>
            <span>编辑接口参数</span>
          </div>
        </div>
      </div>
    </el-col>
    <!-- 分组设置面板 -->
    <el-col :span="17" :offset="1">
      <!-- 基础信息 -->
      <div class="group-panel" v-show="curActiveTab == '1'">
        <el-card>
          <div slot="header">
            <span>基础信息</span>
          </div>
          <iTitle :title="'基础信息'"></iTitle>
          <div>
            <el-row>
              <el-col :span="11" :offset="1">
                接口名称：
                <span>{{ interfaceDetail.interface_name }}</span>
              </el-col>
              <el-col :span="11">
                创建人：
                <span>{{ interfaceDetail.user_id }}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11" :offset="1">
                接口状态：
                <span>{{ interfaceDetail.interface_type }}</span>
              </el-col>
              <el-col :span="11">
                创建时间：
                <span>{{ interfaceDetail.add_time }}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11" :offset="1">
                接口路径：
                <span>
                  <el-tag size="small">{{ interfaceDetail.method }}</el-tag>
                  {{ interfaceDetail.path }}
                </span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11" :offset="1">
                Mock地址：
                <el-link type="success">
                  <span style="color:#42b884 !important;">{{
                    'http://127.0.0.1:10001/mock$+' + interfaceDetail.path
                  }}</span>
                </el-link>
              </el-col>
            </el-row>
          </div>
          <iTitle :title="'请求参数'" style="margin-top:20px;"></iTitle>
          <iTitle :title="'返回数据'" style="margin-top:20px;"></iTitle>
          {{ interfaceDetail }}
        </el-card>
      </div>
      <!-- 编辑接口 -->
      <div class="group-panel" v-show="curActiveTab == '2'">
        <el-card style="overflow:scroll">
          <div slot="header">
            <span>编辑接口</span>
          </div>
          <iInterfaceIde :interfaceId="interfaceDetail.id"></iInterfaceIde>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import {
  genetarAvatarBySeed,
  genetarProjectIconBySeed
} from '../../util/avatar'
import iTitle from '../public/title.vue'
import iInterfaceIde from './interfaceIde.vue'
export default {
  components: {
    iTitle,
    iInterfaceIde
  },
  mounted() {},
  data() {
    return {
      curActiveTab: 1
    }
  },
  props: {
    interfaceDetail: Object
  },
  async mounted() {},
  methods: {
    // 公共方法
    handleSelect(idx) {
      this.curActiveTab = idx
    }
  },

  computed: {
    projectId() {
      return this.$route.params.pid
    }
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
.el-row {
  height: 100%;
  .el-col {
    height: 100%;
    .panel-list {
      height: 100%;
      box-sizing: border-box;
      background: #e3f5ee;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05) !important;
      .panel-list-item {
        display: flex;
        flex-direction: col;
        justify-content: center;
        padding: 14px 0 14px 0;
        cursor: pointer;
        &:hover {
          background-color: #d8f1e7;
        }
        .item-icon {
          width: 20%;
          svg {
            width: 50px;
            height: 50px;
          }
        }
        .item-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          font-size: 16px;
          font-weight: 400;
          font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          width: 70%;
          p {
            color: #2c3e50;
            margin: 0;
            padding: 0;
            margin-bottom: 7px;
          }
          span {
            color: #6a8bad;
          }
        }
      }
    }
    .group-panel {
      height: 840px;
      padding-top: 20px;
      .el-row {
        .el-col {
          padding: 10px 0 10px 0;
          font-size: 14px;
          font-weight: 400;
          color: #777;
          span {
            color: #2c3e50;
            font-weight: 300;
          }
        }
      }
    }
  }
}

.item--select {
  background-color: #d8f1e7;
}
</style>
