<template>
  <div class="sdk-confirm">
    <confirm v-model="show" :title="title" :content="content" :confirmText="$t('sdk-confirm@confirm')" :cancelText="$t('sdk-confirm@cancel')" @on-cancel="cancel" @on-confirm="confirm"/>
  </div>
</template>

<i18n>
sdk-confirm@confirm:
  en: Confirm
  zh-CN: 确定
sdk-confirm@cancel:
  en: Cancel
  zh-CN: 取消
</i18n>

<script>
import { Confirm } from 'vux'

let resolve

export default {
  components: {
    Confirm
  },
  data () {
    return {
      show: false,
      title: '',
      content: ''
    }
  },
  created () {
    window.sdk.confirm = async ({ title = '', content = '' }) => {
      this.show = true
      this.title = `${title}`
      this.content = `${content}`
      let promise
      ({ promise, resolve } = window.util.promise())
      const result = await promise
      return result
    }
  },
  methods: {
    confirm () {
      resolve({
        index: 1
      })
    },
    cancel () {
      resolve({
        index: 0
      })
    }
  }
}
</script>
