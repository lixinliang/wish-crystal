<template>
  <div class="sdk-actionsheet">
    <actionsheet v-model="show" :menus="menus" :cancel-text="$t('sdk-actionsheet@cancel')" show-cancel @on-click-menu="click" @on-click-mask="close"/>
  </div>
</template>

<i18n>
sdk-actionsheet@cancel:
  en: Cancel
  zh-CN: 取消
</i18n>

<script>
import { Actionsheet } from 'vux'

let resolve

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
      let promise
      ({ promise, resolve } = window.util.promise())
      const result = await promise
      return result
    }
  },
  methods: {
    click (index) {
      if (index === 'cancel') {
        resolve({
          index: -1
        })
        return
      }
      const value = this.menus[index]
      resolve({
        index,
        value
      })
    },
    close () {
      resolve({
        index: -1
      })
    }
  }
}
</script>

<style lang="scss">
  @import '~@/global';
  html.iphonex {
    #sdk {
      .sdk-actionsheet {
        .vux-actionsheet {
          .weui-actionsheet__action {
            .weui-actionsheet__cell {
              padding-bottom: 10px + $iphonex-home-indicator;
            }
          }
        }
      }
    }
  }
</style>
