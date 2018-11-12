import Vue from 'vue'
// 动画时间
import duration from './duration'

// 方向变量
let direction = 'none'

// resolve promise
let resolvePromiseAfterEnter = window._.noop
let resolvePromiseAfterLeave = window._.noop

// disable all event
async function inreactive () {
  window.sdk.masker({ show: true, fullscreen: true })
  const animation = []
  {
    const { promise, resolve } = window.util.promise()
    animation.push(promise)
    resolvePromiseAfterEnter = resolve
  }
  {
    const { promise, resolve } = window.util.promise()
    animation.push(promise)
    resolvePromiseAfterLeave = resolve
  }
  await Promise.all(animation)
  window.sdk.masker({ show: false, fullscreen: false })
}

// 占用 Vue 原型链 命名空间
Vue.prototype.$pop = () => {
  direction = 'pop'
  inreactive()
  window.router.go(-1)
}
Vue.prototype.$push = (name, params) => {
  direction = 'push'
  inreactive()
  window.router.push({
    name,
    params
  })
}
Vue.prototype.$replace = (name, params) => {
  direction = 'none'
  window.router.replace({
    name,
    params
  })
}

// app.vue transition 钩子
const methods = {
  onBeforeEnter (el) {
    if (direction === 'none') {
      return
    }
    if (direction === 'push') {
      el.classList.add('navigation-push-enter-start')
    }
    if (direction === 'pop') {
      el.classList.add('navigation-pop-enter-start')
    }
  },
  async onEnter (el, done) {
    if (direction === 'none') {
      done()
      return
    }
    if (direction === 'push') {
      el.classList.add('navigation-push-enter-end')
    }
    if (direction === 'pop') {
      el.classList.add('navigation-pop-enter-end')
    }
    await window.util.sleep(duration)
    done()
  },
  onAfterEnter (el) {
    if (direction === 'none') {
      return
    }
    if (direction === 'push') {
      el.classList.remove('navigation-push-enter-start')
      el.classList.remove('navigation-push-enter-end')
    }
    if (direction === 'pop') {
      el.classList.remove('navigation-pop-enter-start')
      el.classList.remove('navigation-pop-enter-end')
    }
    resolvePromiseAfterEnter()
  },
  onBeforeLeave (el) {
    if (direction === 'none') {
      return
    }
    if (direction === 'push') {
      el.classList.add('navigation-push-leave-start')
    }
    if (direction === 'pop') {
      el.classList.add('navigation-pop-leave-start')
    }
  },
  async onLeave (el, done) {
    if (direction === 'none') {
      done()
      return
    }
    if (direction === 'push') {
      el.classList.add('navigation-push-leave-end')
    }
    if (direction === 'pop') {
      el.classList.add('navigation-pop-leave-end')
    }
    await window.util.sleep(duration)
    done()
  },
  onAfterLeave (el) {
    if (direction === 'none') {
      return
    }
    if (direction === 'push') {
      el.classList.remove('navigation-push-leave-start')
      el.classList.remove('navigation-push-leave-end')
    }
    if (direction === 'pop') {
      el.classList.remove('navigation-pop-leave-start')
      el.classList.remove('navigation-pop-leave-end')
    }
    resolvePromiseAfterLeave()
  }
}

export default {
  methods
}
