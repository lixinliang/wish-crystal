import Vue from 'vue'

// const navigation = []
let task = Promise.resolve()

// 占用 Vue 原型链 命名空间
Vue.prototype.$pop = () => {
  task = task.then(() => (new Promise((resolve) => {
    window.$event.emit('navigation:direction', {
      direction: 'pop',
      resolve
    })
    window.router.go(-1)
  })))
}
Vue.prototype.$push = (name, params) => {
  task = task.then(() => (new Promise((resolve) => {
    window.$event.emit('navigation:direction', {
      direction: 'push',
      resolve
    })
    window.router.push({
      name,
      params
    })
  })))
}
Vue.prototype.$replace = (name, params) => {
  task = task.then(() => (new Promise((resolve) => {
    window.$event.emit('navigation:direction', {
      direction: 'none',
      resolve
    })
    window.router.replace({
      name,
      params
    })
  })))
}
