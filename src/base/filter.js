import Vue from 'vue'

// json string
Vue.filter('stringify', (value, size) => {
  return JSON.stringify(value, null, size)
})

// string ellipsis
Vue.filter('ellipsis', (value, size) => {
  return `${value}`.length > size ? '...' : value
})

// number toFixed
Vue.filter('toFixed', (value, length) => {
  return (+value).toFixed(length)
})

// string slice
Vue.filter('slice', (value, start, end) => {
  return `${value}`.slice(start, end)
})

// log pipe
Vue.filter('log', (value) => {
  console.log(value)
  return value
})

// format moment
Vue.filter('format', (value, expression) => {
  return window.moment(value).format(expression)
})

// badge number
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

// decodeURIComponent
Vue.filter('decodeURIComponent', (value) => {
  return decodeURIComponent(`${value}`)
})
