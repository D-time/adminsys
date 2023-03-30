import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入vuecookie
import VueCookies from 'vue-cookies';
Vue.use(VueCookies)

Vue.use(ElementUI);
Vue.prototype.$http = 'http://120.77.174.3:3000';
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
