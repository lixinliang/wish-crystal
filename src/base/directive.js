import Vue from 'vue'

const { _ } = window

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

// todo v-mc
// v-mc
// Vue.use({
//   install (Vue) {
//     Vue.directive('mc', {
//       bind (el, { value }) {
//         const mc = new window.Hammer.Manager(el)
//         value['@mc'] = mc
//         value(mc)
//       },
//       unbind (el, { value }) {
//         const mc = value['@mc']
//         mc.destroy()
//       }
//     })
//   }
// })
