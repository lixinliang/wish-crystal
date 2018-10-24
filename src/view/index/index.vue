<template>
  <div id="index">
    <div class="logo">
      <i v-image:size.96x96="icon"/>
    </div>
    <p>{{$t('index@title')}}</p>
    <p>{{$t('index@version')}}：{{version}}.{{$timestamp|format('YYYYMMDD.HHmmss')}}</p>
  </div>
</template>

<i18n>
index@title:
  en: Wish Crystal
  zh-CN: 愿望水晶
index@version:
  en: Version
  zh-CN: 版本
</i18n>

<script>
import pkg from 'package.json'
import icon from '@/img/logo.png'

const { microApp } = window
const { title } = document
const { version } = pkg

microApp.capable = true
microApp.icon = icon
microApp.title = title
microApp.statusBarStyle = 'black-translucent'

export default {
  data () {
    return {
      icon,
      version
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  #index {
    @include page-index;
  }
</style>
