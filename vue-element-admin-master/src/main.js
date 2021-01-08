import Vue from 'vue'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
//import enLang from 'element-ui/lib/locale/lang/en' // 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖
import enLang from 'element-ui/lib/locale/lang/zh-CN'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

import Cookies from 'js-cookie'
import wlGantt from 'wl-gantt'
import "wl-gantt/lib/wl-gantt.css"
import $ from "jquery"
//每次路由跳转前
// router.beforeEach((to, from, next) => {
// // console.log(store.getters.token)
//   if (store.getters.token) { // 判断是否有token
// 		console.log(to.path)
//     if (to.path === '/login') {
//       next({ path: '/' });
//     } else {
//       if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
//         store.dispatch('GetInfo').then(res => { // 拉取info
//           const roles = res.data.role;
//           store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
//             router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
//             next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
//           })
//         }).catch(err => {
//           console.log(err);
//         });
//       } else {
//         next() //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
//       }
//     }
//   } else {
// 	   next('/login'); // 否则全部重定向到登录页
//     // if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
//     //   next();
//     // } else {
//     //   next('/login'); // 否则全部重定向到登录页
//     // }
//   }
// });


/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
	const {
		mockXHR
	} = require('../mock')
	mockXHR()
}

Vue.use(Element, {
	size: Cookies.get('size') || 'medium', // set element-ui default size
	locale: enLang // 如果使用中文，无需设置，请删除
})
Vue.use(wlGantt)

// register global utility filters
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
	el: '#app',
	router,
	store,
  $,
	render: h => h(App)
})
