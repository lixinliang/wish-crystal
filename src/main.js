import './base'
import './style.scss'
import Vue from 'vue'
import storage from './storage'
// @depend 依赖 storage.js
import app from './app'

const title = '愿望水晶'
document.title = title

const axios = window.util.load('axios.min.js')
const localforage = window.util.load('localforage.min.js')


// 启动应用
window.$event.once('root:launch', async () => {
  await axios
  await localforage
  await storage()
  await window.util.nextTick()
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
