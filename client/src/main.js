import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import qs from 'qs'
import router from './router';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.prototype.$qs = qs
Vue.use(ElementUI)


new Vue({
  router,
  store,
  qs,
  render: h => h(App),
}).$mount('#app')
