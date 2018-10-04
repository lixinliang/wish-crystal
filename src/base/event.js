import Vue from 'vue'

const vm = new Vue()

window.$event = {
  on () {
    return vm.$on.apply(vm, arguments)
  },
  off () {
    return vm.$off.apply(vm, arguments)
  },
  emit () {
    return vm.$emit.apply(vm, arguments)
  },
  once () {
    return vm.$once.apply(vm, arguments)
  },
  listen (...args) {
    vm.$on.apply(vm, args)
    return {
      remove () {
        vm.$off.apply(vm, args)
      }
    }
  }
}
