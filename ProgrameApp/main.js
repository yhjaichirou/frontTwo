import Vue from 'vue'
import App from './App'
import member from './common/common.js'

Vue.config.productionTip = false

Vue.prototype.$serverUrl = 'https://unidemo.dcloud.net.cn';
Vue.prototype.$localImgUrl = '/static/';
Vue.prototype.$member = member;


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()