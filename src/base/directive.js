import _ from 'lodash'
import Vue from 'vue'

// v-visible
Vue.use({
  install (Vue) {
    Vue.directive('visible', (el, { value }) => {
      el.style['visibility'] = value ? 'visible' : 'hidden'
    })
  }
})

// v-fade
Vue.use({
  install (Vue) {
    Vue.directive('fade', (el, { value }) => {
      el.style['opacity'] = value ? 1 : 0
      el.style['pointer-events'] = value ? '' : 'none'
    })
  }
})

// v-image
Vue.use({
  install (Vue) {
    Vue.directive('image', (el, { value, arg, modifiers }) => {
      if (arg === 'size') {
        const size = _.head(_.keys(modifiers))
        if (size) {
          const [ w, h ] = `${size}`.split('x')
          const width = +w || 0
          const height = +h || 0
          if (width && height) {
            el.style['width'] = `${width}px`
            el.style['height'] = `${height}px`
          }
        }
      }
      el.style['background-image'] = value ? `url(${value})` : ''
    })
  }
})

const closure = {}

// v-mc
Vue.use({
  install (Vue) {
    Vue.directive('mc', {
      bind (el, { value }) {
        let uuid
        const mc = new window.Hammer.Manager(el)
        while (uuid && !closure[uuid]) {
          uuid = window.util.uuid(4)
        }
        closure[uuid] = mc
        el.dataset.mc = uuid
        value(mc)
      },
      unbind (el, { value }) {
        const uuid = el.dataset.mc
        const mc = closure[uuid]
        closure[uuid] = null
        mc.destroy()
      }
    })
  }
})
