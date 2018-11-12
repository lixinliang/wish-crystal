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
  },
  methods: {
    change (...args) {
      console.log('change', args)
    },
    hide (...args) {
      console.log('hide', args)
    }
  }
}
</script>
