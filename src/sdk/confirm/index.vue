<template>
  <div class="sdk-confirm">
    <confirm v-model="show" :title="'title'" :content="'content'" :confirmText="'confirmText'" :cancelText="'cancelText'" @on-cancel="cancel" @on-confirm="confirm" @on-hide="hide"/>
  </div>
</template>

<script>
import { Confirm } from 'vux'

export default {
  components: {
    Confirm
  },
  data () {
    return {
      show: false
    }
  },
  created () {
    // window.$event.on('app:actionsheet', ({ show, menus }) => {
    //   this.show = !!show
    //   this.menus = menus
    // })
  },
  methods: {
    confirm (...args) {
      console.log('confirm', args)
      // window.$event.emit('layout-actionsheet:close')
    },
    cancel (...args) {
      console.log('cancel', args)
      // window.$event.emit('layout-actionsheet:click', key)
    },
    hide (...args) {
      console.log('hide', args)
      // window.$event.emit('layout-actionsheet:close')
    }
  }
}
</script>
