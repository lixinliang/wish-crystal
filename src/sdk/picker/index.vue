<template>
  <div class="sdk-picker">
    <popup-picker :show="show" :title="'title'" :confirmText="'confirmText'" :cancelText="'cancelText'" :data="[['1', '2']]" @on-change="change" @on-hide="hide"/>
  </div>
</template>

<script>
import { PopupPicker } from 'vux'

export default {
  components: {
    PopupPicker
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
    change (...args) {
      console.log('change', args)
      // window.$event.emit('layout-actionsheet:click', key)
    },
    hide (...args) {
      console.log('hide', args)
      // window.$event.emit('layout-actionsheet:close')
    }
  }
}
</script>
