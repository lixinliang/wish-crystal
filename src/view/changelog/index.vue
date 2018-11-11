<template>
  <div id="changelog">
    <navigation-effect-box>
      <widget-background-color>
        <widget-scroll-box>
          <layout-navbar-shadow/>
          <group v-for="(item, $key) in changelog" :key="$key" :title="$key">
            <cell v-for="(title, $index) in item['zh-CN']" :key="$index" :title="title"></cell>
          </group>
        </widget-scroll-box>
      </widget-background-color>
    </navigation-effect-box>
    <layout-navbar :title="$t('changelog@layout-navbar-title')"/>
  </div>
</template>

<i18n>
changelog@layout-navbar-title:
  en: Change Log
  zh-CN: 更新日志
</i18n>

<script>
import { Cell, Group } from 'vux'
import changelog from 'changelog.yml'
import layoutNavbar from '@/layout/navbar'
import layoutNavbarShadow from '@/layout/navbar-shadow'
import widgetScrollBox from '@/widget/scroll-box'
import widgetBackgroundColor from '@/widget/background-color'
import navigationEffectBox from '@/navigation/effect-box'

export default {
  components: {
    Cell,
    Group,
    layoutNavbar,
    layoutNavbarShadow,
    widgetScrollBox,
    widgetBackgroundColor,
    navigationEffectBox
  },
  data () {
    return {
      changelog
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/global';
  #changelog {
    @include page-base;
  }
</style>
