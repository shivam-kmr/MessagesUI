import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store/store.js";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
Vue.config.productionTip = false;

Vue.use(ViewUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
