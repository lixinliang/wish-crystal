<template>
  <div class="sdk-picker">
    <popup-picker :show="show" :popup-title="title" :confirmText="$t('sdk-picker@confirm')" :cancelText="$t('sdk-picker@cancel')" :data="data" @on-change="change" @on-hide="hide"/>
  </div>
</template>

<i18n>
sdk-picker@confirm:
  en: Confirm
  zh-CN: 确定
sdk-picker@cancel:
  en: Cancel
  zh-CN: 取消
</i18n>

<script>
import { PopupPicker } from 'vux'

let resolve

export default {
  components: {
    PopupPicker
  },
  data () {
    return {
      show: false,
      title: '',
      data: []
    }
  },
  created () {
    window.sdk.picker = async ({ title = '', data }) => {
      this.title = `${title}`
      this.data = data
      this.show = true
      let promise
      ({ promise, resolve } = window.util.promise())
      const result = await promise
      return result
    }
  },
  methods: {
    change (value) {
      this.show = false
      resolve({
        value
      })
    },
    hide (bool) {
      this.show = false
      if (bool) {
        // noop
      } else {
        resolve({
          index: -1
        })
      }
    }
  }
}
</script>
