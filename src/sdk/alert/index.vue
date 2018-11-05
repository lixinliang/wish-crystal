<template>
  <div class="sdk-alert">
    <alert v-model="show" :title="title" :content="content" :button-text="$t('sdk-alert@ok')" @on-hide="hide"/>
  </div>
</template>

<i18n>
sdk-alert@ok:
  en: OK
  zh-CN: 好的
</i18n>

<script>
import { Alert } from 'vux'

let resolve

export default {
  components: {
    Alert
  },
  data () {
    return {
      show: false,
      title: '',
      content: ''
    }
  },
  created () {
    window.sdk.alert = async ({ title = '', content = '' }) => {
      this.show = true
      this.title = `${title}`
      this.content = `${content}`
      let promise
      ({ promise, resolve } = window.util.promise())
      await promise
    }
  },
  methods: {
    hide () {
      resolve()
    }
  }
}
</script>
