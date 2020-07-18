
import Vue from 'vue'
import {router} from './router/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vuex from 'vuex'
import './config/http'
import App from './App.vue'
import {store} from './store/index'
Vue.use(ElementUI);
Vue.use(Vuex);
const vue=new Vue({
  el:'#app',
  router,
  store,
  render: h => h(App)
})
export default vue