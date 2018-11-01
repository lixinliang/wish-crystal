<template>
  <div class="layout-actionsheet">
    <actionsheet v-model="show" :menus="menus" :cancel-text="$t('layout-actionsheet@cancel')" show-cancel @on-click-menu="click" @on-click-mask="close"/>
  </div>
</template>

<i18n>
layout-actionsheet@cancel:
  en: cancel
  zh-CN: 取消
</i18n>

<script>
import { Actionsheet } from 'vux'

export default {
  components: {
    Actionsheet
  },
  data () {
    return {
      show: false,
      menus: {}
    }
  },
  created () {
    window.$event.on('app:actionsheet', ({ show, menus }) => {
      this.show = !!show
      this.menus = menus
    })
  },
  methods: {
    click (key) {
      window.$event.emit('layout-actionsheet:click', key)
    },
    close () {
      window.$event.emit('layout-actionsheet:close')
    }
  }
}
</script>
