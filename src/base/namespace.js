import _ from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

Vue.use(Vuex)
Vue.use(VueRouter)

_.assign(window, {
  _,
  Vue,
  Vuex,
  VueRouter
})

Vue.prototype.$_ = _
Vue.prototype.$util = window.util
Vue.prototype.$event = window.$event
Vue.prototype.$window = window
Vue.prototype.$timestamp = process.env.TIMESTAMP || 0

Vue.prototype.$ = window.util.observe({
  now: 0
})
Vue.prototype.$.now = +new Date()

let sid = 0
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
