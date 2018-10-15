<template>
  <div class="layout-loading">
    <loading v-model="show" :text="text"/>
  </div>
</template>

<script>
import { Loading } from 'vux'

export default {
  components: {
    Loading
  },
  data () {
    return {
      show: false,
      text: ''
    }
  },
  created () {
    window.$event.on('app:loading', ({ show, text }) => {
      this.show = !!show
      this.text = `${text}`
    })
  }
}
</script>
