<template>
  <div class="login-container">
    <div class="login-logo">
      <h1>Kapi</h1>
      <p>Kapi is an awsome Doucment Interface Manager made by Golang.</p>
    </div>
    <div :class="['login-box', wantLogin ? '' : 'register-box']">
      <div class="login-box-avater" ref="avatarRef"></div>
      <el-tooltip effect="light" :content="wantLogin ? '没有账号？注册' : '已有账号？登录'" placement="top">
        <el-button icon="el-icon-guide" class="login-box-switch" @click="switchLoginReg" circle></el-button>
      </el-tooltip>
      <!-- <div class="login-box-text">{{ username }}</div> -->
      <el-form
        class="login-box-form"
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginFormRef"
        v-show="wantLogin"
      >
        <!-- 用户名 -->
        <el-form-item prop="email">
          <el-input
            v-model="loginForm.email"
            placeholder="email"
            prefix-icon="fa fa-envelope-o"
            ref="loginEmailRef"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="password" prefix-icon="fa fa-lock"></el-input>
        </el-form-item>
        <el-form-item class="login-box-btn">
          <el-button type="success" @click="login">登录</el-button>
        </el-form-item>
      </el-form>

      <el-form
        class="login-box-form"
        :model="registerForm"
        :rules="registerFormRules"
        ref="registerFormRef"
        v-show="!wantLogin"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="registerForm.username"
            placeholder="username"
            prefix-icon="fa fa-user-o"
            @input="generateAvatar('kapi' + registerForm.username)"
          ></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="registerForm.email" placeholder="email" prefix-icon="fa fa-envelope-o"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="registerForm.password" placeholder="password" prefix-icon="fa fa-lock"></el-input>
        </el-form-item>
        <el-form-item class="login-box-btn">
          <el-button type="warning" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { genetarAvatarBySeed } from './../util/avatar'
import qs from 'qs'
export default {
  data() {
    var checkEmail = (rule, value, cb) => {
      const regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (regEmail.test(value)) {
        return cb()
      }
      cb(new Error('请输入正确的邮箱格式。'))
    }
    return {
      // 登录表单实体
      loginForm: {
        email: '',
        password: ''
      },
      // 登录表单的验证规则对象。
      loginFormRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            validator: checkEmail,
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 30,
            message: '长度在 6 到 30 个字符',
            trigger: 'blur'
          }
        ]
      },
      // 注册还是登录
      wantLogin: true,
      // 注册表单
      registerForm: {
        username: '',
        email: '',
        password: ''
      },
      // 注册表单校验规则对象
      registerFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 30,
            message: '长度在 3 到 30 个字符',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            validator: checkEmail,
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 30,
            message: '长度在 6 到 30 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted() {
    this.generateAvatar()
  },
  methods: {
    // 根据种子生成头像
    generateAvatar(seed) {
      this.$refs.avatarRef.innerHTML = genetarAvatarBySeed(seed)
    },
    // 登录
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const res = await this.$http.post(
          'user/login',
          // qs.stringify(this.loginForm)
          this.loginForm
        )
        if (res.status !== 200) {
          let errMsg = '登录失败！'
          if (res.data && res.data.msg !== '') {
            errMsg = res.data.msg.replace(',', '，')
          }
          return this.$message.error(errMsg)
        }
        this.$message.success('登录成功！')
        let ck = document.cookie
        const ss = await this.$http.get('groups/mine')
        console.log(ss)
      })
    },
    // 注册
    register() {
      this.$refs.registerFormRef.validate(async valid => {
        if (!valid) return
        const regEmail = this.registerForm.email
        const res = await this.$http.post(
          'user/register',
          qs.stringify(this.registerForm)
        )
        if (res.status !== 200) {
          let errMsg = '注册失败！'
          if (res.data && res.data.msg !== '') {
            errMsg = res.data.msg.replace(',', '，')
            // .replace('err_code', '错误码')
          }
          return this.$message.error(errMsg)
        }
        this.$message.success('注册成功！')
        this.switchLoginReg()
        this.loginForm.email = regEmail
      })
    },
    // 切换登录和注册
    switchLoginReg() {
      this.wantLogin = !this.wantLogin
      if (this.wantLogin) {
        this.$refs.registerFormRef.resetFields()
      } else {
        this.$refs.loginFormRef.resetFields()
      }
    }
  }
}
</script>

<style lang="scss">
.login-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 200px 0 200px;
  background-color: #42b884;
  .login-logo {
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
    align-items: flex-start;
    height: 500px;
    h1 {
      font-size: 50px;
    }
    p {
      font-size: 25px;
    }
  }
  .login-box {
    position: relative;
    width: 500px;
    height: 290px;
    box-sizing: border-box;
    background: #fff;
    border-radius: 5px;
    .login-box-avater {
      position: absolute;
      left: 20px;
      width: 90px;
      height: 90px;
      border-radius: 3px;
      border: 3px soild #ddd;
      box-shadow: 0 0 5px #ddd;
      background-color: #fff;
      transform: translate(0, -35%);
    }
    .login-box-text {
      position: absolute;
      left: 125px;
      top: 30px;
      // ",,"PingFang SC","","Microsoft YaHei","微软雅黑",Arial,sans-serif
      font-family: Microsoft YaHei;
      font-size: 22px;
      font-weight: 300;
      line-height: 25px;
    }
    .login-box-switch {
      position: absolute;
      top: 25px;
      right: 21px;
    }
    .login-box-form {
      position: absolute;
      bottom: 0px;
      width: 100%;
      padding: 0 20px 0 20px;
      box-sizing: border-box;
      .el-form-item {
        margin-top: 25px !important;
      }
      .login-box-btn {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
  .register-box {
    height: 350px;
  }
}
</style>
