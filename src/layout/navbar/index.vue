<template>
  <div class="layout-navbar">
    <x-header v-if="displayHeader" :left-options="{ backText, showBack }" @on-click-title="onClickTitle">
      <span class="title">{{$t(`layout-navbar@${$route.name}`)}}</span>
    </x-header>
  </div>
</template>

<i18n>
layout-navbar@back:
  en: Back
  zh-CN: 返回
layout-navbar@home:
  en: Home
  zh-CN: 首页
layout-navbar@person:
  en: Me
  zh-CN: 我
layout-navbar@about:
  en: About
  zh-CN: 关于
layout-navbar@language:
  en: Language
  zh-CN: 选择语言
</i18n>

<script>
import { XHeader } from 'vux'

export default {
  components: {
    XHeader
  },
  computed: {
    displayHeader () {
      if (!this.$route.name) {
        return false
      }
      switch (this.$route.name) {
        case 'index':
          return false
      }
      return true
    },
    backText () {
      return this.$t('layout-navbar@back')
    },
    showBack () {
      if (!this.$route.name) {
        return false
      }
      switch (this.$route.name) {
        case 'home':
        case 'person':
          return false
      }
      return true
    }
  },
  methods: {
    onClickTitle () {
      // todo
      console.log('onClickTitle')
    }
  }
}
</script>

<style lang="scss" scoped>
  .title {
    font-weight: 400;
  }
</style>

<style lang="scss">
  @import '~@/global';
  .g-body {
    padding-top: 46px;
  }
  html.iphonex {
    .g-body {
      padding-top: 46px + $iphonex-status-bar;
    }
  }
</style>

<style lang="scss">
  @import '~@/global';
  html.iphonex {
    .layout-navbar {
      .vux-header {
        padding-top: 3px + $iphonex-status-bar;
      }
    }
  }
</style>
