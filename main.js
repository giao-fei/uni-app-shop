import Vue from 'vue'
import App from './App'
import { myRequest } from './util/api.js'

Vue.prototype.$myRequest = myRequest

// 引入阿里字库
import 'static/icon/iconfont.css'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
