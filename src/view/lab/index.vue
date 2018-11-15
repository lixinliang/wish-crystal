<template>
  <div id="lab">
    <navigation-effect-box>
      <widget-background-color>
        <widget-scroll-box>
          <layout-navbar-shadow/>
          <group>
            <cell :title="$t('lab@sample')" is-link @click.native="$push('sample')"></cell>
          </group>
          <group>
            <cell :title="$t('lab@splash')" is-link @click.native="$replace('splash')"></cell>
          </group>
          <group>
            <cell :title="$t('lab@test-native')" is-link @click.native="$push('test-native')"></cell>
          </group>
          <group>
            <group-title slot="title">{{$t('lab@test')}}</group-title>
            <cell :title="$t('lab@test-api')" is-link @click.native="$push('test-api')"></cell>
            <cell :title="$t('lab@test-sdk')" is-link @click.native="$push('test-sdk')"></cell>
          </group>
          <group>
            <group-title slot="title">{{$t('lab@third-party-app')}}</group-title>
            <cell v-for="(item, $index) in website" :key="$index" :title="item" is-link @click.native="$push('webview', { item })"></cell>
          </group>
        </widget-scroll-box>
      </widget-background-color>
    </navigation-effect-box>
    <layout-navbar-color/>
    <layout-navbar :title="$t('lab@layout-navbar-title')"/>
  </div>
</template>

<i18n>
lab@layout-navbar-title:
  en: Lab
  zh-CN: 实验室
lab@sample:
  en: Sample
  zh-CN: 示例
lab@splash:
  en: Splash
  zh-CN: 启屏动画
lab@test:
  en: Unit Testing
  zh-CN: 单元测试
lab@test-api:
  en: API Unit Testing
  zh-CN: API 单元测试
lab@test-sdk:
  en: SDK Unit Testing
  zh-CN: SDK 单元测试
lab@third-party-app:
  en: Third Party App
  zh-CN: 第三方应用
</i18n>

<script>
import { Cell, Group, GroupTitle } from 'vux'
import layoutNavbar from '@/layout/navbar'
import layoutNavbarColor from '@/layout/navbar-color'
import layoutNavbarShadow from '@/layout/navbar-shadow'
import widgetScrollBox from '@/widget/scroll-box'
import widgetBackgroundColor from '@/widget/background-color'
import navigationEffectBox from '@/navigation/effect-box'

export default {
  components: {
    Cell,
    Group,
    GroupTitle,
    layoutNavbar,
    layoutNavbarColor,
    layoutNavbarShadow,
    widgetScrollBox,
    widgetBackgroundColor,
    navigationEffectBox
  },
  data () {
    return {
      website: [
        'yy.com',
        'qq.com',
        'baidu.com'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  #lab {
    @include page-base;
  }
</style>
