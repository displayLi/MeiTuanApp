// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import {routes} from './routes/routes'
import axios from 'axios'

// 注册axios
axios.defaults.baseURL = "http://localhost:3000"
Vue.prototype.$axios = axios

// 注册路由
Vue.use(VueRouter)

const router = new VueRouter({
  mode:"history",
  routes,
  linkActiveClass:'active',
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
