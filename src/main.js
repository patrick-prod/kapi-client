import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 导入 ui
import "./plugins/element.js";
import "./assets/css/element/index.css";
import "font-awesome/css/font-awesome.min.css";
import "normalize.css/normalize.css";
import "./assets/css/global.css";
// 配置 axios
import axios from "axios";
axios.defaults.baseURL = "http://127.0.0.1:8888/";
// axios.interceptors.request.use((config) => {
//   config.headers.Authorization = window.sessionStorage.getItem("token");
//   return config;
// });
Vue.prototype.$http = axios;
// 生产环境
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
