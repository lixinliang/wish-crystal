<template>
  <div id="test-api">
    <navigation-effect-box>
      <widget-background-color>
        <widget-scroll-box>
          <layout-navbar-shadow/>
          <h1>{{$t('test-api@layout-navbar-title')}}</h1>
        </widget-scroll-box>
      </widget-background-color>
    </navigation-effect-box>
    <layout-navbar-color/>
    <layout-navbar :title="$t('test-api@layout-navbar-title')"/>
  </div>
</template>

<i18n>
test-api@layout-navbar-title:
  en: API Unit Testing
  zh-CN: API 单元测试
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
  #test-api {
    @include page-base;
  }
</style>
