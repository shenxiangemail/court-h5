import 'babel-polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import Resource from 'vue-resource'
import VueRouter from 'vue-router'
import 'es6-promise/auto'
import Vuex from 'vuex'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import commonConst from './common/commonConst.js' //引入公共变量
import 'swiper/dist/css/swiper.css'
import routers from './router/index.js'
import security from './common/security.js'
import api from './api/api.js' //引入api
import md5Util from './common/md5.js'
import store from './store/index.js'




//使用Vue.prototype将公共函数挂在至vue实例上
Vue.prototype.api = api;
Vue.prototype.commonConst = commonConst;
Vue.prototype.security = security;
Vue.prototype.md5Util = md5Util;

Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
Vue.use(VueRouter)
Vue.use(Resource)



const router = new VueRouter({
	// mode:'history',
	mode:'hash',
	routes:routers
})
//解决elementUi重复点击按钮报错问题
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
