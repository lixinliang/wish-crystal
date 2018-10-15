import Vue from 'vue'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'

const store = new Vuex.Store({
  modules: {
    i18n: vuexI18n.store
  }
})

Vue.use(vuexI18n.plugin, store)

Vue.i18n.add('en', {})
Vue.i18n.add('zh-CN', {})

if (/zh/.test(navigator.language)) {
  Vue.i18n.set('zh-CN')
} else {
  Vue.i18n.set('en')
}

window.i18n = store

const { _ } = window

window.$event.on('i18n:add', (i18n) => {
  _.forEach(i18n, (value, key) => {
    if (Vue.i18n.keyExists(key)) {
      return
    }
    if (_.isObject(value)) {
      _.forEach(value, (text, lang) => {
        if (Vue.i18n.localeExists(lang)) {
          Vue.i18n.add(lang, {
            [key]: text
          })
        }
      })
    }
  })
})