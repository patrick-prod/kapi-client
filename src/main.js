// Vue 全家桶
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入 ui
import './plugins/element.js'
import './assets/css/element/theme/index.css'
import 'font-awesome/css/font-awesome.min.css'
import 'normalize.css/normalize.css'
import './assets/css/global.css'

// 工具库
import qs from 'qs'

// 配置 axios
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:10001/api'
axios.defaults.timeout = '5000'
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.withCredentials = true
axios.interceptors.request.use(config => {
  // 将请求参数格式转换
  if (config.method != 'delete') {
    config.data = qs.stringify(config.data)
  }
  //   config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

//  RESPONSE 响应异常拦截
axios.interceptors.response.use(
  data => {
    return data
  },
  err => {
    //==============  错误处理  ====================
    return Promise.resolve(err.response)
  }
)
Vue.prototype.$http = axios
// 生产环境
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
