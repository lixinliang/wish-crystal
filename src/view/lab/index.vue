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
            <cell :title="$t('lab@test-api')" is-link @click.native="$push('test-api')"></cell>
            <cell :title="$t('lab@test-sdk')" is-link @click.native="$push('test-sdk')"></cell>
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
</i18n>

<script>
import { Cell, Group } from 'vux'
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
    layoutNavbar,
    layoutNavbarColor,
    layoutNavbarShadow,
    widgetScrollBox,
    widgetBackgroundColor,
    navigationEffectBox
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  #lab {
    @include page-base;
  }
</style>
