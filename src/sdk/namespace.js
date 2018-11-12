import Vue from 'vue'

const sdk = {}

// 占用全局命名空间
window.sdk = sdk

// 占用 Vue 原型链 命名空间
Vue.prototype.$sdk = sdk
