<template>
  <div id="photo" @touchmove.prevent>
    <input ref="file" type="file" accept="image/*" @change="change">
    <widget-default-avatar :width="size" :height="size"/>
    <layout-navbar :title="$t('photo@layout-navbar-title')" :right="'more'" @tap="navbarTap"/>
  </div>
</template>

<i18n>
photo@layout-navbar-title:
  en: Photo
  zh-CN: 头像
photo@select-photo:
  en: Choose from Album
  zh-CN: 从相册选择图片
</i18n>

<script>
import layoutNavbar from '@/layout/navbar'
import widgetDefaultAvatar from '@/widget/default-avatar'

export default {
  components: {
    layoutNavbar,
    widgetDefaultAvatar
  },
  data () {
    return {
      size: window.innerWidth
    }
  },
  methods: {
    async navbarTap ({ type }) {
      if (type === 'right') {
        const menus = [this.$t(`photo@select-photo`)]
        const result = await this.$sdk.actionsheet({ menus })
        const { index } = result
        if (index === 0) {
          this.$refs.file.click()
        }
      }
    },
    async change (evnet) {
      const { files } = this.$refs.file
      if (files.length) {
        this.$sdk.loading({ show: true })
        const sleep = window.util.sleep(2000)
        const file = files[0]
        const { result } = await window.util.reader(file)
        const img = await window.util.img(result)
        const value = img.src
        await sleep
        await this.$forage({ type: 'set', key: 'user@avatar', value })
        this.$sdk.loading({ show: false })
        const text = this.$t('sdk-toast@save-success')
        this.$sdk.toast({ text })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  #photo {
    @include page-base;
    background-color: #000;
    .widget-default-avatar {
      top: 50%;
      transform: translateY(-50%);
      position: relative;
      margin-left: auto;
      margin-right: auto;
      border-radius: 0;
    }
    input[type="file"] {
      top: 0;
      left: 0;
      opacity: 0;
      font-size: 0;
      position: absolute;
    }
  }
</style>

<style lang="scss">
  @import '~@/global';
  #photo {
    .widget-default-avatar {
      margin-top: ($navbar + $ios-status-bar) * .5;
    }
  }
  html.iphonex {
    #photo {
      .widget-default-avatar {
        margin-top: ($navbar + $ios-status-bar + $iphonex-status-bar) * .5;
      }
    }
  }
</style>
