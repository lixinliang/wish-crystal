<template>
  <div class="sdk-masker">
    <masker v-if="show" :color="color" :opacity="opacity" :fullscreen="fullscreen"/>
  </div>
</template>

<script>
import { Masker } from 'vux'

export default {
  components: {
    Masker
  },
  data () {
    return {
      show: false,
      color: '',
      opacity: '',
      fullscreen: false
    }
  },
  created () {
    window.sdk.masker = ({ show, color, opacity, fullscreen }) => {
      this.show = !!show
      this.color = `${color}`
      this.opacity = +opacity || 0
      this.fullscreen = !!fullscreen
    }
  }
}
</script>
