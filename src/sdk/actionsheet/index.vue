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
      menus: []
    }
  },
  created () {
    window.sdk.actionsheet = async ({ menus }) => {
      this.menus = menus
      this.show = true
      const result = await Promise.race([
        new Promise((resolve) => window.$event.once('layout-actionsheet:click', resolve)),
        new Promise((resolve) => window.$event.once('layout-actionsheet:close', resolve))
      ])
      return result
    }
  },
  methods: {
    click (index) {
      if (index === 'cancel') {
        window.$event.emit('layout-actionsheet:close', {
          index: -1
        })
        return
      }
      const value = this.menus[index]
      window.$event.emit('layout-actionsheet:click', {
        index,
        value
      })
    },
    close () {
      window.$event.emit('layout-actionsheet:close', {
        index: -1
      })
    }
  }
}
</script>
