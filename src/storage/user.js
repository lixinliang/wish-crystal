import Vue from 'vue'

export default {
  proto: [
    'name',
    'avatar',
    'lang'
  ],
  async init (forage) {
    const value = await forage({ type: 'get', key: 'user@lang' })
    if (Vue.i18n.localeExists(value)) {
      Vue.i18n.set(value)
    } else {
      await forage({ type: 'set', key: 'user@lang', value })
    }
  }
}
