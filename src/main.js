// app 入口 main.js
// 基础模块 base
import './base'
// 基础样式 style
import './style.scss'
import Vue from 'vue'
// 数据管理库
import storage from './storage'
// @depend 依赖 storage.js
import app from './app'

// 页面标题
const title = '愿望水晶'
document.title = title

let axios
let localforage

if (navigator.standalone) {
  // app 环境 引入依赖模块
  axios = window.util.load('axios.min.js')
  localforage = window.util.load('localforage.min.js')
}

// 启动应用
window.$event.once('root:launch', async () => {
  if (navigator.standalone) {
    // app 环境 引入依赖模块
    await axios
    await localforage
    // app 环境 初始化 storage
    await storage()
    await window.util.nextTick()
  }
  window.$event.emit('root:create')
})

// 创建应用
window.$event.on('root:create', () => {
  if (window.vm) {
    return
  }
  if (!document.querySelector('#app')) {
    const app = document.createElement('div')
    app.id = 'app'
    document.body.appendChild(app)
  }
  window.vm = new Vue(app).$mount('#app')
})

// 销毁应用
window.$event.on('root:destroy', () => {
  if (!window.vm) {
    return
  }
  window.vm.$el.remove()
  window.vm.$destroy()
  window.vm = null
  window.router.replace('/')
})

// 重启应用
// 但是 storage 没有重新初始化
window.$event.on('root:reboot', async () => {
  window.$event.emit('root:destroy')
  await window.util.nextTick()
  window.$event.emit('root:create')
})

// 启动应用
window.$event.emit('root:launch')
