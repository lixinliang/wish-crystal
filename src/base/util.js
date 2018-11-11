import _ from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'

const util = {}

window.util = util

// promise 封装 暴露 resolve reject
util.promise = () => {
  const result = {}
  result.promise = new Promise((resolve, reject) => {
    result.resolve = resolve
    result.reject = reject
  })
  return result
}

// 定时器 封装 promise
util.sleep = (delay) => (new Promise((resolve) => (setTimeout(resolve, delay))))

// nextTick 封装 promise
util.nextTick = () => (new Promise((resolve) => (Vue.nextTick(resolve))))

// requestAnimationFrame fallback
const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || ((fn) => setTimeout(fn, 16.7))

// requestAnimationFrame 封装 promise
// 循环任务
util.loop = (callback) => {
  requestAnimationFrame(animate)
  async function animate (time) {
    await callback(time)
    requestAnimationFrame(animate)
  }
}

// 创建 get / set 对象
util.observe = (obj) => {
  const state = _.assign({}, obj)
  return (new Vuex.Store({ state })).state
}

// 创建 get 对象 readonly
util.computed = (obj) => {
  const getters = _.assign({}, obj)
  return (new Vuex.Store({ getters })).getters
}

// 创建 watch 对象
util.watch = (obj, key, callback) => {
  return new Vue({
    computed: {
      key () {
        return obj[key]
      }
    },
    watch: {
      key: callback
    }
  })
}

// any 转字符串
util.anyToString = async (any) => {
  const string = await any
  if (typeof string === 'object') {
    return JSON.stringify(string)
  }
  return `${string}`
}

// any 转数组
util.anyToArray = (any) => {
  const array = [].slice.call(any || [])
  if (array.length) {
    return array
  }
}

// log 支持 promise
util.log = (...args) => {
  Promise.all(args).then((args) => {
    console.log.apply(console, args)
  })
}

// img 封装 promise
util.img = (url) => (new Promise((resolve) => {
  const img = new Image()
  img.onload = img.onerror = resolve.bind(null, img)
  img.src = url
}))

// file reader 封装 promise
util.reader = (file) => (new Promise((resolve) => {
  const reader = new FileReader()
  reader.onload = reader.onerror = resolve.bind(null, reader)
  reader.readAsDataURL(file)
}))

// 初始化 canvas
util.canvas = (width, height) => {
  height = height || width
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  canvas.width = width
  canvas.height = height
  canvas.style['width'] = `${width}px`
  canvas.style['height'] = `${height}px`
  return {
    canvas,
    context
  }
}

util.html = (html) => {
  const div = document.createElement('div')
  div.innerHTML = html
  return div.firstElementChild
}

util.xml = (svg) => {
  const xml = new XMLSerializer().serializeToString(svg)
  return `data:image/svg+xml;base64,${btoa(xml)}`
}

// 设备判断 系统版本判断 等等
// @depend 结合 detect.js 使用
util.test = _.bind(DOMTokenList.prototype.contains, document.documentElement.classList)

// 利用 json 简单数据 深拷贝
util.copy = (obj) => (JSON.parse(JSON.stringify([obj]))[0])

// 加载资源 封装 promise
// @depend 依赖 loadjs
util.load = (file) => (new Promise((resolve) => (window.loadjs(`./static/assets/${file}`, { success: resolve }))))

// 创建随机十六进制
util.uuid = (length) => (_.repeat('0', length) + Math.ceil(Math.random() * Math.pow(16, length)).toString(16)).slice(-length)

// 创建范围
util.range = (min, max) => (value) => (Math.max(min, Math.min(value, max)))

// 去抖 工厂
// 返回一个 去抖函数实例 时间间隔为 interval
// 相同 去抖函数实例 共享 trigger
// 每一次调用时
// trigger false 则 skip 效果等同去抖
// trigger true 则 pass 且在 interval 内不再 resolve
// 去抖函数实例 返回的 promise 不一定 resolve 所以不能使用 async 语法
util.throttle = (interval) => {
  let trigger = true
  return () => (new Promise(async (resolve) => {
    if (trigger) {
      trigger = false
      resolve()
      await util.sleep(interval)
      trigger = true
    }
  }))
}

// 节流 工厂
// 返回一个 节流函数实例 时间间隔为 interval
// 相同 节流函数实例 共享 queue
// 每一次调用时
// queue 链 新增 当前 promise 的 resolve 并添加一个单位的 interval
// 下次调用的间隔若大于 一个单位的 interval 则直接调用 否则 需要等待达到 一个单位的 interval
// 节流函数实例 返回的 promise 需要用到 resolve 链式调用 所以不能使用 async 语法
util.debounce = (interval) => {
  let queue = Promise.resolve()
  return () => (new Promise((resolve) => {
    queue = queue.then(resolve).then(() => util.sleep(interval))
  }))
}

// 触发浏览器 repaint
util.repaint = (el) => {
  return el.offsetTop
}
