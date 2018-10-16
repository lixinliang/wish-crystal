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
    Vue.directive('image', (el, { value }) => {
      el.style['background-image'] = value ? `url(${value})` : ''
    })
  }
})

// todo
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
