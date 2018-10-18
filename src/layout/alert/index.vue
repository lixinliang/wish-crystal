<template>
  <div class="layout-alert">
    <alert v-model="show" :title="title" :content="content" :button-text="$t('layout-alert@ok')" @on-hide="hide"/>
  </div>
</template>

<i18n>
layout-alert@ok:
  en: OK
  zh-CN: 好的
</i18n>

<script>
import { Alert } from 'vux'

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
    window.$event.on('app:alert', ({ show, title = '', content = '' }) => {
      this.show = !!show
      this.title = `${title}`
      this.content = `${content}`
    })
  },
  methods: {
    hide () {
      window.$event.emit('layout-alert:click')
    }
  }
}
</script>
