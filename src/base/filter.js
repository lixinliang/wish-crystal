import Vue from 'vue'

Vue.filter('stringify', (value, size) => {
  return JSON.stringify(value, null, size)
})

Vue.filter('ellipsis', (value, size) => {
  return `${value}`.length > size ? '...' : value
})

Vue.filter('toFixed', (value, length) => {
  return (+value).toFixed(length)
})

Vue.filter('slice', (value, start, end) => {
  return `${value}`.slice(start, end)
})

Vue.filter('log', (value) => {
  console.log(value)
  return value
})

Vue.filter('format', (value, expression) => {
  return window.moment(value).format(expression)
})

Vue.filter('badge', (value) => {
  const badge = +value || 0
  if (badge <= 0) {
    return ''
  }
  if (badge >= 100) {
    return '99+'
  }
  return `${badge}`
})
