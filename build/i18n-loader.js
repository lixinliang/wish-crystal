'use strict'

const yaml = require('js-yaml')

module.exports = function (source, map) {
  const result = JSON.stringify(yaml.load(source))
  this.callback(
    null,
    `export default function (Component) {
      const i18n = JSON.parse('${result}')
      // console.log(i18n)
      Component.options.__i18n = i18n
      Component.options.beforeCreate = Component.options.beforeCreate || []
      Component.options.beforeCreate.push(function () {
        this.$event.emit('i18n:add', i18n)
      })
    }`,
    map
  )
}
