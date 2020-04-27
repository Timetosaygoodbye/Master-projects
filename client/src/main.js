import Vue from "vue";
import axios from "axios";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VueMq from "vue-mq";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./registerServiceWorker";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import styles from "./assets/Fonts/fonts.scss";

const axiosConfig = {
  baseURL: '',
  timeout: 30000,
};

Vue.config.productionTip = false;
Vue.prototype.$api = axios.create(axiosConfig);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueMq, {
  breakpoints: {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
