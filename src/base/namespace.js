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
