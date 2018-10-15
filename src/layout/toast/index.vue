<template>
  <div class="layout-toast">
    <toast v-for="item in list" :key="item.id" :value="true" :text="item.text" :width="item.width" :type="'text'" @on-hide="remove(item)"/>
  </div>
</template>

<script>
import { Toast } from 'vux'

export default {
  components: {
    Toast
  },
  data () {
    return {
      list: []
    }
  },
  created () {
    window.$event.on('app:toast', ({ text, width }) => {
      const item = {}
      item.text = `${text}`
      item.width = `${width}`
      item.id = this.$.now
      item.disabled = false
      this.list.push(item)
    })
    window.util.loop(async () => {
      await window.util.sleep(60 * 1000)
      if (this.list.length) {
        const bool = window._.every(this.list, 'disabled')
        if (bool) {
          this.list = []
        }
      }
    })
  },
  methods: {
    async remove (item) {
      item.disabled = true
    }
  }
}
</script>
