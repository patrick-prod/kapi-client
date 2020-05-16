<template>
  <div class="head-container">
    <div class="head-title">
      <p v-if="isProject">
        <router-link :to="{ name: 'Group' }">
          <i
            class="el-icon-back"
            style="padding-right: 5px; cursor:pointer;"
          ></i>
        </router-link>
        {{ projectName }}
      </p>
      <p v-else>Kapi Manager</p>
    </div>
    <div class="head-info">
      <el-dropdown trigger="click" placement="bottom">
        <div
          class="info-box"
          v-html="genetarAvatar(userinfo ? userinfo.username : 'fuck')"
        ></div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-user" disabled>
            {{ userinfo ? userinfo.username : 'fuck' }}
          </el-dropdown-item>
          <el-dropdown-item icon="el-icon-edit">我的账户信息</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-close"
            ><span @click="logout">登出</span></el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { genetarAvatarBySeed } from '../../util/avatar'
export default {
  props: {
    isProject: Boolean,
    projectName: String
  },
  data() {
    return {
      userinfo: {}
    }
  },
  mounted() {
    this.userinfo = {
      username: window.sessionStorage.getItem('username'),
      uid: window.sessionStorage.getItem('uid')
    }
  },
  methods: {
    genetarAvatar(uid) {
      return `<div class="info-svg">${genetarAvatarBySeed(
        'kapi-' + uid
      )}</div> <i class="el-icon-arrow-down el-icon--right"></i>`
    },
    logout() {
      document.cookie = ''
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style lang="scss">
.head-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  margin-right: 12px;
  .head-title {
    font-size: 25px;
    font-weight: 300;
  }
  .head-info {
    .info-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 60px;
      cursor: pointer;
      .info-svg {
        height: 38px;
        width: 40px;
        border-radius: 5px;
        background-color: #fff;
        svg {
          height: 38px;
          width: 40px;
        }
      }
      i {
        font-size: 16px;
        font-weight: 600;
      }
    }
  }
}
</style>
