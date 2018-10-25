import Vue from 'vue'

export default {
  'name': null,
  'avatar': null,
  'lang': {
    defaultValue () {
      return Vue.i18n.locale()
    },
    afterAssign (value) {
      Vue.i18n.set(value)
    }
  },
  'checkcode': {
    defaultValue () {
      return window.util.uuid()
    }
  }
}
