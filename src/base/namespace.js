import _ from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

// 注册 Vue plugin
Vue.use(Vuex)
Vue.use(VueRouter)

// 占用全局命名空间
_.assign(window, {
  _,
  Vue,
  Vuex,
  VueRouter
})

// 占用 Vue 原型链 命名空间
Vue.prototype.$_ = _
Vue.prototype.$util = window.util
Vue.prototype.$event = window.$event
Vue.prototype.$window = window
Vue.prototype.$storage = window.util.observe({})
Vue.prototype.$timestamp = process.env.TIMESTAMP || 0

// 占用 Vue 原型链 命名空间
Vue.prototype.$ = window.util.observe({
  now: 0
})
Vue.prototype.$.now = +new Date()

let sid = 0
// 开始或停止 刷新时钟
window.$event.on('root:tick', (bool) => {
  if (bool) {
    sid = setInterval(() => {
      Vue.prototype.$.now = +new Date()
    }, 100)
  } else {
    clearInterval(sid)
  }
})

window.$event.emit('root:tick', true)
