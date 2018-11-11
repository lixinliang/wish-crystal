import Vue from 'vue'
import component from './component'
import duration from './duration'

Vue.component('navigation', component)

let direction = 'none'

// 占用 Vue 原型链 命名空间
Vue.prototype.$pop = () => {
  direction = 'pop'
  window.router.go(-1)
}
Vue.prototype.$push = (name, params) => {
  direction = 'push'
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
    window.util.repaint(el)
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
    el.classList.add('navigation-animate')
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
    el.classList.remove('navigation-animate')
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
    window.util.repaint(el)
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
    el.classList.add('navigation-animate')
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
    el.classList.remove('navigation-animate')
  }
}

export default {
  methods
}
