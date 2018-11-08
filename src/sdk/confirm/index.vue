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
  },
  methods: {
    confirm (...args) {
      console.log('confirm', args)
    },
    cancel (...args) {
      console.log('cancel', args)
    },
    hide (...args) {
      console.log('hide', args)
    }
  }
}
</script>
