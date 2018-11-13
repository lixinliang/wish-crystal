<template>
  <div id="test-sdk">
    <navigation-effect-box>
      <widget-background-color>
        <widget-scroll-box>
          <layout-navbar-shadow/>
          <h1>{{$t('test-sdk@layout-navbar-title')}}</h1>
        </widget-scroll-box>
      </widget-background-color>
    </navigation-effect-box>
    <layout-navbar-color/>
    <layout-navbar :title="$t('test-sdk@layout-navbar-title')"/>
  </div>
</template>

<i18n>
test-sdk@layout-navbar-title:
  en: Sample
  zh-CN: 示例
</i18n>

<script>
import layoutNavbar from '@/layout/navbar'
import layoutNavbarColor from '@/layout/navbar-color'
import layoutNavbarShadow from '@/layout/navbar-shadow'
import widgetScrollBox from '@/widget/scroll-box'
import widgetBackgroundColor from '@/widget/background-color'
import navigationEffectBox from '@/navigation/effect-box'

export default {
  components: {
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
  #test-sdk {
    @include page-base;
  }
</style>
