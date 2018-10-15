import _ from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'

const util = {}

window.util = util

// 定时器 封装 promise
util.sleep = (delay) => {
  let sid = 0
  const promise = new Promise((resolve) => (sid = setTimeout(resolve, delay)))
  promise.sid = sid
  return promise
}

// nextTick 封装 promise
util.nextTick = () => new Promise((resolve) => Vue.nextTick(resolve))

util.timeout = (delay) => {
  let sid = 0
  const tick = new Promise((resolve) => (sid = setTimeout(resolve, delay)))
  return { sid, tick }
}

// util.interval = async (callback, delay) => {
//   clearTimeout(callback['@interval'])
//   await callback()
//   callback['@interval'] = setTimeout(() => {
//     util.interval(callback, second)
//   }, second * 1000)
// }

// requestAnimationFrame 封装
util.loop = (callback) => {
  requestAnimationFrame(animate)
  async function animate (time) {
    await callback(time)
    requestAnimationFrame(animate)
  }
}

util.until = (callback) => {
  requestAnimationFrame(animate)
  async function animate (time) {
    const stop = await callback(time)
    if (stop) {
      // noop
    } else {
      requestAnimationFrame(animate)
    }
  }
}

// 创建 get / set 对象
util.observe = (obj) => {
  const state = (obj && typeof obj === 'object') ? obj : {}
  return (new Vuex.Store({ state })).state
}

// 创建 get 对象 readonly
util.computed = (obj) => {
  const getters = (obj && typeof obj === 'object') ? obj : {}
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

// 类型检查 @see https://github.com/karlpatrickespiritu/args-checker-js 实现函数重载
// util.check = (target, expression) => {
//   try {
//     return (function () {
//       return window.args.expect(arguments, expression, _.noop)
//     }).apply(null, target)
//   } catch (e) {
//     return false
//   }
// }

// 转字符串
util.anyToString = async (any) => {
  const string = await any
  if (typeof string === 'object') {
    return JSON.stringify(string)
  }
  return `${string}`
}

// 转数组
util.anyToArray = (any) => {
  const array = [].slice.call(any || [])
  if (array.length) {
    return array
  }
}

// 打印 log 支持 promise
util.log = (...args) => {
  Promise.all(args).then((args) => {
    console.log.apply(console, args)
  })
}

// 映射 store state 到 vue component compute
// @assign --> {}, @mapValues, defaults
// @mapValues --> @keyBy, key => @computed
// @keyBy --> keys, key => key
// @computed --> () => state[key]
util.mapState = (state, keys, defaults) => _.assign({}, _.mapValues(_.keyBy(keys, (key) => key), (key) => () => state[key]), defaults)

// 映射 this[path] 到 vue component compute
// @assign --> {}, @mapValues, defaults
// @mapValues --> @keyBy, key => @computed
// @keyBy --> keys, key => key
// @computed --> () => this[...path][key]
util.mapPath = (path, keys, defaults) => _.assign({}, _.mapValues(_.keyBy(keys, (key) => key), (key) => function () {
  return _.get(this, path)[key]
}), defaults)

// 映射 store state 到 store mutation
// @assign --> {}, @mapValues, defaults
// @mapValues --> @keyBy, key => @mutation,
// @keyBy --> keys, key => key
// @mutation --> (state, value) => state[key] = value
util.commitable = (keys, defaults) => _.assign({}, _.mapValues(_.keyBy(keys, (key) => key), (key) => (state, value) => (state[key] = value)), defaults)

// 请求 img 封装 promise
util.img = (url) => new Promise((resolve) => {
  const img = new Image()
  img.onload = img.onerror = resolve.bind(null, img)
  img.src = url
})

// file reader 封装 promise
util.reader = (file) => new Promise((resolve) => {
  const reader = new FileReader()
  reader.onload = resolve.bind(null, reader)
  reader.readAsDataURL(file)
})

// exif 封装 promise
// util.exif = (img) => new Promise((resolve) => {
//   EXIF.getData(img, () => {
//     resolve(EXIF.getAllTags(img))
//   })
// })

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

// 设备判断 系统版本判断 等等
// @depend 依赖 detect.js
util.test = (className) => !!document.querySelector(`html.${className}`)

const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || ((fn) => setTimeout(fn, 16.7))

// lazyload
util.testMeet = (el, trim = 0) => {
  const bcr = el.getBoundingClientRect()
  const mw = el.offsetWidth
  const mh = el.offsetHeight
  const w = window.innerWidth
  const h = window.innerHeight
  const boolX = (!((bcr.right - trim) <= 0 && ((bcr.left + mw) - trim) <= 0) && !((bcr.left + trim) >= w && (bcr.right + trim) >= (mw + w)))
  const boolY = (!((bcr.bottom - trim) <= 0 && ((bcr.top + mh) - trim) <= 0) && !((bcr.top + trim) >= h && (bcr.bottom + trim) >= (mh + h)))
  return boolX && boolY
}

// log vue tree node
util.find = (el) => {
  const match = (node) => {
    const { $el, $children } = node
    if ($el === el) {
      return node
    } else {
      if ($children.length) {
        for (let i = 0; i < $children.length; i++) {
          const value = match($children[i])
          if (value) {
            return value
          }
        }
      }
    }
  }
  return match(window.vm)
}

util.copy = (obj) => JSON.parse(JSON.stringify([obj]))[0]
