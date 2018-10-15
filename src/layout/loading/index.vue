<template>
  <div class="layout-loading">
    <loading v-model="loading"/>
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
      loading: false
    }
  },
  created () {
    let sid = 0
    window.$event.on('app:loading', ({ active, timeout }) => {
      if (active) {
        this.loading = true
        const value = +timeout || 0
        if (value) {
          sid = setTimeout(() => {
            this.loading = false
          }, value)
        }
      }
      if (!active) {
        clearTimeout(sid)
        this.loading = false
      }
    })
  }
}
</script>
