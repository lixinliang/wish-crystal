<template>
  <div class="layout-toast">
    <toast v-for="item in list" :key="item.id" :value="true" :text="item.text" :width="item.width" :type="'text'" @on-hide="remove(item)"/>
  </div>
</template>

<i18n>
sdk-toast@save-success:
  en: Saved Successfully
  zh-CN: 保存成功
sdk-toast@create-success:
  en: Created Successfully
  zh-CN: 创建成功
</i18n>

<script>
import { Toast } from 'vux'

const { _ } = window

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
    window.sdk.toast = ({ text = '', width = '20em' }) => {
      const item = {}
      item.text = `${text}`
      item.width = `${width}`
      item.id = this.$.now
      item.disabled = false
      this.list.push(item)
    }
    window.util.loop(async () => {
      await window.util.sleep(60 * 1000)
      if (this.list.length) {
        const bool = _.every(this.list, 'disabled')
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
